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
        this.leaderboard = this.leaderboard.filter((scores) => 
            scores.playerName !== playerName
        );

        this.leaderboard.push({playerName, score});
        this.manager.setLeaderboard(this.leaderboard);
    }
    
    renderLeaderboard() {
        this.sortLeaderboard()
        let remode = document.querySelectorAll('.leaderboard__element');

        remode.forEach((el) => {
            el.remove();
        })

        let placement = 1;

       this.leaderboard.forEach((infos) => {
            const elementDiv = document.createElement('tr');
            elementDiv.classList.add('leaderboard__element');
        
            const spanElement = document.createElement('td');
            spanElement.textContent = placement;

            const spanElement2 = document.createElement('td');
            spanElement2.textContent = infos.playerName;
        
            const spanElement3 = document.createElement('td');
            spanElement3.textContent = infos.score;
        
            elementDiv.appendChild(spanElement);
            elementDiv.appendChild(spanElement2);
            elementDiv.appendChild(spanElement3);
        
            this.leaderboardContainer.appendChild(elementDiv);
            placement++;
        })
    }

    sortLeaderboard(){
        return this.leaderboard.sort((a, b) => b.score - a.score)
    }
}
