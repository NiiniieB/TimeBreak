
import React, { Component } from 'react';



class Output extends Component {
    constructor(props) {
        super(props);

       
        
        }
    render(){

        return(
            <div className="output">
            
        <ul> {this.props.source.messages.map((msg) => <li>{msg.date}:{msg.sender.avatar} {msg.sender.pseudo} : {msg.message}</li>)}</ul>
            
            </div>
            
        );

    }

}
export default Output;
