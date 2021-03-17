
const Discord = require("discord.js");
const rp = require('random-puppy');
module.exports = {
  name: 'meme',
  description: 'lookup',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    let subreddits;
    if(msgArr[1]) {
      subreddits = [msgArr.slice(1).join(' ')]
    } else {
    subreddits = [
    'AdviceAnimals', 'MemeEconomy', 'ComedyCemetery', 'memes', 'dankmemes', 'PrequelMemes', 'terriblefacebookmemes'
    ]
  }

    const sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    try {
	     rp(sub).then(url=> {
            	message.channel.send(url).catch((error) => {
                message.channel.send('Subreddit not found!');
              });

        });
      } catch(e) {

	 console.log(e);
  };

  },
};
