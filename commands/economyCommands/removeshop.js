module.exports = {
  name: 'removeshop',
  description: 'show removeshop items',
  aliases: [],
  usage: 'removeshop',
  execute: async (client, message, config) => {
    if (message.author.id !== '620196347890499604' && !message.member.roles.cache.some((r) => config.permissions.moderation.includes(r.id) || message.member.hasPermission(['ADMINISTRATOR']))) { message.reply('You\'re not allowed to use this command!'); return; }
    const msgArr = message.content.split(' ');
    if (msgArr[1] && config.shop) {
      const item = config.shop[msgArr[1].toLowerCase()];
      if (item) {
        delete config.shop[msgArr[1].toLowerCase()];
        client.db.config.updateOne({ id: message.guild.id }, {
          $set: {
            shop: config.shop,
          },
        });
      }
      message.channel.send(`Successfully deleted ${msgArr[1]} from shop!`);
    }
  },
};
