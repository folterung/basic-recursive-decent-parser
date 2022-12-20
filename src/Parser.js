const { Tokenizer } = require('./Tokenizer');

const ParserTypes = {
  NumericLiteral: 'NumericLiteral',
  StringLiteral: 'StringLiteral',
  Program: 'Program',
};

class AstNode {
  type;
  value;

  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class NumericLiteralNode extends AstNode {
  constructor(value) {
    super(ParserTypes.NumericLiteral, Number(value));
  }
}

class StringLiteralNode extends AstNode {
  constructor(value) {
    super(ParserTypes.StringLiteral, value.slice(1, -1));
  }
}

class Parser {
  constructor() {
    this._string = '';
    this._tokenizer = new Tokenizer();
  }

  parse(string) {
    this._string = string;
    this._tokenizer.init(string);

    this._lookahead = this._tokenizer.getNextToken();

    return this.Program();
  }

  Program() {
    return {
      type: ParserTypes.Program,
      body: this.Literal(),
    };
  }

  Literal() {
    switch (this._lookahead.type) {
      case 'NUMBER': return this.NumericLiteral();
      case 'STRING': return this.StringLiteral();
    }

    throw new SyntaxError(`Literal: unexpected literal production`);
  }

  StringLiteral() {
    const token = this._eat('STRING');

    return new StringLiteralNode(token.value);
  }

  NumericLiteral() {
    const token = this._eat('NUMBER');

    return new NumericLiteralNode(token.value);
  }

  _eat(tokenType) {
    const token = this._lookahead;

    if (token == null) {
      throw new SyntaxError(`Unexpected end of input, expected: "${tokenType}"`);
    }

    if (token.type !== tokenType) {
      throw new SyntaxError(`Unexpected token: "${token.value}", expected: "${tokenType}"`);
    }

    this._lookahead = this._tokenizer.getNextToken();

    return token;
  }
}

module.exports = {
  Parser,
  ParserNodes: {
    NumericLiteralNode,
    StringLiteralNode
  }
};
