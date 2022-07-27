// 判断一个点更靠近哪条边
export default function (point, rect) {
    // point一定在rect内部
    // 直接计算点与四条边的距离，最短的那个就是最靠近的
    let tl = point.y - rect.y
    let rl = rect.x + rect.w - point.x
    let bl = rect.y + rect.h - point.y
    let ll = point.x - rect.x
    if(Math.min(tl, rl, bl, ll) == tl) {
        // 更靠近上边
        return "topPoint"
    }
    if(Math.min(tl, rl, bl, ll) == rl) {
        // 更靠近右边
        return "rightPoint"
    }
    if(Math.min(tl, rl, bl, ll) == bl) {
        // 更靠近底边
        return "bottomPoint"
    }
    if(Math.min(tl, rl, bl, ll) == ll) {
        // 更靠近左边
        return "leftPoint"
    }
    return "topPoint"
}