const f1 = "node_modules/perfect-scrollbar/dist/perfect-scrollbar.common.js";
const f2 = "node_modules/perfect-scrollbar/dist/perfect-scrollbar.esm.js";
const f3 = "node_modules/perfect-scrollbar/dist/perfect-scrollbar.js";
const f4 = "node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js";
const fs = require("fs");
fs.readFile(f1, "utf8", (err, data) =>
  writePerfectScrollbar(err, data, "perfect-scrollbar.common.js", f1)
);
fs.readFile(f2, "utf8", (err, data) =>
  writePerfectScrollbar(err, data, "perfect-scrollbar.esm.js", f2)
);
fs.readFile(f3, "utf8", (err, data) =>
  writePerfectScrollbar(err, data, "perfect-scrollbar.js", f3)
);
fs.readFile(f4, "utf8", (err, data) =>
  writePerfectScrollbar(err, data, "perfect-scrollbar.min.js", f4)
);

function writePerfectScrollbar(err, data, name, f) {
  if (err) {
    return console.log(err);
  }
  let result = "";
  if (name !== "perfect-scrollbar.min.js") {
    result = data.replace(
      "this.element.addEventListener(eventName, handler, false)",
      "this.element.addEventListener(eventName, handler, { passive: false })"
    );
  } else {
    result = data.replace(
      "this.element.addEventListener(a,b,!1)",
      "this.element.addEventListener(eventName,handler,{passive:!1})"
    );
  }

  fs.writeFile(f, result, "utf8", function (err) {
    if (err) return console.log(err);
  });
}
