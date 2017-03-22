var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs')

app.listen(8888);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {

  socket.on('message', function (data, callback) {

    var fs = require('fs');

    var file_name = 'receivedFiles/' + data.file_name.toString();

    fs.writeFile(file_name, data.data, 'binary', function (err) {
      if (err) {
        // console.log('Some error occured - file either not saved or corrupted file saved.');
        // socket.emit('message', {response: 'File transfer unsuccessful'});

        // "callback" refers to function passed in as parameter
        // from client (video.js line 158)
        callback("Text from server");
      }
      else{
        // console.log('It\'s saved!');
        // socket.emit('message', {response: 'File transferred successfully'});
        callback('File transfer successful');
        fs.readFile('hillary-face-email-attack.csv', 'utf8', function(err, data) {
          if (err) throw err;
          socket.emit('message', {csvData: data});
        });
      }
    });
  });
});


var fs = require('fs');
