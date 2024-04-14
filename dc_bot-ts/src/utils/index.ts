export * from './env.js';
export * from './events.js';
export * from './commands.js';
export * from './database.js';

export const addZero = (i: number): number | string => (i < 10 ? `0${i}` : i);
