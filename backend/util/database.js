const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const url = 'mongodb+srv://Hackathon:SwftqllgGvzOsGIl@cluster0.bkmjj.mongodb.net/<dbname>?retryWrites=true&w=majority';

const mongoConnect = callback => {
  MongoClient.connect(
    url,
    { useUnifiedTopology: true }
  ).then(client => {
      console.log('Connected!');
      _db = client.db("users");
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } 
};



module.exports = {getDb, mongoConnect}
