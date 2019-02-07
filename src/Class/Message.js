class Message {
    constructor(){
        this.sender="";
        this.receiver="";
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