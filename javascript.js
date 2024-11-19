const map = L.map('map').setView([42.3601, -71.0589], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//load street trees layer from geoserver
const street_trees = L.tileLayer.wms("http://localhost:8080/geoserver/Trees_BOS/wms", {
    layers: 'Trees_BOS:treekeeper_street_trees',
    format: 'image/png',
    transparent: true,
});
street_trees.addTo(map);