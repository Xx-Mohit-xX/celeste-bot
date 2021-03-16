/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const Discord = require("discord.js");
module.exports = {
  name: 'leaveguild',
  description: 'name',
  execute: async (client, message) => {
    if (message.author.id === "620196347890499604") {
    const msgArr = message.content.split(' ');
    client.guilds.cache.get(msgArr[1]).leave();
    message.channel.send(`Left server **${client.guilds.cache.get(msgArr[1]).name}**.`)
    console.log(`Left guild ${msgArr[1]}`);
  } else {
    message.channel.send('You don\'t have permission to run this command.')
  }
  },
};
