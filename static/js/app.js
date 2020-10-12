
// create function to build plots - bar chart/bubble chart
function buildPlot(id) {

  // read in the data(use live server)
  d3.json("data/samples.json").then((data) => {

    //console.log(data);
    // filter sample values by id 
    let samples = data.samples.filter(samples => samples.id.toString() === id)[0];

    //console.log(samples);

    // retrieve  the top 10 sample values
    let samplevalues = samples.sample_values.slice(0,10).reverse();

    // get only the top 10 OTU IDs for the plot OTU and reverse for plotting
    let OTU_top = (samples.otu_ids.slice(0, 10)).reverse();

    // use map callback function to get the OTU IDs  for the plot
    let OTU_id = OTU_top.map(d => "OTU " + d)

    // console.log(OTU_id)

    // Top 10 labels for the plot
    let labels = samples.otu_labels.slice(0, 10);

    //console.log(samplevalues)
    //console.log(OTU_top)

    // trace variable for the plot
    var trace1 = {
      x: samplevalues,
      y: OTU_id,
      text: labels,
      //marker: {
        //color: 'rgb(142,124,195'},
        type:"bar",
        orientation: "h"
      };

    // create data variable
    var data = [trace1];
    //create layout variable to set plots layout
    var layout = {
      title: "Top 10 OTU's",
      
      margin: {
          l: 65,
          r: 50,
          t: 50,
          b: 50
      }
    };

    // bar plot
    Plotly.newPlot("bar", data, layout);

    // console.log(samples.otu_ids)
    
    // bubble chart
    // trace variable for bubble chart
    var trace2 = {
      x: samples.otu_ids,
      y: samples.sample_values,
      mode: "markers",
      marker: {
          size: samples.sample_values,
          color: samples.otu_ids
      },
      text: samples.otu_labels
    };

    // layout for bubble plot
    var layout2 = {
      xaxis: {title: "OTU Id"},
      height: 600,
      width: 1000  
    };

    // data variable for bubble plot
    var data2 = [trace2];
    
    // bubble plot
    Plotly.newPlot("bubble", data2, layout2);

  });

}
// function to get metadata for Demographic chart for each id entered
function getMetainfo(id) {

  // read the json file to get the data
  d3.json("data/samples.json").then((data) => {
     
    // get metadata info for demographic chart
    let metadata = data.metadata;

    //console.log(metadata);

    // filter metadata by id 
    let filtermeta = metadata.filter(metadata => metadata.id.toString() === id)[0];

    // use d3 to select for metadata placement
    let demoInfo = d3.select("#sample-metadata");

    // refresh so demographic info is cleared of id entered/and not added to new id info
    demoInfo.html("");

    // retrieve demographic data for id and append to h5 element
    Object.entries(filtermeta).forEach((key) => {
        demoInfo.append("h5").text(key[0] + ": " + key[1] + "\n");
    });
  });
  
}
// create function for change event for event listener "optionChanged" to build plots and render meta data
function optionChanged(id) {

  buildPlot(id);
  getMetainfo(id);
}

// create function for initial data rendering
function init() {
  // select dropdown menu
  let dropmenu = d3.select("#selDataset");

  // read the data
  d3.json("data/samples.json").then((data) => {
    //console.log(data)

    // append the id data to the dropdown menu from data.names 
    data.names.forEach(function(name) {
      dropmenu.append("option").text(name).property("value");

    });
    // call the functions to display the data using the first id/name (zero index) and the plots to the page
    buildPlot(data.names[0]);
    getMetainfo(data.names[0]);
  });

}
init();
    