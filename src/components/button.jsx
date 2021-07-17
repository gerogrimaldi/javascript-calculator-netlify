import React, { Component } from 'react'
import "../assets/css/calculator.css"

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        }
    }
    render() {
        const btn_class = "button " + this.props.class;
        const text = this.state.text;
        return (
            <div id={this.props.id} className={btn_class} onClick = {() => this.props.handler(text)}>
                {this.props.text}
            </div>
        )
    }
}

export default Button;
