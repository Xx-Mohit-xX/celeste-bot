module.exports = {
  name: 'skip',
  description: 'skip music',
  aliases: [],
  usage: 'skip',
  admin: false,
  execute: async (client, message, config, distube) => {
    distube.skip(message);
  },
};
