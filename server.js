const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const sessionConfig = require("./sessionConfig");
const gameFuncs = require("./game-logic/gameFuncs");

const app = express();
const port = process.env.PORT || 7777;
const fs = require("fs");
const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");



// TEMPLATING ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

// GAME LOGIC
let game = {};
let guessCounter = 8;
let mysteryWord;
let guessArray = [];
let displayArray = [];
let userDisplayGuessed = " ";
let answerArray = [];

const randomWord = () => {
    return words[Math.floor(Math.random() * 234936)].toUpperCase().split("");
}

const startGame = () => {
    mysteryWord = randomWord();
    console.log(mysteryWord);

    for (let i = 0; i < mysteryWord.length; i++) {
        displayArray.push("_");
    }
    console.log(displayArray);

    game = {
        guessCounter: guessCounter,
        mysteryWord: mysteryWord,
        guessArray: guessArray,
        displayArray: displayArray,
    }
    return game;
}

game = {
    guessCounter: guessCounter,
    mysteryWord: mysteryWord,
    guessArray: guessArray,
    displayArray: displayArray,
}

const resetGame = () => {
    //do stuff
}

startGame();

// ROUTES
app.get("/", (req, res) => {
    res.render("home");
});

app.post("/", (req, res) => {
    res.render("game", { game: game });
});

app.get("/game", (req, res) => {
    res.render("game", { game: game });
});

app.post("/guess", (req, res) => {
    let guess = req.body.guess.toUpperCase();

    let validLetter = /^[A-Za-z]+$/;

    if (guess.length < 1) {
        // promptLetter();
        console.log("please enter a letter to guess");
    } else if (guess.length > 1) {
        // promptEnter1Letter();
        console.log("please only enter one letter at a time");
    } else if (isNotCorrect(guess)) {
        saveGuess(guess);
    } else {
        displayLetterAtPosition(guess);
    }
    game.displayArray.join(" ");
    game.guessArray.join(" ");
    res.redirect("/game");
});

function isNotCorrect(guess) {
    return mysteryWord.indexOf(guess) < 0;
}

function saveGuess(guess) {
    game.guessArray.push(guess);
    game.guessCounter -= 1;
    console.log(game.guessCounter);
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


// LISTEN
app.listen(port, () => {
    console.log('Server running on PORT:', port);
});

module.exports = game;