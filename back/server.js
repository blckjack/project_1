var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var LocalStrategy = require("passport-local").Strategy;
var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var ObjectID = require("mongodb").ObjectID;
var postsController = require("./controllers/posts");
var db = require("./db");
var passport = require("passport");
var multer = require("multer");
var FormData = require("form-data");
var fs = require("fs");

var routes = require("./routes/index");
var viewusers = require("./routes/viewusers");

var app = express();

// View Engine
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, "assets")));

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.use("/", routes);

app.use("/admin", viewusers);

app.get("/posts", postsController.all);

app.get("/posts/:title", postsController.findByTitle);

app.post("/posts", postsController.create);

app.put("/posts/:title", postsController.update);

app.delete("/posts/:id", postsController.delete);
app.get("/upload", function(req, res) {
  res.render("upload");
});

db.connect("mongodb://db:27017/myapi", function(err) {
  if (err) {
    return console.log(err);
  }
  app.listen(3012, function() {
    console.log("API started");
  });
});
