class Transport {
    constructor() {
        this.pseudo="TOTO";
        this.message="";
        this.avatar="Tata";

    }

    // Cette fonction met à jour le pseudo
    setPseudo = (str) => {
        this.pseudo = str;
        console.log(str);
    }

    // Cette fonction met à jour le message
    setMessage =(str) => {
        this.message = str;
        console.log(str);
    }
    
    
}

export default Transport;