module.exports = {
  name: 'setcooldown',
  description: 'setcooldown',
  aliases: [],
  usage: 'setcooldown',
  execute: async (client, message, config) => {
    if (!message.member.roles.cache.some((r) => config.permissions.moderation.includes(r.id) || message.member.hasPermission(['ADMINISTRATOR']))) { message.reply('You\'re not allowed to use this command!'); return; }
    const msgArr = message.content.split(' ');
    if (!msgArr[2]) {
      message.channel.send('Configure command cooldown using ;setcooldown <command_name> <duration_in_ms>');
      return;
    }
    const command = client.commands.get(msgArr[1].toLowerCase());
    if (command) {
      const duration = parseInt(msgArr[2], 10);
      if (isNaN(duration)) {
        message.channel.send('cCnfigure command cooldown using ;setcooldown <command_name> <duration_in_ms>');
        return;
      }
      message.channel.send('Settings have been successfully applied!');
      if (!config.cooldowns) {
        config.cooldowns = {};
      }
      config.cooldowns[command.name] = duration;
      await client.db.config.updateOne({ id: message.guild.id }, { $set: { cooldowns: config.cooldowns } }, { upsert: true });
    } else {
      message.channel.send('Command not found!');
    }
  },
};
