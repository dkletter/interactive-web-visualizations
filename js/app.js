// Get the JSON endpoint
const filepath = "data/samples.json";

function init(id) {

    var selecter1 = d3.select("#selDataset")

    d3.json(filepath).then((data)=> { 
        var names = data.names;

        names.forEach((id) => {
            selecter1.append("option").text(id).property("value", id)
        });

        var blorp = names[0];
            makePanel(blorp);        
    });
}

function optionChanged(blorp) {
    makePanel(blorp);
}

function makePanel(item) {

    var selecter2 = d3.select("#sample-metadata");

    d3.json(filepath).then((data) => {
        var metadata = data.metadata;
        var result1 = metadata.filter(items => items.id == item);
        var demographics = result1[0];

        selecter2.html("");

        Object.entries(demographics).forEach(([key, value]) => {
            selecter2.append("h5").text(`${key}: ${value}`);
        });
    });
}

init();

