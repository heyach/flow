function flatArrayChildren(array) {
    let res = [];
    function h(arr) {
        arr.forEach((item) => {
            res.push(item);
            item.children && h(item.children);
        });
    }
    h(array);
    return res;
}

export default flatArrayChildren