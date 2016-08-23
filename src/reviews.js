'use strict';
// JSONPCallback is callback name
var CALLBACK_URL = 'http://localhost:1506/api/reviews?callback=JSONPCallback';
var reviews = [];

// Saves received by JSONPCallback function data
function saveReviewsData(data) {
  reviews = data;
  console.log(reviews);
}


function getCallback(url, doSomething) {

/*Describing JSONPCallback function
JSONPCallback  - same as callback name */
  window.JSONPCallback = function(data) {
    doSomething(data);
  };

// Describing our new script
  var scriptEl = document.createElement('script');

// Launches HTTP request with url
  scriptEl.src = url;

// Creating and running our new script with JSONPCallback function
  document.body.appendChild(scriptEl);
}

getCallback(CALLBACK_URL, saveReviewsData);
