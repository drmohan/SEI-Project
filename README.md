# SEI-Project
Code development for project with SEI team, creating a website for their research

### Repo Guidelines

- Switch into 'dev' branch when adding a new project folder
- When adding new functionality to project, be sure to include documentation below and/or add the new project below (this includes adding links and setup code)
- Projects listed below should be in alphabetical order to easily sort through

### Project Folders

- **[videoRecordDownload:](videoRecordDownload)** a project in html, css, and javascript that allows the user to record a video, play back that video, and download that video 

  1. Navigate to project directory
  2. In the terminal, type `python -m http.server` to start up a python server
    1. This project must be run from a localhost in order to get around browser security; because you are capturing user video usually only https links are trusted for this, but because the project isn't deployed you can run it locally to circumvent this block
    2. If you do not have python or wish to use another local server, such as a locally hosted apache server for Mac users, that would work as well
  3. In your preferred browser, navigate to `localhost:8000/videoRecord.html`
  4. Once you access this page, you will be able to stop and start a recording from your webcam, play back that recording, and download it to your desktop
  5. *Tools Used*:
    1. MediaStream Recording API

