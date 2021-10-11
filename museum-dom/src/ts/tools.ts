export function shuffleArray(array: any[]) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export const addRule = (function (style) {
  const sheet: CSSStyleSheet | null = document.head.appendChild(style).sheet;
  return function (selector: string, css: string | { [key: string]: string }) {
    var propText =
      typeof css === "string"
        ? css
        : Object.keys(css)
            .map(function (p) {
              return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
            })
            .join(";");
    if (sheet) {
      sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    }
  };
})(document.createElement("style"));
