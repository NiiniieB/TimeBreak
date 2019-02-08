import React, { Component } from "react";

class Connecter extends Component {

    constructor(props){
        super(props);


    }
    
    render(){
        return(
            
            <div className="connecter">
            
        <ul> {this.props.source.users.map((user) => <li>{user.pseudo} : {user.avatar}</li>)}</ul>
            
            </div>
        
        
        )   
    }
}

export default Connecter;
