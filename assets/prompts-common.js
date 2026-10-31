/* ==========================================================================
   Software Engineering Mindset — prompts-common.js
   المنطق المشترك لكل صفحات prompts/ : صفحة لكل قسم رياضي أو مجموعة Backend (18 صفحة)،
   وفي كل صفحة prompt لكل مرحلة (73 مرحلة، لكل منها 3 موضوعات) وتطبيق عملي في آخر كل مجموعة Backend.
   الصفحة نفسها قالب ثابت + كتلة JSON واحدة (#stage-data) فيها بيانات القسم أو المجموعة؛
   وهذا الملف هو الذي يحمل:
     - الـ master prompt وقواعد المسارات (math, python, sql, shell, web, backend, design, project)
     - قاعدة الاستئناف «Continue» وطريقة التسليم على مراحل
     - بناء سياق كل مرحلة (ما يعرفه القارئ الآن، المصطلحات المعرَّفة، الصفحة التالية)
     - قائمة المراحل بزر النسخ وشريط التقدّم (localStorage) وفحص الاعتماديات
   يعتمد على: window.SEMB_DIGEST (من assets/plan-digest.js) وwindow.SEMB (من stage.js).
   ========================================================================== */
;(() => {
  'use strict'

  /* ------------------------------------------------------------------
     0) ثوابت الخطة
  ------------------------------------------------------------------ */
  // الخطة مساران متوازيان، وكل عنصر هنا قسم أو مجموعة = صفحة prompts واحدة:
  //   kind 'math'    : 4 أقسام تضم 30 مرحلة رياضية
  //   kind 'backend' : 14 مجموعة تضم 43 مرحلة Backend
  // n = ترتيب السلسلة (1..18)، وr = أرقام مراحل الخطة التي يضمها (للفحص ولعرض السلسلة)،
  // وo = اختياري. id: m1..m4 و g01..g14 (رقم المجموعة كما في الخطة).
  // الأسماء العربية لمجموعات Backend ومجلدات dir اقتراحية (الخطة تسمّي المجموعات بالإنجليزية فقط).
  const STAGES = [
    { id: 'm1', kind: 'math', n: 1, r: [1, 8], short: 'الأساس الرياضي', t: 'الأساس الرياضي', e: 'Basic Mathematics', dir: '01-basic-mathematics' },
    { id: 'm2', kind: 'math', n: 2, r: [9, 21], short: 'الرياضيات المتقطعة', t: 'الرياضيات المتقطعة', e: 'Discrete Mathematics', dir: '02-discrete-mathematics' },
    { id: 'm3', kind: 'math', n: 3, r: [22, 28], short: 'رياضيات الأداء والتحليل', t: 'رياضيات الأداء والتحليل', e: 'Performance Math', dir: '03-performance-math' },
    { id: 'm4', kind: 'math', n: 4, r: [29, 30], short: 'الرياضيات الاختيارية', t: 'الرياضيات الاختيارية', e: 'Optional Mathematics', dir: '04-optional-mathematics', o: true },
    { id: 'g01', kind: 'backend', n: 5, r: [1, 1], short: 'Dev Foundations', t: 'أساسيات بيئة التطوير', e: 'Dev Foundations', dir: '05-dev-foundations' },
    { id: 'g02', kind: 'backend', n: 6, r: [2, 5], short: 'Python', t: 'لغة Python', e: 'Python', dir: '06-python' },
    { id: 'g03', kind: 'backend', n: 7, r: [6, 10], short: 'Relational Databases & PostgreSQL', t: 'قواعد البيانات العلائقية وPostgreSQL', e: 'Relational Databases & PostgreSQL', dir: '07-relational-databases-postgresql' },
    { id: 'g04', kind: 'backend', n: 8, r: [11, 13], short: 'Networking, HTTP & REST Design', t: 'الشبكات وHTTP وتصميم REST', e: 'Networking, HTTP & REST Design', dir: '08-networking-http-rest-design' },
    { id: 'g05', kind: 'backend', n: 9, r: [14, 17], short: 'FastAPI Core', t: 'أساسيات FastAPI', e: 'FastAPI Core', dir: '09-fastapi-core' },
    { id: 'g06', kind: 'backend', n: 10, r: [18, 20], short: 'Data Structures', t: 'هياكل البيانات', e: 'Data Structures', dir: '10-data-structures' },
    { id: 'g07', kind: 'backend', n: 11, r: [21, 23], short: 'Algorithms', t: 'الخوارزميات', e: 'Algorithms', dir: '11-algorithms' },
    { id: 'g08', kind: 'backend', n: 12, r: [24, 26], short: 'Systems, OS & Concurrency', t: 'الأنظمة وأنظمة التشغيل والتزامن', e: 'Systems, OS & Concurrency', dir: '12-systems-os-concurrency' },
    { id: 'g09', kind: 'backend', n: 13, r: [27, 29], short: 'Software Design, Testing & Quality', t: 'تصميم البرمجيات والاختبار والجودة', e: 'Software Design, Testing & Quality', dir: '13-software-design-testing-quality' },
    { id: 'g10', kind: 'backend', n: 14, r: [30, 32], short: 'Application Security', t: 'أمن التطبيقات', e: 'Application Security', dir: '14-application-security' },
    { id: 'g11', kind: 'backend', n: 15, r: [33, 35], short: 'Caching, Messaging & Real-Time', t: 'التخزين المؤقت والمراسلة والاتصال اللحظي', e: 'Caching, Messaging & Real-Time', dir: '15-caching-messaging-real-time' },
    { id: 'g12', kind: 'backend', n: 16, r: [36, 39], short: 'Architecture & Scalability', t: 'المعمارية وقابلية التوسع', e: 'Architecture & Scalability', dir: '16-architecture-scalability' },
    { id: 'g13', kind: 'backend', n: 17, r: [40, 42], short: 'FastAPI Production Services', t: 'خدمات FastAPI للإنتاج', e: 'FastAPI Production Services', dir: '17-fastapi-production-services' },
    { id: 'g14', kind: 'backend', n: 18, r: [43, 43], short: 'Optional Extensions', t: 'الامتدادات الاختيارية', e: 'Optional Extensions', dir: '18-optional-extensions', o: true }
  ]

  // مرجع واحد للإصدارات (منقول من الخطة القديمة): يُعدَّل هنا فقط
  const VERSIONS =
    'الإصدارات المعتمدة (مرجع واحد لكل صفحات المرجع؛ لا تذكر غيرها ولا تكتب رقم إصدار من ذاكرتك): ' +
    'Python 3.12 أو أحدث. FastAPI من سلسلة 0.140 فما فوق (بلا رقم إصدار صريح في الأمثلة التعليمية). ' +
    'Pydantic v2 (2.13 فما فوق). SQLAlchemy 2.0 مثبّتة على <2.1 عمدًا: المرجع كله مبني على أسلوب 2.0 المستقر. ' +
    'PostgreSQL: أمثلة SQL التعليمية تعمل على 14 فما فوق (فلا ميزات أحدث منه مثل MERGE)، وصورة Docker هي postgres:16.'

  const PROGRESS_KEY = 'semb-progress-v3'
  const MAX_TOPICS = 6
  const STAGE_TOPICS = 3 // كل مرحلة في الخطة = 3 موضوعات تُدرس وتُطبَّق كوحدة واحدة

  // القوالب التي يرفقها القارئ مع الـ prompt (مجلد templet/)
  const TEMPLATE_MATH = 'templet-math.html' // لأجزاء مسار math وحده
  const TEMPLATE_CODE = 'templet.html' // لكل ما سواه (كود وأوامر وتصميم، ويقبل معادلات قليلة)

  /* ------------------------------------------------------------------
     1) النصوص: الـ master prompt
  ------------------------------------------------------------------ */
  const READER_DEFAULT =
    'القارئ: مهندس برمجيات يعمل على Android وFlutter، يعرف البرمجة عمومًا لكنه يبني أسس هندسة الـ Backend (الرياضيات وPython وPostgreSQL وFastAPI) من جذورها: لا يريد حفظ أوامر بل فهم لماذا يعمل الشيء هكذا، وكيف يعمل داخليًا، وما بدائله، وأين يفشل. لا تعامله كمبتدئ في البرمجة ولا تُطِل في البديهيات البرمجية؛ أما في الرياضيات فابدأ من المستوى الذي تحدده المرحلة ولا تفترض خلفية سابقة. لا تفترض معرفة إلا ما يرد تحت «ما يعرفه القارئ الآن» و«المصطلحات المعرَّفة سابقًا» وما تنص عليه «ملاحظات خاصة» بالقسم أو المجموعة كمتطلب سابق، وما يُعدّ ثقافة هندسية عامة.'

  const MASTER = `هذه الصفحة جزء من مرجع عربي بعنوان «Software Engineering Mindset»: برنامج تعلّم يبني لدى مهندس البرمجيات فهمًا هندسيًا متينًا يمكّنه من تحليل المشكلات وفهم سلوك الأنظمة واتخاذ قرارات تقنية مبررة وتطوير برمجيات موثوقة قابلة للاختبار والصيانة والتوسع. للخطة مسارا دراسة متوازيان: الرياضيات (30 مرحلة في 4 أقسام: @@CHAIN_M@@)، وهندسة الـ Backend (43 مرحلة في 14 مجموعة تعتمد على Python وPostgreSQL وتتخذ FastAPI أساسًا للمسار التطبيقي: @@CHAIN_B@@). لا يلزم إنهاء الرياضيات قبل الـ Backend: وصف كل مرحلة رياضية يحدد موضع تطبيقها في الـ Backend، ووصف كل مرحلة خلفية يذكر الرياضيات المرتبطة بها. في كل مرحلة ثلاثة موضوعات تُدرس وتُطبَّق كوحدة واحدة، وتبلغ المجموعات ذروتها في مشروع ختامي هو خدمة حجوزات (Booking Service) متكاملة جاهزة للإنتاج. كل مرحلة صفحة HTML واحدة (وكذلك التطبيق العملي الذي تُختم به كل مجموعة Backend) تُكتب في محادثة مستقلة، وهذه المحادثة هي كتابة صفحة واحدة. تُقرأ الصفحات في المتصفح فقط (لا طباعة ولا PDF)، ولا يُنفَّذ أي كود داخل الصفحة.
@@READER@@
عقلية المهندس: المرجع يبني طريقة تفكير لا حفظ أوامر. في كل موضوع علّم القارئ أن يسأل: لماذا نحلّ المسألة هكذا؟ وما البديل؟ وما الذي قد يسوء (حالة حدّية أو فشل)؟ وما المفاضلة (trade-off)؟ وكيف نتحقق أن الحل صحيح؟ (التحقق: بإعادة الحساب بطريقة مختلفة أو بمثال مضاد في الرياضيات، وبـ assert أو اختبار في البرمجة، وبقياس أو تتبّع في الأنظمة.)

@@CONTEXT@@

@@STAGE@@

منهجية الشرح — ملاحظة مهمة جدًا:
* الإيقاع متدرّج وواضح: فكرة واحدة في كل فقرة وفقرات قصيرة، ولا قفز في الاستنتاج ولا حشو ولا تكرار. العمق مطلوب (لماذا؟ وكيف يعمل داخليًا؟) لا الإطالة.
* الشرح بالعربية الفصحى المبسّطة، والمصطلحات التقنية بالإنجليزية، مع مراعاة RTL.
* المصطلحات: كل مصطلح في «مصطلحات هذه الصفحة» يُعرَّف رسميًا في هذه الصفحة: ضعه داخل strong عند أول ذكر وعرّفه بجملة دقيقة ثم استخدمه بالإنجليزية. للمفاهيم الأساسية فقط (الموضوعات غير المعلَّمة بـ «داعم») يجوز تشبيه واحد من الحياة اليومية إن أفاد، مع جملة «أين ينكسر التشبيه».
* لا تستخدم مفهومًا لم يُشرح تحت «ما يعرفه القارئ الآن» أو «المصطلحات المعرَّفة سابقًا» أو في هذه الصفحة؛ وإن لزم فعرّفه بجملة واحدة وقل إنه سيُشرح لاحقًا، ولا تتوسّع في موضوعات خارج القائمة. وإن وردت «مفاهيم تُستعمل هنا من صفحات سابقة» فذكّر بكل منها بجملة واحدة («تذكير: …») عند أول استعمال دون إعادة شرحها. والمساران متوازيان: لا تفترض مرحلة رياضية ولا مرحلة Backend غير مذكورة تحت «ما يعرفه القارئ الآن».
* كل بند في قائمة الموضوعات = topic-block مستقل، بنفس الترتيب. مسار الموضوع الأساسي (بلا علامة): المشكلة (لماذا نحتاجه؟) ← الفكرة والتعريف الدقيق ← أصغر مثال ممكن بنتيجته ← كيف يعمل داخليًا ولماذا ← تطويره إلى حالة هندسية واقعية أو حالة حدّية ← الخطأ الشائع في callout--warning. أما الموضوع المعلَّم بـ «(داعم: مسار مخفّف)» فمساره: المشكلة في جملتين ← تعريف ← مثال صغير واحد ← الخطأ الشائع إن وُجد.
* «توقّع ثم تحقّق»: قبل كل مثال نتيجته غير بديهية اكتب جملة تسأل القارئ «ماذا تتوقع؟» دون كشف الجواب، وبعد النتيجة قارنها بالتوقع وفسّر أي فرق.
* حيث يوجد فخ معروف اعرض أولًا الخطأ ونتيجته (أو رسالة الخطأ الحقيقية) ثم الإصلاح ولماذا يعمل.
* قسم المقارنة اختياري ويُضاف فقط حين تكون فيه مفاضلة حقيقية، بجدول المقارنة الموجود (≤ 4 أعمدة): لخيارين استعمل أعمدة «الميزة | الخيار أ | الخيار ب»، ولقرارات التصميم أعمدة «القرار | البديل | السبب | الثمن».
* المخططات القياسية: إن وردت تحت «ملاحظات خاصة» مخططات ASCII قياسية فانسخ كل مخطط داخل pre بسمة dir="ltr" وبلا output-block، والتزم بهيكله وغيّر الأسماء والقيم فقط.
* الأمثلة من مجالات واقعية: في مراحل الـ Backend يكون مجال الأمثلة خدمة الحجوزات (Booking Service) كما يحدده «عقد المجال» إن ورد في هذا الـ prompt، ويجوز مثال مساعد من البنوك أو المتاجر أو حجز تذاكر الطيران حين لا يناسب مجال الحجوزات الفكرة المشروحة (كالتحويل بين حسابين لشرح ACID). الأسماء الشخصية Musab وAhmed أولًا، ويجوز عند الحاجة أسماء ذكور عربية مألوفة بحروف لاتينية (Omar وYoussef وKhaled)؛ لا أسماء إناث. الأرقام والأسعار توضيحية. في الرياضيات يكفي المثال العددي المجرّد ثم ربطه بتطبيقه في الـ Backend المذكور في الملاحظات عند الحاجة.
* الربط بين المسارين: إن وردت في «ملاحظات خاصة بهذه الصفحة» إحالة إلى موضع تطبيق المفهوم في مرحلة أخرى (مثل «يُطبَّق في مرحلة Backend 6») فاذكرها في جملة أو جملتين عند الموضوع الأنسب تمهيدًا لما سيأتي، دون شرح ما في تلك المرحلة. وإن وردت «الرياضيات المرتبطة بهذه المرحلة» تحت «ما يعرفه القارئ الآن» فاربط بها مفهوم الصفحة بجملة واحدة حيث يلزم.
* اتبع هيكل @@TEMPLATE@@ المرفق بالكامل، بما فيه وسم الـ link الذي يربط ../assets/style.css ووسم الـ script الذي يربط ../assets/stage.js: أبقِهما كما هما، ولا تنسخ أي CSS ولا JS إلى الملف، ولا تضف وسم style ولا classes ولا وسوم script أو link غير الموجودة في القالب، ولا footer. عنوان الصفحة (في title وفي h1 داخل الـ hero) وeyebrow ومسارات page-nav هي المحدَّدة تحت «موقع هذه الصفحة». احذف من الملف النهائي كل تعليقات القالب وعناصره النائبة وكل مكوّن اختياري لم تستعمله. إن لم تجد ملف القالب مرفقًا فاكتب سطرًا واحدًا تطلبه فيه ولا تبدأ الكتابة.

@@EXERCISES@@

@@TRACK@@

@@DELIVERY@@`

  const EXERCISES = `قسما «اختبر نفسك» و«تمرين شامل» — ملاحظة مهمة جدًا:
* بعد قسم المقارنة (إن وُجد) وقبل قسم الخلاصة قسمان متتاليان بهيكل القالب نفسه (quiz ثم exercise): topic-block لكل سؤال، والإجابات والحل داخل details.reveal كما في القالب.

القسم الأول «اختبر نفسك» (eyebrow: «اختبر نفسك»، وh2: «أسئلة نظرية»):
  - سؤال واحد على الأقل لكل موضوع أساسي، وبحد أقصى 5 أسئلة. نوّعها على مستويات الإتقان بحسب طبيعة المرحلة: فهم (عرّف وفسّر) ← تطبيق (حلّ وتتبّع) ← تحليل (قارن وشخّص) ← قرار (متى تختار؟ وما الثمن؟). ويُفضَّل أن يربط أحدها الجزء بمفهوم من «ما يعرفه القارئ الآن».
  - كل سؤال مفهوم وحده: لا إحالات على ما لم يُعرض في الصفحة.
  - قبل أول سؤال سطر ثابت: «حاول أن تجيب بنفسك قبل أن تفتح الإجابة تحت كل سؤال.»
  - هيكل كل سؤال: topic-block فيه h3 (topic-block__title) «سؤال n»، ثم نص السؤال في p، ثم details.reveal بعنوان «الإجابة» فيها جملتان إلى ثلاث تنتهي بإحالة قصيرة «(راجع: اسم الموضوع)».

القسم الثاني «تمرين شامل» (eyebrow: «تمرين شامل»، وh2: عنوان التمرين نفسه):
  - تمرين واحد فقط: سيناريو واقعي واحد، من 3 أو 4 خطوات مرقّمة (ol) تتدرّج: تنفّذ ← تصلح أو تتتبّع ← تفسّر أو تقرّر. يجمع أهم موضوعات المرحلة (وما لا يغطيه السيناريو تغطّيه أسئلة «اختبر نفسك») ويُنجَز في 10 إلى 20 دقيقة. الخطوة الأخيرة سؤال «عقلية المهندس»: ماذا لو…؟ ولماذا اخترنا هذا الحل؟
  - هيكله: p للسيناريو، ثم المعطيات (code-block أو جدول صغير) إن لزم، ثم الخطوات المرقّمة، ثم تلميح واحد اختياري داخل details.reveal.reveal--hint. لا تعرض النتائج المتوقعة هنا: مكانها في الحل.
  - الحل داخل details.reveal بعنوان «الحل»: حل كل خطوة بالترتيب (مع output-block إن كان لكود فيه مخرجات) ثم فقرة «عقلية المهندس» تحلّ السؤال الأخير حلًّا مفسَّرًا (ماذا حدث؟ ولماذا؟ وماذا نفعل؟ وكيف نتحقق؟). سقف الحل: شرح مختصر، و≤ 25 سطر كود موزعة على كتلتين كحد أقصى.
  - المسارات التي لا كود فيها (رياضيات أو أوامر أو تصميم): تمرينها مسألة تطبيقية أو حالة تحليل أو قرار، وحلّها نموذج مفسَّر دون نتائج مصطنعة.
* آخر نقطة في الخلاصة: «عقلية المهندس: …» بجملة واحدة.`

  // شرط المستخدم حرفيًا: يُلصق في كل prompt قبل طريقة التسليم مباشرة، فيكون «آخر هذا النص» هو DELIVERY. لا تعدّل صياغته.
  const FREE_PLAN = 'أستخدم النسخة المجانية من claude.ai، وقد تنقطع المحادثة بحدود الاستخدام؛ فاعمل بالطريقة المذكورة في آخر هذا النص حتى أكتب «Continue» فتكمل دون فقد شيء'

  const DELIVERY = `طريقة التسليم والاستئناف — ملاحظة مهمة جدًا:
* الناتج ملف HTML واحد بمسار الحفظ المذكور أعلاه (يربط ملفَّي assets ولا يضمّنهما)، دون أي مقدمة أو شرح أو ملخص في المحادثة؛ ردّك النهائي سطر واحد فقط بعد اكتمال الملف.
* الحجم: كثّف ولا تُطِل: مثال واحد جيد لكل موضوع بدل ثلاثة، ولا تكرّر في الخلاصة ما قيل. لا تحذف أي موضوع ولا قسمي «اختبر نفسك» و«تمرين شامل» ولا الخلاصة؛ وإن ضاق المجال فاختصر الأمثلة الثانوية فقط.
* ابنِ الملف على مراحل بأدوات الملفات (أنشئ الملف ثم عدّله) حتى لا يضيع عملك إن انقطعت المحادثة بسبب حدود الاستخدام:
  1) أنشئ الملف أولًا بهيكله الكامل: head وtopbar وhero (بمقدمته) وكل الأقسام، وكل topic-block بعنوانها فقط، وفي كل كتلة ناقصة تعليق علامة بهذا الشكل بالضبط: <!--TODO:t1-->، <!--TODO:t2-->… بعدد الموضوعات، ثم <!--TODO:comparison--> (إن لزم)، <!--TODO:quiz-->، <!--TODO:exercise-->، <!--TODO:summary-->. وضع page-nav بروابطه النهائية.
  2) املأ العلامات بالترتيب، واحدة في كل خطوة: اكتب محتوى الموضوع كاملًا (شرحه ومثاله ونتائجه وتحذيره) ثم استبدل علامته به، دون إعادة كتابة الملف كله.
  3) في الختام ابحث بأمر grep عن «TODO» للتأكد من أنه لا توجد علامة متبقية، وأن الملف ينتهي بـ </html>، وأن كل وسم مفتوح مغلق؛ ثم أرسل الملف.
* إن انقطعت المحادثة وكتب القارئ «Continue»: افتح الملف الحالي وابحث بـ grep عن علامات TODO المتبقية فقط (لا تقرأ الملف كله)، وأكمل من أول علامة متبقية بالترتيب نفسه دون إعادة ما اكتمل ودون إعادة الهيكل ودون تلخيص أو اعتذار أو شرح لما حدث. إن وجدت كتلة مكتوبة بنصفها (وسم غير مغلق) فأعد كتابتها كاملة. ثم نفّذ الخطوة 3.
* إن لم تتح لك أدوات الملفات: سلّم الملف في دفعات، كل دفعة تنتهي عند نهاية topic-block كاملة وتختم بتعليق <!-- ✓ 2/5 -->، وتُختم الدفعة الأخيرة بـ </html>. وعند «Continue» أكمل من الدفعة التالية فقط بلا head ولا تكرار لما سبق، وإن انقطعت دفعة في منتصفها فأعدها من أولها بعلامة «إعادة».`

  /* ------------------------------------------------------------------
     2) مسارات المحتوى (Tracks)
  ------------------------------------------------------------------ */
  const CODE_RULES = `قواعد الكود والمخرجات — ملاحظة مهمة جدًا:
* كود حديث مبني على «قائمة الـ APIs المعتمدة» و«الإصدارات المعتمدة»؛ لا تستخدم أي API غير مؤكد الوجود ولا أسلوبًا قديمًا (deprecated)، ولا تكتب أرقام إصدارات من ذاكرتك غير المذكورة هنا.
* كل code-block له مخرجات يليه output-block مطابق لما يطبعه الكود فعلًا. إن أتيحت لك أداة تنفيذ فشغّل كل مثال وانسخ مخرجاته حرفيًا؛ وإلا فاحسبها خطوة بخطوة من بيانات صغيرة وراجع كل مخرج مرتين (عدد الأسطر والفواصل العشرية وترتيب الصفوف)، ولا تعرض مخرجات تعتمد على العشوائية أو الزمن أو المسارات أو عناوين الذاكرة.
* في كل مثال محوري يحسب قيمة اختم بـ assert (أو ما يعادله) يثبت صحة النتيجة، وأخبر القارئ أنه جواب سؤال «كيف أتحقق؟».
* اسم الملف في رأس الكود: "Cell 1 — وصف قصير" ("Query 1 — وصف" للـ SQL، و"Terminal 1 — وصف" للأوامر، ومسار الملف الحقيقي مثل app/main.py لكود المشروع).
* الحدود: كل code-block ≤ 25 سطرًا والسطر ≤ 80 حرفًا؛ المخرجات ≤ 15 سطرًا؛ جداول المقارنة ≤ 4 أعمدة. لا web search.`

  const TRACKS = {
    math: {
      text: `مسار «رياضيات ونظرية»:
بيئة القراءة: الصفحة تُقرأ وتُحَل على الورق؛ لا كود ولا تجربة، إلا إذا نصّت «ملاحظات خاصة» على غير ذلك.
* المعادلات والرموز بصيغة KaTeX كما في القالب: داخل السطر \\( … \\) (قصيرة)، وعلى سطر مستقل داخل <div class="math-block">\\[ … \\]</div>، وكل معادلة طويلة في math-block مستقل. لا تستعمل $ ولا $$، ولا حروفًا عربية داخل المعادلة (استعمل x وn وf(x))، والشرح بالعربية خارجها. اكتب \\lt و\\gt بدل < و>، و&amp; بدل & داخل aligned.
* كل مفهوم جديد: تعريف دقيق في callout--definition (التسمية: تعريف | قاعدة | صيغة | نظرية)، ثم مثال محلول في div.example بأرقام صغيرة وخطوات مرقّمة مبرَّرة وجواب فيه طريقة التحقق (تعويض أو مثال مضاد أو حالة حدّية).
* اربط كل مفهوم بمشكلة هندسية حقيقية في فقرة قصيرة (التعقيد والأداء، التجزئة، أنظمة العدّ، الاحتمال في الأنظمة…): لماذا يهمّ مهندس البرمجيات؟
* الجداول الصغيرة (جدول صواب أو جدول قيم) بـ table-wrap table-wrap--fit. والرسم (figure وsvg بـ classes الـ fg-* فقط) عند الحاجة لمنحنى دالة أو رسم بياني أو شجرة، لا للزينة.
* البرهان: الفكرة أولًا ثم الخطوات ثم لماذا يكفي، بلغة بسيطة وبلا قفزات.
* أعد كل حساب بطريقة مختلفة قبل كتابته، ولا تعرض نتيجة لم تتحقق منها؛ والأرقام صغيرة ومفهومة. لا web search.`
    },
    python: {
      code: true,
      text: `مسار «Python»:
بيئة التجربة: Google Colab أو أي بيئة Python 3.12 أو أحدث (ينسخ القارئ الكود إلى خلية جديدة).
بيانات الأمثلة: بيانات توضيحية مع تعليق «# بيانات توضيحية».
* كل code-block خلية مستقلة تمامًا: تحتوي imports الخاصة بها وبياناتها داخلها، دون Google Drive ودون ملفات خارجية ودون الاعتماد على خلية سابقة (أي ملف تحتاجه تكتبه داخل الخلية نفسها ثم تقرؤه).
* المبالغ: لا تستخدم float للمال؛ استخدم Decimal من نص (Decimal("799.00")) وتنسيق العرض بخانتين عشريتين.
قائمة الـ APIs المعتمدة (Python): type hints بصيغة X | None وlist[str]؛ dataclass وEnum من المكتبة القياسية؛ pathlib بدل os.path؛ from datetime import datetime, UTC ثم datetime.now(UTC) (لا utcnow() فهي متوقفة)، ومع ذلك لا تعرض الوقت الحالي في المخرجات بل تواريخ ثابتة؛ لا random ولا time الحقيقي ولا الشبكة.`
    },
    sql: {
      code: true,
      text: `مسار «SQL على PostgreSQL»:
بيئة التجربة: PostgreSQL 14 أو أحدث (psql أو أي عميل)، أو Docker بصورة postgres:16. لا تستخدم ميزات أحدث من 14 (مثل MERGE).
* كل مثال مكتفٍ بنفسه: يُنشئ جداوله وبياناته الصغيرة (CREATE TABLE وINSERT) في code-block مستقل قبل الاستعلام، وبأسماء الجداول والأعمدة نفسها في كل أمثلة الصفحة.
* المخرجات بصيغة psql (رؤوس الأعمدة ثم الصفوف ثم «(n rows)»)، ورتّب الصفوف بـ ORDER BY صريح حتى تكون النتيجة حتمية.
* لا تعرض الوقت الحالي ولا أرقام تسلسلية غير محسومة في المخرجات.
* عند الحديث عن الأداء اعرض EXPLAIN (COSTS OFF) لأنه ثابت المخرجات.`
    },
    shell: {
      code: true,
      text: `مسار «Terminal وأدوات المهندس»:
بيئة التجربة: Terminal محلي (Linux أو macOS أو WSL على Windows)، وليس Colab؛ بيّن كيف يفتحه القارئ في كل نظام عند أول استعمال.
* الأوامر في code-block بلغة bash، وكل ما يُكتب على الشاشة يوضع في output-block؛ لا تعرض مخرجات تحتوي مسارات أو أسماء مستخدمين أو أوقاتًا حقيقية بل قيمًا ثابتة توضيحية.
* وضّح لكل أمر ما يفعله وما أثره (قراءة فقط أم تعديل) وكيف يُتراجع عنه؛ وحذّر قبل أي أمر مدمّر.
قائمة الأدوات المعتمدة: Python 3.12 أو أحدث؛ venv وpip؛ Git بفرع افتراضي main (git init -b main)؛ Docker Compose V2 بالأمر docker compose (بلا شرطة) وبملف compose.yaml وبلا مفتاح version (متوقف)؛ صورة python:3.12-slim للتطبيق وpostgres:16 لقاعدة البيانات مع healthcheck بـ pg_isready وdepends_on بشرط condition: service_healthy؛ أمر CMD في Dockerfile بصيغة exec-form؛ ruff (ruff check وruff format)؛ pdb (breakpoint() وpython -m pdb).`
    },
    web: {
      code: true,
      text: `مسار «الشبكات والويب وHTTP»:
بيئة التجربة: Terminal محلي بأمر curl، ورسائل HTTP الخام تُعرض في code-block بلغة http؛ ولا اتصال فعلي بمواقع خارجية في الأمثلة (استعمل أمثلة محلية أو رسائل مكتوبة بقيم ثابتة).
* عرض الرسالة كما هي على السلك (request ثم response) مع شرح كل جزء: السطر الأول، الـ headers، الجسم.
* الأسماء والحقول وأشكال الـ JSON تتبع المجال الواقعي (متجر، بنك، طيران) بقيم ثابتة توضيحية.
* المخططات (تسلسل الطلب، مصافحة TCP/TLS) بـ ASCII داخل pre بسمة dir="ltr".`
    },
    backend: {
      code: true,
      text: `مسار «Backend بـ FastAPI»:
بيئة التجربة: Google Colab أو بيئة Python 3.12 أو أحدث محلية (ينسخ القارئ الكود إلى خلية جديدة أو ملف).
قائمة الـ APIs المعتمدة (FastAPI): FastAPI من سلسلة 0.140 فما فوق، ولا تثبّت رقم إصدار في الأمثلة التعليمية. Pydantic v2 (2.13 فما فوق): model_validate وmodel_dump وfield_validator وConfigDict(from_attributes=True) وField وAnnotated؛ ممنوع أسلوب v1 (.dict() وparse_obj وvalidator وorm_mode وclass Config). SQLAlchemy 2.0: DeclarativeBase وMapped وmapped_column وselect() وSession؛ ممنوع declarative_base() القديمة وsession.query(). التهيئة عند الإقلاع والإغلاق بـ lifespan لا بـ @app.on_event. التبعيات بصيغة Annotated[T, Depends(f)]. كلمات المرور بمكتبة pwdlib مع Argon2 (PasswordHash.recommended())، وJWT بمكتبة PyJWT (import jwt) بمفتاح سري لا يقل عن 32 حرفًا؛ ممنوع python-jose وpasslib. الإعدادات بـ pydantic-settings. اكتب رقم 422 مباشرة ولا تستخدم ثوابت status لـ 422. لأن salt كلمات المرور عشوائي لا تعرض نص الـ hash في المخرجات بل نتيجة التحقق (True/False)؛ وفي JWT استخدم حمولة بقيم ثابتة أو اعرض الحمولة بعد فك التوقيع.`
    },
    design: {
      text: `مسار «مفاهيم وتصميم»:
بيئة القراءة: لا تجربة كود؛ الصفحة تعرض تصميمًا وقرارات. يجوز مقطع كود قصير (≤ 15 سطرًا) فقط حين يوضح الفكرة، ولا output-block له إلا إن كانت المخرجات حقيقية ومحسوبة.
* المخططات بـ flow-diagram للتدفقات، وبـ ASCII داخل pre بسمة dir="ltr" للمعمارية والتسلسل (بلا output-block)، وبـ figure عند الحاجة لرسم بسيط.
* في كل موضوع قرار: اعرض المشكلة ثم الخيارات ثم المعيار ثم الاختيار وثمنه (trade-off)؛ ولقرارات التصميم استعمل جدول «القرار | البديل | السبب | الثمن» في قسم المقارنة.
* ابدأ بالمتطلبات والأرقام التقريبية (الحجم والحمل) قبل الحل، ثم بيّن ماذا يتغير حين يتغير الرقم.
* التمرين الشامل حالة تحليل أو تصميم، وحلّه نموذج مفسَّر يوضح كيف نصل إلى القرار وكيف نتحقق منه. لا web search.`
    },
    project: {
      code: true,
      text: `مسار «مشروع تكاملي»:
بيئة التجربة: Terminal محلي ومحرر أكواد؛ والمشروع يعمل محليًا (قاعدة بياناته PostgreSQL بـ Docker Compose عند الحاجة). مواصفة المشروع الثابتة (الجداول والـ endpoints والأسماء) تأتي تحت «ملاحظات خاصة» أو في الكتل المرفقة وتُلزِم هذه الصفحة.
* كل code-block ملف حقيقي باسم مساره (مثل app/main.py) ويكمل ما سبقه في المشروع دون تعارض مع مواصفته.
* قدّم المشروع على خطوات صغيرة قابلة للتشغيل والتحقق، وبعد كل خطوة طريقة التأكد أنها تعمل (أمر أو اختبار).
* حيث تُعرض قرارات تصميم اشرح سببها وبديلها.`
    }
  }
  const VERSION_TRACKS = ['python', 'sql', 'shell', 'backend', 'project']

  /* ------------------------------------------------------------------
     3) البيانات والمصادر
  ------------------------------------------------------------------ */
  const $ = (sel, root = document) => root.querySelector(sel)
  const make = (tag, cls, text) => {
    const n = document.createElement(tag)
    if (cls) n.className = cls
    if (text != null) n.textContent = text
    return n
  }

  let data
  try {
    data = JSON.parse($('#stage-data').textContent)
  } catch (err) {
    document.body.textContent = 'خطأ في كتلة JSON داخل #stage-data: ' + err.message
    return
  }

  const digest = window.SEMB_DIGEST || {}
  const stageInfo = STAGES.find((s) => s.id === data.id) || { kind: data.kind || 'backend', n: data.n, short: data.title, t: data.title, e: data.en || '' }
  const stageNum = stageInfo.n || data.n || 0
  const ID = (data.id || '').toUpperCase()
  const kind = stageInfo.kind // 'math' | 'backend'
  const isMath = kind === 'math'
  const unit = isMath ? 'القسم' : 'المجموعة' // وحدة هذه الصفحة
  // السابقون في المسار نفسه فقط: المساران متوازيان، فلا تُعدّ الرياضيات معروفة قبل الـ Backend (ولا العكس)
  const sameKind = STAGES.filter((s) => s.kind === kind)
  const priorStages = sameKind.filter((s) => s.n < stageNum)

  const flat = []
  data.layers.forEach((layer) =>
    layer.parts.forEach((p) => flat.push({ p, layer, i: flat.length, key: data.id + '/' + p.f }))
  )
  const total = flat.length
  const countable = flat.filter((f) => !f.p.o)

  // مسارات الجزء (مسار الجزء ثم مسار المرحلة ثم design) والقالب المرفق له:
  // قالب الرياضيات فقط إن كانت كل مساراته math؛ والمختلط يأخذ القالب البرمجي (فيه معادلة اختيارية)
  const trackKeysOf = (p) => [].concat(p.track || data.track || 'design')
  const templateFor = (p) => (trackKeysOf(p).every((k) => k === 'math') ? TEMPLATE_MATH : TEMPLATE_CODE)

  // أرقام الرياضيات في الخطة هندية (١..٣٠) وأرقام الـ Backend عادية (1..43)؛ نُبقيها هكذا حتى لا يلتبس المساران
  const arDigits = (s) => String(s).replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d])
  const numFor = (k, n) => (k === 'math' ? arDigits(n) : String(n))
  const stageRef = (k, n) => (k === 'math' ? 'مرحلة الرياضيات ' : 'مرحلة Backend ') + numFor(k, n)
  const isStagePart = (p) => /^\d+$/.test(String(p.c)) // مرحلة من الخطة، لا صفحة التطبيق العملي
  const rangeOf = (s) => (s.r[0] === s.r[1] ? numFor(s.kind, s.r[0]) : numFor(s.kind, s.r[0]) + '–' + numFor(s.kind, s.r[1]))
  const chainOf = (k) => STAGES.filter((s) => s.kind === k).map((s) => s.id.toUpperCase() + ' ' + s.short + ' (' + rangeOf(s) + ')').join(' ← ')

  // مراحل الرياضيات المرتبطة بمرحلة Backend (الحقل m = أرقام مراحل الرياضيات): تُعدّ معروفة لهذه الصفحة وحدها
  function linkedMath(p) {
    return (p.m || []).map((num) => {
      for (const st of STAGES) {
        if (st.kind !== 'math') continue
        const part = ((digest[st.id] || {}).parts || []).find((q) => String(q.c) === String(num))
        if (part) return { num, part }
      }
      return { num, part: null }
    })
  }

  const plainTopic = (k) => k.replace(/^~/, '')
  const topicLine = (k) => (k.startsWith('~') ? '* ' + k.slice(1) + ' (داعم: مسار مخفّف)' : '* ' + k)
  const cleanEnd = (s) => s.replace(/[.،\s]+$/, '')
  const shortTitle = (t) => t.replace(/\s*\([A-Za-z][^()]*\)\s*$/, '')

  function getBlock(key) {
    if (data.blocks && data.blocks[key]) return data.blocks[key]
    for (const k of Object.keys(digest)) {
      const d = digest[k]
      if (d && d.blocks && d.blocks[key]) return d.blocks[key]
    }
    return null
  }

  // المصطلحات المعرَّفة قبل هذه الصفحة: ملخصات الأقسام أو المجموعات السابقة في المسار نفسه، ثم مراحل هذه الصفحة السابقة،
  // ثم مصطلحات مراحل الرياضيات المرتبطة بها (الحقل m)
  function termsBefore(i) {
    const out = []
    priorStages.forEach((st) => {
      const d = digest[st.id]
      if (d && d.parts) d.parts.forEach((p) => !p.o && out.push(...(p.x || [])))
    })
    flat.slice(0, i).forEach((f) => !f.p.o && out.push(...(f.p.x || [])))
    linkedMath(flat[i].p).forEach((l) => l.part && out.push(...(l.part.x || [])))
    return [...new Set(out)]
  }

  function knownBefore(i) {
    const lines = []
    priorStages.forEach((st) => {
      const d = digest[st.id]
      const head = '* ' + st.id.toUpperCase() + ' ' + st.t
      if (d && d.parts && d.parts.length) lines.push(head + ': ' + d.parts.filter((p) => !p.o).map((p) => shortTitle(p.t)).join('، '))
      else lines.push(head + ' (لا ملخص مسجَّل لها بعد: اعتمد على عنوانها فقط)')
    })
    const cur = flat[i]
    const prior = flat.slice(0, i).filter((f) => !f.p.o)
    const sameLayer = prior.filter((f) => f.layer === cur.layer)
    const earlier = prior.filter((f) => f.layer !== cur.layer)
    if (earlier.length) lines.push('* ' + ID + ' (صفحات سابقة): ' + earlier.map((f) => shortTitle(f.p.t)).join('، '))
    if (sameLayer.length) {
      lines.push('* ' + ID + ' — ' + shortTitle(cur.layer.title) + ' (ما قبل هذه الصفحة، مع موضوعات كل منها):')
      sameLayer.forEach((f) => lines.push('  - ' + shortTitle(f.p.t) + ': ' + f.p.k.map(plainTopic).join('؛ ')))
    }
    if (!isMath) {
      const lm = linkedMath(cur.p)
      if (lm.length) {
        lines.push('* الرياضيات المرتبطة بهذه المرحلة (يجوز استعمالها): ' + lm.map((l) => stageRef('math', l.num) + (l.part ? ' «' + shortTitle(l.part.t) + '»' : ' (لا ملخص مسجَّل لها بعد: اعتمد على عنوانها في الخطة)')).join('؛ '))
      }
      lines.push('* مسار الرياضيات يُدرَس بالتوازي ولا يُفترض: لا تعتمد منه إلا على ما ورد أعلاه تحت «الرياضيات المرتبطة».')
    }
    return lines
  }

  function prevNext(i) {
    const prev = flat[i - 1]
    const next = flat[i + 1]
    return {
      prev: prev ? { href: prev.p.f, title: shortTitle(prev.p.t) } : { href: 'index.html', title: 'صفحة ' + unit + ' ' + ID },
      next: next ? { href: next.p.f, title: shortTitle(next.p.t) } : { href: 'index.html', title: 'صفحة ' + unit + ' ' + ID }
    }
  }

  /* ------------------------------------------------------------------
     4) بناء الـ prompt لجزء واحد
  ------------------------------------------------------------------ */
  function build(i) {
    const { p, layer } = flat[i]
    const nav = prevNext(i)
    const stageIsPart = isStagePart(p)
    const eyebrow = ID + ' · ' + (data.title || stageInfo.t) + ' · ' + (stageIsPart ? numFor(kind, p.c) : p.c)

    const nextPart = flat.slice(i + 1).find((f) => !f.p.o)
    const nextStage = sameKind.find((s) => s.n === stageNum + 1)
    const nextLine = nextPart
      ? 'الصفحة التالية: «' + shortTitle(nextPart.p.t) + '» — لا تدخل في موضوعاتها' + (p.b ? '، لكن مهّد لها بقدر: ' + cleanEnd(p.b) : '') + '.'
      : nextStage
        ? 'هذه آخر صفحة في ' + unit + ' ' + ID + '. ' + (isMath ? 'القسم التالي' : 'المجموعة التالية') + ': ' + nextStage.id.toUpperCase() + ' «' + nextStage.t + '»' + (nextStage.o ? ' (اختياري)' : '') + ' — لا تدخل في موضوعاته' + (p.b ? '، لكن مهّد له بقدر: ' + cleanEnd(p.b) : '') + '.'
        : 'هذه آخر صفحة في ' + (isMath ? 'مسار الرياضيات' : 'مسار الـ Backend') + '.'

    const terms = termsBefore(i)
    const context =
      'موقع هذه الصفحة: ' + (stageIsPart ? stageRef(kind, p.c) : p.c) + ' من ' + unit + ' ' + ID + ' «' + (data.title || stageInfo.t) + '»' +
      (data.layers.length > 1 ? ' (' + shortTitle(layer.title) + ')' : '') + '، وهي الصفحة ' + (i + 1) + ' من ' + total + ' في ' + unit +
      (p.o ? ' (اختيارية: يجوز للقارئ تخطيها، ولا يعتمد عليها أي صفحة تالية)' : '') + '.\n' +
      'عنوان الصفحة (في title وفي h1): ' + p.t + '\n' +
      'eyebrow في الـ hero: ' + eyebrow + '\n' +
      'مسار الحفظ: ' + data.dir + '/' + p.f + '\n' +
      'page-nav: «السابق» ← ' + nav.prev.href + ' بعنوان «' + nav.prev.title + '»؛ «التالي» ← ' + nav.next.href + ' بعنوان «' + nav.next.title + '».\n' +
      'ما يعرفه القارئ الآن (شُرح سابقًا؛ يجوز لك استخدامه دون إعادة شرحه، ولا تستخدم ما سواه):\n' +
      (knownBefore(i).length ? knownBefore(i).join('\n') : '* لا شيء — هذه بداية المرجع.') + '\n' +
      'المصطلحات المعرَّفة سابقًا (تُستعمل دون إعادة تعريف): ' + (terms.length ? terms.join('، ') : 'لا شيء بعد.') + '\n' +
      nextLine

    let stage = 'الصفحة الحالية (المطلوبة): ' + p.t + '\nالموضوعات (topic-block لكل بند، بالترتيب):\n' + p.k.map(topicLine).join('\n')
    if (p.x && p.x.length) stage += '\nمصطلحات هذه الصفحة (تُعرَّف رسميًا في هذه الصفحة، كلٌّ منها داخل strong عند أول ذكر): ' + p.x.join('، ')
    if (p.u && p.u.length) stage += '\nمفاهيم تُستعمل هنا من صفحات سابقة (ذكّر بكل منها بجملة واحدة عند أول استعمال دون إعادة شرحها): ' + p.u.join('، ')
    if (p.dg && p.dg.length) {
      stage += '\nمخططات ASCII القياسية لهذه الصفحة (انسخ الهيكل كما هو داخل pre بسمة dir="ltr" وبلا output-block، وغيّر الأسماء والقيم فقط):\n' +
        p.dg.map((k) => (data.diagrams && data.diagrams[k]) || '[مخطط غير معرّف: ' + k + ']').join('\n\n')
    }
    if (p.n) stage += '\nملاحظات خاصة بهذه الصفحة: ' + p.n

    const trackKeys = trackKeysOf(p)
    const parts = []
    trackKeys.forEach((k) => parts.push(TRACKS[k] ? TRACKS[k].text : '[مسار غير معروف: ' + k + ']'))
    if (data.env) parts.push('ملاحظات خاصة ' + (isMath ? 'بالقسم' : 'بالمجموعة') + ' كلها: ' + data.env)
    if (trackKeys.some((k) => VERSION_TRACKS.includes(k))) parts.push(VERSIONS)
    ;(p.use || []).forEach((k) => parts.push(getBlock(k) || '[كتلة غير معرّفة: ' + k + ']'))
    if (trackKeys.some((k) => TRACKS[k] && TRACKS[k].code)) parts.push(CODE_RULES)

    return MASTER.replace('@@CHAIN_M@@', () => chainOf('math'))
      .replace('@@CHAIN_B@@', () => chainOf('backend'))
      .replace('@@READER@@', () => data.reader || READER_DEFAULT)
      .replace('@@TEMPLATE@@', () => templateFor(p))
      .replace('@@CONTEXT@@', () => context)
      .replace('@@STAGE@@', () => stage)
      .replace('@@EXERCISES@@', () => EXERCISES)
      .replace('@@TRACK@@', () => parts.join('\n\n'))
      .replace('@@DELIVERY@@', () => FREE_PLAN + '\n\n' + DELIVERY)
  }

  /* ------------------------------------------------------------------
     5) التقدّم (localStorage) + فحص الاعتماديات
  ------------------------------------------------------------------ */
  let done = new Set()
  const save = () => {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...done])) } catch (_) {}
  }
  try {
    done = new Set(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]'))
  } catch (_) {
    done = new Set()
  }

  function lint() {
    const issues = []
    const seenFiles = new Set()
    const defined = new Set()
    priorStages.forEach((st) => {
      const d = digest[st.id]
      if (d && d.parts) d.parts.forEach((p) => !p.o && (p.x || []).forEach((t) => defined.add(t)))
    })
    flat.forEach(({ p }) => {
      const name = shortTitle(p.t)
      if (!p.f || !p.k || !p.k.length) issues.push(name + ': ينقصه ملف أو موضوعات')
      if (p.f && seenFiles.has(p.f)) issues.push(name + ': اسم الملف مكرر')
      seenFiles.add(p.f)
      if (p.k && p.k.length > MAX_TOPICS) issues.push(name + ': ' + p.k.length + ' موضوعات (الحد ' + MAX_TOPICS + ')، قسّمه')
      if (isStagePart(p)) {
        if (p.k && p.k.length !== STAGE_TOPICS) issues.push(name + ': ' + p.k.length + ' موضوعات (الخطة: ' + STAGE_TOPICS + ' لكل مرحلة)')
        const r = stageInfo.r
        if (r && (+p.c < r[0] || +p.c > r[1])) issues.push(name + ': رقم المرحلة ' + p.c + ' خارج نطاق ' + ID + ' (' + r[0] + '–' + r[1] + ')')
      }
      if (p.m && p.m.some((n) => !Number.isInteger(n) || n < 1 || n > 30)) issues.push(name + ': الحقل m يقبل أرقام مراحل الرياضيات 1 إلى 30 فقط')
      if (p.m && p.m.length && isMath) issues.push(name + ': الحقل m خاص بمراحل الـ Backend')
      const linkedTerms = linkedMath(p).flatMap((l) => (l.part ? l.part.x || [] : []))
      ;(p.u || []).forEach((t) => !defined.has(t) && !linkedTerms.includes(t) && issues.push(name + ' ← ' + t + ' (مستعمل قبل تعريفه)'))
      if (!p.o) (p.x || []).forEach((t) => defined.add(t))
      ;trackKeysOf(p).forEach((k) => !TRACKS[k] && issues.push(name + ': مسار غير معروف «' + k + '»'))
      ;(p.use || []).forEach((k) => !getBlock(k) && issues.push(name + ': كتلة غير معرّفة «' + k + '»'))
    })
    return issues
  }

  /* ------------------------------------------------------------------
     6) رسم الصفحة
  ------------------------------------------------------------------ */
  const titleHtml = (el, ar, en) => {
    el.textContent = ar
    if (en) {
      el.append(' ')
      const s = make('span', '', '(' + en + ')')
      s.dir = 'ltr'
      el.append(s)
    }
  }

  // «عربي (English)» ← الجزء الإنجليزي معزول LTR حتى لا تنقلب الأقواس في سطر RTL
  const setTitle = (el, text) => {
    const m = text.match(/^(.*?)\s*(\([A-Za-z][^()]*\))\s*$/)
    if (!m) {
      el.textContent = text
      return
    }
    el.textContent = m[1] + ' '
    const s = make('span', '', m[2])
    s.dir = 'ltr'
    el.append(s)
  }
  const arabicOnly = (k) => plainTopic(k).split(' - ')[0]

  const stageTitle = data.title || stageInfo.t
  titleHtml($('.hero__title'), 'Prompts — ' + stageTitle, data.en || stageInfo.e)
  $('.hero__eyebrow').textContent = ID + ' · ' + stageTitle
  const back = $('.topbar__back')
  if (back) back.href = '../' + data.dir + '/index.html'
  const lead = $('.hero__lead')
  if (lead) lead.textContent = 'انسخ prompt المرحلة، وابدأ به محادثة جديدة مع إرفاق ملف القالب المكتوب بجانب عنوانها (من مجلد templet: templet.html أو templet-math.html)، ثم احفظ الصفحة الناتجة في مجلد ' + unit + ' باسم الملف الظاهر تحت العنوان. إن انقطعت المحادثة بسبب حدود الاستخدام فاكتب «Continue» بعد انتهاء فترة الإغلاق.'

  const progressText = $('#progress-text')
  const progressFill = $('#progress-fill')
  const updateProgress = () => {
    const d = countable.filter((f) => done.has(f.key)).length
    progressText.textContent = 'المنجز: ' + d + ' من ' + countable.length + ' صفحة'
    progressFill.style.width = (countable.length ? (d / countable.length) * 100 : 0) + '%'
  }

  const lintBox = $('#lint')
  const issues = lint()
  lintBox.className = 'callout' + (issues.length ? ' callout--warning' : ' callout--note')
  lintBox.textContent = ''
  const lintLabel = make('span', 'callout__label', 'فحص البيانات')
  const lintText = make('p', '', issues.length ? issues.length + ' ملاحظة: ' + issues.join(' | ') : 'كل صفحة لها ملف وموضوعات (3 لكل مرحلة)، وأرقام المراحل داخل نطاق ' + unit + '، وكل مفهوم مستعمَل معرَّف قبل استعماله.')
  lintBox.append(lintLabel, lintText)

  const groups = $('#groups')
  let lastLayer = null
  let list = null
  flat.forEach((f) => {
    if (f.layer !== lastLayer) {
      lastLayer = f.layer
      const h = make('h2', 'prompt-group__title')
      setTitle(h, f.layer.title)
      list = make('div', 'prompt-list')
      groups.append(h, list)
    }
    const { p } = f
    const card = make('div', 'prompt-card')

    const label = make('label', 'prompt-card__check')
    const cb = make('input')
    cb.type = 'checkbox'
    cb.checked = done.has(f.key)
    cb.setAttribute('aria-label', 'تم إنجاز ' + shortTitle(p.t))
    label.append(cb, make('span', 'prompt-card__num', isStagePart(p) ? numFor(kind, p.c) : p.c))

    const body = make('div', 'prompt-card__body')
    const title = make('span', 'prompt-card__title')
    setTitle(title, p.t)
    if (p.o) title.append(' ', make('span', 'chip chip--optional', 'اختياري'))
    const tplChip = make('span', 'chip', templateFor(p)) // القالب الذي يُرفق مع هذا الـ prompt
    tplChip.dir = 'ltr'
    title.append(' ', tplChip)
    const topics = make('span', 'prompt-card__topics', p.k.map(arabicOnly).join(' · '))
    const file = make('code', 'prompt-card__file', data.dir + '/' + p.f)
    body.append(title, topics, file)

    const btn = make('button', 'btn')
    btn.type = 'button'
    btn.innerHTML = '<span class="btn__idle">نسخ الـ prompt</span><span class="btn__done">تم النسخ</span>'
    btn.addEventListener('click', async () => {
      const ok = await window.SEMB.copyText(build(f.i))
      if (ok) window.SEMB.flash(btn)
    })

    const sync = () => card.classList.toggle('is-done', cb.checked)
    cb.addEventListener('change', () => {
      cb.checked ? done.add(f.key) : done.delete(f.key)
      sync()
      save()
      updateProgress()
    })
    sync()
    card.append(label, body, btn)
    list.append(card)
  })
  updateProgress()

  // للاختبار من وحدة التحكم: SEMB_PROMPTS.build(0)
  window.SEMB_PROMPTS = { build, flat, lint, STAGES }
})()
