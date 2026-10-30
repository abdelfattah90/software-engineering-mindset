# المرحلة الثالثة [P03]: قواعد البيانات العلاقية (Relational Databases, SQL, PostgreSQL)

أنا مهندس برمجيات أهدف إلى بناء فهم هندسي متين يساعدني على تحليل المشكلات، وفهم سلوك الأنظمة، واتخاذ قرارات تقنية مبررة، وتطوير برمجيات موثوقة قابلة للاختبار والصيانة والتوسع. أفضّل استخدام **Python** و**PostgreSQL**، وأعتمد **FastAPI** في المسار التطبيقي لتطوير الخدمات الخلفية؛ لذلك تربط هذه الخطة بين الأسس النظرية والتطبيق العملي باستخدام هذه التقنيات.

**هدف المرحلة:** تصميم قاعدة بيانات علاقية سليمة، كتابة الاستعلامات بكفاءة، فهم المعاملات، العزل، الفهارس، تشخيص الاستعلامات البطيئة، إدارة النسخ الاحتياطي.

## 1. أساسيات النموذج العلاقي (Relational Model Fundamentals)

- الجداول، الصفوف، الأعمدة - Tables, Rows, Columns
- المفاتيح الأساسية، الخارجية، المرشحة - Primary Keys, Foreign Keys, Candidate Keys
- القيود، سلامة البيانات - Constraints, Data Integrity
- العلاقات: واحد لواحد، واحد لمتعدد، متعدد لمتعدد - Relationships: One-to-One, One-to-Many, Many-to-Many
- المخططات - Schemas
- التثبيت، الاتصال، سطر الأوامر - Installation, Connection, Command Line (psql)

*الأساس النظري: المنطق، المجموعات، العلاقات من المرحلة الأولى.*

## 2. لغة الاستعلام (SQL Queries)

- الاستعلام، التصفية، الترتيب، الحد - SELECT, WHERE, ORDER BY, LIMIT
- الإضافة، التحديث، الحذف - INSERT, UPDATE, DELETE
- الإضافة أو التحديث، الإرجاع من الكتابة - Upsert (ON CONFLICT), RETURNING
- التجميع، التصفية بعد التجميع - GROUP BY, HAVING
- الدوال التجميعية - Aggregate Functions
- أنواع الربط - JOIN Types
- الاستعلامات الفرعية، التعبيرات الجدولية الشائعة - Subqueries, Common Table Expressions
- الدوال النافذية - Window Functions
- عمليات المجموعات - Set Operations (UNION, INTERSECT, EXCEPT)
- دلالات القيم الفارغة - NULL Semantics
- التعبيرات الشرطية - Conditional Expressions (CASE)
- النصوص، التواريخ، المناطق الزمنية - Text, Dates, Time Zones
- بيانات JSON داخل القاعدة - JSON, JSONB Data
- الترقيم الصفحي بالإزاحة، بالمؤشر - Offset, Keyset Pagination

## 3. تصميم قواعد البيانات (Database Design)

- نمذجة الكيانات، العلاقات - Entity-Relationship Modeling
- التطبيع، الأشكال الطبيعية، إلغاء التطبيع - Normalization, Normal Forms, Denormalization
- أنواع البيانات في بوستجريس، الأعداد الدقيقة للمال - PostgreSQL Data Types, Numeric for Money
- القيود: الفريدة، الشرطية، المرجعية، المؤجلة - Unique, Check, Referential, Deferred Constraints
- أعمدة الهوية، المعرفات الفريدة عالميًا - Identity Columns, UUID
- العروض - Views
- ترحيل المخططات - Schema Migrations
- التغيير الآمن للمخطط - Safe Schema Changes
- الحذف المنطقي، سجلات التدقيق - Soft Delete, Audit Trails

## 4. المعاملات، الاتساق (Transactions, Consistency)

- المعاملات، التراجع، الاعتماد - Transactions, Rollback, Commit
- خصائص ACID - ACID Properties
- مستويات العزل، الظواهر الشاذة - Isolation Levels, Anomalies
- التحكم بالتزامن متعدد الإصدارات - Multi-Version Concurrency Control
- الأقفال، قفل الصفوف - Locks, Row Locking (SELECT FOR UPDATE)
- حالات الجمود - Deadlocks
- التحكم المتفائل، المتشائم - Optimistic, Pessimistic Concurrency

## 5. الفهارس، تحسين الاستعلامات (Indexes, Query Optimization)

- الفهارس، أشجار B - Indexes, B-Trees
- الفهارس متعددة الأعمدة، الجزئية، التعبيرية - Multicolumn, Partial, Expression Indexes
- فهارس البحث النصي، فهارس أخرى - Full-Text Search Indexes, Other Index Types
- خطط التنفيذ - Query Execution Plans (EXPLAIN, EXPLAIN ANALYZE)
- المسح التسلسلي مقابل استخدام الفهرس - Sequential Scan vs Index Scan
- إحصاءات المخطط - Planner Statistics
- تحليل الاستعلامات البطيئة - Slow Query Analysis

## 6. التشغيل، الإدارة (Administration, Operations)

- الإعدادات الأساسية، إدارة الاتصالات، تجميعها - Basic Configuration, Connection Management, Pooling
- الصيانة الدورية - Routine Maintenance (VACUUM, ANALYZE)
- النسخ الاحتياطي، الاستعادة - Backup, Restore
- مراقبة الاستعلامات، الأقفال - Query, Lock Monitoring
- الأدوار، الصلاحيات - Roles, Privileges
- النسخ المتماثل (مفهوم) - Replication (Concept)
- *اختياري:* سجل الكتابة المسبق، نقاط التحقق، الاستعادة إلى نقطة زمنية - Write-Ahead Logging, Checkpoints, Point-in-Time Recovery

## التدريبات العملية (Practical Exercises)

1. ثبّت بوستجريس (محليًا أو في حاوية)، حمّل قاعدة بيانات تدريب جاهزة (متجر، تأجير أفلام)، نفذ 40 استعلامًا متدرجًا (القسمان 1، 2).
2. صمم مخطط نظام حجز أو طلبات: رسم الكيانات، العلاقات، 6 إلى 8 جداول، تطبيع حتى الشكل الطبيعي الثالث، قيود كاملة (القسم 3).
3. اكتب استعلامات تقارير: أعلى 5 عملاء، إيراد شهري تراكمي (دالة نافذية)، أول طلب لكل عميل (تعبير جدولي)، عملاء بلا طلبات (القسم 2).
4. نفذ ترحيلات مخطط كملفات SQL مرقمة تضيف ميزة جديدة دون فقد بيانات (القسم 3).
5. اكتب معاملة تحويل رصيد بين حسابين، شغّل جلستين متزامنتين، أنتج قراءة غير متكررة، ثم جمودًا، ثم عالجهما (القسم 4).
6. أنشئ مليون صف عشوائي، قس استعلامًا قبل الفهرس، بعده، جرب فهرسًا متعدد الأعمدة، فهرسًا جزئيًا، فسّر كل خطة (القسم 5).
7. خذ نسخة احتياطية، احذف جدولًا عمدًا، استعده منها، وثق الخطوات بدقة (القسم 6).

**المخرج:** مشروع قاعدة بيانات: ملفات SQL (مخطط، ترحيلات، بيانات تجريبية، استعلامات)، تقرير تحسين استعلامين بخطط قبل وبعد، نسخة احتياطية مجربة الاستعادة.

**معيار الانتقال:**

- تصمم مخططًا لنظام جديد، تبرر كل جدول، قيد، فهرس.
- تشرح لماذا لا يكفي الاستعلام الصحيح دون معاملة في عملية متعددة الخطوات.
- تقرأ خطة تنفيذ، تحدد سبب البطء.
- تعرف ما يحدث عند حذف عمود أثناء تشغيل التطبيق.

---
