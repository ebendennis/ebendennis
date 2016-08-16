mapboxgl.accessToken = 'pk.eyJ1IjoiaWNvbmVuZyIsImEiOiJjaXBwc2V1ZnMwNGY3ZmptMzQ3ZmJ0ZXE1In0.mo_STWygoqFqRI-od05qFg';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/iconeng/cihxv74vo00oynpm48wsujwo3',
    zoom: 15,
    center: [-105.0615, 40.5810],
    hash: true,
    preserveDrawingBuffer: true
});

var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.value;
    map.setStyle('mapbox://styles/iconeng/' + layerId);
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
    w.document.title = "Printed - Mulberry and Riverside";
    var img = new Image();
    img.src = map.getCanvas().toDataURL('image/png', 1.0);
    img.style.maxWidth = "100%";
    w.document.body.appendChild(img);
}

// The key name that exists in each polygon properties
// object we want to display
var variable = 'Var'
    one = 1
    two = 2
    depth = 'flowDepth'
    velocity = 'velocity'
    depth1 = 'flowDepth1'
    velocity1 = 'velocity1'
    depth2 = 'flowDepth2'
    velocity2 = 'velocity2';


// The values in each array are:
// 1. Color of choropleth
// 2. Minimum value
// 3. Maximum value
var layers = [
    ['#263238', 4, '#685fae'],
    ['#3b4c54', 3, '#a369a7'],
    ['#53666f', 2, '#ce779e'],
    ['#6e828b', 1.5, '#ee8d92'],
    ['#8c9ea6', 1, '#f6ad93'],
    ['#acbbc1', 0.5, '#f9cc9d'],
    ['#cfd8dc', 0.25, '#f6edb2']
];

function filterBy(type, facet, name) {

    var position = type;

    layers.forEach(function(layer, i) {
        var filters = [
            'all',
            ['>=', facet, layer[position]]
        ];

        if (i !== 0) filters.push(['<', facet, layers[i - 1][position]]);
        map.setFilter(name + i, filters);
    });
}

function renderVelocity() {

    layers.forEach(function(layer, i) {
    map.addLayer({
        'id': 'velocity' + i,
        'type': 'line',
        'source': 'flo2d',
        'source-layer': 'Ex_Velocity',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': layer[0]
        }
    },'road_label');
  });

  filterBy(one, variable, velocity)
}

function renderVelocity1() {

    layers.forEach(function(layer, i) {
    map.addLayer({
        'id': 'velocity1' + i,
        'type': 'line',
        'source': 'flo2d-alt1',
        'source-layer': 'Alt01_Velocity',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': layer[0]
        }
    },'road_label');
  });

  filterBy(one, variable, velocity1)
}

function renderVelocity2() {

    layers.forEach(function(layer, i) {
    map.addLayer({
        'id': 'velocity2' + i,
        'type': 'line',
        'source': 'flo2d-alt2',
        'source-layer': 'Alt02_Velocity',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'line-color': layer[0]
        }
    },'road_label');
  });

  filterBy(one, variable, velocity2)
}

map.on('style.load', function () {

    map.addSource('layers', {
        type: 'vector',
        url: 'mapbox://iconeng.5aff166d'
    });
    map.addSource('flo2d', {
        type: 'vector',
        url: 'mapbox://iconeng.47dccddc'
    });
    map.addSource('flo2d-alt1', {
        type: 'vector',
        url: 'mapbox://iconeng.860b95ae'
    });
    map.addSource('flo2d-alt2', {
        type: 'vector',
        url: 'mapbox://iconeng.00e789e0'
    });

//    renderDepth()
    renderVelocity()
//    renderDepth1()
    renderVelocity1()
//    renderDepth2()
    renderVelocity2()

    map.addLayer({
        'id': 'flowDepth',
        'interactive': true,
        'type': 'fill',
        'source': 'flo2d',
        'source-layer': 'Ex_Max_Flow_Depth',
        'filter': ['>=','Var',.25],
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'fill-color': {
                property: 'Var',
                type: 'interval',
                stops: [
                    ['.25', '#f6edb2'],
                    ['.5', '#f9cc9d'],
                    ['1', '#f6ad93'],
                    ['1.5', '#ee8d92'],
                    ['2', '#ce779e'],
                    ['3', '#a369a7'],
                    ['4', '#685fae']
                    ]
            },
            'fill-opacity': 0.8
        }
    },'road_label');

    map.addLayer({
        'id': 'flowDepth1',
        'interactive': true,
        'type': 'fill',
        'source': 'flo2d-alt1',
        'source-layer': 'Alt01_Max_Flow_Depth',
        'filter': ['>=','Var',.25],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'Var',
                type: 'interval',
                stops: [
                    ['.25', '#f6edb2'],
                    ['.5', '#f9cc9d'],
                    ['1', '#f6ad93'],
                    ['1.5', '#ee8d92'],
                    ['2', '#ce779e'],
                    ['3', '#a369a7'],
                    ['4', '#685fae']
                    ]
            },
            'fill-opacity': 0.8
        }
    },'road_label');

    map.addLayer({
        'id': 'flowDepth2',
        'interactive': true,
        'type': 'fill',
        'source': 'flo2d-alt2',
        'source-layer': 'Alt02_Max_Flow_Depth',
        'filter': ['>=','Var',.25],
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'Var',
                type: 'interval',
                stops: [
                    ['.25', '#f6edb2'],
                    ['.5', '#f9cc9d'],
                    ['1', '#f6ad93'],
                    ['1.5', '#ee8d92'],
                    ['2', '#ce779e'],
                    ['3', '#a369a7'],
                    ['4', '#685fae']
                    ]
            },
            'fill-opacity': 0.8
        }
    },'road_label');

// IMPORT FROM PREVIOUS MAP

// CONTOURS

      map.addSource('contours', {
      type: 'vector',
      url: 'mapbox://iconeng.e74b2b70'
      });
      map.addLayer({
          'id': '5ftContours',
          'type': 'line',
          'source': 'contours',
          'source-layer': 'oldtown_1ft_contours_smooth',
          'filter': ['all', ['>', 'Index', 1]],
          'layout': {
              'line-join': 'round',
              'line-cap': 'round',
              'visibility': 'none'
          },
          'paint': {
            'line-width': {
                "stops": [[15, 1], [17, 1.75], [19, 2.5]]
            },
            'line-opacity': {
                "stops": [[16, 0.7],[19, 1]]
            },
              'line-color': '#b68054'
          }
      },'road_label');
      map.addLayer({
          'id': '1ftContours',
          'type': 'line',
          'source': 'contours',
          'source-layer': 'oldtown_1ft_contours_smooth',
          'layout': {
              'line-join': 'round',
              'line-cap': 'round',
              'visibility': 'none'
          },
          'paint': {
            'line-width': {
                "stops": [[15, 0], [17, .5], [19, 1]]
            },
            'line-opacity': {
                "stops": [[16, 0.7],[19, 1]]
            },
              'line-color': '#b68054'
          }
      },'road_label');
      map.addLayer({
          'id': '5ftLabels',
          'type': 'symbol',
          'source': 'contours',
          'source-layer': 'oldtown_1ft_contours_smooth',
          'filter': ['all', ['>', 'Index', 1]],
          'layout': {
            'symbol-placement': 'line',
            'text-field': '{CONTOUR}',
            'text-font': ['DIN Offc Pro Light','Open Sans Light','Arial Unicode MS Regular'],
            'text-size': {
              "stops": [[15,12],[17,14],[19,18]]
            },
            'visibility': 'none'
          },
          'paint': {
            'text-color': '#b68054',
            'text-halo-color': 'rgba(255,255,235,0.9)',
            'text-halo-width': 2,
            'text-halo-blur': 0.5
          }
      },'road_label');

// FLOODPLAIN

    map.addSource('floodplain', {
        type: 'vector',
        url: 'mapbox://iconeng.c0a5784e'
    });
    map.addLayer({
        'id': 'floodplain-medium',
        'type': 'fill',
        'source': 'floodplain',
        'source-layer': 'FOCO_floodplaincity',
        'filter': ['all', ['==', 'RISK', 'MEDIUM']],
        'layout': {
            visibility: 'none'
        },
        'paint': {
            'fill-color': '#BBDEFB',
            'fill-opacity': 0.5
        }
    },'road_label');
    map.addLayer({
        'id': 'floodplain-high',
        'type': 'fill',
        'source': 'floodplain',
        'source-layer': 'FOCO_floodplaincity',
        'filter': ['all', ['==', 'RISK', 'HIGH']],
        'layout': {
            visibility: 'none'
        },
        'paint': {
            'fill-color': '#2196F3',
            'fill-opacity': 0.5
        }
    },'road_label');
    map.addLayer({
        'id': 'floodplain-floodway',
        'type': 'fill',
        'source': 'floodplain',
        'source-layer': 'FOCO_floodplaincity',
        'filter': ['all', ['==', 'RISK', 'HIGH FLOODWAY']],
        'layout': {
            visibility: 'none'
        },
        'paint': {
            'fill-color': '#0D47A1',
            'fill-opacity': 0.5
        }
    },'road_label');

// STORMWATER

    map.addSource('stormwater', {
        type: 'vector',
        url: 'mapbox://iconeng.b5910267'
    });
    map.addLayer({
        'id': 'stormwater',
        'type': 'line',
        'source': 'stormwater',
        'source-layer': 'FOCO_Stormwater',
        'filter': ['all', ['in', 'Layer', 'swPipe', 'swLateral', 'swLateralPipe']],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#2196F3'
        }
    },'road_label');
    map.addLayer({
        'id': 'intake',
        'type': 'line',
        'source': 'stormwater',
        'source-layer': 'FOCO_Stormwater',
        'filter': ['all', ['==', 'Layer', 'swIntake']],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#3F51B5'
        }
    },'road_label');
    map.addLayer({
        'id': 'manhole',
        'type': 'line',
        'source': 'stormwater',
        'source-layer': 'FOCO_Stormwater',
        'filter': ['all', ['==', 'Layer', 'swManhole']],
        'layout': {
            'line-join': 'round',
            'visibility': 'none',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 4], [19, 6]]
          },
            'line-color': '#00BCD4'
        }
    },'road_label');

// WATERSHEDS

    map.addLayer({
        'id': 'watersheds',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'OTH_Watersheds',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 3]]
          },
            'line-color': '#455A64'
        }
    }, 'road_label');

// CONDUITS

    map.addLayer({
        'id': 'conduits',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'MRD_Conduits',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 1], [17, 2], [19, 4]]
          },
            'line-color': '#D500F9'
        }
    });

// ALTERNATIVES

    map.addLayer({
        'id': 'alt1',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'MRD_Alt01',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 5], [19, 8]]
          },
          'line-dasharray': [.1,1.5],
            'line-color': '#FF3D00'
        }
    });
    map.addLayer({
        'id': 'alt2',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'MRD_Alt02',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 5], [19, 8]]
          },
          'line-dasharray': [.1,1.25],
            'line-color': '#FFFF00'
        }
    });
    map.addLayer({
        'id': 'alt3',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'MRD_Alt03',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 5], [19, 8]]
          },
          'line-dasharray': [.1,1.75],
            'line-color': '#18FFFF'
        }
    });

// INLETS

    map.addLayer({
        'id': 'alt1Inlet',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'MRD_Inlets_Alt01',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 5], [19, 8]]
          },
            'line-color': '#ff1744'
        }
    });

    map.addLayer({
        'id': 'alt2Inlet',
        'type': 'line',
        'source': 'layers',
        'source-layer': 'MRD_Inlets_Alt02',
        'layout': {
            'visibility': 'none',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 5], [19, 8]]
          },
            'line-color': '#AEEA00'
        }
    });

// CROSS SECTIONS

    map.addLayer({
        'id': 'xs',
        'type': 'line',
        'source': 'flo2d',
        'source-layer': 'MRD_FLO2D_XS',
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
          'line-width': {
              "stops": [[15, 2], [17, 5], [19, 8]]
          },
            'line-color': '#1DE9B6'
        }
    });

// JUNCTIONS

    map.addLayer({
      'id': 'junctions',
      'type': 'circle',
      'source': 'layers',
      'source-layer': 'MRD_Junctions',
      'interactive': true,
      'layout': {
        'visibility': 'none',
      },
      'paint': {
        'circle-radius': {
          'stops': [[15,4],[19,12]]
        },
        'circle-color': '#9C27B0'
      }
    });

}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['xs','alt1','alt1Inlet','alt2','alt2Inlet','alt3','conduits','junctions','flowDepth','flowDepth1','flowDepth2'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];
    if (feature.layer.id == 'xs'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>' + feature.properties.Descr + '</span><br />' +
                    '<span>Existing: ' + feature.properties.INLET + ' cfs</span><br />' +
                    '<span>Alternative 1: ' + feature.properties.ALT01 + ' cfs</span><br />' +
                    '<span>Alternative 2: ' + feature.properties.ALT02 + ' cfs</span><br />' +
                    '<span>Alternative 3: ' + feature.properties.ALT03 + ' cfs</span><br />' )
            .addTo(map);
    } else if (feature.layer.id == 'alt1'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>' + feature.properties.Descr + '</span><br />' +
                    '<span>Alternative 1: ' + feature.properties.Alt01_T + ' cfs</span>')
            .addTo(map);    
    } else if (feature.layer.id == 'alt1Inlet'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>' + feature.properties.Length + ' ft</span><br />' +
                    '<span>' + feature.properties.Descr + '</span>')
            .addTo(map);
    } else if (feature.layer.id == 'alt2'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>' + feature.properties.Descr + '</span><br />' +
                    '<span>Alternative 2: ' + feature.properties.Alt02_T + ' cfs</span>')
            .addTo(map);
    } else if (feature.layer.id == 'alt2Inlet'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>' + feature.properties.Length + ' ft</span><br />' +
                    '<span>' + feature.properties.Descr + '</span>')
            .addTo(map);
    } else if (feature.layer.id == 'alt3'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>' + feature.properties.Descr + '</span><br />' +
                    '<span>Alternative 3: ' + feature.properties.Alt03_T + ' cfs</span>')
            .addTo(map);
    } else if (feature.layer.id == 'conduits'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>Conduit: ' + feature.properties.Name + '</span><br />' +
                    '<span>Existing Condition: ' + feature.properties.Inlet_T + ' cfs</span><br />' +
                    '<span>Alternative 1: ' + feature.properties.Alt01_T + ' cfs</span><br />' +
                    '<span>Alternative 2: ' + feature.properties.Alt02_T + ' cfs</span><br />' +
                    '<span>Alternative 3: ' + feature.properties.Alt03_T + ' cfs</span>')
            .addTo(map);
    } else if (feature.layer.id == 'conduits'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>Junction: ' + feature.properties.Name + '</span><br />' +
                    '<span>Existing Condition: ' + feature.properties.Inlet_T + ' cfs</span><br />' +
                    '<span>Alternative 1: ' + feature.properties.Alt01_T + ' cfs</span><br />' +
                    '<span>Alternative 2: ' + feature.properties.Alt02_T + ' cfs</span><br />' +
                    '<span>Alternative 3: ' + feature.properties.Alt03_T + ' cfs</span>')
            .addTo(map);
    } else if (feature.layer.id == 'flowDepth') {
        var popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<span>Existing:</span><br />' + feature.properties.Var + ' ft')
        .addTo(map);
    } else if (feature.layer.id == 'flowDepth1'){
        var popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<span>Alternative 1:</span><br />' + feature.properties.Var + ' ft')
        .addTo(map);
    } else if (feature.layer.id == 'flowDepth2'){
        var popup = new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML('<span>Alternatives 2 & 3:</span><br />' + feature.properties.Var + ' ft')
        .addTo(map);
    } else {
      return;
    }
  });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['alt1','alt2','alt3','conduits','junctions','xs','alt1Inlet','alt2Inlet','flowDepth','flowDepth1','flowDepth2'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

