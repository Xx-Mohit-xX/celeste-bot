/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */

module.exports = {
  name: 'warn',
  description: 'warns the user',
  aliases: [],
  usage: 'warn <user> <reason>',
  permissions: true,
  execute: async (client, message, config) => {
    if (message.author.id !== '620196347890499604' && !message.member.roles.cache.some((r) => config.permissions.moderation.includes(r.id) || message.member.hasPermission(['ADMINISTRATOR']))) { return message.reply('You\'re not allowed to use this command!'); }
    message.channel.bulkDelete(1);

    const msgArr = message.content.split(' ');
    const targetUser = message.mentions.members.first() || message.guild.members.cache.get(msgArr[1]);

    if (!targetUser) { return message.channel.send('Error! Target user is not a member of this guild!'); }
    if (targetUser.id === '620196347890499604' || targetUser.id === message.author.id) {
      return message.channel.send('You cannot warn this user!')
    } else {
    let reason = msgArr.slice(2).join(' ');
    if (!reason || reason === '') reason = 'Unknown';
    const currentDate = Date.now();
    const user = await client.db.warn.findOne({ id: targetUser.id }) || { warns: [] };
    const modData = await client.db.modstats.findOne({ id: message.author.id }) || {};
    const modWarns = modData.warns || [];

    user.warns.filter((warn) => currentDate - warn.date <= config.warnexpiration);
    user.warns.push({
      reason,
      date: currentDate,
      mod: message.author.tag,
    });
    modWarns.push({
      user: targetUser.id,
      reason,
      date: currentDate,
    });

    targetUser.send(`You have been warned!\nReason: ${reason}`).catch();
    message.channel.send(`${targetUser} has been warned! User currently has **${user.warns.length} active warnings!**`);

    await client.db.warn.updateOne({ id: targetUser.id, guildID: message.guild.id }, { $set: { warns: user.warns } }, { upsert: true });
    await client.db.modstats.updateOne({ id: message.author.id }, { $set: { warns: modWarns } }, { upsert: true });
  }
  },
};
