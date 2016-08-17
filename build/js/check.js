function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else { 
      return "Я никуда не попал";
    };
  } else if (typeof a === 'number') {
      return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  } else if (Array.isArray(a) && !Array.isArray(b)) {
      var numberOfSteps = for (var i = 0; i < a.length; i++) {
        var total = 0;
        total += a[i];
        return total;
      };
      return 'Я прошёл ' + numberOfSteps + ' шагов';
  } else if (Array.isArray(a) && Array.isArray(b)) {
      var distancePath = for (var i = 0; i < a.length; i++) {
        var totalProd = 0;
        totalProd += (a[i] * b[i]);
        return totalProd;
      };
      return 'Я прошёл ' + distancePath + ' метров';
  };
};
