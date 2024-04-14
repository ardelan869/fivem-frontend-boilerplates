import { event, Events, ExtendedInteraction } from '../utils/index.js';
import { ExtendedClient } from '../utils/commands.js';

export default event(
	Events.InteractionCreate,
	async ({ log, client }, interaction) => {
		if (interaction.isChatInputCommand()) {
			const command = (client as ExtendedClient).commands.get(
				interaction.commandName,
			);

			if (!command)
				return log(
					`No command matching ${interaction.commandName} was found.`,
				);

			await command.callback(interaction as ExtendedInteraction, client);
		}
	},
);
