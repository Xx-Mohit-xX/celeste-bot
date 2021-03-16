/* eslint-disable max-len */
const initializeGuild = require('../utils/initializeGuild');
const gainExp = require('../utils/gainExp');

module.exports = (client, message) => {
  if (!client.ready) return;
  if (message.author.bot) return;
  const msg = message.content.toLowerCase();
  const commandName = msg.split(' ')[0].substring(1);

  if (!message.member) {
    return;
  }

  const config = client.guildConfig[message.guild.id];

  if (!config) {
    initializeGuild(client, message.guild.id);
    return;
  }

  if (message.content.startsWith(config.prefix)) {
    const command = client.commands.get(commandName);
    if (!client.commands.has(commandName)) return;
    try {
      command.execute(client, message, config);
      console.log(`Processing command: ${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
    } catch (error) {
      console.error(error);
      message.reply('There was an error executing your command!');
    }  
  } else {
    gainExp(client, message, config)
  }

};
