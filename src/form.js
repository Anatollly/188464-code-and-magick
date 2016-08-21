'use strict';

window.form = (function() {
  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();


var reviewName = document.querySelector('#review-name');
var reviewText = document.querySelector('#review-text');

reviewName.required = true;

var checkedMark;

var setTextStatus = function() {
  checkedMark = document.querySelector('input[name=review-mark]:checked');
  if (checkedMark.value < 3) {
    reviewText.required = true;
  } else {
    reviewText.required = null
  };
};


var markLabel = document.querySelectorAll('label.review-mark-label');
for (var i = 0; i < markLabel.length; i++) {
  markLabel[i].onclick = setTextStatus();
};

setTextStatus();






