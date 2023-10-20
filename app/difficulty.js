// Initialisation de la difficulté à 2 
// Quand la difficulté est choisie on init game

export default class Difficulty {
    getDifficulty(){
        let actualLevel = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : 0;
        return actualLevel; 
    }

    setDifficulty(level){
        localStorage.setItem('difficulty', level);
        return level;
    }
}