d3.json("data/samples.json").then((importedData) => {

console.log(importedData);

var data = importedData;

var samples = Object.values(data.samples);
var metadata = Object.values(data.metadata);
var names = Object.values(data.names);

console.log(samples);
console.log(metadata);
console.log(names);

// populate drop down with all 'names'/ID numbers (code adapted from YouTube/KodeBase/How to populate select options, Javascript)
let select = document.querySelector('select');

let options = names.map(names => `<option value=${names}>${names}</option>`).join('\n');
select.innerHTML = options;

// submit BUTTON handler *****need to change - it's drop down change...check that activity
function handleSubmit() {
    // prevent the page from refreshing
    d3.event.preventDefault();
    // select the input value from the drop down
    var name = d3.select("#selDataset").node().value;
    console.log(name);

    // clear the input value ( we don't need to do this becasue it's a drop down)
    d3.select("#selDataset").node().value = "";
    // build the plot with the input value
    buildPlot();
}

//function buildPlot()
// building horizonal bar chart(already sorted)
// slice first 10 objects for plotting
sampledata = samples.slice(0, 10);
// reverse the array due to Plotly's defaults
sampledata = samples.reverse();
console.log(sampledata);
// Trace for OTU data
samplevalue = sampledata.map(row => row.sampledata.sample_values)
console.log(samplevalue);
var trace1 = {
    x: sampledata.map(row => row.sampledata.sample_values),
    y: sampledata.map(row => row.sampledata.otu.ids),
    text: sampledata.map(row => row.sampledata.otu_labels),
    name: "OTU",
    type: "bar",
    orientaion: "h"

};

var chartData = [trace1];

var layout = {
    title:"Top Ten OTU's",
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
    }
};

Plotly.newPlot("bar", chartData, layout);



//function buildMetadata(){

//} 

// unpack function to get at the indexed data
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
}
// add event listener for change
d3.select("#selDataset").on("change", handleSubmit);
});
// add event listener for change
//d3.select("#selDataset").on("change", handleSubmit);

// have metadata:Array of objects
// have names:Array - they are the numbers of the individuals, which is their "id" in metadata & samples
// samples:Array of objects 
//metadata = {id: 940, ethnicity: "Caucasian", gender: "F", age: 24, location: "Beaufort/NC", wfreq:2}
//