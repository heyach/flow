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