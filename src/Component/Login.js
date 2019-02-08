import React, { Component } from "react";
import User from "../Class/User";

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
        // this.setState({ avatar: success.items[0].avatar_url });

          if (avatarGitHub.total_count > 0) {
                  let user = new User();
                  user.pseudo = avatarGitHub.items[0].login;
                  user.avatar = avatarGitHub.items[0].avatar_url;
                  this.props.source.addUser(user);
                  this.props.callback();
                  //this.setState({ avatar: avatarGitHub.items[0].avatar_url });
              } else {
                  alert("Error ! Wrong entry or avatar not found");
              }
          } 
      );
  };



  render() {
    return (
      <div className="container">
        <form>
          <input id="pseudo" type="text" />
          <input
            type="button"
            className="btn btn-success"
            value="Login"
            onClick={this.getAvatar}
          />
        </form>
        {/*<img src={this.state.avatar} className={"img-thumbnail"} alt={""} />*/}
      </div>
    );
  }
}
export default Login;