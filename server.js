class Client {
    constructor(pseudo,avatar, id) {
    this.pseudo=pseudo;
    this.avatar = avatar;
    this.id=id;
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
    
    //tableau clients
    let clients = [];
    
    let historyMessage = [];
    
    // The event will be called when a client is connected.
    io.on('connection', (socket) => {
        console.log('Client connecté ', socket.id);
    
        socket.on('message', function(msg) {
            let json = JSON.parse(msg);
    
            console.log("nombre de clients",clients.length)
    
            //Envoi de l'historique au nouveau client
            // for (let i=0;i<clients.length;i++) {
            //     if (clients[i].id!== socket.id && clients.length !== 0 && historyMessage.length !== 0) {
            //         console.log("envoi de l'historique à "+clients[i].pseudo + " ,id : "+ clients[i].id);
            //         console.log("detail de l'historique",historyMessage);
            //         //*********** */CRASH EL SERVER/*********************
            //         // io.to(socket.id).emit('smessage',JSON.stringify([{"type" : VALIDMASTER},{"messages": historyMessage}]));   
            //     }
            // }
    
            // Mise à jour des LOGIN
            if (json[0].type ===LOGIN) {
                clients.push(new Client(json[1].pseudo,json[1].avatar, socket.id));
                console.log(json[1].pseudo + " ( " + socket.id +" ) s'est identifié"); // Dernier User connecté
                console.log("détail des clients",clients); // Tableau des Users 
                io.emit('smessage',JSON.stringify([{"type":UPDATELOGIN},{"user": clients}]))
                // if (msg.startsWith('##MASTER'))
            }
            // Envois des messages
            if (json[0].type === MESSAGE){
                console.log(json[1].date + " : " + json[1].sender.pseudo + " : " + json[1].text);
                io.emit('smessage',msg);
                historyMessage.push(json[1]);
                // console.log('message transit',historyMessage);
            }
                // else {
                //     // Vérifie si le client existe dans le tableau
                //     for (let i=0;i<clients.length;i++) {
                //         if (clients[i].pseudo===json[1].pseudo) {
                //             console.log("envoi à "+json[1].sender+" de "+msg);
                //             io.to(clients[i].id).emit(JSON.stringify([{type : VALIDMASTER},clients.slice(0,2)]));
                //             return;
                //         }
                //     }
                //     console.log("envoi all socket.id non trouvé "+msg);
                //     io.emit(json);
                // }
        });
    // supprime client lors déconnection
        socket.on('disconnect', function () {
            console.log('Client déconnecté... ', socket.id)
            for (let i=0;i<clients.length;i++)
                if (clients[i].id===socket.id) {
                    clients.splice(i,1);
                    io.emit('smessage',JSON.stringify([{"type":UPDATELOGIN},{user: clients}]))
                    console.log(clients);
                    break;
                }
        })
    
        socket.on('error', function (err) {
        console.log('Erreur client ', socket.id)
        console.log(err)
        })
    });
    
    server.listen(port, () => console.log(`Listening on port ${port}`))