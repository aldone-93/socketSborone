const app = require('express')();
const expr = require('express');
const http = require('http').Server(app);
const path = require('path');

let angularApp = expr();
// Serve only the static files form the dist directory
angularApp.use(expr.static(__dirname + '/dist/socket-app'));

angularApp.get('/', function(req,res) {
    console.log('test')
    res.sendFile(path.join(__dirname+'/dist/socket-app/index.html'));
});

// Start the app by listening on the default Heroku port
angularApp.listen(process.env.PORT || 4444);
