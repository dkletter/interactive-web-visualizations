// Get the JSON endpoint
const filepath = "data/samples.json";

d3.json(filepath).then((data) => {
    console.log(data);
});