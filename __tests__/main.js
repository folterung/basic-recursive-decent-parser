const assert = require('assert').strict;
const { Parser, ParserNodes } = require('../src/Parser');

const dataset = [
  {
    input: `42`,
    expectedOutput: {
      type: "Program",
      body: new ParserNodes.NumericLiteralNode(42)
    },
    successMessage: 'Numeric input works!',
    errorMessage: 'Basic numeric input failed.'
  },
  {
    input: `"hello"`,
    expectedOutput: {
      type: "Program",
      body: new ParserNodes.StringLiteralNode('"hello"')
    },
    successMessage: 'String input works!',
    errorMessage: 'Basic String input failed.'
  },
  {
    input: `'hello'`,
    expectedOutput: {
      type: "Program",
      body: new ParserNodes.StringLiteralNode('"hello"')
    },
    successMessage: 'Supports single quote strings!',
    errorMessage: 'Support for single quote strings is failing.'
  },
  {
    input: `    'hello'       `,
    expectedOutput: {
      type: "Program",
      body: new ParserNodes.StringLiteralNode('"hello"')
    },
    successMessage: 'Supports single quote strings with surrounding spaces!',
    errorMessage: 'Support for single quote strings with surrounding spaces is failing.'
  },
  {
    input: `       42       `,
    expectedOutput: {
      type: "Program",
      body: new ParserNodes.NumericLiteralNode(42)
    },
    successMessage: 'Space prefixed Numeric input works!',
    errorMessage: 'Space prefixed Numeric input failed.'
  },
  {
    input: `           "hello"    `,
    expectedOutput: {
      type: "Program",
      body: new ParserNodes.StringLiteralNode('"hello"')
    },
    successMessage: 'Space prefixed String input works!',
    errorMessage: 'Space prefixed String input failed.'
  },
  {
    input: `           "     hello  "    `,
    expectedOutput: {
      type: "Program",
      body: new ParserNodes.StringLiteralNode('"     hello  "')
    },
    successMessage: 'Space prefixed String with inner space input works!',
    errorMessage: 'Space prefixed String with inner input failed.'
  }
];

const parser = new Parser();
const OutputType = { ERROR: 'ERROR', SUCCESS: 'SUCCESS' };
const output = [];

dataset.forEach(datum => {
  const actualOutput = parser.parse(datum.input);

  try {
    assert.deepEqual(actualOutput, datum.expectedOutput, datum.errorMessage);
    output.push([OutputType.SUCCESS, datum.successMessage]);
  } catch (err) {
    output.push([OutputType.ERROR, err.message]);
  }
});

output.forEach(outputItem => {
  const outputType = outputItem[0];
  const message = outputItem[1];

  if (outputType === OutputType.SUCCESS) {
    console.info(`- ${message}`);
  } else if (outputType === OutputType.ERROR) {
    console.error(`- ${message}`);
  }
});
