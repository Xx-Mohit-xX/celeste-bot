const fetch = require("node-fetch");
const Discord = require("discord.js");
module.exports = {
  name: 'birb',
  description: 'get a beaut pic of a bird',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    fetch('https://some-random-api.ml/img/birb')
    .then(res => res.json())
    .then(json =>{
      message.channel.send(json.link);
    });
  },
};
