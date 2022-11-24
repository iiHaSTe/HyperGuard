const {
	Interaction
} = require("discord.js");

module.exports = {
	targetId: "overflow-search-modal",

	/** @param {Interaction} inter */
	async execute(inter){
		await inter.reply("submited");
	}
}

