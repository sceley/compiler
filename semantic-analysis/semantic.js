const readline = require('readline');
const table = require('./analysis-table.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '请输入字符串($结束)> '
});

rl.prompt();

let sourceCode = '';


rl.on('line', (data) => {
    sourceCode += data.trim();
    if (sourceCode[sourceCode.length - 1] == '$') {
        analysis(sourceCode);
        rl.close();
    } else {
        rl.prompt();
    }
});

function head(stack) {
    return stack[stack.length - 1];
};


function analysis(sourceCode) {
    let stack = [0];
    let input = sourceCode + "$";

    let a = input[0];
    let s = head(stack);
    while (1) {
        console.log(a);
        console.log(table["ACTION"][s]);
        if (table["ACTION"][s][a][0] == 's') {
            stack.push(table["ACTION"][s][a].slice(1));
            input = input.slice(1);
            a = input[0];
        } else if (table["ACTION"][s][a][0] == 'r') {
            let grammar = table["GRAMMAR"][table["ACTION"][s][a].slice(1)];
            let A = grammar.split("—>")[0];
            let right = grammar.split("—>")[1];
            for (let i = 0; i < right.length; i++) {
                stack.pop();
            }
            let t = head(stack);
            stack.push(table["ACTION"][t][A]);
            console.log(grammar);
        } else if (table["ACTION"][s][a] == 'acc') {
            break;
        }
    }
};