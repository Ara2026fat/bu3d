/* بُعد — الكتالوج ومراحل الطلب. عدّل هنا لتغيير المنتجات أو الأسعار. */
window.BU3D = {
  version: 1,

  cats: [
    { id:"names",  ar:"ميداليات الأسماء", en:"Name keychains" },
    { id:"gifts",  ar:"هدايا وإهداءات",   en:"Gifts" },
    { id:"custom", ar:"شعارات وتصاميم",   en:"Logos and designs" },
    { id:"home",   ar:"ديكور ومنزل",      en:"Home and decor" }
  ],

  /* price 0 = يُسعَّر بعد مراجعة الطلب */
  products: [
    { id:"k01", img:"k01.webp", cat:"names", ar:"ميدالية الاسم بمكعبات الحروف",
      en:"Letter-cube name keychain", nAr:"حروف مكعبة مع حبل جلدي وقلب", nEn:"Cube letters, leather cord, heart",
      price:35, unit:"piece", hot:1, opts:["text","color"] },

    { id:"k03", img:"k03.webp", cat:"names", ar:"ميدالية الاسم العمودية",
      en:"Vertical name charm", nAr:"مكعبات عمودية مع زهرة ولوحة اسم", nEn:"Vertical cubes with flower and tag",
      price:40, unit:"piece", hot:1, opts:["text","color"] },

    { id:"k02", img:"k02.webp", cat:"gifts", ar:"قلب منسوج مع تاج الاسم",
      en:"Woven heart with name tag", nAr:"قلب مطبوع بنسيج ثلاثي مع لوحة الاسم", nEn:"Woven-texture heart with a name tag",
      price:30, unit:"piece", hot:1, opts:["text","color"] },

    { id:"k04", img:"k04.webp", cat:"gifts", ar:"قلب منسوج بلوحة كبيرة",
      en:"Woven heart, large tag", nAr:"مقاس أكبر يناسب الإهداء", nEn:"Larger size, made for gifting",
      price:38, unit:"piece", opts:["text","color"] },

    { id:"k05", img:"k05.webp", cat:"gifts", ar:"ميدالية قطع التركيب",
      en:"Building-block keychain", nAr:"قطع تركيب بقلب، تُطبع بألوانك", nEn:"Block piece with a heart, in your colours",
      price:28, unit:"piece", opts:["color"] },

    { id:"k06", img:"k06.webp", cat:"custom", ar:"ميداليات الحروف والتاقات",
      en:"Letter and tag keychains", nAr:"حروف منفوخة وتاقات للمبرمجين والمهندسين", nEn:"Puffed letters and tags for makers",
      price:25, unit:"piece", hot:1, opts:["text","color"] },

    { id:"c01", img:"", cat:"custom", ar:"ميدالية بشعارك",
      en:"Your logo as a keychain", nAr:"شعار متجرك أو سيارتك أو ناديك — يُسعَّر بعد مراجعة الشعار",
      nEn:"Your shop, car or club logo — quoted after review",
      price:0, unit:"piece", art:"tag", opts:["text","color"] },

    { id:"c02", img:"", cat:"gifts", ar:"لوحة إهداء وتكريم",
      en:"Engraved gift plaque", nAr:"لوحة بالاسم والمناسبة للتخرج والتكريم — تُسعَّر حسب المقاس",
      nEn:"Name and occasion plaque — quoted by size",
      price:0, unit:"piece", art:"plaque", opts:["text","color"] },

    { id:"c03", img:"", cat:"home", ar:"حامل جوال أو سماعات",
      en:"Phone or headphone stand", nAr:"حوامل مكتبية بتصاميم هندسية", nEn:"Desk stands, geometric designs",
      price:45, unit:"piece", art:"stand", opts:["color"] },

    { id:"c04", img:"", cat:"home", ar:"مزهرية هندسية",
      en:"Geometric vase", nAr:"مزهرية مطبوعة بنقشة حلزونية", nEn:"Spiral-textured printed vase",
      price:70, unit:"piece", art:"vase", opts:["color"] },

    { id:"c05", img:"", cat:"home", ar:"منظّم أدراج ومكتب",
      en:"Drawer and desk organiser", nAr:"يُفصَّل على مقاس درجك", nEn:"Made to your drawer size",
      price:0, unit:"piece", art:"box", opts:["color"] },

    { id:"c06", img:"", cat:"custom", ar:"قطعة غيار أو بديل",
      en:"Spare or replacement part", nAr:"أرسل صورة القطعة ومقاسها — تُسعَّر بعد المراجعة",
      nEn:"Send a photo and measurements — quoted after review",
      price:0, unit:"piece", art:"gear", opts:[] }
  ],

  /* خامات الطباعة */
  materials: [
    { id:"pla",   ar:"PLA — الأكثر استخداماً",   en:"PLA — everyday",        note:{ ar:"ألوان كثيرة، دقة عالية، للاستخدام الداخلي", en:"Many colours, fine detail, indoor use" } },
    { id:"petg",  ar:"PETG — متين ومقاوم",       en:"PETG — durable",        note:{ ar:"يتحمل الحرارة والشمس، مناسب للسيارة والخارج", en:"Handles heat and sun, good outdoors" } },
    { id:"abs",   ar:"ABS — صلب وقوي",           en:"ABS — tough",           note:{ ar:"للقطع الميكانيكية والاستخدام الشاق", en:"Mechanical parts and hard use" } },
    { id:"tpu",   ar:"TPU — مرن",                en:"TPU — flexible",        note:{ ar:"يلتوي ولا ينكسر، للأغطية والمساند", en:"Bends without breaking — cases and grips" } },
    { id:"resin", ar:"راتنج — أدق التفاصيل",     en:"Resin — finest detail", note:{ ar:"للمجسمات الدقيقة والتفاصيل الصغيرة جداً", en:"Miniatures and very fine detail" } }
  ],

  qualities: [
    { id:"draft", ar:"سريعة · 0.28 مم", en:"Draft · 0.28 mm" },
    { id:"std",   ar:"عادية · 0.20 مم", en:"Standard · 0.20 mm" },
    { id:"fine",  ar:"دقيقة · 0.12 مم", en:"Fine · 0.12 mm" }
  ],

  infills: [
    { id:"15", ar:"خفيف ١٥٪ — للديكور", en:"Light 15% — decorative" },
    { id:"30", ar:"متوسط ٣٠٪ — الأنسب", en:"Medium 30% — recommended" },
    { id:"60", ar:"قوي ٦٠٪ — للقطع العملية", en:"Strong 60% — functional" },
    { id:"100", ar:"مصمت ١٠٠٪ — الأقوى", en:"Solid 100% — strongest" }
  ],

  colors: [
    { id:"white", ar:"أبيض",  en:"White",  hex:"#F3F4F6" },
    { id:"black", ar:"أسود",  en:"Black",  hex:"#2A2D33" },
    { id:"navy",  ar:"كحلي",  en:"Navy",   hex:"#384765" },
    { id:"sky",   ar:"سماوي", en:"Sky",    hex:"#8FB6D9" },
    { id:"red",   ar:"أحمر",  en:"Red",    hex:"#C8384A" },
    { id:"pink",  ar:"وردي",  en:"Pink",   hex:"#E88AA8" },
    { id:"green", ar:"أخضر",  en:"Green",  hex:"#3E8E5A" },
    { id:"gold",  ar:"ذهبي",  en:"Gold",   hex:"#C9A227" },
    { id:"grey",  ar:"رمادي", en:"Grey",   hex:"#9AA3AE" },
    { id:"clear", ar:"شفاف",  en:"Clear",  hex:"#D8E6F2" }
  ],

  /* مراحل الطلب — من الاستلام إلى التسليم */
  stages: [
    { id:0, ar:"وصل الطلب",        en:"Received",   note:{ ar:"استلمنا طلبك وسنراجعه", en:"We have your request" } },
    { id:1, ar:"قيد المراجعة",     en:"In review",  note:{ ar:"نراجع الملف والمقاسات لتحديد السعر", en:"Checking the file and size to price it" } },
    { id:2, ar:"عرض السعر",        en:"Quoted",     note:{ ar:"أرسلنا السعر والمدة — بانتظار موافقتك", en:"Price and time sent — awaiting your approval" } },
    { id:3, ar:"قيد الطباعة",      en:"Printing",   note:{ ar:"طلبك على الطابعة الآن", en:"On the printer now" } },
    { id:4, ar:"التشطيب والتجهيز", en:"Finishing",  note:{ ar:"إزالة الدعامات والتنظيف والتغليف", en:"Supports removed, cleaned and packed" } },
    { id:5, ar:"جاهز للتسليم",     en:"Ready",      note:{ ar:"جاهز — نتفق على وقت التسليم", en:"Ready — let's agree on handover" } },
    { id:6, ar:"تم التسليم",       en:"Delivered",  note:{ ar:"وصل الطلب. شكراً لك", en:"Delivered. Thank you" } }
  ]
};
