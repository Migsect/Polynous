"use strict";

const express = require("express");
const path = require("path");
// var favicon = require("serve-favicon");
const Logger = require(process.cwd() + "/server_modules/Logger");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const editor = require("./routes/editor");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require("morgan")("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
{
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/editor", editor);

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) //, next)
  {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err :
    {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
const BrowserManager = require("./server_modules/browser/BrowserManager");
const WorkspaceManager = require("./server_modules/workspace/WorkspaceManager");
WorkspaceManager.createWorkspace("https://github.com/Migsect/Polynous");

module.exports = app;
