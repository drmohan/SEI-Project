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

var video = document.querySelector('video');
var constraints = {
  audio: false,
  video: true
};
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
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
        context.beginPath();
        context.rect(face.x, face.y, face.width, face.height);
        context.lineWidth = 1;
        context.strokeStyle = 'red';
        context.stroke();
       });
    }, 100);

    return stream;  // so chained promises can benefit
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
    URL.revokeObjectURL(video.src);  // cleanin up
    button.textContent = 'Start camera';
  } else {
    button.textContent = 'Starting camera';
    startCamera().then(function(stream) {
      streamOn = stream;
      button.textContent = 'Stop camera';
    });
  }
}