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
reviewName.required = true;

var changeDisplayStatus = function() {
  if (reviewName.value.length > 0) {
    reviewNameLabel.style.display = 'none';
  } else {
    reviewNameLabel.style.display = '';
  }
  if (reviewText.value.length > 0) {
    reviewTextLabel.style.display = 'none';
  } else {
    reviewTextLabel.style.display = '';
  }
  if (reviewName.value.length > 0 && reviewText.value.length > 0) {
    reviewFields.style.display = 'none';
  } else {
    reviewFields.style.display = '';
  }
};



var setTextStatus = function() {
  var checkedMark = document.querySelector('input[name=review-mark]:checked');
  if (checkedMark.value < 3) {
    reviewText.required = true;
  } else {
    reviewText.required = null;
  }
};

var marks = document.querySelectorAll('input[name=review-mark]');
for (var i = 0; i < marks.length; i++) {
  marks[i].onchange = setTextStatus;
}

var setSubmitStatus = function() {
  if ((reviewText.required === true && reviewText.value.length < 1) || (reviewName.value.length < 1 )) {
    reviewSubmit.disabled = true;
  } else {
    reviewSubmit.disabled = null;
  }
};

reviewFormField.forEach(function(form) {
  form.oninput = function() {
    changeDisplayStatus();
    setSubmitStatus();
  };
});

setTextStatus();
setSubmitStatus();
