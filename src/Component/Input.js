import React, { Component } from 'react';
import Message from '../Class/Message';


class Input extends Component {

click = () => {
   // msg!new Message();
    //msg.kjjj!""

    this.props.source.addMessage(document.getElementById("texte").value);
    this.props.callback();


}


    render(){
        return(
            <div>
            <input id="texte" maxLength="180" className= "input"></input>
            <button onClick = {this.click}>Sends</button>  
            </div>

       );
    }
}
export default Input;