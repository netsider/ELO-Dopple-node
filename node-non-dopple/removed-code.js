



if(playerArray[0].lockPlayer !== undefined && playerArray[0].lockPlayer === true){ %>


<%
if(playerArray[0].lockPlayer !== undefined && playerArray[0].lockPlayer === true){ %>



<% }else{ %>

	<div style="width: 50%; display: inline-block;"><img height="<%= playerOneImgHeight %>px" width="<%= newImgWidth %>px" src="<%= playerOneImage %>" name="playerImage" value="<%= playerOneImage %>"><img height="<%= playerTwoImgHeight %>px" width="<%= newImgWidth %>px" src="<%= playerTwoImage %>" name="playerImage" value="<%= playerTwoImage %>"></div>
	<form action="/node-dopple-main" method="POST">
	<p><button type="submit" name="playerName" value="<%= playerOneIsWinnerArray %>">I think <%= playerOneName %> is better</button></p>
	<p><button type="submit" name="playerName" value="<%= playerTwoIsWinnerArray %>">I think <%= playerTwoName %> is better</button></p>

<%	 }; %>