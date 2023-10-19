class LeaderboardManager {
    static leaderboardKey = 'leaderboard';

    getLeaderboard() {
        return JSON.parse(localStorage.getItem(LeaderboardManager.leaderboardKey)) ?? [];
    }

    setLeaderboard(leaderboard) {
        localStorage.setItem(LeaderboardManager.leaderboardKey, JSON.stringify(leaderboard));
    }

    removeLeaderboard() {
        localStorage.removeItem(LeaderboardManager.leaderboardKey);
    }
}

export const getManager = () => {
    return new LeaderboardManager();
}
