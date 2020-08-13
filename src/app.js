require("dotenv").config(); //for env vars
const express = require("express");
//const expressLayouts = require('express-ejs-layouts');
const mongoose = require("mongoose");
const app = express();
//const flash = require('connect-flash');
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
//Passport config
require("./config/passport-google")(passport);
//passport is for authenticating only
//flash message is a message stored in a session and displayed after a redirect of some sort

//DB Config
const db = require("./config/keys").MongoURI;
//Connect to mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

//EJS
//app.use(expressLayouts);
//app.set('view engine', 'ejs');
//Bodyparser
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

//Express session
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    })
);
//when user is authenticated its serialised to cookies and then attached to req.user(as well as req.session.passport.user)
//on subsequent requests, passport.initialize() middleware is called. 
//It finds the passport.user attached to the session, if it doesnt(user yet not authenticated) it creates it like req.passport.user={}
//passport.initialize middleware is invoked on every request. It ensures the session contains a passport.user object, which may be empty
app.use(passport.initialize());
//next passport.session() is invoked. If it finds a serialised user object in the session, it considers the request to be authenticated. 
//it then calls the passport.deserializeUser whule attaching the loaded user ibject to req as req.user()
//passport.session middleware is a Passport Strategy which will load the user object onto req.user if a serialised user object was found in the server.
//passport.deserializeUser is invoked on every request by passport.session. It enables us to load additional user information on every request. This user object is attached to the request as req.user making it accessible in our request handling.
//
app.use(passport.session());
//Connect flash
// app.use(flash());

// //Global vars
// app.use(function (req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error_msg = req.flash('error')
//     next();
// });

//Routes
app.use("/api/menu", require("./routes/api_menu"));
//app.use("/api/dish", require("./routes/api_dish")); no use as all the dishes are inside the Menu
app.use("/api/profile", require("./routes/api_profile"));
app.use("/api/cart", require("./routes/api_cart"));
app.use("/api/order", require("./routes/api_order"));
app.use("/api/cafe", require("./routes/api_cafe"));
const router = require('express').Router();


const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server started on ${PORT}`);
});