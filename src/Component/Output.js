import React, { Component } from 'react';
import GetTime from './GetTime';


class Output extends Component {
    constructor(props) {
        super(props);
        this.state = {change:0, message:this.props.source.message};
        this.state = {change:0, pseudo:this.props.source.pseudo};
       
        
        }
    render(){

        return(
            <div className= "output">
                <GetTime />
                <h3>{this.props.source.pseudo}</h3>
                <p>{this.props.source.message}</p>
            </div>
            
        );

    }

}
export default Output;




