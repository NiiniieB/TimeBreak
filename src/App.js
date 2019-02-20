import React, { Component } from "react";
import Output from "./Component/Output";
import Input from "./Component/Input";
import TimeBreak from "./Class/TimeBreak";
import Connecter from "./Component/Connecter";
import Login from "./Component/Login";
import "./App.css";
import Socket from "./Component/Socket";

import audioReceive from "./sounds/souffle_air.mp3";
import Sound from 'react-sound';

// const INIT        = 0;
// const VALIDMASTER = 1;
const LOGIN       = 2; // Identifiant JSON pour Tableau Users (envoyer depuis Login)
const MESSAGE     = 3; // Identifiant JSON pour Tableau Messages (envoyer depuis INPUT) 





class App extends Component {
  constructor(props) {
    super(props);

    this.echange = new TimeBreak();

    this.state = { modif: false, message: "{}", user: "{}" /*, etat: INIT */};
    this.address=window.location.href;
    this.address=this.address.substring(0,this.address.length-5)+"5000";

    this.playSound =""; // initalise le status du player.

    Socket.initsocket(this.address);
}
componentDidMount() {
  // configuration réception message
  Socket.configuresocket((err, data) => {
    let jsonReceive = JSON.parse(data);
    if (jsonReceive[0].type === MESSAGE ){
      this.setState({ message: jsonReceive[1]});
    }
    if (jsonReceive[0].type === LOGIN){
      this.setState({user : jsonReceive[1]});
    }
    // if (jsonReceive[0].type === INIT){

    // }
  });
// Socket.emit(JSON.stringify([{"type":INIT},{"msg":"#NEW#"}]));
  // si personne connecté, on attend un peu
  /*setTimeout(function() { //Start the timer
    if (this.state.etat===INIT)
    this.setState({etat: VALIDMASTER}) 
    }.bind(this), 2000);
  */
  
}

  cestok = () => {
    this.setState({ modif: !this.state.modif });
    console.log(this.state.modif);
    console.log(this.echange);
  
  }

  traitemessage=()=> {
    if (this.echange.me.pseudo !== this.state.message.sender.pseudo){
      console.log(this.state.message);
      this.echange.addMessage(this.state.message);
      this.playSound = Sound.status.PLAYING; // joue le son à chaque message reçu
    }
    else {
      this.playSound=Sound.status.STOPPED; // Stop le son si la condition n'est pas bonne
    }
    this.setState({message:"{}"});
};



  traitePseudo=()=> {
    if (this.echange.me.pseudo !== this.state.user.pseudo){
      this.echange.addUser(this.state.user);
    }
    this.setState({user:"{}"});
  };



  render() {
    if (this.state.message !== "{}")
      this.traitemessage();
    if (this.state.user !== "{}")
      this.traitePseudo();
    if (this.echange.me.pseudo ==="") {
      console.log("I'm alive");
      return (<Login  source={this.echange} callback={this.cestok}/>);
    }
    else {
      console.log("Log !");
    return (
      <div>
        <h1>Time-Break </h1>
        <div className="chat">
        <div className ="chatapp">
          <Connecter source={this.echange}callback={this.cestok}/>
        </div>
        <div className= "chatapp">
          <Output source={this.echange}/>
          <Sound
            url={audioReceive}
            playStatus={this.playSound}
            />
          <Input source={this.echange}callback={this.cestok}/>
        </div>
        </div>
      </div>
      );
    }
  }
}

//test github

export default App;
