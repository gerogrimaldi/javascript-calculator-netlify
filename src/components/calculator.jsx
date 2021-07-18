import React, { Component } from 'react'
import "../assets/css/calculator.css"
import Button from './button.jsx'

export class Calculator extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            formula: "",
            input: "0",
            formula_arr: [],
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
            case ".":
                this.addDecimal();
                break;
            default:
                //if it is a number y append it. If not, its an operator
                (!isNaN(text)) ? (this.addNumber(text)) : (this.addOperator(text))
                this.setState( (state) => ({

                }));
                break;
        }
    }
    
    calculateResult = () =>{
        let values = this.state.formula_arr;
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
                    //if i exceed the array length i return the input
                    (i+2 > values.length) ? (result=result) : (result="Syntax error") 
                    break;
                }
            }
        }
        this.setState( (state) => ({
            formula: state.formula + "=" + result,
            input: result,
            formula_arr: [],
            equalPressed: true
        }));
        console.log("igual");
    }

    addNumber = (digit) => {
        let decimal = false;

        if(this.state.equalPressed){
            this.equalWasPressed(1);
        }

        //get last item in array
        let values = this.state.formula_arr;
        let num = values.slice(-1).join();

        //if its a decimal number i append the first decimal digit
        let last_char = num.slice(-1);
        if(last_char === "."){
            num+=digit;
            this.state.formula_arr.pop();
            this.setState( (state) => ({
                formula_arr: [...state.formula_arr, parseFloat(num)],
                formula: state.formula + digit,
                input: num
            }));
            decimal = true;
        }

        //if it is a number i append "digit" to it
        if (!isNaN(parseInt(num)) && !decimal){
            //dont allow multiple 0
            let multiple_zero = false;
            if (values.length === 1){
                if (values[0]===0){
                    if (digit===0){
                        multiple_zero = true;
                    }
                }
            }
            if (!multiple_zero){
                //remove item from the array
                this.state.formula_arr.pop();
                //add the next digit to the number
                num += digit;
                //append num (string) converted to number
                this.setState( (state) => ({
                    formula_arr: [...state.formula_arr, parseInt(num)],
                    formula: state.formula + digit,
                    input: parseInt(num)
                }));
            }

        }else{ //if last item isnt a number i just add the "digit" param to the array
            if(!decimal){
                this.setState( (state) => ({
                    formula_arr: [...state.formula_arr, digit],
                    formula: state.formula + digit,
                    input: digit
                }));
            }
        }
    }

    addOperator = (operator) => {
        if(this.state.equalPressed){
            this.equalWasPressed(2);
        }
        //get last item in array
        let num = this.state.formula_arr.slice(-1).join();

        if (!isNaN(parseInt(num))){ //if last item is number i append operator
            this.setState( (state) => ({
                formula_arr: [...state.formula_arr, operator],
                formula: state.formula + operator,
                input: operator
            }));
        }else{ //if last item is operator i replace it
            this.state.formula_arr.pop();
            this.setState( (state) => ({
                formula_arr: [...state.formula_arr, operator],
                input: operator
            }),
            () => {   
                this.setState( (state) => ({
                    formula: state.formula_arr.join("")
                })
                )}
            )
        }
    }

    addDecimal = () => {
    //get last item in array
        let values = this.state.formula_arr;
        let num = values.slice(-1).join();

        if (!isNaN(parseInt(num)) && toString(num.slice(-1))!=="."){
            //remove item from the array
            this.state.formula_arr.pop();
            //append decimal dot
            num += ".";
            //append num (string) converted to number
            this.setState( (state) => ({
                formula_arr: [...state.formula_arr, num],
                formula: state.formula + ".",
                input: num
            }));
            console.log(this.state.formula_arr[0])
        }
    }

    clearState = () => {
        this.setState( (state) => ({
            formula: "",
            input: "0",
            formula_arr: [],
            equalPressed: false
        }));
        console.log("borrar");
    }

    equalWasPressed = (option) => {
        if (option===1){ //option 1: new number input, so i clear all state
            this.clearState();
        }else{ //option 2: operator input, so i work with the last answer
            this.setState( (state) => ({
                formula: "" + state.input,
                formula_arr: [state.input],
                equalPressed: false
            }));
        }
        console.log("= pressed")
    }
    render() {
        const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
        const numbers_id = ["seven", "eight", "nine", "four", "five" , "six" , "one" , "two", "three" ,"zero", "decimal"];
        const operators = ["/", "*", "-", "+"];
        const operators_id = ["divide", "multiply", "subtract", "add"];
        return (
            <div className="calculator-container">
                <div className="display" >
                  <span className="result-display">{this.state.formula}</span>
                  <span id="display" className="input-display">{this.state.input}</span>
                </div>
                <div id="buttons" className="buttons-container">
                    <div id="numbers-container" className="numbers-container">
                        {
                            numbers.map((num, index) => {
                                return <Button id={numbers_id[index]} key={num + "_key"} text={num} class={"num-btn " + numbers_id[index]} handler = {this.handler}/>
                            })
                        }
                    </div>
                    {
                        operators.map((text, index) => {
                            return <Button id={operators_id[index]} key={text + "_key"} text={text} class={"operator-btn"} handler = {this.handler}/>
                        })
                    }
                    <Button id="clear" text="AC" class="AC-btn" handler = {this.handler}></Button>
                    <Button id="equals" text="=" class="equal-btn" handler = {this.handler}></Button>
                </div>
            </div>
        )
    }
}

export default Calculator;
