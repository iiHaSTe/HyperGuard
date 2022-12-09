const { EmbedBuilder } = require("@discordjs/builders");
const { Events, GuildMember } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    /** @param {GuildMember} ev */
    async execute(ev){
        const {
            user,
            guild,
            client
        } = ev;
        const embed = new EmbedBuilder()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL() ?? client.user.avatarURL())
            .setImage(user.avatarURL() ?? guild.iconURL() ?? client.user.avatarURL())
            .setDescription(`Hi ${user.username}`)
            .setColor([255, 255, 0])
            .setFooter({
                text: "Powred by "+client.user.username,
                iconURL: client.user.iconURL
            });
        const welcomeChannel = await guild.channels.fetch("1050417373196324906");
        /** @type {MessagePayload} */
        const sendOptions = {
            content: `<@${user.id}>`,
            embeds: [embed]
        }
        await user.send(sendOptions)
        await welcomeChannel.send(sendOptions);
    }
}

