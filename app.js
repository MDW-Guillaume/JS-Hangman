class Input {

    init(){
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }

    handleKeyDown(event){
        if (!arrayKey.includes(event.key)){
            return;
        }
    }
}

const arrayKey = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

inputSystem = new Input();

inputSystem.init()