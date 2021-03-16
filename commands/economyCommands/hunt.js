const Discord = require('discord.js');

module.exports = {
  name: 'hunt',
  description: 'hunt',
  aliases: [],
  usage: 'hunt',
  execute: async (client, message, config) => {
    if (!config.hunt) {
      message.channel.send('Admin must configure hunt amount first using !sethunt min-max');
      return;
    }
    const amount = Math.floor(Math.random() * (config.hunt.max - config.hunt.min + 1) + config.hunt.min);
    const embed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setTitle('Hunt')
      .setDescription(`✅ ${message.author} you obtained ${amount}!`);
    message.channel.send({ embed });
    await client.db.userdata.updateOne({ id: message.author.id, guildID: message.guild.id }, { $inc: { coins: amount } }, { upsert: true });
  },
};
