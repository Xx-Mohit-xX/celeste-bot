/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');
module.exports = {
  name: 'loggingchannel',
  description: 'set guild configurations',
  aliases: 'purchaselog',
  usage: '!welcome',
  execute: async (client, message, config) => {

    const msgArr = message.content.split(' ');
    if (message.author.id !== '620196347890499604' && !message.member.hasPermission(['ADMINISTRATOR'])) { return message.reply('You\'re not allowed to use this command!'); }
    if (msgArr.length === 1) {
      const purchaselog = client.channels.cache.get(client.guildConfig[message.guild.id].channels.purchaselog);
      if (purchaselog) {
        return message.channel.send(`Current welcome channel is ${purchaselog}.`);
      } else {
        return message.channel.send('Purchase logging channel not yet set!');
      }
    }

    const targetChannel = message.mentions.channels.first() || client.channels.cache.get(msgArr[1]);

    if (targetChannel) {
      if (targetChannel.guild.id === message.guild.id) {
        config.channels.purchaselog = targetChannel.id;
        client.db.config.updateOne({ id: message.guild.id }, {
          $set: {
            channels: config.channels,
          },
        }, { upsert: true });
        const embed = new Discord.MessageEmbed()
        .setColor('#5b4194')
        .setDescription(`You have successfully set the purchase logging channel to ${targetChannel}`);
        message.channel.send({embed: embed});
      } else {
        message.channel.send('You can only specify channels within this guild!');
      }
    } else if (msgArr[1] === 'remove') {
      config.channels.purchaselog = '';
      await client.db.config.updateOne({ id: message.guild.id}, {
        $unset: {
          'channels.purchaselog': ''
        }
      }, { upsert: true }).catch((error) => {
        return message.channel.send('There was an error removing the purchase logging channel from the database.')
      });
      const doneEmbed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setDescription('Purchase logging channel has been removed.');
      message.channel.send({embed: doneEmbed});
    } else {
      message.channel.send('Specified channel not found!');
    }
  },
};
