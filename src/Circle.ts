import BasicElement from "./BasicElement";

// 圆
class Circle extends BasicElement {
    r: number;
    c: string;
    type: string;
    constructor(offsetX, offsetY, r, c, zindex) {
        super(offsetX, offsetY, zindex);
        this.r = r;
        this.c = c;
        this.type = "cirlce";
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.c;
        ctx.fill();
        ctx.closePath();
    }
    // 判断点是否在圆内
    pointInElement(x, y) {
        return Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) <= Math.pow(this.r, 2);
    }
}

export default Circle