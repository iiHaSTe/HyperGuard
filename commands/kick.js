const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits: Permission,
  User,
  Interaction
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick someone")
    .addUserOption(opt => opt
      .setName("user")
      .setDescription("someone you want to kick")
      .setRequired(true))
    .addStringOption(opt => opt
      .setName("reason")
      .setDescription("just anwser for this question \"why you want to kick this guy?\"")
      .setRequired(false))
    .setDefaultMemberPermissions(Permission.KickMembers)
    .setDMPermission(false),

  /** @param {Interaction} inter */
  async execute(inter){
    /** @type {User} */
    let user = inter.options.getUser("user");
    let reason = inter.options.getString("reason") ?? "no reason";

    let embed = new EmbedBuilder()
      .setTitle(inter.guild.name)
      .setThumbnail(inter.guild.iconURL() ?? inter.client.user.avatarURL())
      .setDescription(`this guy <@${user.id}> are bad but not enough..\njust kick him :athletic_shoe:`)
      .setColor([255, 0, 0])
      .setFooter({
        text: "Powred by "+inter.client.user.username,
        iconURL: inter.client.user.avatarURL()
      });

    await inter.reply({embeds: [embed]});
    await inter.guild.members.kick(user, reason);
    await inter.channel.send(`>>> **${user.username}** are kicked :athletic_shoe:
**id:** || ${user.id} ||
**reason:** ${reason}
**at:** ${new Date().toDateString()}`);
  }
}





