/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
const Discord = require("discord.js");
module.exports = {
  name: 'togglefriendcode',
  aliases: 'togglefc',
  description: 'name',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    if (message.author.id !== '620196347890499604' && !message.member.hasPermission('ADMINISTRATOR')) {
      return message.channel.send('You do not have permission to run this command!');
    }
    if (msgArr[1] === 'true' || msgArr[1] === 'false') {
      client.db.islandinfo.updateOne(
        { guildid: message.guild.id },
        {
          $set: {
            friendcoderequirement: msgArr[1],
          },
        },
        { upsert: true },
      );
      const embedA = new Discord.MessageEmbed()
    .setColor('#5b4194')
    .setDescription(`Friend code requirement has been set to **${msgArr[1]}**!`);
    message.channel.send({embed: embedA });

    } else {
      message.channel.send('You must indicate true / false!');
    }
  },
};
