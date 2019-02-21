import React, { Component } from 'react';
import Message from '../Class/Message';
import Socket from '../Component/Socket' 
class Input extends Component {



  getTime = (time) => {
    if (time === "true"){
     let d = new Date();
     let hourMsg = d.getHours().toString().padStart(2,0);
     let minMsg =  d.getMinutes().toString().padStart(2,0);
     let secMsg =  d.getSeconds().toString().padStart(2,0);
     let timeMsg = hourMsg + ":" + minMsg + ":" + secMsg;
     return timeMsg;
   } 
   else{
     return false;
    }
 };

 click = () => {
  let objMesg = new Message();
  objMesg.create(this.props.source.me,"",this.getTime("true"),document.getElementById("texte").value) ;
  this.props.source.addMessage(objMesg);
  Socket.emit(JSON.stringify([{"type":3},objMesg]));
  this.props.callback();
  document.getElementById("resetInput").reset(); //Reset data
  }
  
  resetFunction(event) {
		event.preventDefault();
  };

render(){
return(
<div>
  <form id="resetInput" onSubmit={this.resetFunction}>
    <input id="texte" maxLength="180" className= "input">
    </input>
    <button className="send" onClick = {this.click}></button> 
  </form>
</div>

);
}
}
export default Input;
