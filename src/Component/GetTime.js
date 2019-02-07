import React, { Component } from 'react';

class GetTime extends Component {
    constructor(props) {
        super(props)
        this.date ="";
        this.hour="";
        this.minute="";
        this.seconde="";
        this.timeMsg = "";
        console.log(this.timeMsg);

    }
    addZero(i){
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    } 

    createTime(){
        this.date = new Date();
        this.hour=  this.addZero(this.date.getHours());
        this.minute= this.addZero(this.date.getMinutes());
        this.seconde= this.addZero(this.date.getSeconds());
        this.timeMsg = this.hour + ":" + this.minute + ":" + this.seconde;
    }
    render(){
        return(
        <div>
            <p >{this.timeMsg}</p>
        </div>
        );
    }
}
export default GetTime;