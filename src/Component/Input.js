import React, { Component } from 'react';
import Message from '../Class/Message';
import Socket from '../Component/Socket' 
class Input extends Component {


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
 // let objUser = this.props.source.users[this.props.source.users.length - 1]; // ObjUser correspond au tableau d'objets "users" dans TimeBreak avec avatar + pseudo de la derniere personne connecte (grâce au .lenght)
  objMesg.create(this.props.source.me,"",this.getTime("true"),document.getElementById("texte").value) ;
  this.props.source.addMessage(objMesg);
  Socket.emit(JSON.stringify([{"type":0},objMesg]));
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
    <button className="send" onClick = {this.click}></button> 
  </form>
</div>

);
}
}
export default Input;
