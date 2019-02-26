import React, { Component, Fragment } from "react";
import Output from "./Component/Output";
import Input from "./Component/Input";
import TimeBreak from "./Class/TimeBreak";
import Connecter from "./Component/Connecter";
import Login from "./Component/Login";
import "./App.css";
import Socket from "./Component/Socket";

//SOUNDS//
import SoundAlert from 'react-sound';
import alertSoundLog from "./sounds/errorLogSound.mp3";

import SoundConnect from 'react-sound';
import connectSound from "./sounds/connectSound.mp3";

import SoundReceive from 'react-sound';
import receiveMsgSound from "./sounds/receiveMsgSound.mp3";

import SoundSend from 'react-sound';
import sendMsgSound from "./sounds/sendMsgSound.mp3";

import Disconnect from "./Component/Disconnect";
import User from "./Class/User";
import Footer from "./Component/Footer"
import "./Responsive.css"
const Tetris = require('react-tetris');



const INIT        = 0;
const VALIDMASTER = 1;
//const LOGIN       = 2; // Identifiant JSON pour Tableau Users (envoyer depuis Login)
const MESSAGE     = 3; // Identifiant JSON pour Tableau Messages (envoyer depuis INPUT) 
const UPDATELOGIN = 4; 



class App extends Component {
  constructor(props) {
    super(props);

    this.echange = new TimeBreak();

    this.state = { modif: false, message: "{}", user: "{}", etat: INIT, sound: true};
    this.address=window.location.href;
    this.address=this.address.substring(0,this.address.length-5)+"5000";

    this.playSoundAlert=""; // player sound Alert Login
    this.playSoundLog =""; // player Sound Login connect.
    this.playSoundSend =""; // player Sound Send.
    this.playSoundReceive =""; // player Sound Receive.


    Socket.initsocket(this.address);
}

componentDidMount() {

  // configuration réception message add
  Socket.configuresocket((err, data) => {
    
    let jsonReceive = JSON.parse(data);
    

    if (jsonReceive[0].type === VALIDMASTER && this.state.etat === INIT){
      this.echange.messages = [];
      console.log("historique des messages clients", jsonReceive[1].messages);
      jsonReceive[1].messages.map((msg) => this.setState({ message: msg, etat: VALIDMASTER}));
    }
    else if (jsonReceive[0].type === MESSAGE){
      this.setState({ message: jsonReceive[1]});
      //Local Storage
      localStorage.setItem('myHistoryMessage', JSON.stringify(this.echange.messages));
      console.log('local Storage client',localStorage.getItem('myHistoryMessage'));
    }
    
    // Reception de la Mise à jour des users 
    if(jsonReceive[0].type === UPDATELOGIN){
      this.echange.users = [];
      for (let i = 0; i < jsonReceive[1].user.length; i++) {
        this.playSoundLog = SoundConnect.status.PLAYING;
        let usr=new User();
        usr.create(jsonReceive[1].user[i].avatar,jsonReceive[1].user[i].pseudo);
        this.echange.users.push(usr);
      }
      this.cestok();
    }
    this.playSoundLog = SoundConnect.status.STOPPED;
  });
}

  cestok = () => {
    this.setState({ modif: !this.state.modif });
    console.log(this.state.modif);
    console.log(this.echange);
  
  };

  traitemessage=()=> {
    // si c'est un tableau
    if(this.state.message.length){
      if (this.echange.me.pseudo !== this.state.message[this.state.message.length -1].sender.pseudo){
        console.log(this.state.message[this.state.message.length -1]);
        this.echange.addMessage(this.state.message[this.state.message.length -1]);
        this.playSoundReceive = SoundReceive.status.PLAYING; // joue le son à chaque message reçu
        this.playSoundSend = SoundSend.status.STOPPED;

      }
    
      else {
        this.playSoundSend = SoundSend.status.PLAYING; // joue le son à chaque message envoyé
        this.playSoundReceive=SoundReceive.status.STOPPED; // Stop le son si la condition n'est pas bonne
      }
      this.setState({message:"{}"});
    //si c'est un objet
    } else {
      if (this.echange.me.pseudo !== this.state.message.sender.pseudo){
        console.log(this.state.message);
        this.echange.addMessage(this.state.message);
        this.playSoundReceive = SoundReceive.status.PLAYING; // joue le son à chaque message reçu
        this.playSoundSend = SoundSend.status.STOPPED;
      }
      else {
        this.playSoundSend = SoundSend.status.PLAYING; // joue le son à chaque message envoyé
        this.playSoundReceive=SoundReceive.status.STOPPED; // Stop le son si la condition n'est pas bonne
      }
      this.setState({message:"{}"});
    }

};

  traitePseudo=()=> {
    if (this.echange.me.pseudo !== this.state.user.pseudo){
      this.echange.addUser(this.state.user);
    }
    this.setState({user:"{}"});
    this.playSoundLog = SoundConnect.status.STOPPED;
  };

  AlertSound=(data)=>{ // Fonction sonore utlisée par le composant Login
    if (data === "play") {
      this.playSoundAlert = SoundAlert.status.PLAYING;
      console.log("play alert sound");
    }
    else{
      this.playSoundAlert = SoundAlert.status.STOPPED;
      console.log("stop alert sound");
    }
    this.cestok();
  };

  render() {
    if (this.state.message !== "{}")
      this.traitemessage();
    if (this.state.user !== "{}")
      this.traitePseudo();
    if (this.echange.me.pseudo ==="") {
      console.log("I'm alive");
      return (
      <div>
        <Login sound={this.AlertSound} source={this.echange} callback={this.cestok}/>
        {this.state.sound &&
        <SoundAlert
            url={alertSoundLog}
            playStatus={this.playSoundAlert}
            />}
        <Footer/>
        
      </div>);
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
          <div>

            <Tetris>
              {({
                HeldPiece,
                Gameboard,
                PieceQueue,
                points,
                linesCleared
              }) => {
                // Render it however you'd like
                return (
                  <div>
                    {/* <HeldPiece /> */}
                    <div className="texteJeu">
                    <div className="titreJeu">
                    <h1>Tetris</h1>
                    </div>
                    <div className="score">
                      <p>Points: {points}</p>
                      <p>Lines Cleared: {linesCleared}</p>
                    </div>
                    </div>
                    <div className="test">
                    
                     <div className="item"><Gameboard /></div>
                     <div className="item"><PieceQueue /></div>
                    </div>
                  </div>
                )
              }}
            </Tetris>
          </div>
         
        </div>
        <div className= "chatapp">
          <Output source={this.echange}/>
          <Input source={this.echange} callback={this.cestok}/>
      
        </div>
        </div>
        <Footer/>
        <div>

        </div>
        <div>
                  {
          this.state.sound && // Rendu Conditionnel avec le state
          <Fragment> {/* pour permettre de ne peut pas ajouter de div*/}
            <SoundAlert
              url={alertSoundLog}
              playStatus={this.playSoundAlert}
              />
            
            <SoundConnect
              url={connectSound}
              playStatus={this.playSoundLog}
              />
            
            <SoundReceive
              url={receiveMsgSound}
              playStatus={this.playSoundReceive}
              />

            <SoundSend
              url={sendMsgSound}
              playStatus={this.playSoundSend}
              />
            </Fragment>}
            </div>
      </div>
      );
    }
  }
}

//test github

export default App;
