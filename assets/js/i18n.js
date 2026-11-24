/* ============================================================
   VEYRA — نظام الترجمة العربية / الإنجليزية
   ============================================================ */
(function (global) {
  "use strict";

  const DICT = {
    ar: {
      announce: "شحن مجاني للطلبات فوق ١٬٥٠٠ ر.س · توصيل خلال ٢–٤ أيام داخل السعودية",
      nav_home: "الرئيسية", nav_collections: "المجموعات", nav_about: "قصتنا", nav_contact: "تواصل", nav_faq: "الأسئلة الشائعة",
      search: "بحث", cart: "السلة", menu: "القائمة", lang: "EN",
      hero_eyebrow: "VEYRA · RiYADH · 2026", hero_title: "أناقة تُحمل", hero_sub: "Carried with grace",
      hero_desc: "حقائب جلد فاخرة صُممت للمرأة التي تختار الهدوء والجودة. تفاصيل مدروسة، خامات استثنائية، وحضور لا يحتاج إلى ضجيج.",
      hero_cta: "تسوقي الآن", hero_secondary: "اكتشفي قصتنا", hero_note: "مجموعة محدودة · إصدار ٢٠٢٦",
      trust_free: "شحن مجاني فوق ١٬٥٠٠ ر.س", trust_secure: "دفع آمن ومشفّر", trust_return: "إرجاع خلال ١٤ يومًا", trust_quality: "ضمان الجودة والحِرفية",
      section_new: "وصل حديثًا", section_new_sub: "قطع جديدة انضمت إلى عائلة فيرا هذا الموسم.",
      section_best: "الأكثر مبيعًا", section_best_sub: "اختيارات تعشقها عملاؤنا مرارًا وتكرارًا.",
      section_signature: "مجموعة التوقيع", section_signature_sub: "تصاميم تعبّر عن روح فيرا بوضوح وهدوء.",
      view_all: "عرض الكل", view_details: "عرض التفاصيل", quick_view: "نظرة سريعة",
      cat_new: "وصل حديثًا", cat_new_sub: "أول لمحة من إصدار هذا الموسم",
      cat_best: "الأكثر مبيعًا", cat_best_sub: "القطع التي لا تغادر القائمة",
      cat_signature: "مجموعة التوقيع", cat_signature_sub: "توقيع فيرا في كل تفصيلة",
      story_kicker: "OUR STORY", story_title: "فخامة لا تحتاج أن ترفع صوتها",
      story_text: "بدأت فيرا من سؤال بسيط: لماذا يجب أن تختار المرأة بين الأناقة والراحة؟ صممنا حقائب تُشعرها بالثقة في كل تفصيلة — من اختيار الجلد إلى آخر غرزة خياطة.",
      story_text2: "كل قطعة تُصنع بكميات محدودة، ويُعنى بها حرفيون يفهمون أن الجمال الحقيقي يعيش في التفاصيل التي لا تراها العين من النظرة الأولى.",
      story_cta: "اقرئي قصتنا",
      craft_kicker: "THE CRAFT", craft_title: "خامات تُحكى بعناية",
      craft_text: "نختار جلودًا طبيعية من مصادر موثوقة، ونعاملها بأساليب تحفظ نعومتها وشكلها لسنوات. النتيجة حقيبة تكبر معكِ ولا تفقد رونقها.",
      craft_1: "جلود مختارة بعناية", craft_1_sub: "ملمس غنيّ وتفاصيل تتقنها اليد.",
      craft_2: "خياطة يدوية دقيقة", craft_2_sub: "كل غرزة تضيف متانة وجمالًا.",
      craft_3: "إكسسوارات مطفية", craft_3_sub: "لمسة ذهبية هادئة بلا مبالغة.",
      testimonial_kicker: "KIND WORDS", testimonial_title: "مما تقوله عملاؤنا",
      t1: "الجلد مذهل والتفاصيل أدق مما توقعت. وصلت الحقيبة في تغليف جميل جدًا.", t1n: "نورة · الرياض",
      t2: "أخيرًا حقيبة عملية وأنيقة في الوقت نفسه. استخدمتها يوميًا منذ شهر.", t2n: "سارة · جدة",
      t3: "الخدمة راقية والمنتج يستحق الانتظار. أنصح فيرا لكل من تبحث عن الجودة.", t3n: "لمى · الدمام",
      newsletter_title: "كوني أول من يعرف", newsletter_text: "اشتركي في نشرتنا لتصلكِ مجموعاتنا الجديدة والعروض الخاصة.",
      newsletter_placeholder: "بريدك الإلكتروني", newsletter_button: "اشتراك", newsletter_success: "أهلًا بكِ في عائلة فيرا ✦",
      footer_desc: "حقائب جلد فاخرة بتصميم عربي راقٍ. صُنعت لتُحمل بثقة، وتُهدى بفخر.",
      footer_shop: "تسوّقي", footer_help: "المساعدة", footer_follow: "تابعينا", footer_rights: "جميع الحقوق محفوظة",
      collections_title: "مجموعات فيرا", collections_sub: "حقائب اختيرت بعناية لتناسب كل لحظة من يومكِ.",
      filters: "الفلاتر", filter_type: "النوع", filter_color: "اللون", filter_material: "الخامة", filter_price: "السعر",
      all: "الكل", sort: "ترتيب حسب", sort_featured: "المميزة", sort_low: "السعر: الأقل أولًا", sort_high: "السعر: الأعلى أولًا", sort_new: "الأحدث",
      clear: "مسح الفلاتر", results: "منتج", price_under: "أقل من ١٬٥٠٠ ر.س", price_mid: "١٬٥٠٠ – ٢٬٥٠٠ ر.س", price_high: "أكثر من ٢٬٥٠٠ ر.س",
      product_color: "اللون", product_qty: "الكمية", product_add: "أضيفي إلى السلة", product_buy: "اشترِي الآن",
      product_wishlist: "أضيفي للمفضلة", product_wishlisted: "في المفضلة", product_limited: "كمية محدودة متبقية",
      product_details: "التفاصيل والعناية", product_material: "الخامة", product_size: "المقاسات", product_care: "العناية",
      product_shipping: "الشحن", product_shipping_text: "شحن مجاني للطلبات فوق ١٬٥٠٠ ر.س. التوصيل خلال ٢–٤ أيام عمل داخل السعودية.",
      product_returns: "الإرجاع", product_returns_text: "يمكنكِ إرجاع المنتج خلال ١٤ يومًا من الاستلام بشرط أن يكون بحالته الأصلية.",
      product_related: "قد يعجبكِ أيضًا", product_zoom: "اضغطي للتكبير", product_added: "أُضيف إلى السلة",
      cart_title: "سلة التسوق", cart_empty: "سلتكِ فارغة حاليًا", cart_empty_sub: "ابدئي باكتشاف مجموعاتنا واختاري قطعتكِ المفضلة.",
      cart_empty_cta: "تسوقي المجموعات", cart_subtotal: "المجموع الفرعي", cart_shipping: "الشحن", cart_free: "مجاني",
      cart_discount: "كود الخصم", cart_placeholder: "أدخلي الكود", cart_apply: "تطبيق", cart_invalid: "الكود غير صالح", cart_total: "الإجمالي",
      cart_checkout: "إتمام الطلب", cart_continue: "متابعة التسوق", cart_remove: "إزالة", cart_gift: "تغليف هدايا فاخر (+٥٠ ر.س)",
      cart_gift_note: "تغليف يدوي بورق مختوب وشريط ذهبي مطفي.", cart_summary: "ملخص الطلب",
      checkout_title: "إتمام الطلب", checkout_sub: "خطوة واحدة تفصلكِ عن حقيبتكِ الجديدة.",
      checkout_info: "بيانات التوصيل", checkout_name: "الاسم الكامل", checkout_phone: "رقم الجوال", checkout_city: "المدينة", checkout_address: "العنوان التفصيلي",
      checkout_notes: "ملاحظات (اختياري)", checkout_payment: "طريقة الدفع", checkout_place: "تأكيد الطلب",
      checkout_success_title: "شكرًا لكِ ❤", checkout_success_text: "تم تسجيل طلبكِ تجريبيًا. سنتواصل معكِ لتأكيد التفاصيل.",
      checkout_back: "العودة للرئيسية", pay_mada: "مدى", pay_apple: "Apple Pay", pay_card: "فيزا / ماستركارد", pay_tamara: "تمارا", pay_tabby: "تابي",
      checkout_ship: "شحن داخل السعودية", checkout_ship_note: "يُضاف ٣٥ ر.س للطلبات أقل من ١٬٥٠٠ ر.س",
      about_title: "قصة فيرا", about_sub: "من فكرة صغيرة إلى علامة تحمل اسمها بثقة.",
      about_p1: "فيرا (Veira) اسم مستوحى من الفعل «أن يحمل المرء شيئًا بعناية». بدأنا في الرياض بمجموعة صغيرة من الحقائب الجلدية، ونموّنا ببطء ووعي لأننا نؤمن أن الجودة لا تُستعجل.",
      about_p2: "كل تصميم يمر بعدة مراحل: رسم أولي، اختيار خامة، نموذج تجريبي، ثم مراجعة دقيقة مع الحرفيين. لا نطلق قطعة إلا إذا كنا فخورين بحملها بأنفسنا.",
      about_values: "ما نؤمن به", value1: "الجودة قبل الكمية", value1_sub: "كميات محدودة وتفاصيل مدروسة.", value2: "الجمال الهادئ", value2_sub: "تصميم يخدم المرأة ولا يطغى عليها.", value3: "مسؤولية أكبر", value3_sub: "خامات موثوقة وعمر أطول للقطعة.",
      contact_title: "تواصلي معنا", contact_sub: "أي سؤال عن المنتجات أو الطلبات؟ نحن هنا للمساعدة.",
      contact_whatsapp: "راسلينا على واتساب", contact_form: "أرسلي رسالة", contact_name: "اسمكِ", contact_email: "البريد الإلكتروني", contact_message: "رسالتكِ", contact_send: "إرسال الرسالة",
      contact_address: "الرياض، المملكة العربية السعودية", contact_hours: "الأحد – الخميس · ٩ صباحًا حتى ٦ مساءً", contact_phone: "0542308267",
      faq_title: "الأسئلة الشائعة والسياسات", faq_sub: "كل ما تحتاجين معرفته قبل الطلب وبعده.",
      faq_tab_faq: "الأسئلة الشائعة", faq_tab_returns: "سياسة الإرجاع", faq_tab_privacy: "الخصوصية",
      q1: "هل الشحن مجاني؟", a1: "نعم، للطلبات فوق ١٬٥٠٠ ر.س داخل السعودية. للطلبات الأقل تُضاف ٣٥ ر.س.",
      q2: "كم يستغرق التوصيل؟", a2: "٢–٤ أيام عمل داخل السعودية، و٥–٧ أيام لبقية دول الخليج.",
      q3: "هل يمكنني إرجاع الحقيبة؟", a3: "نعم خلال ١٤ يومًا من الاستلام، بشرط أن تكون بحالتها الأصلية مع التغليف.",
      q4: "ما طرق الدفع المتاحة؟", a4: "مدى، Apple Pay، فيزا/ماستركارد، تمارا وتابي.",
      q5: "هل الحقائب أصلية الجلد؟", a5: "نعم، نستخدم جلودًا طبيعية مختارة، وتُذكر الخامة بوضوح في صفحة كل منتج.",
      returns_text: "لإتمام الإرجاع، تواصلي معنا عبر واتساب خلال ١٤ يومًا من الاستلام مع رقم الطلب. يجب أن تكون القطعة غير مستخدمة وبتغليفها الأصلي. يُرد المبلغ خلال ٧ أيام عمل بعد استلام القطعة وفحصها.",
      privacy_text: "نستخدم بياناتكِ (الاسم ووسيلة التواصل) فقط لتنفيذ الطلب والتواصل بشأنه. لا نشارك بياناتكِ مع أطراف ثالثة لأغراض تسويقية. يمكنكِ طلب حذف بياناتكِ في أي وقت عبر صفحة التواصل.",
      required: "يرجى تعبئة الحقول المطلوبة", invalid_email: "يرجى إدخال بريد إلكتروني صحيح", search_placeholder: "ابحثي عن حقيبة..."
    },
    en: {
      announce: "Free shipping over SAR 1,500 · 2–4 day delivery across Saudi Arabia",
      nav_home: "Home", nav_collections: "Collections", nav_about: "Our Story", nav_contact: "Contact", nav_faq: "FAQ",
      search: "Search", cart: "Cart", menu: "Menu", lang: "ع",
      hero_eyebrow: "VEYRA · RIYADH · 2026", hero_title: "Carried with grace", hero_sub: "أناقة تُحمل",
      hero_desc: "Luxury leather bags made for the woman who chooses quiet refinement. Considered details, exceptional materials, and a presence that never needs to shout.",
      hero_cta: "Shop now", hero_secondary: "Discover our story", hero_note: "Limited edition · 2026",
      trust_free: "Free shipping over SAR 1,500", trust_secure: "Secure encrypted payment", trust_return: "14-day returns", trust_quality: "Quality & craft guarantee",
      section_new: "New arrivals", section_new_sub: "Fresh pieces added to the Veyra family this season.",
      section_best: "Bestsellers", section_best_sub: "The pieces our clients return to, again and again.",
      section_signature: "Signature collection", section_signature_sub: "Designs that express Veyra's spirit with clarity and calm.",
      view_all: "View all", view_details: "View details", quick_view: "Quick view",
      cat_new: "New arrivals", cat_new_sub: "A first look at this season's edit",
      cat_best: "Bestsellers", cat_best_sub: "The pieces that never leave the list",
      cat_signature: "Signature", cat_signature_sub: "Veyra's signature in every detail",
      story_kicker: "OUR STORY", story_title: "Luxury that doesn't raise its voice",
      story_text: "Veyra began with a simple question: why should a woman have to choose between elegance and ease? We create bags that feel right in every detail — from the leather we select to the final stitch.",
      story_text2: "Every piece is made in limited numbers by artisans who understand that true beauty lives in the details you notice only on a second look.",
      story_cta: "Read our story",
      craft_kicker: "THE CRAFT", craft_title: "Materials with a story",
      craft_text: "We choose natural leathers from trusted sources and treat them to keep their softness and shape for years. The result is a bag that grows with you and never loses its grace.",
      craft_1: "Carefully selected leather", craft_1_sub: "Rich texture finished by hand.",
      craft_2: "Precise hand stitching", craft_2_sub: "Every stitch adds strength and beauty.",
      craft_3: "Matte hardware", craft_3_sub: "A quiet golden touch, never excessive.",
      testimonial_kicker: "KIND WORDS", testimonial_title: "What our clients say",
      t1: "The leather is remarkable and the details are finer than I expected. It arrived in beautiful packaging.", t1n: "Noura · Riyadh",
      t2: "Finally a bag that is both practical and elegant. I've used it every day for a month.", t2n: "Sara · Jeddah",
      t3: "The service was gracious and the piece was worth the wait. I recommend Veyra to anyone who values quality.", t3n: "Lama · Dammam",
      newsletter_title: "Be the first to know", newsletter_text: "Subscribe for new collections and private offers.",
      newsletter_placeholder: "Your email address", newsletter_button: "Subscribe", newsletter_success: "Welcome to the Veyra family ✦",
      footer_desc: "Luxury leather bags with a refined Arabic sensibility. Made to be carried with confidence and gifted with pride.",
      footer_shop: "Shop", footer_help: "Help", footer_follow: "Follow", footer_rights: "All rights reserved",
      collections_title: "Veyra collections", collections_sub: "Carefully chosen bags for every moment of your day.",
      filters: "Filters", filter_type: "Type", filter_color: "Color", filter_material: "Material", filter_price: "Price",
      all: "All", sort: "Sort by", sort_featured: "Featured", sort_low: "Price: low to high", sort_high: "Price: high to low", sort_new: "Newest",
      clear: "Clear filters", results: "products", price_under: "Under SAR 1,500", price_mid: "SAR 1,500 – 2,500", price_high: "Over SAR 2,500",
      product_color: "Color", product_qty: "Quantity", product_add: "Add to cart", product_buy: "Buy now",
      product_wishlist: "Add to wishlist", product_wishlisted: "Saved", product_limited: "Limited pieces remaining",
      product_details: "Details & care", product_material: "Material", product_size: "Dimensions", product_care: "Care",
      product_shipping: "Shipping", product_shipping_text: "Free shipping over SAR 1,500. Delivery in 2–4 business days across Saudi Arabia.",
      product_returns: "Returns", product_returns_text: "You may return the item within 14 days of delivery, in its original condition.",
      product_related: "You may also like", product_zoom: "Click to zoom", product_added: "Added to cart",
      cart_title: "Shopping cart", cart_empty: "Your cart is empty", cart_empty_sub: "Explore our collections and choose your favourite piece.",
      cart_empty_cta: "Shop collections", cart_subtotal: "Subtotal", cart_shipping: "Shipping", cart_free: "Free",
      cart_discount: "Discount code", cart_placeholder: "Enter code", cart_apply: "Apply", cart_invalid: "Invalid code", cart_total: "Total",
      cart_checkout: "Checkout", cart_continue: "Continue shopping", cart_remove: "Remove", cart_gift: "Luxury gift wrapping (+SAR 50)",
      cart_gift_note: "Hand-wrapped in textured paper with a matte gold ribbon.", cart_summary: "Order summary",
      checkout_title: "Checkout", checkout_sub: "One step away from your new bag.",
      checkout_info: "Delivery details", checkout_name: "Full name", checkout_phone: "Mobile number", checkout_city: "City", checkout_address: "Full address",
      checkout_notes: "Notes (optional)", checkout_payment: "Payment method", checkout_place: "Place order",
      checkout_success_title: "Thank you ❤", checkout_success_text: "Your demo order has been recorded. We'll contact you to confirm the details.",
      checkout_back: "Back to home", pay_mada: "Mada", pay_apple: "Apple Pay", pay_card: "Visa / Mastercard", pay_tamara: "Tamara", pay_tabby: "Tabby",
      checkout_ship: "Shipping within Saudi Arabia", checkout_ship_note: "SAR 35 added for orders under SAR 1,500",
      about_title: "Our story", about_sub: "From a small idea to a name we carry with confidence.",
      about_p1: "Veyra is inspired by the act of carrying something with care. We began in Riyadh with a small collection of leather bags, growing slowly and deliberately — because quality cannot be rushed.",
      about_p2: "Every design passes through several stages: an initial sketch, material selection, a sample, and a careful review with our artisans. We only release a piece we would be proud to carry ourselves.",
      about_values: "What we believe", value1: "Quality over quantity", value1_sub: "Limited runs and considered details.", value2: "Quiet beauty", value2_sub: "Design that serves you, never overshadows you.", value3: "Greater responsibility", value3_sub: "Trusted materials and a longer life for every piece.",
      contact_title: "Get in touch", contact_sub: "Questions about our bags or an order? We're here to help.",
      contact_whatsapp: "Message us on WhatsApp", contact_form: "Send a message", contact_name: "Your name", contact_email: "Email", contact_message: "Your message", contact_send: "Send message",
      contact_address: "Riyadh, Saudi Arabia", contact_hours: "Sunday – Thursday · 9am – 6pm", contact_phone: "+966 54 230 8267",
      faq_title: "FAQ & policies", faq_sub: "Everything you need to know before and after your order.",
      faq_tab_faq: "FAQ", faq_tab_returns: "Returns", faq_tab_privacy: "Privacy",
      q1: "Is shipping free?", a1: "Yes, for orders over SAR 1,500 within Saudi Arabia. A SAR 35 fee applies to smaller orders.",
      q2: "How long does delivery take?", a2: "2–4 business days in Saudi Arabia, and 5–7 days for other Gulf countries.",
      q3: "Can I return the bag?", a3: "Yes, within 14 days of delivery, in original condition with its packaging.",
      q4: "Which payment methods are available?", a4: "Mada, Apple Pay, Visa/Mastercard, Tamara and Tabby.",
      q5: "Are the bags genuine leather?", a5: "Yes. We use selected natural leathers, and the material is clearly stated on each product page.",
      returns_text: "To return an item, message us on WhatsApp within 14 days of delivery with your order number. The piece must be unused and in its original packaging. Refunds are issued within 7 business days after inspection.",
      privacy_text: "We use your details (name and contact) only to fulfil and follow up on your order. We never share them with third parties for marketing. You may request deletion at any time via the contact page.",
      required: "Please fill in the required fields", invalid_email: "Please enter a valid email", search_placeholder: "Search for a bag..."
    }
  };

  let current = "ar";

  function t(key) {
    return (DICT[current] && DICT[current][key]) || key;
  }

  function apply(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach(el => {
      const val = t(el.dataset.i18n);
      if (val) el.textContent = val;
    });
    scope.querySelectorAll("[data-i18n-ph]").forEach(el => {
      el.setAttribute("placeholder", t(el.dataset.i18nPh));
    });
    scope.querySelectorAll("[data-i18n-aria]").forEach(el => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });
    document.documentElement.lang = current;
    document.documentElement.dir = current === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-lang-label]").forEach(el => {
      el.textContent = t("lang");
    });
  }

  function set(lang, silent) {
    current = lang === "en" ? "en" : "ar";
    try { localStorage.setItem("veyra_lang", current); } catch (e) { /* noop */ }
    apply();
    if (!silent) window.dispatchEvent(new CustomEvent("veyra:lang", { detail: { lang: current } }));
  }

  function init() {
    let saved = "ar";
    try { saved = localStorage.getItem("veyra_lang") || "ar"; } catch (e) { /* noop */ }
    set(saved, true);
  }

  global.VeyraI18n = { t, apply, set, init, get lang() { return current; } };
})(window);
