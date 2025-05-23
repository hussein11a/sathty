// هذا الفلتر (Filter) يستخدم لتنسيق التواريخ في قوالب Eleventy (Nunjucks).
// يسمح لك بتحويل كائنات التاريخ (Date objects) إلى سلاسل نصية منسقة.
// يمكنك استخدامه كالتالي في قالب Nunjucks: `{{ someDate | formatDate('YYYY-MM-DD') }}`

const { DateTime } = require("luxon"); // مكتبة قوية للتعامل مع التواريخ والأوقات

module.exports = function(dateObj, format = 'yyyy LLL dd') {
  // `dateObj`: كائن التاريخ الذي تريد تنسيقه
  // `format`: سلسلة التنسيق المطلوبة (افتراضي: YYYY MMM DD)

  // تأكد من أن `dateObj` هو كائن تاريخ صالح
  if (!(dateObj instanceof Date)) {
    console.warn('date-filter: Input is not a Date object. Returning original input.');
    return dateObj;
  }

  // استخدم Luxon لتنسيق التاريخ
  return DateTime.fromJSDate(dateObj).toFormat(format, { locale: 'ar' }); // تعيين اللغة للعربية
};

/*
  أمثلة على استخدام التنسيقات في Luxon:
  'yyyy-MM-dd' => 2024-05-23
  'dd LLL, yyyy' => 23 مايو, 2024
  'LLL dd, yyyy' => مايو 23, 2024
  'DD' => 23/05/2024 (تنسيق محلي)
  't' => 11:30 PM (وقت قصير)
  'toLocaleString(DateTime.DATE_FULL)' => الجمعة، 23 مايو 2024 (تنسيق طويل)
*/

