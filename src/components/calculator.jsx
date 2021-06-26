import React, { Component } from 'react'
import "../assets/css/calculator.css"
import Button from './button.jsx'

export class Calculator extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="calculator-container">
                <div id="display" className="display">
                    <p> Hola </p>
                </div>
                <div id="buttons" className="buttons-container">
                    <Button></Button>
                    <Button id="AC-btn"></Button>
                    <Button id="equal-btn"></Button>
                </div>
            </div>
        )
    }
}

export default Calculator;
