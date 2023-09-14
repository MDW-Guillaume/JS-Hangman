import Input from "./app/input.js";
import Provider from "./app/provider.js";

const inputSystem = new Input();
const provider = new Provider();

inputSystem.init()

const oneWord = provider.getOneWord()

function generateCompletionArray(oneWord){

    let wordArray = new Array(oneWord.length).fill('_');

    let enteriesContainer = document.getElementById('enteries');

    // Crée les éléments div avec la classe "enteries__element" et le contenu '<span>_</span>'
    for (let i = 0; i < wordArray.length; i++) {
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('enteries__element');
    
        const spanElement = document.createElement('span');
        spanElement.textContent = '_';
    
        elementDiv.appendChild(spanElement);
        enteriesContainer.appendChild(elementDiv);
    }
    
    return wordArray;
}

console.log(oneWord)
generateCompletionArray(oneWord)