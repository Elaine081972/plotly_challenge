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