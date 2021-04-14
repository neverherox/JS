import React from 'react';
import Button from './Button';
import Output from "./Output";
import NoteTable from "./NoteTable"


const distincts = ['÷', 'X', '-', '+', '=', '.'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const opacity = {
    opacity: '0.5'
};
const width = {
    width: '200px'
};
const background = {
    background: '#E33D3D'
};

const buttonStyle = {
    width: '30px',
    height: '30px',
    position: 'absolute',
    right: '0',
    background: 'url(https://img.icons8.com/plasticine/2x/undo.png)',
    backgroundSize: 'cover',
    borderStyle: 'none'
};


class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previousButton: null,
            expression: '0',
            isActive: false,
            notes: []
        }
    }

    formExpression(buttonName) {
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
        if (this.state.previousButton === null && digits.includes(buttonName)) {
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
                        this.sendNote(rightExpression, answer);
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

    getNotes(){
        return[
        { Expression: '(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264', Result: '(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264123', Id: 1},
        { Expression: '(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264', Result: '123', Id: 1},
        { Expression: '(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264', Result: '123', Id: 1},
        { Expression: '(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264', Result: '123', Id: 1},
        { Expression: '(((((((((((((((((((((((((((((((((((((((((((((((((118)))))))))))))))))))))))))))))))))))))))))))))))))+116489.39838856264', Result: '123', Id: 1}];
    }

    render() {


        return (
            <div className='calculator'>
                <div className='output'>
                    <Output value={this.state.expression}>
                        <Button style={buttonStyle} onClick={() => {
                            if (!this.state.isActive)
                            {
                                this.setState({
                                    notes: this.getNotes()
                                })
                            }
                            this.setState({
                                isActive: !this.state.isActive
                            })
                        }} />
                    </Output>
                </div>
                <div className='layout'>
                    <div className={this.state.isActive ? 'hidden' : 'visible'}>
                        <Button value='C' style={opacity} onClick={() => this.formExpression('C')} />
                        <Button value='+\-' style={opacity} onClick={() => this.formExpression('+\-')} />
                        <Button value='%' style={opacity} onClick={() => this.formExpression('%')} />
                        <Button value='÷' onClick={() => this.formExpression('÷')} />
                        <Button value='7' onClick={() => this.formExpression('7')} />
                        <Button value='8' onClick={() => this.formExpression('8')} />
                        <Button value='9' onClick={() => this.formExpression('9')} />
                        <Button value='X' onClick={() => this.formExpression('X')} />
                        <Button value='4' onClick={() => this.formExpression('4')} />
                        <Button value='5' onClick={() => this.formExpression('5')} />
                        <Button value='6' onClick={() => this.formExpression('6')} />
                        <Button value='-' onClick={() => this.formExpression('-')} />
                        <Button value='1' onClick={() => this.formExpression('1')} />
                        <Button value='2' onClick={() => this.formExpression('2')} />
                        <Button value='3' onClick={() => this.formExpression('3')} />
                        <Button value='+' onClick={() => this.formExpression('+')} />
                        <Button value='0' style={width} onClick={() => this.formExpression('0')} />
                        <Button value='.' onClick={() => this.formExpression('.')} />
                        <Button value={'='} style={background} onClick={() => { this.formExpression('='); }} />
                    </div>
                    <div className={this.state.isActive ? 'visible notetable' : 'hidden notetable'}>
                        <NoteTable notes={this.state.notes} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;