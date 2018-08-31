mapboxgl.accessToken = 'pk.eyJ1IjoiZWJlbmRlbm5pcyIsImEiOiJ1M2tMMC0wIn0.HL9nr43JrA_mzhGVBI_B_Q';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/ebendennis/cjcw0pj9y0d2l2snsw14a2l84', //stylesheet location
    center: [-121.730,39.729], // starting position
    pitch: 10,
    zoom: 11, // starting zoom
    hash: true
});

var route = routes;

for (var n = 0; n < route.features.length; n++) {
// Calculate the distance in kilometers between route start/end point.
var lineDistance = turf.lineDistance(route.features[n], 'kilometers');

var arc = [];

// Draw an arc between the `origin` & `destination` of the two points
for (var i = 0; i < 501; i++) {
    var segment = turf.along(route.features[n], i / 500 * lineDistance, 'kilometers');
    arc.push(segment.geometry.coordinates);
}

// Update the route with calculated arc coordinates
route.features[n].geometry.coordinates = arc;
};

map.on('load', function (e) {

  map.addSource('route', {
        "type": "geojson",
        "data": route
    });

  map.addSource('matches', {
      type: 'geojson',
      "data": 'euroMatches.geojson'
  });

    map.addLayer({
        "id": "route",
        "source": "route",
        "type": "line",
        "paint": {
            "line-width": 2,
            "line-color": "#2c3e50",
            "line-opacity": 0.25
        }
    });

  map.addLayer({
      'id': 'matches',
      'type': 'circle',
      'source': 'matches',
      'paint': {
          'circle-radius': 5,
          'circle-color': {
                'type': 'identity',
                'property':'color1'
              },
          'circle-stroke-width':2,
          'circle-stroke-color': {
                'type': 'identity',
                'property':'color2'
              }
      }
  });

});
