# المرحلة السادسة [P06]: الشبكات، الويب، بروتوكول نقل النص التشعبي (Networking, Web, HTTP)

أنا مهندس برمجيات أهدف إلى بناء فهم هندسي متين يساعدني على تحليل المشكلات، وفهم سلوك الأنظمة، واتخاذ قرارات تقنية مبررة، وتطوير برمجيات موثوقة قابلة للاختبار والصيانة والتوسع. أفضّل استخدام **Python** و**PostgreSQL**، وأعتمد **FastAPI** في المسار التطبيقي لتطوير الخدمات الخلفية؛ لذلك تربط هذه الخطة بين الأسس النظرية والتطبيق العملي باستخدام هذه التقنيات.

**هدف المرحلة:** فهم رحلة الطلب كاملة من العميل إلى الخادم، قراءة الرسائل بعينك، التمييز بين أخطاء الشبكة، التطبيق، قاعدة البيانات، تصميم واجهات REST سليمة.

## 1. أساسيات الشبكات (Networking Fundamentals)

- نماذج الشبكات - Network Models (OSI, TCP/IP)
- الحزم، التغليف - Packets, Encapsulation
- عناوين الشبكة، الشبكات الفرعية - IP Addresses (IPv4, IPv6), Subnets
- التوجيه، البوابات - Routing, Gateways
- المنافذ - Ports
- ترجمة العناوين، جدران الحماية - Network Address Translation, Firewalls
- العناوين الخاصة، العامة، المضيف المحلي - Private, Public Addresses, Localhost
- زمن الاستجابة، عرض النطاق، فقدان الحزم - Latency, Bandwidth, Packet Loss

## 2. نظام أسماء النطاقات (Domain Name System)

- بنية الاسم، التسلسل الهرمي - Name Structure, Hierarchy
- أنواع السجلات - Record Types (A, AAAA, CNAME, MX, TXT)
- رحلة حل الاسم - Resolution Path (Resolver, Root, Authoritative)
- التخزين المؤقت، مدة الصلاحية - Caching, Time To Live
- بروتوكولات الدعم: التهيئة الديناميكية، تحليل العناوين (نظرة سريعة) - Supporting Protocols: DHCP, ARP (Overview)

## 3. طبقة النقل (Transport Layer)

- بروتوكول التحكم بالنقل: المصافحة، الاعتمادية، التحكم بالتدفق، الازدحام - TCP: Handshake, Reliability, Flow Control, Congestion Control
- بروتوكول حزم المستخدم - UDP
- المقابس - Sockets
- حالات الاتصال، إغلاقه - Connection States, Teardown
- الاتصالات الدائمة، تجميع الاتصالات - Persistent Connections, Connection Pooling
- المهلات - Timeouts

## 4. رسائل بروتوكول نقل النص التشعبي (HTTP Messages)

- نموذج العميل، الخادم، الطلب، الاستجابة - Client-Server, Request-Response Model
- تشريح عنوان الموارد: المخطط، المضيف، المنفذ، المسار، الاستعلام، الجزء - URL Anatomy
- سطر الطلب، سطر الحالة - Request Line, Status Line
- الرؤوس: بنيتها، أنواعها - Headers: Structure, Types
- جسم الرسالة، نهايتها - Message Body, Message Framing
- الطرق: الجلب، الإرسال، الاستبدال، التعديل، الحذف، الرأس، الخيارات - Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
- الطرق الآمنة، قابلة التكرار - Safe, Idempotent Methods
- رموز الحالة: المعلوماتية، الناجحة، إعادة التوجيه، أخطاء العميل، أخطاء الخادم - Status Codes: 1xx, 2xx, 3xx, 4xx, 5xx
- الإصدارات: الفروق المفاهيمية - Versions: HTTP/1.1, HTTP/2, HTTP/3
- المواصفات الرسمية - Official Specifications (RFC 9110)

## 5. الرؤوس، المحتوى (Headers, Content)

- نوع المحتوى، الطول، الترميز - Content-Type, Content-Length, Content-Encoding
- مفاوضة المحتوى - Content Negotiation (Accept, Accept-Language, Accept-Encoding)
- النقل المجزأ، البث - Chunked Transfer, Streaming
- الضغط - Compression
- رفع الملفات، النماذج متعددة الأجزاء - File Upload, multipart/form-data
- صيغ جسم الطلب: النماذج، البيانات المهيكلة، النصوص - Body Formats: Form-Encoded, JSON, XML, Plain Text
- ترميز الأحرف - Character Encoding (charset)
- الطلبات الشرطية، طلبات النطاق - Conditional Requests, Range Requests
- إعادة التوجيه - Redirects (301, 302, 307, 308)
- ملفات تعريف الارتباط، سماتها - Cookies, Attributes (SameSite, Secure, HttpOnly)
- رؤوس التوثيق - Authentication Headers (Authorization, WWW-Authenticate)
- رؤوس التخزين المؤقت - Caching Headers (Cache-Control, ETag, Last-Modified, Vary)
- مشاركة الموارد عبر الأصول - Cross-Origin Resource Sharing (Origin, Access-Control)
- رؤوس الأمان - Security Headers (HSTS, CSP, X-Content-Type-Options)
- رؤوس الوكلاء، التتبع - Proxy, Tracing Headers (Forwarded, X-Forwarded-For, Host, Request ID)
- الرؤوس المخصصة، قواعد التسمية - Custom Headers, Naming Rules

## 6. الأمان في النقل (Transport Security)

- أمان طبقة النقل، المصافحة - Transport Layer Security, Handshake
- الشهادات، سلسلة الثقة - Certificates, Chain of Trust
- النسخة الآمنة من البروتوكول، فرض الاتصال الآمن - HTTPS, HSTS
- أخطاء الشهادات الشائعة - Common Certificate Errors

## 7. أنماط الاتصال الأخرى (Other Communication Styles)

- المقبس الويبي، الأحداث المرسلة من الخادم - WebSocket, Server-Sent Events
- الاستطلاع الطويل - Long Polling
- الخطافات - Webhooks
- نظرة على بروتوكولي gRPC، GraphQL - Overview of gRPC, GraphQL
- صيغ التسلسل - Serialization Formats (JSON, Protocol Buffers)

## 8. تصميم واجهات REST (REST API Design)

- مبادئ REST: الموارد، التمثيلات، عدم حفظ الحالة - REST Principles: Resources, Representations, Statelessness
- تسمية الموارد، تصميم المسارات - Resource Naming, URI Design
- ربط الطرق بالعمليات، رموز الحالة الصحيحة - Method Mapping, Correct Status Codes
- نمذجة الأخطاء بصيغة موحدة - Error Modeling (Problem Details)
- الترقيم الصفحي، التصفية، الترتيب، البحث - Pagination, Filtering, Sorting, Search
- إصدار الواجهات، التوافق مع الإصدارات السابقة - Versioning, Backward Compatibility
- قابلية تكرار الطلب، مفاتيح التكرار - Idempotency, Idempotency Keys
- العمليات الطويلة - Long-Running Operations (202 Accepted, Polling)
- تحديد معدل الطلبات - Rate Limiting (429, Retry-After)
- التحكم المتفائل بالتزامن - Optimistic Concurrency (ETag, If-Match)
- الروابط، الوسائط الفائقة (نظرة) - Hypermedia, HATEOAS (Overview)
- التوثيق - API Documentation (OpenAPI)
- نموذج النضج - Richardson Maturity Model

## 9. مسار الطلب في الإنتاج (Request Path in Production)

- الوكيل، الوكيل العكسي - Proxy, Reverse Proxy
- موازن الأحمال - Load Balancer
- بوابة الواجهات - API Gateway
- شبكة توصيل المحتوى - Content Delivery Network
- رحلة طلب كاملة - End-to-End Request Journey

## 10. أدوات التشخيص (Diagnostic Tools)

- أدوات الطلب من الطرفية، أدوات المتصفح - Command-Line Clients (curl), Browser DevTools
- أدوات الاتصال: الفحص، تتبع المسار، الاستعلام عن الأسماء - ping, traceroute, dig
- فحص المقابس، المنافذ المفتوحة - Sockets, Open Ports (ss, lsof)
- التقاط الحزم (مقدمة) - Packet Capture (tcpdump, Wireshark)
- فحص الشهادات من الطرفية - Certificate Inspection (openssl s\_client)
- التمييز بين أخطاء الشبكة، التطبيق، قاعدة البيانات - Distinguishing Network, Application, Database Errors

## التدريبات العملية (Practical Exercises)

1. اكتب خادم صدى بالمقابس (TCP Echo Server) مع عميل، ثم خادم HTTP بدائي يقرأ الطلب يدويًا ويعيد استجابة JSON، دون أي إطار عمل (القسمان 3، 4).
2. استخدم أداة الطلب من الطرفية على واجهة تجريبية عامة: أرسل الجلب، الإرسال، الاستبدال، الحذف، اقرأ كل رأس، فسر كل رمز حالة، احذف رأسًا وراقب النتيجة (القسمان 4، 5).
3. اتبع رحلة طلب لموقع حقيقي: الاستعلام عن الاسم، اتصال TCP، مصافحة TLS، ثم الطلب؛ وثق كل خطوة، زمنها (الأقسام 1 إلى 6).
4. جرب التخزين المؤقت: قدّم ملفًا برأس ETag، تحقق من استجابة 304، غيّر Cache-Control، سجل الفروق (القسم 5).
5. أنتج خطأ CORS: صفحة من أصل مختلف تستدعي واجهتك، افهم سبب الفشل، ثم صحح الرؤوس (القسم 5).
6. صمم واجهة REST لنظام مكتبة على الورق بصيغة OpenAPI قبل أي كود: موارد، مسارات، أخطاء، ترقيم، إصدار؛ ثم راجعها بقائمة الأخطاء الشائعة (أفعال داخل المسار، رمز 200 مع خطأ في الجسم) (القسم 8).
7. أحدث أربعة أعطال عمدًا: اسم نطاق خاطئ، منفذ مغلق، شهادة منتهية، مهلة؛ سجل أعراض كل منها في جدول (القسم 10).
8. قارن تحميل 50 مورد صغير عبر HTTP/1.1، HTTP/2 وسجل الفرق (القسم 4).

**المخرج:** ملف OpenAPI كامل لواجهة، خادم HTTP بدائي يعمل، دفتر رحلة طلب موثق، جدول أعراض الأعطال.

**معيار الانتقال:**

- تشرح بالترتيب ما يحدث منذ كتابة العنوان في المتصفح حتى ظهور الصفحة.
- تقرأ رسالة HTTP خام، تذكر دور كل رأس فيها.
- تفرق بين 401، 403، 404، 409، 422، 429، 502، 503، 504 بدقة.
- تراجع تصميم واجهة REST، تحدد عيوبه.

---
