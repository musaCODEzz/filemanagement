const express = require('express');	
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const localStratergy = require('passport-local').Strategy;
//const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// connecting to the database
const connectDB = require('./server/database/connection');
const Login = require('./server/model/user');



//configuring the dotenv file
dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 8080;

//log requests 
app.use(morgan('tiny'));

//mongodb connection
connectDB();

app.use(express.static(__dirname + "/public" ));
app.use(bodyParser.json());

//parse request to the bodyparser
app.use(bodyParser.urlencoded({extended: true}));


//Handlebars setting

app.set("view engine", "hbs");
app.engine("hbs", exphbs.engine({
    extname: "hbs",
    defaultLayout: "index",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/"
}));


//session setting
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

//passport setting
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Login.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new localStratergy(function (username, password, done) {
    Login.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, function (err, res) {
            if (err) return done(err);
            if( res === false) return done(null, false, { message: "Incorrect password" });
        return done(null, user);
    });
    });
}
));



//load routes
app.use('/', require('./server/routes/router'));

//stating the server
app.listen(PORT, () =>{
    console.log(`App running at http://localhost:${PORT}`)
})