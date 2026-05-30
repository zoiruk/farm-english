# ⚙️ Technical Specification — FarmEnglish

## 🏗️ Архитектура

### Принцип: Zero-Budget, Offline-First

Платформа работает **без сервера, без базы данных, без зависимостей**.

| Компонент | Решение | Стоимость |
|-----------|---------|-----------|
| Frontend | HTML + CSS + Vanilla JS | $0 |
| Аудио | Web Speech API (en-GB) | $0 |
| Хранение прогресса | localStorage | $0 |
| Хостинг | GitHub Pages | $0 |
| Картинки | Emoji 🍓🚜🧤 | $0 |
| Данные уроков | JSON inline в HTML | $0 |
| Локализация | translations.js | $0 |

---

## 📁 Структура проекта

```
English for Seasonal Workers (UK Life & Work)/
├── index.html          ← Главная (выбор уровня, Telegram-стиль)
├── a1.html             ← A0-A1: количество уроков определить на основе уровня из файла /doc/CEFR A1-General-English-Elementary-Course-outline.pdf
├── a2.html             ← A2: количество уроков определить на основе уровня из файла /doc/CEFR A2-General-English-Elementary-Course-outline.pdf
├── b1.html             ← B1: количество уроков определить на основе уровня из файла /doc/CEFR B1-General-English-Pre-Intermediate-Course-outline.pdf
├── b2.html             ← B2: количество уроков определить на основе уровня из файла /doc/CEFR B2-General-English-Upper-Intermediate-Course-outline.pdf
├── c1.html             ← C1: количество уроков определить на основе уровня из файла /doc/CEFR C1-General-English-Advanced-Course-outline.pdf
├── c2.html             ← C2: количество уроков определить на основе уровня из файла /doc/CEFR C2-General-English-Proficiency-Course-outline.pdf
├── translations.js     ← Единый файл локализации (5 языков)
├── specs/              ← Документация и спецификации
│   ├── product.md
│   ├── tech.md
│   ├── design.md
│   ├── structure.md
│   ├── content.md
│   ├── interactive-features.md
│   ├── accessibility.md
│   ├── requirements.md
│   └── tasks.md
└── doc/                
    ├─ CEFR A0-A1-General-English-Beginner-Course-outline.pdf  ← PDF с уроками A0-A1
    ├─ CEFR A2-General-English-Elementary-Course-outline.pdf  ← PDF с уроками A2
    ├─ CEFR B1-General-English-Pre-Intermediate-Course-outline.pdf  ← PDF с уроками B1
    ├─ CEFR B2-General-English-Upper-Intermediate-Course-outline.pdf  ← PDF с уроками B2
    └─ CEFR C1-General-English-Advanced-Course-outline.pdf  ← PDF с уроками C1
    └─ CEFR C2-General-English-Proficiency-Course-outline.pdf  ← PDF с уроками C2
```

---

## 🔊 Web Speech API

### Конфигурация

```javascript
function spk(text, rate = 0.88) {
  if (!speechSynthesis) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';    // Британский акцент
  u.rate = rate;        // Медленнее для начинающих
  speechSynthesis.speak(u);
}
```

### Поддержка браузеров

| Браузер | Поддержка |
|---------|-----------|
| Chrome Android | ✅ Полная |
| Samsung Internet | ✅ Полная |
| Safari iOS | ✅ Полная |
| Firefox Android | ⚠️ Частичная (нет en-GB на некоторых устройствах) |

### Ограничения

- Нет offline-голоса на некоторых Android (нужен интернет для скачивания голоса)
- Первый вызов может иметь задержку 1-2 секунды
- `speechSynthesis.cancel()` обязателен перед каждым новым воспроизведением

---

## 💾 LocalStorage Schema

```javascript
// Прогресс по уровням (массив ID пройденных уроков)
localStorage.setItem('fe_a1', JSON.stringify([1, 2, 3]));
localStorage.setItem('fe_a2', JSON.stringify([]));
localStorage.setItem('fe_b1', JSON.stringify([]));

// Выбранный язык интерфейса
localStorage.setItem('fe_lang', 'ru');  // ru | uz | tj | kg | kz

// Streak (дневная серия)
localStorage.setItem('fe_streak', '5');
localStorage.setItem('fe_last_date', '2026-04-24');

// Общее количество изученных слов
localStorage.setItem('fe_words', '90');

// ── СЕРТИФИКАТЫ ──────────────────────────────
// Выдаётся после 100% прохождения уровня
localStorage.setItem('fe_cert_a1_name',   'Ахмад Каримов'); // Имя студента
localStorage.setItem('fe_cert_a1_date',   '24 April 2026'); // Дата (en-GB)
localStorage.setItem('fe_cert_a1_issued', 'true');           // Флаг выдачи

// Аналогично для других уровней:
// fe_cert_a2_name, fe_cert_a2_date, fe_cert_a2_issued
// fe_cert_b1_name, fe_cert_b1_date, fe_cert_b1_issued
```

---

## 📦 Формат данных уроков

### Структура одного урока (JSON внутри `<script>`)

```javascript
{
  id: 1,
  mod: 1,                // ID модуля (группировка)
  name_ru: 'Привет! Я — Ахмад',
  name_uz: 'Salom! Men Ahmad',
  name_tj: 'Салом! Ман Аҳмад',
  name_kg: 'Салам! Мен Ахмад',
  name_kz: 'Сәлем! Мен Ахмад',
  cefr: 'am/is/are · Pronouns',  // CEFR теги

  grammar: {
    title_ru: '...', title_uz: '...', title_tj: '...', title_kg: '...',
    rule_ru: '...', rule_uz: '...', rule_tj: '...', rule_kg: '...',
    note_ru: '...', note_uz: '...', note_tj: '...', note_kg: '...',
    examples: [
      { en: '...', ru: '...', uz: '...', tj: '...', kg: '...', kz: '...' }
    ]
  },

  words: [   // ЦЕЛЬ: 30 слов на урок
    {
      e: '👋',           // Эмодзи
      en: 'Hello',       // Английское слово
      ru: 'Привет',      // Перевод RU
      uz: 'Salom',       // Перевод UZ
      tj: 'Салом',       // Перевод TJ
      kg: 'Салам',       // Перевод KG
      kz: 'Сәлем',       // Перевод KZ
      pn: '/həˈləʊ/'    // IPA транскрипция
    }
  ],

  dialogue: [  // ЦЕЛЬ: 10 реплик на урок
    {
      s: 'm',             // Спикер: m=manager, w=worker, c=cashier, d=doctor
      en: 'Good morning!',
      ru: 'Доброе утро!',
      uz: 'Xayrli tong!',
      tj: 'Субҳ бахайр!',
      kg: 'Кутман эртең!',
      kz: 'Қайырлы таң!'
    }
  ],

  quiz: [  // ЦЕЛЬ: 10 заданий на урок
    {
      q: 'Complete: "I ___ Ahmad."',    // Вопрос
      opts: ['am', 'is', 'are', 'be'],  // 4 варианта
      c: 0                              // Индекс правильного ответа
    }
  ]
}
```

---

## 🌐 Локализация (translations.js)

### Архитектура

- Внешний файл `translations.js` используется для `index.html` и модулей
- Объект `TRANSLATIONS` с ключами по языкам: `ru`, `uz`, `tj`, `kg`, `kz`
- Функция-хелпер `t(key, ...args)` возвращает строку на текущем языке
- **Автономность уроков:** В `a1.html` используется встроенный локальный словарь `TR` (вместо `translations.js`) для минимизации внешних запросов, ускорения рендеринга и полностью автономной работы урока.
- Fallback: если ключа нет в текущем языке → берётся из `ru`
- Язык сохраняется в `localStorage('fe_lang')`
- Синхронизация между `index.html` и `a1.html` происходит автоматически через localStorage

### Использование

```javascript
// В HTML-файле:
<script src="translations.js"></script>

// В коде:
t('nav_home')           // → "Главная" (если lang=ru)
t('done_of', 5, 15)     // → "5 / 15 уроков пройдено"
t('question_of', 1, 10) // → "Вопрос 1 из 10" (или "Savol 1 / 10" для UZ)
```

---

## 🔒 Система разблокировки уровней

```
A0-A1 → открыт всегда
A2    → открывается когда fe_a1.length >= количество уроков в A0-A1
B1    → открывается когда fe_a2.length >= количество уроков в A2
B2    → открывается когда fe_b1.length >= количество уроков в B1
С1    → открывается когда fe_b2.length >= количество уроков в B2
С2    → открывается когда fe_c1.length >= количество уроков в C1
```

---

## 📱 Поддержка устройств

| Устройство | Мин. ширина | Статус |
|-----------|-------------|--------|
| Смартфон (основной) | 320px | ✅ Оптимизирован |
| Планшет | 768px | ✅ Работает |
| Десктоп | 1024px+ | ⚠️ max-width: 430px |

### CSS стратегия

- `max-width: 430px` для контейнера `.app`
- `margin: 0 auto` для центрирования
- Touch targets: минимум 44×44px
- Font-size: минимум 14px для читаемости

---

## 🛡️ Version Control & Data Safety

Из-за того, что данные уроков (массив `LESSONS`) хранятся прямо внутри `a1.html`, любые случайные откаты через Git (например, `git checkout -- a1.html` или `git reset`) могут привести к потере данных, которые не восстанавливаются через `Ctrl+Z` в редакторе.

**Правила безопасной работы:**
1. **Частые коммиты:** Делайте коммиты после каждого успешно внедренного и проверенного урока или фикса дубликатов.
2. **Использование скриптов-инъекторов:** При масштабных изменениях массива `LESSONS` используйте скрипты в папке `scratch/` (например, `inject_lesson8.js` или `reapply_dedup.js`). Это позволяет быстро восстановить данные в случае отката Git.
3. **Резервные копии массива:** Перед опасными операциями сохраняйте текущий массив `LESSONS` в отдельный JSON файл.
4. **Регулярный аудит:** Запускайте `node scratch/audit.js` и `node scratch/check_duplicates.js` перед коммитами для проверки целостности данных.

---

## 🧪 Advanced Pedagogical Audit Workflow (Strict Compliance)

Для гарантии качества контента и 100% соответствия правилу Zero-level pedagogical consistency (описанному в `specs/content.md`), в проекте внедрен **обязательный автоматизированный аудит**. 

**Правило разработки:**
Разработчик/AI **не имеет права** считать урок готовым или делать коммит, пока не будут успешно пройдены 3 строгих аудита. Документация `specs/content.md` кодифицирована в этих скриптах.

### 1. Базовый и Грамматический Аудит (`scratch/audit.js`)
Этот скрипт проверяет жесткие требования к структуре урока:
- **Локализация:** Наличие всех ключей на 5 языках (`ru`, `uz`, `tj`, `kg`, `kz`).
- **Словарь и Диалоги:** Строго `words.length >= 30` и `dialogue.length >= 10`. Отсутствие сгруппированных слов (например, `wage / pay`).
- **Грамматика:** ОБЯЗАТЕЛЬНОЕ наличие 3 форм (`positive`, `negative`, `question`) и массива `table` внутри каждой. Сумма примеров в таблицах должна быть **>= 10**.

### 2. Дедупликация (`scratch/check_duplicates.js`)
Проверяет правило №10 (Уникальность словаря). Одно и то же английское слово не должно появляться в массиве `words` более чем в одном уроке во всем курсе.

### 3. Продвинутый Аудит («Снежный ком» и Фонетика) (`scratch/advanced_audit.js`)
Самый строгий скрипт для проверки педагогической логики:
- **Snowball Rule:** Парсит весь текст диалогов, грамматики и тестов текущего урока и проверяет, что *каждое* слово уже было изучено в словарях текущего или предыдущих уроков. Использование неизвестных слов вызывает критическую ошибку.
- **Фонетика:** Проверяет наличие полей `pn` (IPA) и `transcr` (кириллица) у каждого слова.
- **Quiz Tags:** Проверяет наличие обязательных тегов `[COMPLETE]` или `[TRANSLATE]` в вопросах тестов для корректного отображения UI.
- **Dialogue Alternation:** Строгое чередование спикеров (`m` / `w`) в диалогах.

**Команда для запуска всех аудитов:**
```bash
node scratch/audit.js && node scratch/check_duplicates.js && node scratch/advanced_audit.js
```
*Если массив ошибок пуст (`[]`), урок соответствует «Золотому стандарту» и может быть добавлен в релиз.*
