const htmlmin = require("html-minifier"); // لتحسين حجم ملفات HTML
const pluginRss = require("@11ty/eleventy-plugin-rss"); // لفلتر dateToRfc822 إذا احتجت له مستقبلاً أو لأي وظيفة أخرى

module.exports = function(eleventyConfig) {

    // --- 1. المكونات الإضافية (Plugins) ---
    // إضافة مكون RSS الإضافي (حتى لو لم تستخدم feed.njk حالياً، قد تحتاج لبعض فلاتره مثل dateToRfc822)
    eleventyConfig.addPlugin(pluginRss);

    // --- 2. تمرير المجلدات/الملفات مباشرة (Passthrough Copies) ---
    // يتم نسخ هذه المجلدات والملفات مباشرة إلى مجلد البناء (عادةً _site/) دون معالجة بواسطة Eleventy.
    // هذا مهم للملفات الثابتة مثل CSS، JS، والصور.
    eleventyConfig.addPassthroughCopy("src/assets"); // لملفات CSS, JS, Images
    eleventyConfig.addPassthroughCopy("src/favicon.ico"); // أيقونة الموقع
    eleventyConfig.addPassthroughCopy("src/robots.txt"); // ملف Robots.txt الذي أنشأناه
    // eleventyConfig.addPassthroughCopy("src/admin/"); // إذا كان لديك مجلد خاص بملفات الإدارة الثابتة

    // --- 3. إعدادات Nunjucks (أو أي محرك قوالب آخر) ---
    // يحدد Eleventy افتراضيًا امتدادات ملفات القوالب.
    // يمكنك هنا تخصيصها إذا أردت.
    eleventyConfig.setLiquidOptions({
        dynamicPartials: false, // لمنع أخطاء مع تضمينات Liquid
    });
    eleventyConfig.setNunjucksEnvironmentOptions({
        throwOnUndefined: false, // يسمح بمتغيرات غير معرفة دون إيقاف البناء
        autoescape: false, // يسمح بإضافة HTML يدويًا في Markdown بدون هروب الأحرف
    });

    // --- 4. فلاتر مخصصة (Custom Filters) ---
    // الفلاتر تسمح لك بمعالجة البيانات داخل قوالبك.

    // فلتر لتحويل التاريخ إلى تنسيق مقروء (مثال: May 23, 2025)
    eleventyConfig.addFilter("readableDate", dateObj => {
        return new Date(dateObj).toLocaleDateString('ar-EG', { // 'ar-EG' للغة العربية، يمكنك تغييرها
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    // فلتر لتحويل النص إلى Slug (صديق للروابط - مثال: "سطحة عادية" تصبح "سطحة-عادية")
    eleventyConfig.addFilter("slug", (input) => {
        if (!input) return '';
        return String(input).normalize('NFD').replace(/[\u0621-\u064A]/g, function (match) {
            // تحويل الأحرف العربية إلى ما يقابلها اللاتيني البسيط (ليس مثالياً لكن يكفي)
            // هذه مكتبة بسيطة للتحويل، قد تحتاج مكتبة أكثر قوة إذا كانت الحاجة معقدة
            const arabicMap = {
                'أ': 'a', 'ا': 'a', 'إ': 'i', 'ب': 'b', 'ت': 't', 'ث': 'th', 'ج': 'j', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'dh', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'q', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'و': 'w', 'ي': 'y', 'ى': 'a', 'ة': 'h', 'لا': 'la', 'ؤ': 'o', 'ئ': 'i', 'ء': 'a'
            };
            return arabicMap[match] || '';
        }).toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, '') // Remove all non-word chars
        .replace(/--+/g, '-'); // Replace multiple - with single -
    });


    // --- 5. المجموعات المخصصة (Custom Collections) ---
    // يمكنك هنا تعريف مجموعات من المحتوى بخلاف المجموعات الافتراضية (مثل 'all').
    // حاليا، بما أنه لا توجد مدونة أو أخبار، قد لا تحتاج مجموعات معقدة.
    // eleventyConfig.addCollection("posts", function(collection) {
    //     return collection.getFilteredByGlob("src/posts/*.md");
    // });

    // --- 6. خيارات بناء الموقع (Build Options) ---

    // تحسين HTML لتقليل حجم الملفات الناتجة (اختياري)
    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if( outputPath && outputPath.endsWith(".html") ) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
            });
            return minified;
        }
        return content;
    });

    // --- 7. إعدادات مجلدات الإدخال والإخراج ---
    return {
        dir: {
            input: "src",      // مجلد الملفات المصدرية
            includes: "_includes", // مجلد القوالب الجزئية (مثل base.njk)
            layouts: "_layouts", // مجلد القوالب الكاملة (إذا كانت منفصلة عن includes)
            data: "_data",     // مجلد ملفات البيانات (مثل site.json)
            output: "_site"    // مجلد الإخراج (حيث يتم بناء الموقع)
        },
        // أنواع الملفات التي سيتم معالجتها بواسطة Eleventy
        templateFormats: ["md", "njk", "html"],
        // محرك القوالب الافتراضي لملفات Markdown (يمكن أن يكون liquid, njk, html)
        markdownTemplateEngine: "njk",
        // محرك القوالب الافتراضي لملفات HTML (يمكن أن يكون liquid, njk, html)
        htmlTemplateEngine: "njk",
        // معالجة ملفات Markdown قبل تطبيق محرك القوالب.
        // False يعني أن الـ Front Matter فقط هو الذي يُعالج بواسطة Nunjucks
        // True يعني أن محتوى Markdown نفسه يمر عبر Nunjucks قبل تحويله لـ HTML
        dataTemplateEngine: "njk",
    };
};

