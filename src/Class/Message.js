class Message {
    constructor(){
        this.sender= "";
        this.receiver= "";
        this.date="";
        this.text="";
    }
    create(sender,receiver,date,text){
        this.sender=sender;
        this.receiver=receiver;
        this.date=date;
        this.text=text;
    }
}

export default Message;
