const express = require("express");
const game = require("../game-logic/gameVar");
const word = require("./wordFunc");

function startGame() {
    mysteryWord = word.randomWord();
    console.log(mysteryWord);

    for (let i = 0; i < mysteryWord.length; i++) {
        game.displayArray.push("_");
    }
    game.displayArray.join(" ");
    return game;
}

function resetGame() {
    //do stuff
}

function isNotCorrect(guess) {
    return mysteryWord.indexOf(guess) < 0;
}

function saveGuess(guess) {
    game.guessArray.push(guess);
    game.guessCounter -= 1;
    if (game.guessCounter === 0) {
        console.log("You ran out of guesses!!!! Would you like to try your luck again?");
    }
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
    startGame: startGame,
    resetGame: resetGame,
    isNotCorrect: isNotCorrect,
    saveGuess: saveGuess,
    displayLetterAtPosition: displayLetterAtPosition
}

