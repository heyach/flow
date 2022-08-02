// 连线 
// 一条线段，两个拖拽点，一个箭头，点击选中之后才出现拖拽箭头
// 线的层级最低，拖拽点的层级最高

import AutoZindex from "./AutoZindex"
import Container from "./Container"
import DragPoint from "./DragPoint"
import flatArrayChildren from "./flatArrayChildren"
import getArrowControlPoint from "./getArrowControlPoint"
import getElementPathLinePoints from "./getElementPathLinePoints"
import pointNearEdge from "./pointNearEdge"


class Connect {
    startPoint: any
    endPoint: any
    type: string
    color: string
    active: boolean
    zindex: number
    start: DragPoint
    end: DragPoint
    children: any[]
    parent: any
    endBindTarget: any
    startBindTarget: any
    constructor(startPoint, endPoint) {
        this.color = "blue"
        this.type = "connect"
        this.active = false
        this.zindex = AutoZindex.getNindex()
        this.children = []
        
        this.startPoint = new DragPoint({
            x: startPoint.x,
            y: startPoint.y,
            r: 5,
            color: "green"
        })
        this.startPoint.addEvent("click", (t) => {
            this.startBindTarget = null
        })
        this.startPoint.addEvent("move", (t) => {
            // 在拖拽点的时候，把父元素线的active设为true，这样点才会一直显示
            this.active = true
        });
        this.startPoint.addEvent("mouseup", (t) => {
            // 拖拽结束后，判断落点是否有元素，如果有，以元素的xy为准，同时记录元素，元素在更新位置的时候，也会更新线段
            let target = this.getMouseUpTarget(t.x, t.y)
            // 更新 container已经虚化了，落点必定是container里的元素，所以绑定点为落点元素的parent
            if(target.parent) {
                // 箭头落点坐标计算方式要优化，不能直接用元素的顶点，要判断边，更接近哪条边就用哪条边
                this.startBindTarget = target.parent[pointNearEdge(t, target)]
            }
        })
        this.endPoint = new DragPoint({
            x: endPoint.x,
            y: endPoint.y,
            r: 5,
            color: "green"
        })
        this.endPoint.addEvent("click", (t) => {
            this.endBindTarget = null
        })
        this.endPoint.addEvent("move", (t) => {
            this.active = true
        });
        this.endPoint.addEvent("mouseup", (t) => {
            // 拖拽结束后，判断落点是否有元素，如果有，以元素的xy为准，同时记录元素，元素在更新位置的时候，也会更新线段
            // 更新，以最合适的一条边为连线点
            let target = this.getMouseUpTarget(t.x, t.y)
            if(target.parent) {
                this.endBindTarget = target.parent[pointNearEdge(t, target)]
            }
        })
        
        this.add(this.startPoint)
        this.add(this.endPoint)
    }
    getMouseUpTarget(x, y) {
        var elms = flatArrayChildren(this.parent.children);
        // 先找到点击的元素（多个）
        let clickElements = elms.filter((item) => {
            // 要把dragpoint和connect忽略，因为落点必定在这2个元素上
            return item.type != "dragpoint" && item.type != "connect" && item.pointInElement && item.pointInElement(x, y, this.parent.ctx);
        });
        // 再找到zindex最大的那个
        let target = clickElements.find((item) => item.zindex == Math.max(...clickElements.map((item) => item.zindex)));
        return target
    }
    add(child) {
        child.parent = this;
        this.children.push(child)
    }
    draw(ctx) {
        if(this.startBindTarget) {
            this.startPoint.x = this.startBindTarget.x
            this.startPoint.y = this.startBindTarget.y
        }
        if(this.endBindTarget) {
            this.endPoint.x = this.endBindTarget.x
            this.endPoint.y = this.endBindTarget.y
        }
        ctx.beginPath();
        ctx.lineWidth = 3
        ctx.strokeStyle = this.color;
        // 绘制连线，箭头用倒数第二个点和最后一个点来确定
        let path = getElementPathLinePoints(Object.assign(this.startPoint, {w: 0, h: 0}), Object.assign(this.endPoint, {w: 0, h: 0}));
        let sp = path[0];
        let ep = path[path.length - 1];
        let secToLast = path.length > 2 ? path[path.length - 2] : sp
        let pathPoints = path.slice(1, path.length - 1);

        var arrowPoints = getArrowControlPoint(secToLast, ep)
        ctx.moveTo(sp.x, sp.y);
        pathPoints.forEach((item) => {
            ctx.lineTo(item.x, item.y);
        });
        ctx.lineTo(ep.x, ep.y);

        ctx.moveTo(arrowPoints.m.x, arrowPoints.m.y);
        ctx.lineTo(ep.x, ep.y);

        ctx.moveTo(arrowPoints.n.x, arrowPoints.n.y);
        ctx.lineTo(ep.x, ep.y);
        ctx.stroke();
        ctx.closePath();

        if(this.active) {
            this.children.forEach(item => {
                item.draw(ctx)
            })
        }
    }
    setActive(f) {
        this.active = f
    }
    pointInElement(x, y, ctx) {
        // 需要注意的是，每当我们执行一次beginPath，检测路径就变成这次之后绘制的了，之前的路径不会参与检测，所以这有个鸡毛用啊，画了3跟线，每次只有最后一根有用
        // 还是只能用坐标计算，先忽略，通过把这个线再绘制一次就可以了，这样就会重新beginPath，如果出现重影，还是要用坐标判断哈
        this.draw(ctx)
        return ctx.isPointInStroke(x, y)
    }
    updatePosition(x, y) {
        this.startPoint.x = x
        this.startPoint.y = y
    }
}

export default Connect