//I got down to 11 lines of javascript for that last activity, using <select id="selDataset" onchange="getData(this.value)"> to attach the event listener.
//then this code:


let getData = (val) => updatePlotly(buildTrace(val));
let buildTrace = (val) => {
  var dataset = [{
    values: Object.values(data[val]),
    labels: Object.keys(data[val]),
    type: "pie"
  }];
  return dataset;
}
let updatePlotly = (newdata) => Plotly.restyle("pie", "values", [newdata[0].values]);
Plotly.newPlot("pie", buildTrace('us'), {height: 600,width: 800});