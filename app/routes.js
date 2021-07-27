// We are going to put our routes in here to organize our code better and make it more modular.

// Since we are going to need Express, we are going to require it.
// Here we are creating two variables.  One is called express and the other is called router.  We are triggering the express.Router() and running an instance of it inside of the router const variable.
// const express = require("express"),
//     router = express.Router();
// Joe finds this easier to read.
const express = require("express");
const router = express.Router();
const DB = require("../database/connection");

// We replaced every router with router.

// router.get("/", (req, res) => {
//     res.send("<h1>Welcome to Jane</h1>")
// });
// Before, we were just responding to a certain route with just send.  We were just sending some type of text back to the user, to the client.  But now, we want to actually render a view.
// Here we have the route, which is the root directory, /.  We have the callback f(), which is an arrow f().  In the arrow f(), we are going to return a response which renders the view of homepage.
router.get("/", (req, res) => {
    // My way.
    // res.render("homepage");
    // Joe's way.
    // Here we are going to put in the actual location of the homepage.pug file.  We are using the res.render() method because we want to render the view.  We are using ../ because we are inside of the route.js file, inside of the app folder.  We want to go to the root directory, which is the express-intro project folder.  Then we want to go inside of the assets folder.  Then we want to go inside of the views folder.  Then we want to say which file it is that we want to use, which is the homepage.pug file.  So we'll say ../assets/views/homepage.pug.
    return res.render("../assets/views/homepage.pug");
    // My other way.
    // res.render("../assets/views/homepage");
});

// // Here we created a route for the generic.pug file.
// // Now we want to get the post that we created from our database.
// // We created this route called generic, and this was just like a placeholder, for the generic page, which is supposed to be our post's page.  So we are going to change this /generic route to /post and the id of the post, so to /post/:id.  Remember that :id is a route parameter.  When we do this, when we try to go to /post/create, we will taken to the generic.pug file, instead of the create.pug file.  In order to avoid this, we will have to move this route underneath the /post/create route.
// // router.get("/generic", (req, res) => {
// router.get("/post/:id", (req, res) => {
//     return res.render("../assets/views/generic.pug");
// });

router.get("/post/create", (req, res) => {
    return res.render("../assets/views/post/create.pug");
});

// Here we are creating a route to where we can actually submit the blog post form's content to.  To save the content of the blog post to the server, we have to do a post request to the server.
// Express.js only gives us the bare minimum to create our applications, or our websites, so we are going to need other libraries to help us out with our applications.  
// In order for us to submit the blog post form, we are going to need something called a body parser.  Search Google for npm body-parser and check out the documentation.  What body-parser does is that it gets the information that we are submitting through the form.  Then it parses that data and turns it into an {} so that we can use that data in our application.
// When we submit the form, it will automatically hit the "/post/create" route with a POST request.  Because we did a POST request, the server will return res.json(post).  The server will return JSON.  The JSON is pretty much the data that we put in the form.  So this data, not the JSON, is what we have inside of the post variable that we created.  The req.body is just an {}, with the properties of title, description, and image_url which are coming from our form.
// Here we are doing a POST request to this URL, "localhost:3000/post/create".
router.post("/post/create", (req, res) => {
    // We are going to actually return this, just to see what this actually returns back.  Inside of req.body, there is an {} with the properties of title, description, and image_url.  This content is coming from our form.
    // Here we are getting the data from the body, which is what is being submitted in the form.
    const post = req.body;

    // Here we are going to return the res.json with the post const variable as the argument.  We are returning the JSON, which is pretty much the data that we have from the form.
    // return res.json(post);
    
    // We want to be able to save this data.  Right now, even though we are submitting the form, we are not really saving it anywhere.  For us to actually save this data, we have to use MySQL again.  We have to use another query to insert this data inside of our database.
    // Here we are actually going to save the data.
    // Here we are running a query, which will insert our data inside of the database.  When the query is ran, MySQL is either going to give us an error, or not.
    // The template string is where the MySQL part comes in.  What we are looking for is an insert into the table.  We are going to use INSERT INTO, then posts, which is the name of the table.  Then we are going to pass in the names of the columns into the ()s.  The columns are id, title, description, and image_url, but we do not have to pass in the id because it is assigned and incremented automatically.  Joe originally just put the title and the description in here.  We will put in the actual data, the VALUES, in the same order that we put in the columns.  We are going to be using placeholders in the ""s for the VALUES because the whole MySQL query is inside of a template string.  We are going to return back to the VALUES whatever data is coming in from the form.  So we will use post.title, post.description, and post.image_url as the VALUES, as these are what we are returning back from the form.
    // Joe had an error because he was missing the image_url.  I did not get an error for some reason.  Joe said he got an error because we set the image_url to not be null.  We are going to set this up to add an image to every single post.  Now we added an image_url section in the create.pug file.
    // DB.query(`INSERT INTO posts (title, description) VALUES ("${post.title}", "${post.description}")`, (error, result) => {  
    DB.query(`INSERT INTO posts (title, description, image_url) VALUES ("${post.title}", "${post.description}", "${post.image_url}")`, (error, result) => {  
        if (error) {
            // If there is an error, the "Error: " will show up on the console.
            console.log("Error: ");

            // Then the full error message from MySQL will also show up underneath in the console.  The error could be that there is something wrong with the syntax.  Another issue might be that our data cannot be inserted into the database for some reason.  Maybe we cannot connect to the database.
            console.log(error);

            // If there is an error, we are going to redirect the user back to the previous page, "localhost:3000/post/create".
            return res.redirect("/post/create");
        }
        else {
            // If there are no errors, then redirect the user back to the home page.  This is going to mean that everything worked.
            return res.redirect("/");
        }
    });
});

// Here we created a route for the generic.pug file.
// Now we want to get the post that we created from our database.
// We created this route called generic, and this is just like a placeholder, for the generic page, which is supposed to be our post's page.  So we are going to change this /generic route to /post and the id of the post, so to /post/:id.  Remember that :id is a route parameter.  When we do this, when we try to go to /post/create, we will be taken to the generic.pug file, instead of the create.pug file.  In order to avoid this, we will have to move this route underneath the /post/create route.  We have to do this because the :id, the route parameter, will catch everything after the route of post, including create.  create will be considered an id, even if it is not.  Whenever we are using route parameters, we want to make sure that we are moving these routes below routes that are more definitive, more declared, like /post/create.  Then once we get to /post/:id, we want everything that is after /post to get treated as an id.  If we create another route, such as /post/show, we will want to place it above the /post/:id route, or show will get treated as an id, which we do not want to happen.
// router.get("/generic", (req, res) => {
// When we are accessing a post, we are hitting this route.  Then from there, we are sending a query to the MySQL database, where we are finding the post with the a specific id.  After that, if there is an error, the client will be redirected back to the home page.  If there are no errors, the server will return back to the client a new page, which is using the template of show.pug.  To this template, we are passing in the data contained in the result[0] {}, which is the result that we got back from the query that we sent to the MySQL database.  Now, if all went well, the client is seeing the post.
router.get("/post/:id", (req, res) => {
    // return res.render("../assets/views/generic.pug");
    // We are now going to pull up our post from the database directly from here.  Once we have an id, so let's say we put in /post/1, we want to be able to say, ok now inside of our database, inside of our table of posts, search for the post that has the id of 1.  Then we are going to get that data back.  After that, we are going to display this data on our page.  To do this, we are going to need to do another query.  Instead of inserting, this time we want to select a certain post from a table.  We are going to type SELECT * FROM posts WHERE id = ${req.params.id}, which means select all columns from the table posts where the id is equal to the id route parameter.  Joe added LIMIT 1 to the query, but he still received an [] with an {} inside of it and a post inside of the {}, from the posts table, instead of just an {} with a post.  This is because LIMIT will limit the amount of rows to return.  There can also be an offset, which is an option that let's us omit certain rows.
    // DB.query(`SELECT * FROM posts WHERE id = ${req.params.id}`, (error, result) => {
    DB.query(`SELECT * FROM posts WHERE id = ${req.params.id} LIMIT 1`, (error, result) => {
    // DB.query(`SELECT * FROM posts LIMIT 1`, (error, result) => {
        if (error) {
            console.log("Error: ");
            
            console.log(error);
            
            // If there is an error, we want to redirect the user back to the home page.
            return res.redirect("/");
        }
        else {
            // If there is no error, we want to console.log("Results: ") and console.log() the result, just to see what is in there.
            console.log("Result: ");
            // console.log(result);
            // Joe had to do this in order to get back just an {} with the post, instead of an [] with an {} with the post inside of it.
            console.log(result[0]);
            
            // If there is no error, we want to send the user a response back with JSON.
            // return res.json
            
            // Here we are going to render the generic.pug file, which is the view.  We are also going to pass in an {}, which is the result[0].  This {} that we are now passing in to the view contains the data that we got from the MySQL database.  We are going to move the generic.pug file into the post folder and we are going to rename it to show.pug.
            return res.render("../assets/views/post/show.pug", result[0]);
        }
    });

    // The user will get sent to the generic.pug page if there are no errors.
    // We moved this up to the else statement.
    // return res.render("../assets/views/generic.pug");
});

// This route will allow us to edit a post.  This route will take us to the view of edit.
// In this route, we are using the :id, the id route parameter, in order to find the specific post that the user will be able to edit.  Once the MySQL server finds the post, which in our case is the post with an id of 1, if there are no errors inside of the MySQL server, the client will be sent to the edit page.  We are also sending in the data that we received from the MySQL server into the edit page that is going to be rendered for the client.
router.get("/post/:id/edit", (req, res) => {
    DB.query(`SELECT * FROM posts WHERE id = ${req.params.id} LIMIT 1`, (error, result) => {
        if (error) {
            console.log("Error: ");
            
            console.log(error);
            
            return res.redirect("/");
        }
        else {
            console.log("Result: ");

            console.log(result[0]);
            
            // Here we are sending the client to the view of edit.pug with the data received from the MySQL server inside of it.
            return res.render("../assets/views/post/edit.pug", result[0]);
            // We can also put the data inside of the result[0] {} inside of an {} and put in everything manually.
            // return res.render("../assets/views/post/edit.pug", {
            //     id: req.params.id,
            //     title: result[0].title,
            //     description: result[0].description,
            //     image_url: result[0].image_url,
            // });
        }
    });
});

// This is the route to submit the form once it is edited by the client.  When this POST request is received, the server is going to get updated.  
// The client is going to post to the /post/:id/edit route.  When the client posts to that route, the database is going to be updated.
// In order to update the database, we have to update the MySQL query to something else.  We are going to type UPDATE, then the name of the table, which is posts in our case.  The we are going to type SET and then the column names.  post.title, post.image_url, and post.description represent the data that we are getting from the client when the client submits the form on the edit page.  
// We are getting this data from the body of the page.  The post that will get edited is the one WHERE id = ${req.params.id}, according to the MySQL query.  We are looking for the row with the MySQL query.
router.post("/post/:id/edit", (req, res) => {
    const post = req.body;

    DB.query(`UPDATE posts SET title = "${post.title}", image_url = "${post.image_url}", description = "${post.description}" WHERE id = ${req.params.id}`, (error, result) => { 
        if (error) {
            console.log("Error: ");

            console.log(error);

            return res.redirect("/post/create");
        }
        else {
            // return res.redirect("/");
            // If everything is fine, the client will be redirected to the post's edit page.
            // return res.redirect(`/post/${id}/edit`);
            // We had to set the ${id} to the ${req.params.id} because we were getting an error saying that the id is not defined.  We were saying to redirect the client to this page with a certain ${id}, but the id variable does not exist.  We have to use req.params.id, which does exist.
            // return res.redirect(`/post/${req.params.id}/edit`);
            // Here we are sending the client to the updated post, instead of the edit page, if everything goes well and there are no errors.
            return res.redirect(`/post/${req.params.id}`);
        }
    });
});

// This route will allow us to delete a post.
// We are going to have to do another MySQL query in order to be able to delete a post.
// When we go to the /post/:id/delete route, the post that we are on will be deleted.
// If there is an error, we want the client to be taken back to the edit page of the post.  We have to use req.params.id, instead of id, because this is what we are getting back as a route parameter.  If we just use id, we will get an error of the id not existing.
// If there are no errors, we will send the client back to the root directory, /, the home page, after the post is deleted.
// To delete a post in the MySQL database, we will type DELETE FROM posts WHERE id = ${req.params.id}.  posts is the table.  If the id of a row matches the req.params.id, then that row will be deleted from the MySQL database.
// We had to change this to a GET request because we were getting an error when we used a POST request.  The error was "Cannot GET /post/3/delete".  POST requests are for when we are submitting a form or sending data through AJAX.  If you are just going to a url, then you use a GET request.  We are just going to a url when we are deleting a post, so we are just going to use a GET request.
// router.post("/post/:id/delete", (req, res) => {
router.get("/post/:id/delete", (req, res) => {
    const post = req.body;

    DB.query(`DELETE FROM posts WHERE id = ${req.params.id}`, (error, result) => {
        if (error) {
            console.log("Error: ");
            console.log(error);
            return res.redirect(`/post/${req.params.id}/edit`);
        }
        else {
            return res.redirect("/");
        }
    });
});

// We can pass down variables to our view so that we can display these on the page that gets rendered.
// This route is going to render another file in the views folder named testing.pug.
// We can pass down variables to our view so that we can render all this to a page by passing down an {} in the res.render() method.  Inside of this {}, we can put in whichever variables that we want.  In this {} below, we put in username:"codingphase", fname:"Joe", and lname:"Santos".  Now we can use these three properties in our view.  This is great because now we can put logic into our view.  This is something we couldn't have done with regular HTML.
//- You can now put in logic with the view.  Depending on what you are sending back in the {} in the res.render(), you can change things around with the view.  You can do things like conditionals and iterations.
router.get("/pug", (req, res) => {
    res.render("../assets/views/testing.pug", {
        username: "codingphase",
        fname: "Joe",
        lname: "Santos",
        // We just added this for the pug conditional example.
        loggedIn: true,
        // loggedIn: false,
        // We just added this for the iteration example.
        friends: ["Jane", "Johnny", "Billy", "Cindy"],
    });
});

// We no longer need these routes and are just keeping the route with the root directory, the homepage.
// router.get("/about", function(req, res){
//     console.log("Got to about page.");
//     return res.send("<h1>About Page</h1>");
// });

// router.get("/about.html", function(req, res) {
//     return res.send("<h1>About HTML</h1>");
// });

// router.get("/user/:username/:state", function(req, res) {
//     console.log(req.params);
//     const user = req.params;
//     const query = req.query;
//     return res.send(`
//       <h1>User: ${user.username}</h1>
//       <h1>State: ${user.state}</h1>
//       <h1>Low: ${query.low}</h1>
//       <h1>High: ${query.high}</h1>
//       <h1>Car: ${req.query.car}</h1>
//     `);
// });

// We are going to export all of this because we want to make it modular.
module.exports = router;