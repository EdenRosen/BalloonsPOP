class AnimationEffect {
    constructor({ x, y, name, size, speed }) {
        this.x = x
        this.y = y
        this.name = name
        this.frame = 0
        this.size = size
        this.speed = speed
    }

    updateFrame(terminal=true) {
        if (this.frame == 0) {
            this.frame = 1
        } else {
            this.frame += this.speed
        }
        const frameLimit = animationsData[this.name].length
        if (this.frame >= frameLimit+1) {
            if (terminal) {
                this.delete()
            } else {
                this.frame = 1
            }
            
        }
    }

    print() {
        if (this.frame == 0) {
            return
        }
        const frameIndex = Math.floor(this.frame)
        const frame = animationsData[this.name][frameIndex-1]
        c.img(this.x, this.y, this.size, this.size, frame)
    }

    delete() {
        const index = animations.indexOf(this);
        if (index != -1) {
            animations.splice(index, 1);
        }
    }
}