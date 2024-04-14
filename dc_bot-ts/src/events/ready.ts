import { event, Events } from '../utils/index.js';

export default event(Events.ClientReady, ({ log }, client) => {
	log(`Logged in as ${client.user.username}!`);
});
