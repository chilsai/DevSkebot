var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/Public'));
app.set('views', __dirname + '/Public/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){

	res.render('index');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
	io.emit('chat message', msg);
  });
});

http.listen(app.get('port'), function(){
  console.log('listening on *:5000');
});