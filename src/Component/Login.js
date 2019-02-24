import React, { Component } from "react";
import User from "../Class/User";
import Socket from "./Socket";
// module sweetalert2
import Swal from 'sweetalert2'

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
          let user = new User();
          user.create(
            avatarGitHub.items[0].avatar_url,
            avatarGitHub.items[0].login
          );
          this.props.source.addUser(user);
          this.props.source.me = user;
          Socket.emit(JSON.stringify([{ type: 2 }, user]));
          this.props.callback();
          // document.getElementById("reset").reset(); //Reset data from login field
        } else {
          Swal.fire({
            title: 'Erreur !',
            text: "Cet identifiant n'existe pas",
            type: 'error',
            confirmButtonText: 'OK'
          })
        }
      });
  };

	// This is here for prevent refresh from enter
  static onSubmit(event) {
    event.preventDefault();
  }
  render() {

    return (
      
        <form className="loginEnter" onSubmit={Login.onSubmit}>
          <h1>Time-Break </h1>
          <div className="toto">
          <input id="pseudo" type="text" placeholder="Entrer votre pseudo Github" />
          <button onClick={this.getAvatar} value="Login">
          </button>
          </div>
        </form>
    );
  }
}
export default Login;
