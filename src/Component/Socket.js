import openSocket from "socket.io-client";

var websocket;

class Socket {

static initsocket(httpaddress) {
websocket = openSocket(httpaddress);
}

static configuresocket(fct) {
//socket.on('timer', timestamp => cb(null, timestamp));
websocket.on('smessage',data => fct(null,data));
}

static emit(str) {
websocket.emit('message',str);
}

//Fonction verif Login
static verif(str) {
    console.log("fichier Socket read");
    websocket.emit('verifLogin',str);
    }

}

export default Socket;