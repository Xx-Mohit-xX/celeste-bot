const Discord = require("discord.js");

module.exports = {
  name: 'play',
  description: 'Bans the user',
  aliases: 'play',
  usage: 'Play <song>',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        if(client.player.isPlaying(message)) {
            let song = await client.player.addToQueue(message, args.join(' '))
                .catch(error => {
                    return message.channel.send(error.message);
                });

            message.channel.send(`Added ${song.name} to queue`);
            return;
        } else {
            let song = await client.player.play(message, args.join(' '))
                .catch(error => {
                    return message.channel.send(error.message);
                });

            message.channel.send(`Started playing ${song.name}`);
            return;
        }


    }
};
