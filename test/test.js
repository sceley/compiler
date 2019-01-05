const readline = require('readline');
const lexicalAnalysis = require('../lexical-analysis/lexical');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '请输入字符串(#结束)> '
});

rl.prompt();

let codeString = '';


rl.on('line', (data) => {
    codeString += data.trim();
    if (codeString[codeString.length - 1] == '#') {
        rl.close();
        const tokens = lexicalAnalysis(codeString);
        console.log(tokens);
    } else {
        rl.prompt();
    }
});