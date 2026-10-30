# المرحلة الثامنة [P08]: هندسة البرمجيات، تصميم الكود (Software Engineering, Code Design)

أنا مهندس برمجيات أهدف إلى بناء فهم هندسي متين يساعدني على تحليل المشكلات، وفهم سلوك الأنظمة، واتخاذ قرارات تقنية مبررة، وتطوير برمجيات موثوقة قابلة للاختبار والصيانة والتوسع. أفضّل استخدام **Python** و**PostgreSQL**، وأعتمد **FastAPI** في المسار التطبيقي لتطوير الخدمات الخلفية؛ لذلك تربط هذه الخطة بين الأسس النظرية والتطبيق العملي باستخدام هذه التقنيات.

**هدف المرحلة:** تصميم كود واضح المسؤوليات، بناء وحدات قابلة للاختبار، إدارة التعقيد، تبرير القرارات المعمارية دون إفراط في التجريد.

## 1. المتطلبات، التحليل (Requirements, Analysis)

- المتطلبات الوظيفية، غير الوظيفية - Functional, Non-Functional Requirements
- قصص المستخدم، معايير القبول، حالات الاستخدام - User Stories, Acceptance Criteria, Use Cases
- الحالات الاستثنائية، القيود، المخاطر - Edge Cases, Constraints, Risks
- ترتيب الأولويات - Prioritization

## 2. مبادئ التصميم (Design Principles)

- فصل المسؤوليات، التغليف، التجريد - Separation of Concerns, Encapsulation, Abstraction
- الترابط الداخلي العالي، الاقتران المنخفض - High Cohesion, Low Coupling
- التركيب بدلًا من الوراثة - Composition Over Inheritance
- المسؤولية الواحدة - Single Responsibility
- الانفتاح للتمديد، الإغلاق للتعديل - Open/Closed Principle
- إحلال ليسكوف - Liskov Substitution
- فصل الواجهات - Interface Segregation
- عكس الاعتماديات - Dependency Inversion
- عدم تكرار المعرفة، البساطة، عدم البناء قبل الحاجة - DRY, KISS, YAGNI

## 3. أنماط التصميم المختارة (Selected Design Patterns)

- المصنع، البناء - Factory Method, Builder
- المحول، الواجهة المبسطة، المزخرف - Adapter, Facade, Decorator
- الاستراتيجية، المراقب، الأمر، الحالة - Strategy, Observer, Command, State
- المستودع - Repository
- حقن الاعتماديات - Dependency Injection
- *للقراءة عند الحاجة:* المصنع المجرد، الوكيل، التركيب، الطريقة القالبية، سلسلة المسؤولية، الكائن ذو النسخة الواحدة (احذر الإفراط في استخدامه) - Abstract Factory, Proxy, Composite, Template Method, Chain of Responsibility, Singleton

## 4. تصميم الواجهات الداخلية (Interface Design)

- العقود: الشروط المسبقة، اللاحقة - Contracts: Preconditions, Postconditions
- التحقق من المدخلات - Input Validation
- نمذجة الأخطاء: الاستثناءات مقابل نتائج الفشل - Error Modeling: Exceptions vs Result Types
- التوافق مع الإصدارات السابقة، الإهمال التدريجي - Backward Compatibility, Deprecation

## 5. المعمارية (Software Architecture)

- المعمارية الطبقية - Layered Architecture
- التطبيق المتكامل المعياري - Modular Monolith
- المنافذ، المهايئات: السداسية، النظيفة - Ports, Adapters: Hexagonal, Clean Architecture
- إدارة الاعتماديات، الحدود المعمارية - Dependency Management, Architectural Boundaries
- المعمارية الموجهة بالأحداث (نظرة) - Event-Driven Architecture (Overview)

## 6. نمذجة المجال (Domain Modeling)

- الكيانات، كائنات القيمة - Entities, Value Objects
- قواعد العمل، الثوابت المنطقية - Business Rules, Invariants
- خدمات المجال - Domain Services
- مدخل إلى التصميم الموجه بالمجال - Introduction to Domain-Driven Design

## 7. صيانة البرمجيات (Software Maintenance)

- قراءة الكود الموجود، تتبع مسار التنفيذ - Reading Existing Code, Execution Path Tracing
- إعادة الهيكلة، روائح الكود - Refactoring, Code Smells
- الدين التقني - Technical Debt
- التعديل الآمن، اختبارات التوصيف - Safe Changes, Characterization Tests

## 8. التواصل، التوثيق الهندسي (Engineering Communication, Documentation)

- ملفات README - README Files
- وثائق التصميم، سجلات القرارات المعمارية - Design Documents, Architecture Decision Records
- كتابة طلبات الدمج، مراجعة الكود - Pull Request Writing, Code Review
- المخططات المعمارية - Architecture Diagrams
- تقديم الملاحظات، تلقيها - Giving, Receiving Feedback
- التسليم التدريجي، تقدير المخاطر - Incremental Delivery, Risk Assessment

## التدريبات العملية (Practical Exercises)

1. اكتب متطلبات، قصص مستخدم، معايير قبول لنظام صغير (حجز قاعات)، ثم قائمة بالحالات الاستثنائية (القسم 1).
2. خذ سكربتًا متشابكًا من نحو 200 سطر، أعد هيكلته: افصل المسؤوليات، طبق مبدأين من المبادئ الخمسة، اشرح الفرق قبل التعديل، بعده (القسمان 2، 7).
3. نفذ ثلاثة أنماط في مشكلة حقيقية: الاستراتيجية لطرق الدفع، المحول لخدمة خارجية، المراقب للإشعارات؛ ثم اكتب لكل نمط: ما المشكلة، هل كان الحل أبسط بدونه (القسم 3).
4. نمذج مجال متجر: كيانات، كائنات قيمة، ثوابت منطقية (مثل: الكمية موجبة، المجموع لا يتجاوز الحد)؛ ونفذه دون قاعدة بيانات بمستودع في الذاكرة (القسمان 5، 6).
5. اقرأ مشروعًا صغيرًا مفتوح المصدر: ارسم مخطط وحداته، تتبع طلبًا واحدًا من أوله إلى آخره، اكتب ملخصًا لبنيته (القسم 7).
6. اكتب سجل قرار معماري (مثل: ORM مقابل SQL مباشر)، وثيقة تصميم من صفحتين، طلب دمج بوصف جيد (القسم 8).

**المخرج:** مشروع نمذجة مجال قابل للاختبار دون قاعدة بيانات، مع وثيقة تصميم، سجل قرار معماري واحد على الأقل.

**معيار الانتقال:**

- تشرح لماذا اخترت نمطًا ما، متى كان تركه أفضل.
- تعدل كودًا لم تكتبه دون كسر سلوكه.
- تفصل منطق العمل عن قاعدة البيانات، عن نقل البيانات.
- تكتب قرارًا معماريًا قابلًا للمراجعة.

---
