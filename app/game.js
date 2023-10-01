import Input from './input.js';
import Provider from './provider.js';
import Score from './score.js';

export default class Game {
    init() {
        this.inputSystem = new Input();
        this.provider = new Provider();
        this.enteriesContainer = document.getElementById('enteries');
        this.scoreSystem = new Score();

        this.inputSystem.init();

        this.currentWord = this.provider.getOneWord()
        this.wordArray = new Array(this.currentWord.length).fill('_')
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

        this.wordArray = new Array(this.currentWord.length).fill('_');
        this.renderArray(this.wordArray);
    }
}
