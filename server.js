class Client {
    constructor(pseudo,avatar, id) {
        this.pseudo=pseudo;
        this.avatar = avatar;
        this.id=id;
    }
}

class HistoryMessage {
    constructor(sender,receiver, date, text) {
        this.sender=sender;
        this.receiver=receiver;
        this.date=date;
        this.text=text;
    }
}

const express = require('express')
const http = require('http')
const socketIO = require('socket.io')


// our localhost port
const port = 5000

const app = express()
// our server instance
const server = http.createServer(app)
const io = socketIO(server);

const INIT        = 0;
const VALIDMASTER = 1;
const LOGIN       = 2; // Identifiant JSON pour Tableau Users (envoyer depuis Login)
const MESSAGE     = 3; // Identifiant JSON pour Tableau Messages (envoyer depuis INPUT) 
const UPDATELOGIN = 4;
const ERRORLOGIN = 5;

//tableau clients
let clients = [];

let historyMessage = [];

// The event will be called when a client is connected.
io.on('connection', (socket) => {
    console.log('Client connecté ', socket.id);
    
    socket.on('message', function(msg) {
        let json = JSON.parse(msg);

        
        // Mise à jour des LOGIN
        if (json[0].type ===LOGIN) {
            for (let i=0;i<clients.length;i++)
                if (clients[i].pseudo===json[1].pseudo) {
                    io.to(socket.id).emit('smessage',JSON.stringify([{"type":ERRORLOGIN},{"user": clients}]));
                    return;
                }

            clients.push(new Client(json[1].pseudo,json[1].avatar, socket.id));
            console.log(json[1].pseudo + " ( " + socket.id +" ) s'est identifié"); // Dernier User connecté
            console.log("Personnes identifiées :",clients.length);
            console.log("détail des clients",clients); // Tableau des Users 
            io.emit('smessage',JSON.stringify([{"type":UPDATELOGIN},{"user": clients}]))

            // Envoi de l'historique au nouveau client -- BUG sur l'envoie l'historique.
            if(historyMessage.length > 0){ // Moins de Bug avec condition supplémentaire : clients.length > 2
                for (let i=0;i<clients.length;i++) {
                    if (clients[i].id !== socket.id) {
                        console.log("envoi de l'historique à "+clients[i].pseudo + " ,id : "+ clients[i].id);
                        io.to(socket.id).emit('smessage',JSON.stringify([{"type" : VALIDMASTER},{"messages": historyMessage}]));   
                    }
                }
            }
        }

        // Envois des messages
        if (json[0].type === MESSAGE){
            console.log(json[1].date + " : " + json[1].sender.pseudo + " : " + json[1].text);
            io.emit('smessage',msg); // Enbois les messages aux clients
            historyMessage.push(new HistoryMessage(json[1].sender, json[1].receiver, json[1].date, json[1].text)); // Enregistre sur le serveur l'historique des messages
            console.log('history Message server',historyMessage);
        }
 
    });
    // supprime client lors déconnection
    socket.on('disconnect', function () {
        console.log('Client déconnecté... ', socket.id)
        for (let i=0;i<clients.length;i++)
        if (clients[i].id===socket.id) {
            clients.splice(i,1);
            io.emit('smessage',JSON.stringify([{"type":UPDATELOGIN},{user: clients}]))
            console.log("détail des clients",clients); // Tableau des Users actualisé

            break;
        }
    })
    
    socket.on('error', function (err) {
        console.log('Erreur client ', socket.id)
        console.log(err)
    })
});

server.listen(port, () => console.log(`Listening on port ${port}`))