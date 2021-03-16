/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'reactionrole',
  description: 'Make a reactrole message',
  aliases: 'rr',
  usage: 'reactrole',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    if (message.author.id !== '620196347890499604' && !message.member.roles.cache.some((r) => config.permissions.moderation.includes(r.id) || message.member.hasPermission(['ADMINISTRATOR']))) { return message.reply('You\'re not allowed to use this command!'); }
    let name = msgArr.slice(1).join(' ');
    const embed = new MessageEmbed()
      .setTitle(name)
      .setDescription('React to a reaction to get the role!\n\n')
    const reactMessage = await message.channel.send(embed);
    message.delete();

    const guildRole = client.reactrolelocal.find((roleGuild) => roleGuild.id === message.guild.id);

    if (!guildRole) {
      client.reactrolelocal.push({
        id: reactMessage.id,
        roles: {},
      });
    } else {
      guildRole[reactMessage.id] = {
        roles: {},
      };
    }

    client.db.reactrole.updateOne(
      { id: reactMessage.id },
      {
        $set: {
          roles: {},
        },
      },
      { upsert: true },
    );
  },
};
