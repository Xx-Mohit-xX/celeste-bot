/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');
module.exports = {
  name: 'seteconomy',
  description: 'set guild configurations',
  aliases: 'economy',
  usage: 'economy disable command',
  execute: async (client, message, config) => {

    const msgArr = message.content.split(' ');
    if (message.author.id !== '620196347890499604' && !message.member.hasPermission(['ADMINISTRATOR'])) { return message.reply('You\'re not allowed to use this command!'); }
    if (msgArr.length === 1) {
      const guilddata = await client.db.config.findOne({
        id: message.guild.id,
      });
      if (guilddata.economy) {
        return message.channel.send(`Economy is set to **${guilddata.economy}**!`);
      } else {
        return message.channel.send('Economy is set to **true**!');
      }
    }
      if (msgArr[1].toLowerCase() === 'true' || msgArr[1].toLowerCase() === 'false') {
        config.economy = msgArr[1];
        client.db.config.updateOne({ id: message.guild.id }, {
          $set: {
            economy: msgArr[1],
          },
        }, { upsert: true });
        const embed = new Discord.MessageEmbed()
        .setColor('#5b4194')
        .setDescription(`You have successfully set economy to ${msgArr[1]}!`);
        message.channel.send({embed: embed});
      } else {
        message.channel.send('You can only specify true or false!');
      }
  },
};
