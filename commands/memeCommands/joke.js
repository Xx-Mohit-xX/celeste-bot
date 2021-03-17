
const Discord = require("discord.js");
const rp = require('random-puppy');
module.exports = {
  name: 'joke',
  description: 'lookup',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    const subreddits = [
    'jokes'
    ]

    const sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    try {
	     rp(sub).then(url=> {
            	message.channel.send(url);

        });
      } catch(e) {
	 console.log(e);
  };

  },
};
