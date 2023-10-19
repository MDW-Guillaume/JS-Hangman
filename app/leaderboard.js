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
        this.sortLeaderboard()
        let remode = document.querySelectorAll('.leaderboard__element');

        remode.forEach((el) => {
            el.remove();
        })

        let placement = 1;

        Object.entries(this.leaderboard).sort().forEach((infos) => {
            const elementDiv = document.createElement('tr');
            elementDiv.classList.add('leaderboard__element');
        
            const spanElement = document.createElement('td');
            spanElement.textContent = placement;

            const spanElement2 = document.createElement('td');
            spanElement2.textContent = infos[0];
        
            const spanElement3 = document.createElement('td');
            spanElement3.textContent = infos[1];
        
            elementDiv.appendChild(spanElement);
            elementDiv.appendChild(spanElement2);
            elementDiv.appendChild(spanElement3);
        
            this.leaderboardContainer.appendChild(elementDiv);
            placement++;
        })
    }

    sortLeaderboard(){
        const sorted = Object.entries(this.leaderboard).sort((a, b) => b[1] - a[1]);

        this.leaderboard = {};

        sorted.forEach((infos) => {
            this.leaderboard[infos[0]] = infos[1];
        })
    }
}
