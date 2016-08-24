'use strict';
// JSONPCallback is callback name
var CALLBACK_URL = 'http://localhost:1506/api/reviews?callback=JSONPCallback';
var reviews = [];

// Saves received by JSONPCallback function data
function saveReviewsData(data) {
  reviews = data;
  console.log(reviews);

  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewTemplate = document.querySelector('#review-template');
  var reviewsList = document.querySelector('.reviews-list');
  var elementToClone;

  reviewsFilter.classList.add('invisible');

  if ('content' in reviewTemplate) {
    elementToClone = reviewTemplate.content.querySelector('.review');
  } else {
    elementToClone = reviewTemplate.querySelector('.review');
  }

  var getReviewElement = function(someData, container) {

    var reviewElement = elementToClone.cloneNode(true);

    reviewElement.querySelector('.review-text').textContent = someData.description;
    reviewElement.querySelector('.review-author').title = someData.author.name;
    reviewElement.querySelector('.review-rating').textContent = someData.rating;

    var authorImage = new Image(124, 124);

    var TIMEOUT = 10000;

    var authorImageTimeout;

    authorImage.onload = function() {
      clearTimeout(authorImageTimeout);
      reviewElement.querySelector('.review-author').src = authorImage.src;
    };

    authorImage.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };

    authorImage.src = someData.author.picture;

    authorImageTimeout = setTimeout(function() {
      authorImage.src = '';
      reviewElement.classList.add('review-load-failure');
    }, TIMEOUT);

    container.appendChild(reviewElement);
  };


  reviews.forEach(function(review) {
    getReviewElement(review, reviewsList);
  });

  reviewsFilter.classList.remove('invisible');
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
