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
    let allRoles = ">>> ";
    Array.from(inter.guild.roles.cache)
      .sort((role1, role2) => role2[1].rawPosition-role1[1].rawPosition)
      .forEach(role => {
      allRoles += "<@&"+role[0]+">\n";
    });

    let embed = new EmbedBuilder()
      .setTitle(inter.guild.name)
      .setThumbnail(inter.guild.iconURL() ?? inter.user.avatarURL())
      .setDescription(allRoles)
      .setColor([200, 200, 0])
      .setFooter({
        text: "Powred by "+inter.client.user.username,
        iconURL: inter.client.user.avatarURL()
      });
    await inter.reply({embeds: [embed]});
  }
}

