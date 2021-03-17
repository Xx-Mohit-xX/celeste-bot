const Discord = require("discord.js");
module.exports = {
  name: 'shuffle',
  description: 'Play music',
  aliases: 'shufflequeue',
  usage: 'play <music name>',
  admin: false,
  execute: async (client, message, config, distube) => {
    const msgArr = message.content.split(' ');
    const queue = distube.getQueue(message)
        if (!queue) {
          const embed = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription(`There is nothing playing!`)
          return message.channel.send(embed)
        } else if (queue) {
          distube.shuffle(message);
          const embed = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setDescription('Shuffled the queue!')
          return message.channel.send(embed);
      } else {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`There is nothing playing!`)
        return message.channel.send(embed)
      }
  },
};
