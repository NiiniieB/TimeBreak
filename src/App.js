import React, { Component } from "react";
import Output from "./Component/Output";
import Input from "./Component/Input";
import TimeBreak from "./Class/TimeBreak";
import Connecter from "./Component/Connecter";
import Login from "./Component/Login";
import "./App.css";
import Socket from "./Component/Socket";
import { timingSafeEqual } from "crypto";




class App extends Component {
  constructor(props) {
    super(props);

    this.echange = new TimeBreak();

    this.state = { modif: false, message: "{}" };
    this.address=window.location.href;
    this.address=this.address.substring(0,this.address.length-5)+"5000";


    /*this.state = { date,etat,message,name };*/

    Socket.initsocket(this.address);
}
componentDidMount() {
  // configuration réception message
  Socket.configuresocket((err, data) => this.setState({ message: JSON.parse(data) }));
  //const event=new Event("#NEW#",0,0,0);
  // Socket.emit(" coucou je viens de me connecter ");
};

  cestok = () => {
    this.setState({ modif: !this.state.modif });
    console.log(this.state.modif);
    console.log(this.echange);
  
  }

  traitemessage=()=> {
    this.echange.addMessage(this.state.message);
    
    this.setState({message:"{}"});
  }

  render(){
    if (this.state.message!=="{}")
      this.traitemessage();
    return (
      <div>
        <h1>Time-Break</h1>
        <div className="chat">

        <div className ="chatapp">
          <Login source={this.echange} callback={this.cestok}/>
          <Connecter source={this.echange}callback={this.cestok}/>
        </div>
        <div className= "chatapp">
          <Output source={this.echange}/>
          <Input source={this.echange}callback={this.cestok}/>
        </div>
        </div>
      </div>
      );
    }
  }

//test github

export default App;
