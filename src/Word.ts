import BasicElement from "./BasicElement";

// 文本
class Word extends BasicElement {
    text: string;
    c: string;
    constructor(text, offsetX, offsetY, c, zindex?) {
        super(offsetX, offsetY, zindex);
        this.text = text;
        this.c = c;
    }

    draw(ctx) {
        ctx.fillStyle = "#000";
        ctx.font = "24px STheiti, SimHei";
        ctx.fillText(this.text, this.x, this.y);
    }
}

export default Word