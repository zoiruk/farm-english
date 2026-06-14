/**
 * build_b1_l8.js — author B1 Lesson 8 "Несчастный случай на ферме".
 * Grammar: Past Perfect (had + V3 — the earlier of two past events; reporting an incident).
 * Module 4 (Health & Safety). Continues B1 L1 (Past Simple/Continuous) and L7.
 *
 * Dry-run by default: validates structure, cross-course duplicates and Snowball.
 * Pass --apply to inject the lesson into b1.html (LESSONS only; MODS finalised after L12).
 *
 * Translations: ru/en authored; uz/tj/kg/kz are AI drafts flagged for native review.
 */
const fs = require('fs');
const path = require('path');

const grid = (rows) =>
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">' +
  rows.map(([en, tr, ru]) => `<div><code>${en}</code> <span class="g-transcr">[${tr}]</span> (${ru})</div>`).join('') +
  '</div>';

const L8 = {
  id: 8,
  mod: 4,
  name_ru: 'Несчастный случай на ферме',
  name_uz: 'Fermada baxtsiz hodisa',
  name_tj: 'Ҳодисаи нохуш дар ферма',
  name_kg: 'Фермадагы кырсык',
  name_kz: 'Фермадағы жазатайым оқиға',
  cefr: 'Past Perfect (had + V3 — the earlier past event)',
  grammar: {
    title_ru: 'PAST PERFECT — что случилось РАНЬШЕ другого прошлого действия',
    title_uz: 'PAST PERFECT — boshqa o\'tgan ishdan OLDIN nima bo\'lgan',
    title_tj: 'PAST PERFECT — пеш аз амали дигари гузашта чӣ шуда буд',
    title_kg: 'PAST PERFECT — башка өткөн иштен МУРУН эмне болгон',
    title_kz: 'PAST PERFECT — басқа өткен әрекеттен БҰРЫН не болған',
    intro_ru: '<div style="line-height:1.6">Используйте <b>Past Perfect</b> (<b>had</b> + 3-я форма глагола), чтобы показать, что одно действие случилось <b>раньше</b> другого действия в прошлом. Это важно, когда вы рассказываете об инциденте: что уже произошло <b>к моменту</b>, когда кто-то пришёл на помощь.<br>✅ <i>When the manager arrived, the worker <b>had</b> already <b>fallen</b>.</i><br>✅ <i>She slipped because the floor <b>had been</b> wet.</i></div>',
    intro_uz: '<div style="line-height:1.6"><b>Past Perfect</b> (<b>had</b> + fe\'lning 3-shakli) bir ish o\'tmishdagi boshqa ishdan <b>oldin</b> bo\'lganini ko\'rsatish uchun ishlatiladi. Hodisa haqida gapirganda muhim: kimdir yordamga kelgan <b>paytgacha</b> nima bo\'lib bo\'lgan.<br>✅ <i>When the manager arrived, the worker had already fallen.</i></div>',
    intro_tj: '<div style="line-height:1.6"><b>Past Perfect</b> (<b>had</b> + шакли 3-юми феъл) барои нишон додани он, ки як амал <b>пеш аз</b> амали дигари гузашта рӯй дода буд, истифода мешавад. Ҳангоми нақл дар бораи ҳодиса муҳим аст.<br>✅ <i>When the manager arrived, the worker had already fallen.</i></div>',
    intro_kg: '<div style="line-height:1.6"><b>Past Perfect</b> (<b>had</b> + этиштин 3-формасы) бир иш өткөндөгү башка иштен <b>мурун</b> болгонун көрсөтүү үчүн колдонулат. Кырсык жөнүндө айтканда маанилүү.<br>✅ <i>When the manager arrived, the worker had already fallen.</i></div>',
    intro_kz: '<div style="line-height:1.6"><b>Past Perfect</b> (<b>had</b> + етістіктің 3-формасы) бір әрекет өткендегі басқа әрекеттен <b>бұрын</b> болғанын көрсету үшін қолданылады. Оқиға туралы айтқанда маңызды.<br>✅ <i>When the manager arrived, the worker had already fallen.</i></div>',
    cultural_ru: 'В Великобритании о любой травме на работе нужно сообщить (report) и записать в журнал происшествий (accident book). Это ваше право и защита: если травма серьёзная, работодатель обязан вызвать скорую (999) и сообщить в HSE (Health and Safety Executive). Никогда не бойтесь сообщать о небезопасных условиях.',
    cultural_uz: 'Buyuk Britaniyada ishdagi har qanday jarohat haqida xabar berish (report) va hodisalar daftariga (accident book) yozish kerak. Bu sizning huquqingiz va himoyangiz: jiddiy jarohatda ish beruvchi tez yordam (999) chaqirishi shart.',
    cultural_tj: 'Дар Британияи Кабир дар бораи ҳар гуна ҷароҳат дар кор хабар додан (report) ва ба дафтари ҳодисаҳо (accident book) навиштан лозим аст. Ин ҳуқуқ ва ҳимояи шумост.',
    cultural_kg: 'Улуу Британияда иштеги ар кандай жаракат жөнүндө билдирүү (report) жана кырсык журналына (accident book) жазуу керек. Бул сиздин укугуңуз жана коргооңуз.',
    cultural_kz: 'Ұлыбританияда жұмыстағы кез келген жарақат туралы хабарлау (report) және оқиға журналына (accident book) жазу керек. Бұл сіздің құқығыңыз бен қорғанысыңыз.',
    note_ru: '⚠️ Past Perfect (had fallen — действие ДО другого прошлого) ≠ Present Perfect (has fallen — связь с настоящим)! Сравните: "had" для прошлого, "has/have" для настоящего.',
    note_uz: '⚠️ Past Perfect (had fallen — boshqa o\'tmishdan OLDIN) ≠ Present Perfect (has fallen — hozir bilan bog\'liq)! "had" — o\'tmish uchun, "has/have" — hozir uchun.',
    note_tj: '⚠️ Past Perfect (had fallen — пеш аз гузаштаи дигар) ≠ Present Perfect (has fallen — алоқа бо ҳозира)! "had" барои гузашта, "has/have" барои ҳозира.',
    note_kg: '⚠️ Past Perfect (had fallen — башка өткөндөн МУРУН) ≠ Present Perfect (has fallen — азыр менен байланыш)! "had" — өткөн үчүн, "has/have" — азыр үчүн.',
    note_kz: '⚠️ Past Perfect (had fallen — басқа өткеннен БҰРЫН) ≠ Present Perfect (has fallen — қазірмен байланыс)! "had" — өткен үшін, "has/have" — қазір үшін.',
    forms: {
      positive: {
        label_ru: '✅ Утверждение', label_uz: '✅ Tasdiq', label_tj: '✅ Тасдиқ', label_kg: '✅ Ырастоо', label_kz: '✅ Растау',
        rule_ru: grid([
          ['I had finished', 'ай хэд финишт', 'я (уже) закончил'],
          ['She had fallen', 'ши хэд фолэн', 'она (уже) упала'],
          ['had already gone', 'хэд олрэди гон', 'уже ушёл'],
          ['the floor had been wet', 'зэ фло хэд бин уэт', 'пол был мокрым (до этого)'],
        ]),
        rule_uz: grid([
          ['I had finished', 'ай хэд финишт', 'men tugatgandim'],
          ['She had fallen', 'ши хэд фолэн', 'u yiqilgandi'],
          ['had already gone', 'хэд олрэди гон', 'allaqachon ketgandi'],
          ['the floor had been wet', 'зэ фло хэд бин уэт', 'pol ho\'l bo\'lgan edi'],
        ]),
        rule_tj: grid([
          ['I had finished', 'ай хэд финишт', 'ман тамом карда будам'],
          ['She had fallen', 'ши хэд фолэн', 'вай афтода буд'],
          ['had already gone', 'хэд олрэди гон', 'аллакай рафта буд'],
          ['the floor had been wet', 'зэ фло хэд бин уэт', 'фарш тар буд'],
        ]),
        rule_kg: grid([
          ['I had finished', 'ай хэд финишт', 'мен бүтүргөм'],
          ['She had fallen', 'ши хэд фолэн', 'ал жыгылган эле'],
          ['had already gone', 'хэд олрэди гон', 'мурдатан кеткен эле'],
          ['the floor had been wet', 'зэ фло хэд бин уэт', 'пол нымдуу болчу'],
        ]),
        rule_kz: grid([
          ['I had finished', 'ай хэд финишт', 'мен бітіргенмін'],
          ['She had fallen', 'ши хэд фолэн', 'ол құлаған еді'],
          ['had already gone', 'хэд олрэди гон', 'әлдеқашан кеткен еді'],
          ['the floor had been wet', 'зэ фло хэд бин уэт', 'еден ылғал болған'],
        ]),
        table: [
          { subj: 'I', verb: 'had finished', example: 'I had finished work before the accident happened.', transcr: 'Ай хэд финишт уёк бифо зи эксидэнт хэпэнд', tr_ru: 'Я закончил работу до того, как случился несчастный случай.', tr_uz: 'Baxtsiz hodisa yuz berishidan oldin men ishni tugatgandim.', tr_tj: 'Пеш аз он ки ҳодиса рӯй диҳад, ман корро тамом карда будам.', tr_kg: 'Кырсык болоордон мурун мен жумушту бүтүргөм.', tr_kz: 'Жазатайым оқиға болғанға дейін мен жұмысты бітіргенмін.' },
          { subj: 'She', verb: 'had slipped', example: 'She had slipped on the wet floor before we arrived.', transcr: 'Ши хэд слипт он зэ уэт фло бифо уи эрайвд', tr_ru: 'Она поскользнулась на мокром полу до того, как мы пришли.', tr_uz: 'Biz kelishimizdan oldin u ho\'l polda sirg\'anib ketgandi.', tr_tj: 'Пеш аз омадани мо вай дар фарши тар лағжида буд.', tr_kg: 'Биз келгенге чейин ал нымдуу полдо тайгаланган эле.', tr_kz: 'Біз келгенге дейін ол ылғал еденде тайып кеткен еді.' },
          { subj: 'They', verb: 'had called', example: 'They had called the paramedic before the manager came.', transcr: 'Зэй хэд колд зэ пэрэмэдик бифо зэ мэниджэ кейм', tr_ru: 'Они вызвали медика до того, как пришёл менеджер.', tr_uz: 'Menejer kelishidan oldin ular tez yordam chaqirishgandi.', tr_tj: 'Пеш аз омадани менеҷер онҳо ёрии таъҷилӣ ҷеғ зада буданд.', tr_kg: 'Менеджер келгенге чейин алар медикти чакырышкан.', tr_kz: 'Менеджер келгенге дейін олар жедел жәрдем шақырған.' },
          { subj: 'We', verb: 'had moved', example: 'We had moved him to a safe place before the paramedic arrived.', transcr: 'Уи хэд мувд хим ту э сэйф плэйс бифо зэ пэрэмэдик эрайвд', tr_ru: 'Мы перенесли его в безопасное место до приезда медика.', tr_uz: 'Tez yordam kelishidan oldin biz uni xavfsiz joyga ko\'chirgandik.', tr_tj: 'Пеш аз омадани ёрии таъҷилӣ мо вайро ба ҷои бехатар кӯчонда будем.', tr_kg: 'Медик келгенге чейин биз аны коопсуз жайга которгонбуз.', tr_kz: 'Жедел жәрдем келгенге дейін біз оны қауіпсіз жерге көшіргенбіз.' },
        ],
      },
      negative: {
        label_ru: '❌ Отрицание', label_uz: '❌ Inkor', label_tj: '❌ Инкор', label_kg: '❌ Тангуу', label_kz: '❌ Болымсыз',
        rule_ru: grid([
          ['I had not seen', 'ай хэд нот син', 'я не видел'],
          ["hadn't reported", 'хэднт рипотид', 'не сообщил'],
          ['She had not been', 'ши хэд нот бин', 'она не была'],
          ["hadn't noticed", 'хэднт ноутист', 'не заметил'],
        ]),
        rule_uz: grid([
          ['I had not seen', 'ай хэд нот син', 'men ko\'rmagandim'],
          ["hadn't reported", 'хэднт рипотид', 'xabar bermagandim'],
          ['She had not been', 'ши хэд нот бин', 'u bo\'lmagandi'],
          ["hadn't noticed", 'хэднт ноутист', 'sezmagandim'],
        ]),
        rule_tj: grid([
          ['I had not seen', 'ай хэд нот син', 'ман надида будам'],
          ["hadn't reported", 'хэднт рипотид', 'хабар надода будам'],
          ['She had not been', 'ши хэд нот бин', 'вай набуд'],
          ["hadn't noticed", 'хэднт ноутист', 'пай набурда будам'],
        ]),
        rule_kg: grid([
          ['I had not seen', 'ай хэд нот син', 'мен көргөн эмесмин'],
          ["hadn't reported", 'хэднт рипотид', 'билдирген эмесмин'],
          ['She had not been', 'ши хэд нот бин', 'ал болгон эмес'],
          ["hadn't noticed", 'хэднт ноутист', 'байкабаптырмын'],
        ]),
        rule_kz: grid([
          ['I had not seen', 'ай хэд нот син', 'мен көрмеген едім'],
          ["hadn't reported", 'хэднт рипотид', 'хабарламаған едім'],
          ['She had not been', 'ши хэд нот бин', 'ол болмаған еді'],
          ["hadn't noticed", 'хэднт ноутист', 'байқамаған едім'],
        ]),
        table: [
          { subj: 'I', verb: "hadn't seen", example: "I hadn't seen the warning sign before I slipped.", transcr: 'Ай хэднт син зэ уонин сайн бифо ай слипт', tr_ru: 'Я не видел предупреждающий знак до того, как поскользнулся.', tr_uz: 'Sirg\'anishimdan oldin men ogohlantiruvchi belgini ko\'rmagandim.', tr_tj: 'Пеш аз лағжиданам ман аломати огоҳкунандаро надида будам.', tr_kg: 'Тайганганга чейин мен эскертүү белгисин көргөн эмесмин.', tr_kz: 'Тайғанға дейін мен ескерту белгісін көрмеген едім.' },
          { subj: 'He', verb: "hadn't reported", example: "He hadn't reported the spill, so nobody cleaned it.", transcr: 'Хи хэднт рипотид зэ спил, соу ноубоди клинд ит', tr_ru: 'Он не сообщил о разливе, поэтому никто его не убрал.', tr_uz: 'U to\'kilgan suyuqlik haqida xabar bermagandi, shuning uchun hech kim tozalamadi.', tr_tj: 'Вай дар бораи рехтан хабар надода буд, бинобар ин касе онро тоза накард.', tr_kg: 'Ал төгүлгөн жөнүндө билдирген эмес, ошондуктан эч ким тазалаган жок.', tr_kz: 'Ол төгілген сұйықтық туралы хабарламаған, сондықтан ешкім тазаламады.' },
          { subj: 'We', verb: "hadn't finished", example: "We hadn't finished the safety check when the bell rang.", transcr: 'Уи хэднт финишт зэ сэйфти чек уэн зэ бэл рэнг', tr_ru: 'Мы не закончили проверку безопасности, когда прозвенел звонок.', tr_uz: 'Qo\'ng\'iroq chalinganda biz xavfsizlik tekshiruvini tugatmagandik.', tr_tj: 'Вақте ки занг занг зад, мо санҷиши бехатариро тамом накарда будем.', tr_kg: 'Коңгуроо кагылганда биз коопсуздук текшерүүсүн бүтүргөн эмеспиз.', tr_kz: 'Қоңырау соғылғанда біз қауіпсіздік тексеруін бітірмеген едік.' },
        ],
      },
      question: {
        label_ru: '❓ Вопрос', label_uz: '❓ Savol', label_tj: '❓ Савол', label_kg: '❓ Суроо', label_kz: '❓ Сұрақ',
        rule_ru: grid([
          ['What had happened?', 'уот хэд хэпэнд', 'что случилось (раньше)?'],
          ['Had you reported it?', 'хэд ю рипотид ит', 'ты сообщил об этом?'],
          ['Had she fallen?', 'хэд ши фолэн', 'она упала?'],
          ['Why had he gone?', 'уай хэд хи гон', 'почему он ушёл?'],
        ]),
        rule_uz: grid([
          ['What had happened?', 'уот хэд хэпэнд', 'nima bo\'lgandi?'],
          ['Had you reported it?', 'хэд ю рипотид ит', 'xabar berganmidingiz?'],
          ['Had she fallen?', 'хэд ши фолэн', 'u yiqilganmidi?'],
          ['Why had he gone?', 'уай хэд хи гон', 'nega u ketgandi?'],
        ]),
        rule_tj: grid([
          ['What had happened?', 'уот хэд хэпэнд', 'чӣ шуда буд?'],
          ['Had you reported it?', 'хэд ю рипотид ит', 'хабар дода будӣ?'],
          ['Had she fallen?', 'хэд ши фолэн', 'вай афтода буд?'],
          ['Why had he gone?', 'уай хэд хи гон', 'чаро вай рафта буд?'],
        ]),
        rule_kg: grid([
          ['What had happened?', 'уот хэд хэпэнд', 'эмне болгон эле?'],
          ['Had you reported it?', 'хэд ю рипотид ит', 'билдирдиң беле?'],
          ['Had she fallen?', 'хэд ши фолэн', 'ал жыгылган беле?'],
          ['Why had he gone?', 'уай хэд хи гон', 'эмне үчүн ал кеткен эле?'],
        ]),
        rule_kz: grid([
          ['What had happened?', 'уот хэд хэпэнд', 'не болған еді?'],
          ['Had you reported it?', 'хэд ю рипотид ит', 'хабарладың ба?'],
          ['Had she fallen?', 'хэд ши фолэн', 'ол құлаған ба еді?'],
          ['Why had he gone?', 'уай хэд хи гон', 'неге ол кеткен еді?'],
        ]),
        table: [
          { subj: 'What', verb: 'had happened', example: 'What had happened before the supervisor arrived?', transcr: 'Уот хэд хэпэнд бифо зэ сьюпэвайзэ эрайвд', tr_ru: 'Что случилось до того, как пришёл супервайзер?', tr_uz: 'Nazoratchi kelishidan oldin nima bo\'lgandi?', tr_tj: 'Пеш аз омадани нозир чӣ шуда буд?', tr_kg: 'Көзөмөлчү келгенге чейин эмне болгон эле?', tr_kz: 'Бақылаушы келгенге дейін не болған еді?' },
          { subj: 'Had you', verb: 'reported', example: 'Had you reported the broken handrail before the fall?', transcr: 'Хэд ю рипотид зэ броукэн хэндрэйл бифо зэ фол', tr_ru: 'Вы сообщили о сломанном поручне до падения?', tr_uz: 'Yiqilishdan oldin siz singan ushlagichni xabar berganmidingiz?', tr_tj: 'Пеш аз афтидан шумо дар бораи дастаки шикаста хабар дода будед?', tr_kg: 'Жыгылуудан мурун сыныкан колтуткучту билдирдиң беле?', tr_kz: 'Құлағанға дейін сынған ұстағышты хабарладыңыз ба?' },
          { subj: 'Had they', verb: 'called', example: 'Had they called for help before he fainted?', transcr: 'Хэд зэй колд фо хэлп бифо хи фэйнтид', tr_ru: 'Они позвали на помощь до того, как он потерял сознание?', tr_uz: 'U hushidan ketishidan oldin ular yordam chaqirishganmidi?', tr_tj: 'Пеш аз он ки вай беҳуш шавад, онҳо ёрӣ ҷеғ зада буданд?', tr_kg: 'Ал эстен танганга чейин алар жардам чакырышкан беле?', tr_kz: 'Ол есінен танғанға дейін олар көмекке шақырған ба еді?' },
        ],
      },
    },
  },
  words: [
    { e: '🤕', en: 'bruise', pn: '/bruːz/', transcr: 'бруз', ru: 'синяк', uz: 'ko\'kargan joy', tj: 'кабудшавӣ', kg: 'көгала', kz: 'көгеру' },
    { e: '🦶', en: 'sprain', pn: '/spreɪn/', transcr: 'спрэйн', ru: 'растяжение', uz: 'cho\'zilish', tj: 'кашиш', kg: 'чоюлуу', kz: 'созылу' },
    { e: '🦴', en: 'fracture', pn: '/ˈfræktʃə/', transcr: 'фрэкчэ', ru: 'перелом', uz: 'singan suyak', tj: 'шикастани устухон', kg: 'сынуу', kz: 'сынық' },
    { e: '🩸', en: 'bleeding', pn: '/ˈbliːdɪŋ/', transcr: 'блидин', ru: 'кровотечение', uz: 'qon ketishi', tj: 'хунравӣ', kg: 'кан агуу', kz: 'қан кету' },
    { e: '😵‍💫', en: 'dizzy', pn: '/ˈdɪzi/', transcr: 'дизи', ru: 'головокружение (чувствовать)', uz: 'boshi aylanish', tj: 'сар чарх задан', kg: 'башы айлануу', kz: 'басы айналу' },
    { e: '😮‍💨', en: 'faint', pn: '/feɪnt/', transcr: 'фэйнт', ru: 'упасть в обморок', uz: 'hushidan ketmoq', tj: 'беҳуш шудан', kg: 'эстен тануу', kz: 'есінен тану' },
    { e: '🛌', en: 'stretcher', pn: '/ˈstretʃə/', transcr: 'стрэчэ', ru: 'носилки', uz: 'zambil', tj: 'замбар', kg: 'замбил', kz: 'зембіл' },
    { e: '🚑', en: 'paramedic', pn: '/ˌpærəˈmedɪk/', transcr: 'пэрэмэдик', ru: 'медик скорой помощи', uz: 'tez yordam shifokori', tj: 'фелдшери ёрии таъҷилӣ', kg: 'тез жардам медиги', kz: 'жедел жәрдем медигі' },
    { e: '🧊', en: 'slippery', pn: '/ˈslɪpəri/', transcr: 'слипэри', ru: 'скользкий', uz: 'sirpanchiq', tj: 'лағжанда', kg: 'тайгак', kz: 'тайғақ' },
    { e: '😵', en: 'unconscious', pn: '/ʌnˈkɒnʃəs/', transcr: 'анконшэс', ru: 'без сознания', uz: 'hushsiz', tj: 'беҳуш', kg: 'эссиз', kz: 'есінен танған' },
    { e: '♿', en: 'wheelchair', pn: '/ˈwiːltʃeə/', transcr: 'уилчеэ', ru: 'инвалидная коляска', uz: 'nogironlar aravachasi', tj: 'аробачаи маъюбон', kg: 'майып арабасы', kz: 'мүгедек арбасы' },
    { e: '🩼', en: 'crutches', pn: '/ˈkrʌtʃɪz/', transcr: 'кraces', ru: 'костыли', uz: 'hassalar', tj: 'асоҳо', kg: 'балдактар', kz: 'балдақтар' },
    { e: '🛗', en: 'handrail', pn: '/ˈhændreɪl/', transcr: 'хэндрэйл', ru: 'поручень', uz: 'ushlagich', tj: 'дастак', kg: 'колтуткуч', kz: 'ұстағыш' },
    { e: '🦵', en: 'ankle', pn: '/ˈæŋkl/', transcr: 'энкл', ru: 'лодыжка', uz: 'to\'piq', tj: 'буҷулак', kg: 'таман', kz: 'тобық' },
    { e: '✋', en: 'wrist', pn: '/rɪst/', transcr: 'рист', ru: 'запястье', uz: 'bilak', tj: 'банди даст', kg: 'билек', kz: 'білезік' },
    { e: '🎗️', en: 'sling', pn: '/slɪŋ/', transcr: 'слин', ru: 'повязка-косынка', uz: 'osma bog\'lam', tj: 'бандаки осма', kg: 'асма таңгыч', kz: 'асу таңғыш' },
    { e: '💦', en: 'spill', pn: '/spɪl/', transcr: 'спил', ru: 'разлив (пролить)', uz: 'to\'kilish', tj: 'рехтан', kg: 'төгүлүү', kz: 'төгілу' },
    { e: '🩹', en: 'scar', pn: '/skɑː/', transcr: 'ска', ru: 'шрам', uz: 'chandiq', tj: 'доғ', kg: 'тырык', kz: 'тыртық' },
    { e: '🤜', en: 'bump', pn: '/bʌmp/', transcr: 'бамп', ru: 'ушиб (шишка)', uz: 'shish (urilish)', tj: 'варам (зарба)', kg: 'томпок (сокку)', kz: 'соққы (томпақ)' },
    { e: '🆘', en: 'rescue', pn: '/ˈreskjuː/', transcr: 'рэскью', ru: 'спасать', uz: 'qutqarmoq', tj: 'наҷот додан', kg: 'куткаруу', kz: 'құтқару' },
    { e: '🚨', en: 'injure', pn: '/ˈɪndʒə/', transcr: 'инджэ', ru: 'травмировать', uz: 'jarohatlamoq', tj: 'ҷароҳат расондан', kg: 'жаракаттоо', kz: 'жарақаттау' },
    { e: '🌀', en: 'twisted', pn: '/ˈtwɪstɪd/', transcr: 'твистид', ru: 'подвёрнутый (вывихнутый)', uz: 'burab ketgan', tj: 'тобхӯрда', kg: 'бурулуп кеткен', kz: 'бұралып кеткен' },
    { e: '🚧', en: 'barrier', pn: '/ˈbæriə/', transcr: 'бэриэ', ru: 'ограждение', uz: 'to\'siq', tj: 'монеа', kg: 'тоскоол', kz: 'қоршау' },
    { e: '🔺', en: 'cone', pn: '/kəʊn/', transcr: 'коун', ru: 'дорожный конус', uz: 'yo\'l konusi', tj: 'конуси роҳ', kg: 'жол конусу', kz: 'жол конусы' },
    { e: '⬇️', en: 'collapse', pn: '/kəˈlæps/', transcr: 'кэлэпс', ru: 'рухнуть (упасть без сил)', uz: 'qulab tushmoq', tj: 'фурӯ ғалтидан', kg: 'кулап түшүү', kz: 'құлап түсу' },
    { e: '🩻', en: 'splint', pn: '/splɪnt/', transcr: 'сплинт', ru: 'шина (для перелома)', uz: 'shina (taxtacha)', tj: 'тахтача (шина)', kg: 'шина (такта)', kz: 'шина (тақтай)' },
    { e: '🧷', en: 'dressing', pn: '/ˈdresɪŋ/', transcr: 'дрэсин', ru: 'перевязка (на рану)', uz: 'bog\'lam', tj: 'бандинаи захм', kg: 'жара таңгычы', kz: 'жара таңуы' },
    { e: '🧴', en: 'antiseptic', pn: '/ˌæntiˈseptɪk/', transcr: 'энтисэптик', ru: 'антисептик', uz: 'antiseptik', tj: 'антисептик', kg: 'антисептик', kz: 'антисептик' },
    { e: '⚠️', en: 'caution', pn: '/ˈkɔːʃn/', transcr: 'кошн', ru: 'осторожность (предупреждение)', uz: 'ehtiyotkorlik', tj: 'эҳтиёткорӣ', kg: 'этияттык', kz: 'сақтық' },
    { e: '😖', en: 'graze', pn: '/ɡreɪz/', transcr: 'грэйз', ru: 'ссадина', uz: 'shilinish', tj: 'харошида', kg: 'сыйрылуу', kz: 'сыдырылу' },
  ],
  dialogue: [
    { s: 'm', en: 'Rustam, what had happened here before I arrived?', transcr: 'Рустам, уот хэд хэпэнд хиэ бифо ай эрайвд?', ru: 'Рустам, что здесь случилось до того, как я пришёл?', uz: 'Rustam, men kelishimdan oldin bu yerda nima bo\'lgandi?', tj: 'Рустам, пеш аз омадани ман дар ин ҷо чӣ шуда буд?', kg: 'Рустам, мен келгенге чейин бул жерде эмне болгон эле?', kz: 'Рустам, мен келгенге дейін мұнда не болған еді?' },
    { s: 'w', en: 'Ahmad had slipped on the wet floor and hurt his ankle.', transcr: 'Ахмад хэд слипт он зэ уэт фло энд хёт хиз энкл.', ru: 'Ахмад поскользнулся на мокром полу и повредил лодыжку.', uz: 'Ahmad ho\'l polda sirg\'anib, to\'pig\'ini lat yetkazgandi.', tj: 'Аҳмад дар фарши тар лағжида, буҷулакашро озор дода буд.', kg: 'Ахмад нымдуу полдо тайганып, таманын жаракаттаган.', kz: 'Ахмад ылғал еденде тайып, тобығын зақымдаған еді.' },
    { s: 'm', en: 'Why was the floor wet? Had someone reported the spill?', transcr: 'Уай уоз зэ фло уэт? Хэд самуан рипотид зэ спил?', ru: 'Почему пол был мокрым? Кто-нибудь сообщил о разливе?', uz: 'Nega pol ho\'l edi? Kimdir to\'kilgan suyuqlikni xabar berganmidi?', tj: 'Чаро фарш тар буд? Касе дар бораи рехтан хабар дода буд?', kg: 'Эмне үчүн пол нымдуу болчу? Бирөө төгүлгөн жөнүндө билдирген беле?', kz: 'Еден неге ылғал болды? Біреу төгілген сұйықтық туралы хабарлаған ба еді?' },
    { s: 'w', en: 'No. Nobody had seen it, and there was no warning sign.', transcr: 'Ноу. Ноубоди хэд син ит, энд зэа уоз ноу уонин сайн.', ru: 'Нет. Никто его не заметил, и не было предупреждающего знака.', uz: 'Yo\'q. Hech kim ko\'rmagandi va ogohlantiruvchi belgi yo\'q edi.', tj: 'Не. Касе онро надида буд ва аломати огоҳкунанда набуд.', kg: 'Жок. Эч ким көргөн эмес, эскертүү белгиси да жок болчу.', kz: 'Жоқ. Ешкім байқамаған, ескерту белгісі де болмады.' },
    { s: 'm', en: 'Is he bleeding? Can he stand, or do we need a stretcher?', transcr: 'Из хи блидин? Кэн хи стэнд, о ду уи нид э стрэчэ?', ru: 'У него кровотечение? Он может стоять, или нужны носилки?', uz: 'U qon ketyaptimi? Tura oladimi yoki zambil kerakmi?', tj: 'Вай хун меравад? Вай рост шуда метавонад ё замбар лозим аст?', kg: 'Анын каны агып жатабы? Тура алабы же замбил керекпи?', kz: 'Оның қаны ағып жатыр ма? Тұра ала ма, әлде зембіл керек пе?' },
    { s: 'w', en: 'He has a small graze, but his ankle is swollen and twisted.', transcr: 'Хи хэз э смол грэйз, бат хиз энкл из суолэн энд твистид.', ru: 'У него небольшая ссадина, но лодыжка опухла и подвёрнута.', uz: 'Unda kichik shilinish bor, lekin to\'pig\'i shishgan va burab ketgan.', tj: 'Вай харошидаи хурд дорад, аммо буҷулакаш варам карда ва тобхӯрда аст.', kg: 'Анда кичине сыйрылуу бар, бирок таманы шишип, бурулуп кеткен.', kz: 'Онда кішкене сыдырылу бар, бірақ тобығы ісіп, бұралып кеткен.' },
    { s: 'm', en: 'Okay. I had already called the paramedic before I came.', transcr: 'Оукэй. Ай хэд олрэди колд зэ пэрэмэдик бифо ай кейм.', ru: 'Хорошо. Я уже вызвал медика, прежде чем прийти.', uz: 'Mayli. Men kelishimdan oldin allaqachon tez yordam chaqirgandim.', tj: 'Хуб. Ман пеш аз омаданам аллакай ёрии таъҷилиро ҷеғ зада будам.', kg: 'Жакшы. Мен келгенге чейин эле медикти чакыргам.', kz: 'Жақсы. Мен келерден бұрын жедел жәрдемді шақырып қойғанмын.' },
    { s: 'w', en: 'Good. We put a dressing on the graze and gave him water.', transcr: 'Гуд. Уи пут э дрэсин он зэ грэйз энд гейв хим уотэ.', ru: 'Хорошо. Мы наложили повязку на ссадину и дали ему воды.', uz: 'Yaxshi. Biz shilinishga bog\'lam qo\'ydik va unga suv berdik.', tj: 'Хуб. Мо ба харошида бандина гузоштем ва ба вай об додем.', kg: 'Жакшы. Биз сыйрылууга таңгыч салдык жана ага суу бердик.', kz: 'Жақсы. Біз сыдырылуға таңғыш салып, оған су бердік.' },
    { s: 'm', en: 'Well done. We must put a barrier and a cone near the wet floor.', transcr: 'Уэл дан. Уи маст пут э бэриэ энд э коун ниэ зэ уэт фло.', ru: 'Молодцы. Мы должны поставить ограждение и конус у мокрого пола.', uz: 'Barakalla. Biz ho\'l pol yoniga to\'siq va konus qo\'yishimiz kerak.', tj: 'Офарин. Мо бояд назди фарши тар монеа ва конус гузорем.', kg: 'Азаматсыңар. Биз нымдуу полдун жанына тоскоол жана конус коюшубуз керек.', kz: 'Жарайсыңдар. Біз ылғал еденнің қасына қоршау мен конус қоюымыз керек.' },
    { s: 'w', en: 'Yes. I will report it in the accident book right now.', transcr: 'Йес. Ай уил рипот ит ин зи эксидэнт бук райт нау.', ru: 'Да. Я запишу это в журнал происшествий прямо сейчас.', uz: 'Ha. Men buni hodisalar daftariga hozir yozaman.', tj: 'Бале. Ман инро ҳозир ба дафтари ҳодисаҳо менависам.', kg: 'Ооба. Мен муну азыр кырсык журналына жазам.', kz: 'Иә. Мен мұны қазір оқиға журналына жазамын.' },
  ],
  quiz: [
    { q: '[COMPLETE] When the manager arrived, the worker ___ already fallen.', opts: ['had', 'has', 'have', 'was'], c: 0, hint_ru: 'Действие ДО другого прошлого = Past Perfect', hint_uz: 'Boshqa o\'tmishdan OLDINgi ish = Past Perfect', hint_tj: 'Амали пеш аз гузаштаи дигар = Past Perfect', hint_kg: 'Башка өткөндөн МУРУНку иш = Past Perfect', hint_kz: 'Басқа өткеннен БҰРЫНғы әрекет = Past Perfect', expl_ru: 'Past Perfect = had + 3-я форма (had fallen) для более раннего прошлого.', expl_uz: 'Past Perfect = had + 3-shakl (had fallen) oldingi o\'tmish uchun.', expl_tj: 'Past Perfect = had + шакли 3 (had fallen) барои гузаштаи пештар.', expl_kg: 'Past Perfect = had + 3-форма (had fallen) мурунку өткөн үчүн.', expl_kz: 'Past Perfect = had + 3-форма (had fallen) ертеректегі өткен үшін.' },
    { q: '[COMPLETE] She slipped because the floor ___ been wet.', opts: ['had', 'has', 'is', 'did'], c: 0, hint_ru: 'Причина в более раннем прошлом', hint_uz: 'Sabab oldingi o\'tmishda', hint_tj: 'Сабаб дар гузаштаи пештар', hint_kg: 'Себеп мурунку өткөндө', hint_kz: 'Себеп ертеректегі өткенде', expl_ru: '"had been" — состояние, которое было ДО того, как она поскользнулась.', expl_uz: '"had been" — u sirg\'anishdan OLDINgi holat.', expl_tj: '"had been" — ҳолате, ки ПЕШ аз лағжиданаш буд.', expl_kg: '"had been" — ал тайгануудан МУРУНку абал.', expl_kz: '"had been" — ол тайғанға ДЕЙІНгі жағдай.' },
    { q: '[COMPLETE] I ___ not seen the warning sign before I slipped.', opts: ['had', 'have', 'was', 'did'], c: 0, hint_ru: 'Отрицание в Past Perfect', hint_uz: 'Past Perfect inkori', hint_tj: 'Инкор дар Past Perfect', hint_kg: 'Past Perfect тангуусу', hint_kz: 'Past Perfect болымсызы', expl_ru: 'Past Perfect отрицание: had not (hadn\'t) + 3-я форма.', expl_uz: 'Past Perfect inkor: had not (hadn\'t) + 3-shakl.', expl_tj: 'Инкори Past Perfect: had not (hadn\'t) + шакли 3.', expl_kg: 'Past Perfect тангуу: had not (hadn\'t) + 3-форма.', expl_kz: 'Past Perfect болымсыз: had not (hadn\'t) + 3-форма.' },
    { q: '[TRANSLATE] Как сказать "перелом"?', opts: ['fracture', 'bruise', 'graze', 'sprain'], c: 0, hint_ru: 'Когда кость сломана', hint_uz: 'Suyak singanida', hint_tj: 'Вақте ки устухон мешиканад', hint_kg: 'Сөөк сынганда', hint_kz: 'Сүйек сынғанда', expl_ru: '"fracture" — перелом кости; bruise — синяк, graze — ссадина.', expl_uz: '"fracture" — suyak singan; bruise — ko\'kargan, graze — shilinish.', expl_tj: '"fracture" — шикастани устухон; bruise — кабудшавӣ.', expl_kg: '"fracture" — сөөк сынуу; bruise — көгала.', expl_kz: '"fracture" — сүйек сынуы; bruise — көгеру.' },
    { q: '[COMPLETE] What ___ happened before the supervisor came?', opts: ['had', 'has', 'was', 'has been'], c: 0, hint_ru: 'Вопрос в Past Perfect', hint_uz: 'Past Perfect savoli', hint_tj: 'Савол дар Past Perfect', hint_kg: 'Past Perfect суроосу', hint_kz: 'Past Perfect сұрағы', expl_ru: 'What had happened? — had + 3-я форма (happened).', expl_uz: 'What had happened? — had + 3-shakl (happened).', expl_tj: 'What had happened? — had + шакли 3 (happened).', expl_kg: 'What had happened? — had + 3-форма (happened).', expl_kz: 'What had happened? — had + 3-форма (happened).' },
    { q: '[TRANSLATE] Как сказать "скользкий пол"?', opts: ['a slippery floor', 'a broken floor', 'a clean floor', 'a wet sign'], c: 0, hint_ru: 'Пол, на котором легко упасть', hint_uz: 'Oson yiqilib bo\'ladigan pol', hint_tj: 'Фарше, ки осон афтидан мумкин', hint_kg: 'Оңой жыгылып калчу пол', hint_kz: 'Оңай құлайтын еден', expl_ru: '"slippery" — скользкий; slippery floor — скользкий пол.', expl_uz: '"slippery" — sirpanchiq; slippery floor — sirpanchiq pol.', expl_tj: '"slippery" — лағжанда; slippery floor — фарши лағжанда.', expl_kg: '"slippery" — тайгак; slippery floor — тайгак пол.', expl_kz: '"slippery" — тайғақ; slippery floor — тайғақ еден.' },
    { q: '[COMPLETE] They ___ called the paramedic before we got there.', opts: ['had', 'have', 'are', 'has'], c: 0, hint_ru: 'Они "they" + Past Perfect', hint_uz: '"they" + Past Perfect', hint_tj: '"they" + Past Perfect', hint_kg: '"they" + Past Perfect', hint_kz: '"they" + Past Perfect', expl_ru: 'С любым подлежащим Past Perfect = had + 3-я форма.', expl_uz: 'Har qanday ega bilan Past Perfect = had + 3-shakl.', expl_tj: 'Бо ҳар гуна мубтадо Past Perfect = had + шакли 3.', expl_kg: 'Ар кандай ээ менен Past Perfect = had + 3-форма.', expl_kz: 'Кез келген бастауышпен Past Perfect = had + 3-форма.' },
    { q: '[TRANSLATE] Как сказать "вызвать на помощь" (спасти)?', opts: ['rescue', 'report', 'recover', 'remove'], c: 0, hint_ru: 'Спасать человека из опасности', hint_uz: 'Odamni xavfdan qutqarish', hint_tj: 'Одамро аз хатар наҷот додан', hint_kg: 'Адамды коркунучтан куткаруу', hint_kz: 'Адамды қауіптен құтқару', expl_ru: '"rescue" — спасать; report — сообщать, recover — выздоравливать.', expl_uz: '"rescue" — qutqarmoq; report — xabar bermoq.', expl_tj: '"rescue" — наҷот додан; report — хабар додан.', expl_kg: '"rescue" — куткаруу; report — билдирүү.', expl_kz: '"rescue" — құтқару; report — хабарлау.' },
    { q: '[COMPLETE] He ___ not reported the spill, so nobody cleaned it.', opts: ['had', 'has', 'have', 'was'], c: 0, hint_ru: '"he" + отрицание Past Perfect', hint_uz: '"he" + Past Perfect inkori', hint_tj: '"he" + инкори Past Perfect', hint_kg: '"he" + Past Perfect тангуусу', hint_kz: '"he" + Past Perfect болымсызы', expl_ru: 'He had not reported — had used for he/she/it too.', expl_uz: 'He had not reported — had he/she/it uchun ham.', expl_tj: 'He had not reported — had барои he/she/it низ.', expl_kg: 'He had not reported — had he/she/it үчүн да.', expl_kz: 'He had not reported — had he/she/it үшін де.' },
    { q: '[TRANSLATE] Как сказать "без сознания"?', opts: ['unconscious', 'dizzy', 'tired', 'awake'], c: 0, hint_ru: 'Когда человек не реагирует, "отключился"', hint_uz: 'Odam javob bermaganda', hint_tj: 'Вақте ки одам ҷавоб намедиҳад', hint_kg: 'Адам жооп бербегенде', hint_kz: 'Адам жауап бермегенде', expl_ru: '"unconscious" — без сознания; dizzy — голова кружится.', expl_uz: '"unconscious" — hushsiz; dizzy — boshi aylanyapti.', expl_tj: '"unconscious" — беҳуш; dizzy — сар чарх мезанад.', expl_kg: '"unconscious" — эссиз; dizzy — башы айланат.', expl_kz: '"unconscious" — есінен танған; dizzy — басы айналады.' },
  ],
};

// ── validation (dry run) ───────────────────────────────────────────────────
const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];
const a1 = require('./lessons_data.js'), a2 = require('./lessons_data_a2.js'), b1 = require('./lessons_data_b1.js');
const used = new Map();
[['a1', a1], ['a2', a2], ['b1', b1]].forEach(([c, C]) => C.forEach(l => l.words.forEach(w => used.set(w.en.trim().toLowerCase(), c + ' L' + l.id))));

const LESSON = L8;
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

// snowball preview (crude — real audit is authoritative): dialogue + translate opts
const ALLOW = new Set(('a an the this that these those some any all and or but if so as to of in on at for with by from i you he she it we they me him her us them my your his its our their is am are was were be been being do does did have has had will would can could should must may might not no yes very too also just now here there then what where when who which why how about into over under up down out off back well good thank thanks please sorry hello hi okay ok since for ever never long more most than new small before after already because his her him our your their nobody someone everyone there no').split(/\s+/));
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
  console.log('\n✅ APPLIED: L8 injected into b1.html (string-aware). MODS unchanged (finalised after L12).');
}
