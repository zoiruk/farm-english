/**
 * build_b1_l12.js — author B1 Lesson 12 (FINAL) "Банк, документы и виза".
 * Grammar: Reported speech (he said that... / she told me to... / he asked if...).
 * Module 6 (Life in the UK). Dialogue: w (worker reporting) / m (friend/manager).
 *
 * Dry-run by default; --apply injects into b1.html LESSONS (MODS finalised separately).
 * Translations: ru/en authored; uz/tj/kg/kz are AI drafts flagged for native review.
 */
const fs = require('fs');
const path = require('path');

const grid = (rows) =>
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">' +
  rows.map(([en, tr, ru]) => `<div><code>${en}</code> <span class="g-transcr">[${tr}]</span> (${ru})</div>`).join('') +
  '</div>';

const L12 = {
  id: 12,
  mod: 6,
  name_ru: 'Банк, документы и виза',
  name_uz: 'Bank, hujjatlar va viza',
  name_tj: 'Бонк, ҳуҷҷатҳо ва виза',
  name_kg: 'Банк, документтер жана виза',
  name_kz: 'Банк, құжаттар және виза',
  cefr: 'Reported speech (said/told + that, told to, asked if)',
  grammar: {
    title_ru: 'REPORTED SPEECH — как пересказать чужие слова',
    title_uz: 'REPORTED SPEECH — birovning gapini qayta aytish',
    title_tj: 'REPORTED SPEECH — гапи каси дигарро баён кардан',
    title_kg: 'REPORTED SPEECH — бирөөнүн сөзүн кайра айтуу',
    title_kz: 'REPORTED SPEECH — басқаның сөзін жеткізу',
    intro_ru: '<div style="line-height:1.6">Когда вы пересказываете чужие слова, время обычно «сдвигается» назад (is→was, have→had, will→would).<br>🗣️ <b>say/tell (that)</b>: <i>He <b>said that</b> my permit <b>was</b> valid.</i><br>📋 <b>tell someone to</b> (просьба/команда): <i>The officer <b>told me to</b> bring my passport.</i><br>❓ <b>ask if / ask wh-</b> (вопрос): <i>She <b>asked if</b> I <b>had</b> a visa.</i></div>',
    intro_uz: '<div style="line-height:1.6">Birovning gapini qayta aytganda, zamon odatda orqaga «suriladi» (is→was, have→had, will→would).<br>🗣️ <b>say/tell (that)</b>: <i>He said that my permit was valid.</i><br>📋 <b>tell someone to</b>: <i>The officer told me to bring my passport.</i><br>❓ <b>ask if</b>: <i>She asked if I had a visa.</i></div>',
    intro_tj: '<div style="line-height:1.6">Вақте гапи каси дигарро баён мекунед, замон одатан ба ақиб «мегузарад» (is→was, have→had, will→would).<br>🗣️ <b>say/tell (that)</b>: <i>He said that my permit was valid.</i><br>📋 <b>tell someone to</b>: <i>The officer told me to bring my passport.</i><br>❓ <b>ask if</b>: <i>She asked if I had a visa.</i></div>',
    intro_kg: '<div style="line-height:1.6">Бирөөнүн сөзүн кайра айтканда, чак адатта артка «жылат» (is→was, have→had, will→would).<br>🗣️ <b>say/tell (that)</b>: <i>He said that my permit was valid.</i><br>📋 <b>tell someone to</b>: <i>The officer told me to bring my passport.</i><br>❓ <b>ask if</b>: <i>She asked if I had a visa.</i></div>',
    intro_kz: '<div style="line-height:1.6">Басқаның сөзін жеткізгенде, шақ әдетте артқа «жылжиды» (is→was, have→had, will→would).<br>🗣️ <b>say/tell (that)</b>: <i>He said that my permit was valid.</i><br>📋 <b>tell someone to</b>: <i>The officer told me to bring my passport.</i><br>❓ <b>ask if</b>: <i>She asked if I had a visa.</i></div>',
    cultural_ru: 'В Home Office и банке важно точно пересказать, что вам сказали. Всегда записывайте имя officer и дату. Если английский трудный, вы имеете право попросить interpreter (переводчика) — это бесплатно в официальных учреждениях. Для residence permit (BRP) и продления визы нужны certified (заверенные) копии документов; их может заверить solicitor.',
    cultural_uz: 'Home Office va bankda sizga nima deyilganini aniq qayta aytish muhim. Officer ismini va sanani yozib oling. Ingliz tili qiyin bo\'lsa, interpreter (tarjimon) so\'rashga haqlisiz — rasmiy muassasalarda bu bepul.',
    cultural_tj: 'Дар Home Office ва бонк баёни дақиқи он чи ба шумо гуфтанд муҳим аст. Номи officer ва санаро нависед. Агар забони англисӣ душвор бошад, шумо ҳуқуқ доред interpreter (тарҷумон) бихоҳед — дар муассисаҳои расмӣ ин ройгон аст.',
    cultural_kg: 'Home Office жана банкта сизге эмне айтылганын так кайра айтуу маанилүү. Officer ысымын жана күндү жазып алыңыз. Англис тили кыйын болсо, interpreter (котормочу) сурашка укуктуусуз — расмий мекемелерде бул акысыз.',
    cultural_kz: 'Home Office пен банкте сізге не айтылғанын дәл жеткізу маңызды. Officer есімі мен күнді жазып алыңыз. Ағылшын тілі қиын болса, interpreter (аудармашы) сұрауға құқылысыз — ресми мекемелерде бұл тегін.',
    note_ru: '⚠️ После "tell" нужен человек (tell ME), после "say" — нет (say THAT). Сравните: He told me that... / He said that...',
    note_uz: '⚠️ "tell" dan keyin odam kerak (tell ME), "say" dan keyin — yo\'q (say THAT). He told me that... / He said that...',
    note_tj: '⚠️ Пас аз "tell" одам лозим аст (tell ME), пас аз "say" — не (say THAT). He told me that... / He said that...',
    note_kg: '⚠️ "tell" дан кийин адам керек (tell ME), "say" дан кийин — жок (say THAT). He told me that... / He said that...',
    note_kz: '⚠️ "tell" кейін адам керек (tell ME), "say" кейін — жоқ (say THAT). He told me that... / He said that...',
    forms: {
      positive: {
        label_ru: '🗣️ SAY / TELL — пересказ слов', label_uz: '🗣️ SAY / TELL — gapni aytish', label_tj: '🗣️ SAY / TELL — баёни гап', label_kg: '🗣️ SAY / TELL — сөздү айтуу', label_kz: '🗣️ SAY / TELL — сөзді жеткізу',
        rule_ru: grid([
          ['He said that...', 'хи сэд зэт', 'он сказал, что...'],
          ['She told me that...', 'ши толд ми зэт', 'она сказала мне, что...'],
          ['was valid', 'уоз вэлид', 'был действителен'],
          ['had a permit', 'хэд э пёмит', 'был документ'],
        ]),
        rule_uz: grid([
          ['He said that...', 'хи сэд зэт', 'u dedi-ki...'],
          ['She told me that...', 'ши толд ми зэт', 'u menga dedi-ki...'],
          ['was valid', 'уоз вэлид', 'amal qilardi'],
          ['had a permit', 'хэд э пёмит', 'ruxsatnomasi bor edi'],
        ]),
        rule_tj: grid([
          ['He said that...', 'хи сэд зэт', 'вай гуфт, ки...'],
          ['She told me that...', 'ши толд ми зэт', 'вай ба ман гуфт, ки...'],
          ['was valid', 'уоз вэлид', 'эътибор дошт'],
          ['had a permit', 'хэд э пёмит', 'иҷозатнома дошт'],
        ]),
        rule_kg: grid([
          ['He said that...', 'хи сэд зэт', 'ал айтты...'],
          ['She told me that...', 'ши толд ми зэт', 'ал мага айтты...'],
          ['was valid', 'уоз вэлид', 'жарактуу болчу'],
          ['had a permit', 'хэд э пёмит', 'уруксаты бар эле'],
        ]),
        rule_kz: grid([
          ['He said that...', 'хи сэд зэт', 'ол айтты...'],
          ['She told me that...', 'ши толд ми зэт', 'ол маған айтты...'],
          ['was valid', 'уоз вэлид', 'жарамды болды'],
          ['had a permit', 'хэд э пёмит', 'рұқсаты бар еді'],
        ]),
        table: [
          { subj: 'He said', verb: '(that)', example: 'He said that my residence permit was still valid.', transcr: 'Хи сэд зэт май рэзидэнс пёмит уоз стил вэлид', tr_ru: 'Он сказал, что мой вид на жительство ещё действителен.', tr_uz: 'U mening residence permitim hali amal qilishini aytdi.', tr_tj: 'Вай гуфт, ки иҷозатномаи истиқомати ман ҳанӯз эътибор дорад.', tr_kg: 'Ал менин residence permitим дагы жарактуу экенин айтты.', tr_kz: 'Ол менің residence permitім әлі жарамды екенін айтты.' },
          { subj: 'She told me', verb: '(that)', example: 'She told me that the bank had closed my old account.', transcr: 'Ши толд ми зэт зэ бэнк хэд клоузд май оулд экаунт', tr_ru: 'Она сказала мне, что банк закрыл мой старый счёт.', tr_uz: 'U menga bank eski hisobimni yopganini aytdi.', tr_tj: 'Вай ба ман гуфт, ки бонк ҳисоби кӯҳнаи маро баст.', tr_kg: 'Ал мага банк менин эски эсебимди жапканын айтты.', tr_kz: 'Ол маған банк ескі шотымды жапқанын айтты.' },
          { subj: 'The officer said', verb: '(that)', example: 'The officer said that the decision would take two weeks.', transcr: 'Зи офисэ сэд зэт зэ дисижн вуд тэйк ту уикс', tr_ru: 'Сотрудник сказал, что решение займёт две недели.', tr_uz: 'Officer qaror ikki hafta olishini aytdi.', tr_tj: 'Officer гуфт, ки қарор ду ҳафта вақт мегирад.', tr_kg: 'Officer чечим эки жума алаарын айтты.', tr_kz: 'Officer шешім екі апта алатынын айтты.' },
          { subj: 'They told us', verb: '(that)', example: 'They told us that the office was closed on Monday.', transcr: 'Зэй толд ас зэт зи офис уоз клоузд он мандэй', tr_ru: 'Они сказали нам, что офис был закрыт в понедельник.', tr_uz: 'Ular bizga ofis dushanba kuni yopiq bo\'lganini aytdi.', tr_tj: 'Онҳо ба мо гуфтанд, ки дафтар рӯзи душанбе баста буд.', tr_kg: 'Алар бизге офис дүйшөмбү күнү жабык болгонун айтышты.', tr_kz: 'Олар бізге кеңсе дүйсенбіде жабық болғанын айтты.' },
        ],
      },
      negative: {
        label_ru: '📋 TELL ... TO — просьба/команда', label_uz: '📋 TELL ... TO — buyruq/iltimos', label_tj: '📋 TELL ... TO — фармоиш/илтимос', label_kg: '📋 TELL ... TO — буйрук/өтүнүч', label_kz: '📋 TELL ... TO — бұйрық/өтініш',
        rule_ru: grid([
          ['told me to bring', 'толд ми ту брин', 'велел принести'],
          ['told me to wait', 'толд ми ту уэйт', 'велел подождать'],
          ['asked me to sign', 'аскт ми ту сайн', 'попросил подписать'],
          ['told us not to', 'толд ас нот ту', 'велел не...'],
        ]),
        rule_uz: grid([
          ['told me to bring', 'толд ми ту брин', 'olib kelishimni aytdi'],
          ['told me to wait', 'толд ми ту уэйт', 'kutishimni aytdi'],
          ['asked me to sign', 'аскт ми ту сайн', 'imzolashimni so\'radi'],
          ['told us not to', 'толд ас нот ту', '...maslikni aytdi'],
        ]),
        rule_tj: grid([
          ['told me to bring', 'толд ми ту брин', 'гуфт, ки биёрам'],
          ['told me to wait', 'толд ми ту уэйт', 'гуфт, ки интизор шавам'],
          ['asked me to sign', 'аскт ми ту сайн', 'хоҳиш кард, ки имзо кунам'],
          ['told us not to', 'толд ас нот ту', 'гуфт, ки на...'],
        ]),
        rule_kg: grid([
          ['told me to bring', 'толд ми ту брин', 'алып келүүмдү айтты'],
          ['told me to wait', 'толд ми ту уэйт', 'күтүүмдү айтты'],
          ['asked me to sign', 'аскт ми ту сайн', 'кол коюумду сурады'],
          ['told us not to', 'толд ас нот ту', 'кылбоону айтты'],
        ]),
        rule_kz: grid([
          ['told me to bring', 'толд ми ту брин', 'әкелуімді айтты'],
          ['told me to wait', 'толд ми ту уэйт', 'күтуімді айтты'],
          ['asked me to sign', 'аскт ми ту сайн', 'қол қоюымды сұрады'],
          ['told us not to', 'толд ас нот ту', 'істемеуді айтты'],
        ]),
        table: [
          { subj: 'told me to', verb: 'bring', example: 'The officer told me to bring two certified photocopies.', transcr: 'Зи офисэ толд ми ту брин ту сётифайд фоутоукопиз', tr_ru: 'Сотрудник велел мне принести две заверенные копии.', tr_uz: 'Officer menga ikkita certified nusxa olib kelishimni aytdi.', tr_tj: 'Officer ба ман гуфт, ки ду нусхаи certified биёрам.', tr_kg: 'Officer мага эки certified көчүрмө алып келүүмдү айтты.', tr_kz: 'Officer маған екі certified көшірме әкелуімді айтты.' },
          { subj: 'asked me to', verb: 'wait', example: 'The teller asked me to wait at the counter for a minute.', transcr: 'Зэ тэлэ аскт ми ту уэйт эт зэ каунтэ фо э минит', tr_ru: 'Кассир попросил меня подождать у стойки минуту.', tr_uz: 'Kassir menga bir daqiqa peshtaxtada kutishimni so\'radi.', tr_tj: 'Хазинадор аз ман хоҳиш кард, ки як дақиқа назди миз интизор шавам.', tr_kg: 'Кассир мага бир мүнөт текчеде күтүүмдү сурады.', tr_kz: 'Кассир маған бір минут сөреде күтуімді сұрады.' },
          { subj: 'told us not to', verb: 'be late', example: 'They told us not to be late for the visa appointment.', transcr: 'Зэй толд ас нот ту би лэйт фо зэ виза эпойнтмэнт', tr_ru: 'Они велели нам не опаздывать на приём по визе.', tr_uz: 'Ular bizga viza uchrashuiviga kechikmaslikni aytdi.', tr_tj: 'Онҳо ба мо гуфтанд, ки ба мулоқоти виза дер накунем.', tr_kg: 'Алар бизге виза жолугушуусуна кечикпөөнү айтышты.', tr_kz: 'Олар бізге виза кездесуіне кешікпеуді айтты.' },
        ],
      },
      question: {
        label_ru: '❓ ASK IF / ASK WH- — переданный вопрос', label_uz: '❓ ASK IF / ASK WH- — savol', label_tj: '❓ ASK IF / ASK WH- — савол', label_kg: '❓ ASK IF / ASK WH- — суроо', label_kz: '❓ ASK IF / ASK WH- — сұрақ',
        rule_ru: grid([
          ['asked if I had...', 'аскт иф ай хэд', 'спросил, есть ли у меня...'],
          ['asked where I lived', 'аскт уэа ай ливд', 'спросил, где я живу'],
          ['asked when it started', 'аскт уэн ит стартид', 'спросил, когда началось'],
          ['asked why I came', 'аскт уай ай кейм', 'спросил, почему я пришёл'],
        ]),
        rule_uz: grid([
          ['asked if I had...', 'аскт иф ай хэд', '...bor-yo\'qligini so\'radi'],
          ['asked where I lived', 'аскт уэа ай ливд', 'qayerda yashashimni so\'radi'],
          ['asked when it started', 'аскт уэн ит стартид', 'qachon boshlanganini so\'radi'],
          ['asked why I came', 'аскт уай ай кейм', 'nega kelganimni so\'radi'],
        ]),
        rule_tj: grid([
          ['asked if I had...', 'аскт иф ай хэд', 'пурсид, ки оё ман доштам...'],
          ['asked where I lived', 'аскт уэа ай ливд', 'пурсид, ки ман дар куҷо зиндагӣ мекунам'],
          ['asked when it started', 'аскт уэн ит стартид', 'пурсид, ки кай оғоз шуд'],
          ['asked why I came', 'аскт уай ай кейм', 'пурсид, ки чаро омадам'],
        ]),
        rule_kg: grid([
          ['asked if I had...', 'аскт иф ай хэд', '...бар-жогун сурады'],
          ['asked where I lived', 'аскт уэа ай ливд', 'кайда жашаарымды сурады'],
          ['asked when it started', 'аскт уэн ит стартид', 'качан башталганын сурады'],
          ['asked why I came', 'аскт уай ай кейм', 'эмне үчүн келгенимди сурады'],
        ]),
        rule_kz: grid([
          ['asked if I had...', 'аскт иф ай хэд', '...бар-жоғын сұрады'],
          ['asked where I lived', 'аскт уэа ай ливд', 'қайда тұратынымды сұрады'],
          ['asked when it started', 'аскт уэн ит стартид', 'қашан басталғанын сұрады'],
          ['asked why I came', 'аскт уай ай кейм', 'неге келгенімді сұрады'],
        ]),
        table: [
          { subj: 'asked if', verb: '(yes/no)', example: 'The officer asked if I had a valid residence permit.', transcr: 'Зи офисэ аскт иф ай хэд э вэлид рэзидэнс пёмит', tr_ru: 'Сотрудник спросил, есть ли у меня действительный вид на жительство.', tr_uz: 'Officer menda amaldagi residence permit bor-yo\'qligini so\'radi.', tr_tj: 'Officer пурсид, ки оё ман residence permit-и эътибордор дорам.', tr_kg: 'Officer менде жарактуу residence permit бар-жогун сурады.', tr_kz: 'Officer менде жарамды residence permit бар-жоғын сұрады.' },
          { subj: 'asked where', verb: '(wh-)', example: 'The bank asked where I lived and how long I had worked here.', transcr: 'Зэ бэнк аскт уэа ай ливд энд хау лонг ай хэд уёкт хиэ', tr_ru: 'Банк спросил, где я живу и как долго я здесь работаю.', tr_uz: 'Bank qayerda yashashimni va qancha vaqt ishlaganimni so\'radi.', tr_tj: 'Бонк пурсид, ки ман дар куҷо зиндагӣ мекунам ва чанд вақт кор кардаам.', tr_kg: 'Банк кайда жашаарымды жана канча убакыт иштегенимди сурады.', tr_kz: 'Банк қайда тұратынымды және қанша уақыт істегенімді сұрады.' },
          { subj: 'asked why', verb: '(wh-)', example: 'The interpreter asked why I wanted to renew the visa now.', transcr: 'Зи интёпритэ аскт уай ай уонтид ту ринью зэ виза нау', tr_ru: 'Переводчик спросил, почему я хочу продлить визу сейчас.', tr_uz: 'Tarjimon nega vizani hozir yangilamoqchi ekanimni so\'radi.', tr_tj: 'Тарҷумон пурсид, ки чаро ман мехоҳам визаро ҳоло нав кунам.', tr_kg: 'Котормочу эмне үчүн визаны азыр жаңыртайын дегенимди сурады.', tr_kz: 'Аудармашы неге визаны қазір жаңартқым келетінін сұрады.' },
        ],
      },
    },
  },
  words: [
    { e: '🏛️', en: 'Home Office', pn: '/həʊm ˈɒfɪs/', transcr: 'хоум офис', ru: 'МВД (визовый орган)', uz: 'Ichki ishlar vazirligi (Home Office)', tj: 'Вазорати корҳои дохилӣ (Home Office)', kg: 'Ички иштер министрлиги (Home Office)', kz: 'Ішкі істер министрлігі (Home Office)' },
    { e: '🪪', en: 'residence permit', pn: '/ˈrezɪdəns ˈpɜːmɪt/', transcr: 'рэзидэнс пёмит', ru: 'вид на жительство (BRP)', uz: 'yashash uchun ruxsatnoma (BRP)', tj: 'иҷозати истиқомат (BRP)', kg: 'жашоо уруксаты (BRP)', kz: 'тұру рұқсаты (BRP)' },
    { e: '👮', en: 'officer', pn: '/ˈɒfɪsə/', transcr: 'офисэ', ru: 'сотрудник (служащий)', uz: 'xodim (mansabdor)', tj: 'корманд (мансабдор)', kg: 'кызматкер (чиновник)', kz: 'қызметкер (шенеунік)' },
    { e: '🎖️', en: 'official', pn: '/əˈfɪʃl/', transcr: 'эфишл', ru: 'официальный', uz: 'rasmiy', tj: 'расмӣ', kg: 'расмий', kz: 'ресми' },
    { e: '🛂', en: 'citizenship', pn: '/ˈsɪtɪzənʃɪp/', transcr: 'ситизэншип', ru: 'гражданство', uz: 'fuqarolik', tj: 'шаҳрвандӣ', kg: 'жарандык', kz: 'азаматтық' },
    { e: '🔄', en: 'renew', pn: '/rɪˈnjuː/', transcr: 'ринью', ru: 'продлевать (обновлять)', uz: 'yangilamoq', tj: 'нав кардан (тамдид)', kg: 'жаңыртуу', kz: 'жаңарту' },
    { e: '❌', en: 'invalid', pn: '/ɪnˈvælɪd/', transcr: 'инвэлид', ru: 'недействительный', uz: 'haqiqiy emas', tj: 'беэътибор', kg: 'жараксыз', kz: 'жарамсыз' },
    { e: '🆔', en: 'identity', pn: '/aɪˈdentəti/', transcr: 'айдэнтити', ru: 'личность (идентификация)', uz: 'shaxs (identifikatsiya)', tj: 'шахсият', kg: 'инсандык (идентификация)', kz: 'жеке басы (сәйкестендіру)' },
    { e: '📢', en: 'declare', pn: '/dɪˈkleə/', transcr: 'диклеэ', ru: 'декларировать (заявлять)', uz: 'deklaratsiya qilmoq', tj: 'эълон кардан', kg: 'жарыялоо (декларациялоо)', kz: 'мәлімдеу (декларациялау)' },
    { e: '📨', en: 'submit', pn: '/səbˈmɪt/', transcr: 'сэбмит', ru: 'подавать (документы)', uz: 'topshirmoq', tj: 'пешниҳод кардан', kg: 'тапшыруу', kz: 'тапсыру' },
    { e: '📜', en: 'certified', pn: '/ˈsɜːtɪfaɪd/', transcr: 'сётифайд', ru: 'заверенный (копия)', uz: 'tasdiqlangan (nusxa)', tj: 'тасдиқшуда (нусха)', kg: 'күбөлөндүрүлгөн (көчүрмө)', kz: 'расталған (көшірме)' },
    { e: '👨‍⚖️', en: 'solicitor', pn: '/səˈlɪsɪtə/', transcr: 'сэлиситэ', ru: 'юрист (солиситор)', uz: 'yurist (advokat)', tj: 'ҳуқуқшинос (адвокат)', kg: 'юрист (адвокат)', kz: 'заңгер (адвокат)' },
    { e: '🙋', en: 'applicant', pn: '/ˈæplɪkənt/', transcr: 'эпликэнт', ru: 'заявитель', uz: 'ariza beruvchi', tj: 'аризадиҳанда', kg: 'арыз берүүчү', kz: 'өтініш беруші' },
    { e: '👆', en: 'fingerprint', pn: '/ˈfɪŋɡəprɪnt/', transcr: 'фингэпринт', ru: 'отпечаток пальца', uz: 'barmoq izi', tj: 'изи ангушт', kg: 'манжа изи', kz: 'саусақ ізі' },
    { e: '♾️', en: 'indefinite', pn: '/ɪnˈdefɪnət/', transcr: 'индэфинэт', ru: 'бессрочный (ILR)', uz: 'muddatsiz (ILR)', tj: 'бемуддат (ILR)', kg: 'мөөнөтсүз (ILR)', kz: 'мерзімсіз (ILR)' },
    { e: '🚷', en: 'refusal', pn: '/rɪˈfjuːzl/', transcr: 'рифьюзл', ru: 'отказ', uz: 'rad etish', tj: 'рад кардан', kg: 'баш тартуу', kz: 'бас тарту' },
    { e: '👎', en: 'reject', pn: '/rɪˈdʒekt/', transcr: 'риджект', ru: 'отклонять (отвергать)', uz: 'rad qilmoq', tj: 'рад кардан', kg: 'четке кагуу', kz: 'қабылдамау' },
    { e: '⚖️', en: 'decision', pn: '/dɪˈsɪʒn/', transcr: 'дисижн', ru: 'решение', uz: 'qaror', tj: 'қарор', kg: 'чечим', kz: 'шешім' },
    { e: '✔️', en: 'verify', pn: '/ˈverɪfaɪ/', transcr: 'вэрифай', ru: 'проверять (подтверждать)', uz: 'tekshirib tasdiqlamoq', tj: 'тасдиқ кардан', kg: 'текшерүү (ырастоо)', kz: 'тексеру (растау)' },
    { e: '🗣️', en: 'interpreter', pn: '/ɪnˈtɜːprɪtə/', transcr: 'интёпритэ', ru: 'устный переводчик', uz: 'tarjimon', tj: 'тарҷумон', kg: 'котормочу', kz: 'аудармашы' },
    { e: '❓', en: 'enquiry', pn: '/ɪnˈkwaɪəri/', transcr: 'инкуайэри', ru: 'запрос (справка)', uz: 'so\'rov (ma\'lumot)', tj: 'дархост (маълумот)', kg: 'суроо-талап', kz: 'сұрау (анықтама)' },
    { e: '🔢', en: 'share code', pn: '/ʃeə kəʊd/', transcr: 'шеэ коуд', ru: 'код доступа (share code)', uz: 'ulashish kodi (share code)', tj: 'рамзи дастрасӣ (share code)', kg: 'жетки коду (share code)', kz: 'қатынау коды (share code)' },
    { e: '🏧', en: 'withdraw', pn: '/wɪðˈdrɔː/', transcr: 'уиздро', ru: 'снимать (деньги)', uz: 'pul yechmoq', tj: 'пул гирифтан (аз ҳисоб)', kg: 'акча алуу', kz: 'ақша алу' },
    { e: '#️⃣', en: 'sort code', pn: '/sɔːt kəʊd/', transcr: 'сот коуд', ru: 'код банка (sort code)', uz: 'bank kodi (sort code)', tj: 'рамзи бонк (sort code)', kg: 'банк коду (sort code)', kz: 'банк коды (sort code)' },
    { e: '💱', en: 'exchange', pn: '/ɪksˈtʃeɪndʒ/', transcr: 'иксчэйндж', ru: 'обмен (валюты)', uz: 'almashtirish (valyuta)', tj: 'мубодила (асъор)', kg: 'алмаштыруу (валюта)', kz: 'айырбастау (валюта)' },
    { e: '💴', en: 'currency', pn: '/ˈkʌrənsi/', transcr: 'карэнси', ru: 'валюта', uz: 'valyuta', tj: 'асъор', kg: 'валюта', kz: 'валюта' },
    { e: '💸', en: 'transaction', pn: '/trænˈzækʃn/', transcr: 'трэнзэкшн', ru: 'транзакция (операция)', uz: 'tranzaksiya (operatsiya)', tj: 'муомилот (амалиёт)', kg: 'транзакция (операция)', kz: 'транзакция (операция)' },
    { e: '🧮', en: 'balance', pn: '/ˈbæləns/', transcr: 'бэлэнс', ru: 'баланс (остаток)', uz: 'balans (qoldiq)', tj: 'бақия (тавозун)', kg: 'баланс (калдык)', kz: 'баланс (қалдық)' },
    { e: '📥', en: 'recipient', pn: '/rɪˈsɪpiənt/', transcr: 'рисипиэнт', ru: 'получатель', uz: 'qabul qiluvchi', tj: 'гиранда', kg: 'алуучу', kz: 'алушы' },
    { e: '📲', en: 'contactless', pn: '/ˈkɒntæktləs/', transcr: 'контэктлэс', ru: 'бесконтактный', uz: 'kontaktsiz', tj: 'бетамос', kg: 'байланышсыз', kz: 'байланыссыз' },
  ],
  dialogue: [
    { s: 'w', en: 'I went to the Home Office today about my visa. I am a bit worried.', transcr: 'Ай уэнт ту зэ хоум офис тудэй эбаут май виза. Ай эм э бит уорид.', ru: 'Я ходил сегодня в Home Office по поводу визы. Я немного волнуюсь.', uz: 'Bugun vizam bo\'yicha Home Office\'ga bordim. Bir oz xavotirdaman.', tj: 'Имрӯз ман оид ба визаам ба Home Office рафтам. Каме нигаронам.', kg: 'Бүгүн визам боюнча Home Office\'ке бардым. Бир аз тынчсызданып турам.', kz: 'Бүгін визам бойынша Home Office-ке бардым. Сәл алаңдаймын.' },
    { s: 'm', en: 'Do not worry. What did the officer say to you?', transcr: 'Ду нот уори. Уот дид зи офисэ сэй ту ю?', ru: 'Не волнуйся. Что тебе сказал сотрудник?', uz: 'Xavotir olmang. Officer sizga nima dedi?', tj: 'Нигарон нашав. Officer ба ту чӣ гуфт?', kg: 'Тынчсызданба. Officer сага эмне айтты?', kz: 'Алаңдама. Officer саған не деді?' },
    { s: 'w', en: 'He said that my residence permit was still valid for one year.', transcr: 'Хи сэд зэт май рэзидэнс пёмит уоз стил вэлид фо уан йиэ.', ru: 'Он сказал, что мой вид на жительство ещё действителен один год.', uz: 'U mening residence permitim hali bir yil amal qilishini aytdi.', tj: 'Вай гуфт, ки иҷозатномаи истиқомати ман ҳанӯз як сол эътибор дорад.', kg: 'Ал менин residence permitим дагы бир жыл жарактуу экенин айтты.', kz: 'Ол менің residence permitім әлі бір жыл жарамды екенін айтты.' },
    { s: 'm', en: 'That is good news. Did he ask you any questions?', transcr: 'Зэт из гуд ньюз. Дид хи аск ю эни куэсчэнз?', ru: 'Это хорошая новость. Он задавал тебе вопросы?', uz: 'Bu yaxshi xabar. U sizga savol berdimi?', tj: 'Ин хабари хуб аст. Вай ба ту савол дод?', kg: 'Бул жакшы кабар. Ал сага суроо бердиби?', kz: 'Бұл жақсы жаңалық. Ол саған сұрақ қойды ма?' },
    { s: 'w', en: 'Yes. He asked if I had a new passport, and told me to submit a photocopy.', transcr: 'Йес. Хи аскт иф ай хэд э нью паспот, энд толд ми ту сэбмит э фоутоукопи.', ru: 'Да. Он спросил, есть ли у меня новый паспорт, и велел подать фотокопию.', uz: 'Ha. U menda yangi pasport bor-yo\'qligini so\'radi va fotonusxa topshirishimni aytdi.', tj: 'Бале. Вай пурсид, ки оё ман паспорти нав дорам ва гуфт, ки нусхаи аксиро пешниҳод кунам.', kg: 'Ооба. Ал менде жаңы паспорт бар-жогун сурады жана фотокөчүрмө тапшырууну айтты.', kz: 'Иә. Ол менде жаңа паспорт бар-жоғын сұрады және фотокөшірме тапсыруымды айтты.' },
    { s: 'm', en: 'Did the interpreter help you understand everything?', transcr: 'Дид зи интёпритэ хэлп ю андэстэнд эврисин?', ru: 'Переводчик помог тебе всё понять?', uz: 'Tarjimon hamma narsani tushunishingizga yordam berdimi?', tj: 'Тарҷумон ба ту кӯмак кард, ки ҳама чизро фаҳмӣ?', kg: 'Котормочу баарын түшүнүүгө жардам бердиби?', kz: 'Аудармашы бәрін түсінуіңе көмектесті ме?' },
    { s: 'w', en: 'Yes, the interpreter was free. She told me not to be late for the decision letter.', transcr: 'Йес, зи интёпритэ уоз фри. Ши толд ми нот ту би лэйт фо зэ дисижн летэ.', ru: 'Да, переводчик был бесплатным. Она велела не опаздывать с письмом о решении.', uz: 'Ha, tarjimon bepul edi. U qaror xati bilan kechikmaslikni aytdi.', tj: 'Бале, тарҷумон ройгон буд. Вай гуфт, ки бо номаи қарор дер накунам.', kg: 'Ооба, котормочу акысыз болду. Ал чечим каты менен кечикпөөнү айтты.', kz: 'Иә, аудармашы тегін болды. Ол шешім хатымен кешікпеуді айтты.' },
    { s: 'm', en: 'Good. And did you sort out the bank account problem too?', transcr: 'Гуд. Энд дид ю сот аут зэ бэнк экаунт проблэм ту?', ru: 'Хорошо. А с проблемой банковского счёта ты тоже разобрался?', uz: 'Yaxshi. Bank hisobi muammosini ham hal qildingizmi?', tj: 'Хуб. Оё мушкилоти ҳисоби бонкиро низ ҳал кардӣ?', kg: 'Жакшы. Банк эсеби көйгөйүн да чечтиңби?', kz: 'Жақсы. Банк шоты мәселесін де шештің бе?' },
    { s: 'w', en: 'Almost. The bank said that they would verify my address and call me back.', transcr: 'Олмоуст. Зэ бэнк сэд зэт зэй вуд вэрифай май эдрэс энд кол ми бэк.', ru: 'Почти. Банк сказал, что проверит мой адрес и перезвонит мне.', uz: 'Deyarli. Bank manzilimni tekshirib, menga qayta qo\'ng\'iroq qilishini aytdi.', tj: 'Қариб. Бонк гуфт, ки суроғаи маро тасдиқ карда, ба ман боззанг мезанад.', kg: 'Дээрлик. Банк дарегимди текшерип, мага кайра чалаарын айтты.', kz: 'Дерлік. Банк мекенжайымды тексеріп, маған қайта қоңырау шалатынын айтты.' },
    { s: 'm', en: 'Well done. You handled the Home Office and the bank like an expert!', transcr: 'Уэл дан. Ю хэндлд зэ хоум офис энд зэ бэнк лайк эн экспёт!', ru: 'Молодец. Ты справился с Home Office и банком как эксперт!', uz: 'Barakalla. Siz Home Office va bank bilan ekspertdek ish tutdingiz!', tj: 'Офарин. Ту бо Home Office ва бонк мисли коршинос муомила кардӣ!', kg: 'Азаматсың. Сен Home Office жана банк менен эксперттей иш кылдың!', kz: 'Жарайсың. Сен Home Office пен банкпен сарапшыдай жұмыс істедің!' },
  ],
  quiz: [
    { q: '[COMPLETE] He said ___ my permit was valid.', opts: ['that', 'to', 'if', 'what'], c: 0, hint_ru: 'Пересказ утверждения: say + ...', hint_uz: 'Tasdiqni aytish: say + ...', hint_tj: 'Баёни тасдиқ: say + ...', hint_kg: 'Ырастоону айтуу: say + ...', hint_kz: 'Растауды жеткізу: say + ...', expl_ru: 'say (that) — для пересказа утверждения.', expl_uz: 'say (that) — tasdiqni aytish uchun.', expl_tj: 'say (that) — барои баёни тасдиқ.', expl_kg: 'say (that) — ырастоону айтуу үчүн.', expl_kz: 'say (that) — растауды жеткізу үшін.' },
    { q: '[COMPLETE] The officer told ___ to bring my passport.', opts: ['me', 'that', 'to me', 'for me'], c: 0, hint_ru: 'После tell нужен человек', hint_uz: 'tell dan keyin odam kerak', hint_tj: 'Пас аз tell одам лозим', hint_kg: 'tell дан кийин адам керек', hint_kz: 'tell кейін адам керек', expl_ru: 'tell + me (человек) + to + глагол. Say не берёт человека напрямую.', expl_uz: 'tell + me + to + fe\'l. Say odamni to\'g\'ridan-to\'g\'ri olmaydi.', expl_tj: 'tell + me + to + феъл. Say одамро мустақим намегирад.', expl_kg: 'tell + me + to + этиш. Say адамды түз албайт.', expl_kz: 'tell + me + to + етістік. Say адамды тікелей алмайды.' },
    { q: '[COMPLETE] She asked ___ I had a visa.', opts: ['if', 'that', 'to', 'what'], c: 0, hint_ru: 'Переданный да/нет вопрос', hint_uz: 'Ha/yo\'q savolini aytish', hint_tj: 'Савли ҳа/не баёншуда', hint_kg: 'Ооба/жок суроосун айтуу', hint_kz: 'Иә/жоқ сұрағын жеткізу', expl_ru: 'ask if — для да/нет вопросов в косвенной речи.', expl_uz: 'ask if — ha/yo\'q savollari uchun.', expl_tj: 'ask if — барои саволҳои ҳа/не.', expl_kg: 'ask if — ооба/жок суроолору үчүн.', expl_kz: 'ask if — иә/жоқ сұрақтары үшін.' },
    { q: '[COMPLETE] He said that my permit ___ valid.', opts: ['was', 'is', 'be', 'are'], c: 0, hint_ru: 'Сдвиг времени назад: is → ?', hint_uz: 'Zamon orqaga suriladi: is → ?', hint_tj: 'Замон ба ақиб: is → ?', hint_kg: 'Чак артка жылат: is → ?', hint_kz: 'Шақ артқа жылжиды: is → ?', expl_ru: 'В косвенной речи is становится was (backshift).', expl_uz: 'Ko\'chirma gapda is → was (backshift).', expl_tj: 'Дар нутқи ғайримустақим is → was.', expl_kg: 'Кыйыр сүйлөмдө is → was.', expl_kz: 'Жанама сөзде is → was.' },
    { q: '[TRANSLATE] Как сказать "вид на жительство" (BRP)?', opts: ['residence permit', 'driving licence', 'bank account', 'travel ticket'], c: 0, hint_ru: 'Документ, разрешающий жить в стране', hint_uz: 'Mamlakatda yashashga ruxsat beruvchi hujjat', hint_tj: 'Ҳуҷҷате, ки барои зиндагӣ дар кишвар иҷозат медиҳад', hint_kg: 'Өлкөдө жашоого уруксат берген документ', hint_kz: 'Елде тұруға рұқсат беретін құжат', expl_ru: 'residence permit (BRP) — вид на жительство.', expl_uz: 'residence permit (BRP) — yashash uchun ruxsatnoma.', expl_tj: 'residence permit (BRP) — иҷозати истиқомат.', expl_kg: 'residence permit (BRP) — жашоо уруксаты.', expl_kz: 'residence permit (BRP) — тұру рұқсаты.' },
    { q: '[COMPLETE] The bank said that they ___ verify my address.', opts: ['would', 'will', 'are', 'have'], c: 0, hint_ru: 'will → ? при сдвиге времени', hint_uz: 'will → ? backshift bilan', hint_tj: 'will → ? ҳангоми гузариш', hint_kg: 'will → ? жылышта', hint_kz: 'will → ? жылжуда', expl_ru: 'В косвенной речи will становится would.', expl_uz: 'Ko\'chirma gapda will → would.', expl_tj: 'Дар нутқи ғайримустақим will → would.', expl_kg: 'Кыйыр сүйлөмдө will → would.', expl_kz: 'Жанама сөзде will → would.' },
    { q: '[COMPLETE] She told me ___ to be late for the appointment.', opts: ['not', 'no', "don't", 'never to'], c: 0, hint_ru: 'Отрицательная команда: tell + me + ... + to', hint_uz: 'Inkor buyruq: tell + me + ... + to', hint_tj: 'Фармони манфӣ: tell + me + ... + to', hint_kg: 'Терс буйрук: tell + me + ... + to', hint_kz: 'Теріс бұйрық: tell + me + ... + to', expl_ru: 'told me not to + глагол — отрицательная просьба.', expl_uz: 'told me not to + fe\'l — inkor iltimos.', expl_tj: 'told me not to + феъл — хоҳиши манфӣ.', expl_kg: 'told me not to + этиш — терс өтүнүч.', expl_kz: 'told me not to + етістік — теріс өтініш.' },
    { q: '[TRANSLATE] Как сказать "устный переводчик"?', opts: ['interpreter', 'solicitor', 'officer', 'applicant'], c: 0, hint_ru: 'Помогает понять речь на другом языке', hint_uz: 'Boshqa tilda nutqni tushunishga yordam beradi', hint_tj: 'Барои фаҳмидани нутқ ба забони дигар кӯмак мекунад', hint_kg: 'Башка тилдеги сөздү түшүнүүгө жардам берет', hint_kz: 'Басқа тілдегі сөзді түсінуге көмектеседі', expl_ru: 'interpreter — устный переводчик; solicitor — юрист.', expl_uz: 'interpreter — tarjimon; solicitor — yurist.', expl_tj: 'interpreter — тарҷумон; solicitor — ҳуқуқшинос.', expl_kg: 'interpreter — котормочу; solicitor — юрист.', expl_kz: 'interpreter — аудармашы; solicitor — заңгер.' },
    { q: '[COMPLETE] The officer asked where I ___.', opts: ['lived', 'live', 'living', 'do live'], c: 0, hint_ru: 'Косвенный вопрос: present → past', hint_uz: 'Ko\'chirma savol: present → past', hint_tj: 'Савли ғайримустақим: present → past', hint_kg: 'Кыйыр суроо: present → past', hint_kz: 'Жанама сұрақ: present → past', expl_ru: 'В косвенном вопросе live → lived, прямой порядок слов (I lived, не did I live).', expl_uz: 'Ko\'chirma savolda live → lived, to\'g\'ri so\'z tartibi.', expl_tj: 'Дар савли ғайримустақим live → lived, тартиби рости калима.', expl_kg: 'Кыйыр суроодо live → lived, түз сөз тартиби.', expl_kz: 'Жанама сұрақта live → lived, тура сөз тәртібі.' },
    { q: '[TRANSLATE] Как сказать "продлить визу"?', opts: ['to renew the visa', 'to reject the visa', 'to refuse the visa', 'to lose the visa'], c: 0, hint_ru: 'Сделать визу действительной дольше', hint_uz: 'Vizani uzoqroq amalda qilish', hint_tj: 'Визаро дарозтар эътибор додан', hint_kg: 'Визаны узагыраак жарактуу кылуу', hint_kz: 'Визаны ұзағырақ жарамды ету', expl_ru: '"renew" — продлевать; reject/refuse — отклонять/отказывать.', expl_uz: '"renew" — yangilamoq; reject — rad qilmoq.', expl_tj: '"renew" — нав кардан; reject — рад кардан.', expl_kg: '"renew" — жаңыртуу; reject — четке кагуу.', expl_kz: '"renew" — жаңарту; reject — қабылдамау.' },
  ],
};

// ── validation (dry run) ───────────────────────────────────────────────────
const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];
const a1 = require('./lessons_data.js'), a2 = require('./lessons_data_a2.js'), b1 = require('./lessons_data_b1.js');
const used = new Map();
[['a1', a1], ['a2', a2], ['b1', b1]].forEach(([c, C]) => C.forEach(l => l.words.forEach(w => used.set(w.en.trim().toLowerCase(), c + ' L' + l.id))));

const LESSON = L12;
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

const ALLOW = new Set(('a an the this that these those some any all and or but if so as to of in on at for with by from i you he she it we they me him her us them my your his its our their is am are was were be been being do does did have has had will would can could should not no yes very too also just now here there then what where when who which why how about into over under up down out off back well good thank thanks please sorry hello okay ok since for ever never long more most than new before after already because old still year one two free late bit worried news everything almost address letter handled expert like problem').split(/\s+/));
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
  console.log('\n✅ APPLIED: L12 injected into b1.html (string-aware).');
}
