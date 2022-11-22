let name = "A";
console.log('%cA.js line:2 name', 'color: #007acc;', name);
const sum = function sum(...params) {
    let len = params.length,
        total = 0;
    if (len === 0) return 0;
    if (len === 1) return params[0];
    params.forEach(item => {
        total += item;
    });
    return total;
};

/* 模块的导出 */
module.exports = {
    sum
};