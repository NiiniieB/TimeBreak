import React, { Component } from "react";

import ninie from '../img/ninie.png'; 
import roro from '../img/roro.png';
import eyal from '../img/eyal.png';
import masta from '../img/masta.png';



class Footer extends Component {
  render() {
    return (
      
      <div>
      
      <footer className="footer">
      
      
      
      
      <ul className="list">
      
      
      
      <p className="ya"><strong>Github : </strong></p>
      
      
      
      <li className="list-inline-item" aria-hidden="true">
      <a href="https://github.com/NiiniieB">
      <img className="tata" src={ninie}/>
      </a>
      </li>
      
      <li className="list-inline-item">
      <a href="https://github.com/Rominshky">
      <img className="tata" src={roro}></img>
      </a>
      </li>
      
      <li className="list-inline-item">
      <a href="https://github.com/Luteces">
      <img className="tata" src={eyal}/>
      </a>
      </li>
      <li className="list-inline-item">
      <a href="https://github.com/masta971">
      <img className="tata" src={masta}/>
      </a>
      </li>

      
      
      </ul>
      
      
      
      
      
      
      </footer>
      </div>
      
      
      );
    }
  }
  
  export default Footer ;