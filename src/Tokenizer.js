const TokenTypes = {
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  NULL: null
};

class Tokenizer {
  _spec = {
    NUMBER: this._numberTokenizer,
    STRING: this._stringTokenizer
  }

  init(string) {
    this._string = string;
    this._cursor = 0;
  }

  isEOF() {
    return this._cursor === this._string.length;
  }

  isEOFInner(cursor) {
    return this._cursor + cursor === this._string.length;
  }

  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    const string = this._string.slice(this._cursor);
    const tokenType = this.getTokenType(string);

    if (tokenType === null) {
      this._cursor++;
      return this.getNextToken();
    } else {
      const tokenizer = this._spec[tokenType];

      if (tokenizer) {
        return tokenizer.call(this, string);
      }
    }
    
    throw new SyntaxError(`Unexpected token: "${string[0]}"`);
  }

  getTokenType(string) {
    if (string[0] === " ") {
      return TokenTypes.NULL
    } else if (!Number.isNaN(Number(string[0]))) {
      return TokenTypes.NUMBER;
    } else if (string[0] === '"' || string[0] === "'") {
      return TokenTypes.STRING;
    }
  }

  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  _numberTokenizer(string) {
    let number = '';
    let numberCursor = 0;
  
    while(string[numberCursor] !== " " && !Number.isNaN(Number(string[numberCursor]))) {
      number += string[numberCursor++];
    }
  
    this._cursor += numberCursor;

    return {
      type: TokenTypes.NUMBER,
      value: number
    };
  }
  
  _stringTokenizer(string) {
    const stringStart = string[0];
    let cursor = 0;
    let s = '';
  
    do {
      s += string[cursor++];
    } while (string[cursor] !== stringStart && !this.isEOFInner(cursor));
  
    s += string[cursor];

    this._cursor += cursor;
  
    return {
      type: TokenTypes.STRING,
      value: s,
    }
  }
}

module.exports = {
  TokenTypes,
  Tokenizer,
};