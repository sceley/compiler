const readline = require('readline');
const fs = require('fs');
const table = require('./lexical.json');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '请输入字符串(#结束)> '
});

rl.prompt();

let sourceCode = '';
let peek = ' ';
let index = 0;


rl.on('line', (data) => {
	sourceCode += data.trim();
	if (sourceCode[sourceCode.length - 1] == '#') {
		analysis(sourceCode);
		rl.close();
	} else {
		rl.prompt();
	}
});


function analysis (sourceCode) {
	do {
		const result = scan();
		console.log(result);
	} while (index < sourceCode.length)
};

function readch () {
	peek = sourceCode[index++];
}

function backch () {
	index--;
}

function isKeyword (keyword) {
	return keyword in table.keyword;
}

function isDigit (number) {
	return	/^[0-9]$/.test(number);
}

function isLetter (letter) {
	return /^[a-zA-Z]$/.test(letter);
}

function isLetterOrDigit(argument) {
	return /^[a-zA-Z0-9]$/.test(argument);
}

function scan () {
	for (; ; readch()) {
		if (peek == ' ') {
			continue;
		} else {
			break;
		}
	}

	switch (peek) {
		case ':':
			readch();
			if (peek == '=') {
				peek = ' ';
				return `(${table.operator[':=']}, :=)`;
			} else {
				backch();
				peek = ' ';
				return `(${table.operator[':']}, :)`;
			}
		case '<':
			readch();
			if (peek == '=') {
				peek = ' ';
				return `(${table.operator['<=']}, <=)`;
			} else if (peek == '>') {
				peek = ' ';
				return `(${table.operator['<>']}, <>)`;
			} else {
				backch();
				peek = ' ';
				return `(${table.operator['<']}, <)`;
			}
		case '>':
			readch();
			if (peek == '=') {
				peek = ' ';
				return `(${table.operator['>=']}, >=)`;
			} else {
				backch();
				peek = ' ';
				return `(${table.operator['>']}, >)`;
			}
	}

	if (isDigit(peek)) {
		let sum = '';
		do {
			sum += peek;
			readch();
		} while (isDigit(peek))
		if (isLetter(peek)) {
			do {
				sum += peek;
				readch();
			} while (isLetterOrDigit(peek))
			backch();
			peek = ' ';
			return `(error, ${sum}, 识别出错 标识符不能以数字开头)`;
		} else {
			backch();
			peek = ' ';
			return `(${table.other['sum']}, ${sum})`;
		}
	}

	if (isLetter(peek)) {
		let letter = '';
		do {
			letter += peek;
			readch();
		} while (isLetterOrDigit(peek))
		backch();
		peek = ' ';
		if (isKeyword(letter)) {
			return `(${table.keyword[letter]}, ${letter})`;
		} else {
			return `(${table.other['id']}, ${letter})`;
		}
	}

	if (peek in table.operator) {
		let token = `(${table.operator[peek]}, ${peek})`;
		peek = ' ';
		return token;
	} else {
		let token = `(warning, ${peek}, 不能识别)`;
		peek = ' ';
		return token;
	}
}

