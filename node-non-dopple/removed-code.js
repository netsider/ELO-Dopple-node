function generateFixedPlayers(player_One, player_Two){
	let playerOne = player_One.toString();
	let playerTwo = player_Two.toString();
	
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

	let newPlayers = [];
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
	
	return newPlayers;
};

function generateRandomPlayers(winner, loser){
	let playerOne = obj[getRandomIntInclusive(0, dlength)];
	playerOne = playerOne.substring(0, playerOne.length - 4);
	let playerTwo = obj[getRandomIntInclusive(0, dlength)];
	playerTwo = playerTwo.substring(0, playerTwo.length - 4);
	
	if(winner !== null || loser !== null){  // Inputting null as params allows duplicates
		console.log("Null!");
		while(winner === playerOne || loser === playerOne || playerOne === playerTwo){
			playerOne = obj[getRandomIntInclusive(0, dlength)];
			playerOne = playerOne.substring(0, playerOne.length - 4);
		}
		while(winner === playerTwo || loser === playerTwo || playerOne === playerTwo){
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

	let newPlayers = [];
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
	
	return newPlayers;
};



&& playerArray.length && Array.isArray(playerArray) && 



<%
if(playerArray[0].lockPlayer !== undefined && playerArray[0].lockPlayer === true){ %>



<% }else{ %>

	<div style="width: 50%; display: inline-block;"><img height="<%= playerOneImgHeight %>px" width="<%= newImgWidth %>px" src="<%= playerOneImage %>" name="playerImage" value="<%= playerOneImage %>"><img height="<%= playerTwoImgHeight %>px" width="<%= newImgWidth %>px" src="<%= playerTwoImage %>" name="playerImage" value="<%= playerTwoImage %>"></div>
	<form action="/node-dopple-main" method="POST">
	<p><button type="submit" name="playerName" value="<%= playerOneIsWinnerArray %>">I think <%= playerOneName %> is better</button></p>
	<p><button type="submit" name="playerName" value="<%= playerTwoIsWinnerArray %>">I think <%= playerTwoName %> is better</button></p>

<%	 }; %>



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