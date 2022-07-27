import Connect from "./Connect";
import PathLine from "./PathLine";
import Stage from "./Stage";
import TextElm from "./TextElm";

// 初始化一个800 * 700的舞台
let s2 = new Stage(document.getElementById("stage"), 800, 700);
console.log(s2)

// 在 (50, 50)的位置初始化一个200 * 50的文字板
let t1 = new TextElm("hello 解决1", 350, 250, 200, 50, "blue", s2);
s2.add(t1);

// 在 (300, 300)的位置初始化一个200 * 50的文字板
let t2 = new TextElm("world 哈哈2", 300, 400, 200, 50, "blue", s2);
s2.add(t2);

// 把t1和t2这两个板子用**自动连接，这个连线方式要优化**方式连接起来，拖拽之后自动更新连线方式
// let p = new PathLine(t1, t2, "red");
// s2.add(p);

// 在(10, 20)和(50， 20)的位置初始化一个连线箭头**这个连线方式要优化**，自行将箭头两端拖拽到需要连接的元素上，之后元素移动会自动更新连线
let connect = new Connect({x: 10, y: 150}, {x: 150, y: 150})
s2.add(connect)

let connect2 = new Connect({x: 10, y: 250}, {x: 150, y: 250})
s2.add(connect2)

let connect3 = new Connect({x: 10, y: 350}, {x: 150, y: 350})
s2.add(connect3)


let t3 = new TextElm("多连线3", 300, 100, 200, 50, "blue", s2);
s2.add(t3);