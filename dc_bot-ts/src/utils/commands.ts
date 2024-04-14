import {
	SlashCommandBuilder,
	Awaitable,
	Client,
	Collection,
	REST,
	Routes,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
	CommandInteraction,
	CommandInteractionOptionResolver,
} from 'discord.js';
import Keys from '../keys.js';

export interface ExtendedInteraction extends CommandInteraction {
	options: CommandInteractionOptionResolver;
}

export type CommandCallback = (
	interaction: ExtendedInteraction,
	client: Client,
) => Awaitable<unknown>;

export interface Command {
	data: SlashCommandBuilder;
	callback: CommandCallback;
}

export interface ExtendedClient extends Client {
	commands: Collection<string, Command>;
}

export function command(
	data: SlashCommandBuilder,
	callback: CommandCallback,
): Command {
	return { data, callback };
}

export function registerCommands(client: ExtendedClient, commands: Command[]) {
	client.commands = new Collection();
	const deploys: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];

	for (const command of commands) {
		if ('data' in command && 'callback' in command) {
			deploys.push(command.data.toJSON());
			client.commands.set(command.data.name, command);
		}
	}

	const rest = new REST({ version: '10' }).setToken(Keys.clientToken);

	rest.put(Routes.applicationGuildCommands(Keys.appId, Keys.guildId), {
		body: deploys,
	});
}
