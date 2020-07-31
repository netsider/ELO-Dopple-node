// ELO-Node-Regular-Voting-App-API
// Made by Russell Rounds
// Version 0.1

const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Domain request comes from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.type('json');
  next();
})

app.get("/", (req, res, next) => {
	res.json( {Data: "JSON Data!"} );
});

app.post("/submitPlayer", (req, res, next) => {
	console.log("/submitPlayer");
	console.log("Req.url: " + req.url);
	console.log("Req.complete: " + req.complete);
	console.log("Req.statusCode: " + req.statusCode);
	console.log(req.data);

	
	let rawJsonObj = {
		"data": "Some Data!!!!!!"
	};
	res.json(rawJsonObj);
});
// See how to use PUT, GET, etc, and when.