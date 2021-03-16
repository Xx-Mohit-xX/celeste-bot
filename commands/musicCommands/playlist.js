const Discord = require("discord.js");

module.exports = {
  name: 'playlist',
  description: 'Add a playlist.',
  aliases: 'playlist',
  usage: 'playlist',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        
        let isPlaying = client.player.isPlaying(message);
        // If maxSongs is -1, will be infinite.
        let playlist = await client.player.playlist(message, {
            search: args.join(' '),
            maxSongs: 20
        }).catch(error => {
            return message.channel.send(error.message);
        });

        // Send information about adding the Playlist to the Queue
        message.channel.send(`Added a Playlist to the queue with **${playlist.videoCount} songs**, that was **made by ${playlist.author}**.`)

}

}