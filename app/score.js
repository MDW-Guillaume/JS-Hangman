export default class Score {
    constructor() {
        this.score = 0;
        this.scoreContainer = document.querySelector('.score #container');

        this.showScore();
    }

    init() {
        this.difficultyMap = {}

        document.querySelectorAll('.difficulty').forEach((el) => {
            this.difficultyMap[el.innerText] = el.getAttribute('value');
            el.addEventListener('click', (event) => {
                this.difficultyMap = event.target.value;
            })
        });

        console.log(this.difficultyMap);
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
