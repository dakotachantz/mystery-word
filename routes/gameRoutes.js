const express = require("express");
const gameRoutes = express.Router();
const game = require("../game-logic/gameVar");
const func = require("../game-logic/gameFuncs");

gameRoutes.get("/", (req, res) => {
    res.render("game", { game: game });
});

module.exports = gameRoutes;