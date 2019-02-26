import React, { Component } from "react";

class Connecter extends Component {


    
    render(){
        return(

            
            <div>            
        <ul className="connecter"> {this.props.source.users.map((user) => <li key={"index"} className="user-list" ><span className="display">{user.pseudo} </span><img alt="avatar" className="avatarConnecter" src={user.avatar}/></li>)}</ul>
            
            </div>
        
        
        )   
    }
}

export default Connecter;
