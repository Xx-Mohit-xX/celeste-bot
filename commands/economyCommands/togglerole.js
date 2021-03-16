module.exports = {
  name: 'togglerole',
  description: 'togglerole',
  aliases: [],
  usage: 'togglerole',
  execute: async (client, message, config) => {
    if (!message.member.roles.cache.some((r) => config.permissions.moderation.includes(r.id) || message.member.hasPermission(['ADMINISTRATOR']))) { message.reply('You\'re not allowed to use this command!'); return; }
    config.togglerole = !config.togglerole;
    message.channel.send('settings have been successfully applied!');
    await client.db.config.updateOne({ id: message.guild.id }, { $set: { togglerole: config.togglerole } }, { upsert: true });
  },
};
