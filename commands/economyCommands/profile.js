/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */

const Canvas = require('canvas');
const Discord = require('discord.js');

module.exports = {
  name: 'profile',
  description: 'Print profile',
  aliases: 'p',
  execute: async (client, message, config) => {
    const guilddata = await client.db.islandinfo.findOne({
      guildid: message.guild.id,
    });
    const guilddata2 = await client.db.config.findOne({
      id: message.guild.id,
    });
    if (!guilddata2.economy || guilddata2.economy === 'true') {
    const userdata = await client.db.userdata.findOne({ id: message.author.id, guildID: message.guild.id });
    const userdata2 = await client.db.islandinfo.findOne({ id: message.author.id });
    if (userdata) {
      const reference = config.levels.findIndex((level) => level > userdata.exp);
      const currentExp = userdata.exp - config.levels[reference - 1];
      const currentLevel = reference;
      const requiredExp = config.levels[reference] - config.levels[reference - 1];

      Canvas.registerFont('fonts/HYWenHei.ttf', { family: 'HYWenHei', style: 'Heavy', weight: 'Normal' });
      const canvas = Canvas.createCanvas(700, 300);
      const ctx = canvas.getContext('2d');

      let background = await Canvas.loadImage(userdata2.hasPremium === 'true' && userdata2.profileimage ? userdata2.profileimage : 'img/background_2.png').catch((error) => {
        return message.channel.send('Image type is not supported or image link is broken.')
      });
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      background = await Canvas.loadImage('img/profile_overlay.png');
      ctx.drawImage(background, 0, 0, 700, 250);

      ctx.strokeStyle = '#74037b';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // To change the color on the rectangle, just manipulate the context
      ctx.strokeStyle = 'rgba(255, 0, 0, 0)';
      ctx.fillStyle = 'rgb(204, 255, 102)';

      ctx.beginPath();
      ctx.rect(300.8, 93.7, 375.2 * (currentExp / requiredExp), 6.7);
      ctx.closePath();
      ctx.fill();

      // Print name
      ctx.font = '29px HYWenHei';
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.fillText(message.member.displayName, 263, 59);

      // Print exp
      ctx.textAlign = 'end';
      ctx.font = '13px HYWenHei';
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fillText(`${currentExp}/${requiredExp}`, 677, 86.4);

      // Print coins
      ctx.textAlign = 'end';
      ctx.font = '23px HYWenHei';
      ctx.fillStyle = 'rgb(255, 255, 255)';
      ctx.fillText(`${guilddata.currencyname ? guilddata.currencyname : 'Bells'}`, 327, 175)
      ctx.fillText(`${currentLevel+1}`, 670, 136);
      ctx.fillText(`${userdata.coins}`, 670, 175);

      ctx.beginPath();
      ctx.arc(127, 127, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
      ctx.drawImage(avatar, 27, 27, 200, 200);

      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

      message.channel.send(`Here is your profile, ${message.member}!`, attachment);
    } else {
      message.channel.send('You do not have a profile yet!');
    }
  } else {
    return message.channel.send('Economy is disabled on this guild!');
  }
  },
};
