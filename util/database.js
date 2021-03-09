const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://rizian:rizPass@cluster0.h28ps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
  )
    .then((result) => {
      console.log('Connected');
      callback(result);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;
