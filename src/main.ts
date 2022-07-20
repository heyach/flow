import PathLine from "./PathLine";
import Stage from "./Stage";
import TextElm from "./TextElm";

let s2 = new Stage(document.getElementById("stage"), 800, 700);

let t1 = new TextElm("hello 解决1", 50, 50, 200, 50, "blue", s2);
s2.add(t1);

let t2 = new TextElm("world 哈哈2", 300, 300, 200, 50, "blue", s2);
s2.add(t2);

let p = new PathLine(t1, t2, "red");
s2.add(p);