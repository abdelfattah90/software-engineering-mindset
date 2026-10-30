# المرحلة الحادية عشرة [P11]: تطوير الخدمات الخلفية (Backend Engineering With FastAPI)

أنا مهندس برمجيات أهدف إلى بناء فهم هندسي متين يساعدني على تحليل المشكلات، وفهم سلوك الأنظمة، واتخاذ قرارات تقنية مبررة، وتطوير برمجيات موثوقة قابلة للاختبار والصيانة والتوسع. أفضّل استخدام **Python** و**PostgreSQL**، وأعتمد **FastAPI** في المسار التطبيقي لتطوير الخدمات الخلفية؛ لذلك تربط هذه الخطة بين الأسس النظرية والتطبيق العملي باستخدام هذه التقنيات.

**هدف المرحلة:** بناء خدمة خلفية منظمة وموثوقة باستخدام FastAPI وPostgreSQL، مع عقود واضحة للواجهة، والتحقق من المدخلات، ومعالجة الأخطاء، والصلاحيات، والاختبارات، ومراقبة السلوك.

**المسار التقني الأساسي:** FastAPI + Pydantic + ASGI server مثل Uvicorn + PostgreSQL. تعلّم SQL أولًا، ثم استخدم SQLAlchemy 2.x كخيار افتراضي للتكامل وAlembic لترحيلات التطبيق عندما يناسب المشروع. لا يلزم تطبيق كل أداة في أول مشروع صغير.

## 1. نموذج تطبيقات الويب في Python وFastAPI (Python Web and FastAPI Fundamentals)

- دور ASGI، وكيف يتكامل التطبيق مع خادم ASGI - ASGI and ASGI Server
- إنشاء تطبيق FastAPI وتشغيله محليًا - Application Setup and Local Development
- مسارات التطبيق، معاملات المسار والاستعلام - Path Operations, Path and Query Parameters
- أجسام الطلبات ونماذج Pydantic - Request Bodies, Pydantic Models
- نماذج الاستجابة، التحقق والتسلسل - Response Models, Validation, Serialization
- رموز الحالة والرؤوس والاستجابات المخصصة - Status Codes, Headers, Custom Responses
- التوثيق الناتج من OpenAPI وواجهات التوثيق التفاعلية - OpenAPI and Interactive API Docs
- تقسيم المسارات باستخدام `APIRouter` - Modular Routing with `APIRouter`
- معالجة أخطاء HTTP والاستثناءات ومعالجات الأخطاء العامة - `HTTPException`, Exception Handling
- حقن الاعتماديات باستخدام `Depends` و`Annotated` - Dependency Injection
- الوسائط البرمجية ودورة حياة التطبيق باستخدام `lifespan` - Middleware and Application Lifespan
- الإعدادات ومتغيرات البيئة والتحقق من القيم - Settings and Environment Configuration
- الفرق بين `def` و`async def` في مسارات FastAPI - Sync and Async Path Operations
- تجنب استدعاء عمليات I/O حاجبة داخل مسار غير متزامن دون فهم أثرها - Blocking I/O in Async Code

## 2. تنفيذ REST APIs (Implementing REST APIs)

*تصميم REST وHTTP مملوك لـ [P06](P06-Networking-Web-HTTP.md)؛ هنا يُطبّق التصميم داخل FastAPI بدل إعادة شرح المفاهيم.*

- تحويل الموارد والعقود إلى مسارات وعمليات واضحة - Resources and Path Operations
- فصل نماذج الإدخال عن نماذج الإخراج وعن نماذج قاعدة البيانات - Input, Output, and Persistence Models
- التحقق من المدخلات، الحدود، القيم الافتراضية، وصيغة الأخطاء - Validation and Error Contracts
- الترقيم، التصفية، الترتيب والبحث - Pagination, Filtering, Sorting, Search
- الإصدارات والتوافق الخلفي - Versioning and Backward Compatibility
- رفع الملفات، حدود الحجم، البث والاستجابات الكبيرة - File Uploads, Size Limits, Streaming
- إعداد CORS على أساس أصول موثوقة، لا فتحه بلا قيود - CORS Configuration
- استقبال Webhooks والتحقق من التوقيع ومنع معالجة الحدث المكرر - Webhook Verification and Deduplication
- WebSocket وServer-Sent Events عند وجود حالة استخدام مناسبة - Optional Real-Time Communication
- إرجاع رموز HTTP دقيقة ومتوافقة مع عقد الواجهة - HTTP Contract Compliance

## 3. التكامل مع PostgreSQL (PostgreSQL Integration)

- إدارة الاتصالات وتجميعها - Connections and Connection Pooling
- تعريف النماذج وكتابة الاستعلامات باستخدام SQLAlchemy 2.x - SQLAlchemy 2.x Models and Queries
- فهم الفرق بين SQLAlchemy Core وORM وSQL المباشر - Core, ORM, and Raw SQL
- إدارة عمر `Session` أو `AsyncSession` وحدود المعاملة - Session and Transaction Lifecycle
- توفير جلسة قاعدة البيانات باستخدام اعتماديات FastAPI - Database Session Dependency
- عدم مشاركة جلسة واحدة بين مهام متزامنة - Session Scope and Concurrency Safety
- الالتزام بحدود المعاملات وعدم إخفاء `commit` أو `rollback` في أماكن غير واضحة - Explicit Transaction Boundaries
- ترحيلات التطبيق باستخدام Alembic، مع فهم SQL الذي تنتجه - Alembic Migrations
- معالجة أخطاء القيود والتعارض والجمود والمهلات - Constraint, Conflict, Deadlock, and Timeout Handling
- مشكلة N+1 واستراتيجيات تحميل العلاقات - N+1 and Relationship Loading
- قياس الاستعلامات وتحسينها بالرجوع إلى [P03](P03-Relational-Databases-PostgreSQL.md) - Application-Level Query Optimization
- اختيار التنفيذ المتزامن أو غير المتزامن لقاعدة البيانات بوعي - Sync vs Async Database Access

*اختر مسارًا متسقًا للمشروع الأول: مثل SQLAlchemy المتزامن مع مسارات `def` عند ملاءمته، أو مسار غير متزامن كامل مع برنامج تشغيل يدعم async. لا تخلط بينهما لمجرد استخدام `async def`، ولا تتعامل مع ORM بديلًا عن فهم SQL.*

## 4. المصادقة والتفويض في FastAPI (Authentication and Authorization)

- فصل التحقق من الهوية عن قرار الصلاحية - Authentication vs Authorization
- استخدام الاعتماديات لحماية المسارات - Security Dependencies
- التحقق من بيانات الدخول وتخزين كلمات المرور بتجزئة مناسبة - Credential Verification and Password Hashing
- الجلسات أو الرموز الموقعة وسياسات الانتهاء والتجديد والإلغاء - Sessions and Token Lifecycle
- OAuth 2.0 وOpenID Connect على المستوى المطلوب للتكامل - OAuth 2.0 and OpenID Connect
- الأدوار والصلاحيات وملكية الموارد - Roles, Permissions, Resource Ownership
- منع IDOR وفحص الوصول إلى كل مورد في الخادم - Object-Level Authorization
- الحماية من التخمين وتحديد معدل محاولات الدخول - Brute-Force Protection
- عدم تضمين أسرار أو بيانات حساسة في الرموز أو السجلات - Secret and Token Hygiene

*مفاهيم الأمن والثغرات مملوكة لـ [P10](P10-Application-Security.md)؛ هذا القسم خاص بالتنفيذ واختبار حالات الوصول.*

## 5. المهام الخلفية والرسائل (Background Jobs and Messaging)

- الفرق بين عمل مرتبط بالاستجابة ومهمة خلفية مستقلة - In-Request Work vs Background Jobs
- استخدام `BackgroundTasks` للأعمال القصيرة غير الحرجة فقط - FastAPI `BackgroundTasks`
- العاملون والطوابير للمهام الطويلة أو التي يجب ضمان استمرارها - Workers and Durable Queues
- جدولة المهام وإعادة المحاولة والتعامل مع الرسائل الفاشلة - Scheduling, Retries, Failed Messages
- جعل معالجة المهمة آمنة عند التكرار - Idempotent Job Processing
- التعامل مع توقف العامل أثناء المهمة - Worker Failure and Recovery
- نظرة على وسطاء الرسائل مثل Redis وRabbitMQ وKafka - Message Brokers Overview
- مدخل إلى Transactional Outbox عند الحاجة إلى اتساق قاعدة البيانات والرسائل - Transactional Outbox

## 6. التخزين المؤقت (Caching)

- التخزين داخل العملية مقابل التخزين الموزع مثل Redis - In-Process vs Distributed Cache
- نمط Cache-Aside ومدة الصلاحية وسياسات الإخلاء - Cache-Aside, TTL, Eviction
- إبطال القيم واتساقها مع قاعدة البيانات - Invalidation and Consistency
- حماية قاعدة البيانات من Cache Stampede - Cache Stampede Protection
- قياس أثر التخزين المؤقت والتحقق من صحة النتائج - Cache Measurement and Correctness
- الحالات التي لا يستحق فيها التخزين المؤقت تعقيده - When Not to Cache

## 7. موثوقية الخدمة (Service Reliability)

- ضبط المهلات عند الاتصال بالخدمات وقاعدة البيانات - Timeouts
- إعادة المحاولة مع التراجع الأسي والتشتيت - Retries, Exponential Backoff, Jitter
- قواطع الدوائر وعزل الأعطال عند الحاجة - Circuit Breakers and Fault Isolation
- قابلية تكرار الطلب ومفاتيح Idempotency - Idempotency and Idempotency Keys
- التدهور التدريجي بدل فشل الخدمة بالكامل - Graceful Degradation
- تحديد معدل الطلبات واختيار خوارزمية مناسبة - Rate Limiting
- فصل فحص الصحة عن جاهزية استقبال الحركة عند الحاجة - Liveness and Readiness Checks
- عدم إعادة محاولة عملية غير آمنة دون فهم أثر تكرارها - Safe Retry Policy

## 8. بنية المشروع والتوثيق (Project Structure and Documentation)

- البدء ببنية بسيطة ثم تقسيمها عندما يظهر سبب عملي - Start Simple, Split When Needed
- فصل مسارات API عن منطق العمل والوصول إلى البيانات - API, Service, and Persistence Boundaries
- تنظيم وحدات FastAPI باستخدام `APIRouter` دون تحويل كل مفهوم إلى طبقة إلزامية - Modular Routers
- فصل نماذج Pydantic عن نماذج التخزين - Schema and Persistence Model Separation
- إعدادات التطبيق والأسرار خارج الشيفرة - Configuration and Secrets Separation
- إدارة الاعتماديات والتبعيات وتثبيت إصداراتها - Dependency and Environment Management
- التسجيل المنظم ومعرّف الطلب - Structured Logging and Request ID
- README يشرح الإعداد والتشغيل والاختبار والترحيلات - Developer Documentation

مثال هيكلي مرجعي لمشروع متوسط، وليس قالبًا إلزاميًا لكل تطبيق:

```text
app/
  main.py
  api/
    routers/
  core/
    config.py
  schemas/
  models/
  services/
  repositories/
  db/
    session.py
alembic/
tests/
pyproject.toml
README.md
```

لا تنشئ كل هذه المجلدات إن كان التطبيق صغيرًا؛ أضف التقسيم عندما يساعد على توضيح المسؤوليات أو اختبارها.

## 9. اختبار خدمات FastAPI (Testing FastAPI Services)

- اختبار منطق العمل بمعزل عن إطار الويب - Business Logic Tests
- اختبار المسارات والطلبات والاستجابات باستخدام TestClient أو HTTPX - API Tests
- اختبار التحقق من المدخلات ورموز الحالة وعقود الاستجابة - Validation and Response Contract Tests
- استبدال الاعتماديات في الاختبارات باستخدام `app.dependency_overrides` - Dependency Overrides
- اختبارات تكامل مع PostgreSQL حقيقي وترحيلات قابلة لإعادة التشغيل - PostgreSQL Integration Tests
- اختبار المصادقة والتفويض ومحاولات الوصول غير المصرح - Access-Control Tests
- اختبار الأخطاء والمهلات وإعادة المحاولة وإلغاء المهام - Failure-Path Tests
- اختبارات غير متزامنة عند الحاجة الفعلية - Async Tests
- اختبار Webhooks لمنع التكرار والتحقق من التوقيع - Webhook Tests
- اختبار الأداء والعقود كمسارين متقدمين عند الحاجة - Performance and Contract Tests

## التدريبات العملية (Practical Exercises)

1. ابنِ API لإدارة المهام باستخدام FastAPI: نماذج Pydantic، مسارات مقسمة بـ `APIRouter`، رموز حالة صحيحة، أخطاء موحدة وتوثيق OpenAPI (القسمان 1، 2).
2. أضف PostgreSQL وSQLAlchemy وترحيلات Alembic؛ نفّذ عملية متعددة الجداول داخل معاملة واضحة (القسم 3).
3. أنشئ N+1 عمدًا، قِس عدد الاستعلامات وزمنها، ثم أصلح السبب وفسّر المفاضلة (القسم 3).
4. أضف مستخدمين وأدوارًا وملكية موارد؛ أثبت باختبارات أن مستخدمًا لا يستطيع الوصول إلى مورد مستخدم آخر (القسم 4).
5. اختبر مسارات `def` و`async def` مع نماذج I/O مناسبة، وأظهر مثالًا يؤدي فيه الاستدعاء الحاجب إلى إضعاف الاستجابة ثم أصلحه (القسمان 1، ومرجع [P07](P07-Computer-Systems-Operating-Systems.md)).
6. أنشئ مهمة خلفية قصيرة مناسبة لـ `BackgroundTasks`، ثم صمم حالة مختلفة تتطلب عاملًا وطابورًا؛ اختبر التكرار وتوقف العامل (القسم 5).
7. أضف Cache إلى نقطة نهاية ذات حمل قابل للقياس، اختبر الإبطال والبيانات القديمة، واحذف Cache إذا لم يثبت فائدته (القسم 6).
8. حاكِ خدمة خارجية بطيئة أو معطلة، وطبّق مهلة وإعادة محاولة مدروسة وقاطع دائرة عند الحاجة (القسم 7).
9. أضف Webhook بتوقيع صحيح، حماية من إعادة الإرسال، ومعالجة آمنة للحدث المكرر (القسمان 2، 5).
10. نفذ تحديد معدل الطلبات واختبر `429` والرؤوس المرتبطة به (القسم 7).
11. اكتب اختبارات وحدة وتكامل وAPI، وشغّلها من بيئة نظيفة مع PostgreSQL وترحيلات قاعدة البيانات (القسم 9).
12. راجع بنية المشروع: لا تُبقِ طبقة أو مكتبة لا تستطيع تبريرها، واكتب README بخطوات تشغيل قابلة لإعادة التنفيذ (القسم 8).

**المخرج:** خدمة FastAPI بمواصفات OpenAPI، مرتبطة بـ PostgreSQL، مع ترحيلات، تحقق وأخطاء متسقة، مصادقة وصلاحيات، اختبارات مفيدة، وإرشادات تشغيل واضحة. تضاف المهام الخلفية والتخزين المؤقت حين يبررهما المشروع.

**معيار الانتقال:**

- تبني خدمة CRUD منظمة من دون الاعتماد على قالب جاهز، وتشرح مسار الطلب من Router إلى منطق العمل وقاعدة البيانات.
- تميز بين نموذج الإدخال ونموذج الاستجابة ونموذج التخزين، وتتحقق من عقد الواجهة.
- تشرح أثر فقد اتصال قاعدة البيانات، انتهاء المهلة، تكرار الطلب، وفشل مهمة خلفية.
- تثبت بالاختبارات أن قواعد الصلاحية تمنع الوصول غير المصرح به.
- تختار بين التنفيذ المتزامن وغير المتزامن على أساس طبيعة I/O والتبعيات، لا على أساس أن `async` أفضل دائمًا.
- تبرر كلًا من ORM وCache وQueue والطبقات المعمارية التي أضفتها.

## مراجع التنفيذ الرسمية (Official Documentation)

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [FastAPI — Bigger Applications](https://fastapi.tiangolo.com/tutorial/bigger-applications/)
- [FastAPI — Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [FastAPI — Concurrency and async/await](https://fastapi.tiangolo.com/async/)
- [SQLAlchemy 2.x — Unified Tutorial](https://docs.sqlalchemy.org/en/20/tutorial/)
- [SQLAlchemy — Session Basics](https://docs.sqlalchemy.org/en/20/orm/session_basics.html)

---
