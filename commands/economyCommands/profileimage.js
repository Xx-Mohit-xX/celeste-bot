/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
const Discord = require('discord.js');
module.exports = {
  name: 'setprofileimage',
  description: 'add',
  aliases: 'profileimage',
  usage: 'send @user <amount>',
  execute: async (client, message, config) => {
    const msgArr = message.content.split(' ');
      const userdata = await client.db.islandinfo.findOne({
        id: message.author.id,
      });
      if (!userdata) {
        return message.channel.send('You must set your island info before you can do this!');
      }
      if (!userdata.hasPremium || userdata.hasPremium === 'false' ) {
        const embed = new Discord.MessageEmbed()
        .setColor('#c70021')
        .setDescription('Celeste Premium is required to do that!');
        return message.channel.send({embed: embed});
      }
      if (!msgArr[1]) {
        const embed = new Discord.MessageEmbed()
          .setDescription('Profile image is set to:');
        try {
          embed.setImage(guilddata.welcomeimage);
        } catch (err) {
          return message.channel.send('You haven\'t set a profile image!')
        }
        return message.channel.send({
          embed: embed
        });
      }
    if (msgArr[1].includes('https://') || msgArr[1].includes('http://')) {
      client.db.islandinfo.updateOne({
        id: message.author.id
      }, {
        $set: {
          profileimage: msgArr[1],
        },
      }, {
        upsert: true
      });
      const embed = new Discord.MessageEmbed()
        .setColor('#5b4194')
        .setDescription(`You have successfully set your profile image to:`);
      try {
        embed.setImage(msgArr[1]);
      } catch (err) {
        return message.channel.send('That is not a valid image!')
      }
      message.channel.send({
        embed: embed
      });
    } else if (msgArr[1].toLowerCase() === 'remove') {
      client.db.islandinfo.updateOne({
        id: message.author.id
      }, {
        $unset: {
          profileimage: ''
        }
      }, {
        upsert: true
      });
      const doneembed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setDescription('Profile image has been removed!');
      message.channel.send({embed: doneembed})
    } else {
      message.channel.send('You must specify an image url!');
    }

  },
}
