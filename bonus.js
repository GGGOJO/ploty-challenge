var gaugeData = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: { axis: { visible: true, rante: [0, 9] } },
    }
];

var gaugeLayout = {
    width: 600,
    height: 600,
    margin: { t: 0, b: 0 }
};

Plotly.newPlot("myDiv", gaugeData, gaugeLayout);

