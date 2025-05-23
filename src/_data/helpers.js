// هذا الملف يحتوي على وظائف مساعدة (Helper Functions) يمكن استخدامها في Eleventy.
// يمكن أن تتضمن هذه الوظائف فلاتر مخصصة (custom filters) أو shortcodes (اختصارات)
// أو أي منطق برمجي مفيد لمعالجة البيانات أو المحتوى في القوالب.

module.exports = {
  // مثال على فلتر مخصص: لتنسيق التاريخ
  // يمكن استخدامه في Nunjucks كـ `{{ dateString | formatDate('YYYY-MM-DD') }}`
  formatDate: (dateInput, format) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      return dateInput; // إذا كان التاريخ غير صالح، أعد القيمة الأصلية
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    if (format === 'YYYY-MM-DD') {
      return `${year}-${month}-${day}`;
    }
    // يمكنك إضافة المزيد من تنسيقات التاريخ هنا
    return `${day}/${month}/${year}`;
  },

  // مثال على shortcode مخصص: لإدراج أيقونة
  // لاستخدامه: `{% icon 'phone' %}`
  /*
  icon: (iconName) => {
    const icons = {
      phone: '<svg class="icon icon-phone" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.103 6.103l.774-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>',
      whatsapp: '<svg class="icon icon-whatsapp" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.5 3.44 1.46 4.93L2.05 22l5.03-1.32c1.44.79 3.08 1.23 4.96 1.23 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm3.32 13.91s-.1.05-.2.05c-.11 0-.67-.25-.97-.36-.29-.11-.5-.16-.7-.16s-.4.05-.6.25c-.2.2-.77.77-.94.97-.17.2-.33.22-.61.12-.3-.1-.97-.36-1.85-.85-.98-.55-1.64-1.46-1.83-1.74-.19-.29-.02-.45.13-.59.13-.13.29-.33.43-.49.14-.16.19-.29.29-.49s.05-.33-.02-.49c-.07-.16-.67-1.7-.91-2.31-.24-.61-.48-.5-.65-.54-.17-.04-.36-.05-.55-.05-.19 0-.5.06-.76.33-.26.26-.96.95-.96 2.3 0 1.36.99 2.66 1.13 2.86.14.2 1.93 2.97 4.67 4.14 1.91.8 2.76.7 3.28.66.52-.04 1.2-.48 1.38-.97.18-.49.18-.9.13-.97s-.1-.13-.2-.18c-.1-.05-.22-.1-.4-.1z" fill-rule="evenodd"/></svg>',
    };
    return icons[iconName] || '';
  }
  */
};

