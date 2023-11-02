import basicWords from './sources/words.js'

export default class Provider{
    getOneWord(level = null) {
        let word;

        if (!level){
            word = basicWords[Math.floor((Math.random() * basicWords.length) + 1)];
        } else {
            word = basicWords[Math.floor((Math.random() * basicWords.length) + 1)];
        }
        
        return word;
    }

    getWordWithMaxLength(level) {
        let word;
        let min;
        let max;
        switch (level) {
            case '1':
                min = 0;
                max = 5;
                break;
            case '2':
                min = 6;
                max = 9;
                break;
            case '3':
                min = 10;
                max = 100;
                break;
        
            default:
                break;
        }

        do {
            word = this.getOneWord();    
        } while (word.length < min || word.length > max)
            
        return word;
    }
}
