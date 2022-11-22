let BModule = (function () {
  const name = "B";
  const average = function average(...params) {
    let len = params.length;
    let total = 0;
    if (len === 0) {
      return 0;
    }
    total = AModule.sum(...params);
    return total / len;
  };
  return {
    name,
    average,
  };
})();
