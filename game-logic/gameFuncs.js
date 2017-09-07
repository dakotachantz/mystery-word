const express = require("express");
const game = require("../game-logic/gameVar");
const word = require("./wordFunc");

function startGame() {
    mysteryWord = word.randomWord();
    for (let i = 0; i < mysteryWord.length; i++) {
        game.displayArray.push("_");
    }
    game.displayArray.join(" ");
    return game;
}

function resetGame() {
    game.displayArray = [];
    game.mysteryWord;
    game.guessArray = [];
    game.guessCounter = 8;
    game.gameOver = false;
}

function isNotCorrect(guess) {
    return mysteryWord.indexOf(guess) < 0;
}

function saveGuess(guess) {
    game.guessArray.push(guess);
    game.guessCounter -= 1;
}

function displayLetterAtPosition(guess) {
    mysteryWord.forEach(function (letter, index) {
        if (guess === letter) {
            game.displayArray[index] = mysteryWord[index];
        }
    });
    return game.guessArray.push(guess);
}

module.exports = {
    startGame: startGame,
    resetGame: resetGame,
    isNotCorrect: isNotCorrect,
    saveGuess: saveGuess,
    displayLetterAtPosition: displayLetterAtPosition
}

