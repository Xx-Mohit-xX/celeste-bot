/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */
function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getRandomIntInclusive(min, max) {
  min = Math.min(min, max);
  max = Math.max(max, min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const Discord = require('discord.js');

module.exports = {
  name: 'roll',
  description: 'name',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    const num1 = msgArr[1];
    const num2 = msgArr[2];
    if (!num1) { message.reply('Please enter a first number'); return; }
    if (!num2) { message.reply('Please enter a second number'); return; }

    const embedA = new Discord.MessageEmbed()
      .setTitle('Roll result:')
      .setDescription(getRandomIntInclusive(num1, num2))
      .setColor('#5b4194')
      .setTimestamp();
    message.channel.send({ embed: embedA });
  },
};
