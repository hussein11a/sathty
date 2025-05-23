// هذا الفلتر (Filter) يستخدم لتحويل نصوص Markdown إلى HTML.
// يُستخدم هذا الفلتر عادةً لعرض المحتوى الذي يتم كتابته بصيغة Markdown في قوالب Eleventy.
// يمكنك استخدامه كالتالي في قالب Nunjucks: `{{ markdownContent | markdownFilter | safe }}`
// يجب أن يكون `safe` بعد الفلتر لمنع Nunjucks من معالجة HTML كـ نص عادي.

const markdownIt = require("markdown-it"); // مكتبة لتحويل Markdown

// تهيئة Markdown-it
// يمكنك إضافة خيارات أو إضافات (plugins) هنا إذا كنت بحاجة لميزات Markdown إضافية
const md = new markdownIt({
  html: true,        // تمكين علامات HTML في المصدر
  breaks: true,      // تحويل Newlines إلى <br>
  linkify: true      // تحويل الروابط النصية إلى روابط <a href="...">
});

module.exports = function(markdownString) {
  // `markdownString`: السلسلة النصية التي تحتوي على Markdown
  if (typeof markdownString !== 'string') {
    console.warn('markdown-filter: Input is not a string. Returning original input.');
    return markdownString;
  }
  return md.render(markdownString);
};

