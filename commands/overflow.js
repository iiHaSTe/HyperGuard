const {
  SlashCommandBuilder,
  Interaction,
  EmbedBuilder
} = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("overflow")
    .setDescription("ask question we will find an anwser in https://stackoverflow.com/")
    .addStringOption(opt => opt
      .setName("query")
      .setDescription("what's your problem")
      .setRequired(true)),
  
  /** @param {Interaction} inter */
  async execute(inter){
    const title = inter.options.getString("query");
    
    const req = await axios.get("https://api.stackexchange.com/2.2/search/advanced", {
      params: {
        order: "desc",
        sort: "activity",
        site: "stackoverflow",
        title
      }
    });
    const anwsers = req.data.items.sort((d1, d2)=>d2.answer_count-d1.answer_count);
    let res = [];
    let maxAnwsers = anwsers.length > 10 ? 10 : anwsers.length;
    let i = 0;
    for (const anwser of anwsers) {
      if (i===(maxAnwsers-1)) break;
      res.push({
        inline: false,
        name: `__anwsers count:__ ${anwser.answer_count}`,
        value: `link: __${anwser.link}__`
      });
      i++;
    }
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(anwsers.length !== 0 ? `Over than ${anwsers.length} anwser` : `No anwser for your question`)
      .setThumbnail(inter.guild.iconURL())
      .setColor([255, 255, 0])
      .addFields(res)
      .setFooter({
        text: "Powred by "+inter.client.user.username,
        iconURL:  inter.client.user.avatarURL()
      });
    await inter.reply({embeds: [embed]});
  }
}
