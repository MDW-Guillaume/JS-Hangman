import basicWords from './sources/words.js'

export default class Provider{
    getOneWord() {
        return 'dab';

        const word = basicWords[Math.floor((Math.random() * basicWords.length) + 1)];
        console.log(word);
        
        return word;
    }

    getWordWithMaxLength(length) {
        let word;
        do {
            word = this.getOneWord();    

        } while (word.length > length)
            
        return word;
    }
}
