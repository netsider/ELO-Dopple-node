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

app.post("/submitPlayer", (req, res, next) => {
	console.log("/submitPlayer -- Server Request Received!");
	console.log("Req.url: " + req.url);
	console.log("Req.complete: " + req.complete);
	console.log("Req.statusCode: " + req.statusCode);
	console.log(req.data);

	
	let rawJsonObj = {
		"data": "Some Data opiepoieuir"
	};
	res.json(rawJsonObj);
	console.log("Server Response Sent!");
});
// See how to use PUT, GET, etc, and when.