const express = require("express");
const app = express();
const port = 8008;
const db = require("./config/db");

const passport = require("passport");
const jwtPassport = require("./config/passport-jwt-strategy");
const session = require("express-session");

app.use(session({
    name: "jignesh",
    secret: "jwtToken",
    resave: false,
    saveUninitialized: false,
    cookie: {
        MaxAge: 1000 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded());
app.use("/", require("./routes"));

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server started sucessfully on port: ${port}`);
})