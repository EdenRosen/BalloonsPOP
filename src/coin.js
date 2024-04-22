class Coin {
    constructor(x,y) {
        this.x = x
        this.y = y
    }

    print() {
        c.img(this.x,this.y,50,50, generalImages[3])
    }
}