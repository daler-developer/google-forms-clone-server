function calc(operand1, operand2, operator) {
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
  }
}

function postfixEvaluator(string) {
  let expressionArray = string.split(' ');

  while (true) {
    let foundOperator = false;

    for (let i = 0; i < expressionArray.length; i++) {
      const operandOrOperator = expressionArray[i];

      const isOperator = ['+', '*', '/', '-'].includes(operandOrOperator);

      if (isOperator) {
        const operator = operandOrOperator;
        const operands = [Number(expressionArray[i - 1 - 1]), Number(expressionArray[i - 1])];

        const result = calc(operands[0], operands[1], operator);
        console.log('result', operands, operator);

        expressionArray = [...expressionArray.slice(0, i - 1 - 1), String(result), ...expressionArray.slice(i + 1)];
        foundOperator = true;
        break;
      }
    }

    if (!foundOperator) {
      break;
    }
  }

  return Number(expressionArray[0]);
}

postfixEvaluator('2 3 +');
