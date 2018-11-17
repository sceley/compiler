const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '请输入字符串($结束)> '
});

rl.prompt();

let sourceCode = '';
let table = require('./pre-analysis-table.json');

rl.on('line', (data) => {
    sourceCode += data.trim();
    if (tail(sourceCode) == '$') {
        analysis(sourceCode);
        rl.close();
    } else {
        rl.prompt();
    }
});

function head (stack) {
    return stack[0];
};

function tail(stack) {
    return stack[stack.length - 1];
};

function analysis(sourceCode) {
    let stack = [Object.keys(table)[0], '$'];
    let input = sourceCode.split('');
    let x = head(stack);
    let ip = head(input);
    let flag = true;
    while (x != '$') {
        if (x == ip) {
            console.log(`匹配${ip}`);
            stack.shift();
            input.shift();
            ip = head(input);
        } else if (x in table['E']) {
            //栈顶为终结符号，但与输入符号不符，弹出栈顶终结符号 x
            flag = false;
            stack.shift();
            console.error(`error: 栈顶为终结符号，但与输入符号不符，弹出栈顶终结符号${x}`);
        } else if (!table[x][ip]) {
            //产生式为空, 跳过输入符号 a
            flag = false;
            input.shift();
            ip = head(input);
            console.error(`error: 产生式为空, 跳过输入符号 ${ip}`);
        } else if (table[x][ip] == 'synch') {
            flag = false;
            stack.shift();
            console.error(`error: 分析表入口为 synch，从栈中弹出 ${x}`);
        } else if (table[x][ip]) {
            stack.shift();
            console.log(table[x][ip]);
            const tmp = table[x][ip].split('→')[1].split('');
            stack = [...tmp, ...stack];
            if (head(stack) == 'ε') {
                stack.shift();
            }
        }
        x = head(stack);
        // ip = head(input);
    }
    if (flag) {
        console.log('串符合要求');
    } else {
        console.log('串不符合要求');
    }
}