'use strict';

/* globals MediaRecorder */

var mediaSource = new MediaSource();
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
var canvas = document.getElementById('check-canvas');
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


var track1 = tracking.track('video#live', tracker, { camera: true });

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

var recordButton = document.querySelector('button#go');
recordButton.onclick = goButtonPressed;


function goButtonPressed() {
  track1.stop();
  $('#checklist-container').hide();
    $('#demo-container').show();

    
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


function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

