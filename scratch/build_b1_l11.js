/**
 * build_b1_l11.js — author B1 Lesson 11 "Жильё и аренда".
 * Grammar: Relative clauses (who / which / that / where / whose).
 *   The 3 "form" groups hold the pronoun families: people / things / place+possession.
 * Module 5 (Money & Rights). Dialogue: m (landlord/agent) / w (worker-tenant).
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

const L11 = {
  id: 11,
  mod: 5,
  name_ru: 'Жильё и аренда',
  name_uz: 'Uy-joy va ijara',
  name_tj: 'Манзил ва иҷора',
  name_kg: 'Турак-жай жана ижара',
  name_kz: 'Тұрғын үй және жалдау',
  cefr: 'Relative clauses (who / which / that / where / whose)',
  grammar: {
    title_ru: 'RELATIVE CLAUSES — who / which / that / where / whose',
    title_uz: 'RELATIVE CLAUSES — who / which / that / where / whose',
    title_tj: 'RELATIVE CLAUSES — who / which / that / where / whose',
    title_kg: 'RELATIVE CLAUSES — who / which / that / where / whose',
    title_kz: 'RELATIVE CLAUSES — who / which / that / where / whose',
    intro_ru: '<div style="line-height:1.6">Придаточные с <b>относительными местоимениями</b> соединяют два предложения и уточняют, о ком/чём речь.<br>👤 <b>who / that</b> — о людях: <i>the landlord <b>who</b> fixes the boiler</i><br>📦 <b>which / that</b> — о вещах: <i>the flat <b>which</b> is furnished</i><br>📍 <b>where</b> — о месте: <i>the room <b>where</b> I sleep</i><br>🔑 <b>whose</b> — принадлежность: <i>the tenant <b>whose</b> deposit was returned</i></div>',
    intro_uz: '<div style="line-height:1.6"><b>Nisbiy olmoshlar</b> ikki gapni bog\'laydi va kim/nima haqida ekanini aniqlaydi.<br>👤 <b>who / that</b> — odamlar: <i>the landlord who fixes the boiler</i><br>📦 <b>which / that</b> — narsalar: <i>the flat which is furnished</i><br>📍 <b>where</b> — joy: <i>the room where I sleep</i><br>🔑 <b>whose</b> — egalik: <i>the tenant whose deposit was returned</i></div>',
    intro_tj: '<div style="line-height:1.6"><b>Ҷонишинҳои нисбӣ</b> ду ҷумларо мепайванданд ва дар бораи кӣ/чӣ будани сухан мефаҳмонанд.<br>👤 <b>who / that</b> — одамон: <i>the landlord who fixes the boiler</i><br>📦 <b>which / that</b> — ашё: <i>the flat which is furnished</i><br>📍 <b>where</b> — ҷой: <i>the room where I sleep</i><br>🔑 <b>whose</b> — таалуқият: <i>the tenant whose deposit was returned</i></div>',
    intro_kg: '<div style="line-height:1.6"><b>Катыштык ат атоочтор</b> эки сүйлөмдү байланыштырат жана ким/эмне жөнүндө экенин тактайт.<br>👤 <b>who / that</b> — адамдар: <i>the landlord who fixes the boiler</i><br>📦 <b>which / that</b> — нерселер: <i>the flat which is furnished</i><br>📍 <b>where</b> — жер: <i>the room where I sleep</i><br>🔑 <b>whose</b> — таандыктык: <i>the tenant whose deposit was returned</i></div>',
    intro_kz: '<div style="line-height:1.6"><b>Қатыстық есімдіктер</b> екі сөйлемді байланыстырып, кім/не туралы екенін нақтылайды.<br>👤 <b>who / that</b> — адамдар: <i>the landlord who fixes the boiler</i><br>📦 <b>which / that</b> — заттар: <i>the flat which is furnished</i><br>📍 <b>where</b> — орын: <i>the room where I sleep</i><br>🔑 <b>whose</b> — тиесілік: <i>the tenant whose deposit was returned</i></div>',
    cultural_ru: 'При аренде в Великобритании вам дают tenancy agreement (договор аренды) и обычно берут deposit (залог), который по закону хранится в государственной схеме защиты и возвращается, если жильё не повреждено. Landlord обязан чинить boiler, отопление и устранять damp/mould. Перед въездом проверьте inventory (опись) и сфотографируйте состояние комнат.',
    cultural_uz: 'Buyuk Britaniyada ijaraga olganda sizga tenancy agreement beriladi va odatda deposit olinadi; u qonun bo\'yicha himoya sxemasida saqlanadi va uy buzilmagan bo\'lsa qaytariladi. Landlord boiler va isitishni tuzatishi shart.',
    cultural_tj: 'Дар Британияи Кабир ҳангоми иҷора ба шумо tenancy agreement медиҳанд ва одатан deposit мегиранд; он тибқи қонун дар нақшаи ҳифз нигоҳ дошта мешавад ва агар манзил вайрон нашуда бошад, баргардонида мешавад.',
    cultural_kg: 'Улуу Британияда ижарага алганда сизге tenancy agreement берилет жана адатта deposit алынат; ал мыйзам боюнча коргоо схемасында сакталат жана үй бузулбаса кайтарылат.',
    cultural_kz: 'Ұлыбританияда жалдағанда сізге tenancy agreement беріледі және әдетте deposit алынады; ол заң бойынша қорғау схемасында сақталып, үй бүлінбесе қайтарылады.',
    note_ru: '⚠️ who — о людях, which — о вещах. That можно использовать вместо обоих. Where — только о месте (the house where...), не путайте с which!',
    note_uz: '⚠️ who — odamlar, which — narsalar. That ikkalasi o\'rniga ishlatiladi. Where — faqat joy uchun, which bilan adashtirmang!',
    note_tj: '⚠️ who — одамон, which — ашё. That ба ҷои ҳардуи онҳо меояд. Where — танҳо барои ҷой, бо which иштибоҳ накунед!',
    note_kg: '⚠️ who — адамдар, which — нерселер. That экөөнүн ордуна колдонулат. Where — жер үчүн гана, which менен чаташтырбаңыз!',
    note_kz: '⚠️ who — адамдар, which — заттар. That екеуінің орнына қолданылады. Where — тек орын үшін, which-пен шатастырмаңыз!',
    forms: {
      positive: {
        label_ru: '👤 WHO / THAT — о людях', label_uz: '👤 WHO / THAT — odamlar', label_tj: '👤 WHO / THAT — одамон', label_kg: '👤 WHO / THAT — адамдар', label_kz: '👤 WHO / THAT — адамдар',
        rule_ru: grid([
          ['the landlord who...', 'зэ лэндлод ху', 'хозяин, который...'],
          ['the plumber that...', 'зэ пламэ зэт', 'сантехник, который...'],
          ['the tenant who pays', 'зэ тэнэнт ху пэйз', 'жилец, который платит'],
          ['the man that called', 'зэ мэн зэт колд', 'человек, который звонил'],
        ]),
        rule_uz: grid([
          ['the landlord who...', 'зэ лэндлод ху', 'uy egasi, ...'],
          ['the plumber that...', 'зэ пламэ зэт', 'santexnik, ...'],
          ['the tenant who pays', 'зэ тэнэнт ху пэйз', 'to\'laydigan ijarachi'],
          ['the man that called', 'зэ мэн зэт колд', 'qo\'ng\'iroq qilgan odam'],
        ]),
        rule_tj: grid([
          ['the landlord who...', 'зэ лэндлод ху', 'соҳибхона, ки...'],
          ['the plumber that...', 'зэ пламэ зэт', 'обкаш, ки...'],
          ['the tenant who pays', 'зэ тэнэнт ху пэйз', 'иҷоранишине, ки медиҳад'],
          ['the man that called', 'зэ мэн зэт колд', 'марде, ки занг зад'],
        ]),
        rule_kg: grid([
          ['the landlord who...', 'зэ лэндлод ху', 'үй ээси, ...'],
          ['the plumber that...', 'зэ пламэ зэт', 'сантехник, ...'],
          ['the tenant who pays', 'зэ тэнэнт ху пэйз', 'төлөгөн ижарачы'],
          ['the man that called', 'зэ мэн зэт колд', 'чалган киши'],
        ]),
        rule_kz: grid([
          ['the landlord who...', 'зэ лэндлод ху', 'үй иесі, ...'],
          ['the plumber that...', 'зэ пламэ зэт', 'сантехник, ...'],
          ['the tenant who pays', 'зэ тэнэнт ху пэйз', 'төлейтін жалдаушы'],
          ['the man that called', 'зэ мэн зэт колд', 'қоңырау шалған адам'],
        ]),
        table: [
          { subj: 'who', verb: '(people)', example: 'The landlord who owns this house lives nearby.', transcr: 'Зэ лэндлод ху оунз зис хаус ливз ниэбай', tr_ru: 'Хозяин, который владеет этим домом, живёт рядом.', tr_uz: 'Bu uyga egalik qiladigan uy egasi yaqin atrofda yashaydi.', tr_tj: 'Соҳибхонае, ки ин хонаро дорад, дар наздикӣ зиндагӣ мекунад.', tr_kg: 'Бул үйгө ээлик кылган үй ээси жакын жерде жашайт.', tr_kz: 'Осы үйдің иесі болатын үй иесі жақын маңда тұрады.' },
          { subj: 'that', verb: '(people)', example: 'The plumber that fixed the leak was very quick.', transcr: 'Зэ пламэ зэт фикст зэ лик уоз вэри куик', tr_ru: 'Сантехник, который починил протечку, был очень быстрым.', tr_uz: 'Suv oqishini tuzatgan santexnik juda tez edi.', tr_tj: 'Обкаше, ки таровишро дуруст кард, хеле тез буд.', tr_kg: 'Суу агуусун оңдогон сантехник абдан тез болду.', tr_kz: 'Су ағуын жөндеген сантехник өте жылдам болды.' },
          { subj: 'who', verb: '(people)', example: 'The tenant who pays rent on time gets the deposit back.', transcr: 'Зэ тэнэнт ху пэйз рэнт он тайм гетс зэ дипозит бэк', tr_ru: 'Жилец, который платит аренду вовремя, получает залог обратно.', tr_uz: 'Ijarani o\'z vaqtida to\'laydigan ijarachi depozitni qaytarib oladi.', tr_tj: 'Иҷоранишине, ки иҷораро саривақт медиҳад, депозитро бармегардонад.', tr_kg: 'Ижараны өз убагында төлөгөн ижарачы депозитти кайтарып алат.', tr_kz: 'Жалдау ақысын уақытында төлейтін жалдаушы депозитті қайтарып алады.' },
          { subj: 'who', verb: '(people)', example: 'The neighbour who lives upstairs reported the leak.', transcr: 'Зэ нэйбэ ху ливз апстеэз рипотид зэ лик', tr_ru: 'Сосед, который живёт наверху, сообщил о протечке.', tr_uz: 'Tepada yashaydigan qo\'shni suv oqishini xabar qildi.', tr_tj: 'Ҳамсояе, ки дар боло зиндагӣ мекунад, дар бораи таровиш хабар дод.', tr_kg: 'Жогорку кабатта жашаган кошуна суу агуу жөнүндө билдирди.', tr_kz: 'Жоғарғы қабатта тұратын көрші су ағу туралы хабарлады.' },
        ],
      },
      negative: {
        label_ru: '📦 WHICH / THAT — о вещах', label_uz: '📦 WHICH / THAT — narsalar', label_tj: '📦 WHICH / THAT — ашё', label_kg: '📦 WHICH / THAT — нерселер', label_kz: '📦 WHICH / THAT — заттар',
        rule_ru: grid([
          ['the flat which...', 'зэ флэт уич', 'квартира, которая...'],
          ['the boiler that...', 'зэ бойлэ зэт', 'котёл, который...'],
          ['the room which is warm', 'зэ рум уич из уом', 'комната, которая тёплая'],
          ['the bills that came', 'зэ билз зэт кейм', 'счета, которые пришли'],
        ]),
        rule_uz: grid([
          ['the flat which...', 'зэ флэт уич', 'kvartira, ...'],
          ['the boiler that...', 'зэ бойлэ зэт', 'qozon, ...'],
          ['the room which is warm', 'зэ рум уич из уом', 'issiq xona'],
          ['the bills that came', 'зэ билз зэт кейм', 'kelgan hisoblar'],
        ]),
        rule_tj: grid([
          ['the flat which...', 'зэ флэт уич', 'хонае, ки...'],
          ['the boiler that...', 'зэ бойлэ зэт', 'дегдоне, ки...'],
          ['the room which is warm', 'зэ рум уич из уом', 'хонаи гарм'],
          ['the bills that came', 'зэ билз зэт кейм', 'ҳисобҳое, ки омаданд'],
        ]),
        rule_kg: grid([
          ['the flat which...', 'зэ флэт уич', 'батир, ...'],
          ['the boiler that...', 'зэ бойлэ зэт', 'казан, ...'],
          ['the room which is warm', 'зэ рум уич из уом', 'жылуу бөлмө'],
          ['the bills that came', 'зэ билз зэт кейм', 'келген эсептер'],
        ]),
        rule_kz: grid([
          ['the flat which...', 'зэ флэт уич', 'пәтер, ...'],
          ['the boiler that...', 'зэ бойлэ зэт', 'қазан, ...'],
          ['the room which is warm', 'зэ рум уич из уом', 'жылы бөлме'],
          ['the bills that came', 'зэ билз зэт кейм', 'келген шоттар'],
        ]),
        table: [
          { subj: 'which', verb: '(things)', example: 'The flat which is furnished costs more per month.', transcr: 'Зэ флэт уич из фёништ костс мо пё манс', tr_ru: 'Квартира, которая с мебелью, стоит дороже в месяц.', tr_uz: 'Mebellangan kvartira oyiga ko\'proq turadi.', tr_tj: 'Хонае, ки бо мебел аст, дар як моҳ гаронтар меарзад.', tr_kg: 'Эмеректүү батир айына кымбатыраак турат.', tr_kz: 'Жиһазды пәтер айына қымбатырақ тұрады.' },
          { subj: 'that', verb: '(things)', example: 'The boiler that broke last week is fixed now.', transcr: 'Зэ бойлэ зэт броук ласт уик из фикст нау', tr_ru: 'Котёл, который сломался на прошлой неделе, теперь починен.', tr_uz: 'O\'tgan hafta buzilgan qozon endi tuzatildi.', tr_tj: 'Дегдоне, ки ҳафтаи гузашта вайрон шуд, ҳоло дуруст карда шуд.', tr_kg: 'Өткөн жума бузулган казан азыр оңдолду.', tr_kz: 'Өткен апта бұзылған қазан қазір жөнделді.' },
          { subj: 'which', verb: '(things)', example: 'The bills which arrived include the council tax.', transcr: 'Зэ билз уич эрайвд инклуд зэ каунсл тэкс', tr_ru: 'Счета, которые пришли, включают муниципальный налог.', tr_uz: 'Kelgan hisoblar council tax\'ni o\'z ichiga oladi.', tr_tj: 'Ҳисобҳое, ки омаданд, андози муниципалиро дар бар мегиранд.', tr_kg: 'Келген эсептер муниципалдык салыкты камтыйт.', tr_kz: 'Келген шоттар муниципалдық салықты қамтиды.' },
        ],
      },
      question: {
        label_ru: '📍 WHERE / 🔑 WHOSE — место / принадлежность', label_uz: '📍 WHERE / 🔑 WHOSE — joy / egalik', label_tj: '📍 WHERE / 🔑 WHOSE — ҷой / таалуқият', label_kg: '📍 WHERE / 🔑 WHOSE — жер / таандыктык', label_kz: '📍 WHERE / 🔑 WHOSE — орын / тиесілік',
        rule_ru: grid([
          ['the room where I sleep', 'зэ рум уэа ай слип', 'комната, где я сплю'],
          ['the house where we live', 'зэ хаус уэа уи лив', 'дом, где мы живём'],
          ['the tenant whose key...', 'зэ тэнэнт хуз ки', 'жилец, чей ключ...'],
          ['the man whose flat...', 'зэ мэн хуз флэт', 'человек, чья квартира...'],
        ]),
        rule_uz: grid([
          ['the room where I sleep', 'зэ рум уэа ай слип', 'men uxlaydigan xona'],
          ['the house where we live', 'зэ хаус уэа уи лив', 'biz yashaydigan uy'],
          ['the tenant whose key...', 'зэ тэнэнт хуз ки', 'kaliti ... ijarachi'],
          ['the man whose flat...', 'зэ мэн хуз флэт', 'kvartirasi ... odam'],
        ]),
        rule_tj: grid([
          ['the room where I sleep', 'зэ рум уэа ай слип', 'хонае, ки ман мехобам'],
          ['the house where we live', 'зэ хаус уэа уи лив', 'хонае, ки мо зиндагӣ мекунем'],
          ['the tenant whose key...', 'зэ тэнэнт хуз ки', 'иҷоранишине, ки калиди вай...'],
          ['the man whose flat...', 'зэ мэн хуз флэт', 'марде, ки хонаи вай...'],
        ]),
        rule_kg: grid([
          ['the room where I sleep', 'зэ рум уэа ай слип', 'мен уктаган бөлмө'],
          ['the house where we live', 'зэ хаус уэа уи лив', 'биз жашаган үй'],
          ['the tenant whose key...', 'зэ тэнэнт хуз ки', 'ачкычы ... ижарачы'],
          ['the man whose flat...', 'зэ мэн хуз флэт', 'батири ... киши'],
        ]),
        rule_kz: grid([
          ['the room where I sleep', 'зэ рум уэа ай слип', 'мен ұйықтайтын бөлме'],
          ['the house where we live', 'зэ хаус уэа уи лив', 'біз тұратын үй'],
          ['the tenant whose key...', 'зэ тэнэнт хуз ки', 'кілті ... жалдаушы'],
          ['the man whose flat...', 'зэ мэн хуз флэт', 'пәтері ... адам'],
        ]),
        table: [
          { subj: 'where', verb: '(place)', example: 'This is the room where I sleep and keep my things.', transcr: 'Зис из зэ рум уэа ай слип энд кип май сингз', tr_ru: 'Это комната, где я сплю и храню свои вещи.', tr_uz: 'Bu men uxlaydigan va narsalarimni saqlaydigan xona.', tr_tj: 'Ин хонаест, ки ман дар он мехобам ва ашёямро нигоҳ медорам.', tr_kg: 'Бул мен уктаган жана буюмдарымды сактаган бөлмө.', tr_kz: 'Бұл мен ұйықтайтын және заттарымды сақтайтын бөлме.' },
          { subj: 'where', verb: '(place)', example: 'The house where we live has a communal kitchen.', transcr: 'Зэ хаус уэа уи лив хэз э кэмьюнл китчэн', tr_ru: 'В доме, где мы живём, есть общая кухня.', tr_uz: 'Biz yashaydigan uyda umumiy oshxona bor.', tr_tj: 'Дар хонае, ки мо зиндагӣ мекунем, ошхонаи умумӣ ҳаст.', tr_kg: 'Биз жашаган үйдө жалпы ашкана бар.', tr_kz: 'Біз тұратын үйде ортақ ас үй бар.' },
          { subj: 'whose', verb: '(possession)', example: 'The tenant whose deposit was returned was very happy.', transcr: 'Зэ тэнэнт хуз дипозит уоз ритёнд уоз вэри хэпи', tr_ru: 'Жилец, чей залог вернули, был очень рад.', tr_uz: 'Depoziti qaytarilgan ijarachi juda xursand edi.', tr_tj: 'Иҷоранишине, ки депозиташ баргардонида шуд, хеле хушҳол буд.', tr_kg: 'Депозити кайтарылган ижарачы абдан кубанычтуу болду.', tr_kz: 'Депозиті қайтарылған жалдаушы өте қуанышты болды.' },
        ],
      },
    },
  },
  words: [
    { e: '🧑‍💼', en: 'landlord', pn: '/ˈlændlɔːd/', transcr: 'лэндлод', ru: 'арендодатель (хозяин жилья)', uz: 'uy egasi', tj: 'соҳибхона', kg: 'үй ээси', kz: 'үй иесі' },
    { e: '🧳', en: 'tenant', pn: '/ˈtenənt/', transcr: 'тэнэнт', ru: 'квартиросъёмщик', uz: 'ijarachi', tj: 'иҷоранишин', kg: 'ижарачы', kz: 'жалдаушы' },
    { e: '💷', en: 'deposit', pn: '/dɪˈpɒzɪt/', transcr: 'дипозит', ru: 'залог (депозит)', uz: 'depozit (zalog)', tj: 'депозит (гарав)', kg: 'депозит (күрөө)', kz: 'депозит (кепіл)' },
    { e: '🏠', en: 'rent', pn: '/rent/', transcr: 'рэнт', ru: 'аренда (плата)', uz: 'ijara haqi', tj: 'иҷора (ҳаққи иҷора)', kg: 'ижара акысы', kz: 'жалдау ақысы' },
    { e: '📃', en: 'lease', pn: '/liːs/', transcr: 'лис', ru: 'договор аренды (срок)', uz: 'ijara shartnomasi', tj: 'шартномаи иҷора', kg: 'ижара келишими', kz: 'жалдау келісімі' },
    { e: '📑', en: 'tenancy', pn: '/ˈtenənsi/', transcr: 'тэнэнси', ru: 'аренда жилья (наём)', uz: 'ijaraga olish', tj: 'иҷорадорӣ', kg: 'ижарага алуу', kz: 'жалға алу' },
    { e: '🏢', en: 'estate agent', pn: '/ɪˈsteɪt eɪdʒənt/', transcr: 'истэйт эйджэнт', ru: 'агент по недвижимости', uz: 'ko\'chmas mulk agenti', tj: 'агенти амволи ғайриманқул', kg: 'кыймылсыз мүлк агенти', kz: 'жылжымайтын мүлік агенті' },
    { e: '🛋️', en: 'furnished', pn: '/ˈfɜːnɪʃt/', transcr: 'фёништ', ru: 'с мебелью', uz: 'mebellangan', tj: 'бо мебел', kg: 'эмеректүү', kz: 'жиһазды' },
    { e: '📦', en: 'unfurnished', pn: '/ʌnˈfɜːnɪʃt/', transcr: 'анфёништ', ru: 'без мебели', uz: 'mebelsiz', tj: 'бе мебел', kg: 'эмерексиз', kz: 'жиһазсыз' },
    { e: '🧾', en: 'bills', pn: '/bɪlz/', transcr: 'билз', ru: 'счета (за услуги)', uz: 'hisoblar (kommunal)', tj: 'ҳисобҳо (коммуналӣ)', kg: 'эсептер (коммуналдык)', kz: 'шоттар (коммуналдық)' },
    { e: '🏛️', en: 'council tax', pn: '/ˈkaʊnsl tæks/', transcr: 'каунсл тэкс', ru: 'муниципальный налог', uz: 'munitsipal soliq', tj: 'андози муниципалӣ', kg: 'муниципалдык салык', kz: 'муниципалдық салық' },
    { e: '💡', en: 'utilities', pn: '/juːˈtɪlətiz/', transcr: 'ютилитиз', ru: 'коммунальные услуги', uz: 'kommunal xizmatlar', tj: 'хизматрасонии коммуналӣ', kg: 'коммуналдык кызматтар', kz: 'коммуналдық қызметтер' },
    { e: '🦠', en: 'mould', pn: '/məʊld/', transcr: 'моулд', ru: 'плесень', uz: 'mog\'or', tj: 'кабудӣ (моғор)', kg: 'көгөрүү', kz: 'көгеру (зең)' },
    { e: '💧', en: 'damp', pn: '/dæmp/', transcr: 'дэмп', ru: 'сырость', uz: 'namlik', tj: 'нам', kg: 'нымдуулук', kz: 'дымқыл' },
    { e: '🚰', en: 'leak', pn: '/liːk/', transcr: 'лик', ru: 'протечка (течь)', uz: 'suv oqishi', tj: 'таровиш', kg: 'суу агуу', kz: 'су ағу' },
    { e: '🔧', en: 'plumber', pn: '/ˈplʌmə/', transcr: 'пламэ', ru: 'сантехник', uz: 'santexnik', tj: 'обкаш (сантехник)', kg: 'сантехник', kz: 'сантехник' },
    { e: '⚡', en: 'electrician', pn: '/ɪlekˈtrɪʃn/', transcr: 'илектришн', ru: 'электрик', uz: 'elektrik', tj: 'барқчӣ (электрик)', kg: 'электрик', kz: 'электрик' },
    { e: '🛠️', en: 'maintenance', pn: '/ˈmeɪntənəns/', transcr: 'мэйнтэнэнс', ru: 'обслуживание (ремонт)', uz: 'texnik xizmat', tj: 'нигоҳдорӣ (таъмир)', kg: 'тейлөө (оңдоо)', kz: 'техникалық қызмет' },
    { e: '⬆️', en: 'upstairs', pn: '/ʌpˈsteəz/', transcr: 'апстеэз', ru: 'наверху (этажом выше)', uz: 'tepada (yuqori qavat)', tj: 'боло (ошёнаи боло)', kg: 'жогорку кабат', kz: 'жоғарғы қабат' },
    { e: '⬇️', en: 'downstairs', pn: '/daʊnˈsteəz/', transcr: 'даунстеэз', ru: 'внизу (этажом ниже)', uz: 'pastda (quyi qavat)', tj: 'поён (ошёнаи поён)', kg: 'төмөнкү кабат', kz: 'төменгі қабат' },
    { e: '🚪', en: 'hallway', pn: '/ˈhɔːlweɪ/', transcr: 'холуэй', ru: 'прихожая (коридор)', uz: 'yo\'lak (dahliz)', tj: 'даҳлез', kg: 'коридор (далис)', kz: 'дәліз' },
    { e: '🔝', en: 'ceiling', pn: '/ˈsiːlɪŋ/', transcr: 'силин', ru: 'потолок', uz: 'shift', tj: 'шифт', kg: 'шыпы', kz: 'төбе (шатыр)' },
    { e: '♨️', en: 'radiator', pn: '/ˈreɪdieɪtə/', transcr: 'рэйдиэйтэ', ru: 'батарея (отопления)', uz: 'radiator', tj: 'радиатор (гармкунак)', kg: 'радиатор', kz: 'радиатор' },
    { e: '🔥', en: 'boiler', pn: '/ˈbɔɪlə/', transcr: 'бойлэ', ru: 'котёл (бойлер)', uz: 'qozon (boyler)', tj: 'дегдон (бойлер)', kg: 'казан (бойлер)', kz: 'қазан (бойлер)' },
    { e: '🚨', en: 'smoke alarm', pn: '/sməʊk əˈlɑːm/', transcr: 'смоук эларм', ru: 'пожарная сигнализация', uz: 'tutun signalizatsiyasi', tj: 'аломати дуд', kg: 'түтүн дабылы', kz: 'түтін дабылы' },
    { e: '📋', en: 'inventory', pn: '/ˈɪnvəntri/', transcr: 'инвэнтри', ru: 'опись (имущества)', uz: 'ro\'yxat (inventar)', tj: 'рӯйхати амвол', kg: 'мүлк тизмеси', kz: 'мүлік тізімі' },
    { e: '👀', en: 'viewing', pn: '/ˈvjuːɪŋ/', transcr: 'вьюин', ru: 'просмотр (жилья)', uz: 'ko\'rib chiqish', tj: 'тамошо (дидани манзил)', kg: 'көрүү (карап чыгуу)', kz: 'қарап шығу' },
    { e: '📤', en: 'eviction', pn: '/ɪˈvɪkʃn/', transcr: 'ивикшн', ru: 'выселение', uz: 'uydan chiqarish', tj: 'аз хона бароварданӣ', kg: 'үйдөн чыгаруу', kz: 'үйден шығару' },
    { e: '👥', en: 'communal', pn: '/kəˈmjuːnl/', transcr: 'кэмьюнл', ru: 'общий (совместный)', uz: 'umumiy', tj: 'умумӣ', kg: 'жалпы (орток)', kz: 'ортақ' },
    { e: '🏦', en: 'mortgage', pn: '/ˈmɔːɡɪdʒ/', transcr: 'могидж', ru: 'ипотека', uz: 'ipoteka', tj: 'ипотека', kg: 'ипотека', kz: 'ипотека' },
  ],
  dialogue: [
    { s: 'm', en: 'Hello. This is the room which is free now. Would you like a viewing?', transcr: 'Хэлоу. Зис из зэ рум уич из фри нау. Вуд ю лайк э вьюин?', ru: 'Здравствуйте. Это комната, которая свободна сейчас. Хотите осмотреть?', uz: 'Salom. Bu hozir bo\'sh bo\'lgan xona. Ko\'rib chiqmoqchimisiz?', tj: 'Салом. Ин хонаест, ки ҳоло холӣ аст. Мехоҳед тамошо кунед?', kg: 'Саламатсызбы. Бул азыр бош болгон бөлмө. Карап чыккыңыз келеби?', kz: 'Сәлеметсіз бе. Бұл қазір бос бөлме. Қарап шыққыңыз келе ме?' },
    { s: 'w', en: 'Yes, please. Is it the flat which has a communal kitchen?', transcr: 'Йес, плиз. Из ит зэ флэт уич хэз э кэмьюнл китчэн?', ru: 'Да, пожалуйста. Это та квартира, у которой общая кухня?', uz: 'Ha, iltimos. Bu umumiy oshxonasi bor kvartirami?', tj: 'Бале, лутфан. Ин хонаест, ки ошхонаи умумӣ дорад?', kg: 'Ооба, сураныч. Бул жалпы ашканасы бар батирби?', kz: 'Иә, өтінемін. Бұл ортақ ас үйі бар пәтер ме?' },
    { s: 'm', en: 'Yes. The landlord who owns it lives nearby and fixes problems fast.', transcr: 'Йес. Зэ лэндлод ху оунз ит ливз ниэбай энд фиксиз проблэмз фаст.', ru: 'Да. Хозяин, который им владеет, живёт рядом и быстро решает проблемы.', uz: 'Ha. Unga egalik qiladigan uy egasi yaqinda yashaydi va muammolarni tez hal qiladi.', tj: 'Бале. Соҳибхонае, ки онро дорад, дар наздикӣ зиндагӣ мекунад ва мушкилотро зуд ҳал мекунад.', kg: 'Ооба. Ага ээлик кылган үй ээси жакын жашайт жана көйгөйлөрдү тез чечет.', kz: 'Иә. Оған иелік ететін үй иесі жақын тұрады және мәселелерді тез шешеді.' },
    { s: 'w', en: 'Good. Is the room where I sleep furnished, or do I bring a bed?', transcr: 'Гуд. Из зэ рум уэа ай слип фёништ, о ду ай брин э бэд?', ru: 'Хорошо. Комната, где я сплю, с мебелью, или мне приносить кровать?', uz: 'Yaxshi. Men uxlaydigan xona mebellanganmi yoki karavot olib kelaymi?', tj: 'Хуб. Хонае, ки ман мехобам, бо мебел аст ё ман кат биёрам?', kg: 'Жакшы. Мен уктаган бөлмө эмеректүүбү же мен керебет алып келейинби?', kz: 'Жақсы. Мен ұйықтайтын бөлме жиһазды ма, әлде төсек әкелейін бе?' },
    { s: 'm', en: 'It is furnished. The bills which you pay include gas, water and council tax.', transcr: 'Ит из фёништ. Зэ билз уич ю пэй инклуд гэс, уотэ энд каунсл тэкс.', ru: 'Она с мебелью. Счета, которые вы платите, включают газ, воду и муниципальный налог.', uz: 'U mebellangan. Siz to\'laydigan hisoblar gaz, suv va council tax\'ni o\'z ichiga oladi.', tj: 'Он бо мебел аст. Ҳисобҳое, ки шумо медиҳед, газ, об ва андози муниципалиро дар бар мегиранд.', kg: 'Ал эмеректүү. Сиз төлөгөн эсептер газды, сууну жана муниципалдык салыкты камтыйт.', kz: 'Ол жиһазды. Сіз төлейтін шоттар газды, суды және муниципалдық салықты қамтиды.' },
    { s: 'w', en: 'How much is the deposit, and when is it returned?', transcr: 'Хау мач из зэ дипозит, энд уэн из ит ритёнд?', ru: 'Сколько залог и когда его возвращают?', uz: 'Depozit qancha va u qachon qaytariladi?', tj: 'Депозит чанд аст ва кай баргардонида мешавад?', kg: 'Депозит канча жана ал качан кайтарылат?', kz: 'Депозит қанша және ол қашан қайтарылады?' },
    { s: 'm', en: 'One month. The tenant whose room is clean always gets the deposit back.', transcr: 'Уан манс. Зэ тэнэнт хуз рум из клин олуэйз гетс зэ дипозит бэк.', ru: 'Один месяц. Жилец, чья комната чистая, всегда получает залог обратно.', uz: 'Bir oy. Xonasi toza bo\'lgan ijarachi har doim depozitni qaytarib oladi.', tj: 'Як моҳ. Иҷоранишине, ки хонааш тоза аст, ҳамеша депозитро бармегардонад.', kg: 'Бир ай. Бөлмөсү таза ижарачы ар дайым депозитти кайтарып алат.', kz: 'Бір ай. Бөлмесі таза жалдаушы әрқашан депозитті қайтарып алады.' },
    { s: 'w', en: 'Is there damp or mould? In my last place the ceiling had a leak.', transcr: 'Из зэа дэмп о моулд? Ин май ласт плэйс зэ силин хэд э лик.', ru: 'Есть ли сырость или плесень? В моём прошлом жилье на потолке была протечка.', uz: 'Namlik yoki mog\'or bormi? Oldingi joyimda shiftda suv oqishi bor edi.', tj: 'Нам ё моғор ҳаст? Дар ҷои пешини ман шифт таровиш дошт.', kg: 'Нымдуулук же көгөрүү барбы? Менин мурунку жайымда шыпта суу агуу бар эле.', kz: 'Дымқыл немесе көгеру бар ма? Менің алдыңғы жерімде төбеде су ағу болды.' },
    { s: 'm', en: 'No damp here. The plumber who works for us checks the boiler every year.', transcr: 'Ноу дэмп хиэ. Зэ пламэ ху уёкс фо ас чекс зэ бойлэ эври йиэ.', ru: 'Здесь нет сырости. Сантехник, который работает на нас, проверяет котёл каждый год.', uz: 'Bu yerda namlik yo\'q. Biz uchun ishlaydigan santexnik har yili qozonni tekshiradi.', tj: 'Дар ин ҷо нам нест. Обкаше, ки барои мо кор мекунад, ҳар сол дегдонро месанҷад.', kg: 'Бул жерде нымдуулук жок. Биз үчүн иштеген сантехник ар жылы казанды текшерет.', kz: 'Мұнда дымқыл жоқ. Біз үшін жұмыс істейтін сантехник қазанды жыл сайын тексереді.' },
    { s: 'w', en: 'Great. I will sign the lease which you sent and pay the deposit today.', transcr: 'Грэйт. Ай уил сайн зэ лис уич ю сэнт энд пэй зэ дипозит тудэй.', ru: 'Отлично. Я подпишу договор аренды, который вы прислали, и заплачу залог сегодня.', uz: 'Ajoyib. Siz yuborgan ijara shartnomasini imzolab, depozitni bugun to\'layman.', tj: 'Аъло. Ман шартномаи иҷораеро, ки шумо фиристодед, имзо мекунам ва депозитро имрӯз медиҳам.', kg: 'Эң сонун. Сиз жөнөткөн ижара келишимине кол коюп, депозитти бүгүн төлөйм.', kz: 'Тамаша. Сіз жіберген жалдау келісіміне қол қойып, депозитті бүгін төлеймін.' },
  ],
  quiz: [
    { q: '[COMPLETE] The landlord ___ owns this house lives nearby.', opts: ['who', 'which', 'where', 'whose'], c: 0, hint_ru: 'Относительное местоимение для ЛЮДЕЙ', hint_uz: 'ODAMLAR uchun nisbiy olmosh', hint_tj: 'Ҷонишини нисбӣ барои ОДАМОН', hint_kg: 'АДАМДАР үчүн катыштык ат атооч', hint_kz: 'АДАМДАР үшін қатыстық есімдік', expl_ru: 'who — для людей (landlord — человек).', expl_uz: 'who — odamlar uchun (landlord — odam).', expl_tj: 'who — барои одамон (landlord — одам).', expl_kg: 'who — адамдар үчүн (landlord — адам).', expl_kz: 'who — адамдар үшін (landlord — адам).' },
    { q: '[COMPLETE] The flat ___ is furnished costs more per month.', opts: ['which', 'who', 'whose', 'when'], c: 0, hint_ru: 'Относительное местоимение для ВЕЩЕЙ', hint_uz: 'NARSALAR uchun nisbiy olmosh', hint_tj: 'Ҷонишини нисбӣ барои АШЁ', hint_kg: 'НЕРСЕЛЕР үчүн катыштык ат атооч', hint_kz: 'ЗАТТАР үшін қатыстық есімдік', expl_ru: 'which — для вещей (flat — вещь).', expl_uz: 'which — narsalar uchun (flat — narsa).', expl_tj: 'which — барои ашё (flat — ашё).', expl_kg: 'which — нерселер үчүн (flat — нерсе).', expl_kz: 'which — заттар үшін (flat — зат).' },
    { q: '[COMPLETE] This is the room ___ I sleep.', opts: ['where', 'which', 'who', 'whose'], c: 0, hint_ru: 'Относительное местоимение для МЕСТА', hint_uz: 'JOY uchun nisbiy olmosh', hint_tj: 'Ҷонишини нисбӣ барои ҶОЙ', hint_kg: 'ЖЕР үчүн катыштык ат атооч', hint_kz: 'ОРЫН үшін қатыстық есімдік', expl_ru: 'where — для места (the room where...).', expl_uz: 'where — joy uchun (the room where...).', expl_tj: 'where — барои ҷой (the room where...).', expl_kg: 'where — жер үчүн (the room where...).', expl_kz: 'where — орын үшін (the room where...).' },
    { q: '[COMPLETE] The tenant ___ deposit was returned was happy.', opts: ['whose', 'who', 'which', 'where'], c: 0, hint_ru: 'Относительное местоимение для ПРИНАДЛЕЖНОСТИ', hint_uz: 'EGALIK uchun nisbiy olmosh', hint_tj: 'Ҷонишини нисбӣ барои ТААЛУҚИЯТ', hint_kg: 'ТААНДЫКТЫК үчүн катыштык ат атооч', hint_kz: 'ТИЕСІЛІК үшін қатыстық есімдік', expl_ru: 'whose — принадлежность (tenant\'s deposit → whose deposit).', expl_uz: 'whose — egalik (tenant\'s deposit → whose deposit).', expl_tj: 'whose — таалуқият (tenant\'s deposit → whose deposit).', expl_kg: 'whose — таандыктык (tenant\'s deposit → whose deposit).', expl_kz: 'whose — тиесілік (tenant\'s deposit → whose deposit).' },
    { q: '[TRANSLATE] Как сказать "арендодатель (хозяин жилья)"?', opts: ['landlord', 'tenant', 'plumber', 'neighbour'], c: 0, hint_ru: 'Тот, кто сдаёт жильё', hint_uz: 'Uyni ijaraga beruvchi', hint_tj: 'Касе, ки манзилро иҷора медиҳад', hint_kg: 'Үйдү ижарага берүүчү', hint_kz: 'Үйді жалға беруші', expl_ru: 'landlord — арендодатель; tenant — съёмщик.', expl_uz: 'landlord — uy egasi; tenant — ijarachi.', expl_tj: 'landlord — соҳибхона; tenant — иҷоранишин.', expl_kg: 'landlord — үй ээси; tenant — ижарачы.', expl_kz: 'landlord — үй иесі; tenant — жалдаушы.' },
    { q: '[COMPLETE] The plumber ___ fixed the leak was quick.', opts: ['who', 'which', 'where', 'when'], c: 0, hint_ru: 'Сантехник — человек', hint_uz: 'Santexnik — odam', hint_tj: 'Обкаш — одам', hint_kg: 'Сантехник — адам', hint_kz: 'Сантехник — адам', expl_ru: 'who (или that) — для людей.', expl_uz: 'who (yoki that) — odamlar uchun.', expl_tj: 'who (ё that) — барои одамон.', expl_kg: 'who (же that) — адамдар үчүн.', expl_kz: 'who (немесе that) — адамдар үшін.' },
    { q: '[TRANSLATE] Как сказать "залог" (за аренду)?', opts: ['deposit', 'mortgage', 'bill', 'rent'], c: 0, hint_ru: 'Деньги, которые возвращают в конце аренды', hint_uz: 'Ijara oxirida qaytariladigan pul', hint_tj: 'Пуле, ки дар охири иҷора бармегардад', hint_kg: 'Ижаранын аягында кайтарылган акча', hint_kz: 'Жалдау соңында қайтарылатын ақша', expl_ru: 'deposit — залог; rent — арендная плата.', expl_uz: 'deposit — zalog; rent — ijara haqi.', expl_tj: 'deposit — гарав; rent — ҳаққи иҷора.', expl_kg: 'deposit — күрөө; rent — ижара акысы.', expl_kz: 'deposit — кепіл; rent — жалдау ақысы.' },
    { q: '[COMPLETE] The boiler ___ broke last week is fixed now.', opts: ['that', 'who', 'whose', 'where'], c: 0, hint_ru: 'Котёл — вещь (which/that)', hint_uz: 'Qozon — narsa (which/that)', hint_tj: 'Дегдон — ашё (which/that)', hint_kg: 'Казан — нерсе (which/that)', hint_kz: 'Қазан — зат (which/that)', expl_ru: 'that — для вещей (можно вместо which).', expl_uz: 'that — narsalar uchun (which o\'rniga).', expl_tj: 'that — барои ашё (ба ҷои which).', expl_kg: 'that — нерселер үчүн (which ордуна).', expl_kz: 'that — заттар үшін (which орнына).' },
    { q: '[COMPLETE] The house ___ we live has a communal kitchen.', opts: ['where', 'which', 'who', 'whose'], c: 0, hint_ru: 'Дом — это МЕСТО, где живут', hint_uz: 'Uy — yashaydigan JOY', hint_tj: 'Хона — ҶОЙест, ки зиндагӣ мекунанд', hint_kg: 'Үй — жашаган ЖЕР', hint_kz: 'Үй — тұратын ОРЫН', expl_ru: 'where — место (the house where we live).', expl_uz: 'where — joy (the house where we live).', expl_tj: 'where — ҷой (the house where we live).', expl_kg: 'where — жер (the house where we live).', expl_kz: 'where — орын (the house where we live).' },
    { q: '[TRANSLATE] Как сказать "плесень и сырость"?', opts: ['mould and damp', 'rent and bills', 'gas and water', 'keys and locks'], c: 0, hint_ru: 'Проблемы влажного жилья', hint_uz: 'Nam uyning muammolari', hint_tj: 'Мушкилоти манзили нам', hint_kg: 'Нымдуу үйдүн көйгөйлөрү', hint_kz: 'Дымқыл үйдің мәселелері', expl_ru: 'mould — плесень, damp — сырость.', expl_uz: 'mould — mog\'or, damp — namlik.', expl_tj: 'mould — моғор, damp — нам.', expl_kg: 'mould — көгөрүү, damp — нымдуулук.', expl_kz: 'mould — көгеру, damp — дымқыл.' },
  ],
};

// ── validation (dry run) ───────────────────────────────────────────────────
const LANGS = ['ru', 'uz', 'tj', 'kg', 'kz'];
const a1 = require('./lessons_data.js'), a2 = require('./lessons_data_a2.js'), b1 = require('./lessons_data_b1.js');
const used = new Map();
[['a1', a1], ['a2', a2], ['b1', b1]].forEach(([c, C]) => C.forEach(l => l.words.forEach(w => used.set(w.en.trim().toLowerCase(), c + ' L' + l.id))));

const LESSON = L11;
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

const ALLOW = new Set(('a an the this that these those some any all and or but if so as to of in on at for with by from i you he she it we they me him her us them my your his its our their is am are was were be been being do does did have has had will would can could should not no yes very too also just now here there then what where when who which why how about into over under up down out off back well good thank thanks please sorry hello okay ok since for ever never long more most than new before after already because every month free nearby fast clean fixes fix sent bring would like much').split(/\s+/));
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
  console.log('\n✅ APPLIED: L11 injected into b1.html (string-aware). MODS unchanged (finalised after L12).');
}
