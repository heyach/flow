import Container from "./Container";
import Icon from "./Icon";
import Stage from "./Stage";
import Word from "./Word";

// 一个基础组件，由一个外框，一行文本和一个删除icon
class TextElm {
    text: string;
    x: number;
    y: number;
    word: Word;
    icon: Icon;
    container: any;
    c: string;
    h: number;
    w: number;
    parent: Stage;
    constructor(text, x, y, w, h, c, parent) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.container = null;
        this.icon = null;
        this.word = null;
        this.parent = parent

        this.init();
        return this.container
    }

    init() {
        this.container = new Container(this.x, this.y, this.w, this.h, this.c);
        this.icon = new Icon(this.w - 20, 0, 20, 20, "./close.png"); // icon固定在容器右上角

        this.icon.addEvent("click", (t) => {
            this.parent.remove(this.container);
        });

        this.word = new Word(this.text, 0, this.h / 2, "blue"); // 文本垂直居中
        this.container.add(this.icon);
        this.container.add(this.word);
    }
}

export default TextElm