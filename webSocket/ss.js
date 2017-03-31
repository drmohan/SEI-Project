var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs')
var PythonShell = require('python-shell');


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

var processVideo = function(video, sendCSV) {
  generateCSV(video);

  //function passed in
  //writes video to server side and emits bpms.csv -> client
  sendCSV('bpms.csv');
}

function generateCSV(video){
  // run a python script and invokes a callback with the results
  PythonShell.run('find_bpms.py', function (err, results) {
    // script finished
    console.log(results);
  });

}

io.sockets.on('connection', function (socket) {

  socket.on('message', function (data, callback) {

    var fs = require('fs');
    var file_name = 'receivedFiles/' + data.file_name.toString();

    processVideo( data.data,
                  function(csvFilename) {
                    //write video file to server side just to show it's been received
                    fs.writeFile(file_name, data.data, 'binary', function (err) {
                      if (err) {
                        callback("Error");
                      }
                      else{
                        fs.readFile(csvFilename, 'utf8', function(err, data) {
                          if (err) throw err;
                          socket.emit('message', {csvData: data});
                          callback('BPMs generated');
                        });
                      }
                    });
                  }
                );
  });
});
