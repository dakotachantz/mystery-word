const express = require("express");
const guessRoutes = express.Router();
const game = require("../game-logic/gameVar");
const func = require("../game-logic/gameFuncs");

guessRoutes.post("/", (req, res) => {
    let guess = req.body.guess.toUpperCase();
    if (game.guessArray.indexOf(guess) > -1) {
        return res.render("game", { game: game, errors: ["You already guessed that letter!"] });
    }
    if (func.isNotCorrect(guess)) {
        func.saveGuess(guess);
    } else {
        func.displayLetterAtPosition(guess);
    }
    game.displayArray.join(" ");
    game.guessArray.join(" ");
    res.redirect("/game");
});

module.exports = guessRoutes;