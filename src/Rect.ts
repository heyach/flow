import BasicElement from "./BasicElement";

// 矩形
class Rect extends BasicElement {
    w: number;
    h: number;
    type: string;
    c: string;
    constructor(offsetX, offsetY, w, h, c, zindex) {
        super(offsetX, offsetY, zindex);
        this.w = w;
        this.h = h;
        this.type = "rect";
        this.c = c;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    // 点是否在矩形内
    pointInElement(x, y) {
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
}

export default Rect