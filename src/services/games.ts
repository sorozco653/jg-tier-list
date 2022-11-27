import { default as partyGames } from './games.json';

const { games } = partyGames;

export class GameService {
    private games = games;

    constructor(){};
    getGames(){
        return this.games;
    }
};