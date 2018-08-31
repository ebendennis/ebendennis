mapboxgl.accessToken = 'pk.eyJ1IjoiZWJlbmRlbm5pcyIsImEiOiJ1M2tMMC0wIn0.HL9nr43JrA_mzhGVBI_B_Q';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/ebendennis/cjli6wvzp0v3w2rmvt339nsev', //stylesheet location
    center: [-121.730,39.729], // starting position
    pitch: 10,
    zoom: 11, // starting zoom
    hash: true
});

function toggleLayer(layer) {

    var visibility = map.getLayoutProperty(layer, 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty(layer, 'visibility', 'none');
    } else {
        map.setLayoutProperty(layer, 'visibility', 'visible');
    }
};

function toggleTwo(layer, layer2) {

    var visibility = map.getLayoutProperty(layer, 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty(layer, 'visibility', 'none');
        map.setLayoutProperty(layer2, 'visibility', 'none');
    } else {
        map.setLayoutProperty(layer, 'visibility', 'visible');
        map.setLayoutProperty(layer2, 'visibility', 'visible');
    }
};

function toggleThree(layer, layer2, layer3) {

    var visibility = map.getLayoutProperty(layer, 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty(layer, 'visibility', 'none');
        map.setLayoutProperty(layer2, 'visibility', 'none');
        map.setLayoutProperty(layer3, 'visibility', 'none');
    } else {
        map.setLayoutProperty(layer, 'visibility', 'visible');
        map.setLayoutProperty(layer2, 'visibility', 'visible');
        map.setLayoutProperty(layer3, 'visibility', 'visible');
    }
};

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['tevra-wedding-hotels', 'tevra-wedding-landmarks', 'tevra-wedding-venues', 'tevra-wedding-food'] });
    
    if (!features.length) {
        return;
    }

    var coordinates = features[0].geometry.coordinates.slice();
    var name = features[0].properties.name;
    var address = features[0].properties.address;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    if (features[0].properties.type == 'food') {
        var desc = features[0].properties.desc;
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML('<b class="popup-title">' + name + '</b><br /><span>' + desc + '</span><br /><span>' + address + '</span>')
            .addTo(map);
    } else {
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML('<b class="popup-title">' + name + '</b><br /><span>' + address + '</span>')
            .addTo(map);
    }
});

// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['tevra-wedding-hotels', 'tevra-wedding-landmarks', 'tevra-wedding-venues', 'tevra-wedding-food'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map.
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
}));
