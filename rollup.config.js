// rollup.config.js

// استيراد المكونات الإضافية (plugins)
// تحتاج إلى تثبيت هذه المكونات أولاً:
// npm install @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript rollup-plugin-terser @rollup/plugin-babel --save-dev

import resolve from '@rollup/plugin-node-resolve'; // يسمح لـ Rollup بإيجاد الوحدات النمطية في node_modules
import commonjs from '@rollup/plugin-commonjs';   // يحول الوحدات النمطية من CommonJS إلى ES6
import typescript from '@rollup/plugin-typescript'; // يدعم ملفات TypeScript
import { terser } from 'rollup-plugin-terser';      // يقوم بضغط وتصغير الكود (minification)
import babel from '@rollup/plugin-babel';         // يحول كود JavaScript الحديث إلى إصدارات أقدم (للتوافقية)
import pkg from './package.json';                 // استيراد ملف package.json للحصول على معلومات مثل الاسم والإصدار

export default {
  // 1. نقطة الدخول (Input)
  input: 'src/index.ts', // أو 'src/index.js' إذا كنت لا تستخدم TypeScript

  // 2. مخرجات التجميع (Output)
  output: [
    {
      file: pkg.main,      // المسار إلى ملف الإخراج الرئيسي (عادةً للمتصفحات أو البيئات التي تدعم CommonJS)
      format: 'cjs',       // تنسيق CommonJS (مثل Node.js)
      sourcemap: true,     // إنشاء ملف sourcemap لتسهيل تصحيح الأخطاء
    },
    {
      file: pkg.module,    // المسار إلى ملف الإخراج للوحدات النمطية (ES Modules)
      format: 'es',        // تنسيق ES Modules (القياسي الجديد في JavaScript)
      sourcemap: true,
    },
    {
      // خيار إضافي: إصدار UMD (Universal Module Definition) للبيئات التي لا تدعم ES Modules أو CommonJS
      // مثل تضمين السكريبت مباشرة في المتصفح عبر علامة <script>
      file: `dist/${pkg.name}.umd.js`, // اسم الملف
      format: 'umd',       // تنسيق UMD
      name: 'MyAwesomeLibrary', // اسم المتغير العام الذي ستكون مكتبتك متاحة من خلاله في المتصفح
      sourcemap: true,
      globals: {           // إذا كانت مكتبتك تعتمد على مكتبات عالمية موجودة بالفعل (مثل jQuery)
        // 'jquery': '$'
      },
    },
  ],

  // 3. المكونات الإضافية (Plugins)
  plugins: [
    resolve(), // يحل مسارات الوحدات النمطية (خاصة من node_modules)
    commonjs(),// يحول الوحدات النمطية من CommonJS (مثل التي تستخدمها معظم حزم npm) إلى ES Modules

    // إذا كنت تستخدم TypeScript:
    typescript({
      tsconfig: './tsconfig.json' // تحديد مسار ملف tsconfig.json
    }),

    // إذا كنت تحتاج إلى Babel لتحويل الكود (مثل تحويل ES6+ إلى ES5 للتوافق مع المتصفحات القديمة):
    babel({
      babelHelpers: 'bundled', // أو 'runtime' إذا كنت تستخدم @babel/plugin-transform-runtime
      exclude: 'node_modules/**', // لا تحول الملفات داخل node_modules
      extensions: ['.js', '.jsx', '.ts', '.tsx'] // حدد الامتدادات التي يجب أن يعالجها Babel
    }),

    // لضغط وتصغير الكود (لإصدار الإنتاج):
    // يمكنك وضعه في نهاية قائمة الـ plugins أو تضمينه في تكوين منفصل للإنتاج
    process.env.NODE_ENV === 'production' && terser(), // سيتم تشغيل terser فقط في وضع الإنتاج
  ],

  // 4. التبعيات الخارجية (External Dependencies)
  // يخبر Rollup أن هذه الحزم يجب ألا يتم تضمينها في ملف التجميع النهائي.
  // بدلاً من ذلك، سيتم اعتبارها متوفرة في بيئة التشغيل.
  external: [
    ...Object.keys(pkg.dependencies || {}), // افترض أن جميع الـ dependencies خارجية
    // 'react', // مثال: إذا كنت تستخدم React ولكن لا تريد تضمينها في الحزمة النهائية
    // 'react-dom'
  ],
};

