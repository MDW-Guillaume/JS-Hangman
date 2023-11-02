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

        this.life = 11;

        let level = this.difficulty.getDifficulty() != 0 ? this.difficulty.getDifficulty() : 1;

        this.doneListContainer = document.querySelector('.done-list');
        this.doneList = [];

        this.difficulty.setDifficulty(level);
        this.launchRound();

        this.leaderboard.renderLeaderboard();

        this.updateImage();

        this.chooseDifficulty();

        setInterval(() => {
            this.inputSystem.getCurrentQueue().forEach((event) => {
                this.inputSystem.removeFromQueue(event);
                this.handleKeyEvent(event);
            })
        }, 300);
    }

    renderDoneList() {
        this.doneListContainer.textContent = this.doneList.join(', ');
    };

    handleKeyEvent(event) {
        if (this.life < 0) {
            return;
        }

        if (this.doneList.includes(event.key)) {
            return;
        }

        if (!this.currentWord.includes(event.key)) {
            this.life -= 1;

            this.updateImage();

            if(this.life == 0){
                this.loseRound();
            }
            
            if (!this.doneList.includes(event.key)) {
                this.doneList.push(event.key);
            }

            this.renderDoneList();

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
        console.log(this.currentWord);
        this.wordArray = new Array(this.currentWord.length).fill('_');
        this.renderArray(this.wordArray);
        
        this.life = 11;
        this.updateImage();

        this.doneList = [];
        this.renderDoneList();
    }

    finishRound() {
        this.scoreSystem.updateScore();

        this.leaderboard.addScore(this.scoreSystem.getScore(), this.getCurrentPlayer());

        this.leaderboard.renderLeaderboard();

        this.launchRound();
    }

    loseRound(){
        let losePopup = document.getElementById('losePopup');
        losePopup.style.display = 'flex';

        let restartBtn = losePopup.querySelector('#restartBtn');
        restartBtn.addEventListener('click', () => {
            losePopup.style.display = 'none';
            this.launchRound();
        })
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

    updateImage(){
        let lifeArray = [
            'life-0',
            'life-1',
            'life-2',
            'life-3',
            'life-4',
            'life-5',
            'life-6',
            'life-7',
            'life-8',
            'life-9',
            'life-10',
            'start',
        ];

        let imageContent = document.getElementById('imagePendu')    
        imageContent.src = 'assets/' + lifeArray[this.life] + '.png';
    }
}
