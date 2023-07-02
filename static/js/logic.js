// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Perform a GET request to the query URL and console log data 
d3.json(queryUrl).then(function (data) {
    console.log(data);
    createFeatures(data.features);
});

// Define a markerSize() function 
function markerSize(magnitude) {
    return Math.sqrt(magnitude) * 15;
}

// Define a colour() function 
function colorDepth(depth) {
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
    return color;
}

function createFeatures(earthquakeData) {

    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>Magnitude: ${feature.properties.mag}, Depth: ${feature.geometry.coordinates[2]}`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,

        // Point to layer for markers 
        pointToLayer: function(feature, latlng) {
          let radius = feature.properties.mag;
          let depth = feature.geometry.coordinates[2]
          
          return L.circleMarker(latlng, {
            stroke: true,            
            fillOpacity: 0.75,
            color: "black",
            fillColor: colorDepth(depth),
            radius: markerSize(radius),
            weight: 0.3
          });
        }
    });

    // Send our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Create the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // Create a baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        41.00, 28.9784
      ],
      zoom: 3,
      layers: [street, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    // Set up the legend.
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend"); 
        let depth = [
            {min: -10, max: 10, color: "#4CAF50"},
            {min: 10, max: 30, color: "#D4E157"},
            {min: 30, max: 50, color: "#FFF176"},
            {min: 50, max: 70, color: "#FFCC80"},
            {min: 70, max: 90, color: "#EF6C00"},
            {min: 90, max: "+", color: "#B71C1C"}
        ];       

    // Add legend info 
    let legendInfo = "<h3>Earthquake Depth</h3>" 
    div.innerHTML = legendInfo;

    for (let i = 0; i < depth.length; i++) {
        let depthItem = depth[i];
        let legendItem = `<i style="background:${depthItem.color}"></i> ${depthItem.min} - ${depthItem.max}<br>`;
        div.innerHTML += legendItem;
      }
      return div;
    };

    // Adding the legend to the map
    legend.addTo(myMap);
}