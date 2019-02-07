import React, { Component } from 'react';


class Output extends Component {
    constructor(props) {
        super(props);
        this.state = {change:0, message:this.props.source.message};
        this.state = {change:0, pseudo:this.props.source.pseudo};
       
        
        }
    render(){
        if (this.props.source.message.length<1)
            return(
                <div className= "output">
                <h3></h3>
                <p></p>
                </div>
            );
        return(
            <div className= "output">
                <h3>{this.props.source.pseudo}</h3>
                <p>{this.props.source.message}</p>
            </div>
            
        );

    }

}
export default Output;
//test



