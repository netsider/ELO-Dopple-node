// Made by Russell Rounds

// Node Modules
const http = require("http");
const fs = require("fs");

// NPM Modules
const express  = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const sizeOf = require("image-size");

console.log("Starting...");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(port);

const namePath = "Dopples/Actress_Name/";
const scorePath = "Dopples/Actress_Score/";
const photoPath  = "Dopples/Actress_Picture/";
const dirLength = fs.readdirSync(namePath).length;
const k = 32;
let maxPlayers = 2;
let playerArray = [];
let newPlayers = [];
let playerOne = 1;
let playerTwo = 1;
playerArray[0] = {};
playerArray[0].lockPlayer = false;

// To Do:
// Decide/learn how to make form logic non-global, so app could support many users (checkbox will be checked for all users if one checks it). See: https://stackoverflow.com/questions/39339640/access-current-req-object-everywhere-in-node-js-express
// Eliminate namePath and only have photoPath and scorePath, since there's no need for a name variable, or make it optional.  
// Make score pop up as an on-screen overlay notification.


app.get("/", function(req, res){
	//console.log("Serving / ...");
	console.log("-------------------------------- New Game --------------------------------");
	//console.log("playerArray[0]: ");
	//console.log(playerArray[0]);
	
	// Form logic -------------------------------------------------------
	// let playerIsLocked = 0;
	// if(playerArray[0].winner != undefined){ // Answer button pressed
		// if(playerArray[0].lockPlayer === true && playerArray[0].resetPressed === false){ // Make the rest like this
			// console.log("Answer button pressed and lockPlayerCheckBox CHECKED (players locked!)");
			// playerArray[0].lockPlayer = true;
		// }
		// if(playerArray[0].lockPlayer === false && playerArray[0].resetPressed === false){
			// console.log("Answer button pressed. lockPlayerCheckBox NOT checked");
			// playerArray[0].lockPlayer = false;
		// }
	// }else{
		// console.log("Answer button not pressed!");
	// }
	
	// if(playerArray[0].lockPlayer === false && playerArray[0].resetPressed === true){
		// console.log("Reset pressed, lockPlayerCheckBox NOT checked.");
		// playerArray[0].lockPlayer = false;
	// }
	
	// if(playerArray[0].lockPlayer === true && playerArray[0].resetPressed === true){
		// console.log("Reset pressed, lockPlayerCheckBox CHECKED.");
		// playerArray[0].lockPlayer = true;
	// }
	
	// Player Selection -------------------------------------------------------
	if(playerArray[0].lockPlayer === true){
		//console.log("Players locked!"); 
		
		if(playerArray[0].lastPlayerOne !== undefined){
			//console.log("winner/loser chosen, but players locked.");
			playerOne = playerArray[0].lastPlayerOne;
			playerTwo = playerArray[0].lastPlayerTwo;
		}else if(playerArray[0].resetPressed === true){
			//console.log("reset pressed, but player locked.");
			playerOne = playerArray[0].lastPlayerOne;
			playerTwo = playerArray[0].lastPlayerTwo;
		}
		
	}else{
		//console.log("Players NOT locked!"); 
		
		let obj = fs.readdirSync(namePath);
		let dlength = fs.readdirSync(namePath).length - 1;

		playerOne = obj[getRandomIntInclusive(0, dlength)];
		playerOne = playerOne.substring(0, playerOne.length - 4);
		//console.log("playerOne: " + playerOne);
		
		playerTwo = obj[getRandomIntInclusive(0, dlength)];
		playerTwo = playerTwo.substring(0, playerTwo.length - 4);
		//console.log("playerTwo: " + playerTwo);
		
		while(playerOne === playerTwo){
			playerTwo = obj[getRandomIntInclusive(0, dlength)];
			playerTwo = playerTwo.substring(0, playerTwo.length - 4);
		}
		
		if(playerArray[0].winner !== undefined){
			//console.log("winner/loser chosen, players NOT locked.");
				while(playerArray[0].winner === playerOne || playerArray[0].loser === playerOne || playerOne === playerTwo){
					//console.log("Choosing new Player...");
					playerOne = obj[getRandomIntInclusive(0, dlength)];
					playerOne = playerOne.substring(0, playerOne.length - 4);
				}
				
				while(playerArray[0].winner === playerTwo || playerArray[0].loser === playerTwo || playerOne === playerTwo){
					//console.log("Choosing new Player...");
					playerTwo = obj[getRandomIntInclusive(0, dlength)];
					playerTwo = playerTwo.substring(0, playerTwo.length - 4);
				}
			
		}else{
			//console.log("NO winner/loser chosen, players NOT locked.");
		}
	}
	
	//console.log("playerOne: " + playerOne);
	//console.log("playerTwo: " + playerTwo);
	
	const playerOneNamePath = namePath + playerOne + ".txt";
	const playerTwoNamePath = namePath + playerTwo + ".txt";
	
	const playerOneScorePath = scorePath + playerOne + ".txt";
	const playerTwoScorePath = scorePath + playerTwo + ".txt";
	
	const playerOneImage = photoPath + playerOne + ".jpg";
	const playerTwoImage = photoPath + playerTwo + ".jpg";
	
	// Calculate original aspect ratio of pictures
	const dimensions1 = sizeOf(playerOneImage);
	const dimensions2 = sizeOf(playerTwoImage);
	const aspectRatioP1 = getAspectRatio(dimensions1.width, dimensions1.height);
	const aspectRatioP2 = getAspectRatio(dimensions2.width, dimensions2.height);
	
	let playerOneName = "Namefile Not Found";
	if(fs.existsSync(playerOneNamePath)){
		playerOneName = fs.readFileSync(playerOneNamePath).toString();
	}
		
	let playerTwoName = "Namefile Not Found";
	if(fs.existsSync(playerTwoNamePath)){
		playerTwoName = fs.readFileSync(playerTwoNamePath).toString();
	}
		
	let playerOneScore = 0;
	if(fs.existsSync(playerOneScorePath)){
		playerOneScore = Number(fs.readFileSync(playerOneScorePath));
	}
		
	let playerTwoScore = 0;
	if(fs.existsSync(playerTwoScorePath)){
		playerTwoScore = Number(fs.readFileSync(playerTwoScorePath));
	}
	
	let playerOneELO = (ELO(playerOneScore, playerTwoScore) * 100).toPrecision(4);
	let playerTwoELO = (ELO(playerTwoScore, playerOneScore) * 100).toPrecision(4);
		
	newPlayers[0] = [];
	newPlayers[1] = [];
	
	newPlayers[0][0] = playerOne;
	newPlayers[0][1] = playerOneName;
	newPlayers[0][2] = playerOneScore;
	newPlayers[0][3] = playerOneELO;
	newPlayers[0][4] = aspectRatioP1;
	
	newPlayers[1][0] = playerTwo;
	newPlayers[1][1] = playerTwoName;
	newPlayers[1][2] = playerTwoScore;
	newPlayers[1][3] = playerTwoELO;
	newPlayers[1][4] = aspectRatioP2;

	//Debugging:
	//logArray(newPlayers);
	//console.log("newPlayers: ");
	//console.log(newPlayers);
	//console.log(playerArray[0]);
	//logArray(playerArray[0]);
    	
	res.render("node-dopple-main", {playerArray: playerArray, newPlayers: newPlayers});
	playerArray[0].resetPressed = false;
	
});

app.post("/submitPlayer", function(req, res){
	//console.log("Serving /node-dopple-main (post) ..");
	//console.log("----req.body----");
	//logArray(req.body);
	
	let unserialized = JSON.parse(req.body.playerName);
	let winner = unserialized[0].toString();
	let loser = unserialized[1].toString();
	
	let winnerScoreFile = "Dopples/Actress_Score/" + winner + ".txt";
	let loserScoreFile = "Dopples/Actress_Score/" + loser + ".txt";
	
	let winnerOldScore = Number(fs.readFileSync(winnerScoreFile));
	let loserOldScore = Number(fs.readFileSync(loserScoreFile));

	let winnerELO = ELO(winnerOldScore, loserOldScore);
	let loserELO = ELO(loserOldScore, winnerOldScore);
	
	// ELO score distribution
	let winnerNewScore = winnerOldScore + (k * (1 - winnerELO));
	let loserNewScore = loserOldScore + (k * (0 - loserELO));
	let winnerNewELO = ELO(winnerNewScore, loserNewScore);
	let loserNewELO = ELO(loserNewScore, winnerNewScore);
	
	let winnerNamePath = namePath + winner + ".txt";
	let loserNamePath = namePath + loser + ".txt";
	
	let winnerName = fs.readFileSync(winnerNamePath).toString();
	let loserName = fs.readFileSync(loserNamePath).toString();
	
	fs.writeFileSync(winnerScoreFile, String(winnerNewScore));
	fs.writeFileSync(loserScoreFile, String(loserNewScore));
	
	let winnerLoserObject = {winner: winner, loser: loser, winnerName: winnerName, loserName: loserName, winnerOldScore: winnerOldScore, loserOldScore: loserOldScore, winnerELO: winnerELO, loserELO: loserELO, winnerNewScore: winnerNewScore, loserNewScore: loserNewScore, winnerNewELO: winnerNewELO, loserNewELO: loserNewELO};
	
	playerArray[0] = winnerLoserObject; //playerArray.push(winnerLoserObject);
	
	// Form Logic --------
	playerArray[0].lastPlayerOne = req.body.playerOneHidden;
	playerArray[0].lastPlayerTwo = req.body.playerTwoHidden;
	playerArray[0].resetPressed = false;
	if(Number(req.body.lockPlayer) === 1){
		playerArray[0].lockPlayer = true;
	}else{
		playerArray[0].lockPlayer = false;
	}
	// Form Logic -------
	
	console.log(winnerLoserObject);
	
	res.redirect("/");
});

app.post("/resetScores", function(req, res){
	console.log("Resetting Scores...");
	//console.log("----req.body----");
	//logArray(req.body);
	
	// Form Logic --------
	playerArray[0].lastPlayerOne = req.body.playerOneHidden;
	playerArray[0].lastPlayerTwo = req.body.playerTwoHidden;
	playerArray[0].resetPressed = true;
			
	if(Number(req.body.lockPlayer) === 1){
		playerArray[0].lockPlayer = true;
	}else{
		playerArray[0].lockPlayer = false;
	}
	// Form Logic --------
		
	let scoreDirContents = fs.readdirSync(scorePath);
	let scorePathLength = (fs.readdirSync(scorePath).length);
	//console.log("scorePathLength: " + scorePathLength);
	//console.log("scoreDirContents: " + scoreDirContents);
	
	let startingScore = "0";
	for (let i = 0; i < scorePathLength; i++) {
		let scoreFileTemp1 = scorePath + scoreDirContents[i];
		console.log("Resetting " + scoreFileTemp1);
		fs.writeFileSync(scoreFileTemp1, startingScore);
		if(scorePathLength - 1 === i){
			console.log("All " + scorePathLength +  " score files reset!");
		}
	}
	
	//console.log(playerArray);
	res.redirect("/");
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
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}

function logArray(theArray){
	Array.from(Object.keys(theArray)).forEach(function(key){
		console.log(key + ": " + theArray[key]);
	});
};