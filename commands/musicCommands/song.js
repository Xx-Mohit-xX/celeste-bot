const Discord = require("discord.js");

module.exports = {
  name: 'song',
  description: 'Displays the now playing song',
  aliases: 'nowplaying',
  usage: 'song',
  execute: async (client, message, config) => {

        const args = message.content.slice(1).trim().split(/ +/g);

        let song = await client.player.nowPlaying(message.guild.id);

        if(song.name == undefined) return message.say('No song curently playing')

        return message.say(`Current song: ${song.name}`);
}

}