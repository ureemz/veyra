# VEYRA — متجر حقائب فاخرة

موقع تجارة إلكترونية تجريبي كامل لعلامة سعودية لحقائب اليد النسائية الفاخرة.  
عربي (RTL) + إنجليزي (LTR)، ١٢ منتجًا و٣٦ صورة منتج + ٤ صور بانرات، سلة ومفضلة وفلاتر ودفع تجريبي.

> **تنبيه:** الدفع تجريبي بالكامل (لا توجد بوابة دفع حقيقية). رقم واتساب مضبوط على **0542308267** (بصيغة `966542308267` داخل `assets/js/app.js` ليعمل مع `wa.me`).

---

## ١) طريقة التشغيل محليًا

الأسهل: افتحي `index.html` بالنقر المزدوج.

الأفضل (لعمل روابط نظيفة وتجربة قريبة من النشر):

```powershell
cd "C:\Users\reeem\Desktop\Veyra"
python -m http.server 8000
```

ثم افتحي: <http://localhost:8000>

---

## ٢) هيكل الملفات

```text
Veyra/
├─ index.html              الرئيسية
├─ collections.html        المجموعات + الفلاتر + الترتيب
├─ product.html            صفحة المنتج (?id=...)
├─ cart.html               السلة + كود الخصم + تغليف الهدايا
├─ checkout.html           الدفع التجريبي
├─ about.html              قصة البراند
├─ contact.html            تواصل + واتساب
├─ faq.html                الأسئلة والسياسات
├─ assets/
│  ├─ css/style.css        كل التصميم والتجاوب
│  └─ js/
│     ├─ data.js           المنتجات، الأسعار، الألوان، الفلاتر
│     ├─ i18n.js           النصوص العربية والإنجليزية
│     ├─ app.js            السلة، المفضلة، البطاقة، التفاعلات
│     └─ pages.js          منطق كل صفحة
├─ images/
│  ├─ hero/               ٤ صور عريضة WebP
│  └─ products/           ٣٦ صورة منتج WebP
├─ image_sources.json      مصادر الصور والتراخيص
├─ _tools/build_images.py  (اختياري) إعادة توليد صور WebP
└─ README.md
```

---

## ٣) أين أعدّل المحتوى؟

| أريد تعديل… | الملف |
|---|---|
| منتج، سعر، صور، ألوان، وصف | `assets/js/data.js` (مصفوفة `products`) |
| أي نص ظاهر بالعربية أو الإنجليزية | `assets/js/i18n.js` |
| رقم واتساب | `assets/js/app.js` → `WHATSAPP = "966542308267"` (المعروض: `0542308267`) |
| كود الخصم | `assets/js/pages.js` → `VEYRA10` (خصم ١٠٪) |
| الألوان والخطوط | `assets/css/style.css` → `:root` |

**إضافة منتج جديد:** أضفي كائنًا داخل `products` في `data.js`،ضع ٣ صور في `images/products/` بالاسم نفسه، وسيظهر تلقائيًا في كل الصفحات.

---

## ٤) الرفع يدويًا إلى GitHub Pages (خطوة بخطوة)

1. افتحي GitHub → **New repository** واكتبي اسمًا مثل `veyra-store`، واجعليه **Public**، ثم **Create repository**.
2. افتحي PowerShell داخل مجلد المشروع:

```powershell
cd "C:\Users\reeem\Desktop\Veyra"
git init
git add .
git commit -m "Veyra store initial release"
git branch -M main
git remote add origin https://github.com/<USERNAME>/veyra-store.git
git push -u origin main
```

3. في مستودعك على GitHub: **Settings** ← **Pages**.
4. تحت **Build and deployment** → **Source** اختر **Deploy from a branch**.
5. **Branch:** `main` و **Folder:** `/ (root)` ← **Save**.
6. انتظري دقيقة أو دقيقتين، ثم افتحي:  
   `https://<USERNAME>.github.io/veyra-store/`

> عند أي تعديل لاحق: `git add .` ثم `git commit -m "update"` ثم `git push`. وينتشر الموقع تلقائيًا.

---

## ٥) الرفع يدويًا إلى Cloudflare Pages

### الطريقة الأسهل (سحب وإفلات)
1. افتحي <https://dash.cloudflare.com> ← **Workers & Pages** ← **Create** ← **Pages**.
2. اختر **Upload assets** (اسحبي مجلد `Veyra` كاملًا أو اضغطي Select assets واختاري المجلد).
3. اكتبي اسم المشروع `veyra` ← **Deploy**.
4. ستحصلين على رابط مثل `https://veyra.pages.dev`.

### الطريقة الموصى بها (مرتبط بـ GitHub)
1. **Workers & Pages** ← **Create** ← **Pages** ← **Connect to Git**.
2. اختاري مستودع `veyra-store` ← **Begin setup**.
3. إعدادات البناء:
   - **Framework preset:** None
   - **Build command:** (اتركه فارغًا)
   - **Build output directory:** `/`
4. **Save and Deploy**. كل `git push` ينشر تلقائيًا.

### ربط دومين خاص (اختياري)
**Custom domains** ← **Add a domain** ← اكتبي مثلاً `shop.yourdomain.com` ← أضفي سجل DNS الذي يعرضه Cloudflare.

---

## ٦) الصور والتراخيص

كل الصور من **Pexels** ضمن [رخصة Pexels](https://www.pexels.com/license/): استخدام تجاري مجاني، بدون نسب إلزامي (أضفنا اسم المصور احترامًا له).  
لا توجد صور من براندات حقيقية ولا شعارات تجارية. حُوّلت كلها إلى WebP بأبعاد ثابتة:
- المنتجات: `1200 × 1500`، وبطانة بلون الموقع حتى لا تُقصّ التفاصيل.
- البانرات: `2000 × 1200`.

| الصورة | المصدر | المصور | الترخيص |
|---|---|---|---|
| `images/products/veyra-solene-tote-1.webp` | [Pexels #22434759](https://www.pexels.com/photo/22434759/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-solene-tote-2.webp` | [Pexels #22434773](https://www.pexels.com/photo/22434773/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-solene-tote-3.webp` | [Pexels #22432984](https://www.pexels.com/photo/22432984/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-mira-crossbody-1.webp` | [Pexels #22432989](https://www.pexels.com/photo/22432989/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-mira-crossbody-2.webp` | [Pexels #22434766](https://www.pexels.com/photo/22434766/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-mira-crossbody-3.webp` | [Pexels #26736142](https://www.pexels.com/photo/26736142/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-noir-mini-1.webp` | [Pexels #26736140](https://www.pexels.com/photo/26736140/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-noir-mini-2.webp` | [Pexels #36125059](https://www.pexels.com/photo/36125059/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-noir-mini-3.webp` | [Pexels #26736141](https://www.pexels.com/photo/26736141/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-dune-shoulder-1.webp` | [Pexels #26954381](https://www.pexels.com/photo/26954381/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-dune-shoulder-2.webp` | [Pexels #27174573](https://www.pexels.com/photo/27174573/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-dune-shoulder-3.webp` | [Pexels #10340652](https://www.pexels.com/photo/10340652/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-layla-clutch-1.webp` | [Pexels #27835301](https://www.pexels.com/photo/27835301/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-layla-clutch-2.webp` | [Pexels #33471443](https://www.pexels.com/photo/33471443/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-layla-clutch-3.webp` | [Pexels #13870014](https://www.pexels.com/photo/13870014/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-rania-top-handle-1.webp` | [Pexels #8502477](https://www.pexels.com/photo/8502477/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-rania-top-handle-2.webp` | [Pexels #22434761](https://www.pexels.com/photo/22434761/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-rania-top-handle-3.webp` | [Pexels #12105084](https://www.pexels.com/photo/12105084/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-saha-tote-1.webp` | [Pexels #36365228](https://www.pexels.com/photo/36365228/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-saha-tote-2.webp` | [Pexels #23223862](https://www.pexels.com/photo/23223862/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-saha-tote-3.webp` | [Pexels #5706269](https://www.pexels.com/photo/5706269/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-lina-shoulder-1.webp` | [Pexels #10919291](https://www.pexels.com/photo/10919291/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-lina-shoulder-2.webp` | [Pexels #12442672](https://www.pexels.com/photo/12442672/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-lina-shoulder-3.webp` | [Pexels #31867644](https://www.pexels.com/photo/31867644/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-rima-mini-1.webp` | [Pexels #12442670](https://www.pexels.com/photo/12442670/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-rima-mini-2.webp` | [Pexels #8502484](https://www.pexels.com/photo/8502484/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-rima-mini-3.webp` | [Pexels #27298414](https://www.pexels.com/photo/27298414/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-hana-crossbody-1.webp` | [Pexels #29793778](https://www.pexels.com/photo/29793778/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-hana-crossbody-2.webp` | [Pexels #27292673](https://www.pexels.com/photo/27292673/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-hana-crossbody-3.webp` | [Pexels #20399713](https://www.pexels.com/photo/20399713/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-sofia-bag-1.webp` | [Pexels #22432981](https://www.pexels.com/photo/22432981/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-sofia-bag-2.webp` | [Pexels #27046147](https://www.pexels.com/photo/27046147/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-sofia-bag-3.webp` | [Pexels #27046146](https://www.pexels.com/photo/27046146/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-ayla-clutch-1.webp` | [Pexels #23223851](https://www.pexels.com/photo/23223851/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-ayla-clutch-2.webp` | [Pexels #22434782](https://www.pexels.com/photo/22434782/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/products/veyra-ayla-clutch-3.webp` | [Pexels #26954371](https://www.pexels.com/photo/26954371/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/hero/veyra-hero-1.webp` | [Pexels #5689076](https://www.pexels.com/photo/5689076/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/hero/veyra-hero-2.webp` | [Pexels #37384060](https://www.pexels.com/photo/37384060/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/hero/veyra-hero-3.webp` | [Pexels #8396731](https://www.pexels.com/photo/8396731/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |
| `images/hero/veyra-hero-4.webp` | [Pexels #26316185](https://www.pexels.com/photo/26316185/) | Pexels contributor | [Pexels License](https://www.pexels.com/license/) |

---

## ٧) ملاحظات نهائية

- زر اللغة يبدّل `dir` وكل النصوص ديناميكيًا وحالة اللغة محفوظة في `localStorage`.
- السلة والمفضلة محفوظتان محليًا في المتصفح.
- كود الخصم التجريبي: **VEYRA10**.
- الشحن: مجاني فوق ١٬٥٠٠ ر.س، وإلا ٣٥ ر.س. تغليف الهدايا +٥٠ ر.س.
- للإنتاج الحقيقي: استبدلي الدفع التجريبي بوابة (مدى/Stripe)، وأضفي API للطلبات، وراجعي سياسات الإرجاع قانونيًا.
