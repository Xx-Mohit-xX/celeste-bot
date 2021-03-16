const Discord = require("discord.js");

module.exports = {
  name: 'repeat',
  description: 'toggles repeat mode',
  aliases: 'repeat',
  usage: 'repeat',
  execute: async (client, message, config) => {

     const args = message.content.slice(1).trim().split(/ +/g);

     let toggle = client.player.toggleLoop(message);
        
        if(toggle === null)
            return;
        // Send a message with the toggle information
        else if (toggle)
            message.channel.send('I will now repeat the current playing song.');
        else message.channel.send('I will not longer repeat the current playing song.');
}

}