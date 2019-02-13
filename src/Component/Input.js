import React, { Component } from 'react';
import Message from '../Class/Message';

class Input extends Component {
constructor(props) {
super(props);

}

addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

 getTime = (time) => {
   if (time === "true"){
    var d = new Date();
    var timeMsg = this.addZero(d.getHours()) + ":" + this.addZero(d.getMinutes()) + ":" + this.addZero(d.getSeconds());
    return timeMsg;
  } 
  else{
    return false;
   }
}

click = () => {
  let objMesg = new Message();
  let objUser = this.props.source.users[this.props.source.users.length - 1]; // ObjUser correspond au tableau d'objets "users" dans TimeBreak avec avatar + pseudo de la derniere personne connecte (grâce au .lenght)
  objMesg.create(objUser,"",this.getTime("true"),document.getElementById("texte").value) ;
  this.props.source.addMessage(objMesg);
  this.props.callback();
  document.getElementById("resetInput").reset(); //Reset data
  }
  
  resetFunction(event) {
		event.preventDefault();
  }

render(){
return(
<div>
  <form id="resetInput" onSubmit={this.resetFunction}>
    <input id="texte" maxLength="180" className= "input"></input>
    <button onClick = {this.click}>Sends</button> 
  </form>
</div>

);
}
}
export default Input;
