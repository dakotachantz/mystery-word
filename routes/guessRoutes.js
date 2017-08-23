const express = require("express");
const guessRoutes = express.Router();
const game = require("../game-logic/gameVar");
const func = require("../game-logic/gameFuncs");

guessRoutes.post("/", (req, res) => {
    let guess = req.body.guess.toUpperCase();

    let validLetter = /^[A-Za-z]+$/;

    if (guess.length < 1) {
        // promptLetter();
        console.log("please enter a letter to guess");
    } else if (guess.length > 1) {
        // promptEnter1Letter();
        console.log("please only enter one letter at a time");
    } else if (func.isNotCorrect(guess)) {
        func.saveGuess(guess);
    } else {
        func.displayLetterAtPosition(guess);
    }
    game.displayArray.join(" ");
    game.guessArray.join(" ");
    res.redirect("/game");
});

module.exports = guessRoutes;