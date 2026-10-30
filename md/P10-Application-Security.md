# المرحلة العاشرة [P10]: أمن التطبيقات (Application Security)

أنا مهندس برمجيات أهدف إلى بناء فهم هندسي متين يساعدني على تحليل المشكلات، وفهم سلوك الأنظمة، واتخاذ قرارات تقنية مبررة، وتطوير برمجيات موثوقة قابلة للاختبار والصيانة والتوسع. أفضّل استخدام **Python** و**PostgreSQL**، وأعتمد **FastAPI** في المسار التطبيقي لتطوير الخدمات الخلفية؛ لذلك تربط هذه الخطة بين الأسس النظرية والتطبيق العملي باستخدام هذه التقنيات.

**هدف المرحلة:** بناء خدمات تفترض أن المدخلات عدائية، تحمي الهوية، البيانات، التبعيات.

## 1. أساسيات الأمن (Security Fundamentals)

- السرية، السلامة، التوافر - Confidentiality, Integrity, Availability
- نمذجة التهديدات، سطح الهجوم - Threat Modeling, Attack Surface
- أقل صلاحية، الدفاع متعدد الطبقات، الإعدادات الآمنة الافتراضية - Least Privilege, Defense in Depth, Secure Defaults

## 2. الهوية، الصلاحيات (Identity, Access Control)

- المصادقة، التفويض - Authentication, Authorization
- الجلسات، ملفات الارتباط الآمنة - Sessions, Secure Cookies
- الرموز، رموز التحديث - Tokens, Refresh Tokens (JWT)
- بروتوكول التفويض، طبقة الهوية (مفاهيم) - OAuth 2.0, OpenID Connect (Concepts)
- التحكم في الوصول بالأدوار، بالسمات - Role-Based, Attribute-Based Access Control
- المصادقة متعددة العوامل - Multi-Factor Authentication

## 3. ثغرات تطبيقات الويب (Web Application Vulnerabilities)

- قائمة المخاطر العشرة الأولى - OWASP Top 10
- حقن SQL، حقن الأوامر - SQL Injection, Command Injection
- البرمجة النصية عبر المواقع، تزوير الطلبات عبر المواقع - Cross-Site Scripting, Cross-Site Request Forgery
- ضعف التحكم في الوصول، الوصول المباشر غير المحمي للكائنات - Broken Access Control, IDOR
- تزوير الطلبات من جهة الخادم - Server-Side Request Forgery
- رفع الملفات الخطر، التسلسل العكسي غير الآمن - Unsafe File Upload, Insecure Deserialization
- الإعدادات الخاطئة، كشف المعلومات - Misconfiguration, Information Disclosure

## 4. حماية البيانات (Data Protection)

- التشفير أثناء النقل، أثناء التخزين - Encryption in Transit, at Rest
- التجزئة، التمليح، تخزين كلمات المرور - Hashing, Salting, Password Storage (Argon2, bcrypt)
- التشفير المتماثل، غير المتماثل، التوقيع - Symmetric, Asymmetric Encryption, Signatures
- إدارة المفاتيح، الأسرار - Key Management, Secrets Management
- تقليل جمع البيانات، الخصوصية - Data Minimization, Privacy Fundamentals

## 5. سلسلة التوريد، المسؤولية المهنية (Supply Chain, Professional Responsibility)

- مخاطر التبعيات، فحص الثغرات - Dependency Vulnerabilities, Scanning
- ملفات القفل، التحقق من الحزم - Lock Files, Package Verification
- تراخيص المصدر المفتوح - Open-Source Licenses
- الإفصاح المسؤول عن الثغرات - Responsible Disclosure
- السجلات الأمنية، عدم تسجيل الأسرار - Security Logging, Never Logging Secrets

## التدريبات العملية (Practical Exercises)

1. أنشئ تطبيقًا صغيرًا ضعيفًا عمدًا (حقن SQL، برمجة نصية عبر المواقع، وصول مباشر لكائن غيرك)، استغل كل ثغرة محليًا، ثم أصلحها، اكتب اختبارًا يمنع عودتها (القسم 3).
2. نفذ تخزين كلمات المرور الصحيح: تجزئة بخوارزمية مخصصة مع تمليح؛ قارنه بتجزئة ساذجة؛ اشرح الفرق (القسم 4).
3. حلل رمزًا موقعًا: فك ترميزه يدويًا، تحقق من توقيعه، اشرح لماذا لا يُخزَّن فيه سر (القسم 2).
4. اكتب نموذج تهديدات في صفحة واحدة لتطبيقك: المكونات، حدود الثقة، التهديدات، الإجراءات المضادة (القسم 1).
5. افحص تبعيات مشروعك بأداة فحص، قيّم النتائج، حدّث ما يلزم، ابحث في تاريخ المستودع عن أسرار مسربة (القسم 5).
6. أضف رؤوس الأمان لتطبيقك، تحقق منها بأداة فحص خارجية (القسم 3، المرحلة السادسة).

**المخرج:** وثيقة نموذج تهديدات، قائمة تحقق أمنية لمشروع خلفي، تطبيق ضعيف مصلَح باختبارات.

**معيار الانتقال:**

- تشرح كل ثغرة في القائمة بمثال، تذكر طريقة منعها.
- تعرف لماذا لا يكفي التحقق من الواجهة الأمامية.
- تخزن كلمات المرور، الأسرار بطريقة صحيحة دون مراجعة.
- تفرق بين المصادقة، التفويض في تصميم أي مسار.

---
