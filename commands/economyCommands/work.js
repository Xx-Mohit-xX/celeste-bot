const Discord = require('discord.js');

module.exports = {
  name: 'work',
  description: 'hunt',
  aliases: [],
  usage: 'hunt',
  execute: async (client, message, config) => {
    if (!config.work) {
      message.channel.send('Work amount not configured.');
      return;
    }
    const guilddata = await client.db.config.findOne({
      id: message.guild.id,
    });
    if (guilddata.economy === 'false') return message.channel.send('Economy is disabled on this guild!');
    const amount = Math.floor(Math.random() * (config.work.max - config.work.min + 1) + config.work.min);
    const embed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setTitle('Work')
      .setDescription(`✅ ${message.author} you got ${amount} ${guilddata.currencyname ? guilddata.currencyname : 'Bells'}!`);
    message.channel.send({ embed });
    await client.db.userdata.updateOne({ id: message.author.id, guildID: message.guild.id }, { $inc: { coins: amount } }, { upsert: true });
  },
};
