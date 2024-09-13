const COIN_SIZE = 70
class Coin {
    constructor({ x, y, value, target, lifeTime }) {
        this.x = x
        this.y = y
        this.value = value
        this.range = COIN_SIZE*1.5
        this.target = target
        this.collecting = false
        this.lifeTime = time + lifeTime
    }

    print() {
        c.img(this.x,this.y,COIN_SIZE,COIN_SIZE, generalImages['sun1'])
    }

    delete() {
		var index = coins.indexOf(this)
		if (index != -1) {
			coins.splice(index, 1)
		}
    }

    update() {
        if (this.lifeTime == time) {
            this.delete()
        }
        const tx = this.target.x
        const ty = this.target.y
        const distance = calcMag(tx, ty, this.x, this.y)
        if (distance < 1) {
            this.x = this.target.x
            this.y = this.target.y
            if (this.collecting) {
                money += this.value
                this.delete()
                return
            }
        }
        if (this.x != tx || this.y != ty) {
            var speed = 0.07
            if (this.collecting) {
                speed = 0.1
            }
            const angle = Math.atan2(ty - this.y, tx - this.x)
            const sx = speed * Math.cos(angle) * (distance + 10)
            const sy = speed * Math.sin(angle) * (distance + 10)
            this.x += sx
            this.y += sy
        }
        if (!this.collecting && calcMag(this.x, this.y, mouse.x, mouse.y) < this.range) {
            this.target.x = 273
            this.target.y = 63
            this.collecting = true
        }
    }
}