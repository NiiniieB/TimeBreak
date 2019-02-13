import React, { Component } from "react";

class Connecter extends Component {


    
    render(){
        return(
            
            <div className="connecter">
            
        <ul> {this.props.source.users.map((user) => <li>{user.pseudo} <img alt="avatar" className="avatar" src={user.avatar}/></li>)}</ul>
            
            </div>
        
        
        )   
    }
}

export default Connecter;
