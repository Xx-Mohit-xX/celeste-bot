const Discord = require("discord.js");
module.exports = {
  name: 'pause',
  description: 'Play music',
  aliases: 'resume',
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
        if (queue.pause) {
            const embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setDescription('Resumed the song for you!')
            distube.resume(message)
            return message.channel.send(embed)
        } else if (queue) {
        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setDescription("Paused the song for you!")
        distube.pause(message)
        return message.channel.send(embed);
      } else {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`There is nothing in the queue right now!`)
        return message.channel.send(embed)
      }
  },
};
