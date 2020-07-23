



if(playerArray[0].lockPlayer !== undefined && playerArray[0].lockPlayer === true){ %>


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