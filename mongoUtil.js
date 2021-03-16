const { MongoClient } = require('mongodb');
const { mongodburi } = require('./config.js');

const uri = mongodburi;
const client = new MongoClient(uri, { useNewUrlParser: true }, {autoIndex: false}, { useUnifiedTopology: true });

module.exports = {
  connectDB: async () => {
    await client.connect();
    console.log('mongoDB is now connected!');
    return client;
  },
};
