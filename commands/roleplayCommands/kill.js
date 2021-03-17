
const Discord = require("discord.js");
const giphyToken = "SBchkKbjCTGAueJluuoI00Es2mNxqY0K";
const GphApiClient = require("giphy-js-sdk-core");
const giphy = GphApiClient(giphyToken);
module.exports = {
  name: 'kill',
  aliases: '',
  description: 'lookup gif',
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
    var queries = [
    'anime killing',
    'yandere'
  ]
  if(!msgArr[1]) return message.channel.send('Specify a user!');
  const target = message.mentions.members.first();
  if (!target) return ('That\'s not a valid user!');
    var query = queries[Math.round(Math.random() * (queries.length - 1))];
    giphy
      .search("gifs", { q: query })
      .then(response => {
        var totalResponse = response.data.length;
        var responseIndex = Math.floor(Math.random() * 10 + 1) % totalResponse;
        var responseFinal = response.data[responseIndex];
        if (typeof responseFinal.images === "undefined") {
          message.channel.send(`Error! I couldnt find any gifs ${query}`);
          return;
        }
        const embed = new Discord.MessageEmbed()
        .setDescription(`${message.author} is killing ${target}!`)
        .setImage(responseFinal.images.fixed_height.url)
        .setColor('#5b4194')
        message.channel.send(
          {
            embed: embed,
            //files: [responseFinal.images.fixed_height.url]
          }
        );
      })
      .catch(err => {
        const gifCrash = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle("Error")
          .setDescription(`Crash detected!`)
          .addField(
            `Oh No! There was an error looking for a GIF!`,
            `GIF: ${query}`
          )
          .addField("Error Log:", err, true)
          .setTimestamp()
        message.channel.send(gifCrash);
        console.log(`Giphy Error: ${err}`);
      });
  },
};
