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
//Express session
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
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
app.use("/api/dish", require("./routes/api_dish"));
app.use("/api/profile", require("./routes/api_profile"));
const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Server started on ${PORT}`);
});