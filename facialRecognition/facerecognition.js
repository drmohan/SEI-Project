
// get media from browser (video) with getUserMedia()
navigator.mediaDevices = navigator.mediaDevices || ((navigator.mozGetUserMedia || navigator.webkitGetUserMedia) ? {
   getUserMedia: function(c) {
     return new Promise(function(y, n) {
       (navigator.mozGetUserMedia ||
        navigator.webkitGetUserMedia).call(navigator, c, y, n);
     });
   }
} : null);
if (!navigator.mediaDevices) {
  throw new Error("getUserMedia() not supported.");
}

// access HTML elements
var video = document.querySelector('video');
var constraints = {
  audio: false,
  video: true
};
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

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

// camera display function
function startCamera() {
  return navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    video.src = URL.createObjectURL(stream);
    video.play();
    faceDetectionTimer = setInterval(function() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      var faces = ccv.detect_objects({
        canvas: ccv.pre(canvas), 
        cascade: cascade, 
        interval: 2, 
        min_neighbors: 1
      });
      faces.forEach(function(face) {
        // draw rectangle around face
        context.beginPath();
        context.rect(face.x, face.y, face.width, face.height);
        context.lineWidth = 1;
        context.strokeStyle = 'red';
        context.stroke();
        // write inches to screen in code element
        var percentage = 100 * face.height / canvas.height;
        percentages.push(percentage);
        document.querySelector('code').textContent = percentageToInches(rollingAverage(5)).toFixed(0) + '"';
       });
    }, 300); // or 300

    return stream; 
  })
  .catch(function(error) {
    console.error(error);
  });
}
var streamOn = null;
document.querySelector('button').onclick = function() {
  var button = this;
  if (streamOn !== null) {
    streamOn.stop();
    URL.revokeObjectURL(video.src);  
    button.textContent = 'Start camera';
  } else {
    button.textContent = 'Starting camera';
    startCamera().then(function(stream) {
      streamOn = stream;
      button.textContent = 'Stop camera';
    });
  }
}