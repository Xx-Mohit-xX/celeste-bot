/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');
module.exports = {
  name: 'gaperms',
  description: 'set guild configurations',
  aliases: 'setgiveaway',
  usage: '!config',
  execute: async (client, message, config) => {
    if (message.author.id !== '620196347890499604' && !message.member.hasPermission(['ADMINISTRATOR'])) { return message.reply('You\'re not allowed to use this command!'); }
    const msgArr = message.content.split(' ');

    const target = message.mentions.roles.first() || message.guild.roles.cache.get(msgArr[1]) || message.mentions.members.first() || message.guild.members.cache.get(msgArr[1]);

    if (target) {
      const exists = config.permissions.giveaways.findIndex((i) => i === target.id);
      if (exists < 0) {
        config.permissions.giveaways.push(target.id);
        client.db.config.updateOne({ id: message.guild.id }, {
          $set: {
            permissions: config.permissions,
          },
        }, { upsert: true });
        const embed = new Discord.MessageEmbed()
        .setColor('#5b4194')
        .setDescription(`You have successfully added permissions for giveaways to ${target}`);
        message.channel.send({embed: embed});
      } else {
        config.permissions.giveaways.splice(exists, 1);
        client.db.config.updateOne({ id: message.guild.id }, {
          $set: {
            permissions: config.permissions,
          },
        }, { upsert: true });
        const embed = new Discord.MessageEmbed()
        .setColor('#5b4194')
        .setDescription(`You have successfully removed permissions for giveaways from ${target}`);
        message.channel.send({embed: embed});
      }
    } else {
      message.channel.send('Specified target not found!');
    }
  },
};
