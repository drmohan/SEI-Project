// Sources:
// https://rawgit.com/Miguelao/demos/master/mediarecorder.html
// https://github.com/webrtc/samples/tree/gh-pages/src/content/getusermedia/record


'use strict';

/* globals MediaRecorder */

var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

var liveVideo = document.querySelector('video#live');
var recordedVideo = document.querySelector('video#recorded');

// get canvas for facial tracking
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// get box for face tracking
var tracker = new tracking.ObjectTracker('face');
tracker.setInitialScale(4);
tracker.setStepSize(2);
tracker.setEdgesDensity(0.1);

// data collection for proximity to screen
var percentages = [];

// functions to handle input numbers for face proximity to screen
function rollingAverage(size) {
  percentages.splice(0, percentages.length - size);
  var sum = percentages.reduce(function(total, num) {
    return total + num
  }, 0);
  return sum / percentages.length;
}

function percentageToInches(p) {
  return 49 * Math.exp(-0.023 * p);
}


tracking.track('video#live', tracker, { camera: true });

tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      context.strokeStyle = '#a64ceb';
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = '11px Helvetica';
      context.fillStyle = "#fff";
      context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
      context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        
      // write inches to screen in code element
    var percentage = 100 * rect.height / canvas.height;
    percentages.push(percentage);
    document.querySelector('code').textContent = percentageToInches(rollingAverage(5)).toFixed(0) + '"';
    });
});


var recordButton = document.querySelector('button#record');
var playButton = document.querySelector('button#play');
var downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecording;
playButton.onclick = play;
downloadButton.onclick = download;

// window.isSecureContext could be used for Chrome
var isSecureOrigin = location.protocol === 'https:' ||
location.hostname === 'localhost';
if (!isSecureOrigin) {
  alert('getUserMedia() must be run from a secure origin: HTTPS or localhost.' +
    '\n\nChanging protocol to HTTPS');
  location.protocol = 'HTTPS';
}

var constraints = {
  audio: true,
  video: true
};

function handleSuccess(stream) {
  recordButton.disabled = false;
  console.log('getUserMedia() got stream: ', stream);
  window.stream = stream;
  if (window.URL) {
    liveVideo.src = window.URL.createObjectURL(stream);
  } else {
    liveVideo.src = stream;
  }
}

function handleError(error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

recordedVideo.addEventListener('error', function(ev) {
  console.error('MediaRecording.recordedMedia.error()');
  alert('Your browser can not play\n\n' + recordedVideo.src
    + '\n\n media clip. event: ' + JSON.stringify(ev));
}, true);

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {
  console.log('Recorder stopped: ', event);
}

function toggleRecording() {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    playButton.disabled = false;
    downloadButton.disabled = false;
  }
}

function startRecording() {
  recordedBlobs = [];
  var options = {mimeType: 'video/webm;codecs=vp9'};
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    console.log(options.mimeType + ' is not Supported');
    options = {mimeType: 'video/webm;codecs=vp8'};
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.log(options.mimeType + ' is not Supported');
      options = {mimeType: 'video/webm'};
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.log(options.mimeType + ' is not Supported');
        options = {mimeType: ''};
      }
    }
  }
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error('Exception while creating MediaRecorder: ' + e);
    alert('Exception while creating MediaRecorder: '
      + e + '. mimeType: ' + options.mimeType);
    return;
  }
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
  recordedVideo.controls = true;
}

function play() {
  var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
  recordedVideo.src = window.URL.createObjectURL(superBuffer);
}

function download() {

  var IP = '128.237.218.188';
  var port = 8888;
  var socket = io.connect('http://' + IP + ':' + port);

    socket.on('message', function (data) {

      // debugger;


      // var x = document.getElementById('vid');
      // x.setAttribute("src", "hillary-face-email-attack.mov")
      // x.setAttribute("width", "320");
      // x.setAttribute("height", "240");
      // x.setAttribute("id", "myVideo");

      $('#container').hide();
      $('#vid').load("partials/vid.html");
      

      console.log(data.csvData);
      plotBPMs(data.csvData);
      // var results = document.getElementById("results-from-server")
      // results.textContent = data.csvData;
      // var dataViz = document.getElementById("results");
      // dataViz.style = ""
    });


  var blob = new Blob(recordedBlobs, {type: 'video/webm'});
  console.log("Blob: ");
  console.log(blob);

  var file = new File([blob], 'test.webm');
  console.log("File: ");
  console.log(file);
  var file_name = 'test.webm';
  // socket.emit('message', {data: file,
  //                         file_name: file_name});

  socket.emit('message', {data: file, file_name: file_name}, function (data) {
      console.log(data); // data will be 'BPMs generated' or 'Error'
    });

  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}

function plotBPMs(csvData){
  var chartData = generatechartData();

  function generatechartData() {
    var chartData = [];

    var d = csvData.split('\n');
    console.log(d[0]);
    for ( var i = 0; i < d.length; i++ ) {
      var line = d[i]
      line = line.split(',')
      chartData.push({
        frame: Number(line[3]),
        bpm: Number(line[2])
      });
    }
    return chartData;
  }


  var chart = AmCharts.makeChart( "chartdiv", {
    "theme": "light",
    "type": "serial",
    "dataProvider": chartData,
    "valueAxes": [ {
      "inside": true,
      "axisAlpha": 0
    } ],
    "graphs": [ {
      "id": "g1",
      "balloonText": "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[category]]</span><br>[[value]]</div>",
      "oneBalloonOnly": true,
      "bullet": "round",
      "bulletSize": 0.1,
      "bulletAlpha": 0,
      // "bulletBorderColor": "#FFFFFF",
      // "hideBulletsCount": 500,
      "lineThickness": 4,
      "lineColor": "#fdd400",
      "negativeBase": 85,
      "negativeLineColor": "#67b7dc",
      "valueField": "bpm"
    } ],
    "chartScrollbar": {

    },
    "chartCursor": {},
    "categoryField": "frame",

    "listeners": [ {
      "event": "dataUpdated",
      "method": function() {
        if ( chart ) {
          if ( chart.zoomToIndexes ) {
            chart.zoomToIndexes( 130, chartData.length - 1 );
          }
        }
      }
    } ]
  } );

  chart.addListener("rollOverGraphItem", function(event) {
    setCurTime(Number(event.item.category));
  });

  function setCurTime(time) {
    var vid = document.getElementById("myVideo")
    vid.currentTime = time;
    console.log(vid.currentTime);
  }

};
