// 1. Use the D3 library to read in samples.json.
//var dataPromise = d3.json("CPI_2019_2018_2017.json");
// select dropdown menu
var dropdownMenu = d3.select("#selDataset");

function buildPlots(dataID) {


  d3.json("CPI_2019_2018_2017.json").then((sampleData) => {
      console.log(sampleData);

      var data = sampleData.data;

      //Apply filter to reflect the sample data selection
      var filteredSample = data.filter(sampleElement => sampleElement.Year_ == dataID);

      var Ranking = filteredSample[0].Ranking;
      console.log(Ranking);

      var Country = filteredSample[0].Country;
      console.log (Country);

      var CPI_Score = filteredSample[0].CPI_Score;
      console.log(CPI_Score);

      // get only top 10 ranking for the plot
      var Ranking_10 = filteredSample.slice(0, 10).reverse();
      // get the ranking to the desired form for the plot
      var Ranking_f = Ranking_10.map(d => "Rank" + d.Ranking + " ");
      console.log(`Ranking: ${Ranking_f}`);
      // get the top 10 country name for the plot
      var Country_10 = Ranking_10.map(d => d.Country );
      console.log(`Country: ${Country_10}`);
      //Country_10 = Country_10.slice(0,11);
      // get the top 10 cpi score for the plot
      var CPI_Score_10 = Ranking_10.map(d => d.CPI_Score );
      console.log(CPI_Score_10);
      //CPI_Score_10 = CPI_Score_10.slice(0,11);
      //console.log(CPI_Score_10);

      var trace1 = {
        x: CPI_Score_10,
        y: Ranking_10,
        text: Country_10,
        type:"bar",

        marker: {
            color: 'blue'},
            //type:"bar",
            orientation: "h"
        };
    // create data variable
    var data1 = [trace1];
    // set layout for bar plot
    var layout1 = {
        title: "Top 10 Ranking Countries by Year: " +dataID,
        font: { color: "#04420e", family:"Ariel, Helvetica, sans-serif"},
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };
    // bar plot using Plotly
    Plotly.newPlot("bar", data1, layout1);

    var trace2 = {
      x: CPI_Score,
      y: Ranking,
      mode: "markers",
      marker: {
          size: Ranking,
          color: CPI_Score
      },
      text: Country
  };
  // set layout for bubble plot
  let layout2 = {
      title: "CPI Score Vs. Ranking",
      xaxis:{title: "CPI Score: " + dataID},
      hovermode: "closest",
      font: { color: "#04420e", family:"Ariel, Helvetica, sans-serif"},
      height: 600,
      width: 1000
  };
  // create data variable
  let data2 = [trace2];
  // bubble plot using Plotly
  Plotly.newPlot("bubble", data2, layout2);

});
}



function init() {
    // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("CPI_2019_2018_2017.json").then((data) =>{
    var sampleNames = data.data.map(item=> item["Year_"]);
    console.log("sampleNames :: ",sampleNames)

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
     });


    });
  }

  init()