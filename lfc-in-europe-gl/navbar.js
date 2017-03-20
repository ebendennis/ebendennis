// Opponents Filter
var opponentsA = document.getElementById('opponentsA');
var opponentsBC = document.getElementById('opponentsBC');
var opponentsDG = document.getElementById('opponentsDG');
var opponentsHK = document.getElementById('opponentsHK');
var opponentsLN = document.getElementById('opponentsLN');
var opponentsOR = document.getElementById('opponentsOR');
var opponentsS = document.getElementById('opponentsS');
var opponentsTZ = document.getElementById('opponentsTZ');
var opponents = _.sortedUniq(_.map(json, 'opponent'));

opponents.forEach(function(opponent) {

    var opponentLi = document.createElement('li');
    var oppA = document.createElement('a');
    var opponentA = opponentLi.insertAdjacentElement('beforeend', oppA);
    opponentA.innerHTML = opponent;
    opponentA.href = '#';

    opponentA.addEventListener('click', function() {
        map.setFilter('matches', ['==', 'opponent', opponent]);
        map.setFilter('route', ['==', 'opponent', opponent]);

        var oppFilter = _.filter(json, ['opponent', opponent]);

        var cardTitle = document.getElementById('info-title');
        var cardBody = document.getElementById('info-body');
        cardTitle.innerHTML="Liverpool v " + opponent;
        cardBody.textContent="";

        for (var i = 0; i < oppFilter.length; i++ ) {

          var d = oppFilter[i];

          if (d.comp == "cl" && d.season < 5000) { var competition = "European Cup"; }
          else if (d.comp == "cl" && d.season > 5000) { var competition = "Champions League"; }
          else if (d.comp == "el" && d.season < 5000 && d.season > 7273) { var competition = "Inter-Cities Fairs Cup"; }
          else if (d.comp == "el" && d.season <= 7273 || d.comp == "el" && d.season > 0809 ) { var competition = "UEFA Cup"; }
          else if (d.comp == "el" && d.season < 0809 && d.season > 5000) { var competition = "Europa League"; }
          else if (d.comp == "sc") { var competition = "European Super Cup"; }
          else if (d.comp == "cwc") { var competition = "UEFA Cup Winners' Cup"; }

          if (d.homeaway == "home") {var topRow = '<div class="row grey-text lighten-2"><div class="col s12 narrow"><small>' + competition + ' ' + d.round + '</small></div><div class="col s12"><small>' + d.date + ' &middot; ' + d.venue + '</small></div></div><div class="row"><div class="col s12 valign-wrapper"><div class="col s5 left-align no-pad"><span class="card-title">Liverpool</span></div><div class="col s2 center-align"><span class="card-title">' + d.lfcgoals.length + ':' + d.oppgoals.length + '</span></div><div class="col s5 right-align no-pad"><span class="card-title">' + d.opponent + '</span></div></div></div><div class="divider"></div>';}
          else {var topRow = '<div class="row grey-text lighten-2"><div class="col s12 narrow"><small>' + competition + ' ' + d.round + '</small></div><div class="col s12"><small>' + d.date + ' &middot; ' + d.venue + '</small></div></div><div class="row"><div class="col s12 valign-wrapper"><div class="col s5 left-align no-pad"><span class="card-title">' + d.opponent + '</span></div><div class="col s2 center-align"><span class="card-title">' + d.oppgoals.length + ':' + d.lfcgoals.length + '</span></div><div class="col s5 right-align no-pad"><span class="card-title">Liverpool</span></div></div></div><div class="divider"></div>';}

          cardBody.insertAdjacentHTML('beforeend', topRow);
        };

      });

    var name = opponent.toLowerCase()
    if (name < 'b') {
      opponentsA.insertAdjacentElement('beforeend', opponentLi);
    } else if (name > 'a' && name < 'd') {
      opponentsBC.insertAdjacentElement('beforeend', opponentLi);
    } else if (name > 'c' && name < 'h') {
      opponentsDG.insertAdjacentElement('beforeend', opponentLi);
    } else if (name > 'g' && name < 'l') {
      opponentsHK.insertAdjacentElement('beforeend', opponentLi);
    } else if (name > 'k' && name < 'o') {
      opponentsLN.insertAdjacentElement('beforeend', opponentLi);
    } else if (name > 'n' && name < 's') {
      opponentsOR.insertAdjacentElement('beforeend', opponentLi);
    } else if (name > 'r' && name < 't') {
      opponentsS.insertAdjacentElement('beforeend', opponentLi);
    } else {
      opponentsTZ.insertAdjacentElement('beforeend', opponentLi);
    };
});

// Year Filter
var decade60 = document.getElementById('decade60');
var decade70 = document.getElementById('decade70');
var decade80 = document.getElementById('decade80');
var decade90 = document.getElementById('decade90');
var decade00 = document.getElementById('decade00');
var decade10 = document.getElementById('decade10');
var seasons = _.sortedUniq(_.map(json, 'season'));

seasons.forEach(function(season) {

    var seasonLi = document.createElement('li');
    var yearA = document.createElement('a');
    var seasonA = seasonLi.insertAdjacentElement('beforeend', yearA);
    seasonA.text = season;
    seasonA.href = '#';

    seasonA.addEventListener('click', function() {
        map.setFilter('matches', ['==', 'season', season]);
        map.setFilter('route', ['==', 'season', season]);

        var seasonFilter = _.filter(json, ['season', season]);

        var cardTitle = document.getElementById('info-title');
        var cardBody = document.getElementById('info-body');
        var prevSeason = season - 1;
        cardTitle.textContent="";
        cardBody.textContent="";

        for (var i = 0; i < seasonFilter.length; i++ ) {

          var d = seasonFilter[i];

          if (d.comp == "cl" && d.season < 5000) { var competition = "European Cup"; }
          else if (d.comp == "cl" && d.season > 5000) { var competition = "Champions League"; }
          else if (d.comp == "el" && d.season < 5000 && d.season > 7273) { var competition = "Inter-Cities Fairs Cup"; }
          else if (d.comp == "el" && d.season <= 7273 || d.comp == "el" && d.season > 0809 ) { var competition = "UEFA Cup"; }
          else if (d.comp == "el" && d.season < 0809 && d.season > 5000) { var competition = "Europa League"; }
          else if (d.comp == "sc") { var competition = "European Super Cup"; }
          else if (d.comp == "cwc") { var competition = "UEFA Cup Winners' Cup"; }

          if (d.homeaway == "home") {var topRow = '<div class="row grey-text lighten-2"><div class="col s12 narrow"><small>' + competition + ' ' + d.round + '</small></div><div class="col s12"><small>' + d.date + ' &middot; ' + d.venue + '</small></div></div><div class="row"><div class="col s12 valign-wrapper"><div class="col s5 left-align no-pad"><span class="card-title">Liverpool</span></div><div class="col s2 center-align"><span class="card-title">' + d.lfcgoals.length + ':' + d.oppgoals.length + '</span></div><div class="col s5 right-align no-pad"><span class="card-title">' + d.opponent + '</span></div></div></div><div class="divider"></div>';}
          else {var topRow = '<div class="row grey-text lighten-2"><div class="col s12 narrow"><small>' + competition + ' ' + d.round + '</small></div><div class="col s12"><small>' + d.date + ' &middot; ' + d.venue + '</small></div></div><div class="row"><div class="col s12 valign-wrapper"><div class="col s5 left-align no-pad"><span class="card-title">' + d.opponent + '</span></div><div class="col s2 center-align"><span class="card-title">' + d.oppgoals.length + ':' + d.lfcgoals.length + '</span></div><div class="col s5 right-align no-pad"><span class="card-title">Liverpool</span></div></div></div><div class="divider"></div>';}

          cardTitle.textContent= prevSeason + "-" + season + " " + competition;
          cardBody.insertAdjacentHTML('beforeend', topRow);
        };

      });

    if (season < 1970 ) {
      decade60.insertAdjacentElement('beforeend', seasonLi);
    } else if (season <= 1970 && season > 1980) {
      decade70.insertAdjacentElement('beforeend', seasonLi);
    } else if (season <= 1980 && season > 1990) {
      decade80.insertAdjacentElement('beforeend', seasonLi);
    } else if (season <= 1990 && season > 2000) {
      decade90.insertAdjacentElement('beforeend', seasonLi);
    } else if (season <= 2000 && season > 2010) {
      decade00.insertAdjacentElement('beforeend', seasonLi);
    } else {
      decade10.insertAdjacentElement('beforeend', seasonLi);
    };
});
