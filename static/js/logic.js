var returnData;

$.ajax("/heatmapData", {
    contentType : "application/json",
    type : "GET",
    success: function(result) {
        returnData = result
        console.log(result);

        createMap(result);
    },
    error: function() {
        console.log('Failed to retrieve data.');
    }
});

function createMap(data) {

    console.log("In the create map function");

    // var myBaseLayer = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    //     maxZoom: 18,
    //     id: "streets-v11",
    //     accessToken: API_KEY
    // });       
    
    // myTileLayer.addTo(myMap);

    var processedData = createHeatmapMarkers(data);

    console.log(processedData);  

    //var heatmapLayer = new HeatmapOverlay(cfg);

    // var quakeGroup = L.layerGroup(quakeMarkers);

    // var overlayMaps = {
    //     "Quake Markers": quakeGroup
    // };

    // // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    // L.control.layers(null, overlayMaps, {
    //     collapsed: false
    // }).addTo(myMap);

    // var myMap = L.map("mapid", {
    //     center: usaCoords,
    //     zoom: 3,
    //     layers: [myBaseLayer, heatmapLayer]
    // });

    // heatmapLayer.setData(processedData);

    // // Create a legend to display information about our map
    // var info = L.control({
    //     position: "bottomright"
    // });
  
    // // When the layer control is added, insert a div with the class of "legend"
    // info.onAdd = function() {
    //     var div = L.DomUtil.create("div", "legend");
    //     return div;
    // };

    // // Add the info legend to the map
    // info.addTo(myMap);  

    // updateLegend();
}

function createHeatmapMarkers(rawCountries){

    var newLat;
    var newLon;
    var newCountry;
    var newScore;
    var maxValue = 0;
    var heatGroup = [];
    var tempLatLonObj;
    var tempHeatmapValue;
    var finalData;

    console.log("Starting loop for data processing");

    for(var i = 0; i < rawCountries[2].length; i++)
    {
        newCountry = rawCountries[2][i].country;
        console.log(newCountry);

        newScore = rawCountries[2][i].score;
        console.log(newScore);

        if (newScore > maxValue)
        {
            maxValue = newScore;
        }

        let tempLatLonObj = rawCountries[0].find(o => o.country == newCountry);

        if (tempLatLonObj)
        {
            console.log("Country coordinates found");
            console.log(tempLatLonObj);
            newLat = tempLatLonObj.latitude;
            newLon = tempLatLonObj.longitude;
        } 
        else
        {
            console.log("No coordinates found");
            continue;
        }
        
        tempHeatmapValue = [newLat, newLon, newScore];
          
        heatGroup.push(tempHeatmapValue);
    }

    console.log("Combining final data sets");
    console.log(maxValue);

    finalData = {max: maxValue, data: heatGroup};

    return finalData;
}

// function updateLegend()
// {
//     document.querySelector(".legend").innerHTML = [
//         "<string>Depth</strong><br>",
//         "<div><div class='box depth1'></div><p class='nowrap'>-10 - 10</p></div>",
//         "<div><div class='box depth2'></div><p class='nowrap'>10 - 30</p></div>",
//         "<div><div class='box depth3'></div><p class='nowrap'>30 - 50</p></div>",
//         "<div><div class='box depth4'></div><p class='nowrap'>50 - 70</p></div>",
//         "<div><div class='box depth5'></div><p class='nowrap'>70 - 90</p></div>",
//         "<div><div class='box depth6'></div><p class='nowrap'>90+</p></div>"
//       ].join("");    
// }