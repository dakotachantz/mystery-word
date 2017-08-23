const express = require("express");
const homeRoutes = express.Router();
const game = require("../game-logic/gameVar");
const func = require("../game-logic/gameFuncs");

homeRoutes.get("/", (req, res) => {
    res.render("home");
});

homeRoutes.post("/", (req, res) => {
    func.startGame();
    res.render("game", { game: game });
});


module.exports = homeRoutes;