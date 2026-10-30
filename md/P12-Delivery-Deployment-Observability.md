# المرحلة الثانية عشرة [P12]: النشر، التشغيل، المراقبة (Delivery, Deployment, Observability)

أنا مهندس برمجيات أهدف إلى بناء فهم هندسي متين يساعدني على تحليل المشكلات، وفهم سلوك الأنظمة، واتخاذ قرارات تقنية مبررة، وتطوير برمجيات موثوقة قابلة للاختبار والصيانة والتوسع. أفضّل استخدام **Python** و**PostgreSQL**، وأعتمد **FastAPI** في المسار التطبيقي لتطوير الخدمات الخلفية؛ لذلك تربط هذه الخطة بين الأسس النظرية والتطبيق العملي باستخدام هذه التقنيات.

**هدف المرحلة:** بناء مشروع FastAPI، اختباره، نشره، مراقبته، وتشخيص المشكلات في بيئة التشغيل. لا يكفي أن يعمل التطبيق محليًا؛ يجب أن تكون طريقة البناء والإعداد والترحيل والتراجع قابلة للتكرار.

## 1. الحاويات (Containers)

- الحاويات مقابل الآلات الافتراضية - Containers vs Virtual Machines
- الصور، الحاويات، الطبقات - Images, Containers, Layers (Docker)
- ملف بناء الصورة، حجم الصورة - Image Build File, Image Size
- شبكات الحاويات، التخزين - Container Networking, Storage
- تشغيل عدة خدمات معًا - Multi-Service Setup (Docker Compose)
- إعدادات البيئات، الأسرار - Environment Configuration, Secrets
- أمان الحاويات الأساسي - Basic Container Security (Non-Root User)

## 2. التكامل المستمر، التسليم المستمر (Continuous Integration, Continuous Delivery)

- البناء، الاختبار الآلي عند كل دمج - Automated Build, Test on Every Merge
- الفحوصات الآلية للجودة، الأمن - Automated Quality, Security Checks
- البناء القابل لإعادة الإنتاج - Reproducible Builds
- البيئات: التطوير، التجهيز، الإنتاج - Environments: Development, Staging, Production
- إدارة الإصدارات، الوسوم - Release Management, Tags

## 3. السحابة، البنية التحتية (Cloud, Infrastructure)

- نماذج الخدمة - Service Models (IaaS, PaaS, SaaS)
- الحوسبة، التخزين، قواعد البيانات المدارة، الشبكات الافتراضية - Compute, Storage, Managed Databases, Virtual Networks
- إدارة الهوية، الصلاحيات في السحابة - Cloud Identity, Access Management
- الوعي بالتكلفة - Cost Awareness
- البنية التحتية بوصفها كودًا (مدخل) - Infrastructure as Code (Introduction)

## 4. النشر (Deployment)

- خادم ASGI مثل Uvicorn، الوكيل العكسي، الشهادات - ASGI Server (e.g. Uvicorn), Reverse Proxy, Certificates
- إعدادات العمليات والإيقاف السلس والمهلات وتمرير رؤوس الوكيل بأمان - Process Configuration, Graceful Shutdown, Timeouts, Trusted Proxy Headers
- استراتيجيات النشر - Deployment Strategies: Rolling, Blue-Green, Canary
- التراجع عن الإصدار - Rollbacks
- ترحيل قواعد البيانات دون توقف - Zero-Downtime Migrations: Expand, Contract
- إدارة الأسرار، الإعدادات - Secrets, Configuration Management

## 5. المراقبة (Observability)

- السجلات المنظمة - Structured Logs
- المقاييس: المعدل، الأخطاء، المدة - Metrics: Rate, Errors, Duration
- تتبع الطلبات الموزع - Distributed Tracing
- لوحات المراقبة، التنبيهات - Dashboards, Alerts
- مؤشرات مستوى الخدمة، أهدافها، ميزانية الأخطاء - Service-Level Indicators, Objectives, Error Budgets

## 6. إدارة الحوادث (Incident Management)

- الاستجابة، التصنيف، التواصل - Response, Triage, Communication
- استكشاف أخطاء الإنتاج - Production Troubleshooting
- تحليل السبب الجذري - Root Cause Analysis
- مراجعات ما بعد الحوادث بلا لوم - Blameless Postmortems
- أدلة التشغيل - Operational Runbooks

## التدريبات العملية (Practical Exercises)

1. حوّل مشروع FastAPI من [P11](P11-Backend-Engineering-FastAPI.md) إلى صورة صغيرة، وشغّله مع PostgreSQL وRedis عند الحاجة باستخدام Docker Compose؛ استخدم مستخدمًا غير جذر، وإعدادات بيئة واضحة، وفحوص صحة (القسم 1).
2. ابنِ خط تكامل مستمر: تنسيق، فحص جودة، فحص أنواع، اختبارات مع بوستجريس، بناء الصورة؛ يفشل عند أي خطأ (القسم 2).
3. انشر خدمة FastAPI على خادم افتراضي أو منصة مناسبة خلف وكيل عكسي وباتصال آمن؛ تحقق من إعداد ASGI والإيقاف السلس وتمرير الرؤوس الموثوقة (القسمان 3، 4).
4. نفذ ترحيلًا بنمط التوسع ثم الانكماش لإضافة عمود دون إيقاف الخدمة (القسم 4).
5. أضف سجلات منظمة، مقاييس (طلبات، أخطاء، زمن)، لوحة مراقبة، تنبيهًا واحدًا (القسم 5).
6. حاكِ حادثة: إيقاف قاعدة البيانات، امتلاء القرص، تسرب اتصالات؛ شخّصها من اللوحة، السجلات فقط، ثم اكتب مراجعة بلا لوم، دليل تشغيل (القسم 6).

**المخرج:** نظام منشور بخط تكامل مستمر، لوحة مراقبة، دليل تشغيل، مراجعة حادثة محاكاة.

**معيار الانتقال:**

- تنشر إصدارًا جديدًا، تتراجع عنه دون قلق.
- تعرف من اللوحة هل المشكلة في التطبيق، قاعدة البيانات، الشبكة.
- تغير مخطط قاعدة البيانات دون إيقاف الخدمة.
- تكتب دليل تشغيل يستطيع زميل اتباعه.

---
