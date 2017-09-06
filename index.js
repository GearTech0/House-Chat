var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var user = {
    username: '',
    imgURL: '',
};
var currentUsers = [];


////////////////CSS FILES/////////////////
app.get('/css/main.css', function(req, res)
{
    res.sendFile(__dirname + '/css/main.css');
})
app.get('/css/login.css', function(req, res)
{
    res.sendFile(__dirname + '/css/login.css');
});
////////////////END CSS FILES////////////////
////////////////PATHS/////////////////////////
app.get('/', function(req, res)
{
    res.sendFile(__dirname + '/login.html');
});
app.post('/users/', function(req, res)
{
    user['username'] = req.body['uname'];
    res.sendFile(__dirname + '/index.html');
});
///////////////END PATHS///////////////////


io.on('connection', function(socket)
{
    console.log(user['username'] + ' has connected');
    io.emit('chat message', user['username'] + ' has connected.');
    socket.on('disconnect', function(){
        console.log('user disconnected [' + (new Date()) + ']');
    });
    socket.on('chat message', function(msg){
        //console.log('message: ' + msg);
        io.emit('chat message', user['username'] + ': ' + msg);
    });
});

http.listen(3000, function()
{
    console.log('listening on *:3000');
});
