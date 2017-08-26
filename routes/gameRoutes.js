const express = require("express");
const gameRoutes = express.Router();
const session = require("express-session");
const game = require("../game-logic/gameVar");
const func = require("../game-logic/gameFuncs");

gameRoutes.get("/", (req, res) => {
    if (game.displayArray.join("") === mysteryWord.join("")) {
        let youWin = "You are a master of the words!!!";
        game.gameOver = true;
        return res.render("game", { game: game, youWin: youWin, mysteryWord: mysteryWord });
    }
    if (game.guessCounter === 0) {
        let youLose = "You lose! Better luck next time!!!";
        game.gameOver = true;
        return res.render("game", { game: game, youLose: youLose, mysteryWord: mysteryWord });
    }
    return res.render("game", { game: game });
});

gameRoutes.post("/playagain", (req, res) => {
    func.resetGame();
    return res.redirect("/");
});

module.exports = gameRoutes;