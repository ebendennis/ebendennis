mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 12,
    center: [-105.2411, 40.0198],
    hash: true,
    preserveDrawingBuffer: true
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/' + layerId);
    $('.layer-off').prop('checked', false);
    $('.layer-on').prop('checked', true);
    $('.label-off').removeClass('is-checked');
    $('.label-on').addClass('is-checked');
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

function printCanvas() {
    var w = window.open('', '');
    w.document.title = "Printed - Manitou Springs Flood Data";
    var img = new Image();
    img.src = map.getCanvas().toDataURL('image/png', 1.0);
    img.style.maxWidth = "100%";
    w.document.body.appendChild(img);
}

var fillSlider = document.getElementById('fillSlider');
var fillSliderValue = document.getElementById('fillSlider-value');
var cutSlider = document.getElementById('cutSlider');
var cutSliderValue = document.getElementById('cutSlider-value');

map.on('style.load', function () {

    map.addSource('fillPts', {
        type: 'vector',
        url: 'mapbox://iconeng.f2e79498'
    });
    map.addSource('cutPts', {
      type: 'vector',
      url: 'mapbox://iconeng.b7a321b8'
    });
    map.addSource('sedimentPolys', {
      type: 'vector',
      url: 'mapbox://iconeng.5144be08'
    });
    map.addSource('aoi', {
      type: 'geojson',
      data: 'AOI.geojson'
    });

    map.addLayer({
        'id': 'aoi-fill',
        'type': 'fill',
        'source': 'aoi',
        'maxzoom': 14,
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#829191',
            'fill-opacity': 0.2
        }
    },'road-label-small');

    map.addLayer({
        'id': 'aoi-line',
        'type': 'line',
        'source': 'aoi',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[13, .5], [15, 1],[17, .5]]
          },
          'line-opacity': {
              "stops": [[13, .75], [15, .5],[17, .25]]
          },
            'line-color': '#829191'
        }
    },'road-label-small');

    map.addLayer({
        'id': 'cutFill',
        'type': 'fill',
        'source': 'sedimentPolys',
        'source-layer': 'CutAreas',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#2c3e50',
            'fill-opacity': 0.5
        }
    },'road-label-small');

    map.addLayer({
        'id': 'cutLine',
        'type': 'line',
        'source': 'sedimentPolys',
        'source-layer': 'CutAreas',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[13, 1], [15, 2],[17, 5]]
          },
          'line-opacity': {
              "stops": [[13, 1], [15, .5],[17, .25]]
          },
            'line-color': '#2c3e50'
        }
    },'road-label-small');

    map.addLayer({
        'id': 'fillFill',
        'type': 'fill',
        'source': 'sedimentPolys',
        'source-layer': 'FillAreas',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#e74c3c',
            'fill-opacity': 0.5
        }
    },'road-label-small');

    map.addLayer({
        'id': 'fillLine',
        'type': 'line',
        'source': 'sedimentPolys',
        'source-layer': 'FillAreas',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[13, 1], [15, 2],[17, 5]]
          },
          'line-opacity': {
              "stops": [[13, 1], [15, .5],[17, .25]]
          },
            'line-color': '#e74c3c'
        }
    },'road-label-small');

    map.addLayer({
        'id': 'cutPts',
        'type': 'circle',
        'source': 'cutPts',
        'source-layer': 'cutPts',
        'interactive': true,
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
                property: 'Vol',
                base: 1.99,
                type: 'interval',
                stops: [
                    [{zoom: 13, value: -2000}, 1],
                    [{zoom: 13, value: -1500}, .5],
                    [{zoom: 13, value: -1000}, .2],
                    [{zoom: 13, value: -500}, .1],
                    [{zoom: 13, value: -1}, .1],
                    [{zoom: 15, value: -2000}, 2],
                    [{zoom: 15, value: -1500}, 1.5],
                    [{zoom: 15, value: -1000}, 1],
                    [{zoom: 15, value: -500}, .5],
                    [{zoom: 15, value: -1}, .25],
                    [{zoom: 17, value: -2000}, 8],
                    [{zoom: 17, value: -1500}, 6],
                    [{zoom: 17, value: -1000}, 4],
                    [{zoom: 17, value: -500}, 2],
                    [{zoom: 17, value: -1}, 1],
                    [{zoom: 19, value: -2000}, 32],
                    [{zoom: 19, value: -1500}, 24],
                    [{zoom: 19, value: -1000}, 16],
                    [{zoom: 19, value: -500}, 8],
                    [{zoom: 19, value: -1}, 4]
                    ]
            },
            'circle-color': '#2c3e50'
        }
    });

    map.addLayer({
        'id': 'fillPts',
        'type': 'circle',
        'source': 'fillPts',
        'source-layer': 'fillPts',
        'interactive': true,
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
                property: 'Vol',
                base: 1.99,
                type: 'interval',
                stops: [
                    [{zoom: 13, value: 1}, .1],
                    [{zoom: 13, value: 500}, .1],
                    [{zoom: 13, value: 1000}, .2],
                    [{zoom: 13, value: 1500}, .5],
                    [{zoom: 13, value: 2000}, 1],
                    [{zoom: 15, value: 1}, .25],
                    [{zoom: 15, value: 500}, .5],
                    [{zoom: 15, value: 1000}, 1],
                    [{zoom: 15, value: 1500}, 1.5],
                    [{zoom: 15, value: 2000}, 2],
                    [{zoom: 17, value: 1}, 1],
                    [{zoom: 17, value: 500}, 2],
                    [{zoom: 17, value: 1000}, 4],
                    [{zoom: 17, value: 1500}, 6],
                    [{zoom: 17, value: 2000}, 8],
                    [{zoom: 19, value: 1}, 4],
                    [{zoom: 19, value: 500}, 8],
                    [{zoom: 19, value: 1000}, 16],
                    [{zoom: 19, value: 1500}, 24],
                    [{zoom: 19, value: 2000}, 32]
                    ]
            },
            'circle-color': '#e74c3c'
        }
    });


    fillSlider.addEventListener('input', function(e) {
        // Adjust the layers opacity. layer here is arbitrary - this could
        // be another layer name found in your style or a custom layer
        // added on the fly using `addSource`.
        console.log(parseInt(e.target.value, 10));
        map.setFilter('fillFill', [">=", "VOLUME", parseInt(e.target.value, 10)]);
        map.setFilter('fillLine', [">=", "VOLUME", parseInt(e.target.value, 10)]);

        // Value indicator
        fillSliderValue.innerHTML = e.target.value + ' ft<sup>3</sup>';
    });

    cutSlider.addEventListener('input', function(e) {
        // Adjust the layers opacity. layer here is arbitrary - this could
        // be another layer name found in your style or a custom layer
        // added on the fly using `addSource`.
        console.log(parseInt(e.target.value, 10));
        map.setFilter('cutFill', [">=", "VOLUME", parseInt(e.target.value, 10)]);
        map.setFilter('cutLine', [">=", "VOLUME", parseInt(e.target.value, 10)]);

        // Value indicator
        cutSliderValue.innerHTML = e.target.value + ' ft<sup>3</sup>';
    });

}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['fillPts','cutPts'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>Volume: ' + feature.properties.Vol + ' ft<sup>3</sup></span><br />')
            .addTo(map);
    });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['fillPts','cutPts'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

