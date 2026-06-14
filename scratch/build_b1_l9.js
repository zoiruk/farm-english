/**
 * build_b1_l9.js — author B1 Lesson 9 "У врача (GP)".
 * Grammar: should / shouldn't + First Conditional (if + present → advice).
 * Module 4 (Health & Safety). Dialogue speakers: w (patient) / d (doctor).
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

const L9 = {
  id: 9,
  mod: 4,
  name_ru: 'У врача (GP)',
  name_uz: 'Shifokorda (GP)',
  name_tj: 'Назди духтур (GP)',
  name_kg: 'Дарыгерде (GP)',
  name_kz: 'Дәрігерде (GP)',
  cefr: 'should / shouldn\'t + First Conditional (if + present → advice)',
  grammar: {
    title_ru: 'SHOULD / SHOULDN\'T + Первое условное (советы о здоровье)',
    title_uz: 'SHOULD / SHOULDN\'T + Birinchi shart (salomatlik bo\'yicha maslahat)',
    title_tj: 'SHOULD / SHOULDN\'T + Шарти якум (маслиҳат оид ба саломатӣ)',
    title_kg: 'SHOULD / SHOULDN\'T + Биринчи шарт (ден соолук кеңеши)',
    title_kz: 'SHOULD / SHOULDN\'T + Бірінші шарт (денсаулық кеңесі)',
    intro_ru: '<div style="line-height:1.6">Используйте <b>should</b> (следует) и <b>shouldn\'t</b> (не следует), чтобы давать и просить совет. Часто вместе с <b>первым условным</b>: <b>if</b> + настоящее время, потом совет.<br>✅ <i>You <b>should</b> rest and drink water.</i><br>✅ <i><b>If</b> you have a fever, you <b>should</b> see a GP.</i><br>❌ <i>You <b>shouldn\'t</b> go to work when you are ill.</i></div>',
    intro_uz: '<div style="line-height:1.6"><b>should</b> (kerak) va <b>shouldn\'t</b> (kerak emas) maslahat berish va so\'rash uchun ishlatiladi. Ko\'pincha <b>birinchi shart</b> bilan: <b>if</b> + hozirgi zamon, keyin maslahat.<br>✅ <i>You should rest and drink water.</i><br>✅ <i>If you have a fever, you should see a GP.</i></div>',
    intro_tj: '<div style="line-height:1.6"><b>should</b> (бояд) ва <b>shouldn\'t</b> (набояд) барои додан ва пурсидани маслиҳат истифода мешавад. Аксаран бо <b>шарти якум</b>: <b>if</b> + замони ҳозира, баъд маслиҳат.<br>✅ <i>You should rest and drink water.</i><br>✅ <i>If you have a fever, you should see a GP.</i></div>',
    intro_kg: '<div style="line-height:1.6"><b>should</b> (керек) жана <b>shouldn\'t</b> (керек эмес) кеңеш берүү жана суроо үчүн колдонулат. Көбүнчө <b>биринчи шарт</b> менен: <b>if</b> + учур чак, анан кеңеш.<br>✅ <i>You should rest and drink water.</i></div>',
    intro_kz: '<div style="line-height:1.6"><b>should</b> (керек) және <b>shouldn\'t</b> (керек емес) кеңес беру және сұрау үшін қолданылады. Көбіне <b>бірінші шартпен</b>: <b>if</b> + осы шақ, содан кейін кеңес.<br>✅ <i>You should rest and drink water.</i></div>',
    cultural_ru: 'В Великобритании сначала идут к GP (семейному врачу) — для этого нужно зарегистрироваться (register) в местной surgery. При несрочных вопросах звоните 111 (NHS), при опасности для жизни — 999. Лекарства без рецепта (paracetamol) продаются в любой аптеке; рецептурные — только по prescription от врача.',
    cultural_uz: 'Buyuk Britaniyada avval GP (oilaviy shifokor)ga boriladi — buning uchun mahalliy surgery\'da ro\'yxatdan o\'tish kerak. Shoshilinch bo\'lmagan savollar uchun 111 (NHS), hayot uchun xavfli holatda 999 ga qo\'ng\'iroq qiling.',
    cultural_tj: 'Дар Британияи Кабир аввал назди GP (духтури оилавӣ) мераванд — барои ин дар surgery-и маҳаллӣ ба қайд гирифтан лозим аст. Барои саволҳои ғайрифаврӣ ба 111 (NHS), дар ҳолати хатари ҷонӣ ба 999 занг занед.',
    cultural_kg: 'Улуу Британияда адегенде GP (үй-бүлөлүк дарыгер)ге барышат — бул үчүн жергиликтүү surgery-ге катталуу керек. Шашылыш эмес суроолор үчүн 111 (NHS), өмүргө коркунучтуу учурда 999 чалыңыз.',
    cultural_kz: 'Ұлыбританияда алдымен GP (отбасылық дәрігер)ге барады — ол үшін жергілікті surgery-ге тіркелу керек. Шұғыл емес сұрақтар үшін 111 (NHS), өмірге қауіпті жағдайда 999 қоңырау шалыңыз.',
    note_ru: '⚠️ После should глагол идёт БЕЗ to и без -s: "He should rest" (не "should to rest", не "should rests")!',
    note_uz: '⚠️ should dan keyin fe\'l to siz va -s siz keladi: "He should rest" (not "should to rest")!',
    note_tj: '⚠️ Пас аз should феъл БЕ to ва бе -s меояд: "He should rest" (на "should to rest")!',
    note_kg: '⚠️ should дан кийин этиш to сиз жана -s сиз келет: "He should rest"!',
    note_kz: '⚠️ should кейін етістік to-сыз және -s-сыз келеді: "He should rest"!',
    forms: {
      positive: {
        label_ru: '✅ Совет (should)', label_uz: '✅ Maslahat (should)', label_tj: '✅ Маслиҳат (should)', label_kg: '✅ Кеңеш (should)', label_kz: '✅ Кеңес (should)',
        rule_ru: grid([
          ['You should rest', 'ю шуд рэст', 'тебе следует отдохнуть'],
          ['She should see a GP', 'ши шуд си э джи-пи', 'ей следует к врачу'],
          ['If you feel ill,', 'иф ю фил ил', 'если плохо,'],
          ['you should drink water', 'ю шуд дринк уотэ', 'пей воду'],
        ]),
        rule_uz: grid([
          ['You should rest', 'ю шуд рэст', 'dam olishingiz kerak'],
          ['She should see a GP', 'ши шуд си э джи-пи', 'u shifokorga borishi kerak'],
          ['If you feel ill,', 'иф ю фил ил', 'agar kasal bo\'lsangiz,'],
          ['you should drink water', 'ю шуд дринк уотэ', 'suv iching'],
        ]),
        rule_tj: grid([
          ['You should rest', 'ю шуд рэст', 'шумо бояд истироҳат кунед'],
          ['She should see a GP', 'ши шуд си э джи-пи', 'вай бояд назди духтур равад'],
          ['If you feel ill,', 'иф ю фил ил', 'агар бемор бошед,'],
          ['you should drink water', 'ю шуд дринк уотэ', 'об нӯшед'],
        ]),
        rule_kg: grid([
          ['You should rest', 'ю шуд рэст', 'эс алышыңыз керек'],
          ['She should see a GP', 'ши шуд си э джи-пи', 'ал дарыгерге барышы керек'],
          ['If you feel ill,', 'иф ю фил ил', 'эгер ооруп калсаңыз,'],
          ['you should drink water', 'ю шуд дринк уотэ', 'суу ичиңиз'],
        ]),
        rule_kz: grid([
          ['You should rest', 'ю шуд рэст', 'демалуыңыз керек'],
          ['She should see a GP', 'ши шуд си э джи-пи', 'ол дәрігерге баруы керек'],
          ['If you feel ill,', 'иф ю фил ил', 'егер ауырсаңыз,'],
          ['you should drink water', 'ю шуд дринк уотэ', 'су ішіңіз'],
        ]),
        table: [
          { subj: 'You', verb: 'should rest', example: 'You should rest and drink plenty of fluids.', transcr: 'Ю шуд рэст энд дринк плэнти оф флуидз', tr_ru: 'Вам следует отдыхать и пить много жидкости.', tr_uz: 'Siz dam olishingiz va ko\'p suyuqlik ichishingiz kerak.', tr_tj: 'Шумо бояд истироҳат кунед ва моеъи зиёд нӯшед.', tr_kg: 'Сиз эс алып, көп суюктук ичишиңиз керек.', tr_kz: 'Сіз демалып, көп сұйықтық ішуіңіз керек.' },
          { subj: 'He', verb: 'should see', example: 'He should see a GP if the fever is high.', transcr: 'Хи шуд си э джи-пи иф зэ фивэ из хай', tr_ru: 'Ему следует обратиться к врачу, если температура высокая.', tr_uz: 'Agar harorat baland bo\'lsa, u shifokorga borishi kerak.', tr_tj: 'Агар таб баланд бошад, вай бояд назди духтур равад.', tr_kg: 'Эгер ысытма жогору болсо, ал дарыгерге барышы керек.', tr_kz: 'Егер қызуы жоғары болса, ол дәрігерге баруы керек.' },
          { subj: 'If you', verb: 'feel dizzy', example: 'If you feel dizzy, you should sit down and rest.', transcr: 'Иф ю фил дизи, ю шуд сит даун энд рэст', tr_ru: 'Если кружится голова, вам следует сесть и отдохнуть.', tr_uz: 'Agar boshingiz aylansa, o\'tirib dam olishingiz kerak.', tr_tj: 'Агар сари шумо чарх занад, шумо бояд нишаста истироҳат кунед.', tr_kg: 'Эгер башыңыз айланса, отуруп эс алышыңыз керек.', tr_kz: 'Егер басыңыз айналса, отырып демалуыңыз керек.' },
          { subj: 'They', verb: 'should gargle', example: 'They should gargle with warm water for a sore throat.', transcr: 'Зэй шуд гагл уиз уом уотэ фо э со срэут', tr_ru: 'Им следует полоскать горло тёплой водой при боли в горле.', tr_uz: 'Tomoq og\'rig\'ida ular iliq suv bilan g\'arg\'ara qilishlari kerak.', tr_tj: 'Ҳангоми дарди гулӯ онҳо бояд бо оби гарм ғарғара кунанд.', tr_kg: 'Тамак ооруганда алар жылуу суу менен чайкашы керек.', tr_kz: 'Тамақ ауырғанда олар жылы сумен шайқауы керек.' },
        ],
      },
      negative: {
        label_ru: '❌ Не следует (shouldn\'t)', label_uz: '❌ Kerak emas (shouldn\'t)', label_tj: '❌ Набояд (shouldn\'t)', label_kg: '❌ Керек эмес (shouldn\'t)', label_kz: '❌ Керек емес (shouldn\'t)',
        rule_ru: grid([
          ["You shouldn't work", 'ю шуднт уёк', 'тебе не следует работать'],
          ['when you are ill', 'уэн ю а ил', 'когда болеешь'],
          ["He shouldn't ignore", 'хи шуднт игно', 'ему не следует игнорировать'],
          ['chest pain', 'чест пэйн', 'боль в груди'],
        ]),
        rule_uz: grid([
          ["You shouldn't work", 'ю шуднт уёк', 'ishlamasligingiz kerak'],
          ['when you are ill', 'уэн ю а ил', 'kasal bo\'lganingizda'],
          ["He shouldn't ignore", 'хи шуднт игно', 'u e\'tiborsiz qoldirmasligi kerak'],
          ['chest pain', 'чест пэйн', 'ko\'krak og\'rig\'ini'],
        ]),
        rule_tj: grid([
          ["You shouldn't work", 'ю шуднт уёк', 'шумо набояд кор кунед'],
          ['when you are ill', 'уэн ю а ил', 'вақте бемор ҳастед'],
          ["He shouldn't ignore", 'хи шуднт игно', 'вай набояд нодида гирад'],
          ['chest pain', 'чест пэйн', 'дарди сина'],
        ]),
        rule_kg: grid([
          ["You shouldn't work", 'ю шуднт уёк', 'иштебешиңиз керек'],
          ['when you are ill', 'уэн ю а ил', 'ооруп турганда'],
          ["He shouldn't ignore", 'хи шуднт игно', 'ал көңүл бурбай койбошу керек'],
          ['chest pain', 'чест пэйн', 'көкүрөк оорусун'],
        ]),
        rule_kz: grid([
          ["You shouldn't work", 'ю шуднт уёк', 'жұмыс істемеуіңіз керек'],
          ['when you are ill', 'уэн ю а ил', 'ауырған кезде'],
          ["He shouldn't ignore", 'хи шуднт игно', 'ол елемей қоймауы керек'],
          ['chest pain', 'чест пэйн', 'кеуде ауырсынуын'],
        ]),
        table: [
          { subj: 'You', verb: "shouldn't go", example: "You shouldn't go to work if you have a fever.", transcr: 'Ю шуднт гоу ту уёк иф ю хэв э фивэ', tr_ru: 'Тебе не следует идти на работу, если у тебя температура.', tr_uz: 'Agar haroratingiz bo\'lsa, ishga bormasligingiz kerak.', tr_tj: 'Агар таб дошта бошед, ба кор рафтан набояд.', tr_kg: 'Эгер ысытмаңыз болсо, жумушка барбашыңыз керек.', tr_kz: 'Егер қызуыңыз болса, жұмысқа бармауыңыз керек.' },
          { subj: 'He', verb: "shouldn't ignore", example: "He shouldn't ignore chest pain — it can be serious.", transcr: 'Хи шуднт игно чест пэйн — ит кэн би сириэс', tr_ru: 'Ему не следует игнорировать боль в груди — это может быть серьёзно.', tr_uz: 'U ko\'krak og\'rig\'ini e\'tiborsiz qoldirmasligi kerak — bu jiddiy bo\'lishi mumkin.', tr_tj: 'Вай набояд дарди синаро нодида гирад — ин метавонад ҷиддӣ бошад.', tr_kg: 'Ал көкүрөк оорусун көңүл бурбай койбошу керек — бул олуттуу болушу мүмкүн.', tr_kz: 'Ол кеуде ауырсынуын елемеуі керек — бұл ауыр болуы мүмкін.' },
          { subj: 'You', verb: "shouldn't take", example: "You shouldn't take medicine without advice.", transcr: 'Ю шуднт тэйк мэдисин уизаут эдвайс', tr_ru: 'Тебе не следует принимать лекарство без совета.', tr_uz: 'Maslahatsiz dori ichmasligingiz kerak.', tr_tj: 'Бе маслиҳат дору хӯрдан набояд.', tr_kg: 'Кеңешсиз дары ичпешиңиз керек.', tr_kz: 'Кеңессіз дәрі ішпеуіңіз керек.' },
        ],
      },
      question: {
        label_ru: '❓ Вопрос-совет', label_uz: '❓ Savol-maslahat', label_tj: '❓ Савол-маслиҳат', label_kg: '❓ Суроо-кеңеш', label_kz: '❓ Сұрақ-кеңес',
        rule_ru: grid([
          ['Should I see a GP?', 'шуд ай си э джи-пи', 'мне стоит к врачу?'],
          ['What should I do?', 'уот шуд ай ду', 'что мне делать?'],
          ['Should I rest today?', 'шуд ай рэст тудэй', 'мне отдохнуть сегодня?'],
          ['If it gets worse?', 'иф ит гетс уёс', 'если станет хуже?'],
        ]),
        rule_uz: grid([
          ['Should I see a GP?', 'шуд ай си э джи-пи', 'shifokorga borishim kerakmi?'],
          ['What should I do?', 'уот шуд ай ду', 'nima qilishim kerak?'],
          ['Should I rest today?', 'шуд ай рэст тудэй', 'bugun dam olishim kerakmi?'],
          ['If it gets worse?', 'иф ит гетс уёс', 'agar yomonlashsa?'],
        ]),
        rule_tj: grid([
          ['Should I see a GP?', 'шуд ай си э джи-пи', 'ман бояд назди духтур равам?'],
          ['What should I do?', 'уот шуд ай ду', 'ман чӣ кор кунам?'],
          ['Should I rest today?', 'шуд ай рэст тудэй', 'ман имрӯз истироҳат кунам?'],
          ['If it gets worse?', 'иф ит гетс уёс', 'агар бадтар шавад?'],
        ]),
        rule_kg: grid([
          ['Should I see a GP?', 'шуд ай си э джи-пи', 'дарыгерге барышым керекпи?'],
          ['What should I do?', 'уот шуд ай ду', 'эмне кылышым керек?'],
          ['Should I rest today?', 'шуд ай рэст тудэй', 'бүгүн эс алышым керекпи?'],
          ['If it gets worse?', 'иф ит гетс уёс', 'эгер начарласа?'],
        ]),
        rule_kz: grid([
          ['Should I see a GP?', 'шуд ай си э джи-пи', 'дәрігерге баруым керек пе?'],
          ['What should I do?', 'уот шуд ай ду', 'не істеуім керек?'],
          ['Should I rest today?', 'шуд ай рэст тудэй', 'бүгін демалуым керек пе?'],
          ['If it gets worse?', 'иф ит гетс уёс', 'егер нашарласа?'],
        ]),
        table: [
          { subj: 'Should I', verb: 'see', example: 'Should I see a GP, or is it just a cold?', transcr: 'Шуд ай си э джи-пи, о из ит джаст э колд', tr_ru: 'Мне стоит обратиться к врачу, или это просто простуда?', tr_uz: 'Shifokorga borishim kerakmi yoki bu shunchaki shamollashmi?', tr_tj: 'Ман бояд назди духтур равам ё ин танҳо шамолхӯрӣ аст?', tr_kg: 'Дарыгерге барышым керекпи, же бул жөн эле суук тийүүбү?', tr_kz: 'Дәрігерге баруым керек пе, әлде бұл жай суықтау ма?' },
          { subj: 'What should', verb: 'I do', example: 'What should I do if the medicine does not help?', transcr: 'Уот шуд ай ду иф зэ мэдисин даз нот хэлп', tr_ru: 'Что мне делать, если лекарство не помогает?', tr_uz: 'Agar dori yordam bermasa, nima qilishim kerak?', tr_tj: 'Агар дору ёрӣ надиҳад, ман чӣ кор кунам?', tr_kg: 'Эгер дары жардам бербесе, эмне кылышым керек?', tr_kz: 'Егер дәрі көмектеспесе, не істеуім керек?' },
          { subj: 'Should we', verb: 'call', example: 'Should we call 111 if she is breathless?', transcr: 'Шуд уи кол уан-уан-уан иф ши из брэслэс', tr_ru: 'Нам стоит позвонить в 111, если ей трудно дышать?', tr_uz: 'Agar u nafas ololmasa, 111 ga qo\'ng\'iroq qilishimiz kerakmi?', tr_tj: 'Агар вай нафас гирифта натавонад, мо бояд ба 111 занг занем?', tr_kg: 'Эгер ал дем ала албаса, биз 111ге чалышыбыз керекпи?', tr_kz: 'Егер ол тыныс ала алмаса, біз 111-ге қоңырау шалуымыз керек пе?' },
        ],
      },
    },
  },
  words: [
    { e: '🦠', en: 'infection', pn: '/ɪnˈfekʃn/', transcr: 'инфэкшн', ru: 'инфекция', uz: 'infektsiya', tj: 'сироят', kg: 'инфекция', kz: 'инфекция' },
    { e: '🔴', en: 'rash', pn: '/ræʃ/', transcr: 'рэш', ru: 'сыпь', uz: 'toshma', tj: 'тошхӯрӣ', kg: 'бөртмө', kz: 'бөртпе' },
    { e: '🫁', en: 'chest', pn: '/tʃest/', transcr: 'чест', ru: 'грудь (грудная клетка)', uz: 'ko\'krak', tj: 'сина', kg: 'көкүрөк', kz: 'кеуде' },
    { e: '💁', en: 'receptionist', pn: '/rɪˈsepʃənɪst/', transcr: 'рисэпшэнист', ru: 'регистратор (в клинике)', uz: 'qabulxona xodimi', tj: 'қабулкунанда', kg: 'кабылдоочу', kz: 'қабылдаушы' },
    { e: '💉', en: 'vaccine', pn: '/ˈvæksiːn/', transcr: 'вэксин', ru: 'вакцина', uz: 'vaksina', tj: 'эмгузаронӣ (ваксина)', kg: 'вакцина', kz: 'вакцина' },
    { e: '😮', en: 'swallow', pn: '/ˈswɒləʊ/', transcr: 'своулоу', ru: 'глотать', uz: 'yutmoq', tj: 'фурӯ бурдан', kg: 'жутуу', kz: 'жұту' },
    { e: '🤮', en: 'vomit', pn: '/ˈvɒmɪt/', transcr: 'вомит', ru: 'рвота (рвать)', uz: 'qusmoq', tj: 'қай кардан', kg: 'кусуу', kz: 'құсу' },
    { e: '🤢', en: 'nausea', pn: '/ˈnɔːziə/', transcr: 'нозиэ', ru: 'тошнота', uz: 'ko\'ngil aynishi', tj: 'дилбеҳузурӣ', kg: 'көңүл айнуу', kz: 'жүрек айну' },
    { e: '🤧', en: 'runny nose', pn: '/ˈrʌni nəʊz/', transcr: 'рани ноуз', ru: 'насморк', uz: 'burun oqishi', tj: 'обилаи бинӣ', kg: 'мурун агуу', kz: 'мұрын ағу' },
    { e: '🧪', en: 'sample', pn: '/ˈsɑːmpl/', transcr: 'сампл', ru: 'анализ (образец)', uz: 'namuna (tahlil)', tj: 'намуна (таҳлил)', kg: 'үлгү (анализ)', kz: 'үлгі (талдау)' },
    { e: '🍯', en: 'syrup', pn: '/ˈsɪrəp/', transcr: 'сирэп', ru: 'сироп (от кашля)', uz: 'sirop', tj: 'шарбат (сироп)', kg: 'сироп', kz: 'сироп' },
    { e: '🌡️', en: 'thermometer', pn: '/θəˈmɒmɪtə/', transcr: 'сэмомитэ', ru: 'градусник', uz: 'termometr', tj: 'ҳароратсанҷ', kg: 'термометр', kz: 'термометр' },
    { e: '🤚', en: 'itch', pn: '/ɪtʃ/', transcr: 'итч', ru: 'зуд (чесаться)', uz: 'qichishish', tj: 'хориш', kg: 'кычышуу', kz: 'қышу' },
    { e: '🏜️', en: 'dehydrated', pn: '/diːˈhaɪdreɪtɪd/', transcr: 'дихайдрэйтид', ru: 'обезвоженный', uz: 'suvsizlangan', tj: 'беобшуда', kg: 'суусузданган', kz: 'сусыздану' },
    { e: '🥤', en: 'fluids', pn: '/ˈfluːɪdz/', transcr: 'флуидз', ru: 'жидкости (питьё)', uz: 'suyuqliklar', tj: 'моеъот', kg: 'суюктуктар', kz: 'сұйықтық' },
    { e: '🫗', en: 'sip', pn: '/sɪp/', transcr: 'сип', ru: 'пить маленькими глотками', uz: 'ho\'plab ichmoq', tj: 'қурт-қурт нӯшидан', kg: 'ууртап ичүү', kz: 'ұрттап ішу' },
    { e: '😟', en: 'serious', pn: '/ˈsɪəriəs/', transcr: 'сириэс', ru: 'серьёзный', uz: 'jiddiy', tj: 'ҷиддӣ', kg: 'олуттуу', kz: 'ауыр (елеулі)' },
    { e: '❗', en: 'severe', pn: '/sɪˈvɪə/', transcr: 'сивиэ', ru: 'сильный (тяжёлый)', uz: 'kuchli (og\'ir)', tj: 'шадид (вазнин)', kg: 'катуу (оор)', kz: 'қатты (ауыр)' },
    { e: '🤲', en: 'gentle', pn: '/ˈdʒentl/', transcr: 'джентл', ru: 'мягкий (щадящий)', uz: 'yumshoq', tj: 'мулоим', kg: 'жумшак', kz: 'жұмсақ' },
    { e: '🚫', en: 'avoid', pn: '/əˈvɔɪd/', transcr: 'эвойд', ru: 'избегать', uz: 'qochmoq (saqlanmoq)', tj: 'парҳез кардан', kg: 'качуу (сактануу)', kz: 'аулақ болу' },
    { e: '🩸', en: 'blood test', pn: '/blʌd test/', transcr: 'блад тэст', ru: 'анализ крови', uz: 'qon tahlili', tj: 'таҳлили хун', kg: 'кан анализи', kz: 'қан анализі' },
    { e: '🥄', en: 'spoonful', pn: '/ˈspuːnfʊl/', transcr: 'спунфул', ru: 'ложка (доза)', uz: 'bir qoshiq', tj: 'як қошуқ', kg: 'бир кашык', kz: 'бір қасық' },
    { e: '😴', en: 'drowsy', pn: '/ˈdraʊzi/', transcr: 'драузи', ru: 'сонливый', uz: 'uyquchan', tj: 'хобовар', kg: 'уйкулуу', kz: 'ұйқышыл' },
    { e: '💪', en: 'recovery', pn: '/rɪˈkʌvəri/', transcr: 'рикавэри', ru: 'выздоровление', uz: 'tuzalish', tj: 'сиҳатшавӣ', kg: 'айыгуу', kz: 'сауығу' },
    { e: '🌬️', en: 'inhaler', pn: '/ɪnˈheɪlə/', transcr: 'инхэйлэ', ru: 'ингалятор', uz: 'ingalyator', tj: 'нафаскаш (ингалятор)', kg: 'ингалятор', kz: 'ингалятор' },
    { e: '🍬', en: 'lozenge', pn: '/ˈlɒzɪndʒ/', transcr: 'лозиндж', ru: 'леденец (от горла)', uz: 'so\'riladigan tabletka', tj: 'қанди доругӣ', kg: 'соруучу таблетка', kz: 'сорып жейтін дәрі' },
    { e: '💧', en: 'gargle', pn: '/ˈɡɑːɡl/', transcr: 'гагл', ru: 'полоскать горло', uz: 'g\'arg\'ara qilmoq', tj: 'ғарғара кардан', kg: 'тамак чайкоо', kz: 'тамақ шаю' },
    { e: '🍽️', en: 'appetite', pn: '/ˈæpɪtaɪt/', transcr: 'эпитайт', ru: 'аппетит', uz: 'ishtaha', tj: 'иштиҳо', kg: 'табит', kz: 'тәбет' },
    { e: '🥵', en: 'feverish', pn: '/ˈfiːvərɪʃ/', transcr: 'фивэриш', ru: 'температурящий (в жару)', uz: 'isitmali', tj: 'табдор', kg: 'ысытмалуу', kz: 'қызуы бар' },
    { e: '😮‍💨', en: 'breathless', pn: '/ˈbreθləs/', transcr: 'брэслэс', ru: 'задыхающийся', uz: 'nafasi qisilgan', tj: 'нафастангӣ', kg: 'деми кысылган', kz: 'тынысы тарылған' },
  ],
  dialogue: [
    { s: 'w', en: 'Hello, doctor. I have a fever and a bad headache since yesterday.', transcr: 'Хэлоу, доктэ. Ай хэв э фивэ энд э бэд хэдэйк синс йестэдэй.', ru: 'Здравствуйте, доктор. У меня жар и сильная головная боль со вчера.', uz: 'Salom, doktor. Kechadan beri menda isitma va kuchli bosh og\'rig\'i bor.', tj: 'Салом, духтур. Аз дирӯз ман таб ва дарди сахти сар дорам.', kg: 'Саламатсызбы, доктор. Кечээтен бери менде ысытма жана катуу баш оору бар.', kz: 'Сәлеметсіз бе, дәрігер. Кешеден бері менде қызу және қатты бас ауруы бар.' },
    { s: 'd', en: 'I see. Do you have a cough or a runny nose too?', transcr: 'Ай си. Ду ю хэв э коф о э рани ноуз ту?', ru: 'Понятно. У вас есть кашель или насморк тоже?', uz: 'Tushunarli. Sizda yo\'tal yoki burun oqishi ham bormi?', tj: 'Фаҳмидам. Оё шумо инчунин сулфа ё обилаи бинӣ доред?', kg: 'Түшүндүм. Сизде жөтөл же мурун агуу да барбы?', kz: 'Түсінікті. Сізде жөтел немесе мұрын ағу да бар ма?' },
    { s: 'w', en: 'Yes, a little. I also feel nausea and I cannot swallow easily.', transcr: 'Йес, э литл. Ай олсоу фил нозиэ энд ай кэнот своулоу изили.', ru: 'Да, немного. Ещё чувствую тошноту и не могу легко глотать.', uz: 'Ha, ozgina. Yana ko\'nglim aynaydi va oson yuta olmayman.', tj: 'Бале, каме. Инчунин дилбеҳузурӣ дорам ва ба осонӣ фурӯ бурда наметавонам.', kg: 'Ооба, бир аз. Дагы көңүлүм айнып, оңой жута албайм.', kz: 'Иә, сәл. Тағы жүрегім айниды және оңай жұта алмаймын.' },
    { s: 'd', en: 'If you have a fever, you should rest and drink plenty of fluids.', transcr: 'Иф ю хэв э фивэ, ю шуд рэст энд дринк плэнти оф флуидз.', ru: 'Если у вас жар, вам следует отдыхать и пить много жидкости.', uz: 'Agar isitmangiz bo\'lsa, dam olib, ko\'p suyuqlik ichishingiz kerak.', tj: 'Агар таб дошта бошед, бояд истироҳат кунед ва моеъи зиёд нӯшед.', kg: 'Эгер ысытмаңыз болсо, эс алып, көп суюктук ичишиңиз керек.', kz: 'Егер қызуыңыз болса, демалып, көп сұйықтық ішуіңіз керек.' },
    { s: 'w', en: 'Should I take any medicine? And should I go to work tomorrow?', transcr: 'Шуд ай тэйк эни мэдисин? Энд шуд ай гоу ту уёк тумороу?', ru: 'Мне принимать какое-нибудь лекарство? И стоит ли идти на работу завтра?', uz: 'Biror dori ichishim kerakmi? Va ertaga ishga borishim kerakmi?', tj: 'Ман бояд ягон дору хӯрам? Ва пагоҳ ба кор равам?', kg: 'Кандайдыр дары ичишим керекпи? Жана эртең жумушка барышым керекпи?', kz: 'Қандай да бір дәрі ішуім керек пе? Және ертең жұмысқа баруым керек пе?' },
    { s: 'd', en: 'Take this syrup, one spoonful twice a day. You shouldn\'t go to work yet.', transcr: 'Тэйк зис сирэп, уан спунфул твайс э дэй. Ю шуднт гоу ту уёк йет.', ru: 'Принимайте этот сироп, одну ложку дважды в день. Вам пока не следует идти на работу.', uz: 'Bu siropdan kuniga ikki marta bir qoshiqdan iching. Hozircha ishga bormang.', tj: 'Ин шарбатро рӯзе ду бор як қошуқӣ нӯшед. Ҳоло ба кор рафтан набояд.', kg: 'Бул сиропту күнүнө эки жолу бир кашыктан ичиңиз. Азырынча жумушка барбаңыз.', kz: 'Бұл сиропты күніне екі рет бір қасықтан ішіңіз. Әзірге жұмысқа барманыз.' },
    { s: 'w', en: 'Okay. The fever makes me very drowsy and I have no appetite.', transcr: 'Оукэй. Зэ фивэ мэйкс ми вэри драузи энд ай хэв ноу эпитайт.', ru: 'Хорошо. От жара я очень сонный, и у меня нет аппетита.', uz: 'Mayli. Isitma meni juda uyquchan qiladi va ishtaham yo\'q.', tj: 'Хуб. Таб маро хеле хобовар мекунад ва иштиҳо надорам.', kg: 'Жакшы. Ысытма мени абдан уйкулуу кылат жана табитим жок.', kz: 'Жақсы. Қызу мені қатты ұйқышыл етеді және тәбетім жоқ.' },
    { s: 'd', en: 'That is normal. Avoid cold drinks, and sip warm water often.', transcr: 'Зэт из номэл. Эвойд колд дринкс, энд сип уом уотэ офэн.', ru: 'Это нормально. Избегайте холодных напитков и часто пейте тёплую воду маленькими глотками.', uz: 'Bu normal. Sovuq ichimliklardan saqlaning va tez-tez iliq suvni ho\'plab iching.', tj: 'Ин табиист. Аз нӯшокиҳои хунук парҳез кунед ва зуд-зуд оби гармро қурт-қурт нӯшед.', kg: 'Бул кадимки нерсе. Муздак суусундуктардан качыңыз жана жылуу сууну тез-тез ууртап ичиңиз.', kz: 'Бұл қалыпты. Суық сусындардан аулақ болыңыз және жылы суды жиі ұрттап ішіңіз.' },
    { s: 'w', en: 'What should I do if it gets worse or I feel breathless?', transcr: 'Уот шуд ай ду иф ит гетс уёс о ай фил брэслэс?', ru: 'Что мне делать, если станет хуже или будет трудно дышать?', uz: 'Agar yomonlashsa yoki nafasim qisilsa, nima qilishim kerak?', tj: 'Агар бадтар шавад ё нафасам танг шавад, чӣ кор кунам?', kg: 'Эгер начарласа же демим кысылса, эмне кылышым керек?', kz: 'Егер нашарласа немесе тынысым тарылса, не істеуім керек?' },
    { s: 'd', en: 'If it gets worse, you should call 111. If it is serious, call 999.', transcr: 'Иф ит гетс уёс, ю шуд кол уан-уан-уан. Иф ит из сириэс, кол найн-найн-найн.', ru: 'Если станет хуже, позвоните в 111. Если серьёзно — звоните 999.', uz: 'Agar yomonlashsa, 111 ga qo\'ng\'iroq qiling. Jiddiy bo\'lsa, 999 ga.', tj: 'Агар бадтар шавад, ба 111 занг занед. Агар ҷиддӣ бошад, ба 999.', kg: 'Эгер начарласа, 111ге чалыңыз. Олуттуу болсо, 999га.', kz: 'Егер нашарласа, 111-ге қоңырау шалыңыз. Ауыр болса, 999-ға.' },
  ],
  quiz: [
    { q: '[COMPLETE] You ___ rest if you have a fever.', opts: ['should', 'shoulds', 'to should', 'are should'], c: 0, hint_ru: 'Совет: should + глагол без to', hint_uz: 'Maslahat: should + to siz fe\'l', hint_tj: 'Маслиҳат: should + феъл бе to', hint_kg: 'Кеңеш: should + to сиз этиш', hint_kz: 'Кеңес: should + to-сыз етістік', expl_ru: 'should + базовый глагол (rest), без to и без -s.', expl_uz: 'should + asosiy fe\'l (rest), to siz va -s siz.', expl_tj: 'should + феъли асосӣ (rest), бе to ва -s.', expl_kg: 'should + негизги этиш (rest), to сиз жана -s сиз.', expl_kz: 'should + негізгі етістік (rest), to-сыз және -s-сыз.' },
    { q: '[COMPLETE] You ___ go to work when you are ill.', opts: ["shouldn't", "should", "don't should", "not should"], c: 0, hint_ru: 'Отрицательный совет', hint_uz: 'Inkor maslahat', hint_tj: 'Маслиҳати манфӣ', hint_kg: 'Терс кеңеш', hint_kz: 'Теріс кеңес', expl_ru: 'shouldn\'t = should not — не следует.', expl_uz: 'shouldn\'t = should not — kerak emas.', expl_tj: 'shouldn\'t = should not — набояд.', expl_kg: 'shouldn\'t = should not — керек эмес.', expl_kz: 'shouldn\'t = should not — керек емес.' },
    { q: '[COMPLETE] ___ you have a fever, you should see a GP.', opts: ['If', 'Are', 'Do', 'Should'], c: 0, hint_ru: 'Условие = первое условное', hint_uz: 'Shart = birinchi shart', hint_tj: 'Шарт = шарти якум', hint_kg: 'Шарт = биринчи шарт', hint_kz: 'Шарт = бірінші шарт', expl_ru: 'First Conditional: If + настоящее время, ... should ...', expl_uz: 'First Conditional: If + hozirgi zamon, ... should ...', expl_tj: 'First Conditional: If + замони ҳозира, ... should ...', expl_kg: 'First Conditional: If + учур чак, ... should ...', expl_kz: 'First Conditional: If + осы шақ, ... should ...' },
    { q: '[TRANSLATE] Как сказать "насморк"?', opts: ['a runny nose', 'a sore back', 'a broken arm', 'a high fever'], c: 0, hint_ru: 'Когда из носа течёт', hint_uz: 'Burundan suv oqqanda', hint_tj: 'Вақте аз бинӣ об меравад', hint_kg: 'Мурундан суу аккканда', hint_kz: 'Мұрыннан су аққанда', expl_ru: '"runny nose" — насморк.', expl_uz: '"runny nose" — burun oqishi.', expl_tj: '"runny nose" — обилаи бинӣ.', expl_kg: '"runny nose" — мурун агуу.', expl_kz: '"runny nose" — мұрын ағу.' },
    { q: '[COMPLETE] What ___ I do if the medicine does not help?', opts: ['should', 'do should', 'am', 'shoulds'], c: 0, hint_ru: 'Вопрос-совет с should', hint_uz: 'should bilan savol-maslahat', hint_tj: 'Савол-маслиҳат бо should', hint_kg: 'should менен суроо-кеңеш', hint_kz: 'should арқылы сұрақ-кеңес', expl_ru: 'What should I do? — порядок: What + should + I + глагол.', expl_uz: 'What should I do? — tartib: What + should + I + fe\'l.', expl_tj: 'What should I do? — тартиб: What + should + I + феъл.', expl_kg: 'What should I do? — тартип: What + should + I + этиш.', expl_kz: 'What should I do? — тәртіп: What + should + I + етістік.' },
    { q: '[TRANSLATE] Как сказать "полоскать горло"?', opts: ['to gargle', 'to swallow', 'to sneeze', 'to breathe'], c: 0, hint_ru: 'Тёплой водой при боли в горле', hint_uz: 'Tomoq og\'rig\'ida iliq suv bilan', hint_tj: 'Бо оби гарм ҳангоми дарди гулӯ', hint_kg: 'Тамак ооруганда жылуу суу менен', hint_kz: 'Тамақ ауырғанда жылы сумен', expl_ru: '"gargle" — полоскать горло; swallow — глотать.', expl_uz: '"gargle" — g\'arg\'ara qilmoq; swallow — yutmoq.', expl_tj: '"gargle" — ғарғара кардан; swallow — фурӯ бурдан.', expl_kg: '"gargle" — тамак чайкоо; swallow — жутуу.', expl_kz: '"gargle" — тамақ шаю; swallow — жұту.' },
    { q: '[COMPLETE] He ___ ignore chest pain — it can be serious.', opts: ["shouldn't", "should", "shouldn't to", "not should"], c: 0, hint_ru: 'Сильный отрицательный совет', hint_uz: 'Kuchli inkor maslahat', hint_tj: 'Маслиҳати манфии қавӣ', hint_kg: 'Күчтүү терс кеңеш', hint_kz: 'Күшті теріс кеңес', expl_ru: 'He shouldn\'t ignore — после shouldn\'t глагол без to.', expl_uz: 'He shouldn\'t ignore — shouldn\'t dan keyin to siz.', expl_tj: 'He shouldn\'t ignore — пас аз shouldn\'t бе to.', expl_kg: 'He shouldn\'t ignore — shouldn\'t дан кийин to сиз.', expl_kz: 'He shouldn\'t ignore — shouldn\'t кейін to-сыз.' },
    { q: '[TRANSLATE] Как сказать "пить маленькими глотками"?', opts: ['to sip', 'to spill', 'to pour', 'to drop'], c: 0, hint_ru: 'Понемногу, медленно пить', hint_uz: 'Oz-ozdan, sekin ichish', hint_tj: 'Кам-кам, оҳиста нӯшидан', hint_kg: 'Аз-аздан, жай ичүү', hint_kz: 'Аз-аздан, баяу ішу', expl_ru: '"sip" — пить маленькими глотками.', expl_uz: '"sip" — ho\'plab ichmoq.', expl_tj: '"sip" — қурт-қурт нӯшидан.', expl_kg: '"sip" — ууртап ичүү.', expl_kz: '"sip" — ұрттап ішу.' },
    { q: '[COMPLETE] If it ___ worse, you should call 111.', opts: ['gets', 'get', 'getting', 'got'], c: 0, hint_ru: 'After "if" — настоящее время, 3-е лицо', hint_uz: '"if" dan keyin — hozirgi zamon, 3-shaxs', hint_tj: 'Пас аз "if" — замони ҳозира, шахси 3', hint_kg: '"if" дан кийин — учур чак, 3-жак', hint_kz: '"if" кейін — осы шақ, 3-жақ', expl_ru: 'First Conditional: if + Present Simple (it gets), главная часть с should.', expl_uz: 'First Conditional: if + Present Simple (it gets).', expl_tj: 'First Conditional: if + Present Simple (it gets).', expl_kg: 'First Conditional: if + Present Simple (it gets).', expl_kz: 'First Conditional: if + Present Simple (it gets).' },
    { q: '[TRANSLATE] Как сказать "У меня нет аппетита"?', opts: ['I have no appetite', 'I have no money', 'I have no time', 'I have no pain'], c: 0, hint_ru: 'Когда не хочется есть', hint_uz: 'Ovqat yegisi kelmaganda', hint_tj: 'Вақте хӯрдан намехоҳӣ', hint_kg: 'Тамак жегиси келбегенде', hint_kz: 'Тамақ жегісі келмегенде', expl_ru: '"appetite" — аппетит; no appetite — нет аппетита.', expl_uz: '"appetite" — ishtaha; no appetite — ishtaha yo\'q.', expl_tj: '"appetite" — иштиҳо; no appetite — иштиҳо нест.', expl_kg: '"appetite" — табит; no appetite — табит жок.', expl_kz: '"appetite" — тәбет; no appetite — тәбет жоқ.' },
  ],
};

// ── validation (dry run) ───────────────────────────────────────────────────
const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];
const a1 = require('./lessons_data.js'), a2 = require('./lessons_data_a2.js'), b1 = require('./lessons_data_b1.js');
const used = new Map();
[['a1', a1], ['a2', a2], ['b1', b1]].forEach(([c, C]) => C.forEach(l => l.words.forEach(w => used.set(w.en.trim().toLowerCase(), c + ' L' + l.id))));

const LESSON = L9;
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

const ALLOW = new Set(('a an the this that these those some any all and or but if so as to of in on at for with by from i you he she it we they me him her us them my your his its our their is am are was were be been being do does did have has had will would can could should shouldn shouldnt not no yes very too also just now here there then what where when who which why how about into over under up down out off back well good thank thanks please sorry hello okay ok since for ever never long more most than new small before after already because feel feels felt make makes made get gets got take takes day today tomorrow yesterday work water cold warm bad worse easily often plenty little yet normal twice see').split(/\s+/));
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
  console.log('\n✅ APPLIED: L9 injected into b1.html (string-aware). MODS unchanged (finalised after L12).');
}
