const {
  SlashCommandBuilder,
  EmbedBuilder,
  Interaction
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
    await inter.reply("avatar");
  }
}

