// src/transforms/html-min-transform.js
const { minifyHtml } = require("../utils/minify.js"); // استيراد الوظيفة من ملف utils

module.exports = function(content, outputPath) {
  if (outputPath && outputPath.endsWith(".html")) {
    return minifyHtml(content); // استخدام الوظيفة المستوردة
  }
  return content;
};
