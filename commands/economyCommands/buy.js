const Discord = require('discord.js');

module.exports = {
  name: 'buy',
  description: 'show buy items',
  aliases: [],
  usage: 'buy',
  execute: async (client, message, config) => {
    if (config.shop) {
      const msgArr = message.content.split(' ');
      if (!msgArr[1]) {
        message.channel.send('Indicate the item you want to buy');
        return;
      }

      const userdata = await client.db.userdata.findOne({ id: message.author.id, guildID: message.guild.id });
      if (!userdata) {
        message.channel.send('Not enough coins');
        return;
      }

      const itemName = message.content.slice(message.content.indexOf(' ') + 1);
      const item = config.shop[itemName.toLowerCase()];

      await client.db.userdata.updateOne({ id: message.author.id, guildID: message.guild.id }, {
        $inc: {
          coins: item.price * -1,
        },
      });

      const embed = new Discord.MessageEmbed()
        .setTitle('Buy')
        .setDescription(`You have successfully bought ${item.name} for ${item.price} 🪙`);

      message.channel.send(embed);
    }
  },
};
