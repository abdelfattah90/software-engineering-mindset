# عقلية مهندس البرمجيات (Software Engineering Mindset)

أنا مهندس برمجيات أهدف إلى بناء فهم هندسي متين يساعدني على تحليل المشكلات، وفهم سلوك الأنظمة، واتخاذ قرارات تقنية مبررة، وتطوير برمجيات موثوقة قابلة للاختبار والصيانة والتوسع. أفضّل استخدام **Python** و**PostgreSQL**، وأعتمد **FastAPI** في المسار التطبيقي لتطوير الخدمات الخلفية؛ لذلك تربط هذه الخطة بين الأسس النظرية والتطبيق العملي باستخدام هذه التقنيات.

## المسار التقني

- **لغة البرمجة:** Python.
- **إطار خدمات الويب الأساسي:** FastAPI.
- **قاعدة البيانات الأساسية:** PostgreSQL؛ مع إتقان SQL والنموذج العلاقي.
- **تكامل قاعدة البيانات:** SQLAlchemy 2.x عند الحاجة إلى ORM، وAlembic لترحيلات المخطط. يظل SQL المباشر أداة أساسية.
- **الاختبارات:** pytest، واختبارات FastAPI باستخدام TestClient أو HTTPX حسب الحالة.
- **بيئة التشغيل:** Git والطرفية، ثم Linux وDocker والتكامل المستمر والنشر.

تُراجع الإصدارات وطرق الاستخدام من التوثيق الرسمي عند التنفيذ؛ فالخطة تحدد المجالات التي ينبغي تعلمها، لا إصدارات الحزم التي يجب تثبيتها إلى الأبد.

## توجيه المسار بحسب خبرتك الحالية

في مرحلتي Python وPostgreSQL، ركّز على سد الفجوات وتعميق الفهم الداخلي والمفاضلات الهندسية بدل إعادة دراسة ما تتقنه بالفعل من البداية؛ مثل نموذج بيانات اللغة والذاكرة والأنواع والاختبار، وفي قاعدة البيانات المعاملات والعزل والفهارس وخطط التنفيذ وترحيلات المخطط.

## فهرس المراحل

| المعرّف | المرحلة | الملف |
|---|---|---|
| `P01` | التأسيس الرياضي (Mathematical Foundations) | [P01-Mathematical-Foundations.md](P01-Mathematical-Foundations.md) |
| `P02` | لغة بايثون (Python Programming) | [P02-Python-Programming.md](P02-Python-Programming.md) |
| `P03` | قواعد البيانات العلاقية (Relational Databases, SQL, PostgreSQL) | [P03-Relational-Databases-PostgreSQL.md](P03-Relational-Databases-PostgreSQL.md) |
| `P04` | هياكل البيانات (Data Structures) | [P04-Data-Structures.md](P04-Data-Structures.md) |
| `P05` | الخوارزميات (Algorithms) | [P05-Algorithms.md](P05-Algorithms.md) |
| `P06` | الشبكات، الويب، بروتوكول نقل النص التشعبي (Networking, Web, HTTP) | [P06-Networking-Web-HTTP.md](P06-Networking-Web-HTTP.md) |
| `P07` | الحاسوب، أنظمة التشغيل (Computer Systems, Operating Systems) | [P07-Computer-Systems-Operating-Systems.md](P07-Computer-Systems-Operating-Systems.md) |
| `P08` | هندسة البرمجيات، تصميم الكود (Software Engineering, Code Design) | [P08-Software-Engineering-Code-Design.md](P08-Software-Engineering-Code-Design.md) |
| `P09` | الاختبار، جودة الكود (Testing, Code Quality) | [P09-Testing-Code-Quality.md](P09-Testing-Code-Quality.md) |
| `P10` | أمن التطبيقات (Application Security) | [P10-Application-Security.md](P10-Application-Security.md) |
| `P11` | تطوير الخدمات الخلفية (Backend Engineering With FastAPI) | [P11-Backend-Engineering-FastAPI.md](P11-Backend-Engineering-FastAPI.md) |
| `P12` | النشر، التشغيل، المراقبة (Delivery, Deployment, Observability) | [P12-Delivery-Deployment-Observability.md](P12-Delivery-Deployment-Observability.md) |
| `P13` | تصميم الأنظمة (System Design) | [P13-System-Design.md](P13-System-Design.md) |
| `P14` | المشاريع التكاملية (Capstone Projects) | [P14-Capstone-Projects.md](P14-Capstone-Projects.md) |

## الترتيب العام

[P01](P01-Mathematical-Foundations.md) الرياضيات → [P02](P02-Python-Programming.md) Python → [P03](P03-Relational-Databases-PostgreSQL.md) PostgreSQL → [P04](P04-Data-Structures.md) هياكل البيانات → [P05](P05-Algorithms.md) الخوارزميات → [P06](P06-Networking-Web-HTTP.md) الشبكات والويب وHTTP → [P07](P07-Computer-Systems-Operating-Systems.md) الحاسوب وأنظمة التشغيل → [P08](P08-Software-Engineering-Code-Design.md) هندسة البرمجيات وتصميم الكود → [P09](P09-Testing-Code-Quality.md) الاختبار وجودة الكود → [P10](P10-Application-Security.md) أمن التطبيقات → [P11](P11-Backend-Engineering-FastAPI.md) Backend مع FastAPI → [P12](P12-Delivery-Deployment-Observability.md) النشر والتشغيل والمراقبة → [P13](P13-System-Design.md) تصميم الأنظمة → [P14](P14-Capstone-Projects.md) المشاريع التكاملية.

## معايير الإتقان (Mastery Levels)

لا يُقاس التقدم بعدد الموضوعات المقروءة، بل بالقدرة على استخدامها.

1. **الفهم (Understanding):** تشرح المفهوم بلغتك، وتعرف المشكلة التي يحلها، وتميز حدود استخدامه.
2. **التطبيق (Application):** تحل مشكلات مستقلة، وتنفذ أمثلة عملية، وتختار الأداة المناسبة، وتكتب اختبارات مفيدة.
3. **التحليل (Analysis):** تقارن البدائل، وتحلل الأداء، وتشخص الأخطاء، وتحدد أسباب الفشل.
4. **اتخاذ القرار (Engineering Judgment):** تبرر الاختيارات المعمارية، وتقدّر المفاضلات، وتختار أبسط تصميم يفي بالمتطلبات، وتعدّل الأنظمة بأمان.

ليس مطلوبًا بلوغ المستوى الرابع في كل موضوع؛ يتناسب العمق مع أهمية الموضوع في عملك.

## المراجعة الدورية (Periodic Review)

- بعد كل مشروع: اكتب ما أخطأت فيه، وحدد الموضوعات التي تحتاج إلى مراجعة.
- عند ظهور مشكلة، مثل استعلام بطيء أو خطأ تزامن، ارجع إلى المرحلة التي تغطي المفهوم.
- أضف الموضوعات الاختيارية عندما يتطلبها عملك، مثل الجبر الخطي والتفاضل ولغة التجميع.
- عند إكمال مجموعة من المراحل، حدّث الخطة بما ظهر من احتياجات فعلية.

**الهدف النهائي:** مهندس برمجيات يفهم المشكلة، ويصمم الحل، وينفذه ببايثون، ويصمم البيانات ويديرها ببوستجريس، ويختبر الكود، ويؤمّن الخدمات، ويحلل الأداء، ويشغّل الأنظمة ويصونها، ويتخذ قرارات هندسية مبررة.
