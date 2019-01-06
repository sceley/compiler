const symbolTable = require('./symbol-table.json');

let codeString;
let ch;
let index;

class Token {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}

	print() {
		console.log(`<${this.name}, ${this.value}>`);
	}
}

function analysis(arg) {
	codeString = arg;
	ch = ' ';
	index = 0;
	let tokens = [];
	do {
		const token = scan();
		if (token != null) {
			tokens.push(token);
		}
	} while (index < codeString.length || (ch != ' ' && ch != undefined))
	return tokens;
};

function readch() {
	ch = codeString[index++];
}

function preReadch(c) {
	readch();
	if (ch != c) {
		return false;
	} else {
		ch = ' ';
		return true;
	}
}

function isKeyword(keyword) {
	return keyword in symbolTable.keyword;
}

function isDigit(number) {
	return /^[0-9]$/.test(number);
}

function isLetter(letter) {
	return /^[a-zA-Z]$/.test(letter);
}

function isLetterOrDigit(arg) {
	return /^[a-zA-Z0-9]$/.test(arg);
}

function scan() {
	for (; ; readch()) {
		if (ch == ' ') {
			continue;
		} else {
			break;
		}
	}

	switch (ch) {
		case ':':
			if (preReadch('=')) {
				return new Token(":=", symbolTable.operator[':=']);
			} else {
				return new Token(":", symbolTable.operator[':']);
			}
		case '<':
			if (preReadch('=')) {
				return new Token('<=', symbolTable.operator['<=']);
			} else if (ch == '>') {
				ch = ' ';
				return new Token('<>', symbolTable.operator['<>']);
			} else {
				return new Token('<', symbolTable.operator['<']);
			}
		case '>':
			if (preReadch('=')) {
				return new Token('>=', symbolTable.operator['>=']);
			} else {
				return new Token('>', symbolTable.operator['>']);
			}
	}

	if (isDigit(ch)) {
		let sum = '';

		do {
			sum += ch;
			readch();
		} while (isDigit(ch))

		if (isLetter(ch)) {
			do {
				sum += ch;
				readch();
			} while (isLetterOrDigit(ch))

			console.error(`${sum} 是错误的标识符`);
			return null;
		} else {
			return new Token(sum, symbolTable.other['sum']);
		}
	}

	if (isLetter(ch)) {
		let letter = '';

		do {
			letter += ch;
			readch();
		} while (isLetterOrDigit(ch))

		if (isKeyword(letter)) {
			return new Token(letter, symbolTable.keyword[letter]);
		} else {
			return new Token(letter, symbolTable.other['id']);
		}
	}

	if (ch in symbolTable.operator) {
		let token = new Token(ch, symbolTable.operator[ch]);
		ch = ' ';
		return token;
	} else {
		console.error(`${ch} 不能被识别`);
		ch = ' ';
		return null;
	}
}

module.exports = analysis;