const Discord = require("discord.js");

module.exports = {
  name: 'shuffle',
  description: 'Randomizes the songs in the queue',
  aliases: 'shuffle',
  usage: 'shuffle',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        let songs = client.player.shuffle(message);
        if(songs)
            message.channel.send('Server Queue was shuffled.')
}

}