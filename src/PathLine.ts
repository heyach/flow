import BasicElement from "./BasicElement";
import Container from "./Container";
import getElementPathLinePoints from "./getElementPathLinePoints";

// 路径连线
class PathLine extends BasicElement {
    startPoint: Container;
    endPoint: Container;
    c: string;
    type: string;
    constructor(startPoint, endPoint, c) {
        super();
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.c = c;
        this.type = "pathline";
        this.zindex = 0; // 连线的层级永远最低
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        let path = getElementPathLinePoints(this.startPoint, this.endPoint);
        let sp = path[0];
        let ep = path[path.length - 1];
        let pathPoints = path.slice(1, path.length - 1);
        ctx.moveTo(sp.x, sp.y);
        pathPoints.forEach((item) => {
            ctx.lineTo(item.x, item.y);
        });
        // 绘制一个箭头
        
        ctx.lineTo(ep.x, ep.y);
        // let c1x = (ep.x - sp.x) / 2;
        // let c2x = ((ep.x - sp.x) / 3) * 2 + sp.x;
        // let c1y = ep.y;
        // let c2y = sp.y;
        // ctx.bezierCurveTo(c1x, c1y, c2x, c2y, ep.x, ep.y);  // 等把贝塞尔曲线整明白了再说
        // ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.strokeStyle = this.c;
        ctx.stroke();
        ctx.closePath();
    }
}

export default PathLine