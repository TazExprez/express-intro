// We are using this file, instead of the index.js one, to make our lives easier by knowing that we are working with the server when we are working on this file.  
// We also altered the package.json file.  We changed the "main" from "index.js" to "app/server.js" because "app/server.js" is the new entry point.  We added another script to the "scripts" section.  We added "start": "node app/server.js" so that we can just type npm run start in order to run our server, instead of node app/server.js.

// We are going to install nodemon in order to not have to manually restart the node server every time we make a change.  We added the script "dev": "npx nodemon" to the package.json file in order to run nodemon.  nodemon watches many different types of files in all of the folders and automatically restarts the server when it detects a change.

const express = require("express");
const app = express();
// Here we are adding the variable for the MySQL database connection.  This is going to connect us to our MySQL database.
const DB = require("../database/connection");
const bodyParser = require("body-parser");
const port = 3000;

// Since we are requiring a file, instead of a library, we are going to use require("./routes");, instead of require("express").
// My way.
// const routes = require("./routes");
// Joe's way.
const routes = require("./routes.js");

// Here we are telling Express.js that we are going to be using the body-parser library to parse the data that is coming in via a submit form.
// Using bodyParser for post request data.
app.use(bodyParser.urlencoded({extended: true}));

// Here we are setting up the routes.  Before doing this, we get an error when we try to connect to the server.
// Routes.
app.use("/", routes);

// app.get("/", (req, res) => {
//     res.send("<h1>Welcome to Jane</h1>")
// });
// Previous JavaScript without ES6.
// Here we are setting up a GET request.
// Whenever we go to a website, like google.com, we are doing a GET request.  We are getting information from the server.  The server is returning back the page we see at a site like google.com.
// If we submit a form with some input, like Jay Z in the google.com search bar, and we search that, we are doing a POST request.  A POST request is basically us sending data to the server and then the server responding back to us with something.
// A GET request is when we go to a page, or when we want an image from a server or from a URL, that's a GET request.  When we submit a form, we are sending data to a server, that's a POST request.  Later on we will talk about PUT, PATCH, and DELETE requests.
// This new route is going to be called about for an about page.  Remember to put in the / before about, so put in /about.  When you go to localhost:3000/about is when the code inside of the callback f() will be run.  The callback f() takes in two parameters, a request and a response.  Inside of the callback f(), we have to return something, meaning that when we go to the about route, we want to be able to return something back to the user that is visiting that route, or that page.  Right now, we are just going to set up a console.log().  When we get to the about page, we will see the console.log() message in the terminal in VS Code, not the one in the browser.  The browser will remain in spinning mode because there is a /about route, but the browser is waiting on a response back from the server to the browser.  There is a route for /about, but we are not getting anything back.  Google Chrome is spinning and saying wait, there is nothing being returned back to us.  If we look at our VS Code terminal, we will notice that we actually did trigger this inside of our server.
// If we try to get to localhost:3000/contact, we will get an error right away saying Cannot GET /contact and this will happen because we don't have that route.
// app.get("/about", function(req, res){
//   console.log("Got to about page.");
// });
// Now we are returning something back to the client.
// We can use request and response, instead of req and res, if we'd like.  Just know that Express.js is automatically taking the first argument as the request and the second argument as the response.  We can name the request and response whatever we want.
// For us to send something back to the browser, we have to use the send() method.
// We have to return something, like res.send(), according to Joe.  I used res.send() without returning it and it still worked.
// app.get("/about", function(req, res){
//   console.log("Got to about page.");
//   return res.send("<h1>About Page</h1>");
// });

// The different route methods.  The GET method is for when we get to the page.  The POST method is for when we are sending something to the server through a form or through AJAX.  The same way that we are currently using the app.get(), we can also use the app.post().

// The route paths that we have been using have been the root directory, /, and the /about directory.
// We have not been using a file name, like about.txt, for a route path, but we can use that.  We can use different extensions, if we want to.
// app.get("/about.txt", function(req, res) {
//   return res.send("<h1>About Document</h1>");
// });
// Here we are using the html extension, instead of txt.
// app.get("/about.html", function(req, res) {
//   return res.send("<h1>About HTML</h1>");
// });

// app.get('/ab?cd', (req, res) => {
//   res.send('ab?cd');
// });

// app.get(/a/, (req, res) => {
//   res.send('/a/');
// });

// app.get('/example/b', (req, res, next) => {
//     console.log('The response will be sent by the next function.s');
//     next();
//   },
//   (req, res) => {
//     res.send('Hello from B!')
//   }
// );

// Route parameters allow us to get information from the URL and use it on our back end code.
// /user is the URL.  The user name comes after /user, :username.  After this, we are going to put the state, :state.  By setting the path as /user/:username/:state, we can get the user name and the state directly from the client's request.  We can console.log() the route parameters by using the req.params {}, which is where they will be stored.  Whatever is directly after the /user/ will be the first route parameter, which is called username.  The second route parameter, directly after the first, will be called state.  We are getting back both route parameters inside of an {}.
// Route parameters are basically variables that we can use inside of our code.
// app.get("/user/:username/:state", function(req, res) {
//   console.log(req.params);
//   const user = req.params;
//   return res.send(`
//     <h1>User: ${user.username}</h1>
//     <h1>State: ${user.state}</h1>
//   `);
// });

// Just like there are route parameters, there are also query parameters.  With query parameters, you'll see a question mark, ?, followed by the variable name and a value, like ?low=65.  Then you'll see an ampersand, &, like ?low=65&, followed by another variable and value, like ?low=65&high=90.  The & is a parameter separator.  We can use query parameters as variables within our code.
// We can access the query parameters with a const variable, like query.high.  We can also access them directly, like req.query.car.
// The route parameters are inside of the URL.  The query parameters come after the ? in the URL.
// app.get("/user/:username/:state", function(req, res) {
//   console.log(req.params);
//   const user = req.params;
//   const query = req.query;
//   return res.send(`
//     <h1>User: ${user.username}</h1>
//     <h1>State: ${user.state}</h1>
//     <h1>Low: ${query.low}</h1>
//     <h1>High: ${query.high}</h1>
//     <h1>Car: ${req.query.car}</h1>
//   `);
// });  

// app.route('/book')
//   .get((req, res) => {
//     res.send('Get a random book');
//   })
//   .post((req, res) => {
//     res.send('Add a book');
//   })
//   .put((req, res) => {
//     res.send('Update the book');
//   });

// Static files folder.
app.use(express.static("public"));

// Template engine.
app.set("view engine", "pug");

// This is needed if we do the res.render() method my way, res.render("homepage");, instead of Joe's way, res.render("../assets/views/homepage.pug");.  I needed to do this because Joe did not create the views folder in the root directory, which is where Express.js expects it by default.
// app.set("views", "./assets/views")

// Listening on port 3000.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

// Now Joe wants to set up a file called routes.  Right now we have all of our routes in here, the server.js file.  It can get really messy if we have all of our routes inside of the server.js file.  Imagine if we had 200 pages, and on top of that, we wanted to add other stuff to our server.  Then this file alone would be about 500 lines, or even 1,000 lines.  You don't want your server.js file to be like that.  You want to organize it.  You want everything to be modular.