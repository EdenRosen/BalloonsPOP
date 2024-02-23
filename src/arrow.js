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
     * @param {number} startingAngle - The starting angle of the arrow.
     * @param {number} moneyMultiplier - The money multiplier.
     * @param {number} [health=1] - The health of the arrow.
     */
    constructor(x, y, type, strength, speed, startingAngle, moneyMultiplier, health, size, range) {
        this.x = x
        this.y = y
        this.type = type
        this.strength = strength
        this.START_POSITION_X = x
        this.START_POSITION_Y = y
        this.speed = speed
        this.angle = startingAngle
        this.moneyMultiplier = moneyMultiplier
        this.health = health
        this.size = size
        this.range = range
    }

    /**
     * Updates the position of the arrow based on its angle and speed.
    */
    updatePosition() {
        var dx = this.speed * Math.cos(-(this.angle) * Math.PI / 180)
        var dy = this.speed * Math.sin(-this.angle * Math.PI / 180)
        var dr = calcMag(0, 0, dx, dy)
        this.range -= dr
        this.x += dx
        this.y += dy
        if (this.range < 0) {
            this.deleteArrow()
        }
    }

    /**
     * Checks if the arrow hits any balloons and handles interactions.
     * @returns {boolean} True if the arrow hits a balloon, otherwise false.
    */
    BalloonHitCheck() {
        // Check if the arrow hits a balloon
        for (let index = 0; index < balloons.length; index++) {
            const balloon = balloons[index];
            if (balloon.hidden) {
                continue // Skip hidden balloons
            }
            
            
            const check = checkCollision(this, balloon, BALLOON_SIZE_X)
            if (check) {
                balloon.hit(this); // Reduce balloon health and check if popped
                this.health -= 1; // Decrease arrow's health
                if (this.health <= 0) {
                    return true; // Arrow is dead
                }
            }
        }
        return false; // Arrow did not hit any balloon
    }

    /**
     * Moves the arrow, updating its position and checking for collisions.
    */
    moveArrow() {
        this.updatePosition();
        if (this.BalloonHitCheck() || this.getRadius > 1000) {
            this.deleteArrow(); // Delete arrow if it's dead
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