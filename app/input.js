class Input {
    eventQueue = [];

    init(){
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        this.eventQueue = [];
    }

    handleKeyDown(event){
        if (!arrayKey.includes(event.key)){
            return;
        }

        this.eventQueue.push(event);
    }

    getCurrentQueue() {
        return this.eventQueue;
    }

    removeFromQueue(event) {
        let index = this.eventQueue.indexOf(event); 
        this.eventQueue.pop(index);
    }
}

const arrayKey = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "é", "ç"];

export default Input
