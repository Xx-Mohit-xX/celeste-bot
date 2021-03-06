/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */

module.exports = {
  name: 'unmute',
  description: 'unmute',
  aliases: 'um',
  execute: async (client, message, config) => {
    if (!message.member.roles.cache.some((r) => config.permissions.moderation.includes(r.id) || message.member.hasPermission(['ADMINISTRATOR']))) { message.reply('You\'re not allowed to use this command!'); return; }
    const msgArr = message.content.split(' ');

    const member = message.mentions.members.first() || message.guild.members.cache.get(msgArr[1]);
    if (!member) {
      message.channel.send('You must tag the user you want to unmute! `!unmute @user`');
      return;
    }

    if (client.mutes[member.id]) {
      const targetRole = message.member.roles.cache.find((r) => r.name === 'Muted') || null;
      member.roles.remove(targetRole);
      message.channel.send(`${member} has been unmuted!`);
      member.send('You have been unmuted!');

      client.db.mute.deleteOne({ id: member.id, guildID: message.guild.id });
      clearTimeout(client.mutes[member.id]);
      delete client.mutes[member.id];
    } else {
      message.channel.send(`${member.user.tag} is not muted!`);
    }
  },
};
