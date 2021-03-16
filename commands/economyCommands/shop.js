const Discord = require('discord.js');

module.exports = {
  name: 'shop',
  description: 'show shop items',
  aliases: [],
  usage: 'shop',
  execute: async (client, message, config) => {
    if (config.shop) {
      const itemList = Object.keys(config.shop).map((itemName) => {
        const item = config.shop[itemName];
        return `> ${itemName} - ${item.price} 🪙`;
      });
      const embed = new Discord.MessageEmbed()
        .setTitle('Shop')
        .setDescription(itemList.join('\n'));
      message.channel.send(embed);
    }
  },
};
