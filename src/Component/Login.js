import React, { Component } from "react";
import User from "../Class/User";
import Socket from "./Socket";

const INIT        = 0;
const VALIDMASTER = 1;
const LOGIN       = 2; // Identifiant JSON pour Tableau Users (envoyer depuis Login)
const MESSAGE     = 3; // Identifiant JSON pour Tableau Messages (envoyer depuis INPUT) 
const UPDATELOGIN = 4; 

class Login extends Component {
  constructor(props) {
    super(props);
    let avatar = "";
    this.state = { avatar };
  }

  
  getAvatar = () => {
    let pseudo = document.getElementById("pseudo").value;
    // console.log("https://api.github.com/search/users?q=" + pseudo);
    fetch("https://api.github.com/search/users?q=" + pseudo)
      .then(avatarGitHub => avatarGitHub.json())
      .then(avatarGitHub => {
        console.log(avatarGitHub);

        if (avatarGitHub.total_count > 0) {
          Socket.emit(JSON.stringify([{ type: INIT }, avatarGitHub.items[0].login]));
          console.log("lecture du json Log",JSON.stringify([{ type: INIT }, avatarGitHub.items[0].login]));
          
          // Socket.verif((err, data) => {
          //   console.log("socket configur");
          //   let jsonReceive = JSON.parse(data);
          //     if (jsonReceive[0].type === VALIDMASTER){
          //         console.log("hey ça passe par la");
          //     }
          // });

           // Socket.verif(JSON.stringify(avatarGitHub.items[0].login));

          let user = new User();
          user.create(
            avatarGitHub.items[0].avatar_url,
            avatarGitHub.items[0].login
          );
          console.log("Github create")
          this.props.source.addUser(user);
          this.props.source.me = user;
          //console.log("read socket", )
          Socket.emit(JSON.stringify([{ type: LOGIN }, user]));
          this.props.callback();
          // document.getElementById("reset").reset(); //Reset data from login field
        } else {
          alert("Error ! Wrong entry or avatar not found");
        }
      });
  };

	// This is here for prevent refresh from enter
  static onSubmit(event) {
    event.preventDefault();
  }
  render() {

    return (
      <div className="login">
        <form className="loginEnter" onSubmit={Login.onSubmit}>
          <h1>Time-Break </h1>
          <input id="pseudo" type="text" />
          <button onClick={this.getAvatar} value="Login">
            Login
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
