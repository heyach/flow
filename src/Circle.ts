import BasicElement from "./BasicElement";

interface CircleOption {
    x: number,
    y: number,
    offsetX: number,
    offsetY: number,
    r: number,
    color?: string,
    zindex?: number
}

// 圆
class Circle extends BasicElement {
    r: number;
    type: string;
    color: string;
    constructor(option: CircleOption) {
        super(option);
        this.r = option.r;
        this.color = option.color || "#000";
        this.type = "cirlce";
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
    // 判断点是否在圆内
    pointInElement(x, y) {
        return Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2) <= Math.pow(this.r, 2);
    }
}

export default Circle