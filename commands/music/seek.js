const Discord = require("discord.js");
module.exports = {
  name: 'seek',
  description: 'Play music',
  aliases: '',
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
          if (!msgArr[1]) {
            const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`You must specify an amount the time you want to seek to!`)
            return message.channel.send(embed)
          }
          try {
          let seektime = Number(msgArr[1]);
          if(seektime < 0)
        seektime = 0;
        distube.seek(message, seektime * 1000)
        } catch (err) {
          return message.channel.send('Invalid time!');
        }
          const embed = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setDescription(`Skipped to \`${msgArr[1]}\` seconds!`)
          return message.channel.send(embed)
      } else {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`There is nothing playing!`)
        return message.channel.send(embed)
      }
  },
};