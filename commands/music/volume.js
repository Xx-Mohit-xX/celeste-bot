const Discord = require("discord.js");
module.exports = {
  name: 'volume',
  description: 'Play music',
  aliases: 'vol',
  usage: 'play <music name>',
  admin: false,
  execute: async (client, message, config, distube) => {
    const msgArr = message.content.split(' ');
    const queue = distube.getQueue(message)
        if (!queue) {
          const embed = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription(`There is nothing in the queue right now!`)
          return message.channel.send(embed)
        }
        if (!msgArr[1]) {
          const embed = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription('You must specify a volume!')
          return message.channel.send(embed);
        }
        const volume = parseInt(msgArr[1])
        if (isNaN(volume)) {
          const embed = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription(`Please enter a valid number!`)
          return message.channel.send(embed)
        }
        distube.setVolume(message, volume)
        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription(`Volume set to **${volume}**%`)
        message.channel.send(embed)
  },
};
