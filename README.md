# بُعد · bu3d — 3D printing orders (PWA)

تطبيق ويب قابل للتثبيت لاستقبال طلبات الطباعة ثلاثية الأبعاد ومتابعتها من الاستلام إلى التسليم.

## الرفع على GitHub Pages
1. أنشئ مستودعاً جديداً **Public** باسم: `bu3d-printer`
2. `Add file` ← `Upload files` ← ارفع **كل الملفات** دفعة واحدة ← `Commit`
3. `Settings` ← `Pages` ← Branch: `main` و `/ (root)` ← `Save`
4. الرابط: `https://<username>.github.io/bu3d-printer/`

أو من Termux: `bash deploy.sh https://github.com/<username>/bu3d-printer.git`

## الملفات
| الملف | الوظيفة |
|---|---|
| `index.html` · `app.js` | التطبيق |
| `catalog.js` | المنتجات والخامات والمراحل — عدّله لتغيير الكتالوج |
| `k01–k06.webp` | صور المنتجات |
| `logo.webp` · `mark.webp` | الشعار والعلامة |
| `icon-*.png` | أيقونات التثبيت |
| `manifest.webmanifest` · `sw.js` | التثبيت والعمل بدون إنترنت |

## وضع الورشة
الإعدادات ← دخول صاحب الورشة ← الرمز **3333** (غيّره من: الورشة ← تغيير الرمز)

## البيانات
الإعدادات والطلبات → `localStorage` · صور المنتجات → `IndexedDB` · الكتالوج → ملفات في المستودع
