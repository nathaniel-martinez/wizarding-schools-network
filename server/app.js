const express = require("express");
const path = require("path");
const cors = require("cors");
const volleyball = require("volleyball");
const apiRouter = require("./api/index.js");
const app = express();

// static middleware
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(cors());
app.use(volleyball);

app.use("/api", apiRouter);

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "src", "index.html"));
});

module.exports = app;
