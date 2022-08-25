// 子弹，从起点位置到终点位置，中间做碰撞检测，碰撞了就销毁

import BasicElement from "./BasicElement";
import flatArrayChildren from "./flatArrayChildren";
import getElementPoints from "./getElementPoints";
import isCollision from "./isCollision";
import Timer from "./Timer";

interface BulletOption {
    ex: any;
    ey: any;
    x: number;
    y: number;
    h: number;
    w: number;
}

class Bullet extends BasicElement{
    ex: any;
    ey: any;
    w: number;
    h: number;
    type: string;
    image: HTMLImageElement;
    x: number;
    y: number;
    timer: any;
    constructor(option: BulletOption) {
        super(option)
        this.ex = option.ex
        this.ey = option.ey
        this.x = option.x
        this.y = option.y
        this.w = option.w;
        this.h = option.h;
        this.type = "icon";
        this.image = new Image();
        this.image.src = "https://s1.chu0.com/src/img/png/96/9646d5fdea504567ad42aa84ab55500b.png";

        this.fire()
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    fire() {
        this.timer = new Timer(() => {
            // 从初始位置逐渐运动到终止位置，这里暂时只处理y，x不变，100次（可以优化成动态速率）
            // this.y += this.ey / 1000
            // 进行碰撞检测
            // 先拿到场景里所有要检测碰撞的元素，这里固定获取TextElm
            let elms = flatArrayChildren(this.parent.children);
            let textElms = elms.filter(item => item.type == "TextElm")
            let p = false
            for(let i = 0;i < textElms.length;i++) {
                if(isCollision(getElementPoints(textElms[i]), getElementPoints(this))) {
                    p = true
                    return
                }
            }
            // 更新 如果碰了，就停止变化，这里只考虑y，因为下面有元素，y就被托住了
            if(!p) {
                this.y += this.ey / 1000
            }
            if(this.y >= this.ey) {
                this.timer.clear()
            }
        }, 16)
    }
}

export default Bullet