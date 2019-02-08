import React, { Component } from "react";


class Login extends Component {
  constructor(props) {
    super(props);
    let avatar = "";
    this.state = { avatar };
    
  }
  getAvatar = () => {
    const pseudo = document.getElementById("pseudo").value;
    // console.log("https://api.github.com/search/users?q=" + pseudo);
    fetch("https://api.github.com/search/users?q=" + pseudo)
      .then(success => success.json())
      .then(success => {
        console.log(success);
        // this.setState({ avatar: success.items[0].avatar_url });
        if (success.total_count !== 1) {
          if (success.items[0].login === pseudo) {
            this.setState({ avatar: success.items[0].avatar_url });
          } else {
            alert("Error wrong entry or avatar not found");
          }
        } else {
          this.setState({ avatar: success.items[0].avatar_url });
        }
      });
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
        <img src={this.state.avatar} className={"img-thumbnail"} alt={""} />
      </div>
    );
  }
}
export default Login;