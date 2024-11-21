const map = L.map('map').setView([42.31000, -71.064881], 11.5);

// Get basemap
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri.WorldStreetMap @ https://leaflet-extras.github.io/leaflet-providers/preview/',
    maxZoom: 20,
    maxNativeZoom: 19
}).addTo(map);

// Get Boston border GeoJSON and add style
let url = 'https://data.boston.gov/dataset/a70595d2-fd38-4bcb-8a81-6f7807621d38/resource/dade0744-a486-44c7-be7d-07240a89dca4/download/city_of_boston_outline_boundary_water_excluded.geojson';
let response = fetch(url).then(response => response.json()).then(response => {
      L.geoJson(response, {
        style: { 
            "color": "#000000",
            "fillColor": "none",
            "weight": 2,
            "opacity": 1
        }
      }
    ).addTo(map)
}); 

//load street trees layer from geoserver (Popups are set up in L.TileLayer.BetterWMS.js)
const street_trees = L.tileLayer.betterWms("http://localhost:8080/geoserver/Trees_BOS/wms", {
    maxZoom: 20,
    layers: 'Trees_BOS:treekeeper_street_trees',
    format: 'image/png',
    transparent: true,
    cql_filter: "spp_com<>'Empty Pit/Planting Site'"
}).addTo(map);


var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info');
    
        div.innerHTML +=
        '<img src="assets/tree.svg" width=40 height=40><p>Street Tree</p>';
    
    return div;
    };

legend.addTo(map);

L.Control.geocoder().addTo(map);




