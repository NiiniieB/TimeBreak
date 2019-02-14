import React, { Component } from "react";

class Connecter extends Component {


    
    render(){
        return(
            
            <div>
            
        <ul className="connecter"> {this.props.source.users.map((user) => <li className="user-list" >{user.pseudo} <img alt="avatar" className="avatar" src={user.avatar}/></li>)}</ul>
            
            </div>
        
        
        )   
    }
}

export default Connecter;
