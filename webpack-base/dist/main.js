(() => {
  "use strict";
  const n = function (...n) {
    return n.reduce((n, o) => n + o);
  };
  console.log(n(10, 20, 30, 40)),
    console.log(
      (function (...o) {
        return (n(...o) / o.length).toFixed(2);
      })(10, 20, 30, 40)
    );
})();
