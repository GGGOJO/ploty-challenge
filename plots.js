// Set up a function to grab data for a selected sample ID for the Metadata Dashboard
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        // Filter the json data for the object for the desired sample id
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        //Use d3 to select the dashboard Metadata panel with id for #sample-metadata
        var PANEL = d3.select("#sample-metadata");

        // Clear any prior existing metadata
        PANEL.html("");

        // Use Object entries to add the key/value to the dashboard Metadata panel
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

        // Bonus build gauge chart
        buildGauge(result.wfreq);
    });
}

// Set up a function to grab data for a selected ID for Bubble and Bar Charts
function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];

        // extract the data from the dictionary lists
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        console.log(otu_ids)
        console.log(otu_labels)
        console.log(sample_values)

        // Build bubble chart that displays each sample
        var bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
            margin: { t: 30 }
        };

        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    color: otu_ids,
                    size: sample_values,
                    colorscale: "Earth"
                }
            }
        ];
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);
    });
}

// Create a function to initalize the Dashboard with the default (first sample) data
function init() {
    // Target the dropdown select element
    var selector = d3.select("#selDataset");

    // From the json data, pull the names to populate the dropdown select option
    d3.json("samples.json").then((data) => {
        console.log(data)

        var sampleNames = data.names;

        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample)
        });

        // Uses the first sample's json data to build the initial plots as the Dashboard's default
        var firstSample = sampleNames[0];
        //console.log(firstSample);
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

// Create a function to grab new json data each time a new sample is selected from dropdown Menu
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
};

// Initialize the dashboard
init();