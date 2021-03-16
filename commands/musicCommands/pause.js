const Discord = require("discord.js");

module.exports = {
  name: 'pause',
  description: 'Pauses the song.',
  aliases: 'pause',
  usage: 'pause',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        let song = client.player.pause(message);
        if(song) 
            message.channel.send(`${song.name} was paused!`);
}

}