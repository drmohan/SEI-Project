'use strict';

/* globals MediaRecorder */
var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

var liveVideo = document.querySelector('video#live');
liveVideo.width = screen.width*(3/5);
liveVideo.height = screen.height*(3/5);
var checklistDiv = document.getElementById('checklist');
console.log(checklistDiv);
checklistDiv.width = screen.width*(3/5);
checklistDiv.height = screen.height*(3/5);

// get canvas for facial tracking
var canvas = document.getElementById('canvas');
canvas.width = liveVideo.width;
canvas.height = liveVideo.height;
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

var lastRect;

tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // if no faces are detected in the screen
    var imageCheckboxUser = document.querySelector("img#user-check");
    if (event.data.length > 0) {
        imageCheckboxUser.src = "assets/img/check-mark.png"
    } else {
        imageCheckboxUser.src = "assets/img/x-mark.png"

    }
    event.data.forEach(function(rect) {
      context.strokeStyle = '#fff';
      context.lineWidth = 5
      context.strokeRect(rect.x, rect.y, rect.width, rect.height); 

    if (lastRect != undefined) {
        var oneFace = oneFaceVisible(lastRect, rect);
        var imageCheckboxFace = document.querySelector("img#face-check");
        if (oneFace == true){
            imageCheckboxFace.src = "assets/img/check-mark.png";
        } else {
            imageCheckboxFace.src = "assets/img/x-mark.png";
        }
    }
    lastRect = rect;
    var percentage = 100 * rect.height / canvas.height;
    percentages.push(percentage);
    var inchesFromScreen = percentageToInches(rollingAverage(5)).toFixed(0);
    var imageCheckboxDist = document.querySelector("img#distance-check");
    if (inchesFromScreen <= 20){
        imageCheckboxDist.src = "assets/img/check-mark.png";
    } else {
        imageCheckboxDist.src = "assets/img/x-mark.png";
    }
     
    // check brightness
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = liveVideo.width;
    tempCanvas.height = liveVideo.height;
    var tempContext = tempCanvas.getContext('2d');    
    var brightness = getBrightness(tempCanvas.width, tempCanvas.height, tempContext, liveVideo, rect);
    
    var imageCheckboxLight = document.querySelector("img#light-check");    
    if (brightness >= 75) {
        imageCheckboxLight.src = "assets/img/check-mark.png";
    } else {
        imageCheckboxLight.src = "assets/img/x-mark.png";
    }
    });
});

function getBrightness(w, h, ctx, video, rect) {
        // draw the current image
        ctx.drawImage(video, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
        var imgd = ctx.getImageData(0, 0, rect.width, rect.height);
        var p = imgd.data;
 
        var colorSum = 0;
        var r, g, b, avg;
        for (var i = 0, n = p.length; i < n; i += 4) {
            r = p[i];
            g = p[i+1];
            b = p[i+2];
            
            avg = Math.floor((r+g+b)/3);
            colorSum += avg;
        }
        var brightness = Math.floor(colorSum / (rect.width*rect.height));
        return brightness;
    }

// returns true if only one face is visible
function oneFaceVisible(lastRect, currentRect) {
    if ( Math.abs(lastRect.x - currentRect.x) > 100 || Math.abs(lastRect.y - currentRect.y) > 100) {
        return false;
    }
    return true;
}

var goButton = document.querySelector('button#go');
var recordButton = document.querySelector('button#record');
var playButton = document.querySelector('button#play');
var analyzeButton = document.querySelector('button#analyze');
goButton.onclick = goButtonPressed;
recordButton.onclick = toggleRecording;
playButton.onclick = play;
analyzeButton.onclick = sendData;


function goButtonPressed() {
  $('div#checklist').hide();
  $('canvas#canvas').css("background-color", "transparent");
  $('button#go').hide();
  $('button#record').css("visibility", "visible");
  $('button#play').css("visibility", "visible");
  $('button#analyze').css("visibility", "visible");
};


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

//recordedVideo.addEventListener('error', function(ev) {
//  console.error('MediaRecording.recordedMedia.error()');
//  alert('Your browser can not play\n\n' + recordedVideo.src
//    + '\n\n media clip. event: ' + JSON.stringify(ev));
//}, true);

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
    analyzeButton.disabled = false;
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
  analyzeButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
//  recordedVideo.controls = true;
}

//function play() {
//  var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
//  recordedVideo.src = window.URL.createObjectURL(superBuffer);
//}

function sendData() {

  var IP = '128.237.138.96';
  var port = 8888;
  var socket = io.connect('http://' + IP + ':' + port);

    socket.on('message', function (data) {

      $('#container').hide();
      $('#vid').load("partials/vid.html");

      console.log(data.csvData);
      plotBPMs(data.csvData);

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

  // You have to roll over the line itself it doesn't work
  // if you just move the cursor (not ideal sorry)
  chart.addListener("rollOverGraphItem", function(event) {
    setCurTime(Number(event.item.category));
  });

  // Function that set's the video to match the time
  // hovered over in graph
  function setCurTime(time) {
    var vid = document.getElementById("myVideo");
    vid.currentTime = time;
    console.log(vid.currentTime);
  }

};
