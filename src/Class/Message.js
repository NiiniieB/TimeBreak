class Message {
    constructor(){
        //this.sender= new User();
        //this.receiver= new Receiver();
        this.date="";
        this.message="";
    }
    create(sender,receiver,date,message){
        this.sender=sender;
        this.receiver=receiver;
        this.date=date;
        this.message=message;
    }
}

export default Message;
