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

function IsJsonString(str){
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
    }

// The event will be called when a client is connected.
io.on('connection', (socket) => {
    console.log('Client connecté ', socket.id);
    // console.log("read socket", socket);
    socket.on('verifLogin', function(vlogin){
        console.log("Mon server vérifie le psueod", vlogin);
    })
    socket.on('message', function(msg) {
        console.log("read msg", msg);
        
        //TESt COMPTABILITÉ json
        let json;
        if(IsJsonString(msg)){ 
         json = JSON.parse(msg);
        }
        else {
          json = msg;
        }
        console.log("read json", json)
        
        var canLog = false;
        if (json[0].type === INIT){
            console.log("IIIIIIIIIIIIIIIniT");
            console.log("taleau des clients",clients);
            console.log(json[1]);
            console.log("test client log",clients.filter(x => x.pseudo === json[1]).length);
           if (clients.filter(x => x.pseudo === json[1]).length === 0 ){ //ecrire un test
                canLog = true;
                console.log(json)
                clients.push(new Client(json[1],"", socket.id));
                io.to(socket.id).emit(JSON.stringify([{type : VALIDMASTER}, "validServer"]));
                console.log("validServer Login");
            }
            else {
                io.to(socket.id).emit(JSON.stringify([{type : VALIDMASTER}, "unvalidServer"]));
                console.log("unvalidServer Login");
            }
        }
        if (json[0].type ===LOGIN && canLog === true) {
            
            console.log(json[1].pseudo + " ( " + socket.id +" ) s'est identifié"); // Dernier User connecté
            clients.push(new Client(json[1].pseudo,json[1].avatar, socket.id));
            io.emit('smessage',JSON.stringify([{"type":UPDATELOGIN},{user: clients}]));

            // clients.map(x => {
            //     console.log("read x",x);
            //     console.log("read json", json[1]);
            //     if (x.pseudo !== json[1].pseudo){
            //         console.log("clients",clients); // Tableau des Users 
            //         clients.push(new Client(json[1].pseudo,json[1].avatar, socket.id));
            //         io.emit('smessage',JSON.stringify([{"type":UPDATELOGIN},{user: clients}]));
            //     }
            //     else{
            //         return console.log("je ne suis pas bon");
            //     }
            //     });

            
        }
        // Envois des messages
        if (json[0].type === MESSAGE){
            console.log(json[1].date + " : " + json[1].sender.pseudo + " : " + json[1].text);
            io.emit('smessage',msg);
        }
            // else {
            //     // Vérifie si le client existe dans le tableau
            //     for (let i=0;i<clients.length;i++) {
            //         if (clients[i].pseudo===json[1].pseudo) {
            //             console.log("envoi à "+json[1].sender+" de "+msg);
            //             io.to(clients[i].id).emit(JSON.stringify([{type : MESSAGE}]));
            //             return;
            //         }
            //     }
            //     console.log("envoi all socket.id non trouvé "+msg);
            //     io.emit(json);
            //}
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
