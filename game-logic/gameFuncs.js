const express = require("express");
const game = require("../server");


function isCorrect(guess) {
    return mysteryWord.indexOf(guess) < 0;
}

function saveGuess(guess) {
    game.guessArray.push(guess);
    game.guessCounter -= 1;
    console.log(game.guessCounter);
}

function displayLetterAtPosition(guess) {
    mysteryWord.forEach(function (letter, index) {
        if (guess === letter) {
            game.displayArray[index] = mysteryWord[index];
        }
    });
    game.guessArray.push(guess);
}

module.exports = {
    isCorrect: isCorrect,
    saveGuess: saveGuess,
    displayLetterAtPosition: displayLetterAtPosition
}

