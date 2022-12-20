# Basic Recursive Decent Parser

## Usage
Pass a string containing either `"anything you want here"` or `  42  ` (spaces should be ignored) into the `parse` command to produce an Abstract Syntax Tree as output.

Example:
```JSON
{
  "type": "Program",
  "body": {
    "type": "StringLiteral",
    "value": "     hello  "
  }
}
```

## Testing

Run the following command to verify that all test cases are working as expected:
```Bash
./run-tests.sh
```