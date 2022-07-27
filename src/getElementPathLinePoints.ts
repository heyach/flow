
// 获取第二个组件相对第一个组件的方向，组件有高宽，要取合适的边的中点
// 正下 正上，正左，正右，左上，右上，左下，右下，重合
function getDirection(elm1, elm2) {
    // 先看中心点的相对方向
    if (elm1.x < elm2.x && elm1.y < elm2.y) return "rightdown";
    if (elm1.x < elm2.x && elm1.y == elm2.y) return "right";
    if (elm1.x < elm2.x && elm1.y > elm2.y) return "rightup";
    if (elm1.x > elm2.x && elm1.y < elm2.y) return "leftdown";
    if (elm1.x > elm2.x && elm1.y == elm2.y) return "left";
    if (elm1.x > elm2.x && elm1.y > elm2.y) return "leftup";
    if (elm1.x == elm2.x && elm1.y < elm2.y) return "down";
    if (elm1.x == elm2.x && elm1.y > elm2.y) return "up";
    if (elm1.x == elm2.x && elm1.y == elm2.y) return "same";
}

// 根据2个组件，获取线段数据，可能是两个点[sp, ep]，也可能是多个点，有折线[sp, sp2, sp3 ...]，并且要考虑方向，如果组件2在组件1的右下方，则从组件1的右边中心点出发连接组件2的左边中心点
// 如果组件2在组件1的左上方，则从组件1的上边中心点连接组件2的下边中心点
function getElementPathLinePoints(elm1, elm2) {
    let dir = getDirection(elm1, elm2);
    switch (dir) {
        case "rightdown":
            // 返回组件1右边的中心点，组件2左边的中心点，以及转折点
            return [
                { x: elm1.x + elm1.w, y: elm1.y + elm1.h / 2 },
                { x: elm1.x + elm1.w + (elm2.x - (elm1.x + elm1.w)) / 2, y: elm1.y + elm1.h / 2 },
                { x: elm1.x + elm1.w + (elm2.x - (elm1.x + elm1.w)) / 2, y: elm2.y + elm2.h / 2 },
                { x: elm2.x, y: elm2.y + elm2.h / 2 },
            ];
        case "right":
            // 返回组件2左边中心点和组件1右边中心点
            return [
                { x: elm1.x + elm1.w, y: elm1.y + elm1.h / 2 },
                { x: elm2.x, y: elm2.y + elm2.h / 2 },
            ];
        case "rightup":
            // 返回组件1右边中心点，和组件2左边中心点以及转折点
            return [
                { x: elm1.x + elm1.w, y: elm1.y + elm1.h / 2 },
                { x: elm1.x + elm1.w + (elm2.x - (elm1.x + elm1.w)) / 2, y: elm1.y + elm1.h / 2 },
                { x: elm1.x + elm1.w + (elm2.x - (elm1.x + elm1.w)) / 2, y: elm2.y + elm2.h / 2 },
                { x: elm2.x, y: elm2.y + elm2.h / 2 },
            ];
        case "leftdown":
            // 组件2上边中心点和组件1下边中心点，以及转折点
            return [
                { x: elm1.x + elm1.w / 2, y: elm1.y + elm1.h },
                { x: elm1.x + elm1.w / 2, y: elm1.y + (elm2.y - elm1.y) / 2 },
                { x: elm2.x + elm2.w / 2, y: elm1.y + (elm2.y - elm1.y) / 2 },
                { x: elm2.x + elm2.w / 2, y: elm2.y },
            ];
        case "left":
            // 返回组件2右边的中心点和组件1左边的中心点
            return [
                { x: elm1.x, y: elm1.y + elm1.h / 2 },
                { x: elm2.x + elm2.w, y: elm2.y + elm2.h / 2 },
            ];
        case "leftup":
            // 组件2上边中心点和组件1下边中心点，以及转折点
            return [
                { x: elm1.x + elm1.w / 2, y: elm1.y },
                { x: elm1.x + elm1.w / 2, y: elm1.y + (elm2.y - elm1.y) / 2 },
                { x: elm2.x + elm2.w / 2, y: elm1.y + (elm2.y - elm1.y) / 2 },
                { x: elm2.x + elm2.w / 2, y: elm2.y + elm2.h },
            ];
        case "down":
            // 返回组件2上边中心点和组件1下边的中心点
            return [
                { x: elm1.x + elm1.w / 2, y: elm1.y + elm1.h },
                { x: elm2.x + elm2.w / 2, y: elm2.y },
            ];
        case "up":
            // 返回组件1上边中心点和组件2下边的中心点
            return [
                { x: elm1.x + elm1.w / 2, y: elm1.y },
                { x: elm2.x + elm2.w / 2, y: elm2.y + elm2.h },
            ];
        case "same":
            // 返回2个组件的中心点
            return [
                { x: elm1.x + elm1.w / 2, y: elm1.y + elm1.h / 2 },
                { x: elm2.x + elm2.w / 2, y: elm2.y + elm2.h / 2 },
            ];
        default:
            // 返回2个组件的中心点
            return [
                { x: elm1.x + elm1.w / 2, y: elm1.y + elm1.h / 2 },
                { x: elm2.x + elm2.w / 2, y: elm2.y + elm2.h / 2 },
            ];
    }
}

export default getElementPathLinePoints