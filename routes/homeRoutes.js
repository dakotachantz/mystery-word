const express = require("express");
const homeRoutes = express.Router();
const game = require("../game-logic/gameVar");
const func = require("../game-logic/gameFuncs");

homeRoutes.get("/", (req, res) => {
    req.session.game = game;
    return res.render("home");
});

homeRoutes.post("/", (req, res) => {
    func.resetGame();
    func.startGame();
    return res.render("game", { game: game });
});


module.exports = homeRoutes;