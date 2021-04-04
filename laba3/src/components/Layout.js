import React, { Component } from 'react';
import Button from './Button';
import Output from "./Output";

const buttonNames = ['C', '+/-', '%', '÷', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
const distincts = ['÷', 'X', '-', '+', '=', '.'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const opacity = {
  opacity: '0.5'
};
const width = {
  width: '180px'
};
const background = {
  background: '#E33D3D'
};



class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      previousButton: null,
      expression: '0'
    }
  }

  handleClick(buttonName) {
    if (buttonName === 'C') {
      this.setState({
        expression: '0',
        previousButton: null
      });
      return;
    }

    if (this.state.expression.includes('Infinity') || this.state.expression.includes('NaN') || this.state.expression.includes('Error')) {
      return;
    }

    if (distincts.includes(buttonName) && distincts.includes(this.state.previousButton)) {
      return;
    }
    if (distincts.includes(this.state.previousButton) && buttonName === '+/-') {
      return;
    }
    if (distincts.includes(this.state.previousButton) && buttonName === '%') {
      return;
    }
    if (this.state.previousButton === '+/-' && digits.includes(buttonName)) {
      return;
    }
    if (this.state.previousButton === '+/-' && buttonName === '.') {
      return;
    }
    if (this.state.previousButton === '%' && digits.includes(buttonName)) {
      return;
    }
    if (this.state.previousButton === '%' && buttonName === '.') {
      return;
    }
    if (this.state.previousButton === '+/-' && buttonName === '%') {
      return;
    }
    if (this.state.previousButton === null && digits.includes(buttonName)){
      this.setState({
        expression: buttonName,
        previousButton: buttonName
      })
      return;
    }
    if (this.state.expression.includes('Infinity') || this.state.expression.includes('NaN') || this.state.expression.includes('Error')) {
      return;
    }

    
    try {
      switch (buttonName) {
        case '+/-':
          {
            this.setState({
              expression: this.state.expression + `X(-1)`,
              previousButton: buttonName
            })
            break;
          }

        case '=':
          {
            let expression = this.state.expression;
            let rightExpression = expression.replaceAll("÷", "/").replaceAll("X", "*").replaceAll("--", "+");
            let answer = String(eval(rightExpression));
            this.setState({
              expression: answer,
              previousButton: null
            });
            break;
          }

        case '%':
          {
            let numbers = this.state.expression.match(/['÷', 'X', '\-', '+']+[0-9\.]+(e['÷', 'X', '\-', '+'][0-9\.]+)?/g);
            let operation = numbers[numbers.length - 1][0];
            let percents = numbers[numbers.length - 1].substring(1);
            let value = this.state.expression.substring(0, this.state.expression.length - percents.length - 1);
            let rightExpression = `(${value})*${percents}/100`.replaceAll("÷", "/").replaceAll("X", "*").replaceAll("--", "+");
            let calculatedPercents = String(eval(rightExpression));
            let newExpression = `(${value})${operation}${calculatedPercents}`;
            this.setState({
              expression: newExpression,
              previousButton: buttonName
            })
            break;
          }

        case '.':
          {
            let numbers = this.state.expression.match(/[0-9\.]+(e['÷', 'X', '\-', '+'][0-9\.]+)?/g);
            let lastNumber = numbers[numbers.length - 1];
            if (lastNumber.includes('.') || lastNumber.includes('e')) {
              return;
            }
          }

        default:
          {
            this.setState({
              expression: this.state.expression + buttonName,
              previousButton: buttonName
            });
            break;
          }
      }
    }
    catch (ex) {
      this.setState({
        expression: ex.name
      })
    }
  }

  renderButton(value, style) {
    return (
      <Button
        value={value}
        style={style}
        onClick={() => this.handleClick(value)}
      />
    );
  }

  render() {
    const buttons = buttonNames.map(name => {
      switch (name) {
        case 'C':
        case '+/-':
        case '%': return this.renderButton(name, opacity);
        case '0': return this.renderButton(name, width);
        case '=': return this.renderButton(name, background);
        default: return this.renderButton(name);
      }
    });

    return (
      <div className='calculator'>
        <div className='output'>
          <Output value={this.state.expression} />
        </div>
        <div className='buttons'>
          {buttons}
        </div>
      </div>
    );
  }
}

export default Layout;