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
import Disconnect from "./Component/Disconnect";
import User from "./Class/User";
import "./Responsive.css"

const INIT        = 0;
const VALIDMASTER = 1;
//const LOGIN       = 2; // Identifiant JSON pour Tableau Users (envoyer depuis Login)
const MESSAGE     = 3; // Identifiant JSON pour Tableau Messages (envoyer depuis INPUT) 
const UPDATELOGIN = 4; 



class App extends Component {
  constructor(props) {
    super(props);

    this.echange = new TimeBreak();

    this.state = { modif: false, message: "{}", user: "{}", etat: INIT};
    this.address=window.location.href;
    this.address=this.address.substring(0,this.address.length-5)+"5000";

    this.playSound =""; // initalise le status du player.

    Socket.initsocket(this.address);
}
componentDidMount() {

  // configuration réception message
  Socket.configuresocket((err, data) => {
    
    let jsonReceive = JSON.parse(data);
    

    if (jsonReceive[0].type === VALIDMASTER && this.state.etat === INIT){
      this.echange.messages = [];
      console.log("historique des messages clients", jsonReceive[1].messages);
      jsonReceive[1].messages.map((msg) => {
        this.setState({ message: msg});
      });
      
      this.setState({etat: VALIDMASTER});
    }
    

    if (jsonReceive[0].type === MESSAGE){
      this.setState({ message: jsonReceive[1]});
       //Local Storage
      localStorage.setItem('myHistoryMessage', JSON.stringify(this.echange.messages));
      console.log('local Storage client',localStorage.getItem('myHistoryMessage'));
    }
    
    // Reception de la Mise à jour des users 
    if(jsonReceive[0].type === UPDATELOGIN){
      this.echange.users = [];
      for (let i = 0; i < jsonReceive[1].user.length; i++) {
        let usr=new User();
        usr.create(jsonReceive[1].user[i].avatar,jsonReceive[1].user[i].pseudo);
        this.echange.users.push(usr);
      }
      this.cestok();
    }
  
  });
  
}

  cestok = () => {
    this.setState({ modif: !this.state.modif });
    console.log(this.state.modif);
    console.log(this.echange);
  
  };

  traitemessage=()=> {
    // console.log('control tableau',this.state.message);
    // si c'est un tableau
    if(this.state.message.length){
      if (this.echange.me.pseudo !== this.state.message[this.state.message.length -1].sender.pseudo){
        console.log(this.state.message[this.state.message.length -1]);
        this.echange.addMessage(this.state.message[this.state.message.length -1]);
        this.playSound = Sound.status.PLAYING; // joue le son à chaque message reçu
      }
      //si c'est un objet
      else {
        this.playSound=Sound.status.STOPPED; // Stop le son si la condition n'est pas bonne
      }
      this.setState({message:"{}"});
    } else {
      if (this.echange.me.pseudo !== this.state.message.sender.pseudo){
        console.log(this.state.message);
        this.echange.addMessage(this.state.message);
        this.playSound = Sound.status.PLAYING; // joue le son à chaque message reçu
      }
      else {
        this.playSound=Sound.status.STOPPED; // Stop le son si la condition n'est pas bonne
      }
      this.setState({message:"{}"});
    }

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
        <div className="navbar">
        <h1 className="navitem">Time-Break </h1>
        <Disconnect className="navitem"/> 
        </div>
        <div className="chat">
        <div className ="chatapp">
          <Connecter source={this.echange} callback={this.cestok}/>
        </div>
        <div className= "chatapp">
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
