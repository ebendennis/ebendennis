mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 10.75,
    center: [-105.2403, 40.03],
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
    w.document.title = "Printed - Boulder Sediment Assessment";
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
        url: 'mapbox://iconeng.b643a573'
    });
    map.addSource('cutPts', {
      type: 'vector',
      url: 'mapbox://iconeng.f468d6e0'
    });
    map.addSource('fillPolys', {
      type: 'geojson',
      data: 'fillAreaAll.geojson'
    });
    map.addSource('cutPolys', {
      type: 'geojson',
      data: 'cutAreaAll.geojson'
    });
    map.addSource('aoi', {
      type: 'geojson',
      data: 'StudyArea.geojson'
    });
    map.addSource('cityLimits', {
      type: 'geojson',
      data: 'BoulderCityLimits.geojson'
    });
    map.addSource('hydrology', {
      type: 'geojson',
      data: 'stream.geojson'
    });
    map.addSource('streamPolys', {
      type: 'geojson',
      data: 'streamAssignments.geojson'
    });

    map.addLayer({
        'id': 'city',
        'type': 'line',
        'source': 'cityLimits',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[13, 1.25], [15, 1.75],[17, 2]]
          },
          'line-opacity': .75,
          'line-color': '#333',
          'line-dasharray':[3,2]
        }
    },'road-label-small');

    map.addLayer({
        'id': 'streams',
        'type': 'line',
        'source': 'hydrology',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[13, .75], [15, 1.25],[17, 2]]
          },
          'line-opacity': .75,
          'line-color': '#3F51B5'
        }
    },'road-label-small');

    map.addLayer({
        'id': 'aoi-fill',
        'type': 'fill',
        'source': 'aoi',
        'maxzoom': 14,
        'layout': {
            'visibility': 'none'
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
            'visibility': 'none',
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
        'id': 'streamAssignments',
        'type': 'fill',
        'source': 'streamPolys',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'Id',
                type: 'categorical',
                stops: [
                    [1, '#beaed4'],
                    [2, '#ffff99'],
                    [3, '#fdc086'],
                    [4, '#bf5b17'],
                    [5, '#7fc97f'],
                    [6, '#fdc086'],
                    [7, '#ffff99'],
                    [8, '#fdc086'],
                    [9, '#bf5b17'],
                    [10, '#7fc97f'],
                    [11, '#beaed4'],
                    [12, '#ffff99'],
                    [13, '#fdc086'],
                    [14, '#bf5b17'],
                    [15, '#7fc97f']
                    ]
                },
            'fill-opacity': 0.6
        }
    },'road-label-small');

    map.addLayer({
        'id': 'cutFill',
        'type': 'fill',
        'source': 'cutPolys',
        'interactive': true,
        'filter': [">=", "VOLUME", 500],
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#2196F3',
            'fill-opacity': 0.5
        }
    },'road-label-small');

    map.addLayer({
        'id': 'cutLine',
        'type': 'line',
        'source': 'cutPolys',
        'filter': [">=", "VOLUME", 500],
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
            'line-color': '#2196F3'
        }
    },'road-label-small');

    map.addLayer({
        'id': 'cutHover',
        'type': 'line',
        'source': 'cutPolys',
        'filter': ["==", "VOLUME", ""],
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[13, 1.5], [15, 2.5],[17, 5]]
          },
          'line-opacity': 1,
            'line-color': '#2196F3'
        }
    },'road-label-small');

    map.addLayer({
        'id': 'fillFill',
        'type': 'fill',
        'source': 'fillPolys',
        'interactive': true,
        'filter': [">=", "VOLUME", 500],
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': '#FF5722',
            'fill-opacity': 0.5
        }
    },'road-label-small');

    map.addLayer({
        'id': 'fillLine',
        'type': 'line',
        'source': 'fillPolys',
        'filter': [">=", "VOLUME", 500],
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
            'line-color': '#FF5722'
        }
    },'road-label-small');

    map.addLayer({
        'id': 'fillHover',
        'type': 'line',
        'source': 'fillPolys',
        'filter': ["==", "VOLUME", ""],
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[13, 1.5], [15, 2.5],[17, 5]]
          },
          'line-opacity': 1,
          'line-color': '#FF5722'
        }
    },'road-label-small');

    map.addLayer({
        'id': 'cutPts',
        'type': 'circle',
        'source': 'cutPts',
        'source-layer': 'cutPointsFix',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
                property: 'VOLUME',
                base: 1.99,
                type: 'interval',
                stops: [
                    [{zoom: 13, value: 0}, .1],
                    [{zoom: 13, value: 10}, .1],
                    [{zoom: 13, value: 25}, .2],
                    [{zoom: 13, value: 50}, .5],
                    [{zoom: 13, value: 2000}, 1],
                    [{zoom: 15, value: 0}, .25],
                    [{zoom: 15, value: 10}, .5],
                    [{zoom: 15, value: 25}, 1],
                    [{zoom: 15, value: 50}, 1.5],
                    [{zoom: 15, value: 2000}, 2],
                    [{zoom: 17, value: 0}, 1],
                    [{zoom: 17, value: 10}, 2],
                    [{zoom: 17, value: 25}, 4],
                    [{zoom: 17, value: 50}, 6],
                    [{zoom: 17, value: 2000}, 8],
                    [{zoom: 19, value: 0}, 4],
                    [{zoom: 19, value: 10}, 8],
                    [{zoom: 19, value: 25}, 16],
                    [{zoom: 19, value: 50}, 24],
                    [{zoom: 19, value: 2000}, 32]
                    ]
            },
            'circle-color': '#2962FF'
        }
    });

    map.addLayer({
        'id': 'fillPts',
        'type': 'circle',
        'source': 'fillPts',
        'source-layer': 'fillPointsFix',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
                property: 'VOLUME',
                base: 1.99,
                type: 'interval',
                stops: [
                    [{zoom: 13, value: 0}, .1],
                    [{zoom: 13, value: 10}, .1],
                    [{zoom: 13, value: 25}, .2],
                    [{zoom: 13, value: 50}, .5],
                    [{zoom: 13, value: 2000}, 1],
                    [{zoom: 15, value: 0}, .25],
                    [{zoom: 15, value: 10}, .5],
                    [{zoom: 15, value: 25}, 1],
                    [{zoom: 15, value: 50}, 1.5],
                    [{zoom: 15, value: 2000}, 2],
                    [{zoom: 17, value: 0}, 1],
                    [{zoom: 17, value: 10}, 2],
                    [{zoom: 17, value: 25}, 4],
                    [{zoom: 17, value: 50}, 6],
                    [{zoom: 17, value: 2000}, 8],
                    [{zoom: 19, value: 0}, 4],
                    [{zoom: 19, value: 10}, 8],
                    [{zoom: 19, value: 25}, 16],
                    [{zoom: 19, value: 50}, 24],
                    [{zoom: 19, value: 2000}, 32]
                    ]
            },
            'circle-color': '#DD2C00'
        }
    });

    map.addLayer({
        'id': 'streamsLabels',
        'type': 'symbol',
        'source': 'hydrology',
        'layout': {
            'visibility': 'visible',
          'symbol-placement': 'line',
          'text-field': '{Name}',
          'text-font': ['Roboto Light Italic','Open Sans Light Italic','Arial Unicode MS Regular'],
          'text-size': {
            "stops": [[13,9],[15,12],[17,14]]
          }
        },
        'paint': {
          'text-color': '#3F51B5',
          'text-halo-color': 'rgba(250,250,250 ,0.9)',
          'text-halo-width': 2,
          'text-halo-blur': 0.5
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
        fillSliderValue.innerHTML = e.target.value + ' yd<sup>3</sup>';
    });

    cutSlider.addEventListener('input', function(e) {
        // Adjust the layers opacity. layer here is arbitrary - this could
        // be another layer name found in your style or a custom layer
        // added on the fly using `addSource`.
        console.log(parseInt(e.target.value, 10));
        map.setFilter('cutFill', [">=", "VOLUME", parseInt(e.target.value, 10)]);
        map.setFilter('cutLine', [">=", "VOLUME", parseInt(e.target.value, 10)]);

        // Value indicator
        cutSliderValue.innerHTML = e.target.value + ' yd<sup>3</sup>';
    });

}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['fillFill','cutFill','streamAssignments'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];
    console.log(feature);
    if (feature.layer.id == 'streamAssignments'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<b>' + feature.properties.CREEK + '</b><br />' +
                '<span>Deposit Volume: ' + feature.properties.FILL + ' yd<sup>3</sup></span><br />' +
                '<span>Erosion Volume: ' + feature.properties.CUT + ' yd<sup>3</sup></span>')
            .addTo(map);
    } else {
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>Volume: ' + feature.properties.VOLUME + ' yd<sup>3</sup></span><br />')
            .addTo(map);
    }
    });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['fillFill','cutFill'] });
    if (features.length) {
            map.setFilter("cutHover", ["==", "VOLUME", features[0].properties.VOLUME]);
            map.setFilter("fillHover", ["==", "VOLUME", features[0].properties.VOLUME]);
        } else {
            map.setFilter("cutHover", ["==", "VOLUME", ""]);
            map.setFilter("fillHover", ["==", "VOLUME", ""]);
        }
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

map.on("mouseout", function() {
        map.setFilter("cutHover", ["==", "VOLUME", ""]);
        map.setFilter("fillHover", ["==", "VOLUME", ""]);
    });

map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

