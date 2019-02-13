
import React, { Component } from 'react';



class Output extends Component {
    

       
        
        
    render(){
        return(

            <div className="output">
            <ul> {this.props.source.messages.map((msg) => <li><div className="user"><img alt="avatar" className="avatar" src={msg.sender.avatar}/> {msg.sender.pseudo} </div><div className="msg"><div className="date">{msg.date}:</div>{msg.text}</div></li>)}</ul>
            
            </div>

            
        );

    }

}
export default Output;
