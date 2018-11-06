import osmtogeojson from 'osmtogeojson';
import parkingNodes from './export.json';

import markerRed from '/img/marker_red.png';
import markerOrange from '/img/marker_orange.png';
import markerGreen from '/img/marker_green.png';

var Map = (function() {
	function C() { return constructor.apply(this,arguments); };
	var p = C.prototype;

	p.queries = [];
	p.geoJSONLayer = null;
	p.mapid = null;
	p.map = null;

	function constructor(options) {
		this.mapid = options.mapId;
	};

	p.gotoLocation = function(options) {
    jQuery(".location-search").val("");
		this.map.setView(new L.LatLng(52.51635, 13.37878), 16);
  };

	p.init = function(options) {
    var self = this;
		this.map = new L.Map(this.mapid);

    jQuery(".my-location-button").on('click', function() {
      navigator.geolocation.getCurrentPosition(function(position) {
        self.map.setView(new L.LatLng(position.coords.latitude, position.coords.longitude), 16);
      });
    });

		var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
		var overpassAttrib = 'POI via <a href="http://www.overpass-api.de/">Overpass API</a>';

		var osm = new L.TileLayer(osmUrl, {minZoom: 0, maxZoom: 20, attribution: [osmAttrib, overpassAttrib].join(',')});

    this.map.setView(new L.LatLng(52.48690, 13.41630), 16);
		this.map.addLayer(osm);

    this.addMarkers();
	};

	p.addMarkers = function(tags, bounds, callback) {
		var self = this;

    var redIcon = L.icon({
		  iconUrl: markerRed,
		  iconSize: [24, 34],
	  });

    var greenIcon = L.icon({
		  iconUrl: markerGreen,
		  iconSize: [24, 34],
	  });

    var orangeIcon = L.icon({
		  iconUrl: markerOrange,
		  iconSize: [24, 34],
	  });

    if(self.geoJSONLayer) {
      self.geoJSONLayer.remove();
    }
    console.log(parkingNodes);
    self.geoJSONLayer = L.geoJSON(
      parkingNodes,
      {
        pointToLayer: function (feature, latlng) {
          var rand = Math.random();
          if (rand > 0.5) {
            return L.marker(latlng, {icon: orangeIcon});
          } else if ( rand > 0.1 ) {
            return L.marker(latlng, {icon: greenIcon});
          } else {
            return L.marker(latlng, {icon: redIcon});
          }
        },
      }
    );
    self.geoJSONLayer.addTo(self.map);
  };

  return C;
})();

export default Map;
