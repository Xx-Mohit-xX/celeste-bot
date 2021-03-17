const Discord = require("discord.js");
module.exports = {
  name: 'jump',
  description: 'Play music',
  aliases: 'skipto',
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
          try {
          distube.jump(message, parseInt(msgArr[1]-1))
        } catch (err) {
          return message.channel.send('Invalid song number!');
        }
          const embed = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setDescription(`Skipped to song \`${msgArr[1]}\`!`)
      } else {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`There is nothing playing!`)
        return message.channel.send(embed)
      }
  },
};
