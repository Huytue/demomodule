require('dotenv').config()
const express = require("express"); //ket noi express
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); ("body-parser");
const app = express();
const flash = require('connect-flash');
const session = require('express-session');

const routeStudent = require('./routes/student');
const routeClasses = require('./routes/classes');
const routeAdmin = require('./routes/admin');
const routeHome = require('./routes/home');
const routeAuth = require('./routes/auth');


// const { login, refresh } = require('./routes/auth')
app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
  secret: 'learningpassport',
  resave: true,
  saveUnitialized: true
}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", "./views");


//ket noi mongodb
const mongoose = require("mongoose");
const { render } = require("ejs");

mongoose.connect("mongodb://localhost/StudentManagement", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("mongo connection successfully");
});


app.use("/student", routeStudent);
app.use("/classes", routeClasses);
app.use("/admin", routeAdmin);
app.use("/", routeHome);
app.use("/auth", routeAuth);
app.listen(3000);