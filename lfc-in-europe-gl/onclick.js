// When a click event occurs near a place, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function (e) {
    var bbox = [[e.point.x - 2, e.point.y - 2], [e.point.x + 2, e.point.y + 2]];
    var features = map.queryRenderedFeatures(bbox, { layers: ['matches'] });

    if (!features.length) {
        return;
    }

    var div = window.document.createElement('div');

for (var i = 0; i < features.length; i++) {

  function write_lfcgoals(){
    for (var n = 0; n < d.lfcgoals.length; n++ ) {

      var lfcLi = document.createElement('li')

      if (d.lfcgoals[n].og == true) {
        lfcLi.className = "goals og";
      } else {
        lfcLi.className = "goals";
      }

      if (d.homeaway == "home") {
        homeGoals.insertAdjacentElement('beforeend', lfcLi)
        lfcLi.insertAdjacentHTML('beforeend', d.lfcgoals[n].name + ' ' + d.lfcgoals[n].time + '\'');
      } else {
        awayGoals.insertAdjacentElement('beforeend', lfcLi)
        lfcLi.insertAdjacentHTML('beforeend', d.lfcgoals[n].name + ' ' + d.lfcgoals[n].time + '\'');
      }
    }
  };

  function write_oppgoals(){
    for (var n = 0; n < d.oppgoals.length; n++ ) {
console.log(d.oppgoals.length);
      var oppLi = document.createElement('li')

      if (d.oppgoals[n].og == true) {
        oppLi.className = "goals og";
      } else {
        oppLi.className = "goals";
      }

      if (d.homeaway == "home") {
        awayGoals.insertAdjacentElement('beforeend', oppLi)
        oppLi.insertAdjacentHTML('beforeend', d.oppgoals[n].name + ' ' + d.oppgoals[n].time + '\'');
      } else {
        homeGoals.insertAdjacentElement('beforeend', oppLi)
        oppLi.insertAdjacentHTML('beforeend', d.oppgoals[n].name + ' ' + d.oppgoals[n].time + '\'');
      }
    }
  };

    var feature = features[i];
    var key = feature.properties.matchID;
    var filter = _.filter(json, ['matchID', key]);
    var d = filter[0];

    var newDiv = document.createElement('div');
    var row = div.insertAdjacentElement('afterbegin', newDiv)
    row.className = "row";

    var colDiv = document.createElement('div');
    var cardCol = row.insertAdjacentElement('afterbegin', colDiv)
    cardCol.className = "col s12";

    var cardDiv = document.createElement('div');
    var card = cardCol.insertAdjacentElement('afterbegin', cardDiv)
    card.className = "card navyblue";

    var contentDiv = document.createElement('div');
    var cardContent = card.insertAdjacentElement('afterbegin', contentDiv)
    cardContent.className = "card-content white-text";

    if (d.comp == "cl" && d.season < 5000) { var competition = "European Cup"; }
    else if (d.comp == "cl" && d.season > 5000) { var competition = "Champions League"; }
    else if (d.comp == "el" && d.season < 5000 && d.season > 7273) { var competition = "Inter-Cities Fairs Cup"; }
    else if (d.comp == "el" && d.season <= 7273 || d.comp == "el" && d.season > 0809 ) { var competition = "UEFA Cup"; }
    else if (d.comp == "el" && d.season < 0809 && d.season > 5000) { var competition = "Europa League"; }
    else if (d.comp == "sc") { var competition = "European Super Cup"; }
    else if (d.comp == "cwc") { var competition = "UEFA Cup Winners' Cup"; }

    if (d.homeaway == "home") {var topRow = '<div class="row grey-text lighten-2"><div class="col s12 narrow"><small>' + competition + ' ' + d.round + '</small></div><div class="col s12"><small>' + d.date + ' &middot; ' + d.venue + '</small></div></div><div class="row"><div class="col s12 valign-wrapper"><div class="col s5 left-align no-pad"><span class="card-title">Liverpool FC</span></div><div class="col s2 center-align"><span class="card-title">' + d.lfcgoals.length + ':' + d.oppgoals.length + '</span></div><div class="col s5 right-align no-pad"><span class="card-title">' + d.opponent + '</span></div></div></div><div class="divider"></div>';}
    else {var topRow = '<div class="row grey-text lighten-2"><div class="col s12 narrow"><small>' + competition + ' ' + d.round + '</small></div><div class="col s12"><small>' + d.date + ' &middot; ' + d.venue + '</small></div></div><div class="row"><div class="col s12 valign-wrapper"><div class="col s5 left-align no-pad"><span class="card-title">' + d.opponent + '</span></div><div class="col s2 center-align"><span class="card-title">' + d.oppgoals.length + ':' + d.lfcgoals.length + '</span></div><div class="col s5 right-align no-pad"><span class="card-title">Liverpool FC</span></div></div></div><div class="divider"></div>';}

    cardContent.insertAdjacentHTML('afterbegin', topRow);

    var newRow = document.createElement('div');
    var row2 = cardContent.insertAdjacentElement('beforeend', newRow)
    row2.className = "row";

    var homeUl = document.createElement('ul');
    var homeGoals = newRow.insertAdjacentElement('afterbegin', homeUl)
    homeGoals.className = "left left-align";


    var awayUl = document.createElement('ul');
    var awayGoals = newRow.insertAdjacentElement('afterbegin', awayUl)
    awayGoals.className = "right right-align";

    write_lfcgoals()
    write_oppgoals()

    // div.insertAdjacentHTML('beforeend', '<div class="row"><div class="col s12"><div class="card blue-grey darken-1"><div class="card-content white-text"><div class="row"><div class="col s12">' + d.date + ' ' + d.venue + '</div><div class="col s12 valign-wrapper"><div class="col s5 left-align no-pad"><span class="card-title">Liverpool</span></div><div class="col s2 center-align"><span class="card-title">' + d.lfcgoals.length + ':' + d.oppgoals.length + '</span></div><div class="col s5 right-align no-pad"><span class="card-title">' + d.opponent + '</span></div></div></div><div class="divider"></div><div class="left left-align"><ul id="lfcgoals"></ul></div><div id="oppgoals" class="right right-align"></div></div><div class="card-action"><a href="http://www.lfchistory.net/SeasonArchive/Game/' + key + '" target="_blank">View Match Page at LFC History</a></div></div></div></div>')

    cardContent.insertAdjacentHTML('afterend', '<div class="card-action"><a href="http://www.lfchistory.net/SeasonArchive/Game/' + key + '" target="_blank">View Match Page at LFC History</a></div>')
};
    // Populate the popup and set its coordinates
    // based on the feature found.
    var popup = new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setDOMContent(div)
        .addTo(map);
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
  var bbox = [[e.point.x - 2, e.point.y - 2], [e.point.x + 2, e.point.y + 2]];
  var features = map.queryRenderedFeatures(bbox, { layers: ['matches'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});
