const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
const morgan = require("morgan");

app.use("/dist", express.static("dist"));

app.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/movies", (req, res, next) => {
	db.readMovies()
		.then(movies => res.send(movies))
		.catch(next);
});

app.post("/api/movies", (req, res, next) => {
	console.log(req.body);
	db.addMovie()
		.then(movies => res.send(movies))
		.catch(next);
});

const port = process.env.PORT || 3000;

db.sync().then(() => {
	app.listen(port, () => {
		console.log(`listening on port ${port}...`);
	});
});
