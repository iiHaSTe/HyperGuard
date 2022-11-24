const {
  SlashCommandBuilder,
  EmbedBuilder,
  Interaction,
  PermissionFlagsBits: Permission,
  User
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban a bad guy")
    .addUserOption(opt => opt
      .setName("user")
      .setDescription("member you want to ban")
      .setRequired(true))
    .setDefaultMemberPermissions(Permission.BanMembers)
    .setDMPermission(false),

  /** @param {Interaction} inter */
  async execute(inter){
    const {guild, options, client} = inter;
    /** @param {User} */
    const user = options.getUser("user");

    let embed = new EmbedBuilder()
      .setTitle(guild.name)
      .setThumbnail(guild.iconURL() ?? client.user.avatarURL())
      .setDescription(`this guy <@${user.id}> are a bad guy ok.. lets ban him >:) :hammer:`)
      .setColor([255, 0, 0])
      .setFooter({
        text: "Powred by "+client.user.username,
        iconURL: client.user.avatarURL()
      });
    await inter.reply({embeds: [embed]});
    await guild.members.ban(user);
    await inter.channel.send(`>>> **${user.username}** are \`banned\` :hammer:
**id:** || ${user.id} ||
**at:** ${new Date().toString()}`);
  }
}

