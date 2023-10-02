import { getManager } from './leaderboardManager.js';

export default class Leaderboard {
    constructor() {
        this.manager = getManager();
        this.leaderboard = this.getLeaderboard();
        console.log(JSON.stringify(this.leaderboard));
    }

    getLeaderboard() {
        return this.manager.getLeaderboard();
    }

    addScore(score, playerName) {
        this.leaderboard[playerName] = score;
        this.manager.setLeaderboard(this.leaderboard);
    }
}
