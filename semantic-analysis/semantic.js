const { mktable, getTop, setTop, push, enter, pointer, addwidth, pop } = require('./method');

const id1 = { name: 'id1' };
const id2 = { name: 'id2' };
const id3 = { name: 'id3' };

const tblptr = []; //保存指向外围过程符号表的指针
const offset = []; //其栈顶元素是下一个当前过程中局部对象可用的相对地址
const T1 = {}, T2 = {}, T3 = {}, T4 = {};

//1. t = mktable(nil); push(t,tblptr); push(0,offset)
let t = mktable(null);
push(t, tblptr);
push(0, offset);

//2. T.type = real; T.width = 8
T1.type = 'real';
T1.width = 8;

//3. enter(top(tblptr), id.name, T.type, top(offset)); top(offset) = top(offset) + T.width
enter(getTop(tblptr), id1.name, T1.type, getTop(offset));
setTop(getTop(offset) + T1.width, offset);

//4. T.type = integer; T.width = 4
T3.type = 'interger';
T3.width = 4;

//5. T.type = pointer(T1.type); T.width = 4
T2.type = pointer(T3.type);
T2.width = 4;

//6. enter(top(tblptr), id.name, T.type, top(offset)); top(offset) = top(offset) + T.width
enter(getTop(tblptr), id2.name, T2.type, getTop(offset));
setTop(getTop(offset) + T2.width, offset);

// 7. T.type = integer; T.width = 4
T4.type = 'integer';
T4.width = 4;


//8. enter(top(tblptr), id.name, T.type, top(offset)); top(offset) = top(offset) + T.width
enter(getTop(tblptr), id3.name, T4.type, getTop(offset));
setTop(getTop(offset) + T4.width, offset);

//9. addwidth(top(tblptr), top(offset)); pop(tblptr); pop(offset)
addwidth(getTop(tblptr), getTop(offset));
pop(tblptr);
pop(offset);

console.log(t);