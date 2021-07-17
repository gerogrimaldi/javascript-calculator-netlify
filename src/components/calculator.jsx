import React, { Component } from 'react'
import "../assets/css/calculator.css"
import Button from './button.jsx'

export class Calculator extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            input: "0",
            calculated: []
        }
    }
    calculation = (event) => {
        // const result = event.target.getAttribute('data-value');
        // return result;
    }
    handler = (text) => {
        switch(text){
            case "AC":
                this.setState( (state) => ({
                    result: "",
                    input: "0",
                    calculated: []
                }));
                console.log("borrar");
                break;

            case "=":
                let result = this.calculateResult();
                this.setState( (state) => ({
                    result: state.result + "=" + result,
                    input: result
                }));

                console.log("igual");
                break;

            default:
                this.setState( (state) => ({
                    calculated: [...state.calculated, text],
                    result: state.result + text,
                    input: text
                }),
                () => {console.log(this.state.result);})
                break;
        }
    }
    calculateResult = () =>{
        let values = this.state.calculated;
        let calculated_value;
        let result = 0;

        for (let i=0; i<values.length; i++){
            if (!isNaN(values[i])){ //if it is a number 
                result = values[i];
                console.log(result);
            }else{ //if its not a number then it is an operator
                if (!isNaN(values[i+1])){ //if the following item is a number I calculate
                    switch(values[i]){
                        case "/":
                            result /= values[i+1];
                            break;
                        case "*":
                            result *= values[i+1];
                            break;
                        case "-":
                            result -= values[i+1];
                            break;
                        case "+":
                            result += values[i+1];
                            break;
                    }
                    console.log(result);
                    i+=1;
                }else{ //two operators together give syntax error
                    result = "syntax error"
                    break;
                }
            }
        }
        return result;
        console.log(result);
    }
    render() {
        const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
        const operators = ["/", "*", "-", "+"];

        return (
            <div className="calculator-container">
                <div id="display" className="display" >
                  <span className="result-display">{this.state.result}</span>
                  <span className="input-display">{this.state.input}</span>
                </div>
                <div id="buttons" className="buttons-container">
                    <div id="numbers-container" className="numbers-container">
                        {
                            numbers.map((num, index) => {
                                return <Button id={"btn_"+num} key={num + "_key"} text={num} class={"num-btn"} handler = {this.handler}/>
                            })
                        }
                    </div>
                    {
                        operators.map((text, index) => {
                            return <Button id={"spec-btn_"+text} key={text + "_key"} text={text} class={"operator-btn"} handler = {this.handler}/>
                        })
                    }
                    <Button id="AC-btn" text="AC" class="AC-btn" handler = {this.handler}></Button>
                    <Button id="equal-btn" text="=" class="equal-btn" handler = {this.handler}></Button>
                </div>
            </div>
        )
    }
}

export default Calculator;
