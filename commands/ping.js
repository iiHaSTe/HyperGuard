const {
  SlashCommandBuilder,
  EmbedBuilder,
  Interaction
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("pong"),
  
  /** @param {Interaction} inter */
  async execute(inter){
    const ping = inter.client.ws.ping;
    let emoji = '',
      color;
    if (ping < 100){
      emoji = '😎';
      color = 0x00ff00;
    } else if (ping >= 100 && ping <= 170) {
      emoji = '😐';
      color = 0xff9900;
    } else if (ping > 170 && ping <= 240) {
      emoji = '😢';
      color = 0xff5000;
    } else if (ping > 240 && ping <= 300) {
      emoji = '😭';
      color = 0xff3500;
    } else {
      emoji = '🤬';
      color = 0xff0000;
    }
    const embed = new EmbedBuilder()
      .setTitle(inter.guild.name)
      .setThumbnail(inter.guild.iconURL() ?? inter.client.user.avatarURL())
      .setDescription(`Ponged at ${ping}ms ${emoji}`)
      .setColor(color)
      .setFooter({
        text: "Powred by "+inter.client.user.username,
        iconURL: inter.client.user.avatarURL()
      });

    inter.reply({embeds: [embed]});
  }
}
