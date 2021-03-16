/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');
module.exports = {
  name: 'welcomechannel',
  description: 'set guild configurations',
  aliases: 'setwelcome',
  usage: '!welcome',
  execute: async (client, message, config) => {

    const msgArr = message.content.split(' ');
    if (message.author.id !== '620196347890499604' && !message.member.hasPermission(['ADMINISTRATOR'])) { return message.reply('You\'re not allowed to use this command!'); }
    if (msgArr.length === 1) {
      const welcomeChannel = client.channels.cache.get(client.guildConfig[message.guild.id].channels.welcomeChannel);
      if (welcomeChannel) {
        return message.channel.send(`Current welcome channel is ${welcomeChannel}.`);
      } else {
        return message.channel.send('Welcome channel not yet set!');
      }
    }

    const targetChannel = message.mentions.channels.first() || client.channels.cache.get(msgArr[1]);

    if (targetChannel) {
      if (targetChannel.guild.id === message.guild.id) {
        config.channels.welcomeChannel = targetChannel.id;
        client.db.config.updateOne({ id: message.guild.id }, {
          $set: {
            channels: config.channels,
          },
        }, { upsert: true });
        const embed = new Discord.MessageEmbed()
        .setColor('#5b4194')
        .setDescription(`You have successfully set the welcome channel to ${targetChannel}`);
        message.channel.send({embed: embed});
      } else {
        message.channel.send('You can only specify channels within this guild!');
      }
    } else if (msgArr[1] === 'remove') {
      config.channels.welcomeChannel = '';
      const doneEmbed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setDescription('Welcome channel has been removed.');
      message.channel.send({embed: doneEmbed});
    } else {
      message.channel.send('Specified channel not found!');
    }
  },
};
