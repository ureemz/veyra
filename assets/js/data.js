/* ============================================================
   VEYRA — بيانات المنتجات
   لتعديل أي منتج: غيّر الاسم/السعر/الصور من هنا فقط.
   ============================================================ */

(function (global) {
  "use strict";

  /* أسماء التصنيفات والألوان والخامات (تُستخدم في الفلاتر والترجمة) */
  const TAXONOMY = {
    types: {
      tote:     { ar: "توت",        en: "Tote" },
      crossbody:{ ar: "كروس بودي",  en: "Crossbody" },
      shoulder: { ar: "شولدر",      en: "Shoulder" },
      clutch:   { ar: "كلتش",       en: "Clutch" },
      mini:     { ar: "ميني",       en: "Mini" },
      top:      { ar: "حقيبة مقبض", en: "Top Handle" }
    },
    colors: {
      black:    { ar: "أسود",      en: "Black",    hex: "#1C1C1C" },
      camel:    { ar: "كاميل",     en: "Camel",    hex: "#B08D57" },
      beige:    { ar: "بيج",       en: "Beige",    hex: "#D8C9B4" },
      brown:    { ar: "بني",       en: "Brown",    hex: "#8A5A3B" },
      ivory:    { ar: "أوف وايت",  en: "Ivory",    hex: "#EFE9DE" },
      burgundy: { ar: "بورجندي",   en: "Burgundy", hex: "#6E2833" },
      chocolate:{ ar: "شوكولاتة",  en: "Chocolate",hex: "#4B3327" }
    },
    materials: {
      leather:  { ar: "جلد طبيعي", en: "Fine Leather" },
      croc:     { ar: "جلد تمساحي",en: "Croc-Embossed" },
      embossed: { ar: "جلد منقوش", en: "Embossed Leather" }
    }
  };

  /* توليد نصوص بديلة وصفية لكل صورة بالعربية والإنجليزية */
  function altSet(ar, en) {
    return {
      ar: [
        `حقيبة ${ar} من فيرا من الجلد الفاخر — منظر أمامي`,
        `حقيبة ${ar} من فيرا — منظر جانبي يوضح الحزام والمقبض`,
        `تفاصيل دقيقة لخامة وإغلاق حقيبة ${ar} من فيرا`
      ],
      en: [
        `Veyra ${en} luxury leather bag — front view`,
        `Veyra ${en} bag — side view showing strap and handle`,
        `Close-up detail of the leather and hardware on the Veyra ${en} bag`
      ]
    };
  }

  const products = [
    {
      id: "solene-tote",
      name: { ar: "توت سولين", en: "Solène Tote" },
      type: "tote", color: "camel", material: "leather",
      price: 1890, oldPrice: 2150,
      badge: { ar: "جديد", en: "New" },
      featured: "new", stock: 8,
      colors: ["camel", "brown"],
      images: [1, 2, 3].map(n => `images/products/veyra-solene-tote-${n}.webp`),
      alt: altSet("سولين", "Solène"),
      description: {
        ar: "توت واسع بتصميم هادئ يجمع بين العملية والرقي. مساحة داخلية تتسع لكل ما تحتاجينه، ومقبضان مدروسان يجعلان حملها مريحًا طوال اليوم.",
        en: "A spacious tote with a quietly refined silhouette. Designed to hold everything you need, with balanced handles that feel effortless to carry."
      },
      details: {
        ar: { material: "جلد طبيعي ناعم مع بطانة قطنية", size: "38 × 28 × 14 سم", care: "امسحي بقطعة قماش ناعمة وجافة" },
        en: { material: "Smooth full-grain leather, cotton lining", size: "38 × 28 × 14 cm", care: "Wipe gently with a soft, dry cloth" }
      }
    },
    {
      id: "mira-crossbody",
      name: { ar: "كروس بودي ميرا", en: "Mira Crossbody" },
      type: "crossbody", color: "brown", material: "leather",
      price: 1490, oldPrice: null,
      badge: { ar: "الأكثر مبيعًا", en: "Bestseller" },
      featured: "bestseller", stock: 4,
      colors: ["brown", "black"],
      images: [1, 2, 3].map(n => `images/products/veyra-mira-crossbody-${n}.webp`),
      alt: altSet("ميرا", "Mira"),
      description: {
        ar: "حقيبة كروس بودي أنيقة بحزام قابل للتعديل، مثالية للمناسبات النهارية والسهرات. تفاصيل ذهبية مطفية تضيف لمسة دفء دون مبالغة.",
        en: "An elegant crossbody with an adjustable strap, made for day-to-evening ease. Matte gold details add a subtle warm finish."
      },
      details: {
        ar: { material: "جلد طبيعي مع إكسسوارات ذهبية مطفية", size: "24 × 17 × 8 سم", care: "تجنبي التعرض المباشر للعطور" },
        en: { material: "Fine leather with matte gold hardware", size: "24 × 17 × 8 cm", care: "Avoid direct contact with perfumes" }
      }
    },
    {
      id: "noir-mini",
      name: { ar: "ميني نوار", en: "Noir Mini" },
      type: "mini", color: "black", material: "leather",
      price: 1290, oldPrice: 1490,
      badge: { ar: "كمية محدودة", en: "Limited" },
      featured: "signature", stock: 3,
      colors: ["black", "burgundy"],
      images: [1, 2, 3].map(n => `images/products/veyra-noir-mini-${n}.webp`),
      alt: altSet("نوار", "Noir"),
      description: {
        ar: "حقيبة ميني سوداء بخطوط نظيفة وإغلاق معدني مميز. صغيرة في الحجم، كبيرة في الحضور — رفيق مثالي للمناسبات الخاصة.",
        en: "A black mini bag with clean lines and a signature metal clasp. Small in size, striking in presence — the perfect evening companion."
      },
      details: {
        ar: { material: "جلد ناعم عالي اللمعان", size: "19 × 13 × 6 سم", care: "احفظيها في كيس قطني عند عدم الاستخدام" },
        en: { material: "Polished smooth leather", size: "19 × 13 × 6 cm", care: "Store in a cotton dust bag when not in use" }
      }
    },
    {
      id: "dune-shoulder",
      name: { ar: "شولدر دون", en: "Dune Shoulder" },
      type: "shoulder", color: "beige", material: "leather",
      price: 1690, oldPrice: null,
      badge: { ar: "جديد", en: "New" },
      featured: "new", stock: 9,
      colors: ["beige", "camel"],
      images: [1, 2, 3].map(n => `images/products/veyra-dune-shoulder-${n}.webp`),
      alt: altSet("دون", "Dune"),
      description: {
        ar: "تدرجات بيج دافئة وحزام مريح يجعلها الحقيبة اليومية المثالية. تصميم ينتمي إلى لغة الفخامة الهادئة التي تعتمدها فيرا.",
        en: "Warm beige tones and an easy shoulder strap make this the ideal everyday bag — a piece rooted in Veyra's quiet luxury language."
      },
      details: {
        ar: { material: "جلد طبيعي بحزام بلون متناسق", size: "30 × 20 × 10 سم", care: "نظفي الإكسسوارات بقطعة جافة" },
        en: { material: "Natural leather with tone-on-tone strap", size: "30 × 20 × 10 cm", care: "Dry-clean hardware with a soft cloth" }
      }
    },
    {
      id: "layla-clutch",
      name: { ar: "كلتش ليلى", en: "Layla Clutch" },
      type: "clutch", color: "ivory", material: "leather",
      price: 1150, oldPrice: null,
      badge: { ar: "كلاسيكي", en: "Classic" },
      featured: "signature", stock: 6,
      colors: ["ivory", "beige"],
      images: [1, 2, 3].map(n => `images/products/veyra-layla-clutch-${n}.webp`),
      alt: altSet("ليلى", "Layla"),
      description: {
        ar: "كلتش بلون عاجي وتفاصيل معدنية دقيقة. يتسع للأساسيات ويمنح إطلالتك مساحة من الهدوء والأناقة.",
        en: "An ivory clutch with fine metal detailing. Room for the essentials, and a quiet elegance for every occasion."
      },
      details: {
        ar: { material: "جلد ناعم بتفاصيل معدنية", size: "26 × 12 × 4 سم", care: "امسحي بلطف بقطعة قماش جافة" },
        en: { material: "Soft leather with metal accents", size: "26 × 12 × 4 cm", care: "Gently wipe with a dry cloth" }
      }
    },
    {
      id: "rania-top-handle",
      name: { ar: "حقيبة رانيا", en: "Rania Top Handle" },
      type: "top", color: "brown", material: "croc",
      price: 2450, oldPrice: 2790,
      badge: { ar: "حِرفية", en: "Crafted" },
      featured: "bestseller", stock: 5,
      colors: ["brown", "black"],
      images: [1, 2, 3].map(n => `images/products/veyra-rania-top-handle-${n}.webp`),
      alt: altSet("رانيا", "Rania"),
      description: {
        ar: "حقيبة مقبض علوي بجلد تمساحي منقوش، تُصنع يدويًا بعناية التفاصيل. قطعة استثمارية تبقى جميلة مع السنين.",
        en: "A top-handle bag in crocodile-embossed leather, carefully hand-finished. An investment piece that only grows more beautiful with time."
      },
      details: {
        ar: { material: "جلد تمساحي منقوش، خياطة يدوية", size: "28 × 19 × 11 سم", care: "استخدمي كريم جلد متخصص شهريًا" },
        en: { material: "Crocodile-embossed leather, hand-stitched", size: "28 × 19 × 11 cm", care: "Condition with leather cream monthly" }
      }
    },
    {
      id: "saha-tote",
      name: { ar: "توت سها", en: "Saha Tote" },
      type: "tote", color: "ivory", material: "leather",
      price: 1790, oldPrice: null,
      badge: { ar: "جديد", en: "New" },
      featured: "new", stock: 7,
      colors: ["ivory", "camel"],
      images: [1, 2, 3].map(n => `images/products/veyra-saha-tote-${n}.webp`),
      alt: altSet("سها", "Saha"),
      description: {
        ar: "توت يومي بتدرجات محايدة وتفاصيل نظيفة. مساحة واسعة ووزن خفيف، لترافقكِ بسهولة من الصباح حتى المساء.",
        en: "An everyday tote in neutral tones with clean detailing. Generous space and a light feel, from morning to evening."
      },
      details: {
        ar: { material: "جلد طبيعي وبطانة قطنية", size: "36 × 27 × 13 سم", care: "احفظيها بعيدًا عن الرطوبة" },
        en: { material: "Natural leather with cotton lining", size: "36 × 27 × 13 cm", care: "Keep away from moisture" }
      }
    },
    {
      id: "lina-shoulder",
      name: { ar: "شولدر لينا", en: "Lina Shoulder" },
      type: "shoulder", color: "brown", material: "embossed",
      price: 1590, oldPrice: null,
      badge: { ar: "الأكثر مبيعًا", en: "Bestseller" },
      featured: "bestseller", stock: 8,
      colors: ["brown", "chocolate"],
      images: [1, 2, 3].map(n => `images/products/veyra-lina-shoulder-${n}.webp`),
      alt: altSet("لينا", "Lina"),
      description: {
        ar: "حقيبة كتف بتفاصيل حِرفية واضحة وملمس جلد غني. تصميم بسيط يترك الانطباع بفضل جودة الخامة لا الضجيج البصري.",
        en: "A shoulder bag with visible handcrafted detail and rich leather texture. Understated design that impresses through material quality."
      },
      details: {
        ar: { material: "جلد منقوش بخياطة يدوية", size: "29 × 21 × 9 سم", care: "نظفي الخياطة بفرشاة ناعمة" },
        en: { material: "Embossed leather with hand stitching", size: "29 × 21 × 9 cm", care: "Brush stitching gently with a soft brush" }
      }
    },
    {
      id: "rima-mini",
      name: { ar: "ميني ريما", en: "Rima Mini" },
      type: "mini", color: "burgundy", material: "leather",
      price: 1390, oldPrice: 1590,
      badge: { ar: "كمية محدودة", en: "Limited" },
      featured: "signature", stock: 3,
      colors: ["burgundy", "black"],
      images: [1, 2, 3].map(n => `images/products/veyra-rima-mini-${n}.webp`),
      alt: altSet("ريما", "Rima"),
      description: {
        ar: "لون بورجندي دافئ يمنح هذه الحقيبة الصغيرة شخصية مميزة. مثالية مع الإطلالات المحايدة أو كلمسة لونية هادئة.",
        en: "A warm burgundy hue gives this compact bag its distinct character — ideal with neutral looks or as a soft accent."
      },
      details: {
        ar: { material: "جلد ناعم بلون بورجندي", size: "20 × 14 × 7 سم", care: "امسحي فورًا عند التعرض للماء" },
        en: { material: "Smooth burgundy leather", size: "20 × 14 × 7 cm", care: "Wipe immediately if exposed to water" }
      }
    },
    {
      id: "hana-crossbody",
      name: { ar: "كروس بودي هناء", en: "Hana Crossbody" },
      type: "crossbody", color: "beige", material: "leather",
      price: 1550, oldPrice: null,
      badge: { ar: "عملي", en: "Everyday" },
      featured: "new", stock: 10,
      colors: ["beige", "camel"],
      images: [1, 2, 3].map(n => `images/products/veyra-hana-crossbody-${n}.webp`),
      alt: altSet("هناء", "Hana"),
      description: {
        ar: "حقيبة كروس بودي عملية بتفاصيل مدروسة، تتسع للجوال والأساسيات دون أن تفقد رشاقتها. رفيق يومي بروح راقية.",
        en: "A practical crossbody with thoughtful details — room for your phone and essentials without losing its slim elegance."
      },
      details: {
        ar: { material: "جلد طبيعي بحزام قابل للتعديل", size: "23 × 16 × 7 سم", care: "تجنبي أشعة الشمس المباشرة" },
        en: { material: "Natural leather with adjustable strap", size: "23 × 16 × 7 cm", care: "Avoid direct sunlight" }
      }
    },
    {
      id: "sofia-bag",
      name: { ar: "حقيبة صوفيا", en: "Sofia Bag" },
      type: "shoulder", color: "chocolate", material: "croc",
      price: 2290, oldPrice: null,
      badge: { ar: "حِرفية", en: "Crafted" },
      featured: "bestseller", stock: 4,
      colors: ["chocolate", "black"],
      images: [1, 2, 3].map(n => `images/products/veyra-sofia-bag-${n}.webp`),
      alt: altSet("صوفيا", "Sofia"),
      description: {
        ar: "تدرجات الشوكولاتة مع ملمس تمساحي راقٍ وسحابات ذهبية. حقيبة تعكس ذوقًا ناضجًا وتفاصيل لا تُرى إلا عن قرب.",
        en: "Chocolate tones, refined croc texture and gold zips — a bag for a mature taste, with details revealed up close."
      },
      details: {
        ar: { material: "جلد تمساحي منقوش وسحابات ذهبية", size: "31 × 22 × 10 سم", care: "امسحي السحابات بقطعة جافة" },
        en: { material: "Croc-embossed leather with gold zips", size: "31 × 22 × 10 cm", care: "Wipe zips with a dry cloth" }
      }
    },
    {
      id: "ayla-clutch",
      name: { ar: "كلتش أيلا", en: "Ayla Clutch" },
      type: "clutch", color: "ivory", material: "embossed",
      price: 1250, oldPrice: 1450,
      badge: { ar: "جديد", en: "New" },
      featured: "signature", stock: 6,
      colors: ["ivory", "beige"],
      images: [1, 2, 3].map(n => `images/products/veyra-ayla-clutch-${n}.webp`),
      alt: altSet("أيلا", "Ayla"),
      description: {
        ar: "كلتش بخطوط نظيفة وخامة منقوشة تضيف عمقًا بصريًا هادئًا. قطعة مناسبة للسهرات والمناسبات الخاصة.",
        en: "A clutch with clean lines and embossed texture that adds quiet depth — made for evenings and special occasions."
      },
      details: {
        ar: { material: "جلد منقوش بلمسة نهائية ناعمة", size: "25 × 13 × 4 سم", care: "احفظيها في كيسها القطني" },
        en: { material: "Embossed leather with a soft finish", size: "25 × 13 × 4 cm", care: "Store in its cotton pouch" }
      }
    }
  ];

  global.VEYRA_DATA = { products, taxonomy: TAXONOMY };
})(window);
