import basicWords from './sources/words.js'

export default class Provider{
    getOneWord() {
        const word = basicWords[Math.floor((Math.random() * basicWords.length) + 1)];
        console.log(word);
        
        return word;
    }
}
