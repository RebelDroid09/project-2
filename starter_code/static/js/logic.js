var returnData;

$.ajax("/heatmapData", {
    contentType : "application/json",
    type : "GET",
    success: function(result) {
        returnData = result
        console.log(result);
    },
    error: function() {
        console.log('Failed to retrieve data.');
    }
});

createMap(returnData);

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

    //Code was pulled from the heatmap example at https://www.patrick-wied.at/static/heatmapjs/example-heatmap-leaflet.html
    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 5,
        "maxOpacity": .8,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": false,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'count'
    };

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
    //     zoom: 3
    // });

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

        tempLatLonObj = rawCountries[1].find(o => o.country == country);

        if (tempLatLonObj)
        {
            newLat = tempLatLonObj.latitude;
            newLon = tempLatLonObj.longitude;
        } 
        
        tempHeatmapValue = {lat: newLat, lng: newLon, count: newScore};
          
        heatGroup.push(newCircle);
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