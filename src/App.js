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




class App extends Component {
  constructor(props) {
    super(props);

    this.echange = new TimeBreak();

    this.state = { modif: false, message: "{}", user : "{}"};
    this.address=window.location.href;
    this.address=this.address.substring(0,this.address.length-5)+"5000";

    Socket.initsocket(this.address);
}
componentDidMount() {
  // configuration réception message
  Socket.configuresocket((err, data) => {
    let jsonReceive = JSON.parse(data);
    if (jsonReceive[0].type === 0 ){
      this.setState({ message: jsonReceive[1]});
    }
    if (jsonReceive[0].type === 1){
      this.setState({user : jsonReceive[1]});
    }
  });
  //const event=new Event("#NEW#",0,0,0);
  // Socket.emit(" coucou je viens de me connecter ");
};

  cestok = () => {
    this.setState({ modif: !this.state.modif });
    console.log(this.state.modif);
    console.log(this.echange);
  
  };

  traitemessage=()=> {
    if (this.echange.me.pseudo !== this.state.message.sender.pseudo){
      this.echange.addMessage(this.state.message);
      this.playSound = Sound.status.PLAYING; // joue le son à chaque message reçu
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
      return (<Login source={this.echange} callback={this.cestok}/>);
    }
    else {
      console.log("Log !");
      return (
          <div>
            <h1>Time-Break </h1>
            <div className="chat">
              <div className="chatapp">
                <Connecter source={this.echange} callback={this.cestok}/>
              </div>
              <div className="chatapp">
                <Output source={this.echange}/>
                <Sound
                    url={audioReceive}
                    playStatus={this.playSound}
                />
                <Input source={this.echange} callback={this.cestok}/>
              </div>
            </div>
          </div>
      );
    }
  }
  }

//test github

export default App;
