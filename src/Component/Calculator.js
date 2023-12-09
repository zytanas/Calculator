import React, { useState } from 'react'
import "../Style/Calculator.css";

const Calculator = () => {

  const [displayValue, setDisplayValue] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [hasDecimal, setHasDecimal] = useState(false);

  const handleNumberClick = (num) => {
    if (num === '.' && hasDecimal) {
      return;
    }

    if (num === '.' && !hasDecimal) {
      setHasDecimal(true);
    }

    if (displayValue === '0' || displayValue === '-0') {
      setDisplayValue(num === '.' ? '0.' : num.toString());
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorClick = (op) => {
    if (currentValue === null) {
      setCurrentValue(parseFloat(displayValue));
      setOperator(op);
      setDisplayValue('0');
      setHasDecimal(false);
    }
    else if (operator) {
      const result = calculate();
      setCurrentValue(result);
      setOperator(op);
      setDisplayValue('0');
      setHasDecimal(false);
    }
  };

  const handleEqualsClick = () => {
    if (currentValue !== null && operator) {
      const result = calculate();
      setCurrentValue(null);
      setOperator(null);
      setDisplayValue(result.toString());
      setHasDecimal(result.toString());
    }
  };

  const calculate = () => {
    const value1 = parseFloat(currentValue);
    const value2 = parseFloat(displayValue);

    switch (operator) {
      case '+':
        return value1 + value2;
      case '-':
        return value1 - value2;
      case '*':
        return value1 * value2;
      case '/':
        return value1 / value2;
      default:
        return value2;
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    setCurrentValue(null);
    setOperator(null);
  };
  const handleSquareRoot = () => {
    const currentValue = parseFloat(displayValue);
    const result = Math.sqrt(currentValue);
    setDisplayValue(result.toString());
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className='num__row1'>
        <button onClick={handleSquareRoot}>√</button>
        <button onClick={handleClear}>C</button>
        <button onClick={() => handleOperatorClick('/')}>÷</button>
        <button onClick={() => handleOperatorClick('*')}>x</button>
      </div>
      <div className="num__row2">
        <button onClick={() => handleNumberClick(7)}>7</button>
        <button onClick={() => handleNumberClick(8)}>8</button>
        <button onClick={() => handleNumberClick(9)}>9</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
      </div>
      <div className="num__row3">
        <button onClick={() => handleNumberClick(4)}>4</button>
        <button onClick={() => handleNumberClick(5)}>5</button>
        <button onClick={() => handleNumberClick(6)}>6</button>
        <button onClick={() => handleOperatorClick('+')}>+</button>
      </div>
      <div className='num__row4'>
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        <button onClick={() => handleNumberClick('.')}>.</button>
      </div>
      <div className='num__row5'>
        <button className='zero' onClick={() => handleNumberClick(0)}>0</button>
        <button className='eql' onClick={handleEqualsClick}>=</button>
      </div>
    </div>
  );
}

export default Calculator