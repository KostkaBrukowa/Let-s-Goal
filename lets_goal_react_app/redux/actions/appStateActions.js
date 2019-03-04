import { SHOW_GAME_INFO } from './types';

export const showGame = (game, field) => ({ type: SHOW_GAME_INFO, payload: { game, field } });
