const analysisTable = require('./analysis-table.json');
const lexicalAnalysis = require('../lexical-analysis/lexical');
const Rule = require('./Rule');

function first(stack) {
    return stack[0];
};

function last(stack) {
    return stack[stack.length - 1];
};


function analysis(codeString) {
    const tokens = lexicalAnalysis(codeString);
    let w = tokens.map(token => {
        return token.name;
    });
    let stack = [0];

    let a = first(w);
    let ids = [];
    let rule = new Rule();
    while (1) {
        let s = last(stack);
        let action;
        if (/^id\d+$/.test(a)) {
            action = analysisTable["ACTION"][s]['id'];
            let flag = true;
            ids.forEach(id => {
                if (id.name == a) {
                    flag = false;
                }
            });
            if (flag) {
                let id = {
                    name: a
                };
                ids.push(id);
            }
        } else {
            action = analysisTable["ACTION"][s][a];
        }
        if (action.slice(0, 1) == 's') {
            console.log(stack.join('') + '\t', w.join('') + '\t', "移入");
            stack.push(action.slice(1));
            w = w.slice(1);
            a = first(w);
        } else if (action.slice(0, 1) == 'r') {
            let grammar = analysisTable["GRAMMAR"][action.slice(1)];
            console.log(stack.join('') + '\t', w.join('') + '\t', `归约${grammar}`);
            let A = grammar.split("—>")[0];
            let β = grammar.split("—>")[1];
            if (β != 'ε') {
                if (β == 'MD') {
                    for (let i = 0; i < 2; i++) {
                        stack.pop();
                    }
                } else {
                    const tokens = lexicalAnalysis(β);
                    for (let i = 0; i < tokens.length; i++) {
                        stack.pop();
                    }
                }
            }
            let t = last(stack);
            stack.push(analysisTable["GOTO"][t][A]);
            const method$ = `method${action.slice(1)}`;
            if (method$ == 'method3' || method$ == 'method4') {
                rule[method$](ids.pop());
            } else {
                rule[method$]();
            }
        } else if (action == 'acc') {
            console.log(stack.join('') + '\t', w.join('') + '\t', `接受`);
            rule.print();
            break;
        } else {
            console.log('分析出错');
            break;
        }
    }
};

module.exports = analysis;