const fetch = require("node-fetch");
const Discord = require("discord.js");
module.exports = {
  name: 'leave',
  description: 'Leaves the voice channel.',
  execute: async (client, message) => {

        const args = message.content.slice(1).trim().split(/ +/g);

		  if (!message.guild.me.voiceChannel) {
        message.reply("I'm not connected to a voice channel!");
		  } else {
		    message.guild.me.voiceChannel.leave();
		  }

  },
};
