// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");     //require hbs for dynamic views

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);   //exporting a function, the result of that require we can execute and passing it as an arguement

// default value for title local
const projectName = "name-of-project";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");  //requiring a file inside a directory route 
app.use("/", index);        //mounts(errichten) the middleware function ; mount waht we have in 'index' to '/'
                                //in english: we are creating a file with all the routes for eg 'unicorns'
// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);   //

module.exports = app;
