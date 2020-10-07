d3.json("data/samples.json").then((importedData) => {

console.log(importedData);

var data = importedData;

var samples = Object.values(data.samples);
var metadata = Object.values(data.metadata);
let names = Object.values(data.names);

console.log(samples);
console.log(metadata);
console.log(names);

// populate drop down with all 'names'/ID numbers (code adapted from YouTube/KodeBase/How to populate select options, Javascript)
let select = document.querySelector('select');

let options = names.map(names => `<option value=${names}>${names}</option>`).join('\n');
select.innerHTML = options;

// unpack function to get at the indexed data
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
}
// 
});

// have metadata:Array of objects
// have names:Array - they are the numbers of the individuals, which is their "id" in metadata & samples
// samples:Array of objects 
//metadata = {id: 940, ethnicity: "Caucasian", gender: "F", age: 24, location: "Beaufort/NC", wfreq:2}
//