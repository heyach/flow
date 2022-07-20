import AutoZindex from "./AutoZindex";
import Container from "./Container";
import guid from "./guid";

// 基础元素
class BasicElement {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
    id: string;
    zindex: number;
    active: boolean;
    event: {};
    parent: Container;
    constructor(offsetX?, offsetY?, zindex?) {
        this.x = 0;
        this.y = 0;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.id = guid();
        this.zindex = zindex ? zindex : AutoZindex.getIndex();
        this.active = false;
        this.event = {};
        this.parent = null;
    }
    setActive(f) {
        this.active = f;
    }
    updatePosition(x, y) {
        this.x = x + this.offsetX;
        this.y = y + this.offsetY;
    }
    addEvent(key, fn) {
        this.event[key] = this.event[key] || [];
        this.event[key].push(fn);
    }
    dispatchEvent(key) {
        this.event[key] && this.event[key].forEach((item) => item(this));
    }
}

export default BasicElement