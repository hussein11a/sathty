// src/transforms/html-min-transform.js
// هذا التحويل (transform) يستخدم لتصغير حجم ملفات HTML الناتجة
// عن طريق استدعاء وظيفة minifyHtml من ملف utils/minify.js.
// يساعد في تحسين سرعة تحميل الصفحة.

const { minifyHtml } = require("../utils/minify.js"); // استيراد الوظيفة minifyHtml من ملف utils/minify.js

module.exports = function(content, outputPath) {
  // تطبيق التحويل فقط على ملفات HTML في مسار الإخراج
  if (outputPath && outputPath.endsWith(".html")) {
    return minifyHtml(content); // استخدام الوظيفة المستوردة لتصغير محتوى HTML
  }
  // إذا لم يكن الملف HTML، يتم إرجاع المحتوى كما هو
  return content;
};
