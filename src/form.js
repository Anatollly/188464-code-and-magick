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
var reviewNameLabel = document.querySelector('.review-fields-name');
var reviewTextLabel = document.querySelector('.review-fields-text');
var reviewFormField = document.querySelectorAll('.review-form-field');
var reviewFields = document.querySelector('.review-fields');
var reviewSubmit = document.querySelector('.review-submit');
var marks = document.querySelectorAll('input[name=review-mark]');
var checkedMark = document.querySelector('input[name=review-mark]:checked');


var changeDisplayStatus = function() {
  if (reviewName.value.length > 0) {
    reviewNameLabel.style.display = 'none';
  } else {
    reviewNameLabel.style.display = '';
  }
  if (reviewText.value.length > 0 || checkedMark.value > 2) {
    reviewTextLabel.style.display = 'none';
  } else {
    reviewTextLabel.style.display = '';
  }
  if (reviewNameLabel.style.display === 'none' && reviewTextLabel.style.display === 'none') {
    reviewFields.style.display = 'none';
  } else {
    reviewFields.style.display = '';
  }
};

var setTextStatus = function() {
  checkedMark = document.querySelector('input[name=review-mark]:checked');
  if (checkedMark.value < 3) {
    reviewText.required = true;
  } else {
    reviewText.required = null;
  }
};

var setSubmitStatus = function() {
  if ((reviewText.required === true && reviewText.value.length < 1) || (reviewName.value.length < 1 )) {
    reviewSubmit.disabled = true;
  } else {
    reviewSubmit.disabled = null;
  }
};

for (var i = 0; i < marks.length; i++) {
  marks[i].onchange = function() {
    setTextStatus();
    changeDisplayStatus();
    setSubmitStatus();
  };
}


reviewName.required = true;

reviewFormField.forEach(function(form) {
  form.oninput = function() {
    changeDisplayStatus();
    setSubmitStatus();
  };
});


setTextStatus();
setSubmitStatus();
changeDisplayStatus();
