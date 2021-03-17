const Discord = require('discord.js');
module.exports = {
  name: 'skip',
  description: 'skip music',
  aliases: [],
  usage: 'skip',
  admin: false,
  execute: async (client, message, config, distube) => {
    distube.skip(message);
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription('Song has been skipped!')
    message.channel.send(embed);
  },
};
