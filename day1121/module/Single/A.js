const AModule = (function () {
  let name = "A";
  const sum = function sum(...params) {
    let len = params.length,
      total = 0;
    if (len === 0) {
      return 0;
    }
    if (len === 1) {
      return params[0];
    }
    return params.reduce((a, b) => a + b, 0);
  };
  return {
    name,
    sum,
  };
})();
