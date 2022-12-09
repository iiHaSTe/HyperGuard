require("dotenv").config();
const {
    Events, Client, GatewayIntentBits, Collection
} = require("discord.js");
const fs = require("node:fs");
const path = require("node:path")

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ]
});
client.commands = new Collection();
client.modals = new Collection();

// loads slash commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

// loads events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// loads modals scripts
const modalsPath = path.join(__dirname, 'modals');
const modalsFiles = fs.readdirSync(modalsPath, ).filter(file => file.endsWith('.js'));

for (const file of modalsFiles) {
    const filePath = path.join(modalsPath, file);
    const modalScript = require(filePath);

    if ("targetId" in modalScript && "execute" in modalScript){
        client.modals.set(modalScript.targetId, modalScript);
    } else {
        console.log(`[WARNING] The modal script at ${filePath} is missing a required "targetId" or "execute" property.`);
    }
}

client.login(process.env.TOKEN);
