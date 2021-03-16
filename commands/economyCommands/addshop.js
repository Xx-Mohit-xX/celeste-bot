module.exports = {
  name: 'addshop',
  description: 'show addshop items',
  aliases: [],
  usage: 'addshop',
  execute: async (client, message, config) => {
    if (message.author.id !== '620196347890499604' && !message.member.roles.cache.some((r) => config.permissions.moderation.includes(r.id) || message.member.hasPermission(['ADMINISTRATOR']))) { message.reply('You\'re not allowed to use this command!'); return; }
    const msgArr = message.content.split(' ');
    if (msgArr[1]) {
      const price = parseInt(msgArr[2], 10);
      if (isNaN(price)) {
        message.channel.send('Enter a valid price!');
        return;
      }
      if (!config.shop) {
        config.shop = {};
      }
      config.shop[msgArr[1].toLowerCase()] = {
        name: msgArr[1],
        price,
      };
      client.db.config.updateOne({ id: message.guild.id }, {
        $set: {
          shop: config.shop,
        },
      });
      message.channel.send(`Successfully added ${msgArr[1]} to shop!`);
    }
  },
};
