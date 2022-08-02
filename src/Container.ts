import AutoZindex from "./AutoZindex";
import guid from "./guid";
import Stage from "./Stage";

interface ContainerOption {
    x: number,
    y: number,
    w?: number,
    h?: number,
    zindex?: number
}

// 方形容器
class Container {
    parent: Stage;
    type: string;
    children: any[];
    active: boolean;
    zindex: number;
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    topPoint: { x: number; y: number; w: number; h: number; };
    rightPoint: { x: number; y: number; w: number; h: number; };
    bottomPoint: { x: number; y: number; w: number; h: number; };
    leftPoint: { x: number; y: number; w: number; h: number; };
    constructor(option: ContainerOption) {
        this.x = option.x;
        this.y = option.y;
        this.w = option.w;
        this.h = option.h;
        this.id = guid();
        this.zindex = option.zindex ? option.zindex : AutoZindex.getIndex();
        this.active = false;
        this.children = [];
        this.type = "container";
        this.parent = null;

        this.topPoint = {
            x: this.x + this.w / 2,
            y: this.y,
            w: this.w,
            h: this.h
        }
        this.rightPoint = {
            x: this.x + this.w,
            y: this.y + this.h / 2,
            w: this.w,
            h: this.h
        }
        this.bottomPoint = {
            x: this.x + this.w / 2,
            y: this.y + this.h,
            w: this.w,
            h: this.h
        }
        this.leftPoint = {
            x: this.x,
            y: this.y + this.h / 2,
            w: this.w,
            h: this.h
        }

    }
    destory() {
        this.parent.remove(this)
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
        // 绘制所有子元素，但是以container为基准，如container在(100, 100)，子元素1在(20, 20)，那么子元素1的绘制位置为(120, 120)
        this.children.forEach((item) => {
            item.updatePosition(this.x, this.y);
            item.draw(ctx);
        });
        if (this.active) {
            ctx.beginPath();
            ctx.lineWidth = 1;
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

        // 不能整个的改topPoint，那样会重写对象地址
        this.topPoint.x = this.x + this.w / 2;
        this.topPoint.y = this.y

        this.rightPoint.x = this.x + this.w
        this.rightPoint.y = this.y + this.h / 2

        this.bottomPoint.x = this.x + this.w / 2
        this.bottomPoint.y = this.y + this.h
        
        this.leftPoint.x = this.x
        this.leftPoint.y = this.y + this.h / 2
    }
    // 点是否在矩形内
    pointInElement(x, y) {
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
}

export default Container