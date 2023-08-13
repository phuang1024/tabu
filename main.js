let wordIndex = -1;

let turn = 1;
let score = [0, 0];
let timeLeft = 0;
let timerRun = null;


function shuffle(array) {
    // from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function getNextWord() {
    if (wordIndex < 0 || wordIndex >= ALL_WORDS.length) {
        // Reshuffle and reset.
        ALL_WORDS = shuffle(ALL_WORDS);
        wordIndex = 0;
    }

    return ALL_WORDS[wordIndex++];
}

function startGame() {
    setPlaying(true);
    turn = 1 - turn;
    timeLeft = 60;
    timer();
    timerRun = setInterval(timer, 1000);
    setCurrWord(getNextWord());
}

function timer() {
    document.getElementById("timeLeft").innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerRun);
        setPlaying(false);
    }
    timeLeft--;
}


// hide everything and show start button if not playing
function setPlaying(playing) {
    let get = (id) => document.getElementById(id);
    if (playing) {
        get("currWord").style.display = "block";
        get("buttons").style.display = "flex";
        get("startButton").style.display = "none";
        get("timer").style.display = "block";
    } else {
        get("currWord").style.display = "none";
        get("buttons").style.display = "none";
        get("startButton").style.display = "block";
        get("timer").style.display = "none";
    }

    // this is reversed bc we highlight the next player
    if (turn == 1) {
        document.getElementById("score0").style.color = "lightgreen";
        document.getElementById("score1").style.color = "gray";
    } else {
        document.getElementById("score0").style.color = "gray";
        document.getElementById("score1").style.color = "lightgreen";
    }
}

// `word` is array of length 7.
// Elements are (timestamp, word, forbidden1, ...)
function setCurrWord(word) {
    document.getElementById("targetWord").innerHTML = word[1];
    for (let i = 0; i < 5; i++) {
        document.getElementById("tabu" + i).innerHTML = word[i + 2];
    }
    console.log(score);
    document.getElementById("score0").innerHTML = score[0];
    document.getElementById("score1").innerHTML = score[1];
}

function playNextWord(skipped) {
    let word = getNextWord();
    let change = skipped ? -1 : 1;
    score[turn] += change;
    setCurrWord(word);
}


function main() {
    setPlaying(false);
    setCurrWord(ALL_WORDS[0]);
}


main();
