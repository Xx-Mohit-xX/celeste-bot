const Discord = require("discord.js");

module.exports = {
  name: 'volume',
  description: 'Set the bot\'s volume',
  aliases: 'vol',
  usage: 'volume 1-100',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        let isDone = client.player.setVolume(message, parseInt(args[1]));
        if(isDone)
            message.channel.send(`Volume set to ${args[1]}%!`);
}

}
