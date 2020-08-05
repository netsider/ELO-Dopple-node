// ELO-Node-Regular-Voting-App-API
// Made by Russell Rounds
// Version 0.1
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const k = 32;

// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, () => console.log(`Listening on port ${port}`));

// Make start button to generate players first?

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Request domain
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.type('json');
  next();
})

app.get("/", (req, res, next) => {
	// res.json( {Data: "JSON Data."} );
});

// app.post("/submitPlayer", bodyParser.json(), (req, res, next) => { // If you don't use app.use(bodyParser.json());
app.post("/submitPlayer", (req, res, next) => {
	let winnerELO = 0;
	let loserELO = 0;
	let winnerNewScore = 0;
	let loserNewScore = 0;
	let playerOneNewScore = 0;
	let playerTwoNewScore = 0;

	let playerOne = req.body.playerOne;
	let playerTwo = req.body.playerTwo;
	
	let playerOneOldScore = Number(req.body.scoreOne);
	let playerTwoOldScore = Number(req.body.scoreTwo);
	
	let winner = req.body.winner;
	let loser = "playerTwo";
	
	let playerOneELO = ELO(playerOneOldScore, playerTwoOldScore);
	let playerTwoELO = ELO(playerTwoOldScore, playerOneOldScore);
	
	if(winner === "playerOne"){
		winnerELO = playerOneELO;
		loserELO = playerTwoELO;
		winnerOldScore = playerOneOldScore;
		loserOldScore = playerTwoOldScore;
		winnerNewScore = winnerOldScore + (k * (1 - winnerELO));
		loserNewScore = loserOldScore + (k * (0 - loserELO));
		playerOneNewScore = winnerNewScore;
		playerTwoNewScore = loserNewScore;
	}else{
		winnerELO = playerTwoELO;
		loserELO = playerOneELO;
		winnerOldScore = playerTwoOldScore;
		loserOldScore = playerOneOldScore;
		winnerNewScore = winnerOldScore + (k * (1 - winnerELO));
		loserNewScore = loserOldScore + (k * (0 - loserELO));
		playerOneNewScore = loserNewScore;
		playerTwoNewScore = winnerNewScore;
		loser = "playerOne";
	}
	
	let playerOneNewELO = ELO(playerOneNewScore, playerTwoNewScore);
	let playerTwoNewELO = ELO(playerTwoNewScore, playerOneNewScore);
	
	console.log("winner: " + winner);
	console.log("loser: " + loser);
	console.log("playerOneELO: " + playerOneELO);
	console.log("playerOneNewELO: " + playerOneNewELO);
	console.log("playerTwoELO: " + playerTwoELO);
	console.log("playerTwoNewELO: " + playerTwoNewELO);
	console.log("playerOneOldScore: " + playerOneOldScore);
	console.log("playerTwoOldScore: " + playerTwoOldScore);
	console.log("playerOneNewScore: " + playerOneNewScore);
	console.log("playerTwoNewScore: " + playerTwoNewScore);
	

	// Request
	console.log(req.body);
	
	
	// Response
	let newObj = { "data": req.body };
	res.json(newObj);
});

function ELO(A, B){
	return 1 / (1 + Math.pow(10,((B - A)/400)));
};
function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
};
