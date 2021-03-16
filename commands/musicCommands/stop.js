const Discord = require("discord.js");

module.exports = {
  name: 'stop',
  description: 'Stops the music.',
  aliases: 'stop',
  usage: 'stop',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        let song = await client.player.nowPlaying(message);
        if(song)
            message.channel.send(`Current song: ${song.name}`);

}

}