const Discord = require("discord.js");

module.exports = {
  name: 'progress',
  description: 'How much of the song has been sung',
  aliases: 'progress',
  usage: 'progress',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        let progressBar = client.player.createProgressBar(message.guild.id, {
            size: 15,
            block: '=',
            arrow: '>'
        });
        if(progressBar)
            message.channel.send(progressBar);
}

}