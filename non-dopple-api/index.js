// ELO-Node-Regular-Voting-App-API
// Made by Russell Rounds
// Version 0.1
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Make start button to generate players first?

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Domain request comes from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.type('json');
  next();
})

app.get("/", (req, res, next) => {
	// res.json( {Data: "JSON Data."} );
});

// app.post("/submitPlayer", bodyParser.json(), (req, res, next) => { // If you don't use app.use(bodyParser.json());
app.post("/submitPlayer", (req, res, next) => {
	console.log("/submitPlayer");
	
	// Request
	console.log(req.body);
	
	
	// Response
	let newObj = { "data": req.body };
	res.json(newObj);
	// res.json(req.body);
});

function ELO(A, B){
	return 1 / (1 + Math.pow(10,((B - A)/400)));
};
function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
};
