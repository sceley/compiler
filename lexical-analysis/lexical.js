const symbolTable = require('./symbol-table.json');

let codeString = '';
let ch = ' ';
let index = 0;

class Token {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}

	print() {
		console.log(`<${this.name}, ${this.value}>`);
	}
}

function analysis(codeString) {
	let tokens = [];
	do {
		const token = scan();
		tokens.push(token);
	} while (index < codeString.length)
	return tokens;
};

function readch() {
	ch = codeString[index];
	index++;
}

function backch() {
	index--;
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
	for (; ;) {
		if (ch == ' ') {
			readch();
			continue;
		} else {
			break;
		}
	}

	switch (ch) {
		case ':':
			readch();
			if (ch == '=') {
				ch = ' ';
				return new Token(":=", symbolTable.operator[':=']);
			} else {
				backch();
				ch = ' ';
				return new Token(":", symbolTable.operator[':']);
			}
		case '<':
			readch();
			if (ch == '=') {
				ch = ' ';
				return new Token('<=', symbolTable.operator['<=']);
			} else if (ch == '>') {
				ch = ' ';
				return new Token('<>', symbolTable.operator['<>']);
			} else {
				backch();
				ch = ' ';
				return new Token('<', symbolTable.operator['<']);
			}
		case '>':
			readch();
			if (ch == '=') {
				ch = ' ';
				return new Token('>=', symbolTable.operator['>=']);
			} else {
				backch();
				ch = ' ';
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
			backch();
			ch = ' ';
			return `(error, ${sum}, 识别出错 标识符不能以数字开头)`;
		} else {
			backch();
			ch = ' ';
			return new Token(sum, symbolTable.other['sum']);
		}
	}

	if (isLetter(ch)) {
		let letter = '';
		do {
			letter += ch;
			readch();
		} while (isLetterOrDigit(ch))
		backch();
		ch = ' ';
		if (isKeyword(letter)) {
			return new Token(letter, symbolTable.keyword[letter]);
		} else {
			return Token(letter, symbolTable.other['id']);
		}
	}

	if (ch in symbolTable.operator) {
		let token = new Token(ch, symbolTable.operator[ch]);
		ch = ' ';
		return token;
	} else {
		let token = `(warning, ${ch}, 不能识别)`;
		ch = ' ';
		return token;
	}
}

module.exports = analysis;