var returnData;

$.ajax("/heatmapData", {
    data: data,
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