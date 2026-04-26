const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');

const l14 = `    {
      id: 14,
      mod: 6,
      name_ru: 'Могу я помочь вам?',
      name_uz: 'Yordam bera olamanmi?',
      name_tj: 'Оё метавонам кӯмак кунам?',
      name_kg: 'Жардам бере аламбы?',
      name_kz: 'Сізге көмектесе аламын ба?',
      cefr: 'Health & Medicine · Phrasal verbs (call in sick) · Offering help (Can I help you?)',
      grammar: {
        title_ru: 'Здоровье + Модальный глагол CAN (Могу)',
        title_uz: 'Sog\\'liq + CAN modal fe\\'li (Qila olmoq)',
        title_tj: 'Саломатӣ + Феъли модалии CAN (Тавонистан)',
        title_kg: 'Ден соолук + CAN модалдык этиши (Кыла алам)',
        title_kz: 'Денсаулық + CAN модальді етістігі (Жасай аламын)',
        rule_ru: 'Модальный глагол <b>can</b> означает "мочь", "уметь" или используется для просьб.<br>Утверждение: <code>I can work.</code> (Я могу работать).<br>Отрицание: <code>I cannot / can\\'t work.</code> (Я не могу работать).<br>Вопрос/Предложение: <code>Can I help you?</code> (Могу я помочь?)<br>Полезные фразы: <code>I feel sick.</code> (Меня тошнит/Я болен). <code>My head hurts.</code> (У меня болит голова).',
        rule_uz: '<b>can</b> modal fe\\'li "qila olmoq" degan ma\\'noni anglatadi yoki iltimoslar uchun ishlatiladi.<br>Tasdiq: <code>I can work.</code> (Men ishlay olaman).<br>Inkor: <code>I cannot / can\\'t work.</code> (Men ishlay olmayman).<br>So\\'roq: <code>Can I help you?</code> (Sizga yordam bera olamanmi?)',
        rule_tj: 'Феъли модалии <b>can</b> маънои "тавонистан"-ро дорад ё барои хоҳишҳо истифода мешавад.<br>Тасдиқ: <code>I can work.</code> (Ман кор карда метавонам).<br>Инкор: <code>I cannot / can\\'t work.</code> (Ман кор карда наметавонам).<br>Савол: <code>Can I help you?</code> (Оё метавонам кӯмак кунам?)',
        rule_kg: '<b>can</b> модалдык этиши "кыла алам" дегенди билдирет же суранычтар үчүн колдонулат.<br>Ырастоо: <code>I can work.</code> (Мен иштей алам).<br>Жокко чыгаруу: <code>I cannot / can\\'t work.</code> (Мен иштей албайм).<br>Суроо: <code>Can I help you?</code> (Жардам бере аламбы?)',
        rule_kz: '<b>can</b> модальді етістігі "жасай алу" дегенді білдіреді немесе өтініштер үшін қолданылады.<br>Болымды: <code>I can work.</code> (Мен жұмыс істей аламын).<br>Болымсыз: <code>I cannot / can\\'t work.</code> (Мен жұмыс істей алмаймын).<br>Сұрақ: <code>Can I help you?</code> (Сізге көмектесе аламын ба?)',
        tables: [
          {
            title: '✅ Affirmative (Утверждение)',
            rows: [
              {
                subj: 'I / You / He / She',
                verb: 'can',
                example: 'You can take a tablet.',
                transcr: 'Ю кэн тэйк э тэблит',
                tr_ru: 'Вы можете выпить таблетку',
                tr_uz: 'Siz tabletka ichishingiz mumkin',
                tr_tj: 'Шумо метавонед ҳаб гиред',
                tr_kg: 'Сиз таблетка ичсеңиз болот',
                tr_kz: 'Сіз дәрі іше аласыз'
              }
            ]
          },
          {
            title: '❌ Negative (Отрицание)',
            rows: [
              {
                subj: 'I / You / He / She',
                verb: 'cannot / can\\'t',
                example: 'I can\\'t go to work today.',
                transcr: 'Ай кант гоу ту уёк тудэй',
                tr_ru: 'Я не могу пойти на работу сегодня',
                tr_uz: 'Bugun ishga bora olmayman',
                tr_tj: 'Ман имрӯз ба кор рафта наметавонам',
                tr_kg: 'Мен бүгүн жумушка бара албайм',
                tr_kz: 'Мен бүгін жұмысқа бара алмаймын'
              }
            ]
          },
          {
            title: '❓ Question (Вопрос / Предложение)',
            rows: [
              {
                subj: 'Can',
                verb: 'I / you',
                example: 'Can you call a doctor?',
                transcr: 'Кэн ю кол э доктэ?',
                tr_ru: 'Вы можете вызвать врача?',
                tr_uz: 'Siz shifokor chaqira olasizmi?',
                tr_tj: 'Шумо метавонед табибро ҷеғ занед?',
                tr_kg: 'Дарыгерди чакыра аласызбы?',
                tr_kz: 'Сіз дәрігер шақыра аласыз ба?'
              }
            ]
          }
        ],
        examples: [
          {
            en: 'I feel sick and I have a fever. I can\\'t work today.',
            ru: 'Меня тошнит, и у меня жар. Я не могу работать сегодня.',
            uz: 'Ko\\'nglim ayniyapti va isitmam bor. Bugun ishlay olmayman.',
            tj: 'Дилбеҳузурӣ ва таб дорам. Имрӯз кор карда наметавонам.',
            kg: 'Көңүлүм айланып, ысытмам бар. Бүгүн иштей албайм.',
            kz: 'Жүрегім айнып, қызуым көтерілді. Мен бүгін жұмыс істей алмаймын.'
          },
          {
            en: 'My back hurts. Can you give me a paracetamol?',
            ru: 'У меня болит спина. Можете дать мне парацетамол?',
            uz: 'Belim og\\'riyapti. Menga paratsetamol bera olasizmi?',
            tj: 'Пуштам дард мекунад. Метавонед ба ман паратетамол диҳед?',
            kg: 'Аркам ооруп жатат. Мага парацетамол бере аласызбы?',
            kz: 'Арқам ауырып тұр. Маған парацетамол бере аласыз ба?'
          },
          {
            en: 'Can I help you? Yes, I have a bad headache.',
            ru: 'Могу я вам помочь? Да, у меня сильная головная боль.',
            uz: 'Sizga yordam bera olamanmi? Ha, boshim qattiq og\\'riyapti.',
            tj: 'Метавонам кӯмак кунам? Бале, ман дарди шадиди сар дорам.',
            kg: 'Сизге жардам бере аламбы? Ооба, башым катуу ооруп жатат.',
            kz: 'Сізге көмектесе аламын ба? Иә, басым қатты ауырып тұр.'
          },
          {
            en: 'I need to call in sick. I have the flu.',
            ru: 'Мне нужно отпроситься по болезни. У меня грипп.',
            uz: 'Men kasallik sababli ishdan ruxsat so\\'rashim kerak. Menda gripp.',
            tj: 'Ман бояд бо сабаби беморӣ ҷавоб гирам. Ман зуком дорам.',
            kg: 'Ооруп калганымды билдиришим керек. Менде грипп.',
            kz: 'Мен ауырып қалғаныма байланысты сұрануым керек. Менде тұмау.'
          },
          {
            en: 'You can go to the GP surgery or the hospital.',
            ru: 'Вы можете пойти в поликлинику или в больницу.',
            uz: 'Siz poliklinikaga yoki shifoxonaga borishingiz mumkin.',
            tj: 'Шумо метавонед ба дармонгоҳ ё беморхона равед.',
            kg: 'Сиз бейтапканага же ооруканага бара аласыз.',
            kz: 'Сіз емханаға немесе ауруханаға бара аласыз.'
          },
          {
            en: 'He cut his finger. Can you bring a plaster and a bandage?',
            ru: 'Он порезал палец. Можешь принести пластырь и бинт?',
            uz: 'U barmog\\'ini kesib oldi. Plastir va bint olib kela olasizmi?',
            tj: 'Ӯ ангушташро бурид. Метавонед пластыр ва бинт биёред?',
            kg: 'Ал манжасын кесип алды. Пластырь жана таңгыч алып келе аласызбы?',
            kz: 'Ол саусағын кесіп алды. Пластырь мен таңғыш әкеле аласыз ба?'
          },
          {
            en: 'Take this medicine and rest for two days.',
            ru: 'Примите это лекарство и отдыхайте два дня.',
            uz: 'Bu dorini iching va ikki kun dam oling.',
            tj: 'Ин доруро гиред ва ду рӯз истироҳат кунед.',
            kg: 'Бул дарыны ичип, эки күн эс алыңыз.',
            kz: 'Бұл дәріні ішіп, екі күн демалыңыз.'
          },
          {
            en: 'My leg hurts. I can\\'t walk to the field.',
            ru: 'У меня болит нога. Я не могу дойти до поля.',
            uz: 'Oyog\\'im og\\'riyapti. Dalagacha yura olmayman.',
            tj: 'Пойам дард мекунад. Ман то майдон рафта наметавонам.',
            kg: 'Бутум ооруп жатат. Талаага чейин баса албайм.',
            kz: 'Аяғым ауырып тұр. Егістікке дейін жүре алмаймын.'
          },
          {
            en: 'She has a toothache. She must see a doctor.',
            ru: 'У нее зубная боль. Ей нужно к врачу.',
            uz: 'Uning tishi og\\'riyapti. U shifokorga ko\\'rinishi kerak.',
            tj: 'Ӯ дарди дандон дорад. Вай бояд ба духтур муроҷиат кунад.',
            kg: 'Анын тиши ооруп жатат. Ал дарыгерге көрүнүшү керек.',
            kz: 'Оның тісі ауырып тұр. Ол дәрігерге қаралуы керек.'
          },
          {
            en: 'My stomach hurts, but I don\\'t have a cough.',
            ru: 'У меня болит живот, но кашля нет.',
            uz: 'Oshqozonim og\\'riyapti, lekin yo\\'talim yo\\'q.',
            tj: 'Меъдаам дард мекунад, аммо ман сулфа надорам.',
            kg: 'Ашказаным ооруп жатат, бирок жөтөлүм жок.',
            kz: 'Асқазаным ауырып тұр, бірақ жөтелім жоқ.'
          }
        ]
      },
      words: [
        {
          e: '🤕',
          en: 'head',
          ru: 'голова',
          uz: 'bosh',
          tj: 'сар',
          kg: 'баш',
          kz: 'бас',
          pn: '/hed/',
          transcr: 'хэд'
        },
        {
          e: '🚶‍♂️',
          en: 'back',
          ru: 'спина',
          uz: 'orqa',
          tj: 'пушт',
          kg: 'арка',
          kz: 'арқа',
          pn: '/bæk/',
          transcr: 'бэк'
        },
        {
          e: '💪',
          en: 'arm',
          ru: 'рука',
          uz: 'qo\\'l',
          tj: 'даст',
          kg: 'кол',
          kz: 'қол',
          pn: '/ɑːm/',
          transcr: 'ам'
        },
        {
          e: '🖐️',
          en: 'hand',
          ru: 'кисть руки',
          uz: 'kaft',
          tj: 'панҷа',
          kg: 'кол чеңгели',
          kz: 'қол басы',
          pn: '/hænd/',
          transcr: 'хэнд'
        },
        {
          e: '🦵',
          en: 'leg',
          ru: 'нога',
          uz: 'oyoq',
          tj: 'пой',
          kg: 'бут',
          kz: 'аяқ',
          pn: '/leɡ/',
          transcr: 'лэг'
        },
        {
          e: '🦶',
          en: 'foot',
          ru: 'стопа',
          uz: 'tovon',
          tj: 'қадам',
          kg: 'таман',
          kz: 'табан',
          pn: '/fʊt/',
          transcr: 'фут'
        },
        {
          e: '👆',
          en: 'finger',
          ru: 'палец',
          uz: 'barmoq',
          tj: 'ангушт',
          kg: 'манжа',
          kz: 'саусақ',
          pn: '/ˈfɪŋɡə/',
          transcr: 'фингэ'
        },
        {
          e: '👁️',
          en: 'eye',
          ru: 'глаз',
          uz: 'ko\\'z',
          tj: 'чашм',
          kg: 'көз',
          kz: 'көз',
          pn: '/aɪ/',
          transcr: 'ай'
        },
        {
          e: '🤰',
          en: 'stomach',
          ru: 'живот',
          uz: 'oshqozon',
          tj: 'меъда',
          kg: 'ашказан',
          kz: 'асқазан',
          pn: '/ˈstʌmək/',
          transcr: 'стамэк'
        },
        {
          e: '🤢',
          en: 'sick',
          ru: 'больной / тошнит',
          uz: 'kasal / ko\\'ngil aynish',
          tj: 'бемор / дилбеҳузурӣ',
          kg: 'оору / көңүл айнуу',
          kz: 'ауру / жүрек айну',
          pn: '/sɪk/',
          transcr: 'сик'
        },
        {
          e: '🤒',
          en: 'ill',
          ru: 'больной',
          uz: 'kasal',
          tj: 'бемор',
          kg: 'оору',
          kz: 'науқас',
          pn: '/ɪl/',
          transcr: 'ил'
        },
        {
          e: '😣',
          en: 'pain',
          ru: 'боль',
          uz: 'og\\'riq',
          tj: 'дард',
          kg: 'оору',
          kz: 'ауру',
          pn: '/peɪn/',
          transcr: 'пэйн'
        },
        {
          e: '💆',
          en: 'headache',
          ru: 'головная боль',
          uz: 'bosh og\\'rig\\'i',
          tj: 'дарди сар',
          kg: 'баш оору',
          kz: 'бас ауруы',
          pn: '/ˈhedeɪk/',
          transcr: 'хэдэйк'
        },
        {
          e: '😫',
          en: 'backache',
          ru: 'боль в спине',
          uz: 'bel og\\'rig\\'i',
          tj: 'дарди пушт',
          kg: 'арка оору',
          kz: 'арқа ауруы',
          pn: '/ˈbækeɪk/',
          transcr: 'бэкэйк'
        },
        {
          e: '🦷',
          en: 'toothache',
          ru: 'зубная боль',
          uz: 'tish og\\'rig\\'i',
          tj: 'дарди дандон',
          kg: 'тиш оору',
          kz: 'тіс ауруы',
          pn: '/ˈtuːθeɪk/',
          transcr: 'тусэйк'
        },
        {
          e: '🌡️',
          en: 'fever',
          ru: 'жар / температура',
          uz: 'isitma',
          tj: 'таб',
          kg: 'ысытма',
          kz: 'ыстық',
          pn: '/ˈfiːvə/',
          transcr: 'фивэ'
        },
        {
          e: '😷',
          en: 'cough',
          ru: 'кашель',
          uz: 'yo\\'tal',
          tj: 'сулфа',
          kg: 'жөтөл',
          kz: 'жөтел',
          pn: '/kɒf/',
          transcr: 'коф'
        },
        {
          e: '🤧',
          en: 'flu',
          ru: 'грипп',
          uz: 'gripp',
          tj: 'зуком',
          kg: 'грипп',
          kz: 'тұмау',
          pn: '/fluː/',
          transcr: 'флу'
        },
        {
          e: '👨‍⚕️',
          en: 'doctor',
          ru: 'врач',
          uz: 'shifokor',
          tj: 'табиб',
          kg: 'дарыгер',
          kz: 'дәрігер',
          pn: '/ˈdɒktə/',
          transcr: 'доктэ'
        },
        {
          e: '🏥',
          en: 'GP surgery',
          ru: 'поликлиника',
          uz: 'poliklinika',
          tj: 'дармонгоҳ',
          kg: 'бейтапкана',
          kz: 'емхана',
          pn: '/ˌdʒiː ˈpiː ˈsɜːdʒəri/',
          transcr: 'джи пи сёджэри'
        },
        {
          e: '🚑',
          en: 'hospital',
          ru: 'больница',
          uz: 'shifoxona',
          tj: 'беморхона',
          kg: 'оорукана',
          kz: 'аурухана',
          pn: '/ˈhɒspɪtl/',
          transcr: 'хоспитл'
        },
        {
          e: '💊',
          en: 'medicine',
          ru: 'лекарство',
          uz: 'dori',
          tj: 'дору',
          kg: 'дары',
          kz: 'дәрі',
          pn: '/ˈmedsn/',
          transcr: 'мэдсн'
        },
        {
          e: '⚪',
          en: 'tablet',
          ru: 'таблетка',
          uz: 'tabletka',
          tj: 'ҳаб',
          kg: 'таблетка',
          kz: 'дәрі',
          pn: '/ˈtæblət/',
          transcr: 'тэблит'
        },
        {
          e: '🩹',
          en: 'paracetamol',
          ru: 'парацетамол',
          uz: 'paratsetamol',
          tj: 'паратетамол',
          kg: 'парацетамол',
          kz: 'парацетамол',
          pn: '/ˌpærəˈsiːtəmɒl/',
          transcr: 'пэрэситэмол'
        },
        {
          e: '🤕',
          en: 'hurt',
          ru: 'болеть / поранить',
          uz: 'og\\'rimoq',
          tj: 'дард кардан',
          kg: 'ооруу',
          kz: 'ауыру',
          pn: '/hɜːt/',
          transcr: 'хёт'
        },
        {
          e: '😞',
          en: 'feel / felt',
          ru: 'чувствовать / чувствовал',
          uz: 'his qilmoq',
          tj: 'ҳис кардан',
          kg: 'сезүү',
          kz: 'сезу',
          pn: '/fiːl / felt/',
          transcr: 'фил / фэлт'
        },
        {
          e: '📱',
          en: 'call in sick',
          ru: 'отпроситься по болезни',
          uz: 'kasallik sababli ishdan ruxsat so\\'ramoq',
          tj: 'бо сабаби беморӣ ҷавоб гирифтан',
          kg: 'ооруп калганын билдирүү',
          kz: 'ауырып қалуына байланысты сұрану',
          pn: '/kɔːl ɪn sɪk/',
          transcr: 'кол ин сик'
        },
        {
          e: '🛏️',
          en: 'rest',
          ru: 'отдыхать',
          uz: 'dam olmoq',
          tj: 'истироҳат кардан',
          kg: 'эс алуу',
          kz: 'демалу',
          pn: '/rest/',
          transcr: 'рэст'
        },
        {
          e: '🧻',
          en: 'bandage',
          ru: 'бинт',
          uz: 'bint',
          tj: 'бинт',
          kg: 'таңгыч',
          kz: 'таңғыш',
          pn: '/ˈbændɪdʒ/',
          transcr: 'бэндидж'
        },
        {
          e: '🩹',
          en: 'plaster',
          ru: 'пластырь',
          uz: 'plastir',
          tj: 'пластыр',
          kg: 'пластырь',
          kz: 'гипс / пластырь',
          pn: '/ˈplɑːstə/',
          transcr: 'пластэ'
        }
      ],
      dialogue: [
        {
          s: 'w',
          en: 'Hello, boss. This is Ahmad. I need to call in sick today.',
          ru: 'Алло, босс. Это Ахмад. Мне нужно отпроситься сегодня по болезни.',
          uz: 'Salom, boshliq. Bu Ahmad. Men bugun kasallik sababli ishdan ruxsat so\\'rashim kerak.',
          tj: 'Салом, сардор. Ин Аҳмад. Ман имрӯз бояд бо сабаби беморӣ ҷавоб гирам.',
          kg: 'Саламатсызбы, башчы. Бул Ахмад. Мен бүгүн ооруп калганымды билдиришим керек.',
          kz: 'Сәлеметсіз бе, бастық. Бұл Ахмад. Мен бүгін ауырып қалуыма байланысты сұрануым керек.',
          transcr: 'Хэлоу, бос. Зис из Ахмад. Ай нид ту кол ин сик тудэй.'
        },
        {
          s: 'm',
          en: 'Oh, I\\'m sorry to hear that. What is the problem?',
          ru: 'О, мне жаль это слышать. В чем проблема?',
          uz: 'Oh, buni eshitishdan afsusdaman. Muammo nimada?',
          tj: 'Оҳ, аз шунидани ин афсӯс мехӯрам. Муаммо чист?',
          kg: 'Ок, муну укканыма өкүнүчтүүмүн. Көйгөй эмнеде?',
          kz: 'О, мұны естігеніме өкініштімін. Мәселе неде?',
          transcr: 'Оу, айм сори ту хиэ зэт. Уот из зэ проблэм?'
        },
        {
          s: 'w',
          en: 'I feel very sick. I have a headache and a fever.',
          ru: 'Я чувствую себя очень больным. У меня головная боль и жар.',
          uz: 'O\\'zimni juda yomon his qilyapman. Boshim og\\'riyapti va isitmam bor.',
          tj: 'Ман худро хеле бемор ҳис мекунам. Ман дарди сар ва таб дорам.',
          kg: 'Өзүмдү абдан жаман сезип жатам. Башым ооруп, ысытмам бар.',
          kz: 'Мен өзімді өте нашар сезініп тұрмын. Басым ауырып, қызуым бар.',
          transcr: 'Ай фил вэри сик. Ай хэв э хэдэйк энд э фивэ.'
        },
        {
          s: 'm',
          en: 'Do you have a cough or a backache?',
          ru: 'У тебя есть кашель или боль в спине?',
          uz: 'Sizda yo\\'tal yoki bel og\\'rig\\'i bormi?',
          tj: 'Оё шумо сулфа ё дарди пушт доред?',
          kg: 'Сизде жөтөл же арка оору барбы?',
          kz: 'Сізде жөтел немесе арқа ауруы бар ма?',
          transcr: 'Ду ю хэв э коф о э бэкэйк?'
        },
        {
          s: 'w',
          en: 'Yes, my back hurts too. I can\\'t work today.',
          ru: 'Да, спина тоже болит. Я не могу работать сегодня.',
          uz: 'Ha, belim ham og\\'riyapti. Bugun ishlay olmayman.',
          tj: 'Бале, пуштам ҳам дард мекунад. Ман имрӯз кор карда наметавонам.',
          kg: 'Ооба, аркам да ооруп жатат. Мен бүгүн иштей албайм.',
          kz: 'Иә, арқам да ауырып тұр. Мен бүгін жұмыс істей алмаймын.',
          transcr: 'Йес, май бэк хётс ту. Ай кант уёк тудэй.'
        },
        {
          s: 'm',
          en: 'Okay, Ahmad. You must rest in your room. Can I help you?',
          ru: 'Хорошо, Ахмад. Ты должен отдыхать в своей комнате. Могу я тебе помочь?',
          uz: 'Yaxshi, Ahmad. Xonangizda dam olishingiz kerak. Sizga yordam bera olamanmi?',
          tj: 'Хуб, Аҳмад. Шумо бояд дар ҳуҷраи худ истироҳат кунед. Метавонам ба шумо кӯмак кунам?',
          kg: 'Макул, Ахмад. Бөлмөңүздө эс алышыңыз керек. Сизге жардам бере аламбы?',
          kz: 'Жақсы, Ахмад. Бөлмеңізде демалуыңыз керек. Сізге көмектесе аламын ба?',
          transcr: 'Оукей, Ахмад. Ю маст рэст ин ё рум. Кэн ай хэлп ю?'
        },
        {
          s: 'w',
          en: 'Can you bring me some medicine? A paracetamol tablet.',
          ru: 'Можете принести мне лекарство? Таблетку парацетамола.',
          uz: 'Menga biror dori olib kela olasizmi? Paratsetamol tabletkasi.',
          tj: 'Метавонед ба ман дору биёред? Ҳаби паратетамол.',
          kg: 'Мага дары алып келе аласызбы? Парацетамол таблеткасы.',
          kz: 'Маған дәрі әкеле аласыз ба? Парацетамол таблеткасы.',
          transcr: 'Кэн ю брин ми сам мэдсн? Э пэрэситэмол тэблит.'
        },
        {
          s: 'm',
          en: 'Yes, of course. I will ask the camp manager to bring it.',
          ru: 'Да, конечно. Я попрошу менеджера лагеря принести ее.',
          uz: 'Ha, albatta. Lager menejeridan olib kelishini so\\'rayman.',
          tj: 'Бале, албатта. Ман аз менеҷери лагер хоҳиш мекунам, ки онро биёрад.',
          kg: 'Ооба, албетте. Лагерь менеджеринен алып келүүнү суранам.',
          kz: 'Иә, әрине. Лагерь менеджерінен әкелуін сұраймын.',
          transcr: 'Йес, ов кос. Ай уил аск зэ кэмп мэнэджэ ту брин ит.'
        },
        {
          s: 'm',
          en: 'If you feel very ill tomorrow, you can go to the GP surgery.',
          ru: 'Если завтра ты будешь чувствовать себя очень плохо, ты можешь пойти в поликлинику.',
          uz: 'Agar ertaga o\\'zingizni juda yomon his qilsangiz, poliklinikaga borishingiz mumkin.',
          tj: 'Агар фардо худро хеле бемор ҳис кунед, метавонед ба дармонгоҳ равед.',
          kg: 'Эгерде эртең өзүңүздү абдан жаман сезсеңиз, бейтапканага барсаңыз болот.',
          kz: 'Егер ертең өзіңізді өте нашар сезінсеңіз, емханаға бара аласыз.',
          transcr: 'Иф ю фил вэри ил тумороу, ю кэн гоу ту зэ джи-пи сёджэри.'
        },
        {
          s: 'w',
          en: 'Thank you, boss. I will take the medicine and rest.',
          ru: 'Спасибо, босс. Я выпью лекарство и отдохну.',
          uz: 'Rahmat, boshliq. Men dorini ichaman va dam olaman.',
          tj: 'Ташаккур, сардор. Ман дору мегирам ва истироҳат мекунам.',
          kg: 'Рахмат, башчы. Мен дары ичип, эс алам.',
          kz: 'Рақмет, бастық. Мен дәрі ішіп, демаламын.',
          transcr: 'Сэнк ю, бос. Ай уил тэйк зэ мэдсн энд рэст.'
        }
      ],
      quiz: [
        {
          q: '\\'I ___ to work today. I am sick.\\' (не могу)',
          opts: [
            'cannot / can\\'t',
            'can',
            'am not',
            'didn\\'t'
          ],
          c: 0,
          hint_ru: 'Я не могу — I cannot или I can\\'t.'
        },
        {
          q: 'What is a \\'GP surgery\\'? (поликлиника в Англии)',
          opts: [
            'A farm manager',
            'A local doctor clinic',
            'A supermarket',
            'A pharmacy'
          ],
          c: 1,
          hint_ru: 'GP surgery — это местная поликлиника или офис терапевта (General Practitioner).'
        },
        {
          q: 'If your head hurts, you have a...',
          opts: [
            'toothache',
            'backache',
            'headache',
            'flu'
          ],
          c: 2,
          hint_ru: 'Head (голова) + ache (боль) = headache.'
        },
        {
          q: '\\'I need a ___ for my finger.\\' (пластырь)',
          opts: [
            'plaster',
            'tablet',
            'medicine',
            'flu'
          ],
          c: 0,
          hint_ru: 'Пластырь — plaster.'
        },
        {
          q: '\\'Can you bring me some ___?\\' (лекарство)',
          opts: [
            'pain',
            'hurt',
            'fever',
            'medicine'
          ],
          c: 3,
          hint_ru: 'Лекарство — medicine.'
        },
        {
          q: '\\'I feel very ___.\\' (больной)',
          opts: [
            'ill',
            'hurt',
            'pain',
            'health'
          ],
          c: 0,
          hint_ru: 'Больной — ill или sick. (Hurt означает "болеть" про часть тела, pain — "боль").'
        },
        {
          q: '\\'My back ___.\\' (болит)',
          opts: [
            'hurts',
            'pains',
            'ills',
            'sicks'
          ],
          c: 0,
          hint_ru: 'У меня болит спина — My back hurts.'
        },
        {
          q: 'What is the word for \'стопа\'?',
          opts: [
            'leg',
            'foot',
            'arm',
            'hand'
          ],
          c: 1,
          hint_ru: 'Стопа — foot (нога целиком — leg).'
        },
        {
          q: 'To \'call in sick\' means...',
          opts: [
            'To call a doctor',
            'To call your mother',
            'To call work and say you are ill',
            'To ask for paracetamol'
          ],
          c: 2,
          hint_ru: 'Call in sick означает позвонить на работу, чтобы отпроситься по болезни.'
        },
        {
          q: '\\'You must ___ in your room.\\' (отдыхать)',
          opts: [
            'work',
            'rest',
            'hurt',
            'bandage'
          ],
          c: 1,
          hint_ru: 'Отдыхать — rest.'
        }
      ]
    }`;

text_replaced = text.replace(/    \{\s*id: 14,[\s\S]*?(?=\s*\{\s*id: 15,)/, l14 + '\n');
fs.writeFileSync('a1.html', text_replaced);
console.log('Successfully replaced Lesson 14!');
