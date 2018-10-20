const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '请输入字符串(#结束)> '
});

rl.prompt();

let sourceCode = '';
let peek = ' ';
let index = 0;
let table = JSON.parse(fs.readFileSync('./lexical.json', 'utf8'));


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
		backch();
		peek = ' ';
		return `(${table.other['sum']}, ${sum})`;
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

	let token = `(${table.operator[peek]}, ${peek})`;
	peek = ' ';
	return token;
}