const express = require('express');
const session = require('express-session');

const passport = require('./config/passport.js');

<<<<<<< HEAD
const PORT = process.env.PORT || 8080;
const db = require('./models');

const app = express();
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'the family whiteboard',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
// TODO get these routes working so that we can start really using the app!
// require('./routes/api-routes')(app);
// require('./routes/html-routes')(app);


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Listening on port', PORT);
  });
=======
const app = require('express');

const exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;

var apps = express();

// Serve static content for the apps from the "public" directory in the application directory.
// This is a level of abstraction to hide credentials from user
apps.use(express.static('public'));

// Parse application body as JSON
apps.use(express.urlencoded({
  extended: false
}));
apps.use(express.json());

// the main page is always displayed

apps.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
apps.set("view engine", "handlebars");

// Import routes and give the server access to them.
// Norm is to call it "var = routes"
var routes = require("./controllers.js");

// Use express routes defined
apps.use("/", routes);

// Start our server so that it can begin listening to client requests.
apps.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
>>>>>>> ac94b36be12aa33bda85a1a111333437ab9ba595
});