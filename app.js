const app = require('express')();
const expr = require('express');
var cors = require('cors')
let angularApp = expr();
const http = require('http').Server(app);

const io = require("socket.io")(http, {
    allowEIO3: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
});
  

const path = require('path');


let battle = {};
let lobby = {};

let availableLobbies = {};

// Serve only the static files form the dist directory
angularApp.use(expr.static(__dirname + '/dist/socket-app'));

angularApp.get('/', function(req,res) {
    console.log('test')
     angularApp.sendFile(path.join(__dirname+'/dist/socket-app/index.html'));
});

// Start the app by listening on the default Heroku port
angularApp.listen(4200);
console.log("angular on port" + process.env.PORT);
checkAvailableLobbies = function() {
    availableLobbies = {};
    for (const key in lobby) {
        if (lobby.hasOwnProperty(key)) {
            if(lobby[key].loggedUsers < 2) {
                availableLobbies[key] = lobby[key];
            }
        }
    }
    return availableLobbies;
}
io.on('connection', socket => {
    let previousId;
    const safeJoin = currentId => {
        socket.leave(previousId);
        battle[socket.id] = 0;
        socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
        previousId = currentId;
    }

    socket.on('getDoc', docId => {
        safeJoin(docId);
        io.emit('lobby', checkAvailableLobbies());
    });

    socket.on('createLobby', lobbyId => {
        lobby[lobbyId] = {
            battle: {},
            loggedUsers: 0
        };
        io.emit('lobby', checkAvailableLobbies());
    });

    socket.on('joinLobby', lobbyId => {
        lobby[lobbyId].loggedUsers += 1;
        lobby[lobbyId].battle[socket.id] = 0;
        io.emit('document', lobby);
    });

    socket.on('getBattle', lobbyId => {
        io.emit('document', lobby[lobbyId].battle);
    })

    socket.on('editDoc', doc => {
        lobby[doc.userId].battle[socket.id] += 1;
        console.log(`Socket ${socket.id} has edited ${lobby[doc.userId].battle[socket.id]}`);
        io.emit('document', lobby[doc.userId].battle);
    });

    io.emit('document', lobby);
    console.log(`Socket ${socket.id} has connected`);
});
http.listen(4444, (res) => {
    console.log('Listening on port' + res);
});