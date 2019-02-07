import React, { Component } from 'react';


class Input extends Component {

click = () => {
    this.props.source.setMessage(document.getElementById("texte").value);
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