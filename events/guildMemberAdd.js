/* eslint-disable max-len */
const generateWelcome = require('../utils/generateWelcome');

module.exports = async (client, distube, member) => {
  const attachment = await generateWelcome(member.user, member.guild);
  const welcomeChannel = member.guild.channels.cache.get(client.guildConfig[member.guild.id] ? client.guildConfig[member.guild.id].channels.welcomeChannel : null);
  if (welcomeChannel) {
    welcomeChannel.send(attachment).catch((error) => {
      welcomeChannel.send('Error sending welcome image.');
      console.log(error.stack);
    });
  }
  const currentDate = Date.now();


  const mute = await client.db.mute.findOne({ id: member.id });
  if (mute) {
    const remainingDuration = mute.duration - (currentDate - mute.start);
    if (remainingDuration < 0) {
      member.roles.remove('771253782809411614');
      client.db.mute.deleteOne({ id: mute.id });
    } else {
      member.roles.add('771253782809411614');
    }
  }

  const ban = await client.db.ban.findOne({ id: member.id });
  if (ban) {
    const remainingDuration = ban.duration - (currentDate - ban.start);
    if (remainingDuration < 0) {
      member.roles.remove('806061686423027732');
      client.db.ban.deleteOne({ id: ban.id });
    } else {
      member.roles.add('806061686423027732');
    }
  }
};
