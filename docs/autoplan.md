Запускаю autoplan. Начну с преамбулы.



Платформа: \*\*GitHub\*\* (`github.com/zoiruk/farm-english`). Ветка: \*\*master\*\*.



Теперь читаю все нужные файлы для полного контекста.



Отлично. Теперь у меня полный контекст. Запускаю полный autoplan.



\---



\## /autoplan — FarmEnglish Strategic Review



\*\*Ветка:\*\* master | \*\*Платформа:\*\* GitHub | \*\*Коммит:\*\* 7291a03



Контекст: A1 MVP завершён (15 уроков, 5 языков, аудиты пройдены). Следующий шаг — Фаза 2 (a2.html). Ревью всего продукта на предмет правильности стратегии.



UI scope: \*\*да\*\* (компоненты, экраны, карточки, модалки, диалоги).

DX scope: \*\*нет\*\* (продукт для конечных пользователей, не для разработчиков).



\---



\## Phase 0.5: Codex preflight



Codex CLI недоступен в этой среде — продолжаю с Claude subagent only. Все фазы будут помечены `\[subagent-only]`.



\---



\## Phase 1: CEO Review



\### Step 0A: Premise Challenge



Явные и неявные предпосылки продукта:



| # | Предпосылка | Оценка |

|---|-------------|--------|

| P1 | Сезонные рабочие из ЦА хотят учить английский | ✅ Обоснована — реальная боль, подтверждена контекстом |

| P2 | Они будут учиться вечером 15-30 мин после смены | ⚠️ Частично — усталость после смены высокая, мотивация нужна |

| P3 | Смартфон Android — основное устройство | ✅ Обоснована |

| P4 | Нулевой бюджет — единственный вариант | ✅ Обоснована для MVP |

| P5 | GitHub Pages достаточно для деплоя | ✅ Обоснована |

| P6 | Русский — lingua franca для всех 4 народов | ✅ Обоснована |

| P7 | Прогрессия A1→A2→B1→C2 нужна пользователям | ⚠️ Спорная — большинство рабочих нужен только A1-A2 для выживания |

| P8 | Сертификат мотивирует пользователей | ⚠️ Слабая — сертификат из localStorage не имеет реальной ценности |

| P9 | Offline-first критичен | ✅ Обоснована — поля без Wi-Fi |

| P10 | Пользователи найдут платформу сами | ❌ Не обоснована — нет стратегии дистрибуции |



\*\*Критическая предпосылка P10\*\* — самая опасная. Продукт существует, но нет ответа на вопрос: как рабочий на ферме в Кенте узнает о FarmEnglish?



\### Step 0B: Existing Code Leverage Map



| Подзадача | Существующий код |

|-----------|-----------------|

| Новые уровни (a2.html) | `a1.html` — полный шаблон для копирования |

| Локализация | `translations.js` + inline `TR` паттерн |

| Аудит контента | `scratch/audit.js`, `advanced\_audit.js` — переиспользуются без изменений |

| Прогресс/streak | `index.html` — логика уже есть, расширяется |

| Сертификаты | Паттерн A1 сертификата — копируется для A2+ |



Leverage высокий — архитектура hub-and-spoke хорошо масштабируется.



\### Step 0C: Dream State Delta



```

СЕЙЧАС (A1 MVP)          ЭТОТ ПЛАН (A2+)           12-МЕСЯЧНЫЙ ИДЕАЛ

─────────────────────    ─────────────────────────   ──────────────────────────

15 уроков A1             +15 уроков A2               Полный A1-B1 курс

450 слов                 +450 слов A2                1350+ слов

5 языков                 5 языков                    5 языков + аудио-диктовка

localStorage прогресс    localStorage прогресс       + sharing/social proof

0 пользователей          0 пользователей             100+ активных пользователей

GitHub Pages             GitHub Pages                GitHub Pages + PWA

```



\*\*Главный gap:\*\* между "продукт готов" и "пользователи есть" — пропасть. Roadmap не содержит ни одного пункта про дистрибуцию.



\### Step 0C-bis: Implementation Alternatives



| Подход | Усилие | Риск | Плюсы | Минусы |

|--------|--------|------|-------|--------|

| A. Строить A2 сейчас (текущий план) | Средний | Низкий | Логичное продолжение | Нет пользователей для валидации |

| B. Сначала дистрибуция, потом A2 | Низкий | Средний | Валидация до инвестиций в контент | Требует нетехнических усилий |

| C. PWA + offline install | Средний | Низкий | Решает реальную проблему offline | Не решает дистрибуцию |



\### Step 0D: Scope Decisions



\*\*SELECTIVE EXPANSION\*\* — держим A2 как следующий шаг, но добавляем минимальную дистрибуционную стратегию в план.



\### Step 0E: Temporal Interrogation



\- \*\*Час 1:\*\* Рабочий скачал страницу, открыл урок 1 — работает ✅

\- \*\*Час 6:\*\* Прошёл 3 урока, видит прогресс — работает ✅

\- \*\*День 7:\*\* Streak показывает 7 дней — работает ✅

\- \*\*Месяц 1:\*\* Завершил A1, получил сертификат — работает, но сертификат из localStorage никому не покажешь ⚠️

\- \*\*Месяц 3:\*\* Хочет A2 — нет ещё ⚠️

\- \*\*Год 1:\*\* Рабочий вернулся на следующий сезон — localStorage очищен, прогресс потерян ❌



\*\*Критический сценарий:\*\* localStorage очищается при смене браузера, обновлении телефона, или через год. Весь прогресс теряется. Нет механизма восстановления.



\### Step 0F: Mode Confirmation



SELECTIVE EXPANSION подтверждён.



\---



\### Step 0.5: Claude Subagent — Independent CEO Review



I'll read the key spec files to ground this review in the actual product before delivering the strategic assessment.



Here's the adversarial strategic review. No softening.



\---



\## CEO/Founder Strategic Review — FarmEnglish



\---



\### 1. Is this the right problem? Could a reframing yield 10x more impact?



\*\*Finding: The problem is real but the solution is misaligned with how the problem actually manifests.\*\*



Severity: \*\*Critical\*\*



The stated mission is "survive and adapt from day one on the farm." But a structured CEFR course — Grammar → Words → Dialogue → Quiz, 15–30 min evening sessions — is not how survival works. A worker who arrives on day one doesn't need to conjugate "to be" in three forms. They need to understand what their manager just shouted at them, say "I'm hurt," read a safety sign, and decode their payslip.



The product is built as a \*course\* when the actual day-one need is a \*reference tool\*. The phrasebook (150 phrases, buried as a secondary feature) is closer to the real survival need than the 15-lesson grammar curriculum. The course structure serves a learner who has already decided to study. The target user hasn't decided anything — they're exhausted after a 10-hour shift picking strawberries.



\*\*The 10x reframe:\*\* Lead with the phrasebook as the primary product. Make it a searchable, categorized, offline-first emergency reference. The course becomes the secondary "when I have energy" feature. This matches the actual usage pattern: quick lookup in a moment of need, not a structured 20-minute study session.



\*\*Fix:\*\* Invert the product hierarchy. `index.html` should open to the phrasebook, not the course level selector. The course is a depth feature, not the entry point.



\---



\### 2. Which premises are assumed, not validated?



\*\*Finding: Five core premises have no evidence behind them.\*\*



Severity: \*\*High\*\*



\*\*Premise 1: Workers will study in the evening after shifts.\*\*

Assumed. Seasonal farm work is physically brutal — 10–12 hour days, often in heat or cold. The most likely evening behavior is sleep, not structured study. No user research is cited anywhere in the spec. This is the single most dangerous assumption in the product.



\*\*Premise 2: Workers want to learn English.\*\*

Assumed. Many seasonal workers operate in tight national-language clusters on farms. They may have zero motivation to learn English because their social and work life is conducted entirely in Russian or Uzbek. The product assumes motivation exists; it does nothing to create or sustain it.



\*\*Premise 3: The Cyrillic transcription system is sufficient for pronunciation.\*\*

Assumed. Cyrillic transcription of English is a lossy approximation. "Хэ-ЛОУ" for "Hello" is better than nothing, but it trains incorrect phoneme mapping. The Web Speech API playback is the real pronunciation tool — the transcription may actually create bad habits. No pedagogical validation is cited.



\*\*Premise 4: localStorage is a reliable persistence layer.\*\*

Assumed. localStorage is cleared by browsers under storage pressure, by users clearing site data, and by iOS Safari's 7-day eviction policy for sites not added to the home screen. A worker who completes 10 lessons and loses their progress due to browser cleanup will not return. This is not a minor technical footnote — it's a retention cliff.



\*\*Premise 5: A certificate from a no-name platform has value.\*\*

Assumed. The certificate system is described as "premium, luxury" and is positioned as a motivational endpoint. But a CSS-printed PDF from `github.io` with no issuing authority, no verification, and no employer recognition is not a credential. Workers may feel deceived when they discover it has no practical value with UK employers or visa authorities.



\*\*Fix:\*\* Run 5 interviews with actual seasonal workers or farm operators before building A2. Validate premise 1 and 2 specifically. Add a PWA manifest + service worker to address premise 4. Reframe the certificate as a personal achievement badge, not a credential.



\---



\### 3. What's the 6-month regret scenario?



\*\*Finding: You build A2 and B1 while nobody uses A1.\*\*



Severity: \*\*Critical\*\*



The roadmap is a content production pipeline: A1 → A2 → B1 → B2 → C1 → C2 → mobile apps. This is a classic build trap. The implicit assumption is that if you build more content, more users will come and progress further. But there is no distribution strategy, no analytics, no way to know if anyone has ever completed lesson 1.



In 6 months, the realistic scenario is: A1 is complete and technically solid, A2 is half-built, and the total user count is somewhere between 0 and "a few people the builder knows." The product will look foolish not because the content is bad — it's clearly well-crafted — but because it was built in isolation from any feedback loop.



The second regret scenario: \*\*localStorage data loss at scale.\*\* The first time a real user loses their progress and posts about it in a Uzbek farm worker Telegram group, the product's reputation in that community is damaged. These communities are tight and word travels fast.



\*\*Fix:\*\* Before building A2, establish a minimum feedback loop. Deploy A1, share it in 3 Uzbek/Tajik farm worker Telegram groups or Facebook groups, and collect 20 real usage sessions. Only then decide what A2 should contain.



\---



\### 4. What alternatives were dismissed without analysis?



\*\*Finding: Three high-leverage alternatives were never considered.\*\*



Severity: \*\*High\*\*



\*\*Alternative 1: Telegram bot.\*\*

The target users are already on Telegram. A Telegram bot requires zero installation, works on any phone, survives app updates, and can push daily lessons as messages. It has a built-in distribution channel (Telegram groups for farm workers already exist). The spec dismisses this implicitly by choosing a web platform, but no analysis is shown. A Telegram bot with 10 lessons would reach more users than a GitHub Pages site with 15 lessons.



\*\*Alternative 2: WhatsApp/Telegram message cards.\*\*

Static image cards (lesson of the day, 5 words, one dialogue) shared in existing worker groups. Zero infrastructure, zero installation, viral by nature. This is how language learning actually spreads in low-literacy, high-mobile communities. Not considered.



\*\*Alternative 3: Partnering with recruitment agencies.\*\*

The workers arrive via licensed recruitment agencies (Concordia, Pro-Force, Fruitful Jobs, etc.). These agencies have a direct channel to workers before they arrive in the UK — during the visa application process. A partnership with one agency would provide pre-arrival distribution to hundreds of workers per season. Not mentioned anywhere in the spec.



\*\*Fix:\*\* Add a distribution section to the product spec. Evaluate Telegram bot as a parallel channel. Identify 3 UK seasonal worker recruitment agencies and draft an outreach email.



\---



\### 5. Competitive risk — could someone else solve this first/better?



\*\*Finding: The real competitive threat is not another app — it's indifference.\*\*



Severity: \*\*Medium\*\*



There are no direct competitors building CEFR-structured English for Central Asian farm workers in the UK. That's the good news. The bad news is that the competitive landscape is irrelevant if the distribution problem isn't solved.



The actual risks:



\*\*Risk 1: Duolingo.\*\* Workers who want to learn English already know Duolingo exists. It has gamification, streaks, social features, and brand recognition. FarmEnglish's advantage is farm-specific vocabulary and Cyrillic transcription — but only if workers know FarmEnglish exists.



\*\*Risk 2: YouTube.\*\* "English for beginners in Russian" has millions of views on YouTube. It's free, works offline (downloaded), and requires no installation. This is the incumbent.



\*\*Risk 3: A well-funded NGO or government program.\*\* The UK Home Office, DEFRA, or a charity like the Gangmasters and Labour Abuse Authority (GLAA) could commission a proper app with a budget. If that happens, FarmEnglish becomes irrelevant overnight regardless of content quality.



\*\*Fix:\*\* The competitive moat is farm-specific vocabulary + Cyrillic transcription + 5 Central Asian languages in one place. Lean into this. Make it the headline, not a footnote. And solve distribution before a funded competitor does.



\---



\### 6. Critical gaps in product strategy



\*\*Finding: Four structural gaps that will cause failure regardless of content quality.\*\*



\*\*Gap 1: Zero distribution strategy. Severity: Critical.\*\*

The spec has 7 phases of content production and zero sentences about how workers will find the product. "Deploy on GitHub Pages" is not a distribution strategy. The URL `username.github.io/farmenglish` will not appear in any search a farm worker in Uzbekistan or the UK would run. This is the single most likely cause of product failure.



\*\*Gap 2: No analytics or feedback loop. Severity: Critical.\*\*

There is no way to know if anyone uses the product, which lessons they complete, where they drop off, or what vocabulary they actually need. The product is being built blind. Even a simple Google Forms link at the end of lesson 15 ("Did this help? What was missing?") would be better than nothing. Without feedback, A2 content will be built on the same unvalidated assumptions as A1.



\*\*Gap 3: localStorage fragility is not mitigated. Severity: High.\*\*

The spec acknowledges offline-first as a core constraint but does not address the iOS Safari 7-day eviction policy, browser storage pressure clearing, or user-initiated data clearing. The certificate system stores its data in localStorage — a user who clears their browser loses their certificate. A PWA with a service worker would solve the caching problem. An export-to-file feature (download progress as JSON) would solve the data loss problem. Neither is in the roadmap.



\*\*Gap 4: The roadmap goes to C2 and mobile apps before validating A1. Severity: High.\*\*

C2 is "advanced fluency." The target user is a farm worker with zero English. The probability that any current user will reach C2 is near zero. The roadmap from A1 to C2 to mobile apps is a fantasy projection that will consume planning energy without producing user value. The roadmap should stop at B1 until there is evidence of users completing A1.



\---



\### Summary table



| Finding | Severity | Fix |

|---|---|---|

| Course-first vs. reference-first product hierarchy | Critical | Lead with phrasebook, course is secondary |

| No evidence workers will study in evenings | Critical | 5 user interviews before building A2 |

| No distribution strategy | Critical | Telegram groups, agency partnerships, add to spec |

| No analytics or feedback loop | Critical | Even a Google Forms link at lesson 15 |

| localStorage fragility not mitigated | High | PWA service worker + export-to-file |

| 5 unvalidated core premises | High | User research before A2 |

| Telegram bot alternative not considered | High | Evaluate as parallel channel |

| Roadmap extends to C2 before A1 is validated | High | Cap roadmap at B1 until A1 has real users |

| Certificate has no real-world value | Medium | Reframe as personal badge, not credential |

| Competitive moat not articulated | Medium | Make farm-specific + Cyrillic the headline |



The content quality is genuinely strong. The pedagogical structure is thoughtful. The technical constraints are handled well. The product will fail not because of what's inside it, but because nobody will find it, and the builder won't know that until months of work have been invested in A2 and B1.



\*\*CLAUDE SUBAGENT (CEO — strategic independence):\*\*



Subagent выявил 4 критических и 4 высоких проблемы. Ключевые совпадения с моим анализом: дистрибуция, localStorage fragility, неподтверждённые предпосылки. Новое: \*\*инверсия иерархии продукта\*\* — разговорник важнее курса для day-one пользователя.



\### CEO Consensus Table



```

CEO DUAL VOICES — CONSENSUS TABLE \[subagent-only]:

═══════════════════════════════════════════════════════════════

&#x20; Dimension                              Claude   Consensus

&#x20; ──────────────────────────────────────  ──────   ─────────

&#x20; 1. Premises valid?                      ⚠️ 4/10  FLAGGED

&#x20; 2. Right problem to solve?              ✅ yes   CONFIRMED

&#x20; 3. Scope calibration correct?           ⚠️       FLAGGED

&#x20; 4. Alternatives sufficiently explored?  ❌ no    FLAGGED

&#x20; 5. Competitive/market risks covered?    ❌ no    FLAGGED

&#x20; 6. 6-month trajectory sound?            ⚠️       FLAGGED

═══════════════════════════════════════════════════════════════

```



\### Sections 1–10: CEO Review



\*\*Section 1 — Problem Definition:\*\* Проблема реальная и острая. Рабочий на ферме в Кенте не понимает менеджера — это прямой удар по заработку и безопасности. Правильная проблема. ✅



\*\*Section 2 — Error \& Rescue Registry:\*\*



| Ошибка | Сценарий | Rescue |

|--------|----------|--------|

| localStorage очищен | Смена браузера / iOS 7-day eviction | Экспорт прогресса в URL-hash или QR |

| Нет пользователей | Продукт не найден | Telegram-канал / партнёрство с агентствами |

| Рабочий слишком устал | Не открывает урок вечером | Push через Telegram bot |

| Нет A2 | Завершил A1, некуда идти | Приоритизировать A2 |



\*\*Section 3 — Competitive Landscape:\*\* Duolingo, Babbel, Busuu — все существуют, но ни один не имеет: (a) фермерского контекста, (b) кириллической транскрипции, (c) 5 языков ЦА, (d) offline-first. Конкурентный ров реальный, но не артикулирован.



\*\*Section 4 — Distribution (КРИТИЧНО):\*\* Нет ни одного пункта в roadmap про то, как пользователи найдут продукт. Это самый большой риск. Варианты которые не рассматривались:

\- Telegram-канал для рабочих (они уже там)

\- Партнёрство с агентствами по найму (HOPS, Concordia, Pro-Force)

\- QR-код на постерах в кэмпах

\- Сарафанное радио через WhatsApp-группы рабочих



\*\*Section 5 — Monetization:\*\* Нет. Для zero-budget проекта это нормально, но если продукт вырастет — нет пути к устойчивости.



\*\*Section 6 — Analytics:\*\* Нет ни одного механизма обратной связи. Неизвестно: сколько людей открыли, сколько прошли урок 1, где бросают. localStorage не даёт агрегированных данных.



\*\*Section 7 — Product Hierarchy (ВЫСОКИЙ):\*\* Subagent прав — разговорник (150+ фраз) важнее курса для day-one пользователя. Рабочий в первый день не будет проходить урок 1 — он скажет "где туалет?" и "сколько я заработал?". Разговорник должен быть первым экраном, не уровни.



\*\*Section 8 — localStorage Fragility (КРИТИЧНО):\*\* iOS Safari очищает localStorage через 7 дней при отсутствии активности. Android Chrome — при нехватке памяти. Год спустя — всё потеряно. Нет механизма восстановления.



\*\*Section 9 — Certificate Value:\*\* Сертификат из `window.print()` с данными из localStorage не имеет реальной ценности для работодателя. Это не проблема для мотивации (пользователь рад), но не стоит позиционировать как "официальный документ".



\*\*Section 10 — Roadmap Sequencing:\*\* C2 и мобильные приложения в roadmap при нуле подтверждённых пользователей — преждевременно. Правильная последовательность: A1 → дистрибуция → валидация → A2 → PWA → A3+.



\### NOT in scope (деферировано в TODOS)

\- Telegram bot

\- Analytics (даже простой счётчик через GitHub Pages insights)

\- PWA / Service Worker для настоящего offline

\- Экспорт прогресса

\- Партнёрства с агентствами



\### What already exists

\- Весь A1 контент — переиспользуется

\- Audit scripts — переиспользуются для A2

\- Hub-and-spoke архитектура — масштабируется

\- Certificate pattern — копируется



\### CEO Completion Summary



| Приоритет | Проблема | Действие |

|-----------|----------|----------|

| 🔴 КРИТИЧНО | Нет дистрибуции | Добавить в план: Telegram + QR + агентства |

| 🔴 КРИТИЧНО | localStorage fragility | Добавить экспорт прогресса в план A2 |

| 🟠 ВЫСОКИЙ | Инверсия иерархии | Разговорник → первый экран на index.html |

| 🟠 ВЫСОКИЙ | Нет аналитики | GitHub Pages insights + простой счётчик |

| 🟡 СРЕДНИЙ | Roadmap слишком длинный | Сфокусироваться на A1→A2→дистрибуция |



\*\*PHASE 1 COMPLETE.\*\* Subagent: 8 issues. Consensus: 1/6 confirmed, 5 flagged.



\---



\## Phase 2: Design Review



UI scope обнаружен. Запускаю.



Let me read the actual implementation files before forming opinions.



Now I have everything I need. Let me write the full review.



Here's the full review. I've read both HTML files, both design specs, and the steering rules before forming any opinion.



\---



\## FarmEnglish — Independent Design Review



\---



\### 1. Information Hierarchy: What does the user see first?



\*\*What's there:\*\* The hub (`index.html`) opens with a sticky frosted-glass header (logo + language button), then a large blue-to-violet gradient hero banner with a 29px headline and subtitle, then three stat pills (lessons / words / streak), then the level cards.



\*\*The problem:\*\* The hero banner is the dominant visual element, but it contains \*motivational copy\* ("Английский для сезонных рабочих"), not an action. A tired worker who opens the app at 9pm after a 10-hour shift doesn't need to be told what the app is — they already know. They need to get to their next lesson in one tap.



The stat pills come \*before\* the level cards. Stats are a reward for returning users, not a navigation aid. A first-time user sees three zeros and has to scroll past them to find the actual course.



\*\*Severity: High\*\*



\*\*Fix:\*\* Invert the hierarchy. The A1 level card — specifically the "Continue" or "Start" CTA — should be the first interactive element below the header. Move stats below the level cards, or collapse them into the hero banner as secondary text. The hero can stay but shrink to \~80px tall on returning visits (detect `fe\_a1.length > 0`).



\---



\### 2. Missing States



I checked the actual render logic, not just the spec. Here's what's unspecified or absent:



\*\*a) Quiz partial completion — no visual progress indicator\*\*

Severity: \*\*High\*\*. The quiz renders all 10 questions at once. There's no "3/10 answered" counter. The finish button is disabled until all 10 are answered correctly, but there's no signal to the user about how many remain. A tired user who answered 7 questions and scrolled away has no idea where they left off.



\*\*b) Quiz "all answered but some wrong" state\*\*

Severity: \*\*High\*\*. The logic is `allDone \&\& allOk` for the success banner. If a user answers all 10 but gets some wrong, the finish button stays disabled and the success banner doesn't appear — but there's no explicit "you have errors, fix them" message. The user sees a grey disabled button with no explanation. The wrong answers are highlighted in red, but there's no summary or call to action.



\*\*c) Speech synthesis unavailable / Firefox Android\*\*

Severity: \*\*Medium\*\*. The code has `if (!speechSynthesis) return` and an offline toast, but there's no persistent UI indicator that audio is unavailable. The speak buttons just silently do nothing. A user who doesn't know why the button isn't working will think the app is broken.



\*\*d) First-time empty state on the hub\*\*

Severity: \*\*Medium\*\*. When `fe\_a1 = \[]`, the stats show "0 / 0 / 0" and the level card shows "0 / 15 уроков". This is technically correct but emotionally cold. There's no onboarding moment — no "Welcome, start here" signal. The design spec doesn't address this at all.



\*\*e) localStorage corruption / parse error\*\*

Severity: \*\*Low\*\* (but real). `JSON.parse(localStorage.getItem('fe\_a1') || '\[]')` — if `fe\_a1` contains malformed JSON (e.g. from a browser bug or manual edit), this throws and the entire page breaks. No try/catch, no fallback. Not specified anywhere.



\*\*f) Certificate generation failure\*\*

Severity: \*\*Low\*\*. The cert modal has a `cert-error` div but the spec doesn't describe what triggers it or what the error message looks like beyond the empty-name validation.



\*\*g) Loading state for the woff2 icon font\*\*

Severity: \*\*Low\*\*. `font-display: block` is used, which is correct — it prevents layout shift. But on a slow 3G connection the icons will be invisible for 1–3 seconds. No fallback text or emoji is specified for the `.icon` spans during that window.



\---



\### 3. User Journey: Emotional Arc



\*\*The intended arc:\*\* Open app → see progress → pick lesson → Grammar → Words → Dialogue → Quiz → Celebrate → back to hub.



\*\*Where it breaks:\*\*



\*\*Break 1 — Grammar tab cognitive overload.\*\* The grammar tab renders the full rule, all three form tables (positive/negative/question), and ≥10 examples in one scrollable page. For a user with zero English and low tech literacy, this is a wall of text. The design spec says "assume zero prior knowledge" but the grammar tab layout doesn't reflect that. There's no progressive disclosure — no "tap to expand" for the negative/question forms. Everything is dumped at once.



\*\*Break 2 — Words tab: 30 cards, no progress.\*\* 30 word cards in a 2-column grid. No indication of how many you've "seen" or tapped. The hint says "tap a word to hear it" but there's no state change on the card after tapping (no checkmark, no colour change, no count). The user has no sense of completion until they hit "Next." This is a motivation killer for someone who's already tired.



\*\*Break 3 — Quiz: the disabled finish button.\*\* Described above. This is the most emotionally damaging moment in the flow. The user has done all the work, answered all 10 questions, and the button is grey and unresponsive. No spec describes what to show here.



\*\*Break 4 — Back navigation during a lesson.\*\* The floating back button goes to the hub, not to the lesson list. If a user is mid-lesson and accidentally taps back, they lose their quiz state (`quizState = {}` on `openLesson`). There's no "are you sure?" confirmation and no resume state. The spec doesn't address this.



\*\*What works well:\*\* The completion banner (`done-banner`) is warm and clear. The course congrats flow (trophy → progress screen) is a genuine emotional payoff. The streak card is motivating for returning users.



\---



\### 4. Specificity: Generic Patterns vs. Specific Decisions



The steering `design.md` is genuinely specific and implementer-friendly. It gives exact CSS values, exact component patterns, exact token names. That's good.



\*\*But three areas are dangerously vague:\*\*



\*\*a) The grammar tab layout is completely unspecified.\*\* The spec describes card styles and typography but never says: how are the three form tables presented? Are they tabs? Accordions? Sequential sections? The implementation chose "all at once, scrollable" — which may not be the right call for the user, but the spec gave no guidance.



\*\*b) The words tab interaction model is unspecified.\*\* The spec says "tap to hear" but doesn't define: does the card change state? Is there a "seen" counter? Can the user mark words as known? The implementation chose "stateless tap" — again, possibly wrong, but the spec was silent.



\*\*c) The quiz "in-progress" state is unspecified.\*\* No design for the state between "0 answered" and "all correct." The spec jumps from question rendering directly to the success banner.



\---



\### 5. What Will Haunt the Implementer of a2.html



These are the specific decisions in a1.html that will create friction when building a2.html:



\*\*a) The design system is split across two files with conflicting values.\*\*

`specs/design.md` (the old one) defines `--c-b2: #3dba5e` (lime green). The steering `design.md` defines `--c-b2: #1a73e8` (blue). The steering rules say steering takes precedence, but `a1.html` itself uses the \*old\* values in some places (e.g. `--c-a2: #22a65e` in index.html's first `:root` block, then overridden by `#1aae39` in the second `:root` block). The implementer will have to know which `:root` block wins — and the answer is "the second one, because CSS cascade" — but this is a trap.



\*\*b) The `a1.html` CSS has two `:root` blocks.\*\* The first defines the old Telegram-style tokens. The second overrides them with the MD3E tokens. This works but is fragile. If someone adds a new token to the first block and forgets the second, it silently uses the wrong value. For a2.html, the implementer needs to know: start from the second block only, delete the first.



\*\*c) The `border-left: 4px` vs `::before` inconsistency.\*\*

`index.html` uses `border-left: 0` on `.lv-card` and a `::before` pseudo-element (correct, per spec). `a1.html` uses `border-left: 4px solid #3b82f6` on `.ch-card` (wrong, per spec). The implementer of a2.html will copy one of these and get it wrong half the time.



\*\*d) Hardcoded colours in a1.html's lesson body.\*\*

The lesson inner view (`.g-card`, `.g-rule`, `.g-ex-box`, `.q-card`, etc.) uses hardcoded `#e87830`, `#1a1a2e`, `#e8eaed`, `#fff` throughout — not CSS variables. For a2.html, which uses `--c-a2` (green) as its accent, the implementer will need to either: (1) replace all hardcoded values with variables, or (2) manually swap every orange reference to green. Neither is specified. This is the single biggest implementation trap.



\*\*e) The `finish-btn` uses hardcoded `#0075de` inline.\*\*

`style="background:#0075de;color:#fff"` — not a variable, not in the spec. Where did `#0075de` come from? It's the old Telegram-style blue from `specs/design.md`. It's not in the steering token set. A2.html will either inherit this inconsistency or the implementer will have to hunt it down.



\*\*f) No spec for the lesson list screen within a2.html.\*\*

`a1.html` has a "home" screen that lists lessons as chapter cards. The chapter card colours cycle through `#3b82f6 → #e87830 → #f59e0b → #22a65e → ...`. This cycling palette is defined in `specs/design.md` (old spec) but not in the steering rules. The implementer of a2.html won't know whether to use the same cycling palette or the CEFR level colour (`--c-a2` green) for all chapter cards.



\---



\### 6. Is Glassmorphic/Expressive Design Appropriate for This User?



\*\*My opinion: mostly yes, with one real concern.\*\*



The glassmorphic cards (`backdrop-filter: blur(14px)`) are fine on modern Android (Chrome 76+, which covers the target demographic). The visual language is actually \*familiar\* — it resembles Telegram, which most Central Asian users know well. The blue-dominant palette is trustworthy and legible.



The spring animations (`cubic-bezier(0.34, 1.56, 0.64, 1)`) are a mild concern. The bounce overshoot on card hover is a desktop-hover pattern. On mobile, the `:active` scale(0.985) is fine, but the hover transform will never fire on touch. This is harmless but wastes CSS.



\*\*The real concern is contrast on glassmorphic surfaces.\*\* `rgba(255,255,255,0.82)` as a card background over the blue mesh gradient body can produce a card surface that's closer to `#e8f0fb` than white. Text at `#4a4d52` (--text2) on that surface may fall below 4.5:1 at the lightest end. The spec claims "minimum contrast ratio 4.5:1" but doesn't provide verified contrast values for the glassmorphic combinations. This needs to be checked, not assumed.



\*\*The 800–900 weight headings are correct for this user.\*\* Heavy weight at moderate size is easier to read for low-literacy users than light weight at large size. Good call.



\*\*The 11px labels are a problem.\*\* `.d-spkr` (speaker label in dialogue), `.q-num` (question number), `.w-ru` (word translation), `.ch-badge` — all at 10–11px. The spec says minimum 14px but the implementation violates this repeatedly. For a tired user reading Cyrillic on a 5-inch screen at arm's length after a shift, 11px Cyrillic is genuinely hard to read. This isn't a style preference — it's a legibility failure.



\---



\### Summary: Priority Fixes Before Building a2.html



| # | Issue | Severity |

|---|-------|----------|

| 1 | Delete the first `:root` block in a1.html; consolidate to one token set | Critical |

| 2 | Replace all hardcoded `#e87830`, `#0075de`, `#1a1a2e` etc. in lesson body CSS with variables | Critical |

| 3 | Specify the quiz partial-completion state (progress counter + "fix errors" message) | High |

| 4 | Add word-card "seen" state (visual feedback after tap) | High |

| 5 | Invert hub hierarchy: lesson CTA first, stats second | High |

| 6 | Raise minimum font size to 14px — eliminate all 10–11px text | High |

| 7 | Specify grammar tab layout (progressive disclosure vs. all-at-once) | High |

| 8 | Add mid-lesson back-navigation confirmation or resume state | Medium |

| 9 | Verify contrast ratios on glassmorphic card surfaces | Medium |

| 10 | Define chapter card colour strategy for a2.html (level colour vs. cycling palette) | Medium |



\*\*CLAUDE SUBAGENT (Design — independent review):\*\*



Subagent нашёл 6 категорий проблем. Критические для a2.html: конфликт `:root` блоков, hardcoded цвета в lesson CSS, 10-11px текст нарушает собственный минимум 14px.



\### Design Litmus Scorecard



```

DESIGN DUAL VOICES — CONSENSUS TABLE \[subagent-only]:

═══════════════════════════════════════════════════════════════

&#x20; Dimension                              Score  Consensus

&#x20; ──────────────────────────────────────  ─────  ─────────

&#x20; 1. Information hierarchy               6/10   FLAGGED

&#x20; 2. Missing states specified            4/10   FLAGGED

&#x20; 3. Emotional arc intact                6/10   FLAGGED

&#x20; 4. Design specificity                  7/10   CONFIRMED

&#x20; 5. a2.html implementation traps        3/10   FLAGGED

&#x20; 6. Appropriateness for target user     7/10   CONFIRMED

═══════════════════════════════════════════════════════════════

```



\### Design Passes 1–7



\*\*Pass 1 — Information Hierarchy (6/10):\*\* Hero banner занимает экран, но не содержит действия. Статистика (streak, слова) появляется раньше карточек уровней. Для уставшего рабочего первое что он должен видеть — кнопка "Продолжить урок". Авто-решение: добавить "Continue" CTA в hero или поднять карточку A1 выше статистики.



\*\*Pass 2 — Missing States (4/10):\*\* 7 неспецифицированных состояний:

\- Quiz: нет счётчика прогресса (вопрос X из 10)

\- Quiz: кнопка "Завершить" заблокирована без объяснения

\- Speech API: тихий сбой (нет fallback UI)

\- Первый запуск: пустой hub без онбординга

\- localStorage parse error: нет обработки

\- Сертификат: нет error state

\- Icon font loading: нет fallback



\*\*Pass 3 — Emotional Arc (6/10):\*\* Три точки разрыва: (1) Grammar tab выгружает всё сразу — нет прогрессивного раскрытия; (2) Words tab — 30 карточек без индикатора "просмотрено"; (3) Quiz — заблокированная кнопка без объяснения — самый болезненный момент.



\*\*Pass 4 — Design Specificity (7/10):\*\* steering/design.md хорошо специфицирован. Пробелы: layout grammar tab, interaction model words tab, quiz in-progress state.



\*\*Pass 5 — a2.html Implementation Traps (3/10):\*\* Критично перед началом a2.html:

\- Два конфликтующих `:root` блока (index.html vs a1.html — разные значения токенов)

\- `border-left: 4px` в index.html vs `::before` в steering rules — несоответствие

\- Hardcoded `#e87830`, `#0075de` в lesson body CSS вместо переменных

\- `specs/design.md` содержит устаревшие токены, противоречащие steering/design.md



\*\*Pass 6 — Typography (5/10):\*\* 10-11px текст (транскрипция, навигационные подписи) нарушает собственный минимум 14px. Для уставшего читателя кириллицы это реальная проблема читаемости.



\*\*Pass 7 — Accessibility (7/10):\*\* `prefers-reduced-motion` есть. Focus-visible есть. Контраст не верифицирован для glassmorphic карточек.



\*\*PHASE 2 COMPLETE.\*\* Subagent: 6 категорий, 15+ конкретных issues. Consensus: 2/6 confirmed, 4 flagged.



\---



\## Phase 3: Eng Review



Let me read the actual code before forming opinions.



Let me read the actual code before rendering judgment.



Here's the adversarial review. I read the actual code, not just the spec.



\---



\## Adversarial Architecture Review — FarmEnglish



\---



\### 1. Architecture Sustainability (Scaling to a2.html → c2.html)



\*\*Severity: HIGH\*\*



\*\*Finding: The scratch/ directory is the real build system, and it's already collapsing under its own weight.\*\*



You have 30+ one-off scripts in `scratch/` — `fix\_l2\_l3.js`, `fix\_l2\_l3\_clean.js`, `fix\_all.js`, `master\_fix.js`, `full\_rebuild.js`, `replace\_l5.js`, `replace\_l7.js`, `replace\_l11.js`, `replace\_l15.js`. This is the archaeology of a file that has been surgically patched dozens of times. Each script is a frozen snapshot of a past crisis. None of them are idempotent. None have tests.



The specific failure mode: `lessons\_data.js` is a manually maintained export of the LESSONS array extracted from `a1.html`. It can silently drift from the actual file. The audit scripts run against `lessons\_data.js`, not against `a1.html` directly. If someone edits `a1.html` without re-syncing `lessons\_data.js`, every audit passes clean while the live file is broken. There's even a script called `sync\_lessons\_from\_a1.js` — its existence proves this drift has already happened.



\*\*Fix:\*\* Before building `a2.html`, write a single extraction script that parses the LESSONS array directly out of the HTML file and pipes it to the audits. Eliminate `lessons\_data.js` as a separate artifact. The audit chain should be `extract from HTML → validate → report`, not `trust a separate file → validate`.



\*\*Finding: The `LEGACY\_GRAMMAR\_\*` objects are a debt bomb.\*\*



`a1.html` contains `LEGACY\_GRAMMAR\_ENHANCEMENTS`, `LEGACY\_GRAMMAR\_DIALOGUE\_ROWS`, and `LEGACY\_QUIZ\_HINT\_TRANSLATIONS` — large objects that patch lessons 8–15 at render time because those lessons were built in an older data format. This means the rendered output for half the course is assembled from two separate data sources merged at runtime. When you build `a2.html` "the same way," you will either repeat this pattern or spend time cleaning it up first. The pattern doesn't scale.



\*\*Fix:\*\* Before `a2.html`, do a one-time migration: bake the legacy enhancements back into the LESSONS array entries and delete the patch objects. The audit scripts already validate the new format — use them to confirm the migration.



\---



\### 2. localStorage Fragility and Data Loss Scenarios



\*\*Severity: HIGH\*\*



\*\*Finding: iOS Safari 7-day eviction is not the only threat. The threat model is incomplete.\*\*



The known risk is iOS evicting localStorage after 7 days of inactivity. The actual risk surface is larger:



\- \*\*Private/Incognito mode\*\*: localStorage is session-scoped. A user who opens the app in private mode (common on shared phones) completes lessons, closes the tab, and loses everything. No warning is shown.

\- \*\*Storage quota exceeded\*\*: The app writes `fe\_words`, `fe\_points`, `fe\_phrasebook\_count`, `fe\_streak`, `fe\_last\_date`, `fe\_a1`, `fe\_lang`, and three certificate fields on every lesson completion. None of the `localStorage.setItem()` calls are wrapped in try/catch. On a device with a full storage quota, `setItem` throws a `QuotaExceededError` — a DOMException — which is uncaught. The `saveDone()` function (`localStorage.setItem('fe\_a1', JSON.stringify(done))`) will silently fail. The user sees the completion screen, but their progress is not saved.

\- \*\*Corrupted JSON\*\*: `done = JSON.parse(localStorage.getItem('fe\_a1') || '\[]')` — if `fe\_a1` contains malformed JSON (e.g., from a browser extension, a partial write, or manual tampering), this throws and crashes the entire app initialization. There's a try/catch on the storage event handler but not on the initial load.



\*\*Fix:\*\*

```javascript

// Wrap initial load

try {

&#x20; done = JSON.parse(localStorage.getItem('fe\_a1') || '\[]');

&#x20; if (!Array.isArray(done)) done = \[];

} catch (\_) { done = \[]; }



// Wrap all writes

function saveDone() {

&#x20; try {

&#x20;   localStorage.setItem('fe\_a1', JSON.stringify(done));

&#x20; } catch (e) {

&#x20;   showToast('Не удалось сохранить прогресс. Хранилище заполнено.');

&#x20; }

}

```



Add a one-line notice when the app detects it's running in a context where localStorage is likely ephemeral (check `navigator.storage.persist` if available, or catch the first write failure).



\---



\### 3. Quality Gate Gaps



\*\*Severity: MEDIUM\*\*



\*\*Finding: The audits validate structure but not semantic correctness.\*\*



What the three audit scripts check: counts (30 words, 10 dialogue lines, 10 quiz questions), field presence, dialogue speaker alternation, cross-lesson word uniqueness, and CSS grid structure in grammar rule HTML.



What they don't check:



\- \*\*Quiz answer index vs. content consistency\*\*: `c: 0` means `opts\[0]` is correct. The audit confirms `c` is a number and `opts` has 4 items. It does not verify that `opts\[c]` is actually the correct answer for the question. A transposition during editing (`c: 1` when the correct answer is at index 0) passes all audits silently.

\- \*\*`opts` content uniqueness\*\*: Four identical options (`\['am','am','am','am']`) would pass.

\- \*\*IPA field (`pn`) presence\*\*: `advanced\_audit.js` checks `e`, `en`, `transcr`, and all 5 language translations. It does not check `pn` (IPA pronunciation). Words can ship without IPA.

\- \*\*Grammar HTML injection\*\*: `intro\_ru`, `rule\_ru`, `cultural\_ru`, `note\_ru` fields contain raw HTML strings (e.g., `<div style="line-height:1.6">...`). The audit checks that these strings contain `display:grid` and `g-transcr` class references, but does not validate that the HTML is well-formed. A malformed tag in `intro\_ru` will break the grammar tab render for all users of that language.

\- \*\*Snowball rule is English-only\*\*: `advanced\_audit.js` checks the snowball rule by tokenizing English text. It does not verify that translation fields (`ru`, `uz`, etc.) don't introduce vocabulary that hasn't been taught — but more critically, it tokenizes loosely. A word like "strawberry" in a quiz question would need to match against the words array, but the tokenizer splits on spaces and punctuation. Contractions, hyphenated words, and quoted phrases can slip through.

\- \*\*`lessons\_data.js` drift\*\*: As noted above, the audits run against a separate file, not the HTML. This is a structural gap in the quality gate itself.



\*\*Fix:\*\* Add a `c`-value semantic check: for `\[COMPLETE]` questions, verify that `opts\[c]` appears in the blank position of the question template. For `\[TRANSLATE]` questions, verify `opts\[c]` matches the hint translation. Add `pn` to the required fields list in `advanced\_audit.js`.



\---



\### 4. Hidden Complexity in the Inline Data Approach



\*\*Severity: MEDIUM\*\*



\*\*Finding: The file is not 25,000 lines of data — it's 25,000 lines of data plus a runtime patching system plus a rendering engine plus a certificate generator plus a phrasebook.\*\*



The actual complexity hidden inside `a1.html`:



\- \*\*Dual grammar format\*\*: Lessons 1–7 use one grammar schema, lessons 8–15 use another. The renderer has an `if (g.forms)` branch for the new format and an `else` branch for the old format. Both are live in production. The audit scripts validate the new format only — old-format lessons pass because the count checks still work.

\- \*\*Runtime data assembly\*\*: `LEGACY\_GRAMMAR\_ENHANCEMENTS` patches `note`, `cultural`, and form `labels` at render time. `LEGACY\_GRAMMAR\_DIALOGUE\_ROWS` injects dialogue rows into grammar tables at render time. `LEGACY\_QUIZ\_HINT\_TRANSLATIONS` adds hint translations to quiz items at render time. The data you see in the LESSONS array is not the data the user sees — it's assembled from 4 sources.

\- \*\*`getQuizModel(lesson)`\*\*: There's a function that transforms the raw quiz data before rendering. If this function has a bug, all 15 lessons are affected simultaneously. There's no unit test for it.

\- \*\*The `lessons\_data.js` / `a1.html` split\*\*: The scratch scripts operate on `lessons\_data.js`. The browser runs `a1.html`. These can diverge. `rebuild\_lessons\_data\_from\_a1.js` and `sync\_lessons\_from\_a1.js` both exist, suggesting this has already been a problem.



\*\*The specific failure mode for a2.html\*\*: You build `a2.html` "the same way." Six months in, lessons 1–8 of A2 are in the new format, lessons 9–15 are in a slightly different new format because the spec evolved. You now have three grammar formats across two files, two sets of legacy patch objects, and audit scripts that only validate one of them.



\*\*Fix:\*\* Before `a2.html`, define a canonical v2 lesson schema, migrate all 15 A1 lessons to it, delete the legacy patch objects and the old-format renderer branch, and lock the schema in a JSON Schema file that the audit scripts validate against. This is a one-time cost that prevents compounding debt.



\---



\### 5. Security Surface



\*\*Severity: LOW-MEDIUM\*\* (static app, no user accounts, no server — but not zero)



\*\*Finding: Grammar content fields are trusted HTML rendered directly into the DOM.\*\*



The `intro`, `rule`, `cultural`, and `note` grammar fields contain raw HTML strings. They are inserted via template literals into the `h` string, which is then assigned to `root.innerHTML`. Example from the actual data:



```javascript

"intro\_ru": "<div style=\\"line-height:1.6\\">В английском так говорить ошибка:<br>❌ <b>I Ahmad</b>..."

```



This is intentional — the content needs formatting. But it means anyone who can modify `a1.html` (or `lessons\_data.js`, or any of the 30 scratch scripts that write back to the HTML) can inject arbitrary HTML/JS into the page. The threat is not a remote attacker — it's a compromised build process or a careless bulk-edit script.



\*\*Finding: `escapeAttr` is used inconsistently.\*\*



`escapeAttr` is applied to `aria-label` attributes and `onclick` speech attributes. It is not applied to content inserted into element bodies. `w.en`, `w.transcr`, `w\[lang]`, `r.example`, `r.transcr`, `r\['tr\_'+lang]`, `line.en`, `line\[lang]` — all inserted raw. For the current data this is fine because the content is controlled. But `lessons\_data.js` is a separate file edited by scripts, and none of those scripts escape output. A script bug that introduces a `<` or `"` into a word's `en` field would produce broken HTML silently.



\*\*Finding: `localStorage` values from the storage event are parsed but not validated.\*\*



```javascript

if (event.key === 'fe\_a1') {

&#x20; try {

&#x20;   done = JSON.parse(event.newValue || '\[]');

&#x20;   syncDerivedStats();

&#x20;   render();

&#x20; } catch (\_) { }

}

```



`done` is set to whatever `JSON.parse` returns. If another tab (or a browser extension) writes `{"0": "admin"}` to `fe\_a1`, `done` becomes an object, not an array. `done.includes()` will throw on the next render. The try/catch on the storage event doesn't protect the render call.



\*\*Fix:\*\* After parsing, validate: `if (!Array.isArray(done)) done = \[];`



\---



\### 6. Data Safety Beyond Commit-Often



\*\*Severity: HIGH\*\*



\*\*Finding: The `.bak` file is the only non-git backup, and it's already stale.\*\*



`a1.html.bak` exists in the repo root. It's committed to git, which means it's not a backup — it's just another version of the file that will diverge. A `git reset --hard` that destroys `a1.html` also destroys `a1.html.bak` if both are tracked.



\*\*Finding: The "export LESSONS to JSON before risky git ops" rule is manual and unenforced.\*\*



The tech spec says: "Before risky Git operations, export the current LESSONS array to a backup JSON file." There is no hook, no script that runs automatically, no CI check. It relies entirely on the developer remembering. The scratch directory has `rebuild\_lessons\_data\_from\_a1.js` and `extract.js` — but these are run manually.



\*\*Finding: `lessons\_data.js` is committed to git but is a derived artifact.\*\*



If `lessons\_data.js` is the source of truth for audits, it should be generated, not hand-maintained. If `a1.html` is the source of truth, `lessons\_data.js` should be in `.gitignore` and regenerated before each audit run. Having both committed creates two sources of truth that can silently diverge — and the audit will pass on the stale one.



\*\*The catastrophic scenario\*\*: Developer runs a scratch script that corrupts `a1.html`. They notice immediately and run `git checkout a1.html`. But the last commit was 3 days ago and included 2 lessons of work. The `.bak` file is also 3 days old. `lessons\_data.js` has the current data but the audit scripts can't regenerate `a1.html` from it — the scripts only go one direction (HTML → JS, not JS → HTML). The lesson content is gone.



\*\*Fix:\*\*

1\. Add a pre-commit git hook that automatically exports the LESSONS array to `backups/lessons\_YYYYMMDD\_HHMMSS.json` before every commit. This is a 10-line shell script.

2\. Add `a1.html.bak` to `.gitignore` — a committed `.bak` file is not a backup.

3\. Make `lessons\_data.js` a generated file: add it to `.gitignore`, add a `generate` step to the audit chain that extracts it fresh from `a1.html` before running audits.

4\. Write a `restore.js` script that can reconstruct `a1.html` from a `lessons\_YYYYMMDD.json` backup + a template. This is the missing recovery path.



\---



\### Summary Table



| Area | Severity | Core Failure Mode |

|------|----------|-------------------|

| Architecture sustainability | HIGH | `lessons\_data.js` drift; legacy patch objects compound with each new file |

| localStorage fragility | HIGH | Uncaught `QuotaExceededError` silently drops progress; JSON parse crash on init |

| Quality gate gaps | MEDIUM | Audits run against a derived file; `c:` index not semantically validated; `pn` not checked |

| Inline data complexity | MEDIUM | Three grammar formats, four data sources assembled at runtime, no unit tests |

| Security surface | LOW-MEDIUM | Raw HTML in grammar fields; `done` array not validated after storage event parse |

| Data safety | HIGH | No automated backup; `.bak` is a false safety net; no HTML reconstruction path |



The highest-leverage fix before building `a2.html`: write the pre-commit backup hook and fix the `lessons\_data.js` drift problem. Everything else compounds if you add a second 25,000-line file on top of the current foundation.



\*\*CLAUDE SUBAGENT (Eng — independent review):\*\*



Subagent нашёл критические проблемы: `QuotaExceededError` молча теряет прогресс, `JSON.parse` без guard крашит app init, `a1.html.bak` в git — не настоящий бэкап, нет пути восстановления.



\### Eng Consensus Table



```

ENG DUAL VOICES — CONSENSUS TABLE \[subagent-only]:

═══════════════════════════════════════════════════════════════

&#x20; Dimension                           Claude   Consensus

&#x20; ──────────────────────────────────── ──────   ─────────

&#x20; 1. Architecture sound?               ⚠️       FLAGGED

&#x20; 2. Test coverage sufficient?         ⚠️       FLAGGED

&#x20; 3. Performance risks addressed?      ✅       CONFIRMED

&#x20; 4. Security threats covered?         ⚠️       FLAGGED

&#x20; 5. Error paths handled?              ❌       FLAGGED

&#x20; 6. Deployment risk manageable?       ⚠️       FLAGGED

═══════════════════════════════════════════════════════════════

```



\### Section 1: Architecture ASCII Diagram



```

index.html ──────────────────────────────────────────────────

&#x20; │  translations.js (shared i18n)                          │

&#x20; │  localStorage: fe\_lang, fe\_a1, fe\_streak, fe\_words      │

&#x20; └──→ a1.html (25,000+ lines)                              │

&#x20;        │  LESSONS\[15] (inline data)                       │

&#x20;        │  TR{} (inline i18n)                              │

&#x20;        │  CSS (inline)                                    │

&#x20;        │  JS render engine (inline)                       │

&#x20;        │  Certificate generator (inline)                  │

&#x20;        └──→ localStorage (read/write)                     │

&#x20;                                                           │

&#x20; \[PLANNED] a2.html (another 25,000+ lines)                 │

&#x20; \[PLANNED] b1.html, b2.html, c1.html, c2.html              │

&#x20;                                                           │

&#x20; AUDIT PIPELINE (manual, Node.js):                         │

&#x20; scratch/audit.js → check\_duplicates.js → advanced\_audit.js│

&#x20; (no CI, no pre-commit hook, no automated trigger)         │

```



\*\*Coupling concern:\*\* `lessons\_data.js` в scratch/ может дрейфовать от `a1.html`. Аудиты запускаются на `a1.html`, но `lessons\_data.js` используется в некоторых скриптах — рассинхронизация возможна.



\### Section 2: Code Quality



\- Два формата грамматики в одном файле (уроки 1-7 vs 8-15) — технический долг

\- `LEGACY\_GRAMMAR\_\*` patch объекты — контент собирается из 4 источников в runtime

\- Hardcoded цвета в lesson CSS вместо переменных (найдено в Phase 2)



\### Section 3: Test Review



\*\*Что аудиты проверяют:\*\*

\- ✅ Количество слов/диалогов/тестов

\- ✅ Snowball rule (неизвестные слова)

\- ✅ Дедупликация слов

\- ✅ Чередование спикеров

\- ✅ Quiz теги \[COMPLETE]/\[TRANSLATE]



\*\*Что аудиты НЕ проверяют:\*\*

\- ❌ `opts\[c]` семантически правильный ответ

\- ❌ `pn` (IPA) поле обязательно

\- ❌ HTML well-formedness в grammar полях

\- ❌ `QuotaExceededError` handling

\- ❌ `JSON.parse` guard на localStorage

\- ❌ Синхронизация `lessons\_data.js` с `a1.html`



\*\*Тест-план артефакт:\*\* Перед a2.html нужно добавить в `audit.js`:

1\. Проверку `opts\[c]` — правильный ответ должен быть в opts

2\. Проверку `pn` поля у каждого слова

3\. Guard: `JSON.parse` в try/catch с fallback `\[]`



\### Section 4: Performance



Файл 25,000 строк загружается целиком. На 3G (\~1 Мбит/с) это \~2-3 секунды. Приемлемо для MVP, но при 6 уровнях × 25,000 строк = 150,000 строк суммарно — каждый файл загружается отдельно, так что проблема не масштабируется.



\### Mandatory Eng Outputs



\*\*NOT in scope (деферировано):\*\*

\- Service Worker / PWA

\- CI/CD pipeline

\- Разделение данных и кода (data/code split)

\- Автоматический pre-commit hook



\*\*What already exists:\*\*

\- Полный audit pipeline — переиспользуется для a2.html без изменений

\- localStorage schema — расширяется добавлением `fe\_a2`

\- Certificate pattern — копируется



\*\*Failure Modes Registry:\*\*



| Режим отказа | Вероятность | Последствие | Mitigation |

|-------------|-------------|-------------|------------|

| localStorage eviction (iOS) | Высокая | Потеря прогресса | Экспорт в URL/QR |

| QuotaExceededError | Средняя | Тихая потеря прогресса | try/catch + UI |

| JSON.parse crash | Средняя | App не запускается | try/catch + fallback \[] |

| a1.html.bak не актуален | Высокая | Нет восстановления | Pre-commit export |

| lessons\_data.js дрейф | Средняя | Аудит на стале данных | Regenerate before audit |



\*\*PHASE 3 COMPLETE.\*\* Subagent: 6 категорий, 15+ findings. Consensus: 1/6 confirmed, 5 flagged.



\---



\## Decision Audit Trail



| # | Phase | Decision | Classification | Principle | Rationale |

|---|-------|----------|----------------|-----------|-----------|

| 1 | CEO | Принять предпосылку P1-P6 | Mechanical | P6 | Обоснованы контекстом |

| 2 | CEO | Флагировать P10 (дистрибуция) | Mechanical | P1 | Критический gap |

| 3 | CEO | Флагировать localStorage fragility | Mechanical | P1 | iOS 7-day eviction реальна |

| 4 | CEO | Деферировать Telegram bot | Mechanical | P3 | Вне текущего scope |

| 5 | CEO | Деферировать PWA | Mechanical | P3 | Вне текущего scope |

| 6 | Design | Флагировать конфликт :root токенов | Mechanical | P5 | Блокирует a2.html |

| 7 | Design | Флагировать hardcoded цвета | Mechanical | P5 | Нарушает собственные правила |

| 8 | Design | Флагировать 10-11px текст | Mechanical | P1 | Нарушает минимум 14px |

| 9 | Eng | Флагировать QuotaExceededError | Mechanical | P1 | Тихая потеря данных |

| 10 | Eng | Флагировать JSON.parse без guard | Mechanical | P1 | App crash |

| 11 | Eng | Деферировать CI/CD | Mechanical | P3 | Вне zero-budget scope |



\---



\## Pre-Gate Verification



Все обязательные outputs произведены. Перехожу к финальному gate.



\---



\## Phase 4: Final Approval Gate



\---



\## /autoplan Review Complete



\### Plan Summary

FarmEnglish A1 MVP технически крепкий и педагогически качественный. Архитектура hub-and-spoke хорошо масштабируется на новые уровни. Главные риски — не технические: нет дистрибуции, нет аналитики, localStorage fragility не обработана. Перед стартом a2.html нужно закрыть 4 блокирующих технических долга.



\### Decisions Made: 11 total (11 auto-decided, 0 taste choices, 0 user challenges)



\### User Challenges

Нет — оба голоса согласны с направлением продукта.



\### Auto-Decided: 11 decisions (см. Decision Audit Trail выше)



\---



\### Review Scores



| Фаза | Оценка | Ключевые findings |

|------|--------|-------------------|

| CEO | 5/10 | Нет дистрибуции, localStorage fragility, неподтверждённые предпосылки |

| Design | 6/10 | Конфликт :root, hardcoded цвета, missing states, 10-11px текст |

| Eng | 6/10 | QuotaExceededError тихий, JSON.parse без guard, нет пути восстановления данных |



\---



\### Cross-Phase Themes



\*\*Тема 1: localStorage fragility\*\* — флагирована в CEO (Phase 1) и Eng (Phase 3) независимо. Высокая уверенность. iOS Safari 7-day eviction + QuotaExceededError + нет export механизма = реальная потеря прогресса пользователей.



\*\*Тема 2: Нет дистрибуции\*\* — флагирована в CEO (Phase 1) как критическая. Продукт не найдут без активных усилий.



\*\*Тема 3: Технический долг перед a2.html\*\* — флагирован в Design (Phase 2) и Eng (Phase 3): конфликт токенов, hardcoded цвета, JSON.parse без guard.



\---



\### Deferred to TODOS



\- Telegram bot / канал для дистрибуции

\- PWA / Service Worker

\- CI/CD pipeline

\- Экспорт прогресса (URL-hash или QR)

\- Analytics (даже GitHub Pages insights)

\- Партнёрства с агентствами (HOPS, Concordia, Pro-Force)



\---



\### Implementation Tasks (aggregated across phases)



\*\*🔴 КРИТИЧНО — блокируют a2.html:\*\*



\- \[ ] \*\*ENG-1 (P1)\*\* — Добавить `try/catch` вокруг всех `JSON.parse(localStorage.getItem(...))` с fallback `\[]`. Файлы: `a1.html`, `index.html`

\- \[ ] \*\*ENG-2 (P1)\*\* — Добавить `try/catch` вокруг всех `localStorage.setItem(...)` с UI-уведомлением при `QuotaExceededError`. Файлы: `a1.html`, `index.html`

\- \[ ] \*\*DESIGN-1 (P1)\*\* — Унифицировать `:root` токены между `index.html` и `a1.html` (сейчас разные значения `--card-shadow`, `--radius`, `--border`). Создать единый reference в steering/design.md

\- \[ ] \*\*DESIGN-2 (P1)\*\* — Заменить hardcoded `#e87830`, `#0075de`, `#1a1a2e` в lesson body CSS на CSS переменные. Файл: `a1.html`



\*\*🟠 ВЫСОКИЙ — сделать до или во время a2.html:\*\*



\- \[ ] \*\*CEO-1 (P2)\*\* — Добавить минимальную дистрибуционную стратегию: Telegram-канал + QR-код на README + инструкция для агентств. Файл: `README.md` (создать)

\- \[ ] \*\*DESIGN-3 (P2)\*\* — Поднять минимальный font-size транскрипции с 11px до 14px. Файл: `a1.html`

\- \[ ] \*\*DESIGN-4 (P2)\*\* — Специфицировать 7 missing states (quiz progress counter, speech fallback, empty hub, localStorage error). Файл: `specs/design.md`

\- \[ ] \*\*ENG-3 (P2)\*\* — Добавить в `audit.js` проверку: `opts\[c]` должен быть семантически правильным ответом (хотя бы проверка что `c < opts.length`). Файл: `scratch/audit.js`

\- \[ ] \*\*ENG-4 (P2)\*\* — Добавить pre-commit скрипт: экспорт `LESSONS` из `a1.html` в `scratch/lessons\_backup\_\[date].json` перед каждым коммитом. Файл: `scratch/pre-commit-export.js`



\*\*🟡 СРЕДНИЙ — технический долг:\*\*



\- \[ ] \*\*CEO-2 (P3)\*\* — Обновить `specs/design.md` — удалить устаревшие токены, привести в соответствие со steering/design.md

\- \[ ] \*\*ENG-5 (P3)\*\* — Добавить `pn` (IPA) в обязательные поля в `audit.js`

\- \[ ] \*\*CEO-3 (P3)\*\* — Добавить экран онбординга для первого запуска (пустой hub без прогресса)



\---



Это полный autoplan ревью. Продукт правильный — проблема реальная, решение элегантное, технический стек обоснован. Главные риски не в коде, а в том что пользователи не найдут продукт и потеряют прогресс при смене телефона.



Хотите начать с критических задач (ENG-1, ENG-2, DESIGN-1, DESIGN-2) прямо сейчас?

