// هذا الملف هو مكون JavaScript للتعامل مع تبديل الثيم (الوضع الداكن/الفاتح)
// يتم استخدامه عادةً مع زر في واجهة المستخدم يسمح للمستخدم بتغيير مظهر الموقع.

(function() {
  const themeToggle = document.getElementById('theme-toggle'); // تأكد من أن لديك زرًا بهذا الـ ID في HTML
  const body = document.body;
  const currentTheme = localStorage.getItem('theme'); // التحقق من الثيم المحفوظ في التخزين المحلي

  // تطبيق الثيم المحفوظ عند تحميل الصفحة
  if (currentTheme) {
    body.classList.add(currentTheme);
  } else {
    // إذا لم يكن هناك ثيم محفوظ، تحقق من تفضيلات النظام
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      body.classList.add('dark-theme');
    } else {
      body.classList.add('light-theme');
    }
  }

  // إضافة مستمع حدث لزر التبديل
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
      } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
      }
    });
  }
})();

// ملاحظات:
// 1. يجب أن يكون لديك زر في ملف HTML الخاص بك (مثلاً في partials/header.njk)
//    على النحو التالي: <button id="theme-toggle" aria-label="Toggle theme">Mode</button>
// 2. يجب أن يكون لديك تعريفات CSS للثيمات. على سبيل المثال في main.css أو global.css:
/*
  :root {
    --background-color-light: #ffffff;
    --text-color-light: #333333;
    --primary-color-light: #007bff;
  }

  body.light-theme {
    background-color: var(--background-color-light);
    color: var(--text-color-light);
    // المزيد من المتغيرات للثيم الفاتح
  }

  :root {
    --background-color-dark: #1a1a1a;
    --text-color-dark: #eeeeee;
    --primary-color-dark: #66b3ff;
  }

  body.dark-theme {
    background-color: var(--background-color-dark);
    color: var(--text-color-dark);
    // المزيد من المتغيرات للثيم الداكن
  }
*/
// 3. يجب تضمين هذا السكريبت في ملف HTML الخاص بك (مثلاً في base.njk أو site-foot.njk)
//    قبل وسم إغلاق </body>: <script src="/assets/js/components/theme-toggle.js"></script>
//    (تأكد من أن Eleventy ينسخ هذا الملف إلى مجلد assets/js/components).

