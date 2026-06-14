/**
 * build_b1_l7.js — author B1 Lesson 7 "Собеседование и повышение".
 * Grammar: Present Perfect Continuous (how long / have been + -ing).
 * Module 3 (Карьера). Continues B1 L6 (Present Perfect).
 *
 * Dry-run by default: validates structure, cross-course duplicates and Snowball.
 * Pass --apply to inject the lesson into b1.html and update MODS.
 *
 * Translations: ru/en authored; uz/tj/kg/kz are AI drafts flagged for native review
 * (RELEASE_NOTES / specs/translation_review.md). No claim of native-grade accuracy.
 */
const fs = require('fs');
const path = require('path');

const grid = (rows) =>
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">' +
  rows.map(([en, tr, ru]) => `<div><code>${en}</code> <span class="g-transcr">[${tr}]</span> (${ru})</div>`).join('') +
  '</div>';

const L7 = {
  id: 7,
  mod: 3,
  name_ru: 'Собеседование и повышение',
  name_uz: 'Suhbat va lavozim ko\'tarilishi',
  name_tj: 'Мусоҳиба ва баландшавии вазифа',
  name_kg: 'Маек жана кызмат жогорулатуу',
  name_kz: 'Сұхбат және қызмет жоғарылату',
  cefr: 'Present Perfect Continuous (how long, have been + -ing)',
  grammar: {
    title_ru: 'PRESENT PERFECT CONTINUOUS — как долго длится действие',
    title_uz: 'PRESENT PERFECT CONTINUOUS — harakat qancha vaqt davom etmoqda',
    title_tj: 'PRESENT PERFECT CONTINUOUS — амал чӣ қадар давом дорад',
    title_kg: 'PRESENT PERFECT CONTINUOUS — иш канча убакыттан бери жүрүп жатат',
    title_kz: 'PRESENT PERFECT CONTINUOUS — әрекет қанша уақыттан бері жалғасуда',
    intro_ru: '<div style="line-height:1.6">Используйте <b>Present Perfect Continuous</b> (have/has been + глагол c <b>-ing</b>), чтобы подчеркнуть, <b>как долго</b> длится действие, которое началось в прошлом и продолжается сейчас. Это полезно на собеседовании, когда вас спрашивают о вашем стаже.<br>✅ <i>I <b>have been working</b> here <b>for</b> three seasons.</i><br>❓ <i><b>How long have you been</b> picking fruit?</i></div>',
    intro_uz: '<div style="line-height:1.6"><b>Present Perfect Continuous</b> (have/has been + fe\'l + <b>-ing</b>) harakat <b>qancha vaqt</b> davom etayotganini ta\'kidlash uchun ishlatiladi: u o\'tmishda boshlangan va hozir ham davom etadi. Suhbatda ish tajribangizni so\'rashganda foydali.<br>✅ <i>I <b>have been working</b> here <b>for</b> three seasons.</i></div>',
    intro_tj: '<div style="line-height:1.6"><b>Present Perfect Continuous</b> (have/has been + феъл + <b>-ing</b>) барои таъкид кардани он, ки амал <b>чӣ қадар</b> давом дорад, истифода мешавад: он дар гузашта оғоз ёфта, ҳоло низ давом дорад. Дар мусоҳиба ҳангоми пурсиши собиқаи корӣ фоиданок аст.<br>✅ <i>I <b>have been working</b> here <b>for</b> three seasons.</i></div>',
    intro_kg: '<div style="line-height:1.6"><b>Present Perfect Continuous</b> (have/has been + этиш + <b>-ing</b>) иш <b>канча убакыттан бери</b> жүрүп жатканын баса белгилөө үчүн колдонулат: ал өткөндө башталып, азыр да уланууда. Маекте иш тажрыйбаңызды сурашканда пайдалуу.<br>✅ <i>I <b>have been working</b> here <b>for</b> three seasons.</i></div>',
    intro_kz: '<div style="line-height:1.6"><b>Present Perfect Continuous</b> (have/has been + етістік + <b>-ing</b>) әрекет <b>қанша уақыттан бері</b> жалғасып жатқанын атап өту үшін қолданылады: ол өткенде басталып, әлі де жалғасуда. Сұхбатта жұмыс тәжірибеңізді сұрағанда пайдалы.<br>✅ <i>I <b>have been working</b> here <b>for</b> three seasons.</i></div>',
    cultural_ru: 'На британском собеседовании ценят, когда вы говорите о своём опыте конкретно и уверенно. Хорошо упомянуть, что вы пунктуальны (punctual), надёжны (reliable) и умеете работать в команде (teamwork). Если вы — returnee (возвращаетесь не первый сезон), обязательно скажите, как долго вы уже работаете в этой сфере.',
    cultural_uz: 'Britaniya suhbatida tajribangiz haqida aniq va ishonchli gapirishingiz qadrlanadi. Punctual (vaqtida keluvchi), reliable (ishonchli) ekaningizni va jamoada ishlay olishingizni aytish yaxshi. Agar siz returnee bo\'lsangiz, bu sohada qancha vaqtdan beri ishlayotganingizni albatta ayting.',
    cultural_tj: 'Дар мусоҳибаи британӣ вақте ки шумо дар бораи собиқаи худ аниқ ва боэътимод сухан мегӯед, қадр карда мешавад. Гуфтан хуб аст, ки шумо punctual (саривақт), reliable (боэътимод) ҳастед ва дар даста кор карда метавонед. Агар шумо returnee бошед, ҳатман бигӯед, ки чӣ қадар вақт дар ин соҳа кор мекунед.',
    cultural_kg: 'Британ маегинде тажрыйбаңыз жөнүндө так жана ишенимдүү сүйлөгөнүңүз бааланат. Punctual (убагында келүүчү), reliable (ишенимдүү) экениңизди жана командада иштей аларыңызды айтуу жакшы. Эгер сиз returnee болсоңуз, бул тармакта канча убакыттан бери иштеп жатканыңызды сөзсүз айтыңыз.',
    cultural_kz: 'Британдық сұхбатта тәжірибеңіз туралы нақты әрі сенімді сөйлегеніңіз бағаланады. Punctual (уақытында келетін), reliable (сенімді) екеніңізді және командада жұмыс істей алатыныңызды айту жақсы. Егер сіз returnee болсаңыз, осы салада қанша уақыттан бері жұмыс істеп жатқаныңызды міндетті түрде айтыңыз.',
    note_ru: '⚠️ Не путайте: Present Perfect ("I have worked" — результат/опыт) и Present Perfect Continuous ("I have been working" — упор на длительность процесса)!',
    note_uz: '⚠️ Adashtirmang: Present Perfect ("I have worked" — natija/tajriba) va Present Perfect Continuous ("I have been working" — jarayon davomiyligiga urg\'u)!',
    note_tj: '⚠️ Иштибоҳ накунед: Present Perfect ("I have worked" — натиҷа/таҷриба) ва Present Perfect Continuous ("I have been working" — таъкид ба давомнокии раванд)!',
    note_kg: '⚠️ Чаташтырбаңыз: Present Perfect ("I have worked" — натыйжа/тажрыйба) жана Present Perfect Continuous ("I have been working" — процесстин узактыгына басым)!',
    note_kz: '⚠️ Шатастырмаңыз: Present Perfect ("I have worked" — нәтиже/тәжірибе) және Present Perfect Continuous ("I have been working" — процестің ұзақтығына екпін)!',
    forms: {
      positive: {
        label_ru: '✅ Утверждение', label_uz: '✅ Tasdiq', label_tj: '✅ Тасдиқ', label_kg: '✅ Ырастоо', label_kz: '✅ Растау',
        rule_ru: grid([
          ['I have been working', 'ай хэв бин уёкин', 'я работаю (всё это время)'],
          ['She has been picking', 'ши хэз бин пикин', 'она собирает'],
          ['for three seasons', 'фо сри сизнз', 'три сезона'],
          ['How long have you been...?', 'хау лонг хэв ю бин', 'как долго ты...?'],
        ]),
        rule_uz: grid([
          ['I have been working', 'ай хэв бин уёкин', 'men ishlab kelyapman'],
          ['She has been picking', 'ши хэз бин пикин', 'u terib kelyapti'],
          ['for three seasons', 'фо сри сизнз', 'uch mavsumdan beri'],
          ['How long have you been...?', 'хау лонг хэв ю бин', 'qancha vaqtdan beri...?'],
        ]),
        rule_tj: grid([
          ['I have been working', 'ай хэв бин уёкин', 'ман кор карда истодаам'],
          ['She has been picking', 'ши хэз бин пикин', 'вай чида истодааст'],
          ['for three seasons', 'фо сри сизнз', 'се мавсим боз'],
          ['How long have you been...?', 'хау лонг хэв ю бин', 'чӣ қадар вақт боз...?'],
        ]),
        rule_kg: grid([
          ['I have been working', 'ай хэв бин уёкин', 'мен иштеп келе жатам'],
          ['She has been picking', 'ши хэз бин пикин', 'ал терип жатат'],
          ['for three seasons', 'фо сри сизнз', 'үч мезгилден бери'],
          ['How long have you been...?', 'хау лонг хэв ю бин', 'канча убакыттан бери...?'],
        ]),
        rule_kz: grid([
          ['I have been working', 'ай хэв бин уёкин', 'мен жұмыс істеп келемін'],
          ['She has been picking', 'ши хэз бин пикин', 'ол теріп жүр'],
          ['for three seasons', 'фо сри сизнз', 'үш маусымнан бері'],
          ['How long have you been...?', 'хау лонг хэв ю бин', 'қанша уақыттан бері...?'],
        ]),
        table: [
          { subj: 'I', verb: 'have been working', example: 'I have been working on farms for three seasons.', transcr: 'Ай хэв бин уёкин он фамз фо сри сизнз', tr_ru: 'Я работаю на фермах уже три сезона.', tr_uz: 'Men uch mavsumdan beri fermalarda ishlab kelyapman.', tr_tj: 'Ман се мавсим боз дар фермаҳо кор карда истодаам.', tr_kg: 'Мен үч мезгилден бери фермаларда иштеп келе жатам.', tr_kz: 'Мен үш маусымнан бері фермаларда жұмыс істеп келемін.' },
          { subj: 'She', verb: 'has been picking', example: 'She has been picking apples since June.', transcr: 'Ши хэз бин пикин эпплз синс джун', tr_ru: 'Она собирает яблоки с июня.', tr_uz: 'U iyundan beri olma terib kelyapti.', tr_tj: 'Вай аз моҳи июн боз себ чида истодааст.', tr_kg: 'Ал июндан бери алма терип жатат.', tr_kz: 'Ол маусымнан бері алма теріп жүр.' },
          { subj: 'They', verb: 'have been training', example: 'They have been training new workers all week.', transcr: 'Зэй хэв бин трэйнин нью уёкэз ол уик', tr_ru: 'Они всю неделю обучают новых работников.', tr_uz: 'Ular butun hafta yangi ishchilarni o\'qitib kelyapti.', tr_tj: 'Онҳо тамоми ҳафта коргарони навро таълим дода истодаанд.', tr_kg: 'Алар бүт жума жаңы жумушчуларды окутуп жатышат.', tr_kz: 'Олар бүкіл апта жаңа жұмысшыларды оқытып жүр.' },
          { subj: 'We', verb: 'have been waiting', example: 'We have been waiting for the manager since nine.', transcr: 'Уи хэв бин уэйтин фо зэ мэниджэ синс найн', tr_ru: 'Мы ждём менеджера с девяти.', tr_uz: 'Biz menejerni soat to\'qqizdan beri kutib turibmiz.', tr_tj: 'Мо менеҷерро аз соати нӯҳ боз интизорем.', tr_kg: 'Биз менеджерди тогуздан бери күтүп жатабыз.', tr_kz: 'Біз менеджерді тоғыздан бері күтіп тұрмыз.' },
        ],
      },
      negative: {
        label_ru: '❌ Отрицание', label_uz: '❌ Inkor', label_tj: '❌ Инкор', label_kg: '❌ Тангуу', label_kz: '❌ Болымсыз',
        rule_ru: grid([
          ['I have not been', 'ай хэв нот бин', 'я не (был занят)'],
          ['haven\'t been working', 'хэвнт бин уёкин', 'не работал'],
          ['She has not been', 'ши хэз нот бин', 'она не'],
          ['hasn\'t been resting', 'хэзнт бин рэстин', 'не отдыхала'],
        ]),
        rule_uz: grid([
          ['I have not been', 'ай хэв нот бин', 'men ...gan emasman'],
          ['haven\'t been working', 'хэвнт бин уёкин', 'ishlamayapman'],
          ['She has not been', 'ши хэз нот бин', 'u ...gan emas'],
          ['hasn\'t been resting', 'хэзнт бин рэстин', 'dam olmayapti'],
        ]),
        rule_tj: grid([
          ['I have not been', 'ай хэв нот бин', 'ман ... накардаам'],
          ['haven\'t been working', 'хэвнт бин уёкин', 'кор намекунам'],
          ['She has not been', 'ши хэз нот бин', 'вай ... накардааст'],
          ['hasn\'t been resting', 'хэзнт бин рэстин', 'дам намегирад'],
        ]),
        rule_kg: grid([
          ['I have not been', 'ай хэв нот бин', 'мен ... жок'],
          ['haven\'t been working', 'хэвнт бин уёкин', 'иштеген жокмун'],
          ['She has not been', 'ши хэз нот бин', 'ал ... жок'],
          ['hasn\'t been resting', 'хэзнт бин рэстин', 'эс алган жок'],
        ]),
        rule_kz: grid([
          ['I have not been', 'ай хэв нот бин', 'мен ... жоқпын'],
          ['haven\'t been working', 'хэвнт бин уёкин', 'жұмыс істеген жоқпын'],
          ['She has not been', 'ши хэз нот бин', 'ол ... жоқ'],
          ['hasn\'t been resting', 'хэзнт бин рэстин', 'демалған жоқ'],
        ]),
        table: [
          { subj: 'I', verb: "haven't been working", example: "I haven't been working here for long.", transcr: 'Ай хэвнт бин уёкин хиэ фо лонг', tr_ru: 'Я работаю здесь не так давно.', tr_uz: 'Men bu yerda uzoq vaqtdan beri ishlamayapman.', tr_tj: 'Ман дар ин ҷо муддати дароз кор намекунам.', tr_kg: 'Мен бул жерде көптөн бери иштеген жокмун.', tr_kz: 'Мен мұнда көптен бері жұмыс істеген жоқпын.' },
          { subj: 'He', verb: "hasn't been feeling", example: "He hasn't been feeling well this week.", transcr: 'Хи хэзнт бин филин уэл зис уик', tr_ru: 'Он плохо себя чувствует на этой неделе.', tr_uz: 'U bu hafta o\'zini yaxshi his qilmayapti.', tr_tj: 'Вай ин ҳафта худро хуб ҳис намекунад.', tr_kg: 'Ал бул жума өзүн жакшы сезген жок.', tr_kz: 'Ол осы апта өзін жақсы сезінбей жүр.' },
          { subj: 'We', verb: "haven't been waiting", example: "We haven't been waiting long for the bus.", transcr: 'Уи хэвнт бин уэйтин лонг фо зэ бас', tr_ru: 'Мы недолго ждём автобус.', tr_uz: 'Biz avtobusni uzoq kutmayapmiz.', tr_tj: 'Мо автобусро муддати дароз интизор нестем.', tr_kg: 'Биз автобусту көпкө күткөн жокпуз.', tr_kz: 'Біз автобусты ұзақ күткен жоқпыз.' },
        ],
      },
      question: {
        label_ru: '❓ Вопрос', label_uz: '❓ Savol', label_tj: '❓ Савол', label_kg: '❓ Суроо', label_kz: '❓ Сұрақ',
        rule_ru: grid([
          ['How long have you been...?', 'хау лонг хэв ю бин', 'как долго ты...?'],
          ['Have you been working?', 'хэв ю бин уёкин', 'ты работаешь?'],
          ['What have you been doing?', 'уот хэв ю бин дуин', 'чем ты занимался?'],
          ['Has she been picking?', 'хэз ши бин пикин', 'она собирает?'],
        ]),
        rule_uz: grid([
          ['How long have you been...?', 'хау лонг хэв ю бин', 'qancha vaqtdan beri...?'],
          ['Have you been working?', 'хэв ю бин уёкин', 'ishlayapsizmi?'],
          ['What have you been doing?', 'уот хэв ю бин дуин', 'nima qilyapsiz?'],
          ['Has she been picking?', 'хэз ши бин пикин', 'u teryaptimi?'],
        ]),
        rule_tj: grid([
          ['How long have you been...?', 'хау лонг хэв ю бин', 'чӣ қадар вақт боз...?'],
          ['Have you been working?', 'хэв ю бин уёкин', 'кор карда истодаӣ?'],
          ['What have you been doing?', 'уот хэв ю бин дуин', 'чӣ кор карда истодаӣ?'],
          ['Has she been picking?', 'хэз ши бин пикин', 'вай чида истодааст?'],
        ]),
        rule_kg: grid([
          ['How long have you been...?', 'хау лонг хэв ю бин', 'канча убакыттан бери...?'],
          ['Have you been working?', 'хэв ю бин уёкин', 'иштеп жатасыңбы?'],
          ['What have you been doing?', 'уот хэв ю бин дуин', 'эмне кылып жатасың?'],
          ['Has she been picking?', 'хэз ши бин пикин', 'ал терип жатабы?'],
        ]),
        rule_kz: grid([
          ['How long have you been...?', 'хау лонг хэв ю бин', 'қанша уақыттан бері...?'],
          ['Have you been working?', 'хэв ю бин уёкин', 'жұмыс істеп жүрсің бе?'],
          ['What have you been doing?', 'уот хэв ю бин дуин', 'не істеп жүрсің?'],
          ['Has she been picking?', 'хэз ши бин пикин', 'ол теріп жүр ме?'],
        ]),
        table: [
          { subj: 'How long ... you', verb: 'have been working', example: 'How long have you been working in the UK?', transcr: 'Хау лонг хэв ю бин уёкин ин зэ ю-кей', tr_ru: 'Как долго вы работаете в Великобритании?', tr_uz: 'Buyuk Britaniyada qancha vaqtdan beri ishlayapsiz?', tr_tj: 'Шумо чӣ қадар вақт боз дар Британияи Кабир кор мекунед?', tr_kg: 'Сиз Улуу Британияда канча убакыттан бери иштеп жатасыз?', tr_kz: 'Сіз Ұлыбританияда қанша уақыттан бері жұмыс істеп жүрсіз?' },
          { subj: 'What ... you', verb: 'have been doing', example: 'What have you been doing since last season?', transcr: 'Уот хэв ю бин дуин синс ласт сизн', tr_ru: 'Чем вы занимались с прошлого сезона?', tr_uz: 'O\'tgan mavsumdan beri nima qilyapsiz?', tr_tj: 'Аз мавсими гузашта боз чӣ кор карда истодаед?', tr_kg: 'Өткөн мезгилден бери эмне кылып жүрөсүз?', tr_kz: 'Өткен маусымнан бері не істеп жүрсіз?' },
          { subj: 'Have you', verb: 'been picking', example: 'Have you been picking fruit all morning?', transcr: 'Хэв ю бин пикин фрут ол монин', tr_ru: 'Вы собирали фрукты всё утро?', tr_uz: 'Ertalab bo\'yi meva terib chiqdingizmi?', tr_tj: 'Шумо тамоми пагоҳӣ мева чида истодаед?', tr_kg: 'Эртең менен бою мөмө терип жүрдүңүзбү?', tr_kz: 'Таңертең бойы жеміс теріп жүрдіңіз бе?' },
        ],
      },
    },
  },
  words: [
    { e: '🧑‍💼', en: 'interviewer', pn: '/ˈɪntəvjuːə/', transcr: 'интэвьюэ', ru: 'интервьюер (кто проводит собеседование)', uz: 'suhbat oluvchi', tj: 'мусоҳибагир', kg: 'маек алуучу', kz: 'сұхбат алушы' },
    { e: '📄', en: 'CV', pn: '/ˌsiːˈviː/', transcr: 'си-ви', ru: 'резюме (CV)', uz: 'rezyume (CV)', tj: 'резюме (CV)', kg: 'резюме (CV)', kz: 'түйіндеме (CV)' },
    { e: '🙋', en: 'candidate', pn: '/ˈkændɪdət/', transcr: 'кэндидэт', ru: 'кандидат', uz: 'nomzod', tj: 'номзад', kg: 'талапкер', kz: 'үміткер' },
    { e: '⬆️', en: 'promotion', pn: '/prəˈməʊʃn/', transcr: 'промоушн', ru: 'повышение (по службе)', uz: 'lavozim ko\'tarilishi', tj: 'баландшавии вазифа', kg: 'кызмат жогорулатуу', kz: 'қызмет жоғарылату' },
    { e: '📋', en: 'responsibility', pn: '/rɪˌspɒnsəˈbɪləti/', transcr: 'риспонсибилити', ru: 'ответственность', uz: 'mas\'uliyat', tj: 'масъулият', kg: 'жоопкерчилик', kz: 'жауапкершілік' },
    { e: '⏰', en: 'punctual', pn: '/ˈpʌŋktʃuəl/', transcr: 'панкчуэл', ru: 'пунктуальный', uz: 'vaqtga rioya qiluvchi', tj: 'саривақт', kg: 'убагында келүүчү', kz: 'уақытты сақтайтын' },
    { e: '✅', en: 'reliable', pn: '/rɪˈlaɪəbl/', transcr: 'рилайэбл', ru: 'надёжный', uz: 'ishonchli', tj: 'боэътимод', kg: 'ишенимдүү', kz: 'сенімді' },
    { e: '💪', en: 'strength', pn: '/streŋθ/', transcr: 'стрэнгс', ru: 'сильная сторона', uz: 'kuchli tomon', tj: 'тарафи қавӣ', kg: 'күчтүү жагы', kz: 'күшті жағы' },
    { e: '📉', en: 'weakness', pn: '/ˈwiːknəs/', transcr: 'уикнэс', ru: 'слабая сторона', uz: 'zaif tomon', tj: 'тарафи заиф', kg: 'алсыз жагы', kz: 'әлсіз жағы' },
    { e: '😎', en: 'confident', pn: '/ˈkɒnfɪdənt/', transcr: 'конфидэнт', ru: 'уверенный', uz: 'o\'ziga ishongan', tj: 'боэътимод ба худ', kg: 'өзүнө ишенген', kz: 'өзіне сенімді' },
    { e: '🔥', en: 'motivated', pn: '/ˈməʊtɪveɪtɪd/', transcr: 'моутивэйтид', ru: 'мотивированный', uz: 'rag\'batlangan', tj: 'ҳавасманд', kg: 'дитгер', kz: 'ынталы' },
    { e: '🧭', en: 'leadership', pn: '/ˈliːdəʃɪp/', transcr: 'лидэшип', ru: 'лидерство', uz: 'rahbarlik', tj: 'роҳбарӣ', kg: 'жетекчилик', kz: 'көшбасшылық' },
    { e: '👥', en: 'teamwork', pn: '/ˈtiːmwɜːk/', transcr: 'тимуёк', ru: 'работа в команде', uz: 'jamoaviy ish', tj: 'кори дастаҷамъӣ', kg: 'командалык иш', kz: 'командалық жұмыс' },
    { e: '📝', en: 'reference', pn: '/ˈrefrəns/', transcr: 'рэфрэнс', ru: 'рекомендация (от работодателя)', uz: 'tavsiyanoma', tj: 'тавсиянома', kg: 'сунуш кат', kz: 'ұсыныс хат' },
    { e: '🗣️', en: 'communication', pn: '/kəˌmjuːnɪˈkeɪʃn/', transcr: 'кэмьюникэйшн', ru: 'общение', uz: 'muloqot', tj: 'муошират', kg: 'байланыш', kz: 'қарым-қатынас' },
    { e: '🎯', en: 'qualified', pn: '/ˈkwɒlɪfaɪd/', transcr: 'кволифайд', ru: 'квалифицированный', uz: 'malakali', tj: 'баихтисос', kg: 'квалификациялуу', kz: 'білікті' },
    { e: '🤸', en: 'flexible', pn: '/ˈfleksəbl/', transcr: 'флэксибл', ru: 'гибкий (график)', uz: 'moslashuvchan', tj: 'фасеҳ (тағйирпазир)', kg: 'ийкемдүү', kz: 'икемді' },
    { e: '💼', en: 'position', pn: '/pəˈzɪʃn/', transcr: 'позишн', ru: 'должность', uz: 'lavozim', tj: 'вазифа', kg: 'кызмат орду', kz: 'лауазым' },
    { e: '🧑‍🏫', en: 'mentor', pn: '/ˈmentɔː/', transcr: 'мэнто', ru: 'наставник', uz: 'ustoz', tj: 'устод (роҳнамо)', kg: 'тарбиячы', kz: 'тәлімгер' },
    { e: '🌟', en: 'hardworking', pn: '/ˌhɑːdˈwɜːkɪŋ/', transcr: 'хадуёкин', ru: 'трудолюбивый', uz: 'mehnatkash', tj: 'меҳнатдӯст', kg: 'эмгекчил', kz: 'еңбекқор' },
    { e: '🧗', en: 'challenge', pn: '/ˈtʃælɪndʒ/', transcr: 'чэлиндж', ru: 'сложная задача', uz: 'qiyinchilik (sinov)', tj: 'мушкилот (озмоиш)', kg: 'татаал маселе', kz: 'қиын мәселе' },
    { e: '🗂️', en: 'appraisal', pn: '/əˈpreɪzl/', transcr: 'эпрэйзл', ru: 'оценка работы (аттестация)', uz: 'ish baholash', tj: 'арзёбии кор', kg: 'иш баалоо', kz: 'жұмысты бағалау' },
    { e: '📢', en: 'vacancy', pn: '/ˈveɪkənsi/', transcr: 'вэйкэнси', ru: 'вакансия', uz: 'bo\'sh ish o\'rni', tj: 'ҷои холии корӣ', kg: 'бош жумуш орду', kz: 'бос жұмыс орны' },
    { e: '🚀', en: 'ambition', pn: '/æmˈbɪʃn/', transcr: 'эмбишн', ru: 'амбиция (цель)', uz: 'intilish (maqsad)', tj: 'орзу (ҳадаф)', kg: 'умтулуу (максат)', kz: 'талпыныс (мақсат)' },
    { e: '🧲', en: 'recruit', pn: '/rɪˈkruːt/', transcr: 'рикрут', ru: 'нанимать', uz: 'ishga olmoq', tj: 'ба кор қабул кардан', kg: 'жумушка алуу', kz: 'жұмысқа алу' },
    { e: '💷', en: 'income', pn: '/ˈɪnkʌm/', transcr: 'инкам', ru: 'доход', uz: 'daromad', tj: 'даромад', kg: 'киреше', kz: 'табыс' },
    { e: '🙆', en: 'willing', pn: '/ˈwɪlɪŋ/', transcr: 'уилин', ru: 'готовый (охотно)', uz: 'tayyor (xohishli)', tj: 'омода (бо майл)', kg: 'даяр (ыктыярдуу)', kz: 'дайын (ықыласпен)' },
    { e: '👔', en: 'employer', pn: '/ɪmˈplɔɪə/', transcr: 'имплойэ', ru: 'работодатель', uz: 'ish beruvchi', tj: 'корфармо', kg: 'иш беруучу', kz: 'жұмыс беруші' },
    { e: '🔁', en: 'permanent', pn: '/ˈpɜːmənənt/', transcr: 'пёмэнэнт', ru: 'постоянный (не сезонный)', uz: 'doimiy', tj: 'доимӣ', kg: 'туруктуу', kz: 'тұрақты' },
    { e: '📈', en: 'pay rise', pn: '/ˈpeɪ raɪz/', transcr: 'пэй райз', ru: 'повышение зарплаты', uz: 'maosh oshishi', tj: 'зиёдшавии маош', kg: 'эмгек акы жогорулатуу', kz: 'жалақы өсуі' },
  ],
  dialogue: [
    { s: 'm', en: 'Good morning, Ahmad. Thank you for coming to the job interview.', transcr: 'Гуд монин, Ахмад. Сэнк ю фо камин ту зэ джоб интэвью.', ru: 'Доброе утро, Ахмад. Спасибо, что пришли на собеседование.', uz: 'Xayrli tong, Ahmad. Ish suhbatiga kelganingiz uchun rahmat.', tj: 'Субҳ ба хайр, Аҳмад. Ташаккур, ки ба мусоҳибаи корӣ омадед.', kg: 'Кутмандуу таң, Ахмад. Жумуш маегине келгениңиз үчүн рахмат.', kz: 'Қайырлы таң, Ахмад. Жұмыс сұхбатына келгеніңіз үшін рақмет.' },
    { s: 'w', en: 'Good morning. I am very happy to be here. I want this position.', transcr: 'Гуд монин. Ай эм вэри хэпи ту би хиэ. Ай уонт зис позишн.', ru: 'Доброе утро. Я очень рад быть здесь. Я хочу эту должность.', uz: 'Xayrli tong. Bu yerda bo\'lganimdan juda xursandman. Men bu lavozimni xohlayman.', tj: 'Субҳ ба хайр. Ман аз будан дар ин ҷо хеле хушҳолам. Ман ин вазифаро мехоҳам.', kg: 'Кутмандуу таң. Мен бул жерде болгонума абдан кубанычтуумун. Мен бул кызматты каалайм.', kz: 'Қайырлы таң. Мен мұнда болғаныма өте қуаныштымын. Мен осы лауазымды қалаймын.' },
    { s: 'm', en: 'How long have you been working on farms?', transcr: 'Хау лонг хэв ю бин уёкин он фамз?', ru: 'Как долго вы работаете на фермах?', uz: 'Fermalarda qancha vaqtdan beri ishlayapsiz?', tj: 'Шумо чӣ қадар вақт боз дар фермаҳо кор мекунед?', kg: 'Фермаларда канча убакыттан бери иштеп жатасыз?', kz: 'Фермаларда қанша уақыттан бері жұмыс істеп жүрсіз?' },
    { s: 'w', en: 'I have been picking fruit for three seasons. I am a reliable worker.', transcr: 'Ай хэв бин пикин фрут фо сри сизнз. Ай эм э рилайэбл уёкэ.', ru: 'Я собираю фрукты уже три сезона. Я надёжный работник.', uz: 'Men uch mavsumdan beri meva terib kelyapman. Men ishonchli ishchiman.', tj: 'Ман се мавсим боз мева мечинам. Ман коргари боэътимод ҳастам.', kg: 'Мен үч мезгилден бери мөмө терип келе жатам. Мен ишенимдүү жумушчумун.', kz: 'Мен үш маусымнан бері жеміс теріп келемін. Мен сенімді жұмысшымын.' },
    { s: 'm', en: 'Good. Why do you want a promotion to shift leader?', transcr: 'Гуд. Уай ду ю уонт э промоушн ту шифт лидэ?', ru: 'Хорошо. Почему вы хотите повышение до старшего смены?', uz: 'Yaxshi. Nega smena boshlig\'iga lavozim ko\'tarilishini xohlaysiz?', tj: 'Хуб. Чаро шумо ба вазифаи сардори баст баландшавӣ мехоҳед?', kg: 'Жакшы. Эмне үчүн сменанын башчысына кызмат жогорулатууну каалайсыз?', kz: 'Жақсы. Неге ауысым бастығына дейін қызмет жоғарылатуды қалайсыз?' },
    { s: 'w', en: 'I am hardworking and punctual. I have been helping new workers too.', transcr: 'Ай эм хадуёкин энд панкчуэл. Ай хэв бин хэлпин нью уёкэз ту.', ru: 'Я трудолюбивый и пунктуальный. Я также помогаю новым работникам.', uz: 'Men mehnatkash va vaqtga rioya qiluvchiman. Yangi ishchilarga ham yordam berib kelyapman.', tj: 'Ман меҳнатдӯст ва саривақт ҳастам. Ман инчунин ба коргарони нав ёрӣ дода истодаам.', kg: 'Мен эмгекчил жана убагында келүүчүмүн. Мен дагы жаңы жумушчуларга жардам берип жатам.', kz: 'Мен еңбекқор әрі уақытты сақтаймын. Мен сондай-ақ жаңа жұмысшыларға көмектесіп жүрмін.' },
    { s: 'm', en: 'That shows good teamwork. What is your main strength?', transcr: 'Зэт шоуз гуд тимуёк. Уот из ё мэйн стрэнгс?', ru: 'Это говорит о хорошей командной работе. В чём ваша главная сильная сторона?', uz: 'Bu yaxshi jamoaviy ishni ko\'rsatadi. Asosiy kuchli tomoningiz nima?', tj: 'Ин кори хуби дастаҷамъиро нишон медиҳад. Тарафи қавии асосии шумо чист?', kg: 'Бул жакшы командалык ишти көрсөтөт. Негизги күчтүү жагыңыз эмне?', kz: 'Бұл жақсы командалық жұмысты көрсетеді. Негізгі күшті жағыңыз қандай?' },
    { s: 'w', en: 'My communication is good, and I am willing to learn new skills.', transcr: 'Май кэмьюникэйшн из гуд, энд ай эм уилин ту лён нью скилз.', ru: 'У меня хорошее общение, и я готов учиться новым навыкам.', uz: 'Mening muloqotim yaxshi va men yangi ko\'nikmalarni o\'rganishga tayyorman.', tj: 'Муоширати ман хуб аст ва ман омодаам малакаҳои навро омӯзам.', kg: 'Менин байланышым жакшы жана мен жаңы көндүмдөрдү үйрөнүүгө даярмын.', kz: 'Менің қарым-қатынасым жақсы және мен жаңа дағдыларды үйренуге дайынмын.' },
    { s: 'm', en: 'Excellent. We will give you a reference and a small pay rise.', transcr: 'Экселэнт. Уи уил гив ю э рэфрэнс энд э смол пэй райз.', ru: 'Отлично. Мы дадим вам рекомендацию и небольшое повышение зарплаты.', uz: 'Ajoyib. Biz sizga tavsiyanoma va kichik maosh oshishini beramiz.', tj: 'Аъло. Мо ба шумо тавсиянома ва зиёдшавии хурди маош медиҳем.', kg: 'Эң сонун. Биз сизге сунуш кат жана кичине эмгек акы жогорулатуу беребиз.', kz: 'Тамаша. Біз сізге ұсыныс хат және шағын жалақы өсуін береміз.' },
    { s: 'w', en: 'Thank you very much! I have been waiting for this opportunity.', transcr: 'Сэнк ю вэри мач! Ай хэв бин уэйтин фо зис опотьюнити.', ru: 'Большое спасибо! Я ждал этой возможности.', uz: 'Katta rahmat! Men shu imkoniyatni kutib kelgandim.', tj: 'Ташаккури зиёд! Ман ин имкониятро интизор будам.', kg: 'Чоң рахмат! Мен бул мүмкүнчүлүктү күтүп жүргөм.', kz: 'Үлкен рақмет! Мен осы мүмкіндікті күтіп жүрдім.' },
  ],
  quiz: [
    { q: '[COMPLETE] How long ___ you been working here?', opts: ['have', 'has', 'are', 'did'], c: 0, hint_ru: 'Вопрос с "you" в Present Perfect Continuous', hint_uz: '"you" bilan Present Perfect Continuous savoli', hint_tj: 'Савол бо "you" дар Present Perfect Continuous', hint_kg: '"you" менен Present Perfect Continuous суроосу', hint_kz: '"you" арқылы Present Perfect Continuous сұрағы', expl_ru: 'С "you" используется вспомогательный глагол have: How long have you been...?', expl_uz: '"you" bilan have ishlatiladi: How long have you been...?', expl_tj: 'Бо "you" феъли ёвари have меояд: How long have you been...?', expl_kg: '"you" менен have колдонулат: How long have you been...?', expl_kz: '"you" арқылы have қолданылады: How long have you been...?' },
    { q: '[COMPLETE] She ___ been picking apples since June.', opts: ['has', 'have', 'is', 'was'], c: 0, hint_ru: 'Местоимение "she" — 3-е лицо ед. числа', hint_uz: '"she" — uchinchi shaxs birlik', hint_tj: '"she" — шахси сеюми танҳо', hint_kg: '"she" — үчүнчү жак жекелик', hint_kz: '"she" — үшінші жақ жекеше', expl_ru: 'С she/he/it используется has been + глагол с -ing.', expl_uz: 'she/he/it bilan has been + -ing ishlatiladi.', expl_tj: 'Бо she/he/it has been + феъл бо -ing меояд.', expl_kg: 'she/he/it менен has been + -ing колдонулат.', expl_kz: 'she/he/it арқылы has been + -ing қолданылады.' },
    { q: '[COMPLETE] I have been ___ here for three seasons.', opts: ['working', 'work', 'worked', 'works'], c: 0, hint_ru: 'После "have been" нужна форма -ing', hint_uz: '"have been" dan keyin -ing shakli kerak', hint_tj: 'Пас аз "have been" шакли -ing лозим аст', hint_kg: '"have been" дан кийин -ing формасы керек', hint_kz: '"have been" кейін -ing формасы керек', expl_ru: 'Present Perfect Continuous: have/has been + глагол с -ing (working).', expl_uz: 'Present Perfect Continuous: have/has been + -ing (working).', expl_tj: 'Present Perfect Continuous: have/has been + феъл бо -ing (working).', expl_kg: 'Present Perfect Continuous: have/has been + -ing (working).', expl_kz: 'Present Perfect Continuous: have/has been + -ing (working).' },
    { q: '[TRANSLATE] Как сказать "надёжный работник"?', opts: ['a reliable worker', 'a busy worker', 'a tired worker', 'a new worker'], c: 0, hint_ru: 'Надёжный = можно доверять', hint_uz: 'Ishonchli = ishonsa bo\'ladi', hint_tj: 'Боэътимод = метавон бовар кард', hint_kg: 'Ишенимдүү = ишенсе болот', hint_kz: 'Сенімді = сенуге болады', expl_ru: '"reliable" — надёжный; reliable worker — надёжный работник.', expl_uz: '"reliable" — ishonchli; reliable worker — ishonchli ishchi.', expl_tj: '"reliable" — боэътимод; reliable worker — коргари боэътимод.', expl_kg: '"reliable" — ишенимдүү; reliable worker — ишенимдүү жумушчу.', expl_kz: '"reliable" — сенімді; reliable worker — сенімді жұмысшы.' },
    { q: '[COMPLETE] I want a ___ to shift leader.', opts: ['promotion', 'problem', 'holiday', 'mistake'], c: 0, hint_ru: 'Движение вверх по службе', hint_uz: 'Lavozim bo\'yicha yuqoriga ko\'tarilish', hint_tj: 'Боло рафтан дар вазифа', hint_kg: 'Кызматта жогору көтөрүлүү', hint_kz: 'Қызметте жоғары көтерілу', expl_ru: '"promotion" — повышение по службе.', expl_uz: '"promotion" — lavozim ko\'tarilishi.', expl_tj: '"promotion" — баландшавии вазифа.', expl_kg: '"promotion" — кызмат жогорулатуу.', expl_kz: '"promotion" — қызмет жоғарылату.' },
    { q: '[TRANSLATE] Как сказать "Я готов учиться"?', opts: ['I am willing to learn', 'I am tired to learn', 'I was learn', 'I learn not'], c: 0, hint_ru: '"готов / охотно" что-то делать', hint_uz: 'biror narsa qilishga "tayyor / xohishli"', hint_tj: '"омода / бо майл" коре кардан', hint_kg: 'бир нерсе кылууга "даяр / ыктыярдуу"', hint_kz: 'бірдеңе істеуге "дайын / ықыласпен"', expl_ru: '"willing to + глагол" — готов охотно что-то делать.', expl_uz: '"willing to + fe\'l" — biror ishni xohish bilan qilishga tayyor.', expl_tj: '"willing to + феъл" — бо майл коре кардан.', expl_kg: '"willing to + этиш" — ыктыяр менен бир нерсе кылууга даяр.', expl_kz: '"willing to + етістік" — ықыласпен бірдеңе істеуге дайын.' },
    { q: '[COMPLETE] What ___ you been doing this week?', opts: ['have', 'has', 'do', 'are'], c: 0, hint_ru: 'Вопрос с "you" в Present Perfect Continuous', hint_uz: '"you" bilan savol', hint_tj: 'Савол бо "you"', hint_kg: '"you" менен суроо', hint_kz: '"you" арқылы сұрақ', expl_ru: 'What have you been doing? — вспомогательный have для you.', expl_uz: 'What have you been doing? — you uchun have.', expl_tj: 'What have you been doing? — барои you феъли have.', expl_kg: 'What have you been doing? — you үчүн have.', expl_kz: 'What have you been doing? — you үшін have.' },
    { q: '[TRANSLATE] Как сказать "работа в команде"?', opts: ['teamwork', 'homework', 'paperwork', 'overtime'], c: 0, hint_ru: 'Когда команда работает вместе', hint_uz: 'Jamoa birga ishlaganda', hint_tj: 'Вақте ки даста якҷоя кор мекунад', hint_kg: 'Команда чогуу иштегенде', hint_kz: 'Команда бірге жұмыс істегенде', expl_ru: '"teamwork" — работа в команде (team + work).', expl_uz: '"teamwork" — jamoaviy ish (team + work).', expl_tj: '"teamwork" — кори дастаҷамъӣ (team + work).', expl_kg: '"teamwork" — командалык иш (team + work).', expl_kz: '"teamwork" — командалық жұмыс (team + work).' },
    { q: '[COMPLETE] He ___ not been feeling well this week.', opts: ['has', 'have', 'is', 'did'], c: 0, hint_ru: '"he" — 3-е лицо ед. числа, отрицание', hint_uz: '"he" — uchinchi shaxs, inkor', hint_tj: '"he" — шахси сеюм, инкор', hint_kg: '"he" — үчүнчү жак, тангуу', hint_kz: '"he" — үшінші жақ, болымсыз', expl_ru: 'He has not been... — с he используется has.', expl_uz: 'He has not been... — he bilan has.', expl_tj: 'He has not been... — бо he феъли has.', expl_kg: 'He has not been... — he менен has.', expl_kz: 'He has not been... — he арқылы has.' },
    { q: '[TRANSLATE] Как сказать "повышение зарплаты"?', opts: ['a pay rise', 'a pay day', 'a day off', 'a time sheet'], c: 0, hint_ru: 'Когда платят больше денег', hint_uz: 'Ko\'proq pul to\'laganda', hint_tj: 'Вақте ки пули бештар медиҳанд', hint_kg: 'Көбүрөөк акча төлөгөндө', hint_kz: 'Көбірек ақша төлегенде', expl_ru: '"pay rise" — повышение зарплаты.', expl_uz: '"pay rise" — maosh oshishi.', expl_tj: '"pay rise" — зиёдшавии маош.', expl_kg: '"pay rise" — эмгек акы жогорулатуу.', expl_kz: '"pay rise" — жалақы өсуі.' },
  ],
};

// ── validation (dry run) ───────────────────────────────────────────────────
const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];
const a1 = require('./lessons_data.js'), a2 = require('./lessons_data_a2.js'), b1 = require('./lessons_data_b1.js');
const used = new Map();
[['a1', a1], ['a2', a2], ['b1', b1]].forEach(([c, C]) => C.forEach(l => l.words.forEach(w => used.set(w.en.trim().toLowerCase(), c + ' L' + l.id))));

const errs = [];
// words
if (L7.words.length !== 30) errs.push('words count ' + L7.words.length);
const seenW = new Set();
L7.words.forEach((w, i) => {
  for (const k of ['e', 'en', 'pn', 'transcr', ...LANGS]) if (w[k] === undefined || w[k] === null || (k !== 'e' && !String(w[k]).trim())) errs.push(`word[${i}] missing ${k}`);
  const n = w.en.trim().toLowerCase();
  if (used.has(n)) errs.push(`word[${i}] "${w.en}" DUP vs ${used.get(n)}`);
  if (seenW.has(n)) errs.push(`word[${i}] "${w.en}" dup within lesson`);
  seenW.add(n);
});
// dialogue
if (L7.dialogue.length !== 10) errs.push('dialogue count ' + L7.dialogue.length);
let prev = null;
L7.dialogue.forEach((d, i) => {
  for (const k of ['s', 'en', 'transcr', ...LANGS]) if (!String(d[k] || '').trim()) errs.push(`dlg[${i}] missing ${k}`);
  if (prev && d.s === prev) errs.push(`dlg[${i}] speaker repeat ${d.s}`);
  prev = d.s;
});
// quiz
if (L7.quiz.length !== 10) errs.push('quiz count ' + L7.quiz.length);
L7.quiz.forEach((q, i) => {
  if (!/^\[(COMPLETE|TRANSLATE)\]/.test(q.q)) errs.push(`quiz[${i}] no tag`);
  if (!Array.isArray(q.opts) || q.opts.length !== 4) errs.push(`quiz[${i}] opts!=4`);
  else if (new Set(q.opts.map(o => o.trim().toLowerCase())).size !== 4) errs.push(`quiz[${i}] dup opts`);
  if (typeof q.c !== 'number' || q.c < 0 || q.c > 3) errs.push(`quiz[${i}] bad c`);
  for (const k of LANGS) { if (!String(q['hint_' + k] || '').trim()) errs.push(`quiz[${i}] missing hint_${k}`); if (!String(q['expl_' + k] || '').trim()) errs.push(`quiz[${i}] missing expl_${k}`); }
});
// grammar shape
for (const fk of ['positive', 'negative', 'question']) {
  const f = L7.grammar.forms[fk];
  for (const k of LANGS) {
    if (!String(f['label_' + k] || '').trim()) errs.push(`grammar.${fk} missing label_${k}`);
    const r = f['rule_' + k] || '';
    if (!r.includes('display:grid') || !r.includes('grid-template-columns:1fr 1fr')) errs.push(`grammar.${fk}.rule_${k} no grid`);
    if (!r.includes('g-transcr')) errs.push(`grammar.${fk}.rule_${k} no g-transcr`);
  }
  f.table.forEach((row, ri) => { for (const k of ['subj', 'verb', 'example', 'transcr']) if (!String(row[k] || '').trim()) errs.push(`${fk}.table[${ri}] missing ${k}`); for (const k of LANGS) if (!String(row['tr_' + k] || '').trim()) errs.push(`${fk}.table[${ri}] missing tr_${k}`); });
}
for (const f of ['title', 'intro', 'cultural', 'note']) for (const k of LANGS) if (!String(L7.grammar[f + '_' + k] || '').trim()) errs.push(`grammar missing ${f}_${k}`);

// snowball: dialogue + translate-opts must use cumulative vocab (used set) OR L7's own 30 words OR allowlist
const ALLOW = new Set(('a an the this that these those some any all and or but if so as to of in on at for with by from i you he she it we they me him her us them my your his its our their is am are was were be been being do does did have has had will would can could should must may might not no yes very too also just now here there then what where when who which why how about into over under up down out off back well good thank thanks please sorry hello hi okay ok since for ever never long more most than three new all main small this week good morning').split(/\s+/));
const ownWords = new Set();
L7.words.forEach(w => w.en.toLowerCase().split(/[^a-z']+/).forEach(t => t && ownWords.add(t)));
const vocab = new Set(ALLOW);
used.forEach((_, en) => en.split(/[^a-z']+/).forEach(t => t && vocab.add(t)));
ownWords.forEach(t => vocab.add(t));
const stem = (w) => [w, w.replace(/ing$/, ''), w.replace(/ing$/, 'e'), w.replace(/ed$/, ''), w.replace(/s$/, ''), w.replace(/es$/, ''), w.replace(/ies$/, 'y')];
const sbMiss = new Set();
const scanSb = (text) => text.toLowerCase().split(/[^a-z']+/).forEach(t => { t = t.replace(/^'|'$/g, ''); if (t.length < 3) return; if (vocab.has(t)) return; if (stem(t).some(s => vocab.has(s))) return; sbMiss.add(t); });
L7.dialogue.forEach(d => scanSb(d.en));
L7.quiz.forEach(q => { if (q.q.includes('[TRANSLATE]')) q.opts.forEach(o => scanSb(o)); });

console.log(errs.length ? '❌ STRUCTURE/DUP ERRORS (' + errs.length + '):' : '✅ structure + dups OK (30 words, 10 dlg, 10 quiz, grammar complete)');
errs.forEach(e => console.log('  - ' + e));
console.log(sbMiss.size ? '⚠ SNOWBALL words not in vocab/allowlist (review): ' + [...sbMiss].join(', ') : '✅ snowball clean (dialogue + translate opts)');

if (process.argv.includes('--apply') && errs.length === 0) {
  const p = path.join(__dirname, '..', 'b1.html');
  let html = fs.readFileSync(p, 'utf8');
  // locate the LESSONS array end with a string-aware bracket matcher (CRLF-safe)
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
  // serialize L7 with 6-space base indent to match existing lessons
  const body = JSON.stringify(L7, null, 2).split('\n').map((l, i) => i === 0 ? l : '      ' + l).join('\n');
  // insert ",\n      <body>\n    " just before the closing ]
  html = html.slice(0, closeIdx) + ',\n      ' + body + '\n    ' + html.slice(closeIdx);
  // MODS module 3 lessons [6] -> [6, 7]
  html = html.replace('lessons: [6]', 'lessons: [6, 7]');
  fs.writeFileSync(p, html, 'utf8');
  console.log('\n✅ APPLIED: L7 injected into b1.html (string-aware), MODS M3 → [6,7]');
}
