const { MongoClient } = require('mongodb');
const mongoose = require ('mongoose');
const { mongodburi } = require('./config.js');

const uri = mongodburi;
// const client = new MongoClient;

module.exports = {
  connectDB: async () => {
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false})
  },
};
