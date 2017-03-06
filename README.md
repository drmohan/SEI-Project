# SEI-Project
Code development for project with SEI team, creating a website for their research

### Repo Guidelines

- Switch into 'dev' branch when adding a new project folder
- When adding new functionality to project, be sure to include documentation below and/or add the new project below (this includes adding links and setup code)
- Projects listed below should be in alphabetical order to easily sort through

### Project Folders

- **[facialRecognition:](facialRecognition)** a project in html, css, and javascript that plays a live webcam video, detects the user's face, and the user distance to the screen **Note:** As of recent, there seems to be a lag in the program. Investigate the possibility of using 'tracking.js' for this instead

  1. Navigate to project directory
  2. Start up project:
    * If using Chrome: In the terminal, type `python -m http.server` to start up a python server, navigate to `localhost:8000/facerecognition.html`
    * If using Firefox (or other browser): launch `facerecognition.html` in browser
  3. Once you access this page, you will be able to stop and start a video from your webcam, a red box should appear around your face, and below this video canvas there will be information on how many inches your face is from the screen
  4. *Tools Used*:
    * CCV Library (ccv.js)
    * CCV's Face Dataset (face.js)

- **[videoRecordDownload:](videoRecordDownload)** a project in html, css, and javascript that allows the user to record a video, play back that video, and download that video

  1. Navigate to project directory
  2. In the terminal, type `python -m http.server` to start up a python server
    * This project must be run from a localhost in order to get around browser security; because you are capturing user video usually only https links are trusted for this, but because the project isn't deployed you can run it locally to circumvent this block
    * If you do not have python or wish to use another local server, such as a locally hosted apache server for Mac users, that would work as well
  3. In your preferred browser, navigate to `localhost:8000/videoRecord.html`
  4. Once you access this page, you will be able to stop and start a recording from your webcam, play back that recording, and download it to your desktop
  5. *Tools Used*:
    * MediaStream Recording API

- **[webSocket:](webSocket)** a project in html and javascript that demonstrates basic data transfer between client and server through websockets

  1. Navigate to project directory
  2. In the terminal, type `npm install socket.io` to install socket.io
  3. Ensure that the IP address in index.html corresponds to your local IP address
  4. In the terminal, type 'node ss.js' to start the server
  5. In your preferred browser, navigate to `<yourIP>:<port>`
  5. *Tools Used*:
    * Node.js
    * socket.io

- **[webSocket and videoRecordDownload:](webSocket) (videoRecordDownload)** a project that combines the features of videoRecordDownload and webSocket. This project has the ability to record a video and transfer the video between the client and server through websockets.

  1. Navigate to the videoRecordDownload directory and open up the main.js file
     in a text editor of your choice. 
  2. In the download function, ensure the IP address corresponds to your local address.
  3. Follow steps 1 through 3 in the videoRecordDownload project section until you can 
     see page where you will be able to start and stop recording. 
  4. In a new terminal window, navigate to the websocket directory.
  5. In the new terminal window, type 'npm install socket.io' to install socket.io
  6. After socket.io is installed, start the server by typing 'node ss.js'
  7. Go back to the web page, record a video and play it back. Once you hit download, the video  will successfully be sent over. The video file will be found in the receivedFiles folder in the webSocket directory. 

  ** The data transfer is done via websockets while the video recording server is run 
  via a python server.**