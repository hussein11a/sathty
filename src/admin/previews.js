// هذا الملف يستخدم لتخصيص معاينات المحتوى في Netlify CMS.
// يسمح لك برؤية كيف سيبدو المحتوى الخاص بك على الموقع الفعلي
// أثناء تحريره في لوحة تحكم Netlify CMS.

// يجب أن تكون Netlify CMS مسجلة عالمياً (عبر <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>)
// قبل استيراد هذا الملف.

// مثال لمعاينة بسيطة للخدمات:
CMS.registerPreviewTemplate("posts", createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']);
    const description = entry.getIn(['data', 'description']);

    return h('div', {},
      h('h1', {}, title),
      h('p', {}, description)
      // يمكنك إضافة المزيد من العناصر هنا لعرض باقي الحقول
      // h('img', { src: this.props.getAsset(entry.getIn(['data', 'image'])) })
    );
  }
}));

// مثال لمعاينة للصفحات:
CMS.registerPreviewTemplate("pages", createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']);
    const body = this.props.widgetFor('body'); // لعرض محتوى Markdown

    return h('div', {},
      h('h1', {}, title),
      h('div', {className: 'content'}, body)
    );
  }
}));

// مثال لمعاينة لإعدادات الموقع (tokens.json):
CMS.registerPreviewTemplate("tokens", createClass({
  render: function() {
    const entry = this.props.entry;
    const siteName = entry.getIn(['data', 'site_name']);
    const siteDescription = entry.getIn(['data', 'site_description']);
    const phoneNumber = entry.getIn(['data', 'phone_number']);

    return h('div', {},
      h('h2', {}, 'معاينة إعدادات الموقع'),
      h('p', {}, 'اسم الموقع: ', siteName),
      h('p', {}, 'الوصف: ', siteDescription),
      h('p', {}, 'رقم الهاتف: ', phoneNumber)
    );
  }
}));

