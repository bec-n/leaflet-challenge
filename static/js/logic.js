// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL and console log data 
d3.json(queryUrl).then(function (data) {
    console.log(data);
    createFeatures(data.features);
});

// Define a markerSize() function 
function markerSize(population) {
    return Math.sqrt(population) * 50;
}

// Define a colour() function 
function color(depth) {
    let color = "";
    if (depth < 10) {
      color = "#4CAF50";
    }
    else if (depth < 30) {
      color = "#D4E157";
    }
    else if (depth < 50) {
      color = "#FFF176";
    }
    else if (depth < 70) {
        color = "#FFCC80";
    }
    else if (depth < 90) {
        color = "#EF6C00 ";
      }
    else {
      color = "#B71C1C";
    }
}