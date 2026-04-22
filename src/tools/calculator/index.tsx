import { useState, useCallback, type ChangeEvent } from 'react';
import type { ToolProps } from '../types';

const Calculator: React.FC<ToolProps> = ({ showToast }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }, []);

  const backspace = useCallback(() => {
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  }, [display]);

  const toggleSign = useCallback(() => {
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
  }, [display]);

  const percent = useCallback(() => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  }, [display]);

  const performOperation = useCallback((nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      let result: number;

      switch (operator) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '×':
          result = currentValue * inputValue;
          break;
        case '÷':
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          result = inputValue;
      }

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [display, operator, previousValue]);

  const calculate = useCallback(() => {
    if (operator === null || previousValue === null) return;

    const inputValue = parseFloat(display);
    let result: number;

    switch (operator) {
      case '+':
        result = previousValue + inputValue;
        break;
      case '-':
        result = previousValue - inputValue;
        break;
      case '×':
        result = previousValue * inputValue;
        break;
      case '÷':
        result = inputValue !== 0 ? previousValue / inputValue : 0;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }, [display, operator, previousValue]);

  return (
    <div className="calculator">
      <div className="calc-display">{display}</div>
      <div className="calc-buttons">
        <div className="calc-row">
          <button className="calc-btn calc-func" onClick={clear}>
            C
          </button>
          <button className="calc-btn calc-func" onClick={backspace}>
            ⌫
          </button>
          <button className="calc-btn calc-func" onClick={toggleSign}>
            ±
          </button>
          <button className="calc-btn calc-op" onClick={() => performOperation('÷')}>
            ÷
          </button>
        </div>
        <div className="calc-row">
          <button className="calc-btn" onClick={() => inputDigit('7')}>
            7
          </button>
          <button className="calc-btn" onClick={() => inputDigit('8')}>
            8
          </button>
          <button className="calc-btn" onClick={() => inputDigit('9')}>
            9
          </button>
          <button className="calc-btn calc-op" onClick={() => performOperation('×')}>
            ×
          </button>
        </div>
        <div className="calc-row">
          <button className="calc-btn" onClick={() => inputDigit('4')}>
            4
          </button>
          <button className="calc-btn" onClick={() => inputDigit('5')}>
            5
          </button>
          <button className="calc-btn" onClick={() => inputDigit('6')}>
            6
          </button>
          <button className="calc-btn calc-op" onClick={() => performOperation('-')}>
            -
          </button>
        </div>
        <div className="calc-row">
          <button className="calc-btn" onClick={() => inputDigit('1')}>
            1
          </button>
          <button className="calc-btn" onClick={() => inputDigit('2')}>
            2
          </button>
          <button className="calc-btn" onClick={() => inputDigit('3')}>
            3
          </button>
          <button className="calc-btn calc-op" onClick={() => performOperation('+')}>
            +
          </button>
        </div>
        <div className="calc-row">
          <button className="calc-btn calc-zero" onClick={() => inputDigit('0')}>
            0
          </button>
          <button className="calc-btn" onClick={inputDecimal}>
            .
          </button>
          <button className="calc-btn calc-op" onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;