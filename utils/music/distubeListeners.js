const Discord = require("discord.js");
module.exports = (distube, status) => {
  distube.on('playSong', (message, queue, song) => {
      const embed = new Discord.MessageEmbed();
      embed.setColor('#5b4194');
      embed.setAuthor('🎶 Playing 🎶')
      embed.setTitle(`${song.name}`)
      embed.setURL(`${song.url}`)
      embed.addFields(
        { name: 'Requested By', value: `${song.user}`, inline: true },
        { name: 'Duration', value: `\`${song.formattedDuration}\``, inline: true },
        { name: 'Queue', value: `\`${queue.songs.length}\``, inline: true },
        { name: 'Volume', value: `\`${queue.volume}%\``, inline: true },
        { name: 'Loop', value: `\`${queue.repeatMode ? queue.repeatMode === 2 ? 'All Queue' : 'This Song' : 'Off'}\``, inline: true },
        { name: 'Autoplay', value: `\`${queue.autoplay ? 'On' : 'Off'}\``, inline: true },
        { name: 'Filters', value: `\`${queue.filter || 'Off'}\`` }
      )
      embed.setThumbnail(song.thumbnail)
      message.channel.send(embed);
  })
    .on('addSong', (message, queue, song) => {
      const embed = new Discord.MessageEmbed();
      embed.setColor('#5b4194');
      embed.setAuthor('🎶 Song Added 🎶');
      embed.setTitle(song.name);
      embed.setURL(song.url);
      embed.setThumbnail(song.thumbnail);
      embed.setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue`);
      embed.addField('Requested By', song.user);
      message.channel.send(embed);
    })
    .on('playList', (message, queue, playlist, song) => {

      const embed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setAuthor('🎶 Playing Playlist 🎶')
      .setTitle(playlist.name)
      .setURL(playlist.url)
      .setThumbnail(song.thumbnail)
      .setDescription('Now playing', `${song.name} - \`${song.formattedDuration}\``)
      try {
      let i = 0;
      playlist.songs.forEach(song => {
        const { name } = song;
        embed.addField('Name', name)
        i++;
        if (i === 5) throw(err);
      });
    } catch(err) {}
      message.channel.send(embed);
  })
    .on('addList', (message, queue, playlist) => {
      const embed = new Discord.MessageEmbed()
      .setColor('#5b4194')
      .setAuthor('🎶 Added Playlist 🎶')
      .setTitle(playlist.name)
      .setURL(playlist.url)
      .setDescription(`Added ${playlist.songs.length} songs to the queue!`);
      message.channel.send(embed);
    })
    // DisTubeOptions.searchSongs = true
    .on('searchResult', (message, result) => {
      let i = 0;
      message.channel.send(`**Choose an option from below**\n\n${result.map((song) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join('\n')}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on('searchCancel', (message) => message.channel.send('Searching canceled'))
    .on('error', (message, e) => {
      console.error(e);
      message.channel.send(`An error encountered: ${e}`);
    });
};
