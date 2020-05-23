const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
const bodyParser = require("body-parser");

const exphbs = require("express-handlebars");
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true,
    loggedIn: false
  }));


app.use(async (req, res, next) => {
  currentTime = new Date().toUTCString(); 
  authStatus = false;
  if(req.session.loggedIn){
    authStatus = true;
  }
  console.log(`Timestamp: ${currentTime} Method: ${req.method} Route: ${req.originalUrl} Authentication Status:  ${authStatus}`);
  next();
});


app.get('/private', function (req, res, next) {
    if(req.session.loggedIn){
      next();
    } else {
      res.render('error', {title: 'You are not logged in.'});
    }
});

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});