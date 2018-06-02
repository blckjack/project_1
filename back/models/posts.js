var db = require("../db");
var ObjectID = require("mongodb").ObjectID;

exports.all = function(cb) {
  db
    .get()
    .collection("posts")
    .find()
    .toArray(function(err, docs) {
      cb(err, docs);
    });
};

exports.findByTitle = function(title, cb) {
  db
    .get()
    .collection("posts")
    .findOne({ title: title }, function(err, doc) {
      cb(err, doc);
    });
};

exports.create = function(post, cb) {
  db
    .get()
    .collection("posts")
    .insert(post, function(err, doc) {
      cb(err, doc);
    });
};

exports.update = function(title, newData, cb) {
  db
    .get()
    .collection("posts")
    .update(
      {
        title: title
      },
      newData,
      function(err, result) {
        cb(err, result);
      }
    );
};

exports.delete = function(title, cb) {
  db
    .get()
    .collection("posts")
    .deleteOne({ title: title }, function(err, result) {
      cb(err, result);
    });
};
