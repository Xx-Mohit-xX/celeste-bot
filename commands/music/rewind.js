const Discord = require("discord.js");
module.exports = {
  name: 'rewind',
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
            .setDescription(`You must specify an amount of seconds to rewind!`)
            return message.channel.send(embed)
          }
          try {
          let seektime = queue.currentTime - Number(msgArr[1]) * 1000;
          if(seektime < 0)
          seektime = 0;
          if(seektime >= queue.songs[0].duration * 1000 - queue.currentTime)
          seektime = 0;
        distube.seek(message, seektime)
        } catch (err) {
          return message.channel.send('Invalid time!');
        }
          const embed = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setDescription(`Rewound \`${msgArr[1]}\` seconds!`)
          return message.channel.send(embed)
      } else {
        const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setDescription(`There is nothing playing!`)
        return message.channel.send(embed)
      }
  },
};
