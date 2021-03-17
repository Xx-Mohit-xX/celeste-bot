/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
const Discord = require("discord.js");
function titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // You do not need to check if i is larger than splitStr length, as your for does that for you
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   // Directly return the joined string
   return splitStr.join(' ');
}
module.exports = {
  name: 'wish',
  aliases: 'askfor',
  description: 'lookup',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    const guilddata = await client.db.findOne({
      guildid: message.guild.id
    });
    let channelsetting;
    try {
      if (guilddata.moreinfo[1].name === 'guildadopt') {
      channelsetting = 1;
    } else if (guilddata.moreinfo[0].name === 'guildadopt') {
      channelsetting = 0;
    }
  } catch(err) {
    return console.log(`No guild wish setting found for ${message.guild}.`)
  }
  if(!message.member.roles.cache.has(guilddata.moreinfo[channelsetting ^= 1].description)) return;
    if (msgArr[1] === 'adopt') {
      try {
        message.channel.send(`Your villager request for '**${titleCase(msgArr.slice(2).join(' '))}**' is being processed.`);
        const channelid = guilddata.moreinfo[channelsetting ^= 1].description;
        client.channels.cache.get(channelid).send(`${message.member} has asked to adopt '**${titleCase(msgArr.slice(2).join(' '))}**'.`);
      } catch(err) {
        console.log(err.stack);
      }
    } else if (msgArr[1] === 'diy') {
      try {
        message.channel.send(`Your DIY set request '**${titleCase(msgArr.slice(2).join(' '))}**' is being processed.`)
        const channelid = guilddata.moreinfo[channelsetting ^= 1].description;
        client.channels.cache.get(channelid).send(`${message.member} has wished for the DIY set ''**${titleCase(msgArr.slice(2).join(' '))}**'.`);
      } catch(err) {
        console.log(err.stack);
      }
    } else {
        message.channel.send('That is an invalid request!');
    }
  },
};
