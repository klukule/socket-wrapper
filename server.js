var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

io.on('connect', function(socket) {
  console.log('a user connected');
  socket.on('cpu', function(data) {
    // process.stdout.write('\033c'); //Clear sequence
    socket.broadcast.emit('cpu', data);
    // Debu view on server side
    // console.log("Cores: "+data.length);
    // var i = 0;
    // data.forEach(function(core){
    //   console.log('Core #'+(i+1)+':'+core['Load']+"%");
    //   i++;
    // });
  });
});

http.listen(server_port, server_ip_address, function() {
  console.log('listening on *:'+server_port);
});
