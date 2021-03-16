/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
const Discord = require('discord.js');
module.exports = {
  name: 'setwelcomeimage',
  description: 'add',
  aliases: 'welcomeimage',
  usage: 'send @user <amount>',
  execute: async (client, message, config) => {
    const msgArr = message.content.split(' ');
    if (message.author.id !== '620196347890499604' && !message.member.hasPermission(['ADMINISTRATOR'])) { return message.reply('You\'re not allowed to use this command!'); }
    if (msgArr.length === 1) {
      const guilddata = await client.db.config.findOne({
        id: message.guild.id,
      });
      if (guilddata.welcomeimage) {
        const embed = new Discord.MessageEmbed()
          .setDescription('Welcome image is set to:');
        try {
          embed.setImage(guilddata.welcomeimage);
        } catch (err) {
          return message.channel.send('That is not a valid image!')
        }
        return message.channel.send({
          embed: embed
        });
      } else {
        return message.channel.send('No welcome image has been set!');
      }
    }
    if (msgArr[1].includes('https://') || msgArr[1].includes('http://')) {
      config.welcomeimage = msgArr[1];
      client.db.config.updateOne({
        id: message.guild.id
      }, {
        $set: {
          welcomeimage: msgArr[1],
        },
      }, {
        upsert: true
      });
      const embed = new Discord.MessageEmbed()
        .setColor('#5b4194')
        .setDescription(`You have successfully set the welcome image to:`);
      try {
        embed.setImage(msgArr[1]);
      } catch (err) {
        return message.channel.send('That is not a valid image!')
      }
      message.channel.send({
        embed: embed
      });
    } else if (msgArr[1].toLowerCase() === 'remove') {
      client.db.config.updateOne({
        id: message.guild.id
      }, {
        $unset: {
          welcomeimage: ""
        }
      }, {
        upsert: true
      });
      const doneembed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setDescription('Welcome image has been removed!');
      message.channel.send({embed: doneembed})
    } else {
      message.channel.send('You must specify an image url!');
    }

  },
};
