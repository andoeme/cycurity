"use strict";

import Map from './js/map.js';

var map = new Map({
	mapId: 'main-map',
});
map.init();

jQuery('.screen').hide();
jQuery('.login-screen').show();

jQuery('.screen-with-header-header__back').on('click', function() {
  jQuery('.screen').hide();
  jQuery('.welcome-screen').show();
});

jQuery('.startup-screen').on('click', function() {
  jQuery('.login-screen').show();
  jQuery('.startup-screen').slideUp();
});

jQuery('.signup-form').on('submit', function(event) {
  event.preventDefault();
  jQuery('.screen').hide();
  jQuery('.welcome-screen').show();
});

jQuery(document).keyup(function(event) {
  if ($(".location-search").is(":focus") && event.key == "Enter") {
    map.gotoLocation();
  }
});

jQuery('.location-search-button').on('click', function() {
  map.gotoLocation();
});


jQuery('.bike-stand-link').on('click', function() {
  jQuery('.screen').hide();
  jQuery('.map-screen').show();
});
