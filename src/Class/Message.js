class Message {
    constructor(){
        //this.sender= new User();
        //this.receiver= new Receiver();
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
