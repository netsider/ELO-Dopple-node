// ELO-Node-Regular-Voting-App-API
// Made by Russell Rounds
// Version 0.1

const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.type('json');
  next();
})

app.post("/shit", (req, res, next) => {
	let jsonObj = { "name":"Russ", "age":36, "spouse":null };
	console.log("Server Request/Responst Sent/Received!");
	res.json(jsonObj);
});
// Send to frontend:
// - Player1 + 2 name
// - Aspect Ratio of both pics

// Frontend sends back:
// winner / loser

// Frontend example code:
// From: https://github.com/microsoft/Windows-tutorials-web/blob/master/Single-Page-App-with-REST-API/frontend/Final/public/javascripts/scripts.js
 // $.ajax({
                // url: "http://localhost:8000/guess?card=" + selectedCards[0],
                // type: 'PUT',
                // success: function (response) {
                    // display first card value
                    // $("#" + selectedCards[0] + " .back").html(lookUpGlyphicon(response[0].value));

                    // store the first card value
                    // selectedCardsValues.push(response[0].value);
                // }
            // });
        
		  
		      // fetch the game state from the server 
    // $.get("http://localhost:8000/game", function (response) {
        // store game board size
        // gameBoardSize = response.length;

        // draw the game board
        // drawGameBoard(response);
    // });
// }


// Sample Data:
// {"data": "my_dict[\"data\"] = \"test_value\"\nmy_dict[\"somenumber\"] = 123\nmy_dict[\"a_dict\"][\"asd\"] = \"123\"\nmy_dict[\"a_dict\"][\"qwe\"][0] = 1\nmy_dict[\"a_dict\"][\"qwe\"][1] = 2\nmy_dict[\"a_dict\"][\"qwe\"][2] = 3\nmy_dict[\"a_dict\"][\"nested_dict\"][\"das\"] = 31\nmy_dict[\"a_dict\"][\"nested_dict\"][\"qwe\"] = \"asd\"\n"}