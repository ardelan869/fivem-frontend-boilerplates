import { getEnvVar } from './utils/index.js';

export const Keys = {
	appId: getEnvVar('APP_ID'),
	clientToken: getEnvVar('CLIENT_TOKEN'),
	guildId: getEnvVar('GUILD_ID'),
} as const;

export default Keys;
