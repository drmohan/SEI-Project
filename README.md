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

