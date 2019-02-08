import React, { Component } from "react";

class Connecter extends Component {
  constructor(props) {
    super(props);
    this.state = { change: 0, avatar: this.props.source.avatar };
    this.state = { change: 0, pseudo: this.props.source.pseudo };
  }
  render() {
    return (
      <div className="connecter">
        <ul>
          <li> {this.props.source.avatar}</li>
          <li>{this.props.source.pseudo}</li>
        </ul>
      </div>
    );
  }
}

export default Connecter;
