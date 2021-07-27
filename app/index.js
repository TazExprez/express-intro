// Here we are creating the const varible express.  We are requiring the express library, this framework, in order to create the express const.  The express const is basically being assigned the express library.
const express = require('express');
// Here we are triggering express() and running it inside of the app const variable.
const app = express();
// Here we are assigning the port that we want our server to run on.
const port = 3000;

// Here req is the request and res is the response.  We are returning back a response from send, that is basically sending the "Hello World!".
app.get('/', (req, res) => {
//   res.send('Hello World!')
// If we change the above res.send() to this and save this file and refresh the page, we will still see the "Hello World!".  This is because when Node.js ran the index.js file, it had the code above in it.  For us to be able to have this updated code show up, we have to press Control+c to stop the server, then we have to run the node index.js command again.
res.send("<h1>Welcome to Express</h1>")
});

// Here the port is 3000.  When we hit that port 3000, the anonymous arrow f() below will be executed.  This f() will console.log into our terminal the template string below.
// This console.log will be displayed on our terminal as soon as the server is run.  This is going to let us know that the server is running.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// In these lines we pretty much have a very basic Node.js server.  This server is going to run once we run this index.js file.

// You can structure an Express application however you want.  Joe is showing us the way that he likes to structure it.  
// We are going to have the app folder, we are going to put in everything that has to do with the application.  In the app folder, we will put things like controllers, models, and any type of middleware that we may use.  
// We will also have a public folder.  In this public folder, this is where we are going to have all of our static files.  These static files can be things such as images, HTML files, CSS files, and JavaScript files.  
// The next folder we will create is the views folder.  In the views folder, we are going to have all of our views.  We are going to learn about views later on.  
// The next folder we are going to have is the assets folder.  In the assets folder, we will have things like the SASS files and ES6 files that we might need to compile to CSS and regular JavaScript, respectively.  We are going to have all of the files, or assets, that need to be compiled inside of the assets folder.  From the assets folder, we are going to compile the files and send them to the public folder.
// You may have a sass subfolder inside of the assets folder.  You may compile the sass files inside of the sass subfolder to css files and send them to the css subfolder inside of the public folder.  You may also have a js subfolder inside of the assets folder.  You may compile the ES6 files inside of the js subfolder to regular JavaScript files and send them to the js subfolder inside of the public folder.
// We may also have a database folder.
// You can even make the views folder into a subfolder and have it inside of the assets folder.  This will make our life easier.  Everything that needs to be compiled, or that needs to be sent to the public folder later on, or maybe made live, we can have inside of our assets folder.  This way we do not have that many folders out here.
// All of the modules that we download will be in the node_modules folder.