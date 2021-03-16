const Discord = require("discord.js");
module.exports = {
  name: 'ping',
  description: 'lookup',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms.`);

  },
};
