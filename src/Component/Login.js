import React, {Component} from "react"
import User from "../Class/User"
import Socket from "./Socket";


class Login extends Component {
	constructor(props) {
		super(props)
		let avatar = "";
		this.state = {avatar}
	}
	getAvatar = () => {
		let pseudo = document.getElementById("pseudo").value
		// console.log("https://api.github.com/search/users?q=" + pseudo);
		fetch("https://api.github.com/search/users?q=" + pseudo)
			.then((avatarGitHub) => avatarGitHub.json())
			.then((avatarGitHub) => {
				console.log(avatarGitHub);

				if (avatarGitHub.total_count > 0) {
					let user = new User();
					user.create(avatarGitHub.items[0].avatar_url, avatarGitHub.items[0].login );
					this.props.source.addUser(user);
					this.props.source.me = user;
					Socket.emit(JSON.stringify([{"type":2},user]));
					this.props.callback();
					document.getElementById("reset").reset() //Reset data from login field
				} else {
					alert("Error ! Wrong entry or avatar not found")
				}
			})
	}

	// This is here for prevent refresh from enter
	onSubmit(event) {
		event.preventDefault()
	}
	render() {
		return (
			<div className="container">
				<form id="reset" onSubmit={this.onSubmit}>
					<input id="pseudo" type="text" />
					<button onClick={this.getAvatar} className="btn btn-success" value="Login">
						Login
					</button>
				</form>
			</div>
		)
	}
}
export default Login
