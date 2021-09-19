const Discord = require("discord.js");
const { exec } = require("child_process");
const fs = require("fs");
module.exports = {
  name: 'eval',
  description: 'name',
  execute: async (client, message, config, distube) => {
    if (message.author.id !== "620196347890499604" && message.author.id !== '384920723212468225') return message.channel.send('No.');
    const msgArr = message.content.split(' ').slice(1);
    const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
try {
  const code = msgArr.join(" ");
  let evaled = eval(code);
  if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

  message.channel.send(clean(evaled), {code:"xl"});
} catch (err) {
  message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err.stack)}\n\`\`\``);
}


  },
};
