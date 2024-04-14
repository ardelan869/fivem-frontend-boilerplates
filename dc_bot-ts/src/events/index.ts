import { Event } from '../utils/index.js';
import ready from './ready.js';
import interactionCreate from './interactionCreate.js';

export default [ready, interactionCreate] as Event[];
