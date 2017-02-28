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

  socket.on('message', function (data) {
    // console.log(data);
    // var csvContent = "data:text/csv;charset=utf-8,";
    //
    // var bl;
    // n = Object.keys(data).length
    // for(bl=0; bl < n; bl++){
    //   csvContent = bl + ": " + data[bl] + '\n'
    // }

    var fs = require('fs');

    var file_name = data.file_name.toString();
    // console.log("hello");
    // console.log(data);
    fs.writeFile(file_name, data.data, 'binary', function (err) {
    // fs.writeFile('my-data.csv', csvContent, 'utf8', function (err) {
      if (err) {
        console.log('Some error occured - file either not saved or corrupted file saved.');
      } else{
        console.log('It\'s saved!');
      }
    // });

  });
});
});
