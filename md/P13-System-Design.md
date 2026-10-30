# المرحلة الثالثة عشرة [P13]: تصميم الأنظمة (System Design)

أنا مهندس برمجيات أهدف إلى بناء فهم هندسي متين يساعدني على تحليل المشكلات، وفهم سلوك الأنظمة، واتخاذ قرارات تقنية مبررة، وتطوير برمجيات موثوقة قابلة للاختبار والصيانة والتوسع. أفضّل استخدام **Python** و**PostgreSQL**، وأعتمد **FastAPI** في المسار التطبيقي لتطوير الخدمات الخلفية؛ لذلك تربط هذه الخطة بين الأسس النظرية والتطبيق العملي باستخدام هذه التقنيات.

**هدف المرحلة:** تصميم نظام وفق متطلباته، قيوده، فهم نقاط الفشل، تبرير الاختيارات، معرفة المفاضلات الناتجة عنها.

*مرحلة مفاهيمية: تُقرأ، تُصمَّم على الورق، ولا يلزم بناء كل نظام فيها.*

## 1. تحليل متطلبات الأنظمة (System Requirements Analysis)

- المتطلبات الوظيفية، غير الوظيفية - Functional, Non-Functional Requirements
- تقدير الطلبات، التخزين، النطاق الترددي - Traffic, Storage, Bandwidth Estimation (Back-of-the-Envelope)
- تقدير السعة، التوافر المطلوب - Capacity Planning, Availability Requirements
- قيود التكلفة - Cost Constraints

## 2. المكونات المعمارية (System Components)

- موازنات الأحمال، الوكلاء العكسيون، بوابات الواجهات - Load Balancers, Reverse Proxies, API Gateways
- التخزين المؤقت، شبكات توصيل المحتوى - Caching, Content Delivery Networks
- طوابير الرسائل، تدفق الأحداث، العاملون - Message Queues, Event Streaming, Workers
- تخزين الكائنات - Object Storage
- اكتشاف الخدمات - Service Discovery

## 3. التوسع، الأداء (Scalability, Performance)

- التوسع الرأسي، الأفقي - Vertical, Horizontal Scaling
- الخدمات عديمة الحالة - Stateless Services
- النسخ المتماثل، النسخ المخصصة للقراءة - Replication, Read Replicas
- تقسيم البيانات، التجزئة الموزعة - Partitioning, Sharding
- الأجزاء الساخنة، تحليل الاختناقات - Hot Partitions, Bottleneck Analysis

## 4. قواعد البيانات في الأنظمة الكبيرة (Databases at Scale)

- متى تكفي قاعدة بوستجريس واحدة - When a Single PostgreSQL Instance Is Enough
- تأخر النسخ، أثره على الاتساق - Replication Lag, Impact on Consistency
- نظرة على قواعد البيانات غير العلاقية: الوثائقية، المفتاح-القيمة، العمودية الواسعة، البيانية - NoSQL Overview: Document, Key-Value, Wide-Column, Graph
- نمذجة البيانات غير العلاقية - NoSQL Data Modeling
- المفاضلة بين العلاقية، غير العلاقية - SQL vs NoSQL Trade-offs

## 5. أساسيات الأنظمة الموزعة (Distributed Systems Fundamentals)

- الإخفاقات الجزئية، انقسامات الشبكة - Partial Failures, Network Partitions
- نظرية الاتساق، التوافر، تحمل الانقسام، الاتساق النهائي - CAP Theorem, Eventual Consistency
- القائد، التابع، النصاب (مفاهيم) - Leader-Follower, Quorums (Concepts)
- مشكلات الساعات، الترتيب - Clock, Ordering Problems
- دلالات التسليم: مرة على الأقل، مرة على الأكثر، مرة واحدة فعليًا - Delivery Semantics: At-Least-Once, At-Most-Once, Exactly-Once
- المعاملات الموزعة: نمط التعويض المتتابع، صندوق الصادر - Distributed Transactions: Saga, Outbox
- حل تعارضات البيانات - Conflict Resolution

## 6. الموثوقية على مستوى النظام (System-Level Reliability)

- التكرار الاحتياطي، التحويل التلقائي عند الفشل - Redundancy, Failover
- التحكم في ضغط الطلبات المرتد - Backpressure
- عزل الأعطال، الحواجز - Fault Isolation, Bulkheads
- التعافي من الكوارث - Disaster Recovery
- هدف زمن الاستعادة، هدف نقطة الاستعادة - Recovery Time Objective, Recovery Point Objective

## 7. المفاضلات المعمارية (Architectural Trade-offs)

- التطبيق المتكامل مقابل الخدمات المصغرة - Monolith vs Microservices
- الاتصال المتزامن مقابل غير المتزامن - Synchronous vs Asynchronous Communication
- التخزين المؤقت مقابل القراءة المباشرة - Caching vs Direct Reads
- الاتساق القوي مقابل الاتساق النهائي - Strong vs Eventual Consistency
- التكلفة مقابل الموثوقية، البساطة مقابل المرونة - Cost vs Reliability, Simplicity vs Flexibility

## 8. منهج التصميم (Design Method)

- توضيح المتطلبات - Clarifying Requirements
- التقدير - Estimation
- التصميم عالي المستوى - High-Level Design
- التعمق في الأجزاء الحرجة - Deep Dive into Critical Parts
- تحديد الاختناقات، المفاضلات - Bottlenecks, Trade-offs

## التدريبات العملية (Practical Exercises)

1. قدّر خدمة بعشرة ملايين مستخدم يوميًا: عدد الطلبات في الثانية وقت الذروة، التخزين السنوي، النطاق الترددي (القسم 1).
2. صمم على الورق ستة أنظمة: مختصر الروابط، محدد معدل الطلبات، نظام إشعارات، رفع الملفات، دردشة بسيطة، موجز أخبار؛ لكل نظام اكتب: المتطلبات، التقديرات، المخطط، الاختناقات، المفاضلات، ما الذي يفشل أولًا (الأقسام 1 إلى 8).
3. خذ تصميمًا متكاملًا من تصاميمك، أضف إليه مخزنًا مؤقتًا، عاملًا خلفيًا، نسخة قراءة؛ بيّن أثر كل إضافة بالأرقام (القسم 3).
4. اشرح بكلمات بسيطة سيناريو فشل لكل حالة: انقسام شبكة، رسالة مكررة، تأخر نسخ (القسم 5).
5. قارن معماريتين لنفس النظام (متكامل، خدمات مصغرة)، اكتب توصية مبررة في سجل قرار معماري (القسم 7).

**المخرج:** ثلاث وثائق تصميم كاملة، سجل قرار معماري واحد على الأقل.

**معيار الانتقال:**

- تقدر الحمل لنظام جديد بأرقام معقولة، تشرح طريقة التقدير.
- تبرر لماذا يبدأ المشروع بتطبيق متكامل، متى يُنتقل منه.
- تشرح نقاط الفشل في تصميمك، ماذا يحدث عند كل منها.
- تقول متى لا يحتاج النظام إلى أي مكون من هذه المكونات.

---
