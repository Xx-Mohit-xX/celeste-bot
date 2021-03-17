/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
function jsUcfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = {
  name: 'clean',
  aliases: 'purge',
  description: 'name',
  execute: async (client, message) => {
    if (message.member.hasPermission("MANAGE_MESSAGES") || message.author.id === "620196347890499604") {
    const msgArr = message.content.split(' ');
    if (msgArr[1]) {
      if(!msgArr[1]) return message.reply ('Error, please define first argument.')
      message.channel.bulkDelete(msgArr[1]);
    } else {
      message.channel.send('You must provide a clear count');
    }
  }
  },
};
