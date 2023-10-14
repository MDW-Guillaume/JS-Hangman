import { getManager } from './leaderboardManager.js';

export default class Leaderboard {
    constructor() {
        this.manager = getManager();
        this.leaderboard = this.getLeaderboard();
        this.leaderboardContainer = document.querySelector('.leaderboard .container tbody');
    }

    getLeaderboard() {
        return this.manager.getLeaderboard();
    }

    addScore(score, playerName) {
        this.leaderboard[playerName] = score;
        this.manager.setLeaderboard(this.leaderboard);
    }

    renderLeaderboard() {
        let remode = document.querySelectorAll('.leaderboard__element');

        remode.forEach((el) => {
            el.remove();
        })

        Object.entries(this.leaderboard).forEach((infos) => {
            console.log(infos);

            const elementDiv = document.createElement('tr');
            elementDiv.classList.add('leaderboard__element');
        
            const spanElement = document.createElement('td');
            spanElement.textContent = infos[0];
        
            const spanElement2 = document.createElement('td');
            spanElement2.textContent = infos[1];
        
            elementDiv.appendChild(spanElement);
            elementDiv.appendChild(spanElement2);
        
            this.leaderboardContainer.appendChild(elementDiv);
        })
    }
}
