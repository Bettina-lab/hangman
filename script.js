const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface' , 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];


/*Show the hidden word*/

function displayWord() {
wordElement.innerHTML = `${selectedWord
                                .split('')
                                .map( letter => `
                                <span class="letter">
                                    ${correctLetters.includes(letter) ? letter : ''}
                                </span>
                                `    
                                    )
                                    .join('')
                                }`;

    let innerWord = wordElement.innerText.replace(/\n/g, '')  /**replacethe new line with space */
   /* console.log(wordElement.innerText);*/

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations: You Won!!🔥 🔥 '
        popup.style.display="flex";
    }
};

//Update Wrong letters

function updateWrongLettersEl() {
    //display wrong letters
 wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : '' } 
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
     `;
//console.log(wrongLetters.innerText);
 //display parts
 figureParts.forEach((parts, index) => {
     const errors = wrongLetters.length;
     if(index < errors) {
         parts.style.display = 'block'
     } else {
         parts.style.display = 'none';
     }
 });

 //check if we lost
if(wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. :(';
    popup.style.display = 'flex';
}

}

//show notification 

function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}


//keydown letter press

window.addEventListener('keydown', e => {
    /*console.log(e.keyCode)*/
    const letter = e.key;
    if(e.keyCode >= 65 && e.keyCode<=90) {
       
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        }

    } else {
        if(!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);

            updateWrongLettersEl();
        } else {
            showNotification();
        }
    }
});

//restart game and play again

playAgainBtn.addEventListener('click', () => {
    //empty arays
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none'

});


displayWord();

