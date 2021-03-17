const Discord = require('discord.js');
module.exports = {
  name: 'stop',
  description: 'stop music',
  aliases: [],
  usage: 'stop',
  admin: false,
  execute: async (client, message, config, distube) => {
    distube.stop(message);
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription('Stopped the music!');
    message.channel.send(embed);
  },
};
