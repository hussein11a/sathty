// هذا الفلتر (Filter) يستخدم لتنسيق التواريخ بتنسيق W3C (ISO 8601).
// هذا التنسيق مهم للـ SEO وللسمات مثل `datetime` في وسم <time> في HTML.
// يمكنك استخدامه كالتالي في قالب Nunjucks: `{{ someDate | w3DateFilter }}`

const { DateTime } = require("luxon");

module.exports = function(dateObj) {
  // `dateObj`: كائن التاريخ الذي تريد تنسيقه
  
  // تأكد من أن `dateObj` هو كائن تاريخ صالح
  if (!(dateObj instanceof Date)) {
    console.warn('w3-date-filter: Input is not a Date object. Returning original input.');
    return dateObj;
  }

  // استخدم Luxon لتنسيق التاريخ بتنسيق ISO 8601
  return DateTime.fromJSDate(dateObj).toISO();
};

