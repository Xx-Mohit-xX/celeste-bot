/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
const Discord = require("discord.js");
module.exports = {
  name: 'lookup',
  aliases: 'li',
  description: 'lookup',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    try {
    if(message.author.id === '620196347890499604' || message.member.hasPermission('MANAGE_ROLES')) {
    const list = await client.db.islandinfo.find().toArray();
    if (!msgArr[1]) {
      message.channel.send('You must provide a name!');
      return;
    }
    const username = msgArr[1];
    const matches = [];
    list.forEach((member) => {
      if (member.name) {
        if (member.name.toLowerCase().includes(username.toLowerCase())) {
          const userdata = message.guild.members.cache.get(member.id);
          const usertag = userdata ? userdata.user.tag : 'Unknown User';
          let userdatastring = '';
          userdatastring += `| **Name**: ${member.name} `;
          if (member.moreinfo) {
            const fc = member.moreinfo.find((u) => u.name === 'Friend Code');
            userdatastring += fc ? `| **Friend Code**: ${fc.description} ` : '| Friend Code: None ';
          }
          matches.push(`> ${usertag} ${userdatastring}`);
        }
      }
    });
    const listEmbed = new Discord.MessageEmbed();
    listEmbed.addField('Lookup Matches', `${matches.slice(0, 30).join('\n')}`);
    message.channel.send({embed: listEmbed}).catch((error) => {
      message.channel.send('There are too many matches to display.');
    });
  } else {
    message.channel.send('You do not have permission to run this command.');
  }
} catch(err) {
  message.channel.send('No matches found.')
}

  },
};
