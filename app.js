import Input from "./app/input.js";
import Provider from "./app/provider.js";

const inputSystem = new Input();
const provider = new Provider();

inputSystem.init()

const oneWord = provider.getOneWord()
let wordArray = new Array(oneWord.length).fill('_');

const enteriesContainer = document.getElementById('enteries');

function handleKeyEvent(event) {
    if (!oneWord.includes(event.key)){
        return;
    }

    for (let index = 0; index < oneWord.length; index++) {
        if (oneWord[index] === event.key) {
          wordArray[index] = event.key;
        }
    }

    renderArray(wordArray);
}

function renderArray(wordArray){
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
        enteriesContainer.appendChild(elementDiv);
    }
    
    return wordArray;
}

setInterval(() => {
    inputSystem.getCurrentQueue().forEach((event) => {
        inputSystem.removeFromQueue(event);
        handleKeyEvent(event);
    })
}, 300)

console.log(oneWord)
renderArray(wordArray)
