/**
 * build_b1_l10.js — author B1 Lesson 10 "Зарплата и трудовой договор".
 * Grammar: Passive voice (am/is/are + past participle — "you are paid", "tax is deducted").
 * Module 5 (Money & Rights). Dialogue: m (HR/manager) / w (worker).
 *
 * Dry-run by default; --apply injects into b1.html LESSONS (MODS finalised after L12).
 * Translations: ru/en authored; uz/tj/kg/kz are AI drafts flagged for native review.
 */
const fs = require('fs');
const path = require('path');

const grid = (rows) =>
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">' +
  rows.map(([en, tr, ru]) => `<div><code>${en}</code> <span class="g-transcr">[${tr}]</span> (${ru})</div>`).join('') +
  '</div>';

const L10 = {
  id: 10,
  mod: 5,
  name_ru: 'Зарплата и трудовой договор',
  name_uz: 'Maosh va mehnat shartnomasi',
  name_tj: 'Маош ва шартномаи меҳнатӣ',
  name_kg: 'Эмгек акы жана эмгек келишими',
  name_kz: 'Жалақы және еңбек шарты',
  cefr: 'Passive voice (am/is/are + past participle)',
  grammar: {
    title_ru: 'PASSIVE VOICE — когда важно действие, а не кто его делает',
    title_uz: 'PASSIVE VOICE — kim qilgani emas, ish muhim bo\'lganda',
    title_tj: 'PASSIVE VOICE — вақте амал муҳим аст, на иҷрокунанда',
    title_kg: 'PASSIVE VOICE — ким кылганы эмес, иштин өзү маанилүү болгондо',
    title_kz: 'PASSIVE VOICE — кім істегені емес, әрекеттің өзі маңызды болғанда',
    intro_ru: '<div style="line-height:1.6">Используйте <b>пассив</b> (<b>am/is/are</b> + 3-я форма глагола), когда важно само действие, а не кто его делает. Это язык расчётных листков и договоров.<br>✅ <i>You <b>are paid</b> every Friday.</i><br>✅ <i>Tax <b>is deducted</b> from your wages.</i><br>✅ <i>Holidays <b>are calculated</b> by hours.</i></div>',
    intro_uz: '<div style="line-height:1.6"><b>Passive</b> (<b>am/is/are</b> + fe\'lning 3-shakli) ish kim qilgani emas, balki ishning o\'zi muhim bo\'lganda ishlatiladi. Bu payslip va shartnomalar tili.<br>✅ <i>You are paid every Friday.</i><br>✅ <i>Tax is deducted from your wages.</i></div>',
    intro_tj: '<div style="line-height:1.6"><b>Passive</b> (<b>am/is/are</b> + шакли 3-юми феъл) вақте истифода мешавад, ки худи амал муҳим аст, на иҷрокунанда. Ин забони payslip ва шартномаҳост.<br>✅ <i>You are paid every Friday.</i><br>✅ <i>Tax is deducted from your wages.</i></div>',
    intro_kg: '<div style="line-height:1.6"><b>Passive</b> (<b>am/is/are</b> + этиштин 3-формасы) ишти ким кылганы эмес, иштин өзү маанилүү болгондо колдонулат. Бул payslip жана келишимдердин тили.<br>✅ <i>You are paid every Friday.</i></div>',
    intro_kz: '<div style="line-height:1.6"><b>Passive</b> (<b>am/is/are</b> + етістіктің 3-формасы) істі кім істегені емес, әрекеттің өзі маңызды болғанда қолданылады. Бұл payslip пен шарттардың тілі.<br>✅ <i>You are paid every Friday.</i></div>',
    cultural_ru: 'По закону Великобритании каждый работник должен получать payslip с показанными вычетами (tax и National Insurance). Зарплата не может быть ниже National Minimum Wage. Перед началом работы вам должны выдать письменный трудовой договор. Если что-то удержано неправильно — это можно оспорить, и в этом помогает trade union.',
    cultural_uz: 'Buyuk Britaniya qonuniga ko\'ra, har bir ishchi ushlab qolinganlar (tax va National Insurance) ko\'rsatilgan payslip olishi shart. Maosh National Minimum Wage\'dan past bo\'la olmaydi. Ishdan oldin sizga yozma shartnoma berilishi kerak.',
    cultural_tj: 'Тибқи қонуни Британияи Кабир ҳар коргар бояд payslip-и бо тарҳҳо (tax ва National Insurance) нишондодашуда гирад. Маош аз National Minimum Wage пасттар буда наметавонад. Пеш аз кор ба шумо бояд шартномаи хаттӣ диҳанд.',
    cultural_kg: 'Улуу Британиянын мыйзамы боюнча ар бир жумушчу кармап калуулар (tax жана National Insurance) көрсөтүлгөн payslip алышы керек. Эмгек акы National Minimum Wage\'ден төмөн боло албайт.',
    cultural_kz: 'Ұлыбритания заңы бойынша әр жұмысшы ұсталымдар (tax және National Insurance) көрсетілген payslip алуы тиіс. Жалақы National Minimum Wage-ден төмен бола алмайды. Жұмыс алдында сізге жазбаша шарт берілуі керек.',
    note_ru: '⚠️ Пассив = форма be (am/is/are) + 3-я форма. Не путайте: "I pay" (я плачу) ≠ "I am paid" (мне платят)!',
    note_uz: '⚠️ Passive = be (am/is/are) + 3-shakl. Adashtirmang: "I pay" (men to\'layman) ≠ "I am paid" (menga to\'lanadi)!',
    note_tj: '⚠️ Passive = be (am/is/are) + шакли 3. Иштибоҳ накунед: "I pay" (ман медиҳам) ≠ "I am paid" (ба ман медиҳанд)!',
    note_kg: '⚠️ Passive = be (am/is/are) + 3-форма. Чаташтырбаңыз: "I pay" (мен төлөйм) ≠ "I am paid" (мага төлөнөт)!',
    note_kz: '⚠️ Passive = be (am/is/are) + 3-форма. Шатастырмаңыз: "I pay" (мен төлеймін) ≠ "I am paid" (маған төленеді)!',
    forms: {
      positive: {
        label_ru: '✅ Утверждение', label_uz: '✅ Tasdiq', label_tj: '✅ Тасдиқ', label_kg: '✅ Ырастоо', label_kz: '✅ Растау',
        rule_ru: grid([
          ['You are paid', 'ю а пэйд', 'тебе платят'],
          ['Tax is deducted', 'тэкс из дидактид', 'налог удерживается'],
          ['Wages are calculated', 'уэйджиз а кэлкьюлэйтид', 'зарплата рассчитывается'],
          ['It is signed', 'ит из сайнд', 'это подписано'],
        ]),
        rule_uz: grid([
          ['You are paid', 'ю а пэйд', 'sizga to\'lanadi'],
          ['Tax is deducted', 'тэкс из дидактид', 'soliq ushlab qolinadi'],
          ['Wages are calculated', 'уэйджиз а кэлкьюлэйтид', 'maosh hisoblanadi'],
          ['It is signed', 'ит из сайнд', 'u imzolanadi'],
        ]),
        rule_tj: grid([
          ['You are paid', 'ю а пэйд', 'ба шумо медиҳанд'],
          ['Tax is deducted', 'тэкс из дидактид', 'андоз тарҳ мешавад'],
          ['Wages are calculated', 'уэйджиз а кэлкьюлэйтид', 'маош ҳисоб карда мешавад'],
          ['It is signed', 'ит из сайнд', 'он имзо мешавад'],
        ]),
        rule_kg: grid([
          ['You are paid', 'ю а пэйд', 'сизге төлөнөт'],
          ['Tax is deducted', 'тэкс из дидактид', 'салык кармалат'],
          ['Wages are calculated', 'уэйджиз а кэлкьюлэйтид', 'эмгек акы эсептелет'],
          ['It is signed', 'ит из сайнд', 'ал кол коюлат'],
        ]),
        rule_kz: grid([
          ['You are paid', 'ю а пэйд', 'сізге төленеді'],
          ['Tax is deducted', 'тэкс из дидактид', 'салық ұсталады'],
          ['Wages are calculated', 'уэйджиз а кэлкьюлэйтид', 'жалақы есептеледі'],
          ['It is signed', 'ит из сайнд', 'ол қол қойылады'],
        ]),
        table: [
          { subj: 'You', verb: 'are paid', example: 'You are paid every Friday by bank transfer.', transcr: 'Ю а пэйд эври фрайдэй бай бэнк трансфэ', tr_ru: 'Вам платят каждую пятницу банковским переводом.', tr_uz: 'Sizga har juma bank o\'tkazmasi orqali to\'lanadi.', tr_tj: 'Ба шумо ҳар рӯзи ҷумъа тавассути интиқоли бонкӣ медиҳанд.', tr_kg: 'Сизге ар жума банк которуу аркылуу төлөнөт.', tr_kz: 'Сізге әр жұма банк аударымы арқылы төленеді.' },
          { subj: 'Tax', verb: 'is deducted', example: 'Tax is deducted from your wages automatically.', transcr: 'Тэкс из дидактид фром ё уэйджиз отомэтикли', tr_ru: 'Налог удерживается из вашей зарплаты автоматически.', tr_uz: 'Soliq maoshingizdan avtomatik ravishda ushlab qolinadi.', tr_tj: 'Андоз аз маоши шумо ба таври худкор тарҳ мешавад.', tr_kg: 'Салык эмгек акыңыздан автоматтык түрдө кармалат.', tr_kz: 'Салық жалақыңыздан автоматты түрде ұсталады.' },
          { subj: 'Holidays', verb: 'are calculated', example: 'Holidays are calculated by the hours you work.', transcr: 'Холидэйз а кэлкьюлэйтид бай зи ауэз ю уёк', tr_ru: 'Отпуск рассчитывается по часам, которые вы работаете.', tr_uz: 'Ta\'tillar siz ishlagan soatlar bo\'yicha hisoblanadi.', tr_tj: 'Рухсатиҳо аз рӯи соатҳое, ки шумо кор мекунед, ҳисоб карда мешаванд.', tr_kg: 'Эс алуу сиз иштеген сааттар боюнча эсептелет.', tr_kz: 'Демалыс сіз істеген сағаттар бойынша есептеледі.' },
          { subj: 'The contract', verb: 'is signed', example: 'The contract is signed before your first day.', transcr: 'Зэ контракт из сайнд бифо ё фёст дэй', tr_ru: 'Договор подписывается до вашего первого дня.', tr_uz: 'Shartnoma birinchi kuningizdan oldin imzolanadi.', tr_tj: 'Шартнома пеш аз рӯзи аввали шумо имзо мешавад.', tr_kg: 'Келишим биринчи күнүңүздөн мурун кол коюлат.', tr_kz: 'Шарт бірінші күніңізден бұрын қол қойылады.' },
        ],
      },
      negative: {
        label_ru: '❌ Отрицание', label_uz: '❌ Inkor', label_tj: '❌ Инкор', label_kg: '❌ Тангуу', label_kz: '❌ Болымсыз',
        rule_ru: grid([
          ['You are not paid', 'ю а нот пэйд', 'тебе не платят'],
          ['in cash', 'ин кэш', 'наличными'],
          ['Overtime is not', 'оувэтайм из нот', 'сверхурочные не'],
          ['included', 'инклудид', 'включены'],
        ]),
        rule_uz: grid([
          ['You are not paid', 'ю а нот пэйд', 'sizga to\'lanmaydi'],
          ['in cash', 'ин кэш', 'naqd pulda'],
          ['Overtime is not', 'оувэтайм из нот', 'qo\'shimcha ish'],
          ['included', 'инклудид', 'kiritilmagan'],
        ]),
        rule_tj: grid([
          ['You are not paid', 'ю а нот пэйд', 'ба шумо намедиҳанд'],
          ['in cash', 'ин кэш', 'бо пули нақд'],
          ['Overtime is not', 'оувэтайм из нот', 'кори изофа'],
          ['included', 'инклудид', 'дохил карда нашудааст'],
        ]),
        rule_kg: grid([
          ['You are not paid', 'ю а нот пэйд', 'сизге төлөнбөйт'],
          ['in cash', 'ин кэш', 'накталай'],
          ['Overtime is not', 'оувэтайм из нот', 'кошумча иш'],
          ['included', 'инклудид', 'киргизилген эмес'],
        ]),
        rule_kz: grid([
          ['You are not paid', 'ю а нот пэйд', 'сізге төленбейді'],
          ['in cash', 'ин кэш', 'қолма-қол'],
          ['Overtime is not', 'оувэтайм из нот', 'қосымша жұмыс'],
          ['included', 'инклудид', 'енгізілмеген'],
        ]),
        table: [
          { subj: 'You', verb: 'are not paid', example: 'You are not paid in cash; money is sent to your bank.', transcr: 'Ю а нот пэйд ин кэш; мани из сэнт ту ё бэнк', tr_ru: 'Вам не платят наличными; деньги отправляются на ваш банк.', tr_uz: 'Sizga naqd pulda to\'lanmaydi; pul bankingizga yuboriladi.', tr_tj: 'Ба шумо бо пули нақд намедиҳанд; пул ба бонки шумо фиристода мешавад.', tr_kg: 'Сизге накталай төлөнбөйт; акча банкыңызга жөнөтүлөт.', tr_kz: 'Сізге қолма-қол төленбейді; ақша банкіңізге жіберіледі.' },
          { subj: 'Overtime', verb: 'is not included', example: 'Overtime is not included in the basic wage.', transcr: 'Оувэтайм из нот инклудид ин зэ бэйсик уэйдж', tr_ru: 'Сверхурочные не включены в базовую зарплату.', tr_uz: 'Qo\'shimcha ish asosiy maoshga kiritilmagan.', tr_tj: 'Кори изофа ба маоши асосӣ дохил карда нашудааст.', tr_kg: 'Кошумча иш негизги эмгек акыга киргизилген эмес.', tr_kz: 'Қосымша жұмыс негізгі жалақыға енгізілмеген.' },
          { subj: 'The pension', verb: 'is not taken', example: "The pension is not taken if you opt out of the scheme.", transcr: 'Зэ пэншн из нот тэйкэн иф ю опт аут оф зэ ским', tr_ru: 'Пенсионный взнос не берётся, если вы выходите из схемы.', tr_uz: 'Agar siz sxemadan chiqsangiz, pension olinmaydi.', tr_tj: 'Агар шумо аз нақша бароед, нафақа гирифта намешавад.', tr_kg: 'Эгер сиз схемадан чыксаңыз, пенсия алынбайт.', tr_kz: 'Егер сіз схемадан шықсаңыз, зейнетақы алынбайды.' },
        ],
      },
      question: {
        label_ru: '❓ Вопрос', label_uz: '❓ Savol', label_tj: '❓ Савол', label_kg: '❓ Суроо', label_kz: '❓ Сұрақ',
        rule_ru: grid([
          ['How are wages paid?', 'хау а уэйджиз пэйд', 'как платят зарплату?'],
          ['Is tax deducted?', 'из тэкс дидактид', 'налог удерживается?'],
          ['When are you paid?', 'уэн а ю пэйд', 'когда вам платят?'],
          ['Is it included?', 'из ит инклудид', 'это включено?'],
        ]),
        rule_uz: grid([
          ['How are wages paid?', 'хау а уэйджиз пэйд', 'maosh qanday to\'lanadi?'],
          ['Is tax deducted?', 'из тэкс дидактид', 'soliq ushlanadimi?'],
          ['When are you paid?', 'уэн а ю пэйд', 'sizga qachon to\'lanadi?'],
          ['Is it included?', 'из ит инклудид', 'u kiritilganmi?'],
        ]),
        rule_tj: grid([
          ['How are wages paid?', 'хау а уэйджиз пэйд', 'маош чӣ тавр дода мешавад?'],
          ['Is tax deducted?', 'из тэкс дидактид', 'андоз тарҳ мешавад?'],
          ['When are you paid?', 'уэн а ю пэйд', 'ба шумо кай медиҳанд?'],
          ['Is it included?', 'из ит инклудид', 'он дохил аст?'],
        ]),
        rule_kg: grid([
          ['How are wages paid?', 'хау а уэйджиз пэйд', 'эмгек акы кантип төлөнөт?'],
          ['Is tax deducted?', 'из тэкс дидактид', 'салык кармалабы?'],
          ['When are you paid?', 'уэн а ю пэйд', 'сизге качан төлөнөт?'],
          ['Is it included?', 'из ит инклудид', 'ал киргизилгенби?'],
        ]),
        rule_kz: grid([
          ['How are wages paid?', 'хау а уэйджиз пэйд', 'жалақы қалай төленеді?'],
          ['Is tax deducted?', 'из тэкс дидактид', 'салық ұсталады ма?'],
          ['When are you paid?', 'уэн а ю пэйд', 'сізге қашан төленеді?'],
          ['Is it included?', 'из ит инклудид', 'ол енгізілген бе?'],
        ]),
        table: [
          { subj: 'How', verb: 'are ... paid', example: 'How are the wages paid here — weekly or monthly?', transcr: 'Хау а зэ уэйджиз пэйд хиэ — уикли о мансли', tr_ru: 'Как здесь платят зарплату — еженедельно или ежемесячно?', tr_uz: 'Bu yerda maosh qanday to\'lanadi — haftalikmi yoki oylikmi?', tr_tj: 'Дар ин ҷо маош чӣ тавр дода мешавад — ҳафтаина ё моҳона?', tr_kg: 'Бул жерде эмгек акы кантип төлөнөт — жума сайынбы же ай сайынбы?', tr_kz: 'Мұнда жалақы қалай төленеді — апта сайын ба әлде ай сайын ба?' },
          { subj: 'Is', verb: 'tax deducted', example: 'Is tax deducted before or after the pension?', transcr: 'Из тэкс дидактид бифо о афтэ зэ пэншн', tr_ru: 'Налог удерживается до или после пенсионного взноса?', tr_uz: 'Soliq pensiyadan oldin yoki keyin ushlanadimi?', tr_tj: 'Андоз пеш аз нафақа ё пас аз он тарҳ мешавад?', tr_kg: 'Салык пенсиядан мурунбу же кийинби кармалат?', tr_kz: 'Салық зейнетақыдан бұрын ба әлде кейін ұсталады ма?' },
          { subj: 'When', verb: 'are you paid', example: 'When are you paid if a bank holiday falls on Friday?', transcr: 'Уэн а ю пэйд иф э бэнк холидэй фолз он фрайдэй', tr_ru: 'Когда вам платят, если выходной банка выпадает на пятницу?', tr_uz: 'Agar bank dam olish kuni jumaga to\'g\'ri kelsa, sizga qachon to\'lanadi?', tr_tj: 'Агар рӯзи истироҳати бонкӣ ба ҷумъа рост ояд, ба шумо кай медиҳанд?', tr_kg: 'Эгер банк дем алыш күнү жумага туура келсе, сизге качан төлөнөт?', tr_kz: 'Егер банк демалыс күні жұмаға сәйкес келсе, сізге қашан төленеді?' },
        ],
      },
    },
  },
  words: [
    { e: '🧑‍🌾', en: 'employee', pn: '/ɪmˈplɔɪiː/', transcr: 'имплойи', ru: 'работник (наёмный)', uz: 'xodim', tj: 'корманд', kg: 'кызматкер', kz: 'қызметкер' },
    { e: '📆', en: 'payday', pn: '/ˈpeɪdeɪ/', transcr: 'пэйдэй', ru: 'день зарплаты', uz: 'maosh kuni', tj: 'рӯзи маош', kg: 'эмгек акы күнү', kz: 'жалақы күні' },
    { e: '💰', en: 'take-home', pn: '/ˈteɪk həʊm/', transcr: 'тэйк-хоум', ru: 'на руки (после вычетов)', uz: 'qo\'lga tegadigan', tj: 'ба даст (пас аз тарҳ)', kg: 'колго тийген', kz: 'қолға тиетін' },
    { e: '👴', en: 'pension', pn: '/ˈpenʃn/', transcr: 'пэншн', ru: 'пенсия (взнос)', uz: 'pensiya', tj: 'нафақа', kg: 'пенсия', kz: 'зейнетақы' },
    { e: '🤝', en: 'commission', pn: '/kəˈmɪʃn/', transcr: 'кэмишн', ru: 'комиссия (% с продаж)', uz: 'komissiya', tj: 'комиссия (фоиз)', kg: 'комиссия', kz: 'комиссия' },
    { e: '🎫', en: 'allowance', pn: '/əˈlaʊəns/', transcr: 'элауэнс', ru: 'надбавка (пособие)', uz: 'nafaqa (qo\'shimcha)', tj: 'кӯмакпулӣ (изофа)', kg: 'кошумча (жөлөкпул)', kz: 'жәрдемақы (қосымша)' },
    { e: '📊', en: 'bracket', pn: '/ˈbrækɪt/', transcr: 'брэкит', ru: 'налоговая категория', uz: 'soliq toifasi', tj: 'гурӯҳи андоз', kg: 'салык категориясы', kz: 'салық санаты' },
    { e: '↩️', en: 'rebate', pn: '/ˈriːbeɪt/', transcr: 'рибэйт', ru: 'возврат (налога)', uz: 'qaytarma (soliq)', tj: 'баргардонӣ (андоз)', kg: 'кайтаруу (салык)', kz: 'қайтарым (салық)' },
    { e: '✂️', en: 'withhold', pn: '/wɪðˈhəʊld/', transcr: 'уизхоулд', ru: 'удерживать (не выдавать)', uz: 'ushlab qolmoq', tj: 'нигоҳ доштан (тарҳ)', kg: 'кармап калуу', kz: 'ұстап қалу' },
    { e: '🧮', en: 'calculate', pn: '/ˈkælkjuleɪt/', transcr: 'кэлкьюлэйт', ru: 'рассчитывать', uz: 'hisoblamoq', tj: 'ҳисоб кардан', kg: 'эсептөө', kz: 'есептеу' },
    { e: '🧾', en: 'payee', pn: '/peɪˈiː/', transcr: 'пэйи', ru: 'получатель платежа', uz: 'pul oluvchi', tj: 'гирандаи пул', kg: 'акча алуучу', kz: 'төлем алушы' },
    { e: '📈', en: 'increment', pn: '/ˈɪŋkrəmənt/', transcr: 'инкримэнт', ru: 'прибавка (ступень)', uz: 'oshirma (bosqich)', tj: 'афзоиш (зина)', kg: 'көбөйтүү (тепкич)', kz: 'өсім (саты)' },
    { e: '📋', en: 'scheme', pn: '/skiːm/', transcr: 'ским', ru: 'схема (программа)', uz: 'sxema (dastur)', tj: 'нақша (барнома)', kg: 'схема (программа)', kz: 'схема (бағдарлама)' },
    { e: '✍️', en: 'enrol', pn: '/ɪnˈrəʊl/', transcr: 'инроул', ru: 'записаться (вступить)', uz: 'ro\'yxatdan o\'tmoq', tj: 'ба қайд гирифтан', kg: 'катталуу', kz: 'тіркелу' },
    { e: '📜', en: 'agreement', pn: '/əˈɡriːmənt/', transcr: 'эгримэнт', ru: 'соглашение', uz: 'kelishuv', tj: 'созишнома', kg: 'макулдашуу', kz: 'келісім' },
    { e: '✅', en: 'entitled', pn: '/ɪnˈtaɪtld/', transcr: 'интайтлд', ru: 'имеющий право', uz: 'huquqli', tj: 'ҳуқуқдор', kg: 'укуктуу', kz: 'құқылы' },
    { e: '⚖️', en: 'statutory', pn: '/ˈstætʃətri/', transcr: 'стэтьютри', ru: 'установленный законом', uz: 'qonuniy belgilangan', tj: 'муқарраршудаи қонунӣ', kg: 'мыйзам менен белгиленген', kz: 'заңмен белгіленген' },
    { e: '🪧', en: 'trade union', pn: '/ˈtreɪd juːniən/', transcr: 'трэйд юниэн', ru: 'профсоюз', uz: 'kasaba uyushmasi', tj: 'иттифоқи касаба', kg: 'кесиптик бирлик', kz: 'кәсіподақ' },
    { e: '🏭', en: 'workplace', pn: '/ˈwɜːkpleɪs/', transcr: 'уёкплэйс', ru: 'рабочее место (предприятие)', uz: 'ish joyi', tj: 'ҷои кор', kg: 'жумуш орду', kz: 'жұмыс орны' },
    { e: '👍', en: 'lawful', pn: '/ˈlɔːfl/', transcr: 'лофул', ru: 'законный', uz: 'qonuniy', tj: 'қонунӣ', kg: 'мыйзамдуу', kz: 'заңды' },
    { e: '👎', en: 'unlawful', pn: '/ʌnˈlɔːfl/', transcr: 'анлофул', ru: 'незаконный', uz: 'noqonuniy', tj: 'ғайриқонунӣ', kg: 'мыйзамсыз', kz: 'заңсыз' },
    { e: '🛡️', en: 'guarantee', pn: '/ˌɡærənˈtiː/', transcr: 'гэрэнти', ru: 'гарантия', uz: 'kafolat', tj: 'кафолат', kg: 'кепилдик', kz: 'кепілдік' },
    { e: '⏳', en: 'fixed-term', pn: '/fɪkst tɜːm/', transcr: 'фикст-тём', ru: 'срочный (контракт)', uz: 'muddatli (shartnoma)', tj: 'мӯҳлатнок (шартнома)', kg: 'мөөнөттүү (келишим)', kz: 'мерзімді (шарт)' },
    { e: '0️⃣', en: 'zero-hours', pn: '/ˈzɪərəʊ aʊəz/', transcr: 'зиэроу-ауэз', ru: 'без фикс. часов (контракт)', uz: 'nol soatli (shartnoma)', tj: 'бе соати муайян (шартнома)', kg: 'нөл сааттык (келишим)', kz: 'нөл сағаттық (шарт)' },
    { e: '🩳', en: 'casual', pn: '/ˈkæʒuəl/', transcr: 'кэжуэл', ru: 'временный (нерегулярный)', uz: 'vaqtinchalik (tartibsiz)', tj: 'муваққатӣ (номунтазам)', kg: 'убактылуу (туруксуз)', kz: 'уақытша (тұрақсыз)' },
    { e: '🏢', en: 'agency', pn: '/ˈeɪdʒənsi/', transcr: 'эйджэнси', ru: 'агентство (по найму)', uz: 'agentlik', tj: 'агентӣ', kg: 'агенттик', kz: 'агенттік' },
    { e: '💸', en: 'owed', pn: '/əʊd/', transcr: 'оуд', ru: 'причитающийся (должны)', uz: 'qarzdor (tegishli)', tj: 'қарздор (тааллуқдошта)', kg: 'карыз (тиешелүү)', kz: 'қарыз (тиесілі)' },
    { e: '🙋', en: 'claim', pn: '/kleɪm/', transcr: 'клэйм', ru: 'требовать (заявлять)', uz: 'talab qilmoq', tj: 'талаб кардан', kg: 'талап кылуу', kz: 'талап ету' },
    { e: '☑️', en: 'approve', pn: '/əˈpruːv/', transcr: 'эпрув', ru: 'одобрять (утверждать)', uz: 'tasdiqlamoq', tj: 'тасдиқ кардан', kg: 'жактыруу', kz: 'мақұлдау' },
    { e: '🔑', en: 'authorise', pn: '/ˈɔːθəraɪz/', transcr: 'осэрайз', ru: 'разрешать (санкционировать)', uz: 'ruxsat bermoq', tj: 'иҷозат додан', kg: 'уруксат берүү', kz: 'рұқсат беру' },
  ],
  dialogue: [
    { s: 'w', en: 'Hello. I have my first payslip, but I do not understand it.', transcr: 'Хэлоу. Ай хэв май фёст пэйслип, бат ай ду нот андэстэнд ит.', ru: 'Здравствуйте. У меня первый расчётный лист, но я его не понимаю.', uz: 'Salom. Mening birinchi payslipim bor, lekin uni tushunmayapman.', tj: 'Салом. Ман payslip-и аввалинамро дорам, аммо онро намефаҳмам.', kg: 'Саламатсызбы. Менде биринчи payslip бар, бирок аны түшүнбөй жатам.', kz: 'Сәлеметсіз бе. Менде бірінші payslip бар, бірақ оны түсінбеймін.' },
    { s: 'm', en: 'No problem. You are paid every Friday by bank transfer.', transcr: 'Ноу проблэм. Ю а пэйд эври фрайдэй бай бэнк трансфэ.', ru: 'Без проблем. Вам платят каждую пятницу банковским переводом.', uz: 'Muammo yo\'q. Sizga har juma bank o\'tkazmasi orqali to\'lanadi.', tj: 'Мушкилӣ нест. Ба шумо ҳар ҷумъа тавассути интиқоли бонкӣ медиҳанд.', kg: 'Көйгөй жок. Сизге ар жума банк которуу аркылуу төлөнөт.', kz: 'Мәселе жоқ. Сізге әр жұма банк аударымы арқылы төленеді.' },
    { s: 'w', en: 'Why is the take-home money less than my wage?', transcr: 'Уай из зэ тэйк-хоум мани лес зэн май уэйдж?', ru: 'Почему сумма на руки меньше моей зарплаты?', uz: 'Nega qo\'lga tegadigan pul maoshimdan kam?', tj: 'Чаро пули ба даст аз маошам камтар аст?', kg: 'Эмне үчүн колго тийген акча эмгек акымдан аз?', kz: 'Неге қолға тиетін ақша жалақымнан аз?' },
    { s: 'm', en: 'Tax is deducted, and a pension is taken if you enrol in the scheme.', transcr: 'Тэкс из дидактид, энд э пэншн из тэйкэн иф ю инроул ин зэ ским.', ru: 'Удерживается налог, и берётся пенсионный взнос, если вы вступили в схему.', uz: 'Soliq ushlab qolinadi va agar sxemaga yozilsangiz, pension olinadi.', tj: 'Андоз тарҳ мешавад ва агар ба нақша дароед, нафақа гирифта мешавад.', kg: 'Салык кармалат жана эгер схемага катталсаңыз, пенсия алынат.', kz: 'Салық ұсталады және егер схемаға тіркелсеңіз, зейнетақы алынады.' },
    { s: 'w', en: 'I see. How are my holidays calculated?', transcr: 'Ай си. Хау а май холидэйз кэлкьюлэйтид?', ru: 'Понятно. Как рассчитывается мой отпуск?', uz: 'Tushunarli. Mening ta\'tillarim qanday hisoblanadi?', tj: 'Фаҳмидам. Рухсатиҳои ман чӣ тавр ҳисоб карда мешаванд?', kg: 'Түшүндүм. Менин эс алууларым кантип эсептелет?', kz: 'Түсінікті. Менің демалысым қалай есептеледі?' },
    { s: 'm', en: 'Holidays are calculated by the hours you work. You are entitled to paid leave.', transcr: 'Холидэйз а кэлкьюлэйтид бай зи ауэз ю уёк. Ю а интайтлд ту пэйд лив.', ru: 'Отпуск рассчитывается по отработанным часам. Вы имеете право на оплачиваемый отпуск.', uz: 'Ta\'tillar siz ishlagan soatlar bo\'yicha hisoblanadi. Siz haqli ta\'tilga huquqlisiz.', tj: 'Рухсатиҳо аз рӯи соатҳои корӣ ҳисоб мешаванд. Шумо ба рухсатии пулакӣ ҳуқуқ доред.', kg: 'Эс алуу иштелген сааттар боюнча эсептелет. Сиз акы төлөнүүчү эс алууга укуктуусуз.', kz: 'Демалыс істелген сағаттар бойынша есептеледі. Сіз ақылы демалысқа құқылысыз.' },
    { s: 'w', en: 'Good. Is overtime included in this basic wage?', transcr: 'Гуд. Из оувэтайм инклудид ин зис бэйсик уэйдж?', ru: 'Хорошо. Сверхурочные включены в эту базовую зарплату?', uz: 'Yaxshi. Qo\'shimcha ish shu asosiy maoshga kiritilganmi?', tj: 'Хуб. Кори изофа ба ин маоши асосӣ дохил аст?', kg: 'Жакшы. Кошумча иш ушул негизги эмгек акыга киргизилгенби?', kz: 'Жақсы. Қосымша жұмыс осы негізгі жалақыға енгізілген бе?' },
    { s: 'm', en: 'No, overtime is not included. It is paid separately and shown on the payslip.', transcr: 'Ноу, оувэтайм из нот инклудид. Ит из пэйд сэпэритли энд шоун он зэ пэйслип.', ru: 'Нет, сверхурочные не включены. Они оплачиваются отдельно и показаны в расчётном листе.', uz: 'Yo\'q, qo\'shimcha ish kiritilmagan. U alohida to\'lanadi va payslipda ko\'rsatiladi.', tj: 'Не, кори изофа дохил нашудааст. Он алоҳида дода мешавад ва дар payslip нишон дода мешавад.', kg: 'Жок, кошумча иш киргизилген эмес. Ал өзүнчө төлөнөт жана payslipте көрсөтүлөт.', kz: 'Жоқ, қосымша жұмыс енгізілмеген. Ол бөлек төленеді және payslipте көрсетіледі.' },
    { s: 'w', en: 'What should I do if I think the wage is calculated wrongly?', transcr: 'Уот шуд ай ду иф ай синк зэ уэйдж из кэлкьюлэйтид ронгли?', ru: 'Что мне делать, если я думаю, что зарплата рассчитана неправильно?', uz: 'Agar maosh noto\'g\'ri hisoblangan deb o\'ylasam, nima qilishim kerak?', tj: 'Агар фикр кунам, ки маош нодуруст ҳисоб шудааст, чӣ кор кунам?', kg: 'Эгер эмгек акы туура эмес эсептелген деп ойлосом, эмне кылышым керек?', kz: 'Егер жалақы дұрыс есептелмеген деп ойласам, не істеуім керек?' },
    { s: 'm', en: 'You are entitled to ask. A trade union can help if money is owed to you.', transcr: 'Ю а интайтлд ту аск. Э трэйд юниэн кэн хэлп иф мани из оуд ту ю.', ru: 'Вы имеете право спросить. Профсоюз может помочь, если вам должны деньги.', uz: 'Siz so\'rashga haqlisiz. Agar sizga pul qarzdor bo\'lsa, kasaba uyushmasi yordam berishi mumkin.', tj: 'Шумо ҳуқуқи пурсидан доред. Агар ба шумо пул қарздор бошанд, иттифоқи касаба ёрӣ дода метавонад.', kg: 'Сиз сурашка укуктуусуз. Эгер сизге акча карыз болсо, кесиптик бирлик жардам бере алат.', kz: 'Сіз сұрауға құқылысыз. Егер сізге ақша қарыз болса, кәсіподақ көмектесе алады.' },
  ],
  quiz: [
    { q: '[COMPLETE] You ___ paid every Friday by bank transfer.', opts: ['are', 'do', 'have', 'is'], c: 0, hint_ru: 'Пассив с "you": be + 3-я форма', hint_uz: '"you" bilan passiv: be + 3-shakl', hint_tj: 'Маҷҳул бо "you": be + шакли 3', hint_kg: '"you" менен пассив: be + 3-форма', hint_kz: '"you" арқылы ырықсыз: be + 3-форма', expl_ru: 'Passive: You are paid (are + paid). С "you" используется are.', expl_uz: 'Passive: You are paid. "you" bilan are.', expl_tj: 'Passive: You are paid. Бо "you" are.', expl_kg: 'Passive: You are paid. "you" менен are.', expl_kz: 'Passive: You are paid. "you" арқылы are.' },
    { q: '[COMPLETE] Tax ___ deducted from your wages.', opts: ['is', 'are', 'do', 'have'], c: 0, hint_ru: '"tax" — единственное число', hint_uz: '"tax" — birlik', hint_tj: '"tax" — танҳо', hint_kg: '"tax" — жекелик', hint_kz: '"tax" — жекеше', expl_ru: 'Tax is deducted — с единственным числом используется is.', expl_uz: 'Tax is deducted — birlik bilan is.', expl_tj: 'Tax is deducted — бо танҳо is.', expl_kg: 'Tax is deducted — жекелик менен is.', expl_kz: 'Tax is deducted — жекешемен is.' },
    { q: '[COMPLETE] Wages ___ calculated by the hours you work.', opts: ['are', 'is', 'does', 'has'], c: 0, hint_ru: '"wages" — множественное число', hint_uz: '"wages" — ko\'plik', hint_tj: '"wages" — ҷамъ', hint_kg: '"wages" — көптүк', hint_kz: '"wages" — көпше', expl_ru: 'Wages are calculated — с множественным числом используется are.', expl_uz: 'Wages are calculated — ko\'plik bilan are.', expl_tj: 'Wages are calculated — бо ҷамъ are.', expl_kg: 'Wages are calculated — көптүк менен are.', expl_kz: 'Wages are calculated — көпшемен are.' },
    { q: '[TRANSLATE] Как сказать "имеющий право на оплачиваемый отпуск"?', opts: ['entitled to paid leave', 'afraid of paid leave', 'tired of paid leave', 'paid to leave'], c: 0, hint_ru: 'Иметь законное право на что-то', hint_uz: 'Biror narsaga qonuniy huquqqa ega bo\'lish', hint_tj: 'Ба чизе ҳуқуқи қонунӣ доштан', hint_kg: 'Бир нерсеге мыйзамдуу укукка ээ болуу', hint_kz: 'Бірдеңеге заңды құқығы болу', expl_ru: '"entitled to" — имеющий право на; paid leave — оплачиваемый отпуск.', expl_uz: '"entitled to" — huquqli; paid leave — haqli ta\'til.', expl_tj: '"entitled to" — ҳуқуқдор; paid leave — рухсатии пулакӣ.', expl_kg: '"entitled to" — укуктуу; paid leave — акы төлөнүүчү эс алуу.', expl_kz: '"entitled to" — құқылы; paid leave — ақылы демалыс.' },
    { q: '[COMPLETE] The contract ___ signed before your first day.', opts: ['is', 'are', 'do', 'has'], c: 0, hint_ru: 'Пассив, единственное число', hint_uz: 'Passiv, birlik', hint_tj: 'Маҷҳул, танҳо', hint_kg: 'Пассив, жекелик', hint_kz: 'Ырықсыз, жекеше', expl_ru: 'The contract is signed — is + signed (3-я форма).', expl_uz: 'The contract is signed — is + signed.', expl_tj: 'The contract is signed — is + signed.', expl_kg: 'The contract is signed — is + signed.', expl_kz: 'The contract is signed — is + signed.' },
    { q: '[TRANSLATE] Как сказать "профсоюз"?', opts: ['trade union', 'bank branch', 'job centre', 'town hall'], c: 0, hint_ru: 'Организация, защищающая права работников', hint_uz: 'Ishchilar huquqini himoya qiluvchi tashkilot', hint_tj: 'Ташкилоте, ки ҳуқуқи коргаронро ҳимоя мекунад', hint_kg: 'Жумушчулардын укугун коргогон уюм', hint_kz: 'Жұмысшылар құқығын қорғайтын ұйым', expl_ru: '"trade union" — профсоюз.', expl_uz: '"trade union" — kasaba uyushmasi.', expl_tj: '"trade union" — иттифоқи касаба.', expl_kg: '"trade union" — кесиптик бирлик.', expl_kz: '"trade union" — кәсіподақ.' },
    { q: '[COMPLETE] How ___ wages paid here — weekly or monthly?', opts: ['are', 'is', 'do', 'does'], c: 0, hint_ru: 'Вопрос-пассив с "wages" (мн.ч.)', hint_uz: '"wages" (ko\'plik) bilan passiv savol', hint_tj: 'Савол-маҷҳул бо "wages" (ҷамъ)', hint_kg: '"wages" (көптүк) менен пассив суроо', hint_kz: '"wages" (көпше) арқылы ырықсыз сұрақ', expl_ru: 'How are wages paid? — are для множественного числа.', expl_uz: 'How are wages paid? — ko\'plik uchun are.', expl_tj: 'How are wages paid? — барои ҷамъ are.', expl_kg: 'How are wages paid? — көптүк үчүн are.', expl_kz: 'How are wages paid? — көпше үшін are.' },
    { q: '[TRANSLATE] Как сказать "налог удерживается"?', opts: ['tax is deducted', 'tax is paid back', 'tax is refunded', 'tax is approved'], c: 0, hint_ru: 'Налог забирают из зарплаты', hint_uz: 'Soliq maoshdan olinadi', hint_tj: 'Андоз аз маош гирифта мешавад', hint_kg: 'Салык эмгек акыдан алынат', hint_kz: 'Салық жалақыдан алынады', expl_ru: '"is deducted" — удерживается (пассив от deduct).', expl_uz: '"is deducted" — ushlab qolinadi.', expl_tj: '"is deducted" — тарҳ мешавад.', expl_kg: '"is deducted" — кармалат.', expl_kz: '"is deducted" — ұсталады.' },
    { q: '[COMPLETE] Overtime ___ not included in the basic wage.', opts: ['is', 'are', 'do', 'has'], c: 0, hint_ru: 'Отрицательный пассив, единственное число', hint_uz: 'Inkor passiv, birlik', hint_tj: 'Маҷҳули манфӣ, танҳо', hint_kg: 'Терс пассив, жекелик', hint_kz: 'Теріс ырықсыз, жекеше', expl_ru: 'Overtime is not included — is not + 3-я форма.', expl_uz: 'Overtime is not included — is not + 3-shakl.', expl_tj: 'Overtime is not included — is not + шакли 3.', expl_kg: 'Overtime is not included — is not + 3-форма.', expl_kz: 'Overtime is not included — is not + 3-форма.' },
    { q: '[TRANSLATE] Как сказать "сумма на руки" (после вычетов)?', opts: ['take-home pay', 'cash in hand', 'pay rise', 'bonus pay'], c: 0, hint_ru: 'Деньги, которые остаются после вычетов', hint_uz: 'Ushlovlardan keyin qoladigan pul', hint_tj: 'Пуле, ки пас аз тарҳҳо мемонад', hint_kg: 'Кармоолордон кийин калган акча', hint_kz: 'Ұсталымдардан кейін қалатын ақша', expl_ru: '"take-home pay" — сумма на руки после вычетов.', expl_uz: '"take-home pay" — qo\'lga tegadigan pul.', expl_tj: '"take-home pay" — пули ба даст.', expl_kg: '"take-home pay" — колго тийген акча.', expl_kz: '"take-home pay" — қолға тиетін ақша.' },
  ],
};

// ── validation (dry run) ───────────────────────────────────────────────────
const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];
const a1 = require('./lessons_data.js'), a2 = require('./lessons_data_a2.js'), b1 = require('./lessons_data_b1.js');
const used = new Map();
[['a1', a1], ['a2', a2], ['b1', b1]].forEach(([c, C]) => C.forEach(l => l.words.forEach(w => used.set(w.en.trim().toLowerCase(), c + ' L' + l.id))));

const LESSON = L10;
const errs = [];
if (LESSON.words.length !== 30) errs.push('words count ' + LESSON.words.length);
const seenW = new Set();
LESSON.words.forEach((w, i) => {
  for (const k of ['e', 'en', 'pn', 'transcr', ...LANGS]) if (w[k] === undefined || w[k] === null || (k !== 'e' && !String(w[k]).trim())) errs.push(`word[${i}] missing ${k}`);
  const n = w.en.trim().toLowerCase();
  if (used.has(n)) errs.push(`word[${i}] "${w.en}" DUP vs ${used.get(n)}`);
  if (seenW.has(n)) errs.push(`word[${i}] "${w.en}" dup within lesson`);
  seenW.add(n);
});
if (LESSON.dialogue.length !== 10) errs.push('dialogue count ' + LESSON.dialogue.length);
let prev = null;
LESSON.dialogue.forEach((d, i) => {
  for (const k of ['s', 'en', 'transcr', ...LANGS]) if (!String(d[k] || '').trim()) errs.push(`dlg[${i}] missing ${k}`);
  if (prev && d.s === prev) errs.push(`dlg[${i}] speaker repeat ${d.s}`);
  prev = d.s;
});
if (LESSON.quiz.length !== 10) errs.push('quiz count ' + LESSON.quiz.length);
LESSON.quiz.forEach((q, i) => {
  if (!/^\[(COMPLETE|TRANSLATE)\]/.test(q.q)) errs.push(`quiz[${i}] no tag`);
  if (!Array.isArray(q.opts) || q.opts.length !== 4) errs.push(`quiz[${i}] opts!=4`);
  else if (new Set(q.opts.map(o => o.trim().toLowerCase())).size !== 4) errs.push(`quiz[${i}] dup opts`);
  if (typeof q.c !== 'number' || q.c < 0 || q.c > 3) errs.push(`quiz[${i}] bad c`);
  for (const k of LANGS) { if (!String(q['hint_' + k] || '').trim()) errs.push(`quiz[${i}] missing hint_${k}`); if (!String(q['expl_' + k] || '').trim()) errs.push(`quiz[${i}] missing expl_${k}`); }
});
let exCount = 0;
for (const fk of ['positive', 'negative', 'question']) {
  const f = LESSON.grammar.forms[fk];
  for (const k of LANGS) {
    if (!String(f['label_' + k] || '').trim()) errs.push(`grammar.${fk} missing label_${k}`);
    const r = f['rule_' + k] || '';
    if (!r.includes('display:grid') || !r.includes('grid-template-columns:1fr 1fr')) errs.push(`grammar.${fk}.rule_${k} no grid`);
    if (!r.includes('g-transcr')) errs.push(`grammar.${fk}.rule_${k} no g-transcr`);
  }
  exCount += f.table.length;
  f.table.forEach((row, ri) => { for (const k of ['subj', 'verb', 'example', 'transcr']) if (!String(row[k] || '').trim()) errs.push(`${fk}.table[${ri}] missing ${k}`); for (const k of LANGS) if (!String(row['tr_' + k] || '').trim()) errs.push(`${fk}.table[${ri}] missing tr_${k}`); });
}
if (exCount < 10) errs.push(`grammar examples ${exCount} < 10`);
for (const f of ['title', 'intro', 'cultural', 'note']) for (const k of LANGS) if (!String(LESSON.grammar[f + '_' + k] || '').trim()) errs.push(`grammar missing ${f}_${k}`);

const ALLOW = new Set(('a an the this that these those some any all and or but if so as to of in on at for with by from i you he she it we they me him her us them my your his its our their is am are was were be been being do does did have has had will would can could should not no yes very too also just now here there then what where when who which why how about into over under up down out off back well good thank thanks please sorry hello okay ok since for ever never long more most than new basic before after already because every less than wrongly separately automatically paid pay leave first understand week friday money problem').split(/\s+/));
const ownWords = new Set();
LESSON.words.forEach(w => w.en.toLowerCase().split(/[^a-z']+/).forEach(t => t && ownWords.add(t)));
const vocab = new Set(ALLOW);
used.forEach((_, en) => en.split(/[^a-z']+/).forEach(t => t && vocab.add(t)));
ownWords.forEach(t => vocab.add(t));
const stem = (w) => [w, w.replace(/ing$/, ''), w.replace(/ing$/, 'e'), w.replace(/ed$/, ''), w.replace(/s$/, ''), w.replace(/es$/, ''), w.replace(/ies$/, 'y')];
const sbMiss = new Set();
const scanSb = (text) => text.toLowerCase().split(/[^a-z']+/).forEach(t => { t = t.replace(/^'|'$/g, ''); if (t.length < 3) return; if (vocab.has(t)) return; if (stem(t).some(s => vocab.has(s))) return; sbMiss.add(t); });
LESSON.dialogue.forEach(d => scanSb(d.en));
LESSON.quiz.forEach(q => { if (q.q.includes('[TRANSLATE]')) q.opts.forEach(o => scanSb(o)); });

console.log(errs.length ? '❌ STRUCTURE/DUP ERRORS (' + errs.length + '):' : `✅ structure + dups OK (30 words, 10 dlg, 10 quiz, ${exCount} grammar examples)`);
errs.forEach(e => console.log('  - ' + e));
console.log(sbMiss.size ? '⚠ SNOWBALL preview (real audit authoritative): ' + [...sbMiss].join(', ') : '✅ snowball preview clean');

if (process.argv.includes('--apply') && errs.length === 0) {
  const p = path.join(__dirname, '..', 'b1.html');
  let html = fs.readFileSync(p, 'utf8');
  const start = html.indexOf('const LESSONS');
  const open = html.indexOf('[', start);
  let depth = 0, q = null, esc = false, closeIdx = -1;
  for (let i = open; i < html.length; i++) {
    const c = html[i];
    if (q) { if (esc) { esc = false; } else if (c === '\\') { esc = true; } else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') { depth--; if (depth === 0) { closeIdx = i; break; } }
  }
  if (closeIdx === -1) { console.log('\n❌ could not locate LESSONS array end'); process.exit(1); }
  const body = JSON.stringify(LESSON, null, 2).split('\n').map((l, i) => i === 0 ? l : '      ' + l).join('\n');
  html = html.slice(0, closeIdx) + ',\n      ' + body + '\n    ' + html.slice(closeIdx);
  fs.writeFileSync(p, html, 'utf8');
  console.log('\n✅ APPLIED: L10 injected into b1.html (string-aware). MODS unchanged (finalised after L12).');
}
