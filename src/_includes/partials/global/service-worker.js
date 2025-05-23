// هذا هو كود Service Worker.
// يستخدم هذا الملف لتسريع تحميل الموقع وتوفير دعم للعمل دون اتصال بالإنترنت (Offline access).
// يقوم بالتخزين المؤقت للملفات الأساسية للموقع (CSS, JS, صور) لتقليل طلبات الشبكة.

const CACHE_NAME = 'sathaty-cache-v1'; // اسم ذاكرة التخزين المؤقت
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/global.css',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/js/lazyload.js',
  '/assets/js/protect.js',
  '/assets/images/logo.png',
  '/assets/images/favicon.png',
  '/assets/images/phone-icon.png',
  '/assets/images/whatsapp-icon.png',
  // أضف هنا جميع الملفات الأساسية التي ترغب في تخزينها مؤقتًا
];

// حدث التثبيت: يتم تفعيله عند تثبيت Service Worker لأول مرة.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// حدث الجلب (Fetch): يتم تفعيله عند كل طلب شبكة من المتصفح.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // إذا كان هناك استجابة مخبأة، قم بإرجاعها
        if (response) {
          return response;
        }
        // وإلا، قم بطلبها من الشبكة
        return fetch(event.request).then(
          (response) => {
            // تحقق مما إذا كانت الاستجابة صالحة
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // إذا كانت الاستجابة صالحة، قم بتخزين نسخة منها في ذاكرة التخزين المؤقت
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});

// حدث التفعيل (Activate): يتم تفعيله عند تفعيل Service Worker جديد (بعد التثبيت).
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // حذف الكاشات القديمة
          }
        })
      );
    })
  );
});

// تأكد من تسجيل Service Worker في ملف JavaScript الرئيسي (main.js)
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     }, function(err) {
//       console.log('ServiceWorker registration failed: ', err);
//     });
//   });
// }

