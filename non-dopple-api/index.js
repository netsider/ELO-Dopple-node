// ELO-Node-Regular-Voting-App-API
// Made by Russell Rounds
// Version 0.1

const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Domain request comes from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.type('json');
  next();
})

app.get("/", (req, res, next) => {
	// res.json( {Data: "JSON Data."} );
});

// app.post("/submitPlayer", (req, res, next) => { // Results in all kinds of shit
// app.post("/submitPlayer", jsonParser, (req, res, next) => {
app.post("/submitPlayer", bodyParser.json(), (req, res, next) => {
	console.log("/submitPlayer");
	console.log(req.body);
	
	// let testObj = {
		// "data": "Some Data!!!!!!"
	// };
	// res.json(testObj);
	
	let newObj = {
		"data": req.body
	};
	res.json(newObj);
	
	// res.json(req.body);
});
// See how to use PUT, GET, etc, and when.