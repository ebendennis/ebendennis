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
    map.addSource('flooding', {
        "type": "vector",
        "url": "mapbox://iconeng.c244874c"
    });

    map.addLayer({
        "id": "floodplain",
        "source": "flooding",
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
        "source": "flooding",
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
      console.log(ev.result.geometry.coordinates);
      var pt1 = {
              "type": "Feature",
              "properties": {
              },
              "geometry": {
                "type": "Point",
                "coordinates": ev.result.geometry.coordinates
              }
            };
      console.log(pt1);
      var poly = multiFloodplain;

      console.log(poly);
      var features = {
        "type": "FeatureCollection",
        "features": [pt1, poly]
      };
      console.log(features);
      var isInside = turf.inside(pt1, poly);
      console.log(isInside);

      if (isInside != true) {
        $('#content').empty();
        $('#content').append("<h5 class='mdl-dialog__title'>This property is <strong>not</strong> within the 100-year floodplain</h5><p>However, this does not ensure your property is safe from flood. We highly recommend you take measures to <a href='https://bouldercolorado.gov/flood/protect-your-property'>protect your property</a> and <a href='https://bouldercolorado.gov/flood/prepare-for-floods'>protect yourself</a>.</p><p>The short video below gives an update on recovery efforts from Boulder's last major flooding event that took place in September 2013.</p><iframe src='https://player.vimeo.com/video/106527446?byline=0&portrait=0' width='640' height='360' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>")
      } else {
        $('#content').empty();
        $('#content').append("<h5 class='mdl-dialog__title'>This property is within the 100-year floodplain</h5><div class='mdl-dialog__content'><p>The information below can help you find out what you need to know in order to purchase flood insurance, contest your home's location within the floodplain by amending the map, or potentially reduce insurance costs by obtaining an elevation certificate.</p><h5>Flood Insurance:</h5><p>You can purchase insurance from a licensed private insurance company or an independent property and casualty insurance agent. This is usually your homeowner's insurance agent. Any local insurance agent can sell an insurance policy and legally must charge the same rate.</p><p>To find a qualified agent, call toll-free at 1-888-379-9531 or visit <a href='http://www.floodsmart.gov' target='_blank'>www.floodsmart.gov</a> and then select 'Agent Locator' under 'Resources.'</p><p>When purchasing flood insurance, the insurance agent may ask for an Elevation Certificate or Floodproofing Certificate. These certificates identify protection measures that may have been incorporated into the buildings construction and are used to determine the annual premium costs for an insurance policy.</p><h5>Amending the Map:</h5><p>If your structure is elevated or if your property was incorrectly mapped in the regulated floodplain, you may request that it be removed from the floodplain. Contact a licensed land surveyor to determine if your property qualifies for a Letter of Map Amendment to potentially remove your property from the floodplain. Although Boulder’s floodplain mitigation and regulation is aligned with a 100-year flood, that doesn’t mean flooding can’t happen outside of the floodplain at any time.</p><h5>Elevation Certificates:</h5><p>Only Elevation Certificates apply to residential structures, since FEMA does not recognize floodproofing measures for residential construction. If the lowest floor of a dwelling and its associated structures are located above the 100-year flood elevation, insurance premium costs are reduced. For new residential construction in Boulder, the lowest floor and associated structures must be constructed a minimum of two feet above the 100-year flood elevation.</p><p>Elevation Certificates must be prepared and certified by a Colorado-registered professional land surveyor.</p></div>");};
    });
});

