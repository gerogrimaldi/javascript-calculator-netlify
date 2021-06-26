import React, { Component } from 'react'
import "../assets/css/calculator.css"

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            text: ""
        }
    }
    
    render() {
        const btn_class = "button " + this.props.id;
        return (
            <div id={this.props.id} className={btn_class}>
                
            </div>
        )
    }
}

export default Button;
