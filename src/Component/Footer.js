import React, { Component } from "react";

import ninie from '../img/ninie.png'; 
import roro from '../img/roro.png';
import eyal from '../img/eyal.png';
import masta from '../img/masta.png';



class Footer extends Component {
  render() {
    return (
    <div className="Footer"> 
      <div className="FooterGithub">
         <ul className="ListGithub">
            <li className="ItemGithub" aria-hidden="true">
              <a href="https://github.com/NiiniieB">
              <img className="ImgGithub" src={ninie} alt="Github"/>
              </a>
            </li>
      
            <li className="ItemGithub">
              <a href="https://github.com/Rominshky">
              <img className="ImgGithub" src={roro} alt="Github"/>
              </a>
            </li>
      
            <li className="ItemGithub">
              <a href="https://github.com/Luteces">
              <img className="ImgGithub" src={eyal} alt="Github"/>
              </a>
            </li>

            <li className="ItemGithub">
             <a href="https://github.com/masta971">
             <img className="ImgGithub" src={masta} alt="Github"/>
             </a>
            </li>
      </ul>
    </div>
    </div> 
      
      
      );
    }
  }
  
  export default Footer ;