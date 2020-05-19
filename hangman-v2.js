const body=document.querySelector("body"),hangmanParts=document.querySelectorAll(".hangman__body-part"),correctLettersRow=document.querySelector(".hangman__letters-container"),incorrectLettersRow=document.querySelector(".hangman__incorrect-letters"),hangmanStatusMessage=document.querySelector(".hangman__message"),game={incorrectLetters:[],correctLetterIndexes:[],enteredLetters:[],init(){word=this.generateWord(),game.buildCorrectLetterList(),body.addEventListener("keydown",e=>{let t=e.key.toLowerCase();e.keyCode>=65&&e.keyCode<=90&&!this.enteredLetters.includes(t)&&!0!==this.endGame&&(this.enteredLetters.push(t),game.manageInput(t))})},buildCorrectLetterList(){correctLettersRow.innerHTML="",letters=word.toLowerCase().split("");for(let e=0;e<letters.length;e++)correctLettersRow.innerHTML+='<p class="hangman__letters"></p>'},manageInput(e){if(letters.includes(e))for(let t=0;t<letters.length;t++)e===letters[t]&&(this.correctLetterIndexes.push(t),this.updateCorrectLettersUI(e,t));else this.incorrectLetters.push(e),this.updateIncorrectLettersUI(e)},updateIncorrectLettersUI(e){for(1===this.incorrectLetters.length?incorrectLettersRow.insertAdjacentText("beforeend",e):this.incorrectLetters.length>1?incorrectLettersRow.insertAdjacentText("beforeend",", "+e):incorrectLettersRow.innerText="",i=0;i<this.incorrectLetters.length;i++)hangmanParts[i].classList.add("hangman__body-part--show");if(this.incorrectLetters.length===hangmanParts.length){hangmanParts.forEach(e=>{e.classList.add("hangman__body-part--red")}),this.endGame=!0,hangmanStatusMessage.innerHTML='You just killed a guy. Redo? <i class="hangman__redo fa fa-undo"></i>',document.querySelector(".hangman__redo").addEventListener("click",()=>{this.redo()})}else 0===this.incorrectLetters.length&&hangmanParts.forEach(e=>{e.classList.remove("hangman__body-part--show","hangman__body-part--red")})},updateCorrectLettersUI(e,t){let r=document.querySelectorAll(".hangman__letters");for(let n=0;n<r.length;n++)0===this.correctLetterIndexes.length?r[n].innerText="":r[t].innerText=e;r.forEach(e=>{if(this.correctLetterIndexes.length===letters.length){e.classList.add("hangman__letters--green"),this.endGame=!0,hangmanStatusMessage.innerHTML='Yay, you won! New game? <i class="hangman__new-game fa fa-undo"></i>',document.querySelector(".hangman__new-game").addEventListener("click",()=>{this.newGame()})}else 0===this.correctLetterIndexes.length&&e.classList.remove("hangman__letters--green")})},redo(){hangmanStatusMessage.innerHTML="",this.incorrectLetters=[],this.correctLetterIndexes=[],this.enteredLetters=[],this.updateCorrectLettersUI(),this.updateIncorrectLettersUI(),this.endGame=!1},newGame(){this.redo(),this.init()},generateWord(){let e=["abruptly","awkward","bagpipes","bandwagon","beekeeper","blizzard","bookworm","buckaroo","buffoon","buzzing","buzzwords","cockiness","croquet","daiquiri","dizzying","dwarves","embezzle","espionage","fishhook","fixable","flapjack","flopping","fluffiness","foxglove","frizzled","fuchsia","galvanize","glowworm","grogginess","haphazard","iatrogenic","jackpot","jawbreaker","jazziest","jiujitsu","jogging","jukebox","keyhole","kilobyte","kiwifruit","microwave","mnemonic","mystify","nightclub","nowadays","numbskull","peekaboo","pneumonia","puzzling","quixotic","razzmatazz","rhubarb","rickshaw","schnapps","scratch","strength","strengths","stretch","stronghold","syndrome","thriftless","thumbscrew","transcript","vaporize","voyeurism","wellspring","whiskey","whizzing","whomever","witchcraft","wristwatch","xylophone","yachtsman","youthful","zigzagging"];return e[Math.floor(Math.random()*Math.floor(e.length))]}};game.init();