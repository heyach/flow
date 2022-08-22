import Background from "./Background";
import Connect from "./Connect";
import Container from "./Container";
import Icon from "./Icon";
import PathLine from "./PathLine";
import Person from "./Person";
import PersonElm from "./PersonElm";
import Rect from "./Rect";
import Stage from "./Stage";
import TextElm from "./TextElm";
import Word from "./Word";

// 初始化一个800 * 700的舞台
let s2 = new Stage(document.getElementById("stage"));

// let bg = new Background()
// bg.animate()
// s2.add(bg)

let rdom = document.getElementById("rdom")
console.log(rdom)
let vdom = getVdom(rdom)
console.log(vdom)
if(vdom) {
    if(vdom.nodeName == "DIV") {
        let c = new Container({
            x: parseInt(vdom.left),
            y: parseInt(vdom.top),
        })
        let backR = new Rect({
            x: 0,
            y: 0,
            w: vdom.width,
            h: vdom.height,
            offsetX: 0,
            offsetY: 0,
            color: vdom.background
        })
        c.add(backR)
        vdom.children.forEach(item => {
            if(item.nodeName == "P") {
                let p = new Word({
                    text: item.text,
                    offsetX: 0,
                    offsetY: 15,
                    color: item.color
                }); // 文本垂直居中
                c.add(p)
            }
            if(item.nodeName == "IMG") {
                let i = new Icon({
                    offsetX: 0,
                    offsetY: 19,
                    w: item.width,
                    h: item.height,
                    src: item.src
                }); // icon固定在容器右上角
                c.add(i)
            }
            if(item.nodeName == "BUTTON") {
                let r1 = new Rect({
                    w: item.width,
                    h: item.height,
                    offsetX: 25,
                    offsetY: 24,
                    color: item.background
                })
                let p1 = new Word({
                    text: item.text,
                    offsetX: 25,
                    offsetY: 37,
                    color: item.color
                }); // 文本垂直居中
                c.add(r1)
                c.add(p1)
            }
        })
        s2.add(c)
    }
}
 
function getVdom(dom) {
    let styles = window.getComputedStyle(dom)
    let vdom: any = {}
    vdom.nodeName = dom.nodeName
    vdom.height = dom.clientHeight
    vdom.width = dom.clientWidth
    vdom.text = dom.innerText
    vdom.src = dom.currentSrc
    vdom.top = styles.top
    vdom.left = styles.left
    vdom.border = styles.border
    vdom.background = styles.backgroundColor
    vdom.color = styles.color
    vdom.children = []
    if(dom.children.length) {
        for(let i = 0;i < dom.children.length;i++) {
            vdom.children.push(getVdom(dom.children[i]))
        }
    }
    return vdom
}

// 在 (50, 50)的位置初始化一个200 * 50的文字板
let t1 = new TextElm({
    text: "hello 解决1",
    x: 50,
    y: 50,
    w: 200,
    h: 50,
    color: "blue",
    parent: s2
});
// s2.add(t1);
// Stage.animate(t1, {
//     x: 300,
//     y: 300
// }, 2000)

// 在 (300, 300)的位置初始化一个200 * 50的文字板
let t2 = new TextElm({
    text: "world 哈哈2",
    x: 300,
    y: 400,
    w: 200,
    h: 50,
    color: "blue",
    parent: s2
});

// s2.add(t2);

// 把t1和t2这两个板子用**自动连接，这个连线方式要优化**方式连接起来，拖拽之后自动更新连线方式
// let p = new PathLine(t1, t2, "red");
// s2.add(p);

// 在(10, 20)和(50， 20)的位置初始化一个连线箭头**这个连线方式要优化**，自行将箭头两端拖拽到需要连接的元素上，之后元素移动会自动更新连线
let connect = new Connect({x: 10, y: 150}, {x: 150, y: 150})
// s2.add(connect)

let connect2 = new Connect({x: 10, y: 250}, {x: 150, y: 250})
// s2.add(connect2)

let connect3 = new Connect({x: 10, y: 350}, {x: 150, y: 350})
// s2.add(connect3)


let t3 = new TextElm({
    text: "多连线3",
    x: 300,
    y: 100,
    w: 200,
    h: 50,
    color: "blue",
    parent: s2
});
// s2.add(t3);

let p = new PersonElm({
    x: 50,
    y: 50,
    w: 92,
    h: 163,
    src: "./run.png"
})
// s2.add(p.container)
// p.move()
// setTimeout(() => {
//     p.stop()
// },2000)