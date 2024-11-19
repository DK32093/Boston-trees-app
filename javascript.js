const map = L.map('map').setView([42.3601, -71.0589], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let url = 'https://data.boston.gov/dataset/a70595d2-fd38-4bcb-8a81-6f7807621d38/resource/dade0744-a486-44c7-be7d-07240a89dca4/download/city_of_boston_outline_boundary_water_excluded.geojson';
const response = fetch(url).then(response => response.json()).then(response => {
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

//load street trees layer from geoserver
const street_trees = L.tileLayer.wms("http://localhost:8080/geoserver/Trees_BOS/wms", {
    layers: 'Trees_BOS:treekeeper_street_trees',
    format: 'image/png',
    transparent: true,
});

street_trees.addTo(map);