const arrowSizeX = 75; // Constant for the arrow's x-size
const arrowSizeY = 81; // Constant for the arrow's y-size
const ARROW_DEFAULT_SPEED = 20

class Arrow {

    /**
     * Creates a new Arrow instance.
     * @param {number} strength - The strength of the arrow.
     * @param {number} x - The starting X position of the arrow.
     * @param {number} y - The starting Y position of the arrow.
     * @param {number} type - The arrow's image number.
     * @param {number} speed - The speed of the arrow.
     * @param {number} angle - The starting angle of the arrow.
     * @param {number} moneyMultiplier - The money multiplier.
     * @param {number} [health=1] - The health of the arrow.
     */
    constructor({
        x, y, type, strength=1, speed=1, angle=null, moneyMultiplier=1, health=1,
        size=1, range=4000, bomb=null, armoredBalloons=false, monkeyParent=null,
        freeze=false, target=null, guided=false, constTarget=null, hitControl=false,
    }) {
        this.x = x
        this.y = y
        this.type = type
        this.strength = strength
        this.START_POSITION_X = x
        this.START_POSITION_Y = y
        this.speed = speed
        this.angle = angle
        this.moneyMultiplier = moneyMultiplier
        this.health = health
        this.size = size
        this.range = range
        this.bomb = bomb
        this.armoredBalloons = armoredBalloons
        this.monkeyParent = monkeyParent
        this.freeze = freeze
        this.target = target
        this.guided = guided
        this.constTarget = constTarget
        this.hitControl = hitControl
        this.dy = 0
        this.dx = 0
    }

    /**
     * Updates the position of the arrow based on its angle and speed.
    */
    updatePosition() {
        if (this.target && this.guided) { // guided missile shooting
            const targetBalloon = balloons.find(b => b.id == this.target && !b.hidden)
            if (targetBalloon) {
                var desiredAngle = Math.atan2(-targetBalloon.y+this.y, targetBalloon.x-this.x)/Math.PI*180
                var angleTurn = desiredAngle - this.angle 
                if (Math.abs(360 + angleTurn) < Math.abs(angleTurn)) {
                    angleTurn = 360 + angleTurn
                }
                const turnLimit = 2
                if (angleTurn > turnLimit) {
                    angleTurn = turnLimit
                } else if (angleTurn < -turnLimit) {
                    angleTurn = -turnLimit
                }
                this.angle += angleTurn
                // this.angle = desiredAngle

                var dx = this.speed * (speedFactor)/GAME_SPEEDS[0] * Math.cos(-(this.angle) * Math.PI / 180)
                var dy = this.speed * (speedFactor)/GAME_SPEEDS[0] * Math.sin(-this.angle * Math.PI / 180)
                var dr = calcMag(0, 0, dx, dy)
                this.range -= dr
                this.x += dx
                this.y += dy
                if (this.range < 0) {
                    this.deleteArrow()
                }
                return
            }
            this.target = 0
        } else if (!this.constTarget && !this.target) { // regular shooting
            var dx = this.speed * (speedFactor)/GAME_SPEEDS[0] * Math.cos(-(this.angle) * Math.PI / 180)
            var dy = this.speed * (speedFactor)/GAME_SPEEDS[0] * Math.sin(-this.angle * Math.PI / 180)
            var dr = calcMag(0, 0, dx, dy)
            this.range -= dr
            this.x += dx
            this.y += dy
            if (this.range < 0) {
                this.deleteArrow()
            }
        } else { // ballistic shooting
            console.log("watermelon")
            // option 1

            const rTarget = {
                x: this.constTarget.x-this.monkeyParent.x,
                y: -(this.constTarget.y-this.monkeyParent.y)
            }
            // if (rTarget.x > 0) {
            //     this.x += 2
            // } else {
            //     this.x += -2
            // }
            const dx = rTarget.x/100
            this.x += dx
            const xValue = this.x - this.monkeyParent.x
            
            var dy = 4
            if (rTarget.x < 0) {
                dy = -dy
            }
            const aCoe = (rTarget.y - dy*rTarget.x) / Math.pow(rTarget.x, 2)
            const yTemp = aCoe*xValue*xValue + dy*xValue
            // speed = calcMag(yTemp, 1)
            var dy = -this.y
            this.y = this.monkeyParent.y - yTemp
            dy += this.y
            
            const angle = Math.atan2(-dy, dx)/Math.PI*180
            this.angle = angle
        }  



        // option 2

        // dx * (Y2+X2^2)/(X2) = dy




        // option 3 - ballistics

        // const rTarget = {
        //     x: this.target.x-this.monkeyParent.x,
        //     y: -(this.target.y-this.monkeyParent.y)
        // }

        // const g = 0.5

        // if (this.dx == 0) {
        //     this.dy = 15
        //     const t = (this.dy-rTarget.y)/g
        //     console.log(t);
        //     this.dx = rTarget.x/t*7.7
        // }

        


        // this.x += this.dx
        // this.y -= this.dy
        // this.dy -= g
    }

    activateBomb() {
        for (let index = 0; index < balloons.length; index++) {
            const balloon = balloons[index];
            if (balloon.hidden) {
                continue // Skip hidden balloons
            }

            const collision = checkCollision(this, balloon, this.bomb.radius)
            if (collision) {
                balloon.hit(this)
            }
        }
        const sizeParam = this.bomb.size ? this.bomb.size : 1
        const size = this.bomb.radius * 2 * sizeParam
        
        const animation = new AnimationEffect({
            x: this.x,
            y: this.y,
            name: this.bomb.animation,
            size,
            speed: this.bomb.speed * (speedFactor)/GAME_SPEEDS[0],
        })
        animations.push(animation)
    }

    /**
     * Checks if the arrow hits any balloons and handles interactions.
     * @returns {boolean} True if the arrow hits a balloon, otherwise false.
    */
    BalloonHitCheck() {
        if (this.target && this.hitControl) {
            const coll = checkCollision(this, this.target, BALLOON_SIZE_X)
            if (coll) {
                let balloon = this.target
                this.target = null
                this.hit(balloon)
            }
            return
        }
            
        for (let index = 0; index < balloons.length; index++) {
            const balloon = balloons[index];
            if (balloon.hidden) {
                continue // Skip hidden balloons
            }
            
            const collision = checkCollision(this, balloon, BALLOON_SIZE_X)
            if (collision) {
                //hit the balloon...
                if (this.hit(balloon)) {
                    return
                }
            }
        }
    }

    hit(balloon) {
        if (!this.bomb) {
            balloon.hit(this); // Reduce balloon health and check if popped
            this.health -= 1; // Decrease arrow's health by 1
            if (this.health <= 0) {
                this.deleteArrow()
                return true
            }
        } else {
            this.activateBomb()
            this.deleteArrow()
            return true
        }
        return false
    }



    /**
     * Moves the arrow, updating its position and checking for collisions.
    */
    moveArrow() {
        this.updatePosition()
        this.BalloonHitCheck()
        if (this.getRadius() > 2000) {
            this.deleteArrow() // Delete arrow if it's dead
        }
    }

    /**
     * Prints the arrow on the canvas.
     * @returns {boolean} True if the arrow should be removed from the game, otherwise false.
    */
    print() {
        c.img(this.x, this.y, arrowSizeX*this.size, arrowSizeY*this.size, arrowImages[this.type - 1], this.angle - 90)
    }

    getRadius() {
        return calcMag(this.x, this.y, this.START_POSITION_X, this.START_POSITION_Y)
    }

    /**
     * Deletes the arrow from the game.
    */
    deleteArrow() {
        index = arrows.indexOf(this);
        if (index != -1) {
            arrows.splice(index, 1);
        }
    }
}