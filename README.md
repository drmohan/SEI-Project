#Heart Rate Analytics Project
Code development for project with a government funded research client, creating a website to make their technology accessible

### Repo Guidelines

- Switch into 'dev' branch when adding a new project folder
- When adding new functionality to project, be sure to include documentation below and/or add the new project below (this includes adding links and setup code)
- Projects listed below should be in alphabetical order to easily sort through

### Project Folders

- **[main:](main)** The fully functioning interactive web application is located in this folder.

    **Prior to running, IP addresses should be changed in the following places to match that of the user's:**
    * [demo.html](https://github.com/KatAnne/SEI-Project/blob/master/main/demo.html#L23)
    * [video.js](https://github.com/KatAnne/SEI-Project/blob/master/main/assets/js/video.js#L421)
    * [contact.php](https://github.com/KatAnne/SEI-Project/blob/master/main/contact.php#L4)

    1. Navigate to project directory
    2. A server that supports byte serving must be used in order for the video on the data visualization page to load successfully.
    To install this server: `npm install http-server`
    To run the this server: `http-server -p 8000`
      * This project must be run from a localhost in order to get around browser security; usually only https links are trusted for capturing user video, but because the project isn't deployed you can run it locally to circumvent this block
      * If you do not have python or wish to use another local server, such as a locally hosted apache server for Mac users, that would work as well
    3. The user's video is currently being written and read locally for use in the results page (data-viz.html). To access the downloaded video, a symbolic link named 'Down' must be created within the project folder to the Downloads folder. This can be done with `ln -s ~/Downloads Down`
    4. In a new terminal window, navigate to the [websocket](webSocket) directory.
    5. In the new terminal window, a websocket server needs to be set up.
    To install this server: `npm install socket.io`
    To run this server: `node ss.js`
    6. Navigate to `localhost:8000` (unless a different port was specified) to access the web page, record a video, play it back, and view resulting mock data.
    7. *Tools Used*:

      * MediaStream Recording API
      * Node.js
      * Socket IO
      * Semantic UI
      * Highcharts




- **[webSocket:](webSocket)** a project in html and javascript that demonstrates basic data transfer between client and server through websockets

  **Prior to running, IP addresses should be changed in the following places to match that of the user's:**
  * [index.html](https://github.com/KatAnne/SEI-Project/blob/master/main/demo.html#L39)

  1. Navigate to project directory
  2. In the terminal, type `npm install socket.io` to install socket.io
  3. Ensure that the IP address in index.html corresponds to your local IP address
  4. In the terminal, type 'node ss.js' to start the server
  5. In your preferred browser, navigate to `<yourIP>:<port>`
  5. *Tools Used*:
    * Node.js
    * Socket IO
