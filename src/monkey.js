// Monkey properties
const MONKEY_SIZE = 80
const MONK_COOLDOWN = 0
const TRAIL_MARGIN = 50
const MONKEY_RADIUS = 32

// Monkey data configuration


class Monkey {
    /**
     * Represents a monkey with various properties.
     * @constructor
     * @param {number} x - The initial x-coordinate of the monkey.
     * @param {number} y - The initial y-coordinate of the monkey.
     * @param {number} type - The type of the monkey.
     * @param {number} arrowType - The type of arrow the monkey uses.
     * @param {number} strength - The strength of the monkey's attack.
     * @param {number} arrowHealth - The health of the monkey's attack.
     * @param {number} range - The attack range of the monkey.
     * @param {number} cooldown - The cooldown time between attacks.
     * @param {number} [price=0] - The amount of price the monkey has.
     * @param {number} [size=1] - The size factor of the monkey.
     * @param {number} [level=1] - The level of the monkey.
     */
    constructor(x, y, type=1, level=1, data = MONKEY_DATA[type-1][level-1]) {
        // Initialize monkey properties
        this.type = type
        this.level = level

        this.arrow = data.arrow
        this.range = data.range
        this.cooldown = data.cooldown
        this.price = data.price
        this.size = data.size ? data.size : 1

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
        const arr = this.arrow
        var speed = arr.speed ? arr.speed : 1
        var size = arr.size ? arr.size : 1
        var offsets = arr.offset ? arr.offset : [[0, 0]]
        var range = arr.range ? arr.range : 3000
        speed *= ARROW_DEFAULT_SPEED
        var a2 = this.angle * -RADIAN

        for (let i = 0; i < offsets.length; i++) {
            var offsetX = offsets[i][1]
            var offsetY = offsets[i][0]
            var a1 = Math.atan2(offsetY, offsetX)
            var a3 = a2 + a1

            var mag = calcMag(0, 0, offsetX, offsetY)

            var arrX = Math.cos(a3) * mag + this.x
            var arrY = Math.sin(a3) * mag + this.y

            
            let arrow = new Arrow(
                arrX, arrY,
                arr.type,
                arr.strength,
                speed,
                this.angle,
                this.moneyMultiplier,
                arr.health,
                size,
                range,
            )
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
            } else { // neither
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
        let base_image = monkeyImages[this.type-1].base
        if (base_image) {
            let print_size_base = print_size*0.8
            c.img(this.x,this.y,print_size_base,print_size_base, base_image)
        }
        c.img(this.x,this.y,print_size,print_size, monkeyImages[this.type-1].skin[0], this.angle-90)
    }

    findFarthestballoon() { // function to find the farthest balloon from the monkey
        let farthest; // variable to store the farthest balloon found so far
        for (let index = 0; index < balloons.length; index++) { // iterate over all balloons in the 'balloons' array
            const balloon = balloons[index]; // get the balloon object from the 'balloons' array using the current index
            if (balloon.hidden) {
                continue
            }
            let disB = calcMag(balloon.x, balloon.y, monkey.x, monkey.y) // calculate the distance between the current balloon and the monkey using the 'calcMag' function and store it in the 'disB' variable
            if (farthest == undefined) { // if no farthest balloon was found yet
                if (disB <= monkey.range) { // if the current balloon is within the monkey's range
                    farthest = balloon; // set the current balloon as the farthest
                }
            } else {
                // farthest on track
                if (disB <= monkey.range && balloon.next >= farthest.next && balloon.calculatePercentDoneOfWayPoint() < farthest.calculatePercentDoneOfWayPoint()) { // if the current balloon is within the monkey's range, is farther on the track than the current farthest, and has completed less of its current waypoint than the current farthest balloon
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
        var angle = Math.atan2(next.y - monkey.y, next.x - monkey.x) // calculate the angle between the monkey and the farthest balloon using 'Math.atan2'
        angle /= -RADIAN // convert the angle from radians to degrees by dividing by the constant 'RADIAN' and negate the result
        monkey.angle = angle // update the position of the monkey using the 'updatePosition' function of the monkey object with the calculated angle
    }
    
}