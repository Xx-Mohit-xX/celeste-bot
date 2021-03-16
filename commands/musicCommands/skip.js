const Discord = require("discord.js");

module.exports = {
  name: 'skip',
  description: 'Skips the current song',
  aliases: 'skip',
  usage: 'skip',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        let song = client.player.skip(message);

        if(song)
            message.channel.send(`${song.name} was skipped!`);
}

}