import BasicElement from "./BasicElement"

// 一个人物
class Person extends BasicElement {
    x: number
    y: number
    w: number
    h: number
    image: HTMLImageElement
    run: boolean
    runIndex: number
    reqAnimation: any
    interval: number
    lastTime: number
    constructor(option) {
        super(option)
        this.offsetX = option.offsetX
        this.offsetY = option.offsetY
        this.w = option.w
        this.h = option.h
        this.image = new Image()
        this.image.src = option.src
        
        this.run = false
        this.runIndex = 0
        this.lastTime = 0
        this.reqAnimation = null
        this.interval = 125
    }
    draw(ctx) {
        ctx.drawImage(this.image, 0 + this.runIndex % 8 * this.w, 0, this.w, this.h, this.x + this.offsetX, this.y + this.offsetY, this.w, this.h);
    }
    animate(timestamp) {
        this.reqAnimation = requestAnimationFrame(Person.prototype.animate.bind(this))
        if(timestamp - this.lastTime > this.interval) { 
            this.runIndex++
            this.lastTime = timestamp;
        }
    }
    play() {
        this.run = true
        this.animate(0)
    }
    stop() {
        this.run = false
        cancelAnimationFrame(this.reqAnimation)
        this.reqAnimation = null
    }
    pointInElement(x, y) {
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
}

export default Person