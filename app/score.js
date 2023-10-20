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
        let level = localStorage.getItem('difficulty');
        switch (level) {
            case '1':
                this.score++;
                break;
            case '2':
                this.score += 2;
                break;
            case '3':
                this.score += 3;
                break;

            default:
                break;
        }

    }

    showScore() {
        console.log(this.score);
        this.scoreContainer.textContent = this.score;
    }

    updateScore() {
        this.incrementScore();
        this.showScore();
    }

    resetScore() {
        this.score = 0;
        this.showScore();
    }
}
