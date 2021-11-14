// Get the JSON endpoint
const filepath = "data/samples.json";

// Establish variables for storing data
var dataset;
var metadata;
var names;
var samples;

// Get the JSON data and run the function to set an initial state
d3.json(filepath).then((data) => {
    dataset = data;
    metadata = data.metadata;
    names = data.names;
    samples = data.samples;

    // Set an initial state for the dashboard
    function init() {
        var menu = d3.select("#selDataset");
        // Add option values to the dropdown
        for (var i = 0; i < names.length; ++i) {
            squish = menu.append("option").text(names[i]);
            squish.attr("value", names[i]);
        }

        // Store initial metadata
        var dongle = metadata[0];

        // Run the function to display each key-value pair from the metadata
        make_panel(dongle);

        // Get initial sample values
        synthesizer = names[0];

        // Run the function to create the horizontal bar and bubble charts
        make_charts(names);

        // If there's time, run the function to create the guage chart
        make_gauge(dongle);
    }

    // DO IT!
    init();
});

function optionChanged(sampler) {
    make_charts(sampler);
    make_panel(sampler);
}

function make_panel() {

}

function make_charts() {

}

function make_gauge() {

}

