import Container from "./Container";
import Icon from "./Icon";
import Rect from "./Rect";
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
    word: Word;
    icon: Icon;
    container: Container;
    bg: Rect;
    constructor(option: TextElmOption) {
        this.container = new Container({
            x: option.x,
            y: option.y,
            w: option.w,
            h: option.h
        });
        this.container.type = "TextElm"

        this.bg = new Rect({
            x: 0,
            y: 0,
            w: option.w,
            h: option.h,
            offsetX: 0,
            offsetY: 0,
            color: "pink"
        })
        this.bg.addEvent("click", (t) => {
            this.container.setActive(true);
        });

        this.icon = new Icon({
            offsetX: option.w - 20,
            offsetY: 0,
            w: 20,
            h: 20,
            src: "./close.png"
        }); // icon固定在容器右上角

        this.icon.addEvent("click", (t) => {
            this.container.destory();
        });

        this.word = new Word({
            text: option.text,
            offsetX: 0,
            offsetY: option.h / 2,
            color: "blue"
        }); // 文本垂直居中

        this.container.add(this.bg)
        this.container.add(this.icon);
        this.container.add(this.word);

        return <any>this.container
    }

}

export default TextElm