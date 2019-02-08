import React, { Component } from 'react';
import Message from '../Class/Message';


class Input extends Component {
constructor(props) {
super(props);

}

click = () => {
  let objMesg = new Message();
  let objUser = this.props.source.users[0];
  objMesg.create(objUser,"",Date(),document.getElementById("texte").value) ;
  this.props.source.addMessage(objMesg);
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
