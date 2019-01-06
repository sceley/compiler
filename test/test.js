const readline = require('readline');
const lexicalAnalysis = require('../lexical-analysis/lexical');
const semanticAnalysis = require('../semantic-analysis/semantic');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '请输入字符串($结束)> '
});

rl.prompt();

let codeString = '';


rl.on('line', (data) => {
    codeString += data.trim();
    if (codeString[codeString.length - 1] == '$') {
        rl.close();
        // const tokens = lexicalAnalysis(codeString);
        // tokens.forEach(token => {
        //     token.print();
        // });
        semanticAnalysis(codeString);
    } else {
        rl.prompt();
    }
});