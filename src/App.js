import React, { Component } from 'react';
import Output from './Component/Output';
import Input from './Component/Input';
import TimeBreak from './Class/TimeBreak'
import Connecter from './Component/Connecter';
import Login from './Component/Login'
import './App.css';



class App extends Component {
  constructor(props){ 
    super(props);

    this.echange=new TimeBreak();

    this.state={modif:false}



}


cestok=() => {

this.setState({ modif: !this.state.modif });
console.log(this.state.modif);
console.log(this.echange);
}
  render() {
    return (
      <div>
        <h1>Time-Break</h1>
        <div className="chat">
        <div className ="chatapp">
          <Login className="login"/>
          <Connecter className="connecter" source={this.echange}/>
        </div>
        <div className= "chatapp">
          <Output className="output" source={this.echange} sendTime={this.echangeTime} />
          <Input source={this.echange}callback={this.cestok}/>
        </div>
        </div>
      </div>
    );
  }
}
//test github

export default App;

