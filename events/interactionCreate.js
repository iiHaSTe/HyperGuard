const {Events, Interaction} = require("discord.js");

module.exports = {
	name: Events.InteractionCreate,

	/** @param {Interaction} interaction */
	async execute(interaction){
		if (interaction.isModalSubmit()){
			try {
				const modalScript = interaction.client.commands.get(interaction.customId);
				if (!modalScript) return;
				await modalScript.execute(interaction);
			}catch (error){
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
			return;
		}

		const command = interaction.client.commands.get(interaction.commandName);
		if (!interaction.isChatInputCommand()) return;
		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
}

