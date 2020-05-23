const express = require("express");
const bodyParser = require("body-parser");
const exphbs=require("express-handlebars");
const session = require('express-session');
const cookieParser=require("cookie-parser");
const configRoutes=require("./routes");
const app = express();


app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true,
  loggedIn: false
}));

app.use(bodyParser.json());


app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:true}));

app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
configRoutes(app);

app.listen(3000, () => 
{
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
  if (process && process.send) process.send({done: true});
});