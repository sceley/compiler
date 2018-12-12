exports.mktable = function mktable(previous) {
    let table = [];
    return table;
};

exports.enter = function enter(table, name, type, offset) {
    table.push({
        name,
        type,
        offset
    });
};

exports.addwidth = function addwidth(table, width) {
    table.unshift(width);
};

exports.getTop = function top(stack) {
    return stack[stack.length - 1];
};

exports.setTop = function (elem, stack) {
    stack.pop();
    stack.push(elem);
};

exports.push = function push (elem, stack) {
    stack.push(elem);
};

exports.pointer = function pointer(type) {
    return 'pointer ' + type;
};

exports.pop = function (stack) {
    return stack.pop();
};