const Discord = require('discord.js');

module.exports = {
  name: 'fish',
  description: 'fish',
  aliases: [],
  usage: 'fish',
  execute: async (client, message, config) => {
    if (!config.fish) {
      message.channel.send('Admin must configure fish amount first using !setfish min-max');
      return;
    }
    const amount = Math.floor(Math.random() * (config.fish.max - config.fish.min + 1) + config.fish.min);
    const embed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setTitle('Fish')
      .setDescription(`✅ ${message.author} you obtained ${amount}!`);
    message.channel.send({ embed });
    await client.db.userdata.updateOne({ id: message.author.id, guildID: message.guild.id }, { $inc: { coins: amount } }, { upsert: true });
  },
};
