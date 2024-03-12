class Controlls {
    constructor() {
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;

        this.#addKeyboardListeners();
    }

    #addKeyboardListeners() {
        document.onkeydown = (e) => {
            switch(e.key) {
                case 'w':
                    this.forward = true;
                    break;
                case 's':
                    this.backward = true;
                    break;
                case 'a':
                    this.left = true;
                    break;
                case 'd':
                    this.right = true;
                    break;
            }
            console.table(this);
        }

        document.onkeyup = (e) => {
            switch(e.key) {
                case 'w':
                    this.forward = false;
                    break;
                case 's':
                    this.backward = false;
                    break;
                case 'a':
                    this.left = false;
                    break;
                case 'd':
                    this.right = false;
                    break;
            }
            console.table(this);
        }
    }
}