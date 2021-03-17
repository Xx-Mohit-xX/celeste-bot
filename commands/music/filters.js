const filterList = ['3D', 'Echo', 'Karaoke', 'Nightcore', 'Vaporwave', 'Bassboost', 'Flanger', 'Gate', 'Haas', 'Surround', 'Mcompand', 'Phaser', 'Tremolo', 'Earwax'];
const Discord = require("discord.js");
module.exports = {
  name: 'filters',
  description: 'bassboost music',
  aliases: filterList,
  usage: filterList.join('/'),
  admin: false,
  execute: async (client, message, config, distube) => {
    const msgArr = message.content.split(' ');
    const command = msgArr[0].slice(1);
    const queue = distube.getQueue(message)
    if (command.toLowerCase() === 'filters' && !msgArr[1]) {
      const embed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setTitle('Filters')
      .setDescription(`${filterList.map((filter) => `${filter}`).join('\n')}`)
      message.channel.send(embed);
      return;
    }
    if(!queue) {
      const embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription(`There is nothing in the queue right now!`)
      return message.channel.send(embed)
    }
    if(!msgArr[1]) return;
    if (msgArr[1] === "off" && queue.filter) {
      distube.setFilter(message, queue.filter)
      const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription(`Filter has been disabled.`)
      return message.channel.send(embed);
    }
    try {
    const filter = distube.setFilter(message, msgArr[1].toLowerCase());
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription(`Current queue filter: ${filter || 'Off'}`)
    return message.channel.send(embed);
  } catch(err) {
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription('That is not a valid filter!')
    return message.channel.send(embed);
  }

  },
};
