const wait = require('node:timers/promises').setTimeout;
const {
  SlashCommandBuilder,
  EmbedBuilder,
  User,
  Interaction,
  PermissionFlagsBits: Permission
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("clear some messages")
    .addNumberOption(opt => opt
      .setName("number")
      .setDescription("number of messages you want to delete (default is 10)")
      .setRequired(false))
    .setDefaultMemberPermissions(Permission.ManageMessages)
    .setDMPermission(false),

  /** @param {Interaction} inter */
  async execute(inter){
    const number = inter.options.getNumber("number") ?? 10;

    await inter.channel.bulkDelete(number);
    await inter.reply(`\`\`\`js
${number} is deleted
\`\`\``);
    await wait(2000);
    await inter.deleteReply();
  }
}

