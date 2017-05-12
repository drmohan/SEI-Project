'use strict';

/* globals MediaRecorder */
var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

var bpms = [],
    data = {},
    ranges = [],
    ranges2 = [],
    ranges3 = [],
    lowerLimit = 73,
    upperLimit = 84;

var vid;

var liveVideo = document.querySelector('video#live');
liveVideo.width = screen.width*(3/5);
liveVideo.height = screen.height*(3/5);
var checklistDiv = document.getElementById('checklist');
checklistDiv.width = screen.width*(3/5);
checklistDiv.height = screen.height*(3/5);

// get canvas for facial tracking
var canvas = document.getElementById('canvas');
canvas.width = liveVideo.width*(.838);
canvas.height = liveVideo.height;
var context = canvas.getContext('2d');

// get box for face tracking
var tracker = new tracking.ObjectTracker('face');
tracker.setInitialScale(5.7);
tracker.setStepSize(1);
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
var rectColor = '#fff';

tracker.on('track', function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Check: there is a face in the screen
    var imageCheckboxUser = document.querySelector("img#user-check");
    var imageCheckboxFace = document.querySelector("img#face-check");
    var imageCheckboxDist = document.querySelector("img#distance-check");
    if (event.data.length > 0) {
        imageCheckboxUser.src = "assets/img/check-mark.png"
        goButton.disabled = false;
    } else {
        imageCheckboxUser.src = "assets/img/x-mark.png"
        // if the user isn't detected in the image, then no faces and no distance
        imageCheckboxFace.src = "assets/img/x-mark.png";
        imageCheckboxDist.src = "assets/img/x-mark.png";
        goButton.disabled = true;

    }
    event.data.forEach(function(rect) {
      context.strokeStyle = rectColor;
      context.lineWidth = 5
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);

    // Check: only one face
    if (lastRect != undefined) {
        var oneFace = oneFaceVisible(lastRect, rect);
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
    var distanceThreshold = 20;
    if (inchesFromScreen <= distanceThreshold){
        imageCheckboxDist.src = "assets/img/check-mark.png";
    } else {
        imageCheckboxDist.src = "assets/img/x-mark.png";
    }

    // Check: brightness
    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = liveVideo.width;
    tempCanvas.height = liveVideo.height;
    var tempContext = tempCanvas.getContext('2d');
    var brightness = getBrightness(tempCanvas.width, tempCanvas.height, tempContext, liveVideo, rect);

    var imageCheckboxLight = document.querySelector("img#light-check");
    var brightnessThreshold = 75;
    if (brightness >= brightnessThreshold) {
        imageCheckboxLight.src = "assets/img/check-mark.png";
    } else {
        imageCheckboxLight.src = "assets/img/x-mark.png";
    }

    // determine color of rectangle based on thresholds
    var totalChecks = 0;
    if (brightness >= brightnessThreshold) {
        ++totalChecks;
    }
    if (inchesFromScreen <= distanceThreshold) {
        ++totalChecks;
    }
    if (oneFace == true){
        ++totalChecks;
    }
    if (event.data.length > 0) {
        ++totalChecks;
    }

    if (totalChecks <= 1) {
        // red frame
        rectColor = '#F21340';
        goButton.disabled = true;
    } else if (totalChecks < 4) {
        // yellow frame
        rectColor = '#FFE739';
        goButton.disabled = false;
    } else {
        // green frame
        rectColor = '#4CC568';
        goButton.disabled = false;
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
//var playButton = document.querySelector('button#play');
var analyzeButton = document.querySelector('button#analyze');
var videoTimeText = document.querySelector('div#video-time');
var videoStartTime;
var recording = false;
var timeTextInterval;
var infoButton = document.querySelector('a#info');


goButton.onclick = goButtonPressed;
recordButton.onclick = toggleRecording;
//playButton.onclick = play;
analyzeButton.onclick = sendData;


function goButtonPressed() {
  $('div#checklist').hide();
  $('canvas#canvas').css("background-color", "transparent");
  $('button#go').hide();
  $('a#info').hide();
  $('button#record').css("visibility", "visible");
  $('button#play').css("visibility", "visible");
  $('button#analyze').css("visibility", "visible");
  $('button#back').css("visibility", "visible");
  $('button#play').css("visibility", "visible");
  $('button#analyze').css("visibility", "visible");
  $('div#video-time').css("visibility", "visible");
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
  audio: false,
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
    startTimer();
    recordButton.disabled = true;
    setTimeout( function() { recordButton.disabled = false; }, 10000);
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';


    var iconElem = document.createElement("I");
    iconElem.className = "record icon"
    recordButton.appendChild(iconElem)

    // playButton.disabled = false;

    analyzeButton.disabled = false;
  }
}

function formatTime(time) {
    var timeInSeconds = Math.floor(time/1000);
    var seconds = timeInSeconds%60;
    var minutes = Math.floor(timeInSeconds/60);

    var timeText = "";
    timeText += (minutes.toString() + ":");
    if (seconds < 10) {
        timeText += "0";
    }
    timeText += seconds.toString();
    return timeText;
}

function getTimeSinceStart() {
    var currVidTime = new Date();
    var timeDiff = currVidTime - videoStartTime;
    return timeDiff;
}

function startTimer() {
    // get time that start recording button was clicked
    videoStartTime = new Date();

    if (recording == true) {
        // Start the timer
        timeTextInterval = setInterval( function() {
        videoTimeText.textContent = formatTime(getTimeSinceStart());}, 1000);
    }
}


function startRecording() {
  recording = true;
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

  var iconElem = document.createElement("I");
  iconElem.className = "stop icon"
  recordButton.appendChild(iconElem)

  // playButton.disabled = true;

  analyzeButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}

function stopRecording() {
  recording = false;
  clearInterval(timeTextInterval);
  mediaRecorder.stop();
  console.log('Recorded Blobs: ', recordedBlobs);
//  recordedVideo.controls = true;

}

//function play() {
//  var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
//  recordedVideo.src = window.URL.createObjectURL(superBuffer);
//}

function showForm(){
  // debugger;
  $('.ui.modal').modal('show');      //things to do on click
};
//click out of modal
var cancelButton = document.getElementById('cancel-process');
cancelButton.onclick = function(event) {
    console.log("cancel clicked");
    $('.ui.modal').modal('hide');
}


function sendData() {

  var x = showForm()

  var IP = '128.237.184.207';
  var port = 8888;
  var socket = io.connect('http://' + IP + ':' + port);

    socket.on('message', function (data) {
      console.log("BPMS HAVE BEEN RECEIVED");
      $('#loading-icon').css("display", "none");
      $('#view-the-results').css("display", "");

      localStorage.csvData = data.csvData;

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
  // window.location.href = "loading.html"
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}

  console.log("data");
  console.log(data);
