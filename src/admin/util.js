// هذا الملف يحتوي على وظائف مساعدة (Utility Functions) يمكن استخدامها مع Netlify CMS.
// يمكن أن تتضمن هذه الوظائف:
// - معالجة البيانات قبل حفظها
// - إضافة فلاتر مخصصة لمعاينة المحتوى
// - أي منطق برمجي يدعم تخصيص Netlify CMS.

// مثال: وظيفة لتنسيق النصوص (إذا كنت بحاجة لمعالجة معينة قبل العرض أو الحفظ)
const formatText = (text) => {
    if (!text) return '';
    return text.trim().replace(/\s+/g, ' '); // إزالة المسافات الزائدة
};

// مثال: وظيفة للتحقق من صحة حقل (يمكن ربطها بواجهة CMS إذا كانت مدعومة)
const validatePhoneNumber = (number) => {
    const phoneRegex = /^\+?[0-9]{9,15}$/; // مثال بسيط لـ regex لرقم الهاتف
    return phoneRegex.test(number);
};

// يمكن تصدير هذه الوظائف لتستخدم في ملفات أخرى إذا لزم الأمر،
// أو استخدامها مباشرة داخل معاينات `previews.js` إذا كانت بسيطة.

// لا تنسى أن Netlify CMS لا يقوم بتشغيل JavaScript في بيئة Node.js،
// لذا يجب أن تكون أي وظائف هنا مخصصة للتشغيل في المتصفح.

// يمكنك استخدامها في `previews.js` عن طريق استدعائها مباشرة:
// مثال:
// CMS.registerPreviewTemplate("posts", createClass({
//   render: function() {
//     const entry = this.props.entry;
//     const title = formatText(entry.getIn(['data', 'title'])); // استخدام وظيفة formatText
//     return h('h1', {}, title);
//   }
// }));

