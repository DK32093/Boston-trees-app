const map = L.map('map').setView([42.31000, -71.064881], 11.5);

// Get basemap
const Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri.WorldStreetMap @ https://leaflet-extras.github.io/leaflet-providers/preview/',
    maxZoom: 20,
    maxNativeZoom: 19
}).addTo(map);

// Get Boston border GeoJSON and add style
const url = 'https://data.boston.gov/dataset/a70595d2-fd38-4bcb-8a81-6f7807621d38/resource/dade0744-a486-44c7-be7d-07240a89dca4/download/city_of_boston_outline_boundary_water_excluded.geojson';
const response = fetch(url).then(response => response.json()).then(response => {
      L.geoJson(response, {
        style: { 
            "color": "#000000",
            "fillColor": "none",
            "weight": 2,
            "opacity": 1
        }
      }).addTo(map)
}); 

//load street trees layer from geoserver (Popups are set up in L.TileLayer.BetterWMS.js)
const street_trees = L.tileLayer.betterWms("http://localhost:8080/geoserver/Trees_BOS/wms", {
    maxZoom: 20,
    layers: 'Trees_BOS:treekeeper_street_trees',
    format: 'image/png',
    transparent: true,
    cql_filter: "full_name <> 'Empty Pit/Planting Site'"
}).addTo(map);

// Create legend
const legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info');
    div.innerHTML += '<img src="assets/tree.svg" width=40 height=40 alt="street tree"><p>Street Tree</p>';
    return div;
};

// Create logo
const logo = L.control({position: 'bottomleft'});
logo.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'logo');
    const pic = L.DomUtil.create('div', 'pic', div)
    const title = L.DomUtil.create('div', 'title', div);
    title.innerHTML += '<p style=font-size:2.5rem;font-weight:bold>What&#39s That Tree?</p><p style=font-size:1.5rem> Street Tree Species in Boston, MA</p>';
    pic.innerHTML += '<img src="assets/dk.png" width=70 height=70 alt="Dylan Kelly"><p><strong>Dylan Kelly</strong></p><a href="https://github.com/DK32093/Boston-trees-app/tree/main" style=color:white>Github</a>';
    return div;
};

// Add legend, title, and geocoder to map
legend.addTo(map);
logo.addTo(map);
L.Control.geocoder().addTo(map);
