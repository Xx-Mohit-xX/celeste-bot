const Discord = require("discord.js");

module.exports = {
  name: 'resume',
  description: 'Resumes the paused queue.',
  usage: 'resume',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        let song = client.player.resume(message);
        if(song)
            message.channel.send(`${song.name} was resumed!`);

}

}