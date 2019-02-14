
import React, { Component } from 'react';



class Output extends Component {
    

       
        
        
    render(){
        return(
            
            <div className="output">
            <ul > {this.props.source.messages.map((msg) => <li><div className="user"><img alt="avatar" className="avatar" src={msg.sender.avatar}/> <div className="pseudo">{msg.sender.pseudo}</div> </div><div className="msg">{msg.text}</div><div className="date">{msg.date}</div></li>)}</ul>
            
            </div>
            
            
        );

    }

}
export default Output;
