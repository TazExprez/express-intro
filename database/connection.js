// Here we will connect our application to the MySQL database.

// Here we are requiring the mysql library.
const mysql = require("mysql");

// Here we are creating a connection to the MySQL database, but we are not connected yet.  We pass in an {} with the host, user, and other properties to this.
const DB = mysql.createConnection({
    // This is the host for the MySQL server.
    host: "remotemysql.com",
    // This is the username.
    user: "t1rgXjYhLx",
    // This is the password.
    password: "UoNLVp2BiH",
    // This is the name of the database.
    database: "t1rgXjYhLx",
    multipleStatements: true,
});
// I had to create this connection because the one above was not working.
// const DB = mysql.createConnection({
//     // This is the host for the MySQL server.
//     host: "sql5.freemysqlhosting.net",
//     // This is the username.
//     user: "sql5425009",
//     // This is the password.
//     password: "4nfTVIMn86",
//     // This is the name of the database.
//     database: "sql5425009",
//     multipleStatements: true,
// });

// Here we are connecting to the MySQL database.
DB.connect(error => {
    // If there is no error, we will be connected to the database.
    // Here we are checking for a connection to the database.  We already know that there is a connection.
    if(!error) {
        console.log("Connected To Database");
        // Running migration of tables.
        // Once we are connected to the database, we want to check if the table of posts exists.
        // We are going to run a query, which is basically a connection to the database and asking it "Hey does this database table exist or not?"  If it doesn't exist create the table.  That's what we are going to do right now.
        // We are going to write DB, which is connecting to the database.  Then we are passing a query inside of a "" by writing query("SELECT 1 FROM posts LIMIT 1").  The name of the table is posts.  We set LIMIT to 1 so that we only get one table.  The callback f() will give us an error or the results.
        // This migration is going to be run every time nodemon runs the server when we save.  The posts table will be created if it does not exist yet.  If the database exists, it will remain intact when we run this migration.
        DB.query("SELECT 1 FROM posts LIMIT 1", (error, results) => {
            // If there is an error and the table of posts cannot be found, that means that the table has not been created, so we're going to create the table.
            if (error) {
                // This will be displayed if the posts table does not exist and the posts table will be created.
                console.log("Creating table posts.");
                
                // Here is where we are actually creating the posts table.  We are going to do this with another query to the database.  The posts table will have an id, a title, a description, and an image URL.
                DB.query(
                    `CREATE TABLE posts(id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(60) NOT NULL, description MEDIUMTEXT NOT NULL, image_url MEDIUMTEXT NOT NULL)`,
                    // This callback f() will either give us an error or the results.
                    (error, results) => {
                        // This will be executed if we have an error creating the table.
                        if (error) {
                            console.log("ERROR WITH CREATING TABLE");
                            
                            // Here we are going to console.log() the actual error.
                            console.log(error);
                        }
                        // This will happen if there is no error while trying to create the table.
                        else {
                            console.log("CREATED TABLE");
                        }
                    }
                );
            }
            // This will happen if the table already exists.
            else {
                console.log("Table posts already exists.")
            }
        });
    }
    // If there is an error, we will not be connected to the database.
    else {
        console.log("No Connection");
    }
});

// Here we are exporting the whole file.
module.exports = DB;

// We were able to connect to our database with MySQL Workbench and also with our server and everything is working good.  The next thing that we need to do is create a table.  Whenever we have some type of data, we want to put it in the same place and align it in the same place.  For example, if we want to put information about users, like their user name, their password, their first and last names, we want to put this in a table called users.  This is what we are going to do right now.  Currently for our blog to work, all we need is a table called posts.  This posts table is going to have all of the posts that we are going to have for our blog.  This posts table is also going to have multiple columns.  Think of this as a Google Sheets or Microsoft Excel spreadsheet, where we have all of this data in each column and everything is separated by columns and rows.  For example, one post will be one whole row, and that post will have different columns.  For example, that post is going to have an id, it's going to have a title of the post, it's going to have a description, which is where the article is going to be written, and it's finally going to have an image URL, maybe like a feature image, an image that describes what the post is about.  This is how we are going to be able to have our post show up on our page.