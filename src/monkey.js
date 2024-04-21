// Monkey properties
const MONKEY_SIZE = 80
const MONK_COOLDOWN = 0
const TRAIL_MARGIN = 50
const MONKEY_RADIUS = 32
const LIMIT_ACTIVATED = 2

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
        const data = MONKEY_DATA[this.type-1]
        var levels = []
        for (let i = 1; i < data.length; i++) {
            levels.push(0)
        }

        this.levels = levels

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
        this.alternating_counter = 0
    }

    setOrigin() {
        const data = MONKEY_DATA[this.type-1]
        const origin = JSON.parse(JSON.stringify(data[0].origin))
        this.arrow = origin.arrow
        this.range = origin.range
        this.cooldown = origin.cooldown
        this.price = origin.price
        this.size = origin.size ? origin.size : 1
        this.armored_balloons = origin.armored_balloons ? origin.armored_balloons : false
        this.base_size_ratio = origin.base_size_ratio ? origin.base_size_ratio : 0.8
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
    }

    /**
     * Makes the monkey shoot an arrow.
     */
    shoot() {
        // let clone = pop.cloneNode(true)
        // clone.volume = 0.02;
        // clone.volume = 0
        // clone.play()

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
                health,
                size,
                range,
                bomb,
                armored_balloons: me.armored_balloons
            })
            arrows.push(arrow)

        }
    }

    /**
     * Checks if the monkey is too close to the trail.
     * @returns {boolean} True if the monkey is close to the trail, otherwise false.
     */
    onTrail() {
        // Loop through every two close waypoints on the trail
        for (let i = 0; i < WAYPOINTS.length-1; i++) {
            let p1 = WAYPOINTS[i]  // First waypoint
            let p2 = WAYPOINTS[i+1]  // Second waypoint
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

    canBuy(pathIndex) {
        const monkeyDATA = MONKEY_DATA[this.type-1][pathIndex+1][this.levels[pathIndex]]
        let canBuy = true
        if (this.levels[pathIndex] >= LIMIT_ACTIVATED) {
            for (let j = 0; j < this.levels.length; j++) {
                if (this.levels[j] > LIMIT_ACTIVATED & j != pathIndex){
                    canBuy = false
                }
            }
        }
        canBuy = canBuy && monkeyDATA.price < money
        return canBuy
    }

    getActivated() {
        var activated = null
        var maxIndex = 0
        // find index of highest level from all upgrade sets
        // reason: not supposed to be activated
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i] > this.levels[maxIndex]) {
                maxIndex = i
            }
        }
        // checks if there is a different path that has came to activated level
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i] == LIMIT_ACTIVATED & i != maxIndex) {
                if (activated == null) {
                    activated = []
                }
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
        for (let i = 0; i < TUNNELS.length; i++) {
            let t = TUNNELS[i]
            if (t.under.includes(index) & insideTunnel(p3, i)) {
                return true
            }
        }
        return false
    }

    // check if monkey is at an illegal location to be placed
    legalLocation() {
        // if not on trail and not on a different monkey than legal
        return (!this.onTrail() & !this.onMonkey())
    }

    onMonkey() {
        for (let i = 0; i < monkeys.length; i++) {
            let monk = monkeys[i]
            if (monk != this) {
                if (checkCollision(monk, this, MONKEY_RADIUS*2)) {
                    return true
                }
            }
        }
        return false;
    }

    findMonkeyPrintImageSkinOrBase() {
        let returnSkin = [undefined, undefined]
        let base_image = monkeyImages[this.type-1].base
        if (base_image) {
            returnSkin[0] = base_image
        }
        
        const skins = monkeyImages[this.type-1]
        var skin = skins.origin
        var maxIndex = 0
        for (let i = 0; i < this.levels.length; i++) {
            if (this.levels[i] > this.levels[maxIndex]) {
                maxIndex = i
            }
        }

        const level = this.levels[maxIndex]
        if (level >= 1) {
            skin = skins.levels[maxIndex][level-1].normal
            const activatedSkin = skins.levels[maxIndex][level-1].activated
            if (this.getActivated() != null && activatedSkin) {
                skin = activatedSkin
            }
        }
        returnSkin[1] = skin
        return returnSkin
    }

    print() {
        // print range
        if (this.showRange | this.relocating | this.menuOpen) {
            var color = "black"
            if ( !this.legalLocation() | ( this.bought == false & money < this.price) ) { // if monkey is at an illegal location to be placed, then red range
                color = "red"
            }
            c.oval(this.x, this.y, this.range*2, this.range*2, color, 0, 0.2)
        }

        // print monkey
        let print_size = MONKEY_SIZE*this.size
        let monkeyImage = this.findMonkeyPrintImageSkinOrBase()
        if (monkeyImage[0] != undefined) {
            let printSizeBase = print_size*this.base_size_ratio
            c.img(this.x,this.y,printSizeBase,printSizeBase, monkeyImage[0])
        }
        c.img(this.x,this.y,print_size,print_size, monkeyImage[1], this.angle-90)
        
    }

    findFarthestballoon() { // function to find the farthest balloon from the monkey
        let farthest; // variable to store the farthest balloon found so far
        for (const balloon of balloons) {
            if (balloon.hidden) {
                continue
            }
            let disB = calcMag(balloon.x, balloon.y, this.x, this.y) // calculate the distance between the current balloon and the monkey using the 'calcMag' function and store it in the 'disB' variable
            if (farthest == undefined) { // if no farthest balloon was found yet
                if (disB <= this.range) { // if the current balloon is within the monkey's range
                    farthest = balloon; // set the current balloon as the farthest
                }
            } else {
                // farthest on track
                if (disB <= this.range && balloon.next >= farthest.next && balloon.calculatePercentDoneOfWayPoint() < farthest.calculatePercentDoneOfWayPoint()) { // if the current balloon is within the monkey's range, is farther on the track than the current farthest, and has completed less of its current waypoint than the current farthest balloon
                    farthest = balloon; // set the current balloon as the new farthest
                }
            }
        }
        return farthest; // return the farthest balloon found
    }

    moveMonkey() {
        if (this.relocating) { // if monkey is relocating, quit the function
            return
        }
        let next = this.findFarthestballoon() // find the farthest balloon from the monkey using the 'findFarthestballoon' function and store it in the 'next' variable
        if (next == undefined) { // if no balloon was found
            return
        } else if (time % this.cooldown == MONK_COOLDOWN) { // if the time is a multiple of the monkey's cooldown time
            this.shoot() // make the monkey shoot using the 'shoot' function of the monkey object
        }
        var angle = Math.atan2(next.y - this.y, next.x - this.x) // calculate the angle between the monkey and the farthest balloon using 'Math.atan2'
        angle /= -RADIAN // convert the angle from radians to degrees by dividing by the constant 'RADIAN' and negate the result
        this.angle = angle // update the position of the monkey using the 'updatePosition' function of the monkey object with the calculated angle
    }
    
}