import React, { Component } from 'react'
import "../assets/css/calculator.css"
import Button from './button.jsx'

export class Calculator extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            resultDisplay: "",
            input: "0",
            calculated: [],
            equalPressed: false
        }
    }
    handler = (text) => {
        switch(text){
            case "AC":
                this.clearState();
                break;
            case "=":
                this.calculateResult();
                break;
            default:
                //if it is a number y append it. If not, its an operator
                (!isNaN(text)) ? (this.addNumber(text)) : (this.addOperator(text))
                this.setState( (state) => ({
                    resultDisplay: state.resultDisplay + text,
                    input: text
                }));
                break;
        }
    }
    
    calculateResult = () =>{
        let values = this.state.calculated;
        let result = 0;
        
        for (let i=0; i<values.length; i++){
            if (!isNaN(values[i])){ //if it is a number 
                result = values[i];
                console.log(result); //initial result
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
                        default: break; //to remove the warning
                    }
                    console.log(result);
                    i+=1; //skip the second number used
                }else{ //two operators together give syntax error
                    result = "Syntax error"
                    break;
                }
            }
        }
        this.setState( (state) => ({
            resultDisplay: state.resultDisplay + "=" + result,
            input: result,
            calculated: [result],
            equalPressed: true
        }));
        console.log("igual");
    }

    addNumber = (digit) => {
        if(this.state.equalPressed){
            this.clearState();
        }
        //get last item in array
        let values = this.state.calculated;
        let num = values.slice(-1).join();

        //if it is a number i append "digit" to it
        if (!isNaN(parseInt(num))){
            //remove item from the array
            this.state.calculated.pop();
            //add the next digit to the number
            num += digit;
            //append num (string) converted to number
            this.setState( (state) => ({
                calculated: [...state.calculated, parseInt(num)]
            }));
        }else{ //if last item isnt a number i just append the "digit" param
            this.setState( (state) => ({
                calculated: [...state.calculated, digit]
            }));
        }
    }

    addOperator = (operator) => {
        if(this.state.equalPressed){
            this.equalWasPressed(2);
        }
        this.setState( (state) => ({
            calculated: [...state.calculated, operator],
        }));
    }

    clearState = () => {
        this.setState( (state) => ({
            resultDisplay: "",
            input: "0",
            calculated: [],
            equalPressed: false
        }));
        console.log("borrar");
    }

    equalWasPressed = (option) => {
        if (option===1){ //option 1: new number input, so i clear all state
            this.clearState();
        }else{ //option 2: operator input, so i work with the last answer
            this.setState( (state) => ({
                resultDisplay: state.input,
                equalPressed: false
            }));
        }
        console.log("= pressed")
    }
    render() {
        const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
        const operators = ["/", "*", "-", "+"];

        return (
            <div className="calculator-container">
                <div id="display" className="display" >
                  <span className="result-display">{this.state.resultDisplay}</span>
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
