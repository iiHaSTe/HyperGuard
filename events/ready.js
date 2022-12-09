const { Events, Client } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,

	/** @param {Client} client */
	async execute(client){
		const user = client.user
		user.setUsername("HyperGuard");
		user.setStatus("idle");
		
  	    console.log(`I'm ready woooooha ${client.user.username}`);
	}
}
