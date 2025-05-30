// Monkey properties
const MONKEY_SIZE = 80
const TRAIL_MARGIN = 50
const MONKEY_RADIUS = 32
const LIMIT_ACTIVATED = 2
const MAX_PATHS = 2

// Monkey data configuration


class Monkey {
    /**
     * Represents a monkey with various properties.
     * @constructor
     * @param {number} x - The initial x-coordinate of the monkey.
     * @param {number} y - The initial y-coordinate of the monkey.
     * @param {number} type - The type of the monkey.
     */
    constructor({ x, y, type=1 }) {
        // Initialize monkey properties
        this.type = type
        this.setOrigin()
        const data = this.getMonkeyData()
        var levels = []
        for (let i = 1; i < data.length; i++) {
            levels.push(0)
        }
        this.levels = levels
        this.base = data[0].base ? data[0].base : null

        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y

        this.alive = true
        this.angle = 90
        this.showRange = false
        this.relocating = false
        this.menuOpen = false
        this.bought = false
        this.moneyMultiplier = 1
        this.alternating_counter = 0 // if alternating the shoots from different offsets
        this.balloonsPopped = 0
        this.creationTime = time
        this.mainPath = 0
    }

    setOrigin() {
        const data = this.getMonkeyData()
        const origin = JSON.parse(JSON.stringify(data[0].origin))
        this.arrow = origin.arrow
        this.range = origin.range
        this.cooldown = origin.cooldown
        this.price = origin.price
        this.size = origin.size ? origin.size : 1
        this.armoredBalloons = origin.armoredBalloons ? origin.armoredBalloons : false
        this.baseSizeRatio = origin.baseSizeRatio ? origin.baseSizeRatio : 0.8
        this.numShooters = origin.numShooters ? origin.numShooters : 1
        this.factory = origin.factory ? origin.factory : null
        this.inferno = origin.inferno ? origin.inferno : null
        this.rotatable = origin.rotatable != undefined ? origin.rotatable : true
        this.target = origin.target ? origin.target : false
        this.water = origin.water ? origin.water : false
        this.animation = !origin.animation ? null : {
            name: origin.animation,
            src: null,
        }
        this.radius = origin.radius ? origin.radius : 1
        this.xOffset = origin.xOffset ? origin.xOffset : 0
        this.yOffset = origin.yOffset ? origin.yOffset : 0
    }

    // ... (other functions)

    /**
     * Updates the position of the monkey.
     * @param {number} x - The new x-coordinate of the monkey.
     * @param {number} y - The new y-coordinate of the monkey.
     */
    updateLocation(x, y) {
        this.x = x
        this.y = y
        this.creationTime = time
    }

    updateBalloonsPopped(popCount=1) {
        this.balloonsPopped += popCount
    }

    /**
     * Checks if the monkey is too close to the trail.
     * @returns {boolean} True if the monkey is close to the trail, otherwise false.
     */
    onTrail() {
        // Loop through every two close map.waypoints on the trail
        for (let i = 0; i < map.waypoints.length-1; i++) {
            let p1 = map.waypoints[i]  // First waypoint
            let p2 = map.waypoints[i+1]  // Second waypoint
            let p3 = {x: this.x, y: this.y}  // Current location of the monkey

            // Get the distance from the line to the monkey's location
            let dis = disFromLine(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y)
            // slope of the line
            let slope = (p1.y-p2.y)/(p1.x-p2.x)
            
            // intersection on the trail line with the monkey perpendicular line
            let x, y
            if (Math.abs(slope) == Infinity) { // if the trail line is vertical
                x = p1.x
                y = p3.y
            } else if (Math.abs(slope) == 0) { // if the trail line is horizontal
                x = p3.x
                y = p1.y
            } else { // neitherH
                let b = -slope*p1.x+p1.y
                let proj = this.projection({x: p3.x, y: p3.y-b}, {x: p1.x, y: p1.y-b})
                x = proj.x
                y = proj.y + b
            }

            // return true if close to the trail by less than TRAIL_MARGIN distance
            if (((p1.x-x)*(p2.x-x) < -1 | (p1.y-y)*(p2.y-y) < -1) & dis < TRAIL_MARGIN | calcMag(p1.x,p1.y,p3.x,p3.y) < TRAIL_MARGIN) {
                // check if the trail is under a tunnel
                if (!this.monkeyOnTunnel(i+1, p3)) {
                    return true
                }
            }

        }
        return false
    }

    getMonkeyData() {
        return MONKEY_DATA[this.type-1]
    }

    getMaxIndex() { // possibilities
        var maxIndex = [0]
        // find index of highest level from all upgrade sets
        // reason: not supposed to be activated
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i] > this.levels[maxIndex[0]]) {
                maxIndex = [i]
            } else if (this.levels[i] == this.levels[maxIndex[0]]) {
                maxIndex.push(i)
            }
        }
        return maxIndex
    }

    getActivated() { // possibilities
        var activated = []
        var maxIndex = this.getMaxIndex();
        // checks if there is a different path that has came to activated level
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i] == LIMIT_ACTIVATED & maxIndex.includes(i)) {
                activated.push(i)
            }
        }
        // returns the index of the activated upgrade set
        return activated
    }

    projection(a, b) {
        let ab = a.x*b.x + a.y*b.y
        let b_norma_sq = b.x*b.x + b.y*b.y
        let factor = ab/b_norma_sq
        return {x: b.x*factor, y: b.y*factor}
    }

    monkeyOnTunnel(index, p3) {
        for (let i = 0; i < map.tunnels.length; i++) {
            let t = map.tunnels[i]
            if (t.under.includes(index) & insideTunnel(p3, i)) {
                return true
            }
        }
        return false
    }

    // check if monkey is at an illegal location to be placed
    legalLocation() {
        // return if legal
        return (!this.onTrail() && !this.onMonkey() && this.water == this.onPond())
    }

    onPond() {
        let isInWater = false
        for (let index = 0; index < map.ponds.length; index++) {
            const pondD = map.ponds[index]
            for (let i = 0; i < pondD.length; i++) {
                const pond = pondD[i]
                if (checkCollision(pond, this, pond["radius"])) {
                    console.log("in water rn!")
                    isInWater = true
                }
            }
        }
        return isInWater
    }

    onMonkey() {
        for (let i = 0; i < monkeys.length; i++) {
            let monk = monkeys[i]
            if (monk != this) {
                const minDistance = MONKEY_RADIUS*(monk.radius + this.radius)
                if (checkCollision(monk, this, minDistance)) {
                    return true
                }
            }
        }
        return false;
    }

    

    getSkinImage() {
        const skins = monkeyImages[this.type-1]
        var skin = skins.origin
        const mainPath = this.mainPath

        const level = this.levels[mainPath]
        if (level >= 1) {
            skin = skins.levels[mainPath][level-1].normal
            const activatedSkin = skins.levels[mainPath][level-1].activated
            if (this.getActivated().length != 0 && activatedSkin) {
                skin = activatedSkin
            }
        }
        return skin
    }

    getBaseImage() {
        const base = monkeyImages[this.type-1].base
        if (base) {
            return base
        }
        return null
    }

    print() {
        // print range
        if (!isGameOver() && (this.showRange | this.relocating | this.menuOpen)) {
            var color = "black"
            if ( !this.legalLocation() | ( this.bought == false & money < this.price) ) { // if monkey is at an illegal location to be placed, then red range
                color = "red"
            }
            c.oval(this.x, this.y, this.range*2, this.range*2, color, 0, 0.2)
        }

        // print monkey
        const printSize = MONKEY_SIZE*this.size
        const baseImage = this.getBaseImage()
        label1: if (baseImage) {
            const printSizeBase = printSize*this.baseSizeRatio
            var xOffset = 0
            var yOffset = 0
            if (this.base) {
                if (!this.base.relocating && this.relocating) {
                    break label1
                }
                xOffset = this.base.xOffset
                yOffset = this.base.yOffset
            }
            c.img(this.x + xOffset, this.y + yOffset, printSizeBase, printSizeBase, baseImage)
        }
        if (this.animation == null) {
            // console.log(this.yOffset);
            
            c.img(this.x + this.xOffset, this.y + this.yOffset,printSize,printSize, this.getSkinImage(), this.angle-90)
        } else {
            if (!this.animation.src) {
                const animation = new AnimationEffect({
                    x: this.x,
                    y: this.y,
                    name: this.animation.name,
                    size: printSize,
                    speed: 0.5,
                })
                this.animation.src = animation
            }
            var animation = this.animation.src
            animation.x = this.x + this.xOffset
            animation.y = this.y + this.yOffset,
            animation.updateFrame(false)
            animation.print()
            
        }
    }

    findFarthestBalloon() {
        let farthest
        for (const balloon of balloons) {
            // filter hidden balloons
            if (balloon.hidden) {
                continue
            }
            // filter balloons outside visible radius
            let disB = calcMag(balloon.x, balloon.y, this.x, this.y)
            if (disB > this.range) {
                continue
            }
            if (farthest == undefined) {
                farthest = balloon
            } else {
                // farthest on track
                if (balloon.next > farthest.next || (balloon.next == farthest.next && balloon.distanceFromNextWayPoint() < farthest.distanceFromNextWayPoint())) { // if the current balloon is within the monkey's range, is farther on the track than the current farthest, and has completed less of its current waypoint than the current farthest balloon
                    farthest = balloon
                }
            }
        }
        return farthest
    
    }

    moveMonkey() {
        if (this.relocating) { // if monkey is relocating, quit the function
            return
        }
        console.log('No function overrided');
        
    }

    setMainPath () {
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i] > this.levels[this.mainPath]) {
                this.mainPath = i
            }
        }
    }

    canBuy(pathIndex, moneyWise=true) {
        const monkeyDATA = this.getMonkeyData()[pathIndex+1][this.levels[pathIndex]]
        if (!monkeyDATA) {
            return false
        }
        const filtered = this.levels.filter(l => l == 0)
        if (filtered.length == this.levels.length - MAX_PATHS && this.levels[pathIndex] == 0) {
            return false
        }
        if (this.levels[pathIndex] == LIMIT_ACTIVATED) { // if this has reached the activating limit activated, you can only upgrade up to that path rank
            for (let j = 0; j < this.levels.length; j++) {
                if (this.levels[j] > LIMIT_ACTIVATED & j != pathIndex){ // checks if any of the other paths are activated so you can upgrade yours up to there
                    return false
                }
            }
        }
        if (moneyWise) {
            return monkeyDATA.price < money
        }
        return true
        
    }

    getPrice(pathIndex) {
        const monkeyDATA = this.getMonkeyData()[pathIndex+1][this.levels[pathIndex]]
        return monkeyDATA.price
    }

    upgrade(index) {
        const level = this.levels[index]
        const data = this.getMonkeyData()
        const monkeyData = data[index+1][level]
        if (!monkeyData || !this.canBuy(index)) {
            return
        }

        // upgrading logic

        this.levels[index] += 1
        this.setMainPath()
        money -= monkeyData.price
        const activated = this.getActivated() // list of all activations

        
        this.setOrigin()
        for (let level = 0; level < this.levels[this.mainPath]; level++) {
            this.upgradeByData(data[this.mainPath+1][level])
        }
        if (activated.length != 0) {
            if (activated.includes(index)) {
                this.upgradeByData(data[0].activate[index])
            } else [
                this.upgradeByData(data[0].activate[activated[0]])
            ]
        }
        
    }

    upgradeByData(monkeyData) {
        for (const key in monkeyData) {
            const improvement = monkeyData[key];
            if (key == "arrow") {
                for (const subKey in improvement) {
                    this.arrow[subKey] = improvement[subKey]
                }

            } else {
                if (key == "activate") {

                } else if (key == "price") {
                    this.price += monkeyData.price
                } else {
                    this[key] = improvement                         
                }
            }
        }
    }
}



// shooter is defined by if it can rotate
class Shooter extends Monkey {
    
    shoot() {
        const arr = this.arrow
        var speed = arr.speed ? arr.speed : 1
        speed *= ARROW_DEFAULT_SPEED
        const size = arr.size ? arr.size : 1
        const health = arr.health ? arr.health : 1
        const offsets = arr.offset ? arr.offset : [[0, 0]]
        const range = arr.range ? arr.range : 3000
        const a2 = this.angle * -RADIAN
        const bomb = arr.bomb ? arr.bomb : null
        const alternating = arr.alternating && offsets.length > 1 ? arr.alternating : false
        const angleError = arr.angleError ? arr.angleError : 0
        const angleOffset = Math.random()*angleError*2 - angleError
        const angle = this.angle + angleOffset

        if (alternating) {
            shootByOffset(this.alternating_counter, this)
            this.alternating_counter = (this.alternating_counter + 1) % offsets.length
        } else {
            for (let i = 0; i < offsets.length; i++) {
                shootByOffset(i, this)
            }
        }
        
        function shootByOffset(index, me) {
            var offsetX = offsets[index][1]
            var offsetY = offsets[index][0]
            var a1 = Math.atan2(offsetY, offsetX)
            
            var a3 = a2 + a1

            var mag = calcMag(0, 0, offsetX, offsetY)
            
            var arrX = Math.cos(a3) * mag + me.x
            var arrY = Math.sin(a3) * mag + me.y
            
            let arrow = new Arrow({
                x: arrX,
                y: arrY,
                type: arr.type,
                strength: arr.strength,
                speed: speed,
                angle: angle,
                moneyMultiplier: me.moneyMultiplier,
                armoredBalloons: me.armoredBalloons,
                health,
                size,
                range,
                bomb,
                freeze: arr.freeze,
                monkeyParent: me,
            })
            console.log(arrow)

            arrows.push(arrow)

        }
    }

    shootTarget(target) { // shoots to hit target
        const arr = this.arrow
        var speed = arr.speed ? arr.speed : 1
        speed *= ARROW_DEFAULT_SPEED
        const size = arr.size ? arr.size : 1
        const health = arr.health ? arr.health : 1
        // const offsets = arr.offset ? arr.offset : [[0, 0]]
        // const range = arr.range ? arr.range : 3000
        // const a2 = this.angle * -RADIAN
        const bomb = arr.bomb ? arr.bomb : null

        var constTarget = null
        if (arr.constTarget) {
            constTarget = {
                x: target.x,
                y: target.y,
            }
        }
        let arrow = new Arrow({
            x: this.x,
            y: this.y,
            type: arr.type,
            strength: arr.strength,
            speed,
            target: target.id,
            bomb,
            size,
            health,
            armoredBalloons: this.armoredBalloons,
            freeze: arr.freeze,
            angle: this.angle,
            monkeyParent: this,
            guided: arr.guided,
            constTarget: constTarget,
            hitControl: arr.hitControl,
        })
        arrows.push(arrow)
    }

    moveMonkey() {
        if (this.relocating || isGameOver()) { // if monkey is relocating, quit the function
            return
        }
        let target = this.findFarthestBalloon()
        if (target == undefined) { // if no balloon was found
            return
        } else if ((time-this.creationTime) % Math.max(Math.round(this.cooldown/speedFactor), 1) == 0) { // if the time is a multiple of the monkey's cooldown time
            if (this.numShooters > 1) {
                const angleMultiplier = 360/this.numShooters
                for (let num = 0; num < this.numShooters; num++) {
                    this.angle = num*angleMultiplier;
                    this.shoot() // make the monkey shoot using the 'shoot' function of the monkey object
                }
                this.angle = 90
            } else if (this.target) {
                this.shootTarget(target)
            } else {
                this.shoot() // make the monkey shoot using the 'shoot' function of the monkey object
            }
        }
            
        if (this.rotatable) {
            var angle = Math.atan2(target.y - this.y, target.x - this.x) // calculate the angle between the monkey and the farthest balloon using 'Math.atan2'
            
            angle /= -RADIAN // convert the angle from radians to degrees by dividing by the constant 'RADIAN' and negate the result
            
            this.angle = angle
        }
        
    }
}

// shooter is defined by if it can rotate
class Factory extends Monkey {
    constructor({ x, y, type=1 }) {
        super({x, y, type})
    }

    moveMonkey() {
        if (this.relocating || isGameOver()) { // if monkey is relocating, quit the function
            return
        }
        this.moneyFactory()
    }

    moneyFactory() {
        // if money just moved on the map, then it can't generate money for half the cooldown
        if ((time-this.creationTime) > this.cooldown/2 && (time-this.creationTime) % Math.round(this.cooldown/speedFactor) == 0) {
            const printSize = MONKEY_SIZE*this.size
            const minRadius = printSize
            // const minRadius = this.range/2
            const randomAngle = Math.PI*2*Math.random()
            const randomRadius = minRadius + (this.range-minRadius)*Math.random()
            var sunPos = {
                x: this.x + randomRadius * Math.sin(randomAngle),
                y: this.y + randomRadius * Math.cos(randomAngle),
            }
            // make sure that it won't land out of bounds
            sunPos.x = sunPos.x > MW ? MW : sunPos.x
            sunPos.x = sunPos.x < 0 ? 0 : sunPos.x
            sunPos.y = sunPos.y > MH ? MH : sunPos.y
            sunPos.y = sunPos.y <= 0 ? 0 : sunPos.y
            
            coins.push(new Coin({
                x: this.x,
                y: this.y,
                target: {
                    x: sunPos.x,
                    y: sunPos.y,
                },
                value: this.factory.money,
                lifeTime: this.factory.lifeTime,
            }))
        }        
    }
}

class Inferno extends Monkey {
    constructor({ x, y, type=1 }) {
        super({x, y, type})
        this.targets = []
    }

    moveMonkey() {
        if (this.relocating || isGameOver()) { // if monkey is relocating, quit the function
            return
        }
        this.moveInferno()
    }

    updateStrongestBalloons(count = 1) {
        var visibleBalloons = balloons.filter(b => {
            return calcMag(b.x, b.y, this.x, this.y) <= this.range && !b.pop && !b.hidden
        })
        this.targets = this.targets.filter(b => visibleBalloons.includes(b))
        if (this.targets.length == count) {
            return
        }
        visibleBalloons = visibleBalloons.filter(b => !this.targets.includes(b))
        let strongest = null
        for (const balloon of visibleBalloons) {
            if (strongest == null || strongest.health < balloon.health) {
                strongest = balloon
            }
        }
        if (strongest != null) {
            this.targets.push(strongest)
        }
    }

    printInfernoBeam() {
        if (isGameOver()) {
            return
        }
        for (const balloon of this.targets) {
            c.line([{x: this.x, y: this.y-120}, balloon], 'yellow', 15)
            c.line([{x: this.x, y: this.y-120}, balloon], 'orange', 9)
            c.line([{x: this.x, y: this.y-120}, balloon], 'red', 3)
        }
    }

    moveInferno() {
        this.updateStrongestBalloons(5)
        for (const balloon of this.targets) {
            balloon.applyDamage(0.1)
            
        }
        
    }
}