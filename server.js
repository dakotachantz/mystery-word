const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const sessionConfig = require("./sessionConfig");
const homeRoutes = require("./routes/homeRoutes");
const gameRoutes = require("./routes/gameRoutes");
const guessRoutes = require("./routes/guessRoutes");
const app = express();
const port = process.env.PORT || 7777;

// TEMPLATING ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
// app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

// ROUTES
app.use("/", homeRoutes);
app.use("/game", gameRoutes);
app.use("/guess", guessRoutes);

// LISTEN
app.listen(port, () => {
    console.log('Server running on PORT:', port);
});