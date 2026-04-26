const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');

const l11 = `    {
      id: 11,
      mod: 5,
      name_ru: 'Автобус в город',
      name_uz: 'Shaharga avtobus',
      name_tj: 'Автобус ба шаҳр',
      name_kg: 'Шаарга автобус',
      name_kz: 'Қалаға автобус',
      cefr: 'Transport & travel · Places in town · Asking for directions',
      grammar: {
        title_ru: 'DIRECTIONS / TRANSPORT (Императив)',
        title_uz: 'DIRECTIONS / TRANSPORT (Buyruq mayli)',
        title_tj: 'DIRECTIONS / TRANSPORT (Амр)',
        title_kg: 'DIRECTIONS / TRANSPORT (Буйрук этиш)',
        title_kz: 'DIRECTIONS / TRANSPORT (Бұйрық рай)',
        rule_ru: 'Для объяснения дороги используется <b>Повелительное наклонение (Imperative)</b> без подлежащего: <code>Turn left</code> (Поверните налево).<br>Для отрицания добавляем <b>Don\\'t</b>: <code>Don\\'t get off</code> (Не выходите).<br>Фразовые глаголы для транспорта: <code>get on</code> (сесть в автобус/поезд), <code>get off</code> (выйти из него).',
        rule_uz: 'Yo\\'lni tushuntirish uchun egasiz <b>Buyruq mayli (Imperative)</b> ishlatiladi: <code>Turn left</code> (Chapga buriling).<br>Inkor uchun <b>Don\\'t</b> qo\\'shiladi: <code>Don\\'t get off</code> (Tushmang).<br>Transport uchun frazali fe\\'llar: <code>get on</code> (avtobus/poezdga minish), <code>get off</code> (tushish).',
        rule_tj: 'Барои фаҳмондани роҳ <b>Сиғаи амрӣ (Imperative)</b> бе мубтадо истифода мешавад: <code>Turn left</code> (Ба чап гардед).<br>Барои инкор <b>Don\\'t</b> илова мешавад: <code>Don\\'t get off</code> (Нафароед).<br>Феълҳои иборадор барои нақлиёт: <code>get on</code> (савор шудан), <code>get off</code> (фаромадан).',
        rule_kg: 'Жолду түшүндүрүү үчүн ээси жок <b>Буйрук этиш (Imperative)</b> колдонулат: <code>Turn left</code> (Солго бурулуңуз).<br>Терс маани үчүн <b>Don\\'t</b> кошулат: <code>Don\\'t get off</code> (Түшпөңүз).<br>Транспорт үчүн фразалык этиштер: <code>get on</code> (автобуска/поездге түшүү), <code>get off</code> (чыгуу).',
        rule_kz: 'Жолды түсіндіру үшін бастауышсыз <b>Бұйрық рай (Imperative)</b> қолданылады: <code>Turn left</code> (Солға бұрылыңыз).<br>Болымсыздық үшін <b>Don\\'t</b> қосылады: <code>Don\\'t get off</code> (Түспеңіз).<br>Көлікке арналған фразалық етістіктер: <code>get on</code> (автобусқа/пойызға міну), <code>get off</code> (түсу).',
        tables: [
          {
            title: '✅ Affirmative (Инструкции)',
            rows: [
              {
                subj: 'Turn',
                verb: 'left / right',
                example: 'Turn left at the corner.',
                transcr: 'Тён лэфт эт зэ конэ',
                tr_ru: 'Поверните налево на углу',
                tr_uz: 'Burchakda chapga buriling',
                tr_tj: 'Дар кунҷ ба чап гардед',
                tr_kg: 'Бурчтан солго бурулуңуз',
                tr_kz: 'Бұрышта солға бұрылыңыз'
              },
              {
                subj: 'Go',
                verb: 'straight',
                example: 'Go straight to the bank.',
                transcr: 'Гоу стрэйт ту зэ бэнк',
                tr_ru: 'Идите прямо до банка',
                tr_uz: 'Bankgacha to\\'g\\'riga yuring',
                tr_tj: 'То бонк рост равед',
                tr_kg: 'Банкка чейин түз барыңыз',
                tr_kz: 'Банкке дейін тура жүріңіз'
              }
            ]
          },
          {
            title: '❌ Negative (Предупреждения)',
            rows: [
              {
                subj: 'Do not',
                verb: '(Don\\'t) turn',
                example: 'Don\\'t turn right here.',
                transcr: 'Доунт тён райт хиэ',
                tr_ru: 'Не поворачивайте здесь направо',
                tr_uz: 'Bu yerda o\\'ngga burilmang',
                tr_tj: 'Дар ин ҷо ба рост нагардед',
                tr_kg: 'Бул жерден оңго бурулбаңыз',
                tr_kz: 'Бұл жерде оңға бұрылмаңыз'
              },
              {
                subj: 'Don\\'t',
                verb: 'get off',
                example: 'Don\\'t get off the bus yet.',
                transcr: 'Доунт гэт оф зэ бас йет',
                tr_ru: 'Еще не выходите из автобуса',
                tr_uz: 'Hali avtobusdan tushmang',
                tr_tj: 'Ҳоло аз автобус нафароед',
                tr_kg: 'Автобустан азырынча чыга элек',
                tr_kz: 'Әзірге автобустан түспеңіз'
              }
            ]
          },
          {
            title: '❓ Question (Как добраться)',
            rows: [
              {
                subj: 'How',
                verb: 'do I get to',
                example: 'How do I get to the town?',
                transcr: 'Хау ду ай гэт ту зэ таун?',
                tr_ru: 'Как мне добраться до города?',
                tr_uz: 'Shaharga qanday yetib boraman?',
                tr_tj: 'Ман чӣ гуна ба шаҳр меравам?',
                tr_kg: 'Шаарга кантип жетем?',
                tr_kz: 'Қалаға қалай жетемін?'
              },
              {
                subj: 'Is it',
                verb: 'far / near',
                example: 'Is the pharmacy far?',
                transcr: 'Из зэ фамэси фа?',
                tr_ru: 'Аптека далеко?',
                tr_uz: 'Dorixona uzoqmi?',
                tr_tj: 'Дорухона дур аст?',
                tr_kg: 'Аптека алыспы?',
                tr_kz: 'Дәріхана алыс па?'
              }
            ]
          }
        ],
        examples: [
          {
            en: 'How do I get to the train station? Go straight and turn left.',
            ru: 'Как мне добраться до вокзала? Идите прямо и поверните налево.',
            uz: 'Vokzalga qanday boraman? To\\'g\\'riga yuring va chapga buriling.',
            tj: 'Ба вокзал чӣ гуна меравам? Рост равед ва ба чап гардед.',
            kg: 'Вокзалга кантип барам? Түз барып, солго бурулуңуз.',
            kz: 'Вокзалға қалай барамын? Тура жүріп, солға бұрылыңыз.'
          },
          {
            en: 'Get on the bus at the village and get off at the supermarket.',
            ru: 'Садитесь в автобус в деревне и выходите у супермаркета.',
            uz: 'Qishloqda avtobusga mining va supermarketda tushing.',
            tj: 'Дар деҳа ба автобус савор шавед ва дар назди супермаркет фароед.',
            kg: 'Айылдан автобуска минип, супермаркеттен түшүңүз.',
            kz: 'Ауылдан автобусқа мініп, супермаркетте түсіңіз.'
          },
          {
            en: 'Is the bank near here? No, it is very far.',
            ru: 'Банк здесь близко? Нет, он очень далеко.',
            uz: 'Bank shu yerda yaqinmi? Yo\\'q, u juda uzoq.',
            tj: 'Бонк дар ин ҷо наздик аст? Не, он хеле дур аст.',
            kg: 'Банк бул жерге жакынбы? Жок, ал абдан алыс.',
            kz: 'Банк осы жерге жақын ба? Жоқ, ол өте алыс.'
          },
          {
            en: 'Please give me one return ticket to town.',
            ru: 'Пожалуйста, дайте мне один билет туда-обратно в город.',
            uz: 'Iltimos, shaharga bitta borib-qaytish chiptasi bering.',
            tj: 'Лутфан, ба ман як билети рафт-баргашт ба шаҳр диҳед.',
            kg: 'Суранам, мага шаарга бир эки тараптуу билет бериңизчи.',
            kz: 'Өтінемін, маған қалаға бір барып-қайту билетін беріңізші.'
          },
          {
            en: 'Don\\'t get off the train. We are not at the station yet.',
            ru: 'Не выходите из поезда. Мы еще не на станции.',
            uz: 'Poyezddan tushmang. Biz hali stantsiyada emasmiz.',
            tj: 'Аз қатора нафароед. Мо ҳоло дар истгоҳ нестем.',
            kg: 'Поездден чыкпаңыз. Биз станцияда элекпиз.',
            kz: 'Пойыздан түспеңіз. Біз әлі станцияда емеспіз.'
          },
          {
            en: 'The cafe is on the corner of the street.',
            ru: 'Кафе находится на углу улицы.',
            uz: 'Kafe ko\\'chaning burchagida joylashgan.',
            tj: 'Қаҳвахона дар кунҷи кӯча ҷойгир аст.',
            kg: 'Кафе көчөнүн бурчунда жайгашкан.',
            kz: 'Кафе көшенің бұрышында орналасқан.'
          },
          {
            en: 'I need a cash machine. Look at the map.',
            ru: 'Мне нужен банкомат. Посмотри на карту.',
            uz: 'Menga bankomat kerak. Xaritaga qarang.',
            tj: 'Ба ман банкомат лозим аст. Ба харита нигоҳ кунед.',
            kg: 'Мага банкомат керек. Картаны караңыз.',
            kz: 'Маған банкомат керек. Картаға қараңыз.'
          },
          {
            en: 'The driver says the park is on the right.',
            ru: 'Водитель говорит, что парк находится справа.',
            uz: 'Haydovchining aytishicha, park o\\'ng tomonda.',
            tj: 'Ронанда мегӯяд, ки боғ дар тарафи рост аст.',
            kg: 'Айдоочунун айтымында, парк оң жакта.',
            kz: 'Жүргізушінің айтуынша, саябақ оң жақта.'
          },
          {
            en: 'Are there any free seats for passengers?',
            ru: 'Есть ли свободные места для пассажиров?',
            uz: 'Yo\\'lovchilar uchun bo\\'sh o\\'rindiqlar bormi?',
            tj: 'Оё барои мусофирон ҷойҳои холӣ ҳаст?',
            kg: 'Жүргүнчүлөр үчүн бош орундар барбы?',
            kz: 'Жолаушылар үшін бос орындар бар ма?'
          },
          {
            en: 'Don\\'t turn left. Go straight to the post office.',
            ru: 'Не поворачивай налево. Иди прямо до почты.',
            uz: 'Chapga burilmang. Pochtagacha to\\'g\\'riga yuring.',
            tj: 'Ба чап нагардед. То почта рост равед.',
            kg: 'Солго бурулбаңыз. Почтага чейин түз барыңыз.',
            kz: 'Солға бұрылмаңыз. Поштаға дейін тура жүріңіз.'
          }
        ]
      },
      words: [
        {
          e: '🚌',
          en: 'bus',
          ru: 'автобус',
          uz: 'avtobus',
          tj: 'автобус',
          kg: 'автобус',
          kz: 'автобус',
          pn: '/bʌs/',
          transcr: 'бас'
        },
        {
          e: '🚏',
          en: 'bus stop',
          ru: 'остановка',
          uz: 'bekat',
          tj: 'бекат',
          kg: 'аялдама',
          kz: 'аялдама',
          pn: '/bʌs stɒp/',
          transcr: 'бас стоп'
        },
        {
          e: '🚂',
          en: 'train',
          ru: 'поезд',
          uz: 'poezd',
          tj: 'қатора',
          kg: 'поезд',
          kz: 'пойыз',
          pn: '/treɪn/',
          transcr: 'трэйн'
        },
        {
          e: '🚉',
          en: 'train station',
          ru: 'вокзал',
          uz: 'vokzal',
          tj: 'вокзал',
          kg: 'вокзал',
          kz: 'вокзал',
          pn: '/treɪn ˈsteɪʃn/',
          transcr: 'трэйн стэйшн'
        },
        {
          e: '🚕',
          en: 'taxi',
          ru: 'такси',
          uz: 'taksi',
          tj: 'таксӣ',
          kg: 'такси',
          kz: 'такси',
          pn: '/ˈtæksi/',
          transcr: 'тэкси'
        },
        {
          e: '🎫',
          en: 'single ticket',
          ru: 'билет в одну сторону',
          uz: 'bir tomonlama chipta',
          tj: 'билети як тараф',
          kg: 'бир тараптуу билет',
          kz: 'бір жаққа билет',
          pn: '/ˈsɪŋɡl ˈtɪkɪt/',
          transcr: 'сингл тикит'
        },
        {
          e: '🎟️',
          en: 'return ticket',
          ru: 'билет туда-обратно',
          uz: 'borib-qaytish chiptasi',
          tj: 'билети рафт-баргашт',
          kg: 'эки тараптуу билет',
          kz: 'барып-қайту билеті',
          pn: '/rɪˈtɜːn ˈtɪkɪt/',
          transcr: 'ритён тикит'
        },
        {
          e: '🏙️',
          en: 'town',
          ru: 'город',
          uz: 'shahar',
          tj: 'шаҳр',
          kg: 'шаар',
          kz: 'қала',
          pn: '/taʊn/',
          transcr: 'таун'
        },
        {
          e: '🏡',
          en: 'village',
          ru: 'деревня',
          uz: 'qishloq',
          tj: 'деҳа',
          kg: 'айыл',
          kz: 'ауыл',
          pn: '/ˈvɪlɪdʒ/',
          transcr: 'вилидж'
        },
        {
          e: '🛣️',
          en: 'street',
          ru: 'улица',
          uz: 'ko\\'cha',
          tj: 'кӯча',
          kg: 'көчө',
          kz: 'көше',
          pn: '/striːt/',
          transcr: 'стрит'
        },
        {
          e: '💊',
          en: 'pharmacy',
          ru: 'аптека',
          uz: 'dorixona',
          tj: 'дорухона',
          kg: 'аптека',
          kz: 'дәріхана',
          pn: '/ˈfɑːməsi/',
          transcr: 'фамэси'
        },
        {
          e: '🏦',
          en: 'bank',
          ru: 'банк',
          uz: 'bank',
          tj: 'бонк',
          kg: 'банк',
          kz: 'банк',
          pn: '/bæŋk/',
          transcr: 'бэнк'
        },
        {
          e: '🏧',
          en: 'cash machine',
          ru: 'банкомат',
          uz: 'bankomat',
          tj: 'банкомат',
          kg: 'банкомат',
          kz: 'банкомат',
          pn: '/kæʃ məˈʃiːn/',
          transcr: 'кэш мэшин'
        },
        {
          e: '🛒',
          en: 'supermarket',
          ru: 'супермаркет',
          uz: 'supermarket',
          tj: 'супермаркет',
          kg: 'супермаркет',
          kz: 'супермаркет',
          pn: '/ˈsuːpəmɑːkɪt/',
          transcr: 'супэмакит'
        },
        {
          e: '🏣',
          en: 'post office',
          ru: 'почта',
          uz: 'pochta',
          tj: 'почта',
          kg: 'почта',
          kz: 'пошта',
          pn: '/pəʊst ˈɒfɪs/',
          transcr: 'поуст офис'
        },
        {
          e: '🚓',
          en: 'police station',
          ru: 'полицейский участок',
          uz: 'politsiya bo\\'limi',
          tj: 'идораи полис',
          kg: 'милиция бөлүмү',
          kz: 'полиция бөлімшесі',
          pn: '/pəˈliːs ˈsteɪʃn/',
          transcr: 'пэлис стэйшн'
        },
        {
          e: '☕',
          en: 'cafe',
          ru: 'кафе',
          uz: 'kafe',
          tj: 'қаҳвахона',
          kg: 'кафе',
          kz: 'кафе',
          pn: '/ˈkæfeɪ/',
          transcr: 'кэфэй'
        },
        {
          e: '🌳',
          en: 'park',
          ru: 'парк',
          uz: 'park',
          tj: 'боғ',
          kg: 'парк',
          kz: 'саябақ',
          pn: '/pɑːk/',
          transcr: 'пак'
        },
        {
          e: '🗺️',
          en: 'map',
          ru: 'карта (города)',
          uz: 'xarita',
          tj: 'харита',
          kg: 'карта',
          kz: 'карта',
          pn: '/mæp/',
          transcr: 'мэп'
        },
        {
          e: '🧑‍✈️',
          en: 'driver',
          ru: 'водитель',
          uz: 'haydovchi',
          tj: 'ронанда',
          kg: 'айдоочу',
          kz: 'жүргізуші',
          pn: '/ˈdraɪvə/',
          transcr: 'драйвэ'
        },
        {
          e: '👥',
          en: 'passenger',
          ru: 'пассажир',
          uz: 'yo\\'lovchi',
          tj: 'мусофир',
          kg: 'жүргүнчү',
          kz: 'жолаушы',
          pn: '/ˈpæsɪndʒə/',
          transcr: 'пэсинджэ'
        },
        {
          e: '💺',
          en: 'seat',
          ru: 'сиденье / место',
          uz: 'o\\'rindiq',
          tj: 'ҷойгоҳ',
          kg: 'отургуч',
          kz: 'орындық',
          pn: '/siːt/',
          transcr: 'сит'
        },
        {
          e: '⬅️',
          en: 'left',
          ru: 'налево',
          uz: 'chapga',
          tj: 'ба чап',
          kg: 'солго',
          kz: 'солға',
          pn: '/left/',
          transcr: 'лэфт'
        },
        {
          e: '➡️',
          en: 'right',
          ru: 'направо',
          uz: 'o\\'ngga',
          tj: 'ба рост',
          kg: 'оңго',
          kz: 'оңға',
          pn: '/raɪt/',
          transcr: 'райт'
        },
        {
          e: '⬆️',
          en: 'straight',
          ru: 'прямо',
          uz: 'to\\'g\\'riga',
          tj: 'рост',
          kg: 'түз',
          kz: 'тура',
          pn: '/streɪt/',
          transcr: 'стрэйт'
        },
        {
          e: '📐',
          en: 'corner',
          ru: 'угол',
          uz: 'burchak',
          tj: 'кунҷ',
          kg: 'бурч',
          kz: 'бұрыш',
          pn: '/ˈkɔːnə/',
          transcr: 'конэ'
        },
        {
          e: '📍',
          en: 'near',
          ru: 'близко / рядом',
          uz: 'yaqin',
          tj: 'наздик',
          kg: 'жакын',
          kz: 'жақын',
          pn: '/nɪə/',
          transcr: 'ниэ'
        },
        {
          e: '🔭',
          en: 'far',
          ru: 'далеко',
          uz: 'uzoq',
          tj: 'дур',
          kg: 'алыс',
          kz: 'алыс',
          pn: '/fɑː/',
          transcr: 'фа'
        },
        {
          e: '🏃‍♂️',
          en: 'get on',
          ru: 'садиться в транспорт',
          uz: 'minish',
          tj: 'савор шудан',
          kg: 'түшүү',
          kz: 'міну',
          pn: '/ɡet ɒn/',
          transcr: 'гэт он'
        },
        {
          e: '🚶‍♂️',
          en: 'get off',
          ru: 'выходить из транспорта',
          uz: 'tushish',
          tj: 'фаромадан',
          kg: 'чыгуу',
          kz: 'түсу',
          pn: '/ɡet ɒf/',
          transcr: 'гэт оф'
        }
      ],
      dialogue: [
        {
          s: 'w',
          en: 'Excuse me, driver. Does this bus go to the town?',
          ru: 'Извините, водитель. Этот автобус едет в город?',
          uz: 'Kechirasiz, haydovchi. Bu avtobus shaharga boradimi?',
          tj: 'Бубахшед, ронанда. Ин автобус ба шаҳр меравад?',
          kg: 'Кечириңиз, айдоочу. Бул автобус шаарга барабы?',
          kz: 'Кешіріңіз, жүргізуші. Бұл автобус қалаға бара ма?',
          transcr: 'Икскьюз ми, драйвэ. Даз зис бас гоу ту зэ таун?'
        },
        {
          s: 'm',
          en: 'Yes, it does. Get on, please.',
          ru: 'Да, едет. Садитесь, пожалуйста.',
          uz: 'Ha, boradi. Chiqing, iltimos.',
          tj: 'Бале, меравад. Савор шавед, лутфан.',
          kg: 'Ооба, барат. Түшүңүз, суранам.',
          kz: 'Иә, барады. Мініңіз, өтінемін.',
          transcr: 'Йес, ит даз. Гэт он, плиз.'
        },
        {
          s: 'w',
          en: 'I\\'d like a return ticket, please. How much is it?',
          ru: 'Мне, пожалуйста, билет туда-обратно. Сколько стоит?',
          uz: 'Iltimos, menga borib-qaytish chiptasi kerak. Qancha turadi?',
          tj: 'Лутфан, ба ман як билети рафт-баргашт диҳед. Он чанд аст?',
          kg: 'Суранам, мага эки тараптуу билет керек. Канча турат?',
          kz: 'Өтінемін, маған барып-қайту билеті керек. Қанша тұрады?',
          transcr: 'Айд лайк э ритён тикит, плиз. Хау мач из ит?'
        },
        {
          s: 'm',
          en: 'That is four pounds. Take a seat, we are going now.',
          ru: 'Это четыре фунта. Садитесь на место, мы отправляемся.',
          uz: 'Bu to\\'rt funt. O\\'tiring, biz ketyapmiz.',
          tj: 'Ин чор фунт аст. Ҷой гиред, мо ҳоло меравем.',
          kg: 'Бул төрт фунт. Отуруңуз, биз кетип жатабыз.',
          kz: 'Бұл төрт фунт. Отырыңыз, біз қазір кетеміз.',
          transcr: 'Зэт из фо паундз. Тэйк э сит, уи а гоуин нау.'
        },
        {
          s: 'w',
          en: 'Thank you. Where do I get off for the bank?',
          ru: 'Спасибо. Где мне выходить, чтобы попасть в банк?',
          uz: 'Rahmat. Bankka borish uchun qayerda tushaman?',
          tj: 'Ташаккур. Барои рафтан ба бонк ман дар куҷо фароям?',
          kg: 'Рахмат. Банкка баруу үчүн кайдан чыгам?',
          kz: 'Рақмет. Банкке бару үшін қай жерде түсемін?',
          transcr: 'Сэнк ю. Уээ ду ай гэт оф фо зэ бэнк?'
        },
        {
          s: 'm',
          en: 'Get off at the next bus stop. It is near the supermarket.',
          ru: 'Выходите на следующей остановке. Это рядом с супермаркетом.',
          uz: 'Keyingi avtobus bekatida tushing. Bu supermarket yonida.',
          tj: 'Дар бекати навбатии автобус фароед. Он наздикии супермаркет аст.',
          kg: 'Кийинки аялдамадан түшүңүз. Бул супермаркетке жакын.',
          kz: 'Келесі аялдамада түсіңіз. Ол супермаркеттің жанында.',
          transcr: 'Гэт оф эт зэ нэкст бас стоп. Ит из ниэ зэ супэмакит.'
        },
        {
          s: 'w',
          en: 'Excuse me. How do I get to the bank from here?',
          ru: 'Извините. Как мне добраться до банка отсюда?',
          uz: 'Kechirasiz. Bu yerdan bankka qanday boraman?',
          tj: 'Бубахшед. Аз ин ҷо ба бонк чӣ гуна меравам?',
          kg: 'Кечириңиз. Бул жерден банкка кантип барам?',
          kz: 'Кешіріңіз. Осы жерден банкке қалай барамын?',
          transcr: 'Икскьюз ми. Хау ду ай гэт ту зэ бэнк фром хиэ?'
        },
        {
          s: 'm',
          en: 'Go straight along this street. Don\\'t turn left.',
          ru: 'Идите прямо по этой улице. Не поворачивайте налево.',
          uz: 'Shu ko\\'cha bo\\'ylab to\\'g\\'riga yuring. Chapga burilmang.',
          tj: 'Дар қад-қади ин кӯча рост равед. Ба чап нагардед.',
          kg: 'Бул көчө менен түз барыңыз. Солго бурулбаңыз.',
          kz: 'Осы көше бойымен тура жүріңіз. Солға бұрылмаңыз.',
          transcr: 'Гоу стрэйт элон зис стрит. Доунт тён лэфт.'
        },
        {
          s: 'w',
          en: 'Okay. Is it far?',
          ru: 'Хорошо. Это далеко?',
          uz: 'Yaxshi. U uzoqmi?',
          tj: 'Хуб. Он дур аст?',
          kg: 'Макул. Бул алыспы?',
          kz: 'Жақсы. Ол алыс па?',
          transcr: 'Оукей. Из ит фа?'
        },
        {
          s: 'm',
          en: 'No, it is near. Turn right at the corner. It is next to the pharmacy.',
          ru: 'Нет, это близко. Поверните направо на углу. Это рядом с аптекой.',
          uz: 'Yo\\'q, u yaqin. Burchakda o\\'ngga buriling. Bu dorixona yonida.',
          tj: 'Не, он наздик аст. Дар кунҷ ба рост гардед. Он паҳлӯи дорухона аст.',
          kg: 'Жок, бул жакын. Бурчтан оңго бурулуңуз. Ал аптеканын жанында.',
          kz: 'Жоқ, ол жақын. Бұрышта оңға бұрылыңыз. Ол дәріхананың жанында.',
          transcr: 'Ноу, ит из ниэ. Тён райт эт зэ конэ. Ит из нэкст ту зэ фамэси.'
        }
      ],
      quiz: [
        {
          q: 'You want to go to town and come back. You need a...',
          opts: [
            'single ticket',
            'return ticket',
            'map',
            'seat'
          ],
          c: 1,
          hint_ru: 'Return ticket — это билет туда и обратно.'
        },
        {
          q: '\\'Please, ___ the bus here. We are going to town.\\' (садитесь)',
          opts: [
            'get off',
            'get out',
            'get on',
            'go straight'
          ],
          c: 2,
          hint_ru: 'Садиться в общественный транспорт — это фразовый глагол get on.'
        },
        {
          q: '\\'___ turn left. The street is closed.\\' (не поворачивайте)',
          opts: [
            'Not',
            'No',
            'Don\\'t',
            'Doesn\\'t'
          ],
          c: 2,
          hint_ru: 'Для отрицания в повелительном наклонении всегда используется Don\\'t.'
        },
        {
          q: 'What is \\'прямо\\'?',
          opts: [
            'left',
            'right',
            'corner',
            'straight'
          ],
          c: 3,
          hint_ru: 'Прямо — это straight.'
        },
        {
          q: 'What is the opposite of \\'near\\'? (близко)',
          opts: [
            'far',
            'left',
            'corner',
            'straight'
          ],
          c: 0,
          hint_ru: 'Антоним слова "близко" — это "далеко" (far).'
        },
        {
          q: '\\'How do I ___ to the train station?\\' (добраться)',
          opts: [
            'get off',
            'get on',
            'get',
            'go'
          ],
          c: 2,
          hint_ru: 'Как мне добраться = How do I get to...?'
        },
        {
          q: 'Where can I buy some medicine? (лекарства)',
          opts: [
            'bank',
            'pharmacy',
            'post office',
            'bus stop'
          ],
          c: 1,
          hint_ru: 'Лекарства продаются в аптеке (pharmacy).'
        },
        {
          q: '\\'This is my ___. Please stand up!\\' (место)',
          opts: [
            'seat',
            'map',
            'ticket',
            'corner'
          ],
          c: 0,
          hint_ru: 'Место или сиденье — это seat.'
        },
        {
          q: '\\'The cafe is on the ___.\\' (углу)',
          opts: [
            'left',
            'right',
            'corner',
            'near'
          ],
          c: 2,
          hint_ru: 'Угол — это corner.'
        },
        {
          q: '\\'___ straight and turn right.\\' (идите)',
          opts: [
            'Go',
            'Get',
            'Turn',
            'Take'
          ],
          c: 0,
          hint_ru: 'Идти прямо — Go straight.'
        }
      ]
    }`;

text_replaced = text.replace(/    \{\s*id: 11,[\s\S]*?(?=\s*\{\s*id: 12,)/, l11 + '\n');
fs.writeFileSync('a1.html', text_replaced);
console.log('Successfully replaced Lesson 11!');
