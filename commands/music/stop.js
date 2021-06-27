const Discord = require('discord.js');
module.exports = {
  name: 'stop',
  description: 'stop music',
  aliases: [],
  usage: 'stop',
  admin: false,
  execute: async (client, message, config, distube) => {
    const djdata = await client.db.config.findOne({
      id: message.guild.id,
    });
    if ((message.member.id !== '620196347890499604' && (djdata.djon ? (djdata.djon === 'true' ? !message.member.roles.cache.some((r) => config.permissions.dj.includes(r.id)) : !message.member.roles.cache.some((r) => r.name.toLowerCase() === 'basic')) : !message.member.hasPermission(['ADMINISTRATOR']) ))) {
      const embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription('You do not have permission to run this command!')
      return message.channel.send({embed: embed});
    }
    if (!message.member.voice.channel) {
      const embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setDescription('You are not connected to the same voice channel as Celeste!')
      return message.channel.send({embed: embed});
    }
    distube.stop(message);
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setDescription('Stopped the music!');
    message.channel.send(embed);
  },
};
