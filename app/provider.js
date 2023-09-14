import basicWords from './sources/words.js'

export default class Provider{
    getOneWord() {
        return basicWords[Math.floor((Math.random() * basicWords.length) + 1)];
    }
}
