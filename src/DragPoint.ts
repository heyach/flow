// 拖拽点

import AutoZindex from "./AutoZindex";

interface DragPointOption {
    x: number;
    y: number;
    r: number;
    color?: string;
    zindex?: number
}

class DragPoint {
    x: number;
    y: number;
    r: number;
    color: string;
    type: string;
    zindex: any;
    active: any;
    event: {};
    parent: any;
    constructor(option: DragPointOption) {
        this.x = option.x;
        this.y = option.y;
        this.r = option.r;
        this.color = option.color || "blue";
        this.zindex = option.zindex || AutoZindex.getHindex()
        this.type = "dragpoint";
        this.active = false
        this.event = {};
        this.parent = null;
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
    setActive(f) {
        this.active = f
    }
    updatePosition(x, y) {
        this.x = x
        this.y = y
    }
    addEvent(key, fn) {
        this.event[key] = this.event[key] || [];
        this.event[key].push(fn);
    }
    dispatchEvent(key) {
        this.event[key] && this.event[key].forEach((item) => item(this));
    }
}

export default DragPoint