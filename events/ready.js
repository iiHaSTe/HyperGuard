const {Events} = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client){
  	console.log(`I'm ready woooooha ${client.user.username}`);
	}
}
