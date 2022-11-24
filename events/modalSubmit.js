const {
	Events,
	ModalSubmitInteraction
} = require("discord.js");

module.exports = {
	name: 'modalSubmit',
	once: false,
	/** @param {ModalSubmitInteraction} modal */
	async execute(modal){
		modal.reply("any thing");
	}
}

