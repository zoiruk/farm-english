const fs = require('fs');

const file = 'a1.html';
const html = fs.readFileSync(file, 'utf8');

function locateBlock(text, id, nextId) {
  const candidates = [`"id": ${id},`, `id: ${id},`];
  let idPos = -1;
  for (const candidate of candidates) {
    idPos = text.indexOf(candidate);
    if (idPos !== -1) break;
  }
  if (idPos === -1) return null;
  const blockStart = text.lastIndexOf('    {', idPos);
  if (blockStart === -1) return null;

  const nextCandidates = [`"id": ${nextId},`, `id: ${nextId},`];
  let nextIdPos = -1;
  for (const candidate of nextCandidates) {
    nextIdPos = text.indexOf(candidate, idPos);
    if (nextIdPos !== -1) break;
  }
  if (nextIdPos === -1) return null;
  const blockEnd = text.lastIndexOf('    {', nextIdPos);
  if (blockEnd === -1) return null;
  return { start: blockStart, end: blockEnd };
}

const block = locateBlock(html, 11, 12);
if (!block) {
  throw new Error('Could not locate lesson 11 block');
}

const replacement = `    {
      "id": 11,
      "mod": 5,
      "name_ru": "Автобус в город",
      "name_uz": "Shaharga avtobus",
      "name_tj": "Автобус ба шаҳр",
      "name_kg": "Шаарга автобус",
      "name_kz": "Қалаға автобус",
      "cefr": "this / that / these / those · Transport · Buying a ticket",
      "grammar": {
        "title_ru": "THIS / THAT / THESE / THOSE в транспорте",
        "title_uz": "THIS / THAT / THESE / THOSE transportda",
        "title_tj": "THIS / THAT / THESE / THOSE дар нақлиёт",
        "title_kg": "THIS / THAT / THESE / THOSE транспортто",
        "title_kz": "THIS / THAT / THESE / THOSE көлікте",
        "intro_ru": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>this bus</code> = этот автобус</div><div><code>that stop</code> = та остановка</div><div><code>these tickets</code> = эти билеты</div><div><code>those platforms</code> = те платформы</div></div>",
        "intro_uz": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>this bus</code> = bu avtobus</div><div><code>that stop</code> = ana u bekat</div><div><code>these tickets</code> = bu chiptalar</div><div><code>those platforms</code> = ana u platformalar</div></div>",
        "intro_tj": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>this bus</code> = ин автобус</div><div><code>that stop</code> = он истгоҳ</div><div><code>these tickets</code> = ин билетҳо</div><div><code>those platforms</code> = он платформаҳо</div></div>",
        "intro_kg": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>this bus</code> = бул автобус</div><div><code>that stop</code> = тиги аялдама</div><div><code>these tickets</code> = бул билеттер</div><div><code>those platforms</code> = тиги платформалар</div></div>",
        "intro_kz": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>this bus</code> = мына автобус</div><div><code>that stop</code> = анау аялдама</div><div><code>these tickets</code> = мына билеттер</div><div><code>those platforms</code> = анау платформалар</div></div>",
        "note_ru": "<code>this/these</code> используем для близких предметов. <code>that/those</code> — для дальних. <code>this/that</code> для одного, <code>these/those</code> для нескольких.",
        "note_uz": "<code>this/these</code> yaqin narsa uchun. <code>that/those</code> uzoq narsa uchun. <code>this/that</code> birlik, <code>these/those</code> ko'plik.",
        "note_tj": "<code>this/these</code> барои чизи наздик. <code>that/those</code> барои чизи дур. <code>this/that</code> якка, <code>these/those</code> ҷамъ.",
        "note_kg": "<code>this/these</code> жакын нерсе үчүн. <code>that/those</code> алысыраак нерсе үчүн. <code>this/that</code> жекелик, <code>these/those</code> көптүк.",
        "note_kz": "<code>this/these</code> жақын нәрсеге. <code>that/those</code> алыс нәрсеге. <code>this/that</code> жекеше, <code>these/those</code> көпше.",
        "cultural_ru": "На кассе или у водителя в Британии часто говорят коротко и вежливо: <code>This bus to town?</code>, <code>These two tickets, please.</code>",
        "cultural_uz": "Britaniyada kassada yoki haydovchiga qisqa va muloyim gapirishadi: <code>This bus to town?</code>, <code>These two tickets, please.</code>",
        "cultural_tj": "Дар Бритониё назди касса ё ронанда кӯтоҳ ва боадаб мегӯянд: <code>This bus to town?</code>, <code>These two tickets, please.</code>",
        "cultural_kg": "Британияда кассада же айдоочуга кыска жана сылык айтышат: <code>This bus to town?</code>, <code>These two tickets, please.</code>",
        "cultural_kz": "Британияда кассада не жүргізушіге қысқа әрі сыпайы айтады: <code>This bus to town?</code>, <code>These two tickets, please.</code>",
        "forms": {
          "positive": {
            "label_ru": "Утверждение",
            "label_uz": "Tasdiq",
            "label_tj": "Тасдиқ",
            "label_kg": "Ырастоо",
            "label_kz": "Растау",
            "rule_ru": "Называем предмет и его число: <code>This bus is late.</code> <code>These tickets are valid.</code>",
            "rule_uz": "Narsa va uning sonini aytamiz: <code>This bus is late.</code> <code>These tickets are valid.</code>",
            "rule_tj": "Чиз ва шумораашро мегӯем: <code>This bus is late.</code> <code>These tickets are valid.</code>",
            "rule_kg": "Нерсени жана санын айтабыз: <code>This bus is late.</code> <code>These tickets are valid.</code>",
            "rule_kz": "Затты және санын айтамыз: <code>This bus is late.</code> <code>These tickets are valid.</code>",
            "table": [
              { "subj": "This bus", "verb": "is", "example": "This bus is for the city centre.", "transcr": "Зис бас из фо зэ сити сэнтэ", "tr_ru": "Этот автобус идёт в центр города.", "tr_uz": "Bu avtobus shahar markaziga boradi.", "tr_tj": "Ин автобус ба маркази шаҳр меравад.", "tr_kg": "Бул автобус шаардын борборуна барат.", "tr_kz": "Мына автобус қала орталығына барады." },
              { "subj": "That platform", "verb": "is", "example": "That platform is for the train.", "transcr": "Зэт платфом из фо зэ трэйн", "tr_ru": "Та платформа для поезда.", "tr_uz": "Ana u platforma poyezd uchun.", "tr_tj": "Он платформа барои қатора аст.", "tr_kg": "Тиги платформа поезд үчүн.", "tr_kz": "Анау платформа пойызға арналған." },
              { "subj": "These tickets", "verb": "are", "example": "These tickets are for today.", "transcr": "Зиз тикитс а фо тудэй", "tr_ru": "Эти билеты на сегодня.", "tr_uz": "Bu chiptalar bugun uchun.", "tr_tj": "Ин билетҳо барои имрӯзанд.", "tr_kg": "Бул билеттер бүгүн үчүн.", "tr_kz": "Мына билеттер бүгінге арналған." },
              { "subj": "Those seats", "verb": "are", "example": "Those seats are free now.", "transcr": "Зоуз ситс а фри нау", "tr_ru": "Те места сейчас свободны.", "tr_uz": "Ana u o'rindiqlar hozir bo'sh.", "tr_tj": "Он ҷойҳо ҳоло холӣ ҳастанд.", "tr_kg": "Тиги орундар азыр бош.", "tr_kz": "Анау орындар қазір бос." }
            ]
          },
          "negative": {
            "label_ru": "Отрицание",
            "label_uz": "Inkor",
            "label_tj": "Инкор",
            "label_kg": "Терс",
            "label_kz": "Теріс",
            "rule_ru": "Для отрицания ставим <code>is not / are not</code>: <code>This ticket is not valid.</code>",
            "rule_uz": "Inkor uchun <code>is not / are not</code> ishlatiladi: <code>This ticket is not valid.</code>",
            "rule_tj": "Барои инкор <code>is not / are not</code>: <code>This ticket is not valid.</code>",
            "rule_kg": "Терс форма үчүн <code>is not / are not</code>: <code>This ticket is not valid.</code>",
            "rule_kz": "Теріс форма үшін <code>is not / are not</code>: <code>This ticket is not valid.</code>",
            "table": [
              { "subj": "This ticket", "verb": "is not", "example": "This ticket is not for the bus.", "transcr": "Зис тикит из нот фо зэ бас", "tr_ru": "Этот билет не для автобуса.", "tr_uz": "Bu chipta avtobus uchun emas.", "tr_tj": "Ин билет барои автобус нест.", "tr_kg": "Бул билет автобус үчүн эмес.", "tr_kz": "Бұл билет автобусқа емес." },
              { "subj": "That stop", "verb": "is not", "example": "That stop is not near the station.", "transcr": "Зэт стоп из нот ниа зэ стэйшн", "tr_ru": "Та остановка не рядом со станцией.", "tr_uz": "Ana u bekat stansiya yonida emas.", "tr_tj": "Он истгоҳ назди истгоҳи қатор нест.", "tr_kg": "Тиги аялдама станцияга жакын эмес.", "tr_kz": "Анау аялдама станцияның жанында емес." },
              { "subj": "These buses", "verb": "are not", "example": "These buses are not going to London.", "transcr": "Зиз басиз а нот гоуин ту Ландан", "tr_ru": "Эти автобусы не едут в Лондон.", "tr_uz": "Bu avtobuslar Londonga ketmayapti.", "tr_tj": "Ин автобусҳо ба Лондон намераванд.", "tr_kg": "Бул автобустар Лондонго барбайт.", "tr_kz": "Мына автобустар Лондонға бармайды." }
            ]
          },
          "question": {
            "label_ru": "Вопрос",
            "label_uz": "Savol",
            "label_tj": "Савол",
            "label_kg": "Суроо",
            "label_kz": "Сұрақ",
            "rule_ru": "В вопросе выносим <code>is / are</code> вперёд: <code>Is this seat free?</code>",
            "rule_uz": "Savolda <code>is / are</code> oldinga chiqadi: <code>Is this seat free?</code>",
            "rule_tj": "Дар савол <code>is / are</code> ба аввал мебарояд: <code>Is this seat free?</code>",
            "rule_kg": "Суроодо <code>is / are</code> алдыга чыгат: <code>Is this seat free?</code>",
            "rule_kz": "Сұрақта <code>is / are</code> алдыға шығады: <code>Is this seat free?</code>",
            "table": [
              { "subj": "this seat", "verb": "Is", "example": "Is this seat free?", "transcr": "Из зис сит фри", "tr_ru": "Это место свободно?", "tr_uz": "Bu o'rindiq bo'shmi?", "tr_tj": "Ин ҷой холӣ аст?", "tr_kg": "Бул орун бошпу?", "tr_kz": "Бұл орын бос па?" },
              { "subj": "that bus", "verb": "Is", "example": "Is that bus for town?", "transcr": "Из зэт бас фо таун", "tr_ru": "Тот автобус в город?", "tr_uz": "Ana u avtobus shahargami?", "tr_tj": "Он автобус ба шаҳр меравад?", "tr_kg": "Тиги автобус шаарга барабы?", "tr_kz": "Анау автобус қалаға бара ма?" },
              { "subj": "these passes", "verb": "Are", "example": "Are these passes valid today?", "transcr": "А зиз пасиз валид тудэй", "tr_ru": "Эти проездные действуют сегодня?", "tr_uz": "Bu yo'l kartalari bugun amal qiladimi?", "tr_tj": "Ин роҳхатҳо имрӯз эътибор доранд?", "tr_kg": "Бул жол карталары бүгүн жарактуубу?", "tr_kz": "Бұл жол карталары бүгін жарамды ма?" }
            ]
          }
        }
      },
      "words": [
        { "e": "🚌", "en": "bus", "ru": "автобус", "uz": "avtobus", "tj": "автобус", "kg": "автобус", "kz": "автобус", "pn": "/bʌs/", "transcr": "бас" },
        { "e": "🎫", "en": "ticket", "ru": "билет", "uz": "chipta", "tj": "билет", "kg": "билет", "kz": "билет", "pn": "/ˈtɪkɪt/", "transcr": "тикит" },
        { "e": "🚏", "en": "bus stop", "ru": "автобусная остановка", "uz": "avtobus bekati", "tj": "истгоҳи автобус", "kg": "автобус аялдамасы", "kz": "автобус аялдамасы", "pn": "/ˈbʌs stɒp/", "transcr": "бас стоп" },
        { "e": "🚉", "en": "station", "ru": "станция", "uz": "stansiya", "tj": "истгоҳ", "kg": "станция", "kz": "станция", "pn": "/ˈsteɪʃən/", "transcr": "стейшн" },
        { "e": "🚆", "en": "train", "ru": "поезд", "uz": "poyezd", "tj": "қатора", "kg": "поезд", "kz": "пойыз", "pn": "/treɪn/", "transcr": "трэйн" },
        { "e": "🚖", "en": "taxi", "ru": "такси", "uz": "taksi", "tj": "таксӣ", "kg": "такси", "kz": "такси", "pn": "/ˈtæksi/", "transcr": "такси" },
        { "e": "🎟️", "en": "pass", "ru": "проездной", "uz": "yo'l kartasi", "tj": "роҳхат", "kg": "жол картасы", "kz": "жол картасы", "pn": "/pɑːs/", "transcr": "пас" },
        { "e": "🔁", "en": "return", "ru": "обратный билет", "uz": "qaytish chiptasi", "tj": "билети рафтуомад", "kg": "кайтуу билети", "kz": "қайту билеті", "pn": "/rɪˈtɜːn/", "transcr": "ритён" },
        { "e": "➡️", "en": "single", "ru": "в один конец", "uz": "bir tomonga", "tj": "яктарафа", "kg": "бир тарапка", "kz": "бір бағытқа", "pn": "/ˈsɪŋɡl/", "transcr": "сингл" },
        { "e": "🏙️", "en": "town centre", "ru": "центр города", "uz": "shahar markazi", "tj": "маркази шаҳр", "kg": "шаардын борбору", "kz": "қала орталығы", "pn": "/ˌtaʊn ˈsentə/", "transcr": "таун сэнтэ" },
        { "e": "🪑", "en": "seat", "ru": "место", "uz": "o'rindiq", "tj": "ҷой", "kg": "орун", "kz": "орын", "pn": "/siːt/", "transcr": "сит" },
        { "e": "🧍", "en": "platform", "ru": "платформа", "uz": "platforma", "tj": "платформа", "kg": "платформа", "kz": "платформа", "pn": "/ˈplætfɔːm/", "transcr": "платфом" },
        { "e": "🕒", "en": "timetable", "ru": "расписание", "uz": "jadval", "tj": "ҷадвал", "kg": "расписание", "kz": "кесте", "pn": "/ˈtaɪmteɪbl/", "transcr": "таймтэйбл" },
        { "e": "🔢", "en": "route", "ru": "маршрут", "uz": "yo'nalish", "tj": "масир", "kg": "каттам", "kz": "бағыт", "pn": "/ruːt/", "transcr": "рут" },
        { "e": "📍", "en": "destination", "ru": "пункт назначения", "uz": "manzil", "tj": "манзил", "kg": "бара турган жер", "kz": "баратын жер", "pn": "/ˌdestɪˈneɪʃən/", "transcr": "дестинейшн" },
        { "e": "🪙", "en": "fare", "ru": "стоимость проезда", "uz": "yo'l haqi", "tj": "кироя", "kg": "жол акысы", "kz": "жол ақысы", "pn": "/feə/", "transcr": "фэа" },
        { "e": "💳", "en": "card payment", "ru": "оплата картой", "uz": "karta to'lovi", "tj": "пардохт бо корт", "kg": "карта менен төлөм", "kz": "карта арқылы төлем", "pn": "/kɑːd ˈpeɪmənt/", "transcr": "кард пэймэнт" },
        { "e": "💵", "en": "cash fare", "ru": "оплата наличными", "uz": "naqd to'lov", "tj": "пардохти нақдӣ", "kg": "накталай төлөм", "kz": "қолма-қол төлем", "pn": "/kæʃ feə/", "transcr": "кэш фэа" },
        { "e": "🧾", "en": "receipt", "ru": "чек", "uz": "chek", "tj": "расид", "kg": "чек", "kz": "түбіртек", "pn": "/rɪˈsiːt/", "transcr": "рисит" },
        { "e": "👨‍✈️", "en": "driver", "ru": "водитель", "uz": "haydovchi", "tj": "ронанда", "kg": "айдоочу", "kz": "жүргізуші", "pn": "/ˈdraɪvə/", "transcr": "драйвэ" },
        { "e": "🙋", "en": "passenger", "ru": "пассажир", "uz": "yo'lovchi", "tj": "мусофир", "kg": "жүргүнчү", "kz": "жолаушы", "pn": "/ˈpæsɪndʒə/", "transcr": "пэсинджэ" },
        { "e": "🧳", "en": "luggage", "ru": "багаж", "uz": "yuk", "tj": "багаж", "kg": "жүк", "kz": "жүк", "pn": "/ˈlʌɡɪdʒ/", "transcr": "лагидж" },
        { "e": "↗️", "en": "departure", "ru": "отправление", "uz": "jo'nash", "tj": "рафтан", "kg": "жөнөө", "kz": "жөнелу", "pn": "/dɪˈpɑːtʃə/", "transcr": "дипача" },
        { "e": "↘️", "en": "arrival", "ru": "прибытие", "uz": "kelish", "tj": "расидан", "kg": "келүү", "kz": "келу", "pn": "/əˈraɪvəl/", "transcr": "эрайвл" },
        { "e": "🗓️", "en": "weekday", "ru": "будний день", "uz": "ish kuni", "tj": "рӯзи корӣ", "kg": "иш күнү", "kz": "жұмыс күні", "pn": "/ˈwiːkdeɪ/", "transcr": "уикдей" },
        { "e": "🎉", "en": "weekend service", "ru": "рейс выходного дня", "uz": "dam olish kuni reysi", "tj": "хатсайри рӯзҳои истироҳат", "kg": "дем алыш күнүндөгү каттам", "kz": "демалыс күнгі рейс", "pn": "/ˌwiːkend ˈsɜːvɪs/", "transcr": "уикэнд сёвис" },
        { "e": "🔤", "en": "this", "ru": "этот / эта / это", "uz": "bu", "tj": "ин", "kg": "бул", "kz": "мына", "pn": "/ðɪs/", "transcr": "зис" },
        { "e": "🔭", "en": "that", "ru": "тот / та / то", "uz": "ana u", "tj": "он", "kg": "тиги", "kz": "анау", "pn": "/ðæt/", "transcr": "зэт" },
        { "e": "🧩", "en": "these", "ru": "эти", "uz": "bular", "tj": "инҳо", "kg": "булар", "kz": "мыналар", "pn": "/ðiːz/", "transcr": "зиз" },
        { "e": "🛰️", "en": "those", "ru": "те", "uz": "anavilar", "tj": "онҳо", "kg": "тигилер", "kz": "анаулар", "pn": "/ðəʊz/", "transcr": "зоуз" }
      ],
      "dialogue": [
        { "s": "m", "en": "Excuse me, is this bus for the town centre?", "ru": "Извините, этот автобус идёт в центр города?", "uz": "Kechirasiz, bu avtobus shahar markaziga boradimi?", "tj": "Мебахшед, ин автобус ба маркази шаҳр меравад?", "kg": "Кечиресиз, бул автобус шаардын борборуна барабы?", "kz": "Кешіріңіз, мына автобус қала орталығына бара ма?", "transcr": "Экскьюз ми, из зис бас фо зэ таун сэнтэ" },
        { "s": "w", "en": "No, that bus is for the station. This one is for town.", "ru": "Нет, тот автобус идёт к станции. Этот — в город.", "uz": "Yo'q, ana u avtobus stansiyaga boradi. Bu esa shaharga.", "tj": "Не, он автобус ба истгоҳ меравад. Ин бошад ба шаҳр.", "kg": "Жок, тиги автобус станцияга барат. Бул болсо шаарга.", "kz": "Жоқ, анау автобус станцияға барады. Ал мынау қалаға.", "transcr": "Ноу, зэт бас из фо зэ стэйшн. Зис уан из фо таун" },
        { "s": "m", "en": "Thank you. Are these tickets for today?", "ru": "Спасибо. Эти билеты на сегодня?", "uz": "Rahmat. Bu chiptalar bugun uchunmi?", "tj": "Ташаккур. Ин билетҳо барои имрӯзанд?", "kg": "Рахмат. Бул билеттер бүгүн үчүнбү?", "kz": "Рахмет. Мына билеттер бүгінге ме?", "transcr": "Сэнк ю. А зиз тикитс фо тудэй" },
        { "s": "w", "en": "Yes, these tickets are valid today only.", "ru": "Да, эти билеты действуют только сегодня.", "uz": "Ha, bu chiptalar faqat bugun amal qiladi.", "tj": "Ҳа, ин билетҳо танҳо имрӯз эътибор доранд.", "kg": "Ооба, бул билеттер бүгүн гана жарактуу.", "kz": "Иә, бұл билеттер тек бүгін жарамды.", "transcr": "Йес, зиз тикитс а валид тудэй оунли" },
        { "s": "m", "en": "I need a single ticket, please. How much is this fare?", "ru": "Мне нужен билет в один конец, пожалуйста. Сколько стоит этот проезд?", "uz": "Menga bir tomonga chipta kerak, iltimos. Bu yo'l haqi qancha?", "tj": "Ба ман билети яктарафа лозим аст, лутфан. Ин кироя чанд аст?", "kg": "Мага бир тарапка билет керек, сураныч. Бул жол акысы канча?", "kz": "Маған бір бағытқа билет керек, өтінемін. Бұл жол ақысы қанша?", "transcr": "Ай нид э сингл тикит, плиз. Хау мач из зис фэа" },
        { "s": "w", "en": "This fare is three pounds. Card payment is fine.", "ru": "Этот проезд стоит три фунта. Картой платить можно.", "uz": "Bu yo'l haqi uch funt. Karta bilan to'lash mumkin.", "tj": "Ин кироя се фунт аст. Бо корт пардохт кардан мумкин.", "kg": "Бул жол акысы үч фунт. Карта менен төлөсө болот.", "kz": "Бұл жол ақысы үш фунт. Карта арқылы төлеуге болады.", "transcr": "Зис фэа из сри паундз. Кард пэймэнт из файн" },
        { "s": "m", "en": "Great. Is that seat free near the window?", "ru": "Отлично. То место у окна свободно?", "uz": "Ajoyib. Ana u deraza yonidagi o'rindiq bo'shmi?", "tj": "Олӣ. Он ҷойи назди тиреза холӣ аст?", "kg": "Сонун. Терезенин жанындагы тиги орун бошпу?", "kz": "Керемет. Терезе жанындағы анау орын бос па?", "transcr": "Грейт. Из зэт сит фри ниа зэ уиндоу" },
        { "s": "w", "en": "Yes, but those seats at the back are more comfortable.", "ru": "Да, но те места сзади удобнее.", "uz": "Ha, lekin anavi orqa o'rindiqlar qulayroq.", "tj": "Ҳа, аммо он ҷойҳои ақиб бароҳаттаранд.", "kg": "Ооба, бирок арттагы тиги орундар ыңгайлуураак.", "kz": "Иә, бірақ арттағы анау орындар ыңғайлырақ.", "transcr": "Йес, бат зоуз ситс эт зэ бак а мо камфтэбл" },
        { "s": "m", "en": "OK. What time is the departure from this stop?", "ru": "Хорошо. Во сколько отправление с этой остановки?", "uz": "Mayli. Bu bekatdan jo'nash soati nechada?", "tj": "Хуб. Аз ин истгоҳ соати чанд рафтан аст?", "kg": "Макул. Бул аялдамадан жөнөө сааты канчада?", "kz": "Жақсы. Бұл аялдамадан жөнелу сағаты нешеде?", "transcr": "Окей. Уот тайм из зэ дипача фром зис стоп" },
        { "s": "w", "en": "The timetable says ten thirty. Keep this receipt with your ticket.", "ru": "По расписанию в десять тридцать. Держите этот чек вместе с билетом.", "uz": "Jadvalda o'n o'ttiz deb yozilgan. Bu chekni chiptangiz bilan birga saqlang.", "tj": "Дар ҷадвал соати даҳу сӣ навишта шудааст. Ин расидро бо билетатон нигоҳ доред.", "kg": "Жадыбалда он отуз деп турат. Бул чекти билетиңиз менен бирге сактаңыз.", "kz": "Кестеде он отыз деп тұр. Мына түбіртекті билетіңізбен бірге сақтаңыз.", "transcr": "Зэ таймтэйбл сез тэн сёти. Кип зис рисит уиз ё тикит" }
      ],
      "quiz": [
        { "q": "[COMPLETE] \\"___ bus is for town.\\"", "opts": ["This", "Those", "These", "Them"], "c": 0, "hint_ru": "Этот автобус идёт в город.", "hint_uz": "Bu avtobus shaharga boradi.", "hint_tj": "Ин автобус ба шаҳр меравад.", "hint_kg": "Бул автобус шаарга барат.", "hint_kz": "Мына автобус қалаға барады." },
        { "q": "[COMPLETE] \\"___ tickets are valid today.\\"", "opts": ["These", "This", "That", "It"], "c": 0, "hint_ru": "Эти билеты действуют сегодня.", "hint_uz": "Bu chiptalar bugun amal qiladi.", "hint_tj": "Ин билетҳо имрӯз эътибор доранд.", "hint_kg": "Бул билеттер бүгүн жарактуу.", "hint_kz": "Бұл билеттер бүгін жарамды." },
        { "q": "[QUESTION]", "opts": ["Is that seat free?", "That seat is free?", "Does that seat free?", "Are that seat free?"], "c": 0, "hint_ru": "То место свободно?", "hint_uz": "Ana u o'rindiq bo'shmi?", "hint_tj": "Он ҷой холӣ аст?", "hint_kg": "Тиги орун бошпу?", "hint_kz": "Анау орын бос па?" },
        { "q": "[TRANSLATE]", "opts": ["ticket", "receipt", "driver", "fare"], "c": 0, "hint_ru": "билет", "hint_uz": "chipta", "hint_tj": "билет", "hint_kg": "билет", "hint_kz": "билет" },
        { "q": "[CORRECT]", "opts": ["Those seats are at the back.", "Those seat is at the back.", "That seats are at the back.", "Those seats is at the back."], "c": 0, "hint_ru": "Те места находятся сзади.", "hint_uz": "Anavi o'rindiqlar orqada.", "hint_tj": "Он ҷойҳо қафо ҳастанд.", "hint_kg": "Тиги орундар артта.", "hint_kz": "Анау орындар артта." },
        { "q": "[NEGATIVE]", "opts": ["This ticket is not valid.", "This ticket not is valid.", "This ticket does not valid.", "This ticket no valid."], "c": 0, "hint_ru": "Этот билет недействителен.", "hint_uz": "Bu chipta amal qilmaydi.", "hint_tj": "Ин билет эътибор надорад.", "hint_kg": "Бул билет жараксыз.", "hint_kz": "Бұл билет жарамсыз." },
        { "q": "[TRANSLATE]", "opts": ["station", "platform", "route", "luggage"], "c": 0, "hint_ru": "станция", "hint_uz": "stansiya", "hint_tj": "истгоҳ", "hint_kg": "станция", "hint_kz": "станция" },
        { "q": "[COMPLETE] \\"I need a ___ ticket.\\"", "opts": ["single", "those", "platform", "driver"], "c": 0, "hint_ru": "Мне нужен билет в один конец.", "hint_uz": "Menga bir tomonga chipta kerak.", "hint_tj": "Ба ман билети яктарафа лозим аст.", "hint_kg": "Мага бир тарапка билет керек.", "hint_kz": "Маған бір бағытқа билет керек." },
        { "q": "[QUESTION]", "opts": ["Are these passes valid today?", "Do these passes valid today?", "These passes are valid today?", "Is these passes valid today?"], "c": 0, "hint_ru": "Эти проездные действуют сегодня?", "hint_uz": "Bu yo'l kartalari bugun amal qiladimi?", "hint_tj": "Ин роҳхатҳо имрӯз эътибор доранд?", "hint_kg": "Бул жол карталары бүгүн жарактуубу?", "hint_kz": "Бұл жол карталары бүгін жарамды ма?" },
        { "q": "[TRANSLATE]", "opts": ["fare", "arrival", "weekday", "passenger"], "c": 0, "hint_ru": "стоимость проезда", "hint_uz": "yo'l haqi", "hint_tj": "кироя", "hint_kg": "жол акысы", "hint_kz": "жол ақысы" }
      ]
    },`;

fs.writeFileSync(file, html.slice(0, block.start) + replacement + html.slice(block.end), 'utf8');
console.log('Lesson 11 replaced');
