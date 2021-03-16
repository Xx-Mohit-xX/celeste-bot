// This is the starting point of the bot
const { Client, Collection } = require('discord.js');
const fs = require('fs');
const DisTube = require('distube');
const { Player } = require('discord-music-player');

const { token } = require('./config');
const distubeListeners = require('./utils/music/distubeListeners');

const client = new Client({ partials: ['GUILD_MEMBER', 'CHANNEL', 'MESSAGE', 'REACTION', 'USER'] });
client.commands = new Collection();

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || 'Off'}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
distubeListeners(distube, status);

client.on('ready', () => {
  client.guilds.cache.forEach((server) => {
    console.log(`${server.name} (id: ${server.id})`);
  });
  client.user.setStatus('online');
  client.user.setActivity('with island info | ;help', { type: 'PLAYING' });
});

const importAllFiles = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) { console.log(err); return; }
    files.forEach((file) => {
      if (file.endsWith('.js')) {
        const props = require(`${dir}${file}`);
        console.log(`Successfully loaded ${props.name}`);
        client.commands.set(props.name, props);
        client.commands.set(props.aliases, props);
      } else if (fs.lstatSync(`${dir}${file}/`).isDirectory()) {
        importAllFiles(`${dir}${file}/`);
      }
    });
  });
};

importAllFiles('./commands/');

fs.readdir('./events/', (err, files) => {
  if (err) { console.error(); return; }
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    const evtName = file.split('.')[0];
    console.log(`Event: ${evtName} loaded!`);
    client.on(evtName, (...args) => evt(client, distube, ...args));
  });
});
client.login(token);

module.exports = client;
