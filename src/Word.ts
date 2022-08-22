import BasicElement from "./BasicElement";

interface WordOption {
    x?: number,
    y?: number,
    offsetX: number,
    offsetY: number,
    text: string,
    color?: string,
    font?: string
    zindex?: number
}

// 文本
class Word extends BasicElement {
    text: string;
    color: string;
    font: string;
    constructor(option: WordOption) {
        super(option);
        this.text = option.text;
        this.color = option.color || "#000";
        this.font = option.font || "14px cursive"
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.text, this.x, this.y, 200);
    }
}

export default Word