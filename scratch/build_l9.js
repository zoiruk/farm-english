const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');

const l9 = `    {
      id: 9,
      mod: 5,
      name_ru: 'Мой вагончик (caravan)',
      name_uz: 'Mening karavonim',
      name_tj: 'Кабинаи ман',
      name_kg: 'Менин кабинам',
      name_kz: 'Менің вагончигім',
      cefr: 'There is/are · some/any · Rooms & furniture · Reporting problems',
      grammar: {
        title_ru: 'THERE IS / THERE ARE + some / any',
        title_uz: 'THERE IS / THERE ARE + some / any',
        title_tj: 'THERE IS / THERE ARE + some / any',
        title_kg: 'THERE IS / THERE ARE + some / any',
        title_kz: 'THERE IS / THERE ARE + some / any',
        rule_ru: 'Конструкция <b>There is / There are</b> используется, чтобы сказать, что что-то где-то находится.<br>Для единственного числа: <b>There is a fridge</b> (Есть холодильник).<br>Для множественного: <b>There are some beds</b> (Есть кровати).<br>Слово <b>some</b> используется в утверждениях, а <b>any</b> — в отрицаниях и вопросах.',
        rule_uz: '<b>There is / There are</b> qurilmasi biror narsa qayerdadir borligini aytish uchun ishlatiladi.<br>Birlik uchun: <b>There is a fridge</b> (Muzlatgich bor).<br>Ko\\'plik uchun: <b>There are some beds</b> (Karavotlar bor).<br><b>some</b> so\\'zi tasdiqda, <b>any</b> esa inkor va savolda ishlatiladi.',
        rule_tj: 'Сохтори <b>There is / There are</b> барои гуфтани он ки чизе дар куҷост, истифода мешавад.<br>Барои танҳоӣ: <b>There is a fridge</b> (Яхдон ҳаст).<br>Барои ҷамъ: <b>There are some beds</b> (Каттҳо ҳастанд).<br>Калимаи <b>some</b> дар тасдиқ ва <b>any</b> дар инкор ва савол истифода мешавад.',
        rule_kg: '<b>There is / There are</b> конструкциясы бир нерсенин кайда экенин айтуу үчүн колдонулат.<br>Бирдик үчүн: <b>There is a fridge</b> (Муздаткыч бар).<br>Көптүк үчүн: <b>There are some beds</b> (Керебеттер бар).<br><b>some</b> сөзү тастыктоодо, <b>any</b> — терс жана суроодо колдонулат.',
        rule_kz: '<b>There is / There are</b> құрылымы бір нәрсенің қайда екенін айту үшін қолданылады.<br>Жекеше үшін: <b>There is a fridge</b> (Тоңазытқыш бар).<br>Көпше үшін: <b>There are some beds</b> (Төсектер бар).<br><b>some</b> сөзі болымды сөйлемде, <b>any</b> — болымсыз және сұраулы сөйлемдерде қолданылады.',
        tables: [
          {
            title: '✅ Affirmative (Утверждение)',
            rows: [
              {
                subj: 'There is',
                verb: 'a / one',
                example: 'There is a heater in the room.',
                transcr: 'Зеэр из э хитэ ин зэ рум',
                tr_ru: 'В комнате есть обогреватель',
                tr_uz: 'Xonada isitgich bor',
                tr_tj: 'Дар хона гармкунак ҳаст',
                tr_kg: 'Бөлмөдө жылыткыч бар',
                tr_kz: 'Бөлмеде жылытқыш бар'
              },
              {
                subj: 'There are',
                verb: 'some / many',
                example: 'There are some beds.',
                transcr: 'Зеэр а сам бедз',
                tr_ru: 'Здесь есть кровати',
                tr_uz: 'Bu yerda karavotlar bor',
                tr_tj: 'Дар ин ҷо каттҳо ҳастанд',
                tr_kg: 'Бул жерде керебеттер бар',
                tr_kz: 'Мұнда төсектер бар'
              }
            ]
          },
          {
            title: '❌ Negative (Отрицание)',
            rows: [
              {
                subj: 'There is not',
                verb: 'any',
                example: 'There isn\\'t any hot water.',
                transcr: 'Зеэр изнт эни хот уотэ',
                tr_ru: 'Нет горячей воды',
                tr_uz: 'Issiq suv yo\\'q',
                tr_tj: 'Оби гарм нест',
                tr_kg: 'Ысык суу жок',
                tr_kz: 'Ыстық су жоқ'
              },
              {
                subj: 'There are not',
                verb: 'any',
                example: 'There aren\\'t any towels.',
                transcr: 'Зеэр ант эни тауэлз',
                tr_ru: 'Здесь нет полотенец',
                tr_uz: 'Bu yerda sochiqlar yo\\'q',
                tr_tj: 'Дар ин ҷо дастмолҳо нестанд',
                tr_kg: 'Бул жерде сүлгүлөр жок',
                tr_kz: 'Мұнда сүлгілер жоқ'
              }
            ]
          },
          {
            title: '❓ Question (Вопрос)',
            rows: [
              {
                subj: 'Is there',
                verb: 'a / any',
                example: 'Is there a shower in the caravan?',
                transcr: 'Из зеэр э шауэ ин зэ кэрэвэн?',
                tr_ru: 'В вагончике есть душ?',
                tr_uz: 'Karavonda dush bormi?',
                tr_tj: 'Дар кабина душ ҳаст?',
                tr_kg: 'Кабинада душ барбы?',
                tr_kz: 'Вагончигте душ бар ма?'
              },
              {
                subj: 'Are there',
                verb: 'any',
                example: 'Are there any free beds?',
                transcr: 'А зеэр эни фри бедз?',
                tr_ru: 'Здесь есть свободные кровати?',
                tr_uz: 'Bu yerda bo\\'sh karavotlar bormi?',
                tr_tj: 'Дар ин ҷо каттҳои холӣ ҳастанд?',
                tr_kg: 'Бул жерде бош керебеттер барбы?',
                tr_kz: 'Мұнда бос төсектер бар ма?'
              }
            ]
          }
        ],
        examples: [
          {
            en: 'There is a bed and a heater in my bedroom.',
            ru: 'В моей спальне есть кровать и обогреватель.',
            uz: 'Yotoqxonamda karavot va isitgich bor.',
            tj: 'Дар хобгоҳи ман катт ва гармкунак ҳаст.',
            kg: 'Менин жатын бөлмөмдө керебет жана жылыткыч бар.',
            kz: 'Менің жатын бөлмемде төсек және жылытқыш бар.'
          },
          {
            en: 'There are some plates in the kitchen.',
            ru: 'На кухне есть немного тарелок.',
            uz: 'Oshxonada biroz likopchalar bor.',
            tj: 'Дар ошхона каме табақҳо ҳастанд.',
            kg: 'Ашканада бир нече табактар бар.',
            kz: 'Асүйде бірнеше тәрелкелер бар.'
          },
          {
            en: 'There isn\\'t any hot water in the bathroom.',
            ru: 'В ванной нет горячей воды.',
            uz: 'Hammomda issiq suv yo\\'q.',
            tj: 'Дар ҳаммом оби гарм нест.',
            kg: 'Жуунуучу бөлмөдө ысык суу жок.',
            kz: 'Жуынатын бөлмеде ыстық су жоқ.'
          },
          {
            en: 'Are there any washing machines in the laundry?',
            ru: 'В прачечной есть стиральные машины?',
            uz: 'Kir yuvish xonasida kir yuvish mashinalari bormi?',
            tj: 'Дар ҷомашӯйхона мошинҳои ҷомашӯӣ ҳастанд?',
            kg: 'Кир жуучу жайда кир жуугуч машиналар барбы?',
            kz: 'Кір жуатын бөлмеде кір жуғыш машиналар бар ма?'
          },
          {
            en: 'There is a fridge, a cooker and a microwave.',
            ru: 'Здесь есть холодильник, плита и микроволновка.',
            uz: 'Bu yerda muzlatgich, plita va mikroto\\'lqinli pech bor.',
            tj: 'Дар ин ҷо яхдон, печ ва микроволновка ҳаст.',
            kg: 'Бул жерде муздаткыч, меш жана микротолкундуу меш бар.',
            kz: 'Мұнда тоңазытқыш, пеш және қысқа толқынды пеш бар.'
          },
          {
            en: 'There aren\\'t any clean towels or pillows.',
            ru: 'Здесь нет чистых полотенец или подушек.',
            uz: 'Bu yerda toza sochiqlar yoki yostiqlar yo\\'q.',
            tj: 'Дар ин ҷо дастмолҳо ё болиштҳои тоза нестанд.',
            kg: 'Бул жерде таза сүлгүлөр же жаздыктар жок.',
            kz: 'Мұнда таза сүлгілер немесе жастықтар жоқ.'
          },
          {
            en: 'The bin is full. Is there any rubbish?',
            ru: 'Мусорное ведро полное. Там есть мусор?',
            uz: 'Axlat qutisi to\\'la. U yerda axlat bormi?',
            tj: 'Қуттии партов пур аст. Оё он ҷо ахлот ҳаст?',
            kg: 'Таштанды челеги толук. Ал жерде таштанды барбы?',
            kz: 'Қоқыс шелегі толық. Онда қоқыс бар ма?'
          },
          {
            en: 'There is a table and a chair, but no wardrobe.',
            ru: 'Там есть стол и стул, но нет шкафа.',
            uz: 'U yerda stol va stul bor, lekin shkaf yo\\'q.',
            tj: 'Он ҷо миз ва курсӣ ҳаст, аммо ҷевон нест.',
            kg: 'Ал жерде стол жана отургуч бар, бирок шкаф жок.',
            kz: 'Онда үстел және орындық бар, бірақ шкаф жоқ.'
          },
          {
            en: 'Is there electricity in your caravan? No, it needs a repair.',
            ru: 'В вашем вагончике есть электричество? Нет, нужен ремонт.',
            uz: 'Karavoningizda elektr bormi? Yo\\'q, ta\\'mirlash kerak.',
            tj: 'Дар кабинаи шумо барқ ҳаст? Не, таъмир лозим аст.',
            kg: 'Сиздин кабинаңызда электр жарыгы барбы? Жок, оңдоо керек.',
            kz: 'Сіздің вагончигіңізде электр энергиясы бар ма? Жоқ, жөндеу керек.'
          },
          {
            en: 'There are some noisy people next door. We want a quiet room.',
            ru: 'По соседству есть шумные люди. Мы хотим тихую комнату.',
            uz: 'Qo\\'shni xonada shovqinli odamlar bor. Biz tinch xona xohlaymiz.',
            tj: 'Дар ҳуҷраи ҳамсоя одамони пурғавғо ҳастанд. Мо хонаи ором мехоҳем.',
            kg: 'Коңшу бөлмөдө ызы-чуу адамдар бар. Биз тынч бөлмө каалайбыз.',
            kz: 'Көрші бөлмеде шулы адамдар бар. Біз тыныш бөлме қалаймыз.'
          }
        ]
      },
      words: [
        {
          e: '🏠',
          en: 'caravan',
          ru: 'вагончик (кэмп)',
          uz: 'karavon',
          tj: 'кабина',
          kg: 'кабина',
          kz: 'вагончик',
          pn: '/ˈkærəvæn/',
          transcr: 'кэрэвэн'
        },
        {
          e: '🛌',
          en: 'bedroom',
          ru: 'спальня',
          uz: 'yotoqxona',
          tj: 'хобгоҳ',
          kg: 'жатын бөлмө',
          kz: 'жатын бөлме',
          pn: '/ˈbedruːm/',
          transcr: 'бедрум'
        },
        {
          e: '🍳',
          en: 'kitchen',
          ru: 'кухня',
          uz: 'oshxona',
          tj: 'ошхона',
          kg: 'ашкана',
          kz: 'асүй',
          pn: '/ˈkɪtʃɪn/',
          transcr: 'китчин'
        },
        {
          e: '🚽',
          en: 'bathroom',
          ru: 'ванная комната',
          uz: 'hammom',
          tj: 'ҳаммом',
          kg: 'жуунуучу бөлмө',
          kz: 'жуынатын бөлме',
          pn: '/ˈbɑːθruːm/',
          transcr: 'басрум'
        },
        {
          e: '🧺',
          en: 'laundry',
          ru: 'прачечная',
          uz: 'kir yuvish xonasi',
          tj: 'ҷомашӯйхона',
          kg: 'кир жуучу жай',
          kz: 'кір жуатын бөлме',
          pn: '/ˈlɔːndri/',
          transcr: 'лондри'
        },
        {
          e: '🛏️',
          en: 'bed',
          ru: 'кровать',
          uz: 'karavot',
          tj: 'катт',
          kg: 'керебет',
          kz: 'төсек',
          pn: '/bed/',
          transcr: 'бед'
        },
        {
          e: '🔥',
          en: 'heater',
          ru: 'обогреватель',
          uz: 'isitgich',
          tj: 'гармкунак',
          kg: 'жылыткыч',
          kz: 'жылытқыш',
          pn: '/ˈhiːtə/',
          transcr: 'хитэ'
        },
        {
          e: '🚿',
          en: 'shower',
          ru: 'душ',
          uz: 'dush',
          tj: 'душ',
          kg: 'душ',
          kz: 'душ',
          pn: '/ˈʃaʊə/',
          transcr: 'шауэ'
        },
        {
          e: '📶',
          en: 'Wi-Fi',
          ru: 'Wi-Fi',
          uz: 'Wi-Fi',
          tj: 'Wi-Fi',
          kg: 'Wi-Fi',
          kz: 'Wi-Fi',
          pn: '/ˈwaɪ faɪ/',
          transcr: 'вай фай'
        },
        {
          e: '🧊',
          en: 'fridge',
          ru: 'холодильник',
          uz: 'muzlatgich',
          tj: 'яхдон',
          kg: 'муздаткыч',
          kz: 'тоңазытқыш',
          pn: '/frɪdʒ/',
          transcr: 'фридж'
        },
        {
          e: '🥘',
          en: 'cooker',
          ru: 'плита',
          uz: 'plita',
          tj: 'печ',
          kg: 'меш',
          kz: 'пеш',
          pn: '/ˈkʊkə/',
          transcr: 'кукэ'
        },
        {
          e: '📺',
          en: 'microwave',
          ru: 'микроволновка',
          uz: 'mikroto\\'lqinli pech',
          tj: 'микроволновка',
          kg: 'микротолкундуу меш',
          kz: 'қысқа толқынды пеш',
          pn: '/ˈmaɪkrəweɪv/',
          transcr: 'майкрэуэйв'
        },
        {
          e: '🌀',
          en: 'washing machine',
          ru: 'стиральная машина',
          uz: 'kir yuvish mashinasi',
          tj: 'мошини ҷомашӯӣ',
          kg: 'кир жуугуч машина',
          kz: 'кір жуғыш машина',
          pn: '/ˈwɒʃɪŋ məˈʃiːn/',
          transcr: 'уошин мэшин'
        },
        {
          e: '🍽️',
          en: 'table',
          ru: 'стол',
          uz: 'stol',
          tj: 'миз',
          kg: 'стол',
          kz: 'үстел',
          pn: '/ˈteɪbl/',
          transcr: 'тэйбл'
        },
        {
          e: '🪑',
          en: 'chair',
          ru: 'стул',
          uz: 'stul',
          tj: 'курсӣ',
          kg: 'отургуч',
          kz: 'орындық',
          pn: '/tʃeə/',
          transcr: 'чеэ'
        },
        {
          e: '🚪',
          en: 'wardrobe',
          ru: 'шкаф',
          uz: 'shkaf',
          tj: 'ҷевон',
          kg: 'шкаф',
          kz: 'шкаф',
          pn: '/ˈwɔːdrəʊb/',
          transcr: 'уодроуб'
        },
        {
          e: '🚰',
          en: 'sink',
          ru: 'раковина',
          uz: 'rakovina',
          tj: 'ҳавзак',
          kg: 'раковина',
          kz: 'раковина',
          pn: '/sɪŋk/',
          transcr: 'синк'
        },
        {
          e: '🔲',
          en: 'blanket',
          ru: 'одеяло',
          uz: 'adyol',
          tj: 'кӯрпа',
          kg: 'одеял',
          kz: 'көрпе',
          pn: '/ˈblæŋkɪt/',
          transcr: 'блэнкит'
        },
        {
          e: '☁️',
          en: 'pillow',
          ru: 'подушка',
          uz: 'yostiq',
          tj: 'болишт',
          kg: 'жаздык',
          kz: 'жастық',
          pn: '/ˈpɪləʊ/',
          transcr: 'пилоу'
        },
        {
          e: '🧖',
          en: 'towel',
          ru: 'полотенце',
          uz: 'sochiq',
          tj: 'дастмол',
          kg: 'сүлгү',
          kz: 'сүлгі',
          pn: '/ˈtaʊəl/',
          transcr: 'тауэл'
        },
        {
          e: '🛏️',
          en: 'mattress',
          ru: 'матрас',
          uz: 'matras',
          tj: 'матрас',
          kg: 'матрас',
          kz: 'матрас',
          pn: '/ˈmætrəs/',
          transcr: 'мэтрэс'
        },
        {
          e: '🔌',
          en: 'socket',
          ru: 'розетка',
          uz: 'rozetka',
          tj: 'розетка',
          kg: 'розетка',
          kz: 'розетка',
          pn: '/ˈsɒkɪt/',
          transcr: 'сокит'
        },
        {
          e: '💨',
          en: 'gas',
          ru: 'газ',
          uz: 'gaz',
          tj: 'газ',
          kg: 'газ',
          kz: 'газ',
          pn: '/ɡæs/',
          transcr: 'гэс'
        },
        {
          e: '⚡',
          en: 'electricity',
          ru: 'электричество',
          uz: 'elektr energiyasi',
          tj: 'барқ',
          kg: 'электр жарыгы',
          kz: 'электр энергиясы',
          pn: '/ɪˌlekˈtrɪsəti/',
          transcr: 'илектрисити'
        },
        {
          e: '🗑️',
          en: 'rubbish',
          ru: 'мусор',
          uz: 'axlat',
          tj: 'ахлот',
          kg: 'таштанды',
          kz: 'қоқыс',
          pn: '/ˈrʌbɪʃ/',
          transcr: 'рабиш'
        },
        {
          e: '🔊',
          en: 'noisy',
          ru: 'шумный',
          uz: 'shovqinli',
          tj: 'пурғавғо',
          kg: 'ызы-чуу',
          kz: 'шулы',
          pn: '/ˈnɔɪzi/',
          transcr: 'нойзи'
        },
        {
          e: '🤫',
          en: 'quiet',
          ru: 'тихий',
          uz: 'tinch',
          tj: 'ором',
          kg: 'тынч',
          kz: 'тыныш',
          pn: '/ˈkwaɪət/',
          transcr: 'куайэт'
        },
        {
          e: '🌕',
          en: 'full',
          ru: 'полный',
          uz: 'to\\'la',
          tj: 'пур',
          kg: 'толук',
          kz: 'толық',
          pn: '/fʊl/',
          transcr: 'фул'
        },
        {
          e: '🌑',
          en: 'empty',
          ru: 'пустой',
          uz: 'bo\\'sh',
          tj: 'холӣ',
          kg: 'бош',
          kz: 'бос',
          pn: '/ˈempti/',
          transcr: 'эмпти'
        },
        {
          e: '🛠️',
          en: 'repair',
          ru: 'ремонт',
          uz: 'ta\\'mirlash',
          tj: 'таъмир',
          kg: 'оңдоо',
          kz: 'жөндеу',
          pn: '/rɪˈpeə/',
          transcr: 'рипеэ'
        }
      ],
      dialogue: [
        {
          s: 'w',
          en: 'Excuse me. Are you the camp manager? I have some problems in my caravan.',
          ru: 'Извините. Вы менеджер кэмпа? У меня есть некоторые проблемы в вагончике.',
          uz: 'Kechirasiz. Siz lager menejerimisiz? Mening karavonimda ba\\'zi muammolar bor.',
          tj: 'Бубахшед. Шумо мудири лагер ҳастед? Ман дар кабинаам баъзе мушкилот дорам.',
          kg: 'Кечириңиз. Сиз лагердин менеджерисизби? Менин кабинамда кээ бир көйгөйлөр бар.',
          kz: 'Кешіріңіз. Сіз лагерь менеджерісіз бе? Менің вагончигімде кейбір мәселелер бар.',
          transcr: 'Икскьюз ми. А ю зэ кэмп мэниджэ? Ай хэв сам проблемз ин май кэрэвэн.'
        },
        {
          s: 'm',
          en: 'Yes, I am. What is the problem?',
          ru: 'Да, это я. В чём проблема?',
          uz: 'Ha, men. Muammo nima?',
          tj: 'Бале, ман ҳастам. Мушкилот чист?',
          kg: 'Ооба, мен. Маселе эмнеде?',
          kz: 'Иә, мен. Мәселе неде?',
          transcr: 'Йес, ай эм. Уот из зэ проблем?'
        },
        {
          s: 'w',
          en: 'There isn\\'t any hot water in the bathroom. And the fridge is broken.',
          ru: 'В ванной нет горячей воды. И холодильник сломан.',
          uz: 'Hammomda issiq suv yo\\'q. Va muzlatgich singan.',
          tj: 'Дар ҳаммом оби гарм нест. Ва яхдон шикастааст.',
          kg: 'Жуунуучу бөлмөдө ысык суу жок. Жана муздаткыч бузулган.',
          kz: 'Жуынатын бөлмеде ыстық су жоқ. Және тоңазытқыш бұзылған.',
          transcr: 'Зеэр изнт эни хот уотэ ин зэ басрум. Энд зэ фридж из броукэн.'
        },
        {
          s: 'm',
          en: 'I am sorry. Is there electricity?',
          ru: 'Мне жаль. Электричество есть?',
          uz: 'Kechirasiz. Elektr bormi?',
          tj: 'Бубахшед. Барқ ҳаст?',
          kg: 'Кечиресиз. Электр жарыгы барбы?',
          kz: 'Кешіріңіз. Электр энергиясы бар ма?',
          transcr: 'Ай эм сори. Из зеэр илектрисити?'
        },
        {
          s: 'w',
          en: 'Yes, there is electricity. But we haven\\'t got any clean towels.',
          ru: 'Да, электричество есть. Но у нас нет чистых полотенец.',
          uz: 'Ha, elektr bor. Lekin bizda toza sochiqlar yo\\'q.',
          tj: 'Бале, барқ ҳаст. Аммо мо дастмолҳои тоза надорем.',
          kg: 'Ооба, электр жарыгы бар. Бирок бизде таза сүлгүлөр жок.',
          kz: 'Иә, электр бар. Бірақ бізде таза сүлгілер жоқ.',
          transcr: 'Йес, зеэр из илектрисити. Бат уи хэвнт гот эни клин тауэлз.'
        },
        {
          s: 'm',
          en: 'I will give you some towels and blankets. Are there any other problems?',
          ru: 'Я дам вам полотенца и одеяла. Есть еще какие-нибудь проблемы?',
          uz: 'Men sizga sochiqlar va adyollar beraman. Boshqa muammolar bormi?',
          tj: 'Ман ба шумо дастмолҳо ва кӯрпаҳо медиҳам. Дигар мушкилот ҳаст?',
          kg: 'Мен сизге сүлгү жана одеялдар берем. Башка көйгөйлөр барбы?',
          kz: 'Мен сізге сүлгілер мен көрпелер беремін. Басқа мәселелер бар ма?',
          transcr: 'Ай уил гив ю сам тауэлз энд блэнкетс. А зеэр эни азэ проблемз?'
        },
        {
          s: 'w',
          en: 'Yes. The washing machine in the laundry is very noisy.',
          ru: 'Да. Стиральная машина в прачечной очень шумная.',
          uz: 'Ha. Kir yuvish xonasidagi kir yuvish mashinasi juda shovqinli.',
          tj: 'Бале. Мошини ҷомашӯӣ дар ҷомашӯйхона хеле пурғавғо аст.',
          kg: 'Ооба. Кир жуучу жайдагы кир жуугуч машина абдан ызы-чуу.',
          kz: 'Иә. Кір жуатын бөлмедегі кір жуғыш машина өте шулы.',
          transcr: 'Йес. Зэ уошин мэшин ин зэ лондри из вери нойзи.'
        },
        {
          s: 'm',
          en: 'Okay, I will call a mechanic for a repair today.',
          ru: 'Хорошо, я вызову механика для ремонта сегодня.',
          uz: 'Yaxshi, men bugun ta\\'mirlash uchun mexanik chaqiraman.',
          tj: 'Хуб, ман имрӯз механикро барои таъмир даъват мекунам.',
          kg: 'Макул, мен бүгүн оңдоо үчүн механикти чакырам.',
          kz: 'Жақсы, мен бүгін жөндеу үшін механик шақырамын.',
          transcr: 'Оукей, ай уил кол э микэник фо э рипеэ тэдэй.'
        },
        {
          s: 'w',
          en: 'Thank you. The rubbish bin is full too.',
          ru: 'Спасибо. Мусорное ведро тоже полное.',
          uz: 'Rahmat. Axlat qutisi ham to\\'la.',
          tj: 'Ташаккур. Қуттии партов низ пур аст.',
          kg: 'Рахмат. Таштанды челеги да толук.',
          kz: 'Рақмет. Қоқыс шелегі де толық.',
          transcr: 'Сэнк ю. Зэ рабиш бин из фул ту.'
        },
        {
          s: 'm',
          en: 'Please take the rubbish out to the big bin. Have a good day!',
          ru: 'Пожалуйста, вынесите мусор в большой бак. Хорошего дня!',
          uz: 'Iltimos, axlatni katta qutiga olib chiqing. Yaxshi kun tilayman!',
          tj: 'Лутфан, ахлотро ба қуттии калон бароред. Рӯзи хуб!',
          kg: 'Сураныч, таштандыны чоң челекке чыгарып салыңыз. Күнүңүз жакшы өтсүн!',
          kz: 'Өтінемін, қоқысты үлкен жәшікке шығарыңыз. Күніңіз сәтті өтсін!',
          transcr: 'Плиз тэйк зэ рабиш аут ту зэ биг бин. Хэв э гуд дэй!'
        }
      ],
      quiz: [
        {
          q: '\\'___ a heater in my caravan.\\' (1 thing)',
          opts: [
            'There are',
            'Is there',
            'There is',
            'Are there'
          ],
          c: 2,
          hint_ru: 'Обогреватель (a heater) — это единственное число, поэтому используем There is'
        },
        {
          q: '\\'___ any hot water.\\' (negative)',
          opts: [
            'There is any',
            'There isn\\'t some',
            'There isn\\'t any',
            'There aren\\'t any'
          ],
          c: 2,
          hint_ru: 'Вода (неисчисляемое) работает как единственное число, в отрицании будет isn\\'t any'
        },
        {
          q: '\\'Are there ___ blankets?\\' (question)',
          opts: [
            'some',
            'any',
            'a',
            'the'
          ],
          c: 1,
          hint_ru: 'В вопросах мы всегда используем any'
        },
        {
          q: 'How to translate \\'холодильник\\'? (fridge)',
          opts: [
            'fridge',
            'cooker',
            'wardrobe',
            'sink'
          ],
          c: 0,
          hint_ru: 'Fridge'
        },
        {
          q: '\\'There are ___ noisy people in the corridor.\\' (affirmative)',
          opts: [
            'some',
            'any',
            'is',
            'a'
          ],
          c: 0,
          hint_ru: 'В утверждениях со множественным числом используем some'
        },
        {
          q: 'What is the opposite of \\'full\\'? (полный)',
          opts: [
            'noisy',
            'empty',
            'quiet',
            'broken'
          ],
          c: 1,
          hint_ru: 'Антоним слова "полный" — "пустой" (empty)'
        },
        {
          q: '\\'___ any chairs in the kitchen?\\' (question, plural)',
          opts: [
            'Is there',
            'Are there',
            'There are',
            'There is'
          ],
          c: 1,
          hint_ru: 'Chairs — множественное число, вопрос начинается с Are there'
        },
        {
          q: 'Where do you wash your clothes? (стирать)',
          opts: [
            'kitchen',
            'bedroom',
            'laundry',
            'caravan'
          ],
          c: 2,
          hint_ru: 'Прачечная по-английски laundry'
        },
        {
          q: '\\'The room is not quiet, it is very ___!\\' (шумно)',
          opts: [
            'empty',
            'clean',
            'noisy',
            'safe'
          ],
          c: 2,
          hint_ru: 'Не тихая (not quiet) значит шумная (noisy)'
        },
        {
          q: '\\'I need a repair. The cooker is ___!\\' (сломана)',
          opts: [
            'broken',
            'full',
            'safe',
            'new'
          ],
          c: 0,
          hint_ru: 'Если нужен ремонт (repair), значит вещь сломана (broken)'
        }
      ]
    }`;

text_replaced = text.replace(/    \{\s*id: 9,[\s\S]*?(?=\s*\{\s*id: 10,)/, l9 + '\n');
fs.writeFileSync('a1.html', text_replaced);
console.log('Successfully replaced Lesson 9!');
