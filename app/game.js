import Input from './input.js';
import Provider from './provider.js';
import Score from './score.js';
import Leaderboard from './leaderboard.js';

export default class Game {
    init() {
        this.inputSystem = new Input();
        this.provider = new Provider();
        this.scoreSystem = new Score();
        this.leaderboard = new Leaderboard();

        this.enteriesContainer = document.getElementById('enteries');

        this.inputSystem.init();
        this.scoreSystem.init();

        this.currentWord = this.provider.getOneWord()
        this.wordArray = new Array(this.currentWord.length).fill('_')
        this.leaderboard.renderLeaderboard();
        this.renderArray(this.wordArray);

        setInterval(() => {
            this.inputSystem.getCurrentQueue().forEach((event) => {
                this.inputSystem.removeFromQueue(event);
                this.handleKeyEvent(event);
            })
        }, 300);
    }

    handleKeyEvent(event) {
        if (!this.currentWord.includes(event.key)){
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

    renderArray(wordArray){
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

    finishRound() {
        this.currentWord = this.provider.getOneWord();
        this.scoreSystem.updateScore();

        this.leaderboard.addScore(this.scoreSystem.getScore(), this.getCurrentPlayer());

        this.wordArray = new Array(this.currentWord.length).fill('_');
        this.renderArray(this.wordArray);
    }

    getCurrentPlayer() {
        if (this.currentPlayer) {
            return this.currentPlayer;
        }

        this.currentPlayer = '!Change Me!';

        return this.currentPlayer;

        //TODO 

        this.currentPlayer = window.prompt('Entrez votre nom : ');
        
        if (this.currentPlayer.split === "") {
            this.getCurrentPlayer();
        }

        return this.currentPlayer;
    }
}
