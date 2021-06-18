/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');
module.exports = {
  name: 'warns',
  description: 'display active warns of the user',
  aliases: ['activewarns'],
  usage: 'warns <user>/warns',
  permissions: true,
  execute: async (client, message, config) => {
    const msgArr = message.content.split(' ');
    if (msgArr[1] && msgArr[1].toLowerCase() === 'clear') {
      if (msgArr[2]) {
        let clearUser = message.mentions.members.first() || message.guild.members.cache.get(msgArr[2]);
        if (clearUser) {
          clear = await client.db.warn.findOneAndDelete({id: clearUser.id, guildID: message.guild.id },
            {
          });
          const embed = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setDescription(`All warns cleared for **${clearUser.user.tag}**.`)
          return message.channel.send({embed: embed})
        }
      }
    }
    let targetUser = message.mentions.members.first() || message.guild.members.cache.get(msgArr[1]);
    const currentDate = Date.now();
    let user;
    if (message.author.id !== '620196347890499604' && !message.member.roles.cache.some((r) => config.permissions.moderation.includes(r.id) || message.member.hasPermission(['ADMINISTRATOR']))) { return message.reply('You\'re not allowed to use this command!'); }
    if (targetUser) {
      user = await client.db.warn.findOne({ id: targetUser.id });
    } else {
      user = await client.db.warn.findOne({ id: message.author.id, guildID: message.guild.id });
      targetUser = message.guild.members.cache.get(message.author.id);
    }
    if (user) {
      if (message.content.includes('!activewarns')) { user.warns = user.warns.filter((warn) => currentDate - warn.date <= config.warnexpiration); }
      if (user.warns.length > 0) {
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${targetUser}'s Active Warnings:**\n\`\`\`\n\n${user.warns.map((warn, index) => {
          const warnDate = new Date(warn.date);
          return `${index + 1}) at ${warnDate.getUTCMonth() + 1}/${warnDate.getUTCDate()}/${warnDate.getUTCFullYear()} for **${warn.reason}**.`;
        }).join('\n')}\`\`\`\n\nTo remove warnings, do **;warns clear <user>**`)
        message.channel.send({embed: embed})};
      } else {
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${targetUser} doesn't have any active warnings.**`)
        .setColor('GREEN')
        message.channel.send({embed: embed});
      }
  },
};
