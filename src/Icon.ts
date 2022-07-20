import BasicElement from "./BasicElement";

// 图片
class Icon extends BasicElement {
    w: number;
    h: number;
    type: string;
    image: HTMLImageElement;
    // icon的offset是相对父容器的，比如父容器在100， 100， { 10, 10 }表示{ 110, 110 }的位置
    constructor(offsetX, offsetY, w, h, src) {
        super(offsetX, offsetY);
        this.w = w;
        this.h = h;
        this.type = "icon";
        this.image = new Image();
        this.image.src = src;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    // 点是否在icon图标上
    pointInElement(x, y) {
        // 假设内置close大小为20*20，在元素右上角
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
}

export default Icon