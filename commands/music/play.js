module.exports = {
  name: 'play',
  description: 'Play music',
  aliases: [],
  usage: 'play <music name>',
  admin: false,
  execute: async (client, message, config, distube) => {
    const msgArr = message.content.split(' ');
    distube.play(message, msgArr.slice(1).join(' '));
  },
};
