import Container from "./Container";
import Person from "./Person";
// 
class PersonElm {
    container: Container;
    person: Person;
    constructor(option) {
        this.container = new Container({
            x: option.x,
            y: option.y,
            w: option.w,
            h: option.h
        });
        this.container.type = "PersonElm"
        
        this.person = new Person({
            offsetX: 0,
            offsetY: 0,
            w: 92,
            h: 163,
            src: "./run.png"
        })
        this.person.addEvent("click", (t) => {
            this.container.setActive(true);
        });
      
        this.person.play()
        this.container.add(this.person);

    }
    // 向前走
    move() {
        setInterval(() => {
            if(this.container.x < 700) {
                this.container.x ++
            }
        },50)
    }
    stop() {
        this.person.stop()
    }

}

export default PersonElm