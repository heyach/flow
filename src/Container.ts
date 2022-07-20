import AutoZindex from "./AutoZindex";
import guid from "./guid";
import Stage from "./Stage";

// 方形容器
class Container {
    parent: Stage;
    type: string;
    children: any[];
    active: boolean;
    zindex: number;
    id: string;
    c: string;
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x = 0, y = 0, w = 0, h = 0, c, zindex?) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.id = guid();
        this.zindex = zindex ? zindex : AutoZindex.getIndex();
        this.active = false;
        this.children = [];
        this.type = "container";
        this.parent = null;
    }
    add(child) {
        child.parent = this;
        this.children.push(child);
    }
    remove(child) {
        this.parent.children.splice(
            this.parent.children.findIndex((item) => item.id == child.id),
            1
        );
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.c;
        ctx.strokeRect(this.x, this.y, this.w, this.h);
        // 绘制背景色
        ctx.fillStyle = "pink";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        // 绘制所有子元素，但是以container为基准，如container在(100, 100)，子元素1在(20, 20)，那么子元素1的绘制位置为(120, 120)
        this.children.forEach((item) => {
            item.updatePosition(this.x, this.y);
            item.draw(ctx);
        });

        if (this.active) {
            ctx.beginPath();
            ctx.strokeStyle = "#0f0";
            ctx.strokeRect(this.x - 2, this.y - 2, this.w + 4, this.h + 4);
        }
    }
    setActive(f) {
        this.active = f;
    }
    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    }
    // 点是否在矩形内
    pointInElement(x, y) {
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
}

export default Container