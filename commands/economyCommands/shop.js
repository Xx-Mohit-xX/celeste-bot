const Discord = require('discord.js');

module.exports = {
  name: 'servershop',
  description: 'show shop items',
  aliases: 'ss',
  usage: 'shop',
  execute: async (client, message, config) => {
    const guilddata = await client.db.islandinfo.findOne({
      guildid: message.guild.id,
    });
    if (guilddata.economy === 'false') return message.channel.send('Economy is disabled on this guild!');
    if (config.shop) {
      const itemList = Object.keys(config.shop).map((itemName) => {
        const item = config.shop[itemName];
        return `${itemName} \r\n Price: ${item.price} ${guilddata.currencyname ? guilddata.currencyname : 'Bells'} `;
      });
      const embed = new Discord.MessageEmbed()
        .setTitle('Server Shop')
        .setDescription(itemList.join('\n\n'))
        .setFooter(';servershopbuy <item>')
      message.channel.send(embed);
    } else {
      const embed = new Discord.MessageEmbed()
      .setTitle('Server Shop')
      .setDescription('There are no items in the shop!');
      message.channel.send(embed);
    }
  },
};
