import { Client, GatewayIntentBits } from 'discord.js';
import { ExtendedClient, registerEvents } from './utils/index.js';
import { registerCommands } from './utils/index.js';
import Events from './events/index.js';
import Commands from './commands/index.js';
import Keys from './keys.js';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildModeration,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildVoiceStates
	],
});

registerEvents(client, Events);
registerCommands(client as ExtendedClient, Commands)

client.login(Keys.clientToken).catch((err) => {
	console.error('[Login Error]', err);
	process.exit(1);
});
