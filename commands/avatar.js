const {
  SlashCommandBuilder,
  EmbedBuilder,
  Interaction,
  User
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("get avatar of user")
    .addUserOption(option =>
      option
        .setName("user")
        .setDescription("user you want to get his avatar")
        .setRequired(false)
    ),
  
  /** @param {Interaction} inter */
  async execute(inter){
    /** @type {User} */
    let user = inter.options.getUser("user");
    
    if (user){
      const embed = new EmbedBuilder()
        .setTitle(inter.guild.name)
        .setThumbnail(inter.guild.iconURL() ?? inter.client.user.avatarURL())
        .setDescription(`${user.username} avatar`)
        .setImage(user.avatarURL())
        .setColor([255, 255, 0])
        .setFooter({
          text: "Powred by "+inter.client.user.username,
          iconURL: inter.client.user.avatarURL()
        });
      await inter.reply({embeds: [embed]});
    }else {
      const embed = new EmbedBuilder()
        .setTitle(inter.guild.name)
        .setThumbnail(inter.guild.iconURL() ?? inter.client.user.avatarURL())
        .setDescription(`your avatar`)
        .setImage(inter.user.avatarURL())
        .setColor([255, 255, 0])
        .setFooter({
          text: "Powred by "+inter.client.user.username,
          iconURL: inter.client.user.avatarURL()
        });
      await inter.reply({embeds: [embed]});
    }
  }
}

