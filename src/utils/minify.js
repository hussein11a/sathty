// src/utils/minify.js
// هذا الملف يحتوي على وظائف مساعدة لتصغير (minify) HTML, CSS, و JavaScript.
// يمكن استخدام هذه الوظائف في Eleventy Transforms أو في مهام البناء الأخرى.

const htmlmin = require("html-minifier"); // npm install html-minifier
const CleanCSS = require("clean-css");   // npm install clean-css
const UglifyJS = require("uglify-js");   // npm install uglify-js

/**
 * تصغير محتوى HTML.
 * @param {string} content - محتوى HTML.
 * @returns {string} محتوى HTML مصغر.
 */
function minifyHtml(content) {
  return htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
    minifyCSS: true, // تصغير CSS المضمن
    minifyJS: true,  // تصغير JavaScript المضمن
  });
}

/**
 * تصغير محتوى CSS.
 * @param {string} content - محتوى CSS.
 * @returns {string} محتوى CSS مصغر.
 */
function minifyCss(content) {
  return new CleanCSS({}).minify(content).styles;
}

/**
 * تصغير محتوى JavaScript.
 * @param {string} content - محتوى JavaScript.
 * @returns {string} محتوى JavaScript مصغر.
 */
function minifyJs(content) {
  // UglifyJS يعمل بشكل أفضل مع كود JS صالح.
  // يمكن تمرير خيارات إضافية لـ UglifyJS إذا لزم الأمر.
  const minified = UglifyJS.minify(content);
  if (minified.error) {
    console.error("UglifyJS error:", minified.error);
    return content; // في حالة الخطأ، أرجع المحتوى الأصلي
  }
  return minified.code;
}

module.exports = {
  minifyHtml,
  minifyCss,
  minifyJs,
};

