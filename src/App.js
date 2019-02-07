import React, { Component } from 'react';
import Output from './Component/Output';
import Input from './Component/Input';
import Transport from './Class/Transport.js';
import Connecter from './Component/Connecter';
import Login from './Component/Login'
import './App.css';



class App extends Component {
  constructor(props){ 
    super(props);

    this.echange=new Transport();

    this.state={modif:false}



}


cestok=() => {

this.setState({ modif: !this.state.modif });
console.log(this.state.modif);
console.log(this.echange);
}
  render() {
    return (
      <div className ="chatapp">
        <h1>Time-Break</h1>
        <Login className="login"/>
        <Connecter className="connecter" source={this.echange}/>
        <Output className="output" source={this.echange} sendTime={this.echangeTime} />
        <Input source={this.echange}callback={this.cestok}/>
      </div>
    );
  }
}

export default App;

