// Get the JSON endpoint
const filepath = "data/samples.json";

// Fetch the JSON data
d3.json(filepath).then(data => {
	var mydata = data.samples[0];
	var mymetadata = data.metadata[0];

	// assign arrays to variables
	var samples = Object.values(mydata.sample_values);
	var ids = Object.values(mydata.otu_ids);
	var labels = Object.values(mydata.otu_labels);

	// put arrays into objects
	var items = ids.map((id, index) => {
		return {
			id: id,
			samples: samples[index],
			labels: labels[index]
		}
	});

// Sort the data by descending
let sorted = items.sort((a, b) => b.samples - a.samples);

// Slice the first 10 objects for plotting
let sliced = sorted.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
let reversed = sliced.reverse();

// Trace for the data
let trace = {
	x: reversed.map(object => object.sample_values),
	y: reversed.map(object => object.otu_ids),
	text: reversed.map(object => object.otu_labels),
	type: "bar",
	orientation: "h"
};

// Data array
let traceData = [trace];

// Apply a title to the layout
let layout = {
	title: "Top 10 OTUs",
};

// Render the plot to the div tag with id "bar"
Plotly.newPlot("bar", traceData, layout);
