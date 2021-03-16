/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
const Discord = require("discord.js");
module.exports = {
  name: 'setcurrency',
  aliases: 'currencyname',
  description: 'name',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    if (message.author.id !== '620196347890499604' && !message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send('You do not have permission to run this command!');
    }
    if (msgArr[1]) {
      client.db.islandinfo.updateOne(
        { guildid: message.guild.id },
        {
          $set: {
            currencyname: msgArr.slice(1).join(' '),
          },
        },
        { upsert: true },
      );
      const embedA = new Discord.MessageEmbed()
    .setColor('#5b4194')
    .setDescription(`Currency name has been set to **${msgArr.slice(1).join(' ')}**!`);
    message.channel.send({embed: embedA });

    } else {
      message.channel.send('You must indicate a name!');
    }
  },
};
