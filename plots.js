function buildMetadata(sample) {
    d3.json("samples.json").then(function (data) {
        var metadata = data.metadata;
        var resultsArray = metadata.filter(function (data) {
            return data.id == sample;
        })
        var result = resultsArray[0];
        var panel = d3.select("#sample-metadata");

        // Clear existing metadata
        panel.html("");

        Object.entries(result).forEach(function ([key, value]) {
            panel.append("h6")
                .text(`${key.toUpperCase()}" ${value}`);
        });

        // Bonus build gauge chart
        //buildGauge(result.wfreq);
    });
}

function buildCharts(sample) {
    d3.json("samples.json").then(function (data) {
        var samples = data.samples;
        var resultsArray = samples.filter(function (data) {
            return data.id === sample;
        })
        var result = resultsArray[0];

        // extract the data from the dictionary lists
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        console.log(otu_ids)
        console.log(otu_labels)
        console.log(sample_values)

        // // Build bubble chart that displays each sample
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

        var yticks = otu_ids.slice(0, 10).map(function (otuID) {
            return `OTU ${otuID}`;
        }).reverse();

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
            title = "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);
    });
};


function init() {
    // Target the dropdown select element
    var selector = d3.select("#selDataset");

    // From the json data, pull the names to populate the dropdown select option
    d3.json("samples.json").then((data) => {
        console.log(data)

        var sampleNames = data.names;

        sampleNames.forEach((name) => {
            selector
                .append("option")
                .text(name)
                .property("value", name)
        });

        var firstSample = sampleNames[0];
        //console.log(firstSample);
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

function optionChange(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
};

// Initialize the dashboard
init();