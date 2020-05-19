const body = document.querySelector('body');
const hangmanParts = document.querySelectorAll(".hangman__body-part");
const correctLettersRow = document.querySelector('.hangman__letters-container');
const incorrectLettersRow = document.querySelector('.hangman__incorrect-letters');
const hangmanStatusMessage = document.querySelector('.hangman__message');

// TODO reveal button

const game = {
    incorrectLetters: [],
    correctLetterIndexes: [],
    enteredLetters: [],

    init() {
        word = this.generateWord();

        game.buildCorrectLetterList();

        body.addEventListener('keydown', e => {
            let input = e.key.toLowerCase();

            if ((e.keyCode >= 65 && e.keyCode <= 90) && !this.enteredLetters.includes(input) && this.endGame !== true) {
                this.enteredLetters.push(input);

                game.manageInput(input);
            }
        });
    },

    buildCorrectLetterList() {
        correctLettersRow.innerHTML = '';

        letters = word.toLowerCase().split("");

        for (let i = 0; i < letters.length; i++) {
            correctLettersRow.innerHTML += '<p class="hangman__letters"></p>';
        }
    },

    manageInput(input) {
        if (letters.includes(input)) {
            for (let i = 0; i < letters.length; i++) {
                if (input === letters[i]) {
                    this.correctLetterIndexes.push(i);

                    this.updateCorrectLettersUI(input, i);
                }
            }
        } else {
            this.incorrectLetters.push(input);

            this.updateIncorrectLettersUI(input);
        }
    },

    updateIncorrectLettersUI(input) {
        if (this.incorrectLetters.length === 1) {
            incorrectLettersRow.insertAdjacentText("beforeend", input);
        } else if (this.incorrectLetters.length > 1) {
            incorrectLettersRow.insertAdjacentText("beforeend", ", " + input);
        } else {
            incorrectLettersRow.innerText = '';
        }

        for (i = 0; i < this.incorrectLetters.length; i++) {
            hangmanParts[i].classList.add("hangman__body-part--show");
        }

        if (this.incorrectLetters.length === hangmanParts.length) {
            hangmanParts.forEach(part => {
                part.classList.add("hangman__body-part--red")
            });

            this.endGame = true;

            hangmanStatusMessage.innerHTML = 'You just killed a guy. Redo? <i class="hangman__redo fa fa-undo"></i>';

            let redoButton = document.querySelector('.hangman__redo');

            redoButton.addEventListener('click', () => {
                this.redo();
            });
        } else if (this.incorrectLetters.length === 0) {
            hangmanParts.forEach(part => {
                part.classList.remove("hangman__body-part--show", "hangman__body-part--red");
            });
        }
    },

    updateCorrectLettersUI(input, index) {
        let correctLetterElements = document.querySelectorAll('.hangman__letters');

        for (let i = 0; i < correctLetterElements.length; i++) {
            if (this.correctLetterIndexes.length === 0) {
                correctLetterElements[i].innerText = '';
            } else {
                correctLetterElements[index].innerText = input;
            }
        };

        correctLetterElements.forEach(element => {
            if (this.correctLetterIndexes.length === letters.length) {
                element.classList.add('hangman__letters--green');

                this.endGame = true;

                hangmanStatusMessage.innerHTML = 'Yay, you won! New game? <i class="hangman__new-game fa fa-undo"></i>';

                let newGameButton = document.querySelector('.hangman__new-game');

                newGameButton.addEventListener('click', () => {
                    this.newGame();

                });
            } else if (this.correctLetterIndexes.length === 0) {
                element.classList.remove('hangman__letters--green');
            }
        });
    },

    redo() {
        hangmanStatusMessage.innerHTML = '';

        this.incorrectLetters = [];
        this.correctLetterIndexes = [];
        this.enteredLetters = [];

        this.updateCorrectLettersUI();
        this.updateIncorrectLettersUI();

        this.endGame = false;
    },

    newGame() {
        this.redo();
        this.init();
    },

    generateWord() {
        let wordList = ["abruptly", "awkward", "bagpipes", "bandwagon", "beekeeper", "blizzard", "bookworm", "buckaroo", "buffoon", "buzzing", "buzzwords", "cockiness", "croquet", "daiquiri", "dizzying", "dwarves", "embezzle", "espionage", "fishhook", "fixable", "flapjack", "flopping", "fluffiness", "foxglove", "frizzled", "fuchsia", "galvanize", "glowworm", "grogginess", "haphazard", "iatrogenic", "jackpot", "jawbreaker", "jazziest", "jiujitsu", "jogging", "jukebox", "keyhole", "kilobyte", "kiwifruit", "microwave", "mnemonic", "mystify", "nightclub", "nowadays", "numbskull", "peekaboo", "pneumonia", "puzzling", "quixotic", "razzmatazz", "rhubarb", "rickshaw", "schnapps", "scratch", "strength", "strengths", "stretch", "stronghold", "syndrome", "thriftless", "thumbscrew", "transcript", "vaporize", "voyeurism", "wellspring", "whiskey", "whizzing", "whomever", "witchcraft", "wristwatch", "xylophone", "yachtsman", "youthful", "zigzagging"];

        return wordList[Math.floor(Math.random() * Math.floor(wordList.length))];
    }
};

game.init();
