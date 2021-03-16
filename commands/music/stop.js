module.exports = {
  name: 'stop',
  description: 'stop music',
  aliases: [],
  usage: 'stop',
  admin: false,
  execute: async (client, message, config, distube) => {
    distube.stop(message);
    message.channel.send('Stopped the music!');
  },
};
