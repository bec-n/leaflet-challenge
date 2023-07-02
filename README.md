# leaflet-challenge
## Module 15 Challenge

### Part 1: Create the Earthquake Visualisation

Your first task is to visualise an earthquake dataset. Complete the following steps:

1. Get your dataset. To do so, follow these steps:

    - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualise. 
    - When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Use the URL of this JSON to pull in the data for the visualisation.
    - The dataset 'All Earthquakes in the Past 7 Days' was selected (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)

2. Import and visualise the data by doing the following:

    - Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
        - Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in colour.
        - Hint: The depth of the earth can be found as the third coordinate for each earthquake.    
    - Include popups that provide additional information about the earthquake when its associated marker is clicked.
    - Create a legend that will provide context for your map data.

Link to map: 
https://bec-n.github.io/leaflet-challenge/

![Alt text](image.png)

Code source:
- Class activities 
- Colours (https://htmlcolorcodes.com/color-chart/)
