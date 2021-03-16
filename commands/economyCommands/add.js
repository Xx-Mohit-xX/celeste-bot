/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
const Discord = require('discord.js');
module.exports = {
  name: 'add',
  description: 'add',
  aliases: [],
  usage: 'add @user <amount>',
  execute: async (client, message, config) => {
    const guilddata = await client.db.config.findOne({
      id: message.guild.id,
    });
    if (!guilddata.economy || guilddata.economy === 'true') {
    if (message.author.id !== '620196347890499604' && !message.member.hasPermission(['ADMINISTRATOR'])) { return message.reply('You\'re not allowed to use this command!'); }
    const msgArr = message.content.split(' ');
    const guilddata = await client.db.islandinfo.findOne({ guildid: message.guild.id });
    const target = message.mentions.members.first() || message.guild.members.cache.get(msgArr[1]) || message.mentions.roles.first();
    const amount = parseInt(msgArr[2], 10);
    if (isNaN(amount)) {
      message.channel.send('Enter a valid amount to add');
      return;
    }
    const embed = new Discord.MessageEmbed()
    .setColor('#5b4194')
    .setDescription(`✅ ${message.author} gave ${target} ${amount} ${guilddata.currencyname ? guilddata.currencyname : 'Bells'}!`);
    const isRole = message.guild.roles.cache.has(target.id);
    if (message.guild.member(target.id) && !isRole) {
    await client.db.userdata.updateOne({ id: target.id, guildID: message.guild.id }, { $inc: { coins: amount } }, { upsert: true });
    message.channel.send({embed: embed});
  } else if (isRole) {
    target.members.forEach(async updateuser => {
    await client.db.userdata.updateOne({ id: updateuser.id, guildID: message.guild.id }, { $inc: {coins: amount } }, { upsert : true });
    });
    message.channel.send({embed: embed});
  }
  } else {
    return message.channel.send('Economy is disabled on this guild!');
  }
  },
};
