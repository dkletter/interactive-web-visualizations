// Get the JSON endpoint
const filepath = "data/samples.json";

// The master function to invoke the panel and plot functions
function init(id) {
    // HTML element to select
    var selecter1 = d3.select("#selDataset")
    // Load the JSON file
    d3.json(filepath).then((data)=> { 
        // Get the names for the dropdown
        var names = data.names;
        // Populate the dropdown menu with values
        names.forEach((id) => {
            selecter1.append("option").text(id).property("value", id)
        });
        // Set everything to use the first sample by default
        var blorp = names[0];
            makePanel(blorp);
            makeChart(blorp);       
    });
}

// Function to update plots and panel from the dropdown selection
function optionChanged(blorp) {
    makePanel(blorp);
    makeChart(blorp);
}

// Function to 
function makePanel(item) {
    // HTML element to select
    var selecter2 = d3.select("#sample-metadata");
    // Load the JSON file
    d3.json(filepath).then((data) => {
        // Get the metadata for the panel
        var metadata = data.metadata;
        // Filter for ID selection
        var result1 = metadata.filter(items => items.id == item);
        var demographics = result1[0];
        // Reset values just in case
        selecter2.html("");
        // Populate the panel with values from the ID selection
        Object.entries(demographics).forEach(([key, value]) => {
            selecter2.append("p").text(`${key}: ${value}`);
        });
    });
}

function makeChart(item) {
    // HTML element to select
    var selecter3 = d3.select("#bar");
    // Load the JSON file
    d3.json(filepath).then((data) => {
        // Get the samples
        var samples = data.samples;
        // Filter by ID for the chart
        var result2 = samples.filter(items => items.id == item);
        var dataset = result2[0];
        // Define our variables for the chart x, y, and hovertext
        var ids = dataset.otu_ids;
        var labels = dataset.otu_labels;
        var values = dataset.sample_values;
        // Trace data for the bar chart
        var barData = [
            {
                x: values.slice(0, 10).reverse(),
                y: ids.slice(0, 10).map(object => `OTU ${object}`).reverse(),
                hovertext: labels.slice(0, 10).reverse(),
                hoverinfo: "hovertext",
                type: "bar",
                orientation: "h"
            }
        ];
        // Apply layout
        var barLayout = {
            title: "Top 10 OTUs per Test Subject",
            automargin: true
        };
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar", barData, barLayout);
        // Trace data for the bubble chart
        var bubbleData = [
            {
                x: ids,
                y: values,
                text: labels,
                mode: "markers",
                marker: {
                    color: ids,
                    size: values
                }

            }
        ];
        // Apply layout
        var bubbleLayout = {
            margin: {
                t: 0
            },
            xaxis: {
                title: "OTU ID"
            },
            yaxis: {
                title: "Frequency"
            },
            hovermode: "closest"
        };
        // Render the plot the div tag with id "bubble"
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}

// JUST DO IT
init();

