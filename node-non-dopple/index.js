// Made by Russell Rounds

const http = require("http");
const fs = require("fs");
const express  = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const sizeOf = require("image-size");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const publicDir = "files";
app.use(express.static(__dirname + "/" + publicDir));
app.set("view engine", "ejs");
app.listen(3000);

const scorePath = publicDir + "/Selfie_Score/";
const photoPath  = publicDir + "/Selfies/";
const k = 32;
const startingScore = "0";
const dlength = fs.readdirSync(photoPath).length - 1;
const obj = fs.readdirSync(photoPath);

// Initial setup
if(fs.existsSync(publicDir) !== true) {
	console.log("Public directory not exists! Creating...");
	fs.mkdirSync(publicDir);
}

if(fs.existsSync(scorePath) !== true){
	fs.mkdirSync(scorePath);
	console.log("Score directory not exists! Creating...");
}

if(fs.existsSync(photoPath) !== true) {
	console.log("Photo directory not exists! Creating... (now just put photos into this directory, and you should be good!)");
	fs.mkdirSync(photoPath);
}

console.log("Starting...");

app.get("/", function(req, res){
	//console.log("Serving / ...");
	
	let newPlayers = generatePlayers(null, null, "random");

	res.render("node-dopple-main-new", {newPlayers: newPlayers});
});

app.post("/submitPlayer", function(req, res){
	
	let unserialized = JSON.parse(req.body.playerName);
	let winner = unserialized[0].toString();
	let loser = unserialized[1].toString();
	
	let winnerScoreFile = scorePath + winner + ".txt";
	let loserScoreFile = scorePath + loser + ".txt";
	
	let winnerOldScore = Number(fs.readFileSync(winnerScoreFile));
	let loserOldScore = Number(fs.readFileSync(loserScoreFile));

	let winnerELO = ELO(winnerOldScore, loserOldScore);
	let loserELO = ELO(loserOldScore, winnerOldScore);
	
	let winnerNewScore = winnerOldScore + (k * (1 - winnerELO));
	let loserNewScore = loserOldScore + (k * (0 - loserELO));
	
	let winnerNewELO = ELO(winnerNewScore, loserNewScore);
	let loserNewELO = ELO(loserNewScore, winnerNewScore);
	
	let winnerName = winner + ".jpg";
	let loserName = loser + ".jpg";
	
	fs.writeFileSync(winnerScoreFile, String(winnerNewScore));
	fs.writeFileSync(loserScoreFile, String(loserNewScore));
	
	let winnerLoserObject = {winner: winner, loser: loser, winnerName: winnerName, loserName: loserName, winnerOldScore: winnerOldScore, loserOldScore: loserOldScore, winnerELO: winnerELO, loserELO: loserELO, winnerNewScore: winnerNewScore, loserNewScore: loserNewScore, winnerNewELO: winnerNewELO, loserNewELO: loserNewELO};
	
	let newPlayers = [];
	let playerArray = [];
	playerArray[0] = winnerLoserObject; //playerArray.push(winnerLoserObject);
		
	// Form Logic -------- 
	if(req.body.lockPlayer === "true"){
		playerArray[0].lockPlayer = true;
		newPlayers = generatePlayers(req.body.playerOneHidden, req.body.playerTwoHidden, "fixed");
	}else{
		newPlayers = generatePlayers(winner, loser, "random");
		playerArray[0].lockPlayer = false;
	}
	// Form Logic -------
	
	console.log(winnerLoserObject);
	
	res.render("node-dopple-main-new", {playerArray: playerArray, newPlayers: newPlayers});
});

app.post("/resetScores", function(req, res){
	//console.log("Resetting Scores...");
	
	let scoreDirContents = fs.readdirSync(scorePath);
	let scorePathLength = (fs.readdirSync(scorePath).length);
	
	for (let i = 0; i < scorePathLength; i++) {
		let scoreFileTemp1 = scorePath + scoreDirContents[i];
		console.log("Resetting " + scoreFileTemp1);
		fs.writeFileSync(scoreFileTemp1, startingScore);
		if(scorePathLength - 1 === i){
			console.log("All " + scorePathLength +  " score files reset!");
		}
	}
	
	let playerArray = [];
	playerArray[0] = {};
	let newPlayers = [];
	// Form Logic --------
	playerArray[0].resetPressed = true;
	if(req.body.lockPlayer === "true"){
		newPlayers = generatePlayers(req.body.playerOneHidden, req.body.playerTwoHidden, "fixed");
		playerArray[0].lockPlayer = true;
	}else{
		playerArray[0].lockPlayer = false;
		newPlayers = generatePlayers(null, null, "random");
	}
	// Form Logic --------
	
	res.render("node-dopple-main-new", {playerArray: playerArray, newPlayers: newPlayers});
});

function getAspectRatio(w, h){
	return Number((h / w).toString().substr(0, 4));
};
	
function ELO(A, B){
	return 1 / (1 + Math.pow(10,((B - A)/400)));
};

function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
};
function generatePlayers(p1, p2, method){
	let playerOne = "0";
	let playerTwo = "0";
	
	if(method === "fixed"){
		playerOne = p1.toString();
		playerTwo = p2.toString();
	}else if(method === "random"){
		playerOne = obj[getRandomIntInclusive(0, dlength)];
		playerOne = playerOne.substring(0, playerOne.length - 4);
		playerTwo = obj[getRandomIntInclusive(0, dlength)];
		playerTwo = playerTwo.substring(0, playerTwo.length - 4);
	
		while(p1 === playerOne || p2 === playerOne || playerOne === playerTwo){
			playerOne = obj[getRandomIntInclusive(0, dlength)];
			playerOne = playerOne.substring(0, playerOne.length - 4);
		}
		while(p1 === playerTwo || p2 === playerTwo || playerOne === playerTwo){
			playerTwo = obj[getRandomIntInclusive(0, dlength)];
			playerTwo = playerTwo.substring(0, playerTwo.length - 4);
		}
	}
	
	const playerOneNamePath = photoPath + playerOne + ".txt";
	const playerTwoNamePath = photoPath + playerTwo + ".txt";
	const playerOneScorePath = scorePath + playerOne + ".txt";
	const playerTwoScorePath = scorePath + playerTwo + ".txt";
	const playerOneImage = photoPath + playerOne + ".jpg";
	const playerTwoImage = photoPath + playerTwo + ".jpg";
	const dimensions1 = sizeOf(playerOneImage);
	const dimensions2 = sizeOf(playerTwoImage);
	const aspectRatioP1 = getAspectRatio(dimensions1.width, dimensions1.height);
	const aspectRatioP2 = getAspectRatio(dimensions2.width, dimensions2.height);
	const playerOneName = playerOne + ".jpg";
	const playerTwoName = playerTwo + ".jpg";
	
	let playerOneScore = 0;
	if(fs.existsSync(playerOneScorePath)){
		playerOneScore = Number(fs.readFileSync(playerOneScorePath));
	}else{
		fs.writeFileSync(playerOneScorePath, startingScore);
	}
		
	let playerTwoScore = 0;
	if(fs.existsSync(playerTwoScorePath)){
		playerTwoScore = Number(fs.readFileSync(playerTwoScorePath));
	}else{
		fs.writeFileSync(playerTwoScorePath, startingScore);
	}
	
	let playerOneELO = (ELO(playerOneScore, playerTwoScore) * 100).toPrecision(4);
	let playerTwoELO = (ELO(playerTwoScore, playerOneScore) * 100).toPrecision(4);
	//console.log("Player 1 & 2 ELO Sum (should be 100%): " + (Number(playerTwoELO) + Number(playerOneELO)) + "%");
	
	let newPlayers = [];
	newPlayers[0] = [];
	newPlayers[1] = [];
	
	newPlayers[0][0] = playerOne;
	newPlayers[0][1] = playerOneName;
	newPlayers[0][2] = playerOneScore;
	newPlayers[0][3] = Number(playerOneELO);
	newPlayers[0][4] = aspectRatioP1;
	
	newPlayers[1][0] = playerTwo;
	newPlayers[1][1] = playerTwoName;
	newPlayers[1][2] = playerTwoScore;
	newPlayers[1][3] = Number(playerTwoELO);
	newPlayers[1][4] = aspectRatioP2;	
	
	return newPlayers;
};