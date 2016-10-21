mapboxgl.accessToken = 'pk.eyJ1IjoiZWJlbmRlbm5pcyIsImEiOiJ1M2tMMC0wIn0.HL9nr43JrA_mzhGVBI_B_Q';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 2,
    center: [0,0],
    hash: true,
    preserveDrawingBuffer: true
});

map.on('style.load', function () {

var geoJson = [];

$.getJSON("http://cors.io/?http://www.lfchistory.net/api/Players/PremierLeague", function (result) {
        $.each(result, function () {
            
            if (this.GeoLong.toString().length > 2) {
                geoJson.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [this.GeoLong, this.GeoLat]
                    },
                    "properties": {
                        "id": this.ID,
                        "first": this.PlayerNameFirst,
                        "last": this.PlayerNameLast,
                        "image": "http://www.lfchistory.net/images/profiles/" + this.Image,
                        "city": this.City,
                        "country": this.Country,
                        "debut": this.Debut
                    }
                });
            }
        });
    });

    var playerData = {
            "type": "FeatureCollection",
            "features": geoJson
        };

    console.log(playerData);

    map.addSource('players', {
        type: 'geojson',
        data: playerData
    });

    map.addLayer({
      'id': 'points',
      'type': 'circle',
      'source': 'players',
      "paint": {
        "circle-radius": 10,
        "circle-color": "#e74c3c"
        }
    });

}); //end style load

// When a click event occurs near a marker icon, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['players'] });
  if (!features.length) {
      return;
  }

  var feature = features[0];
    if (feature.layer.id == 'xs'){
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML('<span>' + feature.properties.first + feature.properties.last + '</span><br />' +
                    '<img src="' + feature.properties.image + '"><br />' + 
                    '<span>' + feature.properties.city + ', ' + feature.properties.country + '</span><br />' +
                    '<span>Debut: ' + feature.properties.debut + '</span>' )
            .addTo(map);
    } else {
      return;
    }
  });

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['players'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

map.addControl(new mapboxgl.Navigation({position: 'top-left'}));

