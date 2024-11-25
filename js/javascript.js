
const map = L.map('map').setView([42.34488628077827, -71.06897719272507], 15);

// Get basemap
const Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri.WorldStreetMap @ https://leaflet-extras.github.io/leaflet-providers/preview/',
    maxZoom: 20,
    maxNativeZoom: 19
}).addTo(map);

// Get Back Bay border GeoJSON and add style
const url = 'geo/BackBay.geojson';
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

//Street trees data

//filter
function siteFilter(feature) {
    if ((feature.properties.spp_com !== "Vacant Unacceptable/Retired") && 
    (feature.properties.spp_com !== "Empty Pit/Planting Site"))
        return true
};

//Initial point style
const treeStyle1 = {
    radius: 3,
    fillColor: "#544a24",
    color: "#2A7E19",
    weight: 3,
    opacity: 1,
    fillOpacity: 1
};

//Zoomed-in point style
const treeStyle2 = {
    radius: 12,
    fillColor: "#544a24",
    color: "#2A7E19",
    weight: 12,
    opacity: 1,
    fillOpacity: 1
};

//Load street trees in Back Bay with initial styling
const ST_url = 'geo/BackBayTrees.geojson';
const ST_response = fetch(ST_url).then(response => response.json()).then(ST_response => {
      treeGeoJSON = L.geoJson(ST_response, {
        filter: siteFilter,
        pointToLayer: function (feature, latlng) {
            let full_name = feature.properties.spp_com.split(',').reverse().join(" ");
            let marker = L.circleMarker(latlng, treeStyle1);
            return marker.bindPopup(full_name)
        }
      }).addTo(map)
}); 

//Change styling at max zoom and reset when zooming back out
let c = 0
map.on('zoomend', function() {
    const currentZoom = map.getZoom();
    if (currentZoom > 19) {
        map.removeLayer(treeGeoJSON)
        const ST_response = fetch(ST_url).then(response => response.json()).then(ST_response => {
            treeGeoJSONz = L.geoJson(ST_response, {
              filter: siteFilter,
              pointToLayer: function (feature, latlng) {
                let full_name = feature.properties.spp_com.split(',').reverse().join(" ");
                let marker = L.circleMarker(latlng, treeStyle2);
                return marker.bindPopup(full_name);
              }
            }).addTo(map)
        }) 
        return c = 1
    } else {
        if (c === 1) {
            map.removeLayer(treeGeoJSONz)
            const ST_response = fetch(ST_url).then(response => response.json()).then(ST_response => {
                treeGeoJSON = L.geoJson(ST_response, {
                  filter: siteFilter,
                  pointToLayer: function (feature, latlng) {
                    let full_name = feature.properties.spp_com.split(',').reverse().join(" ");
                    let marker = L.circleMarker(latlng, treeStyle1);
                    return marker.bindPopup(full_name);
                  }
                }).addTo(map)
          }); 
        }
        return c = 0
    }
});

// Create legend
const legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info');
    div.innerHTML += '<img src="assets/simple_tree.png" width=40 height=40 alt="street tree"><p>Street Tree</p>';
    return div;
};

// Create logo
const logo = L.control({position: 'bottomleft'});
logo.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'logo');
    const pic = L.DomUtil.create('div', 'pic', div)
    const title = L.DomUtil.create('div', 'title', div);
    title.innerHTML += '<p style=font-size:2.5rem;font-weight:bold>What&#39s That Tree?</p><p style=font-size:1.5rem> Street Tree Species in Boston, MA</p><p><em>Back Bay Demo</em></p>';
    pic.innerHTML += '<img src="assets/dk.png" width=70 height=70 alt="Dylan Kelly"><p><strong>Dylan Kelly</strong></p><a href="https://github.com/DK32093/Boston-trees-app/tree/main" style=color:white>Github</a>';
    return div;
};

//Add legend, logo, and geocoder
legend.addTo(map);
logo.addTo(map);
L.Control.geocoder().addTo(map);
