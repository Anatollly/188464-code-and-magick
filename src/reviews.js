// JSONPCallback is callback name
var CALLBACK_URL = 'http://localhost:1506/api/reviews?callback=JSONPCallback';


var reviews = [];

// Saves received by JSONPCallback function data 
function saveReviewsData(data) {
  reviews = data;
  console.log(reviews);
}


function getReviews(CALLBACK_URL, saveReviewsData) {

/*Describing JSONPCallback function
JSONPCallback  - same as callback name */
  window.JSONPCallback = function(data) {
    saveReviewsData(data);
  }

// Describing our new script
  var scriptEl = document.createElement('script');

// Launches HTTP request with CALLBACK_URL
  scriptEl.src = CALLBACK_URL;

// Creating and running our new script with JSONPCallback function
  document.body.appendChild(scriptEl);
}

getReviews(CALLBACK_URL, saveReviewsData);