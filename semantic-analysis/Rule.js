const Table = require('./Table');
class Rule {
    constructor() {
        this.tblptr = [];
        this.offset = [];
        this.T = {};

        this.printTable = [];
    }
    method0() {
        addwidth(top(this.tblptr), top(this.offset));
        this.printTable.push(pop(this.tblptr));
        pop(this.offset);
    }

    method1() {
        let t = mktable(null);
        push(t, this.tblptr);
        push(0, this.offset);
    }

    method2() {
    }

    method3(id) {
        let t = top(this.tblptr);
        addwidth(t, top(this.offset));
        this.printTable.push(pop(this.tblptr));
        pop(this.offset);
        enterproc(top(this.tblptr), id.name, t);
    }

    method4(id) {
        enter(top(this.tblptr), id.name, this.T.type, top(this.offset));
        let offset = top(this.offset) + this.T.width;
        setTop(offset, this.offset);
    }

    method5() {
        let t = mktable(top(this.tblptr));
        push(t, this.tblptr);
        push(0, this.offset);
    }

    method6() {
        this.T.type = 'integer';
        this.T.width = 4;
    }

    method7() {
        this.T.type = 'real';
        this.T.width = 8;
    }

    method8() {
        this.T.type = pointer(this.T.type);
        this.T.width = 4;
    }

    print () {
        this.printTable.forEach(table => {
            console.log(table);
        });
    }
}


function mktable(previous) {
    let t = new Table();
    return t;
};

function enter(table, name, type, offset) {
    table.body.push({
        name,
        type,
        offset
    });
};

function enterproc(table, name, newtable) {
    table.body.push({
        name: name,
        type: 'proc'
    });
    newtable = table;
}

function addwidth(table, width) {
    table.header.width = width;
};

function top(stack) {
    return stack[stack.length - 1];
};

function setTop(elem, stack) {
    stack.pop();
    stack.push(elem);
};

function push(elem, stack) {
    stack.push(elem);
};

function pointer(type) {
    return '↑' + type;
};

function pop(stack) {
    return stack.pop();
};

module.exports = Rule;