d3.json("data/samples.json").then((importedData) => {

console.log(importedData);

var data = importedData;

var samples = Object.values(data.samples);
var metadata = Object.values(data.metadata);

console.log(samples);
console.log(metadata);

});

// have metadata:Array of objects
// have names:Array - they are the numbers of the individuals, which is their "id" in metadata & samples
// samples:Array of objects 
metadata = {id: 940, ethnicity: "Caucasian", gender: "F", age: 24, location: "Beaufort/NC", wfreq:2}
//