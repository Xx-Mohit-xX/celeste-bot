/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */

module.exports = {
  name: 'warns',
  description: 'display active warns of the user',
  aliases: ['activewarns'],
  usage: 'warns <user>/warns',
  permissions: true,
  execute: async (client, message, config) => {
    const msgArr = message.content.split(' ');
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
        message.channel.send(`**${targetUser}'s Active warnings:**\`\`\`\n\n${user.warns.map((warn, index) => {
          const warnDate = new Date(warn.date);
          return `#${index + 1} - ${warnDate.getUTCMonth() + 1}/${warnDate.getUTCDate()}/${warnDate.getUTCFullYear()} - ${warn.reason}`;
        }).join('\n')}\`\`\``);
      } else {
        message.channel.send(`**${targetUser} doesn't have any active warnings.**`);
      }
    } else {
      message.channel.send(`**${targetUser} doesn't have any active warnings.**`);
    }
  },
};
