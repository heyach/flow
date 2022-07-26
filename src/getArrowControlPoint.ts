function getArrowControlPoint(sp, ep) {
    var l = 12
    var a = Math.atan2(ep.y - sp.y, ep.x - sp.x)

    var x3 = ep.x - l * Math.cos(a + 30 * Math.PI / 180)
    var y3 = ep.y - l * Math.sin(a + 30 * Math.PI / 180)
    var x4 = ep.x - l * Math.cos(a - 30 * Math.PI / 180)
    var y4 = ep.y - l * Math.sin(a - 30 * Math.PI / 180)

    return {
        m: {
            x: x3,
            y: y3
        },
        n: {
            x: x4,
            y: y4
        }
    }
}
export default getArrowControlPoint