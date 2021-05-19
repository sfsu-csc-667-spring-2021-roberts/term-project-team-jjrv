var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var flash = require("express-flash");
const session = require("express-session");
const Pusher = require("pusher");

// connection to db
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
// passport
var passport = require("./auth/auth");
// routes
var indexRouter = require("./routes/UNauthenticated/index");
var usertestRouter = require("./routes/testuser");
var testRouter = require("./routes/tests");
var unauthenticatedRouter = require("./routes/UNauthenticated/unauthenicated");
var authenticatedRouter = require("./routes/authenticated/authenticated");
//var lobbyRouter = require('./routes/lobby');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// important stuff
app.use(flash());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "Random Woof",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Create an instance of Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// routing 
app.use("/", indexRouter, unauthenticatedRouter);
app.use("/test", testRouter);
app.use("/testuser", usertestRouter);
app.use('/auth',authenticatedRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
