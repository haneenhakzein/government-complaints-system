# نظام الشكاوى

لوحة تحكم لإدارة الشكاوى الحكومية: تسجيل الدخول، الشكاوى، الأقسام، المستخدمون، والتقارير.

الواجهة React، والـ API على Laravel. كل الطلبات تمر من عميل واحد.

## التشغيل

```bash
npm install
npm run dev
```

انسخ `.env.example` إلى `.env` إذا الملف غير موجود:

```text
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

## الطبقات

```text
Page → View → Hook → Service → apiClient → Backend
```

| الطبقة | المسؤولية |
|---|---|
| Page | نقطة دخول المسار فقط |
| View | الواجهة، بدون طلبات HTTP |
| Hook | حالة التحميل والخطأ والبيانات |
| Service | استدعاء الـ API |
| Mapper | تحويل رد السيرفر لشكل ثابت |
| apiClient | Axios، التوكن، وعنوان السيرفر |

مسارات الـ API كلها في `src/common/constants/endpoints.js`.

## الهيكل

```text
src/
  common/          الإعدادات، الجلسة، عميل الـ API، المسارات
  layout/          الشريط الجانبي، الشريط العلوي، إطار اللوحة
  routes/          المسارات وحماية الصفحات
  pages/           صفحات رفيعة
  features/
    auth/
    complaints/
    entities/
    users/
    reports/
```

كل feature فيها `components` و`hooks` و`services` و`mappers`، وتصدّر من `index.js`.

## الصفحات

| المسار | الصفحة | الصلاحية |
|---|---|---|
| `/` | تسجيل الدخول | زائر |
| `/dashboard/complaints` | الشكاوى | مستخدم مسجّل |
| `/dashboard/entities` | الأقسام | مستخدم مسجّل |
| `/dashboard/employees` | المستخدمون | أدمن |
| `/dashboard/reports` | التقارير | مستخدم مسجّل |

جلسة منتهية ترجع المستخدم لصفحة الدخول. صفحة المستخدمين لا تفتح إلا لدور `admin`.
