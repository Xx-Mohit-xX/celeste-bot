/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');
module.exports = {
  name: 'levelupchannel',
  description: 'set guild configurations',
  aliases: 'lvlup',
  usage: '!welcome',
  execute: async (client, message, config) => {

    const msgArr = message.content.split(' ');
    if (message.author.id !== '620196347890499604' && !message.member.hasPermission(['ADMINISTRATOR'])) { return message.reply('You\'re not allowed to use this command!'); }
    if (msgArr.length === 1) {
      const levelchannel = client.channels.cache.get(client.guildConfig[message.guild.id].channels.levelchannel);
      if (levelchannel) {
        console.log(levelchannel);
        return message.channel.send(`Current levels channel is ${levelchannel}`);
      } else {
        return message.channel.send('Levels channel not yet set!');
      }
    }

    const targetChannel = message.mentions.channels.first() || client.channels.cache.get(msgArr[1]);

    if (targetChannel) {
      if (targetChannel.guild.id === message.guild.id) {
        config.channels.levelchannel = targetChannel.id;
        client.db.config.updateOne({ id: message.guild.id }, {
          $set: {
            channels: config.channels,
          },
        }, { upsert: true });
        const embed = new Discord.MessageEmbed()
        .setColor('#5b4194')
        .setDescription(`You have successfully set the levels channel to ${targetChannel}`);
        message.channel.send({embed: embed});
      } else {
        message.channel.send('You can only specify channels within this guild!');
      }
    } else {
      message.channel.send('Specified channel not found!');
    }
  },
};
