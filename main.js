let wordIndex = 0;

let turn = 0;
let score = [0, 0];


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
    if (wordIndex >= ALL_WORDS.length) {
        // Reshuffle and reset.
        ALL_WORDS = shuffle(ALL_WORDS);
        wordIndex = 0;
    }

    return ALL_WORDS[wordIndex++];
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
    setCurrWord(ALL_WORDS[0]);
}


main();
