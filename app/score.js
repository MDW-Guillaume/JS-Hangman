export default class Score {
    constructor() {
        this.score = 0;
        this.scoreContainer = document.querySelector('.score #container');

        this.showScore();
    }

    getScore() {
        return this.score;
    }

    incrementScore() {
        this.score ++;
    }

    showScore() {
        this.scoreContainer.textContent = this.score;
    }

    updateScore() {
        this.incrementScore();
        this.showScore();
    }
}
