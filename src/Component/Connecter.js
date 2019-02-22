import React, { Component } from "react";

class Connecter extends Component {


    
    render(){
        return(

            
            <div>            
        <ul className="connecter" id="menu"> {this.props.source.users.map((user) => <li key={"index"} className="user-list" ><span className="display">{user.pseudo} </span><img alt="avatar" className="avatar" src={user.avatar}/></li>)}</ul>
            
            </div>
        
        
        )   
    }
}

export default Connecter;
