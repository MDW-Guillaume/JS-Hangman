import Input from './input.js';
import Provider from './provider.js';
import Score from './score.js';
import Leaderboard from './leaderboard.js';
import Difficulty from './difficulty.js';

export default class Game {
    init() {
        this.inputSystem = new Input();
        this.provider = new Provider();
        this.scoreSystem = new Score();
        this.leaderboard = new Leaderboard();
        this.difficulty = new Difficulty();

        this.inputSystem.init();
        this.scoreSystem.init();

        let level = this.difficulty.getDifficulty() != 0 ? this.difficulty.getDifficulty() : 1;


        this.difficulty.setDifficulty(level);
        this.launchRound();
        // this.currentWord = this.provider.getWordWithMaxLength(level)
        // this.currentWord = this.provider.getOneWord(level)
        // this.wordArray = new Array(this.currentWord.length).fill('_')
        this.leaderboard.renderLeaderboard();
        // this.renderArray(this.wordArray);

        this.chooseDifficulty()

        setInterval(() => {
            this.inputSystem.getCurrentQueue().forEach((event) => {
                this.inputSystem.removeFromQueue(event);
                this.handleKeyEvent(event);
            })
        }, 300);
    }

    handleKeyEvent(event) {
        if (!this.currentWord.includes(event.key)) {
            return;
        }

        for (let index = 0; index < this.currentWord.length; index++) {
            if (this.currentWord[index] === event.key) {
                this.wordArray[index] = event.key;
            }
        }

        if (!this.wordArray.includes('_')) {
            return this.finishRound()
        }

        this.renderArray(this.wordArray);
    }

    renderArray(wordArray) {
        this.enteriesContainer = document.getElementById('enteries');
        let remode = document.querySelectorAll('.enteries__element');

        remode.forEach((el) => {
            el.remove();
        })

        for (let i = 0; i < wordArray.length; i++) {
            const elementDiv = document.createElement('div');
            elementDiv.classList.add('enteries__element');

            const spanElement = document.createElement('span');
            spanElement.textContent = wordArray[i].toUpperCase();

            elementDiv.appendChild(spanElement);
            this.enteriesContainer.appendChild(elementDiv);
        }

        return wordArray;
    }

    launchRound() {
        let level = this.difficulty.getDifficulty();
        this.currentWord = this.provider.getWordWithMaxLength(level);
        this.wordArray = new Array(this.currentWord.length).fill('_');
        console.log('la', this.currentWord, this.wordArray)
        this.renderArray(this.wordArray);
    }

    finishRound() {
        this.scoreSystem.updateScore();

        this.leaderboard.addScore(this.scoreSystem.getScore(), this.getCurrentPlayer());

        this.leaderboard.renderLeaderboard()

        this.launchRound();
    }

    getCurrentPlayer() {
        if (this.currentPlayer && this.currentPlayer !== '') {
            return this.currentPlayer;
        }

        this.currentPlayer = window.prompt('Entrez votre nom : ');

        if (this.currentPlayer.trim() === "") {
            this.getCurrentPlayer();
        }

        return this.currentPlayer;
    }

    chooseDifficulty() {
        const btns = document.querySelectorAll('.difficulty');

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                let level = this.difficulty.setDifficulty(btn.getAttribute('value'));
                this.launchRound();
            })
        });

        setInterval(() => {
            this.inputSystem.getCurrentQueue().forEach((event) => {
                this.inputSystem.removeFromQueue(event);
                this.handleKeyEvent(event);
            })
        }, 300);

        return;
    }
}
