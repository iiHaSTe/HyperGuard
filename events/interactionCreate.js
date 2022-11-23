const {Events} = require("discord.js");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction){
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

