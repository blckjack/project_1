var Posts = require("../models/posts");
var multer = require("multer");
var path = require("path");
var { map } = require("lodash");

// set storage engine
var storage = multer.diskStorage({
  destination: "./assets/img/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// init upload
var upload = multer({
  storage: storage
}).array("myImage", 4);

var storage = multer.diskStorage({
  distination: "/assets/img",
  filename: function(req, file, cb) {
    cb(
      error,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

exports.all = function(req, res) {
  Posts.all(function(err, docs) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.findByTitle = function(req, res) {
  Posts.findByTitle(req.params.title, function(err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  });
};

exports.create = function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      res.render("index", {
        errors: err
      });
    } else {
      var imgLink = map(req.files, function(file) {
        return file.path;
      });
      var post = {
        img: imgLink,
        title: req.body.title,
        slug: req.body.slug,
        topic: req.body.topic,
        content: req.body.content
      };
      Posts.create(post, function(err, doc) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        console.log(post);
        res.send(post);
      });
    }
  });
};

exports.update = function(req, res) {
  Posts.update(
    req.params.title,
    {
      title: req.body.title,
      topic: req.body.topic,
      content: req.body.content,
      rating: req.body.rating,
      hash_post: req.body.hash_post
    },
    function(err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  );
};

exports.delete = function(req, res) {
  Posts.delete(req.params.title, function(err, result) {
    console.log(req.params.title);
    console.log("delete: req.body: " + JSON.stringify(req.params.title));
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};
