mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 11,
    center: [-105.2483, 40.0183],
    hash: true,
    preserveDrawingBuffer: true
});

var geocoder = new mapboxgl.Geocoder({
    container: 'geocoder-container' // Optional. Specify a unique container for the control to be added to.
});

map.addControl(geocoder);
map.addControl(new mapboxgl.Navigation({position: 'top-left'}));
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

// After the map style has loaded on the page, add a source layer and default
// styling for a single point.
map.on('load', function() {
    map.addSource('single-point', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });
    map.addSource('sfha', {
        "type": "vector",
        "url": "mapbox://iconeng.c244874c"
    });

    map.addLayer({
        "id": "floodplain",
        "source": "sfha",
        "source-layer": "CityFloodplain",
        "type": "fill",
        "filter": ["==", "ZONEDESC", "100 Year"],
        "paint": {
            'fill-color': '#2196F3',
            'fill-opacity': 0.8
        }
    }, 'road-label-small');

    map.addLayer({
        "id": "floodExtents",
        "source": "sfha",
        "source-layer": "Flood2013Extents",
        "type": "line",
        "paint": {
            'line-width': {
                "stops": [[15, 1], [17, 1.75], [19, 2.5]]
            },
            'line-color': '#2c3e50',
            'line-opacity': 0.8
        }
    }, 'road-label-small');

    map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#e74c3c"
        }
    });

    // Listen for the `geocoder.input` event that is triggered when a user
    // makes a selection and add a symbol that matches the result.
    geocoder.on('result', function(ev) {
      map.getSource('single-point').setData(ev.result.geometry);

      $( "#noButton" ).prop( "disabled", false );
      $( "#yesButton" ).prop( "disabled", false );
      $( "#geocodeButton" ).prop( "disabled", false );

      $( "#geocodeButton" ).on('click', function () {
        var features = map.queryRenderedFeatures(ev.result.geometry.coordinates, { layers: ['floodplain'] });

        if (!features.length) {
          var popup = new mapboxgl.Popup()
          .setLngLat(ev.result.geometry.coordinates)
          .setHTML('No')
          .addTo(map);
        } else {
          var popup = new mapboxgl.Popup()
          .setLngLat(ev.result.geometry.coordinates)
          .setHTML('Yes')
          .addTo(map);
        }
      });
    });
});

