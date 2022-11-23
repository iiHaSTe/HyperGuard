const {
  SlashCommandBuilder,
  Interaction,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("show server info"),
  
  /** @param {Interaction} inter */
  async execute(inter){
    let embed = new EmbedBuilder()
      .setTitle(inter.guild.name)
      .setThumbnail(inter.guild.iconURL() ?? inter.client.user.avatarURL)
      .setImage(inter.guild.iconURL())
      .addFields([
        {
          inline: true,
          name: "**Server id** :id:",
          value: inter.guild.name
        },
        {
          inline: true,
          name: "**Owner** 👑",
          value: `<@${inter.guild.ownerId}>`
        },
        {
          inline: true,
          name: "**Created at** :clock:",
          value: inter.guild.createdAt.toDateString()
        },
        {
          "inline": true,
          "name": "**members** 👥",
          "value": `>>> **Users** :bust_in_silhouette:: ${inter.guild.memberCount-14}
**Bots** :robot:: 14
**All** : ${inter.guild.memberCount}`
        },
        {
          inline: true,
          name: "**Channels** 🗂️",
          value: `>>> **Text channels** :speech_balloon:: ${inter.guild.channels.channelCountWithoutThreads - inter.guild.channels.cache.filter(c => c.isVoiceBased()).size}
**Voice channels** 🔊: ${inter.guild.channels.cache.filter(c => c.isVoiceBased()).size} 
**Total #** : ${inter.guild.channels.channelCountWithoutThreads}`
        }
      ])
      .setColor([255, 255, 0])
      .setFooter({
        text: "Powred by "+inter.client.user.username,
        iconURL: inter.client.user.iconURL
      });
    await inter.reply({embeds: [embed]});
  }
}






