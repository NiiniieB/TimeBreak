import React, { Component } from "react";

import ninie from '../img/ninie.png'; 
import roro from '../img/roro.png';
import eyal from '../img/eyal.png';
import masta from '../img/masta.png';



class Footer extends Component {
  render() {
    return (
      
      <div className="FooterGithub">
        <p className="Github"><strong>Github : </strong></p>
         <ul className="ListGithub">
            <li className="ItemGithub" aria-hidden="true">
              <a href="https://github.com/NiiniieB">
              <img className="ImgGithub" src={ninie}/>
              </a>
            </li>
      
            <li className="ItemGithub">
              <a href="https://github.com/Rominshky">
              <img className="ImgGithub" src={roro}></img>
              </a>
            </li>
      
            <li className="ItemGithub">
              <a href="https://github.com/Luteces">
              <img className="ImgGithub" src={eyal}/>
              </a>
            </li>

            <li className="ItemGithub">
             <a href="https://github.com/masta971">
             <img className="ImgGithub" src={masta}/>
             </a>
            </li>
      </ul>
    </div>
      
      
      );
    }
  }
  
  export default Footer ;