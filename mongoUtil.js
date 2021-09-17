const { MongoClient } = require('mongodb');
const { mongodburi } = require('./config.js');

const uri = mongodburi;
const client = new MongoClient;

module.exports = {
  connectDB: async () => {
    await client.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false}).then(
      () => {
    console.log('mongoDB is now connected!');
    return client;},
    err => {console.log('There was an error');}
  )
  },
};
