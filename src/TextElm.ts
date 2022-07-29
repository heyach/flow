import Container from "./Container";
import Icon from "./Icon";
import Stage from "./Stage";
import Word from "./Word";

interface TextElmOption {
    text: string;
    x: number;
    y: number;
    h: number;
    w: number;
    color: string;
    parent: Stage
}

// 一个基础组件，由一个外框，一行文本和一个删除icon
class TextElm {
    text: string;
    x: number;
    y: number;
    h: number;
    w: number;
    word: Word;
    icon: Icon;
    container: Container;
    color: string;
    parent: Stage;
    constructor(option: TextElmOption) {
        this.text = option.text;
        this.x = option.x;
        this.y = option.y;
        this.w = option.w;
        this.h = option.h;
        this.color = option.color;
        this.container = null;
        this.icon = null;
        this.word = null;
        this.parent = option.parent

        this.init();
        return <any>this.container
    }

    init() {
        this.container = new Container(this.x, this.y, this.w, this.h, this.color);
        this.icon = new Icon({
            offsetX: this.w - 20,
            offsetY: 0,
            w: 20,
            h: 20,
            src: "./close.png"
        }); // icon固定在容器右上角

        this.icon.addEvent("click", (t) => {
            this.parent.remove(this.container);
        });

        this.word = new Word({
            text: this.text,
            offsetX: 0,
            offsetY: this.h / 2,
            color: "blue"
        }); // 文本垂直居中
        this.container.add(this.icon);
        this.container.add(this.word);
    }
}

export default TextElm