const filterList = ['3d', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'bassboost'];

module.exports = {
  name: 'filters',
  description: 'bassboost music',
  aliases: filterList,
  usage: filterList.join('/'),
  admin: false,
  execute: async (client, message, config, distube) => {
    const msgArr = message.content.split(' ');
    const command = msgArr[0].slice(1);
    if (command.toLowerCase() === 'filters') {
      message.channel.send(`Filter list:\n\n${filterList.map((filter) => `> ${filter}`).join('\n')}`);
      return;
    }
    const filter = distube.setFilter(message, command);
    message.channel.send(`Current queue filter: ${filter || 'Off'}`);
  },
};
