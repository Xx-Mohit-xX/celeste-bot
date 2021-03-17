/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const Discord = require("discord.js");
module.exports = {
  name: 'setwish',
  cooldown: 5,
  description: 'sets guild adopt channel',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    const guild = await client.db.islandinfo.findOne({ guildid: message.guild.id });
    const name = 'guildadopt';
    let description = msgArr[1];
    if (msgArr[1] && (message.member.hasPermission('ADMINISTRATOR') || message.author.id === '620196347890499604')) {
    let item;
    if (guild) {
      if (guild.moreinfo) { item = guild.moreinfo.find((entry) => entry.name === name); }
    }
    if (item) {
      item.description = description;
      const moreinfo = msgArr[1];
      const embedA = new Discord.MessageEmbed()
    .setColor('#5b4194')
    .setDescription(`Guild wish channel has been set to **<#${msgArr[1]}>**!`);
    message.channel.send({embed: embedA });
      client.db.islandinfo.updateOne(
        { guiidid: message.guild.id },
        {
          $set: {
            moreinfo: guild.moreinfo,
          },
        },
        { upsert: true },
      );
    } else {
      client.db.islandinfo.updateOne(
        { guildid: message.guild.id },
        {
          $push: {
            moreinfo: {
              name,
              description,
            },
          },
        },
        { upsert: true },
      );
    const embedA = new Discord.MessageEmbed()
    .setColor('#7cdda5')
    .setDescription(`Guild wish channel has been set to **<#${msgArr[1]}>**!`);
    message.channel.send({embed: embedA });
    }
  } else {
    message.channel.send('You don\'t have permission to run this command.');
  }
  },
};
