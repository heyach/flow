// 自增的zindex，由于zindex是一个重要的判断点击元素字段，除非用户传递，否则后加入的一律自增，这样就会排在上层
let AutoZindex = (function() {
    class Singleton {
        zindex: number
        static instance: Singleton
        constructor() {
            this.zindex = 0
            if(Singleton.instance) {
                return Singleton.instance
            }
            return Singleton.instance = this
        }
        getIndex() {
            return ++this.zindex
        }
    }
    var sin = new Singleton()
    return sin
})()
export default AutoZindex