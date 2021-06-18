/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');
module.exports = {
  name: 'ban',
  description: 'Bans the user',
  aliases: 'b',
  usage: 'ban/alias <user> <reason (optional)>',
  execute: async (client, message, config) => {
    if (message.author.id !== '620196347890499604' && !message.member.roles.cache.some((r) => config.permissions.moderation.includes(r.id) || message.member.hasPermission(['ADMINISTRATOR']))) { return message.reply('You\'re not allowed to use this command!'); }

    const msgArr = message.content.split(' ');
    const member = message.guild.members.cache.get(msgArr[1]) || message.mentions.members.first()
    if (!member) { return message.channel.send('Member does not exist or is not cached. To ban non-cached user via ID, do ;ban <@ID> [reason]'); }
    if (!member.bannable) { return message.channel.send('You can\'t ban that member!'); }

    let reason = msgArr.slice(2).join(' ');
    if (!reason) reason = 'No Reason Provided';

    await member.send(`You have been banned from '**${message.guild}**' for **${reason}**.`);
    await member.ban()
      .catch((error) => message.reply(`There was an error ${message.author}! Error: ${error}`));
    const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`**${member.user.tag}** was banned by **${message.author}** for '**${reason}**'`);
    await message.channel.send({embed: embed});
  },
};
