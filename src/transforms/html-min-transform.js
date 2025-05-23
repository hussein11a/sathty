
// src/transforms/html-min-transform.js
// هذا التحويل (transform) يستخدم لتصغير حجم ملفات HTML الناتجة.
// يساعد في تحسين سرعة تحميل الصفحة عن طريق إزالة المسافات البيضاء الزائدة والتعليقات.

const htmlmin = require("html-minifier"); // تأكد من تثبيت هذه الحزمة: npm install html-minifier

module.exports = function(content, outputPath) {
  // تطبيق التحويل فقط على ملفات HTML في الإخراج
  if (outputPath && outputPath.endsWith(".html")) {
    const minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true, // تصغير CSS المضمن في HTML
      minifyJS: true,  // تصغير JavaScript المضمن في HTML
    });
    return minified;
  }
  return content;
};
