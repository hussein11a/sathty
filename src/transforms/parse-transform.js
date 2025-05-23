// src/transforms/parse-transform.js
// هذا التحويل (transform) يستخدم لتحليل محتوى HTML وإجراء تعديلات عليه بعد إنشائه.
// يمكن استخدامه لأغراض مثل إضافة سمات للصور، معالجة الروابط، إلخ.

// قد تحتاج إلى مكتبة لتحليل HTML مثل 'cheerio' أو 'jsdom' إذا كانت المعالجة معقدة.
// for example: const cheerio = require('cheerio'); // npm install cheerio

module.exports = function(content, outputPath) {
  // تطبيق التحويل فقط على ملفات HTML في الإخراج
  if (outputPath && outputPath.endsWith(".html")) {
    // هنا يمكنك إضافة منطق لتحليل وتعديل محتوى HTML.
    // مثال بسيط: إضافة سمة 'data-parsed' إلى وسم body

    // إذا كنت تستخدم cheerio:
    // const $ = cheerio.load(content);
    // $('img').each((i, el) => {
    //   $(el).attr('loading', 'lazy'); // إضافة lazy loading للصور
    // });
    // return $.html();

    // بدون مكتبة (لمعالجة بسيطة جدًا، ولكن ليس موصى به للتحليل المعقد)
    let modifiedContent = content;

    // مثال: إضافة فئة للعناوين لتطبيق الروابط الدائمة (permalinks)
    // هذا المنطق قد يكون أفضل في مرحلة النماذج (templates) أو Markdown-it plugins،
    // ولكن يمكن القيام به هنا أيضًا.
    // modifiedContent = modifiedContent.replace(/<h(1|2|3|4|5|6)>(.*?)<\/h\1>/g, (match, level, text) => {
    //   const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    //   return `<h${level} id="${id}">${text}<a href="#${id}" class="heading-permalink" aria-label="رابط دائم لهذا العنوان">#</a></h${level}>`;
    // });

    return modifiedContent;
  }
  return content;
};

