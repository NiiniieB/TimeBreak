class TimeBreak {
  constructor() {
    this.messages = []; // receive from class Message => sender, receiver, date, text
    this.users = [];    // receive from class User => avatar, pseudo
    console.log(this.messages);
    console.log(this.users);
  }


  // param = obj from User
  // Renvoie false si usr est déjà existant
  // Renvoie true si usr est rajouté correctement
  addUser(usr) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].pseudo === usr.pseudo) {
        return false;
      }
    }
    this.users.push(usr);
    return true;
  }


  /*
    Pour Eyal 
   let obj = new User() ;
   obj.create(avatar,pseudo);
   addUser (obj);
    */
   addMessage(msg){
    if (msg.text==="") return false;
    this.messages.push(msg);
    return true;
    }
    // Cette fonction met à jour le message
    setMessage =(str) => {
        this.message = str;
        console.log(str);
    }
    // Cette fonction met à jour le pseudo
    setPseudo = (str) => {
        this.pseudo = str;
        console.log(str);
    }
}





export default TimeBreak;
