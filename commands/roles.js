const {
  SlashCommandBuilder,
  EmbedBuilder,
  Interaction
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("show all roles of this server"),
  
  /** @param {Interaction} inter */
  async execute(inter){
    let embed = new EmbedBuilder()
      .setTitle(inter.guild.name)
      .setThumbnail(inter.guild.iconURL() ?? inter.user.avatarURL())
      .setFooter({
        text: "Powred by HAsTe",
        iconURL: inter.client.user.avatarURL()
      });
    await inter.reply({embeds: [embed]});
  }
}

