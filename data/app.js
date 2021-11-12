console.log("app.js");

// Get the JSON endpoint
const filepath = "data/samples.json";

// Fetch the JSON data and console log it
d3.json("data/samples.json").then(function(data) {
	console.log(data);
});
