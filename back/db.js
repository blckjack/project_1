var MongoClient = require("mongodb").MongoClient;

var state = {
  db: null
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;
exports.get = get;
function connect(url, done) {
  if (state.db) {
    return done();
  }

  MongoClient.connect(url, function(err, db) {
    if (err) {
      return done(err);
    }
    state.db = db.db("myapi");
    console.log("test");
    done();
  });
}

function get() {
  return state.db;
}
