const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');

const l13 = `    {
      id: 13,
      mod: 6,
      name_ru: 'Вчера я собрал 60 ящиков',
      name_uz: 'Kecha men 60 quti terdim',
      name_tj: 'Дирӯз ман 60 қуттӣ чидам',
      name_kg: 'Кечээ 60 кутуча жыйдым',
      name_kz: 'Кеше мен 60 жәшік жинадым',
      cefr: 'Past Simple regular & irregular · Time expressions · Reporting incidents',
      grammar: {
        title_ru: 'PAST SIMPLE (Отчеты и происшествия)',
        title_uz: 'PAST SIMPLE (Hisobotlar va hodisalar)',
        title_tj: 'PAST SIMPLE (Ҳисоботҳо ва ҳодисаҳо)',
        title_kg: 'PAST SIMPLE (Отчёттор жана окуялар)',
        title_kz: 'PAST SIMPLE (Есептер мен оқиғалар)',
        rule_ru: 'Для описания того, что произошло в прошлом, мы используем <b>Past Simple</b>.<br>Правильные глаголы получают окончание <b>-ed</b> (<code>work → worked</code>, <code>drop → dropped</code>).<br>Неправильные глаголы меняются полностью (<code>go → went</code>, <code>lose → lost</code>). Их нужно выучить.<br>Для отрицания и вопросов используем вспомогательный глагол <b>did</b>. Обратите внимание: после did глагол возвращается в первую форму (V1): <code>I didn\\'t go</code> (не I didn\\'t went).',
        rule_uz: 'O\\'tmishda sodir bo\\'lgan voqealarni tasvirlash uchun biz <b>Past Simple</b> ishlatamiz.<br>To\\'g\\'ri fe\\'llar <b>-ed</b> qo\\'shimchasini oladi (<code>work → worked</code>).<br>Noto\\'g\\'ri fe\\'llar butunlay o\\'zgaradi (<code>go → went</code>, <code>lose → lost</code>). Ularni yodlash kerak.<br>Inkor va so\\'roq uchun <b>did</b> yordamchi fe\\'li ishlatiladi. E\\'tibor bering: did dan keyin fe\\'l birinchi shakliga (V1) qaytadi: <code>I didn\\'t go</code>.',
        rule_tj: 'Барои тавсифи он чизе, ки дар гузашта рӯй дод, мо <b>Past Simple</b> истифода мебарем.<br>Феълҳои мунтазам пасванди <b>-ed</b> мегиранд (<code>work → worked</code>).<br>Феълҳои ғайримунтазам тамоман тағйир меёбанд (<code>go → went</code>, <code>lose → lost</code>).<br>Барои инкор ва савол феъли ёрирасони <b>did</b> истифода мешавад: <code>I didn\\'t go</code>.',
        rule_kg: 'Өткөндө болгон окуяларды сүрөттөө үчүн биз <b>Past Simple</b> колдонобуз.<br>Туура этиштерге <b>-ed</b> мүчөсү уланат (<code>work → worked</code>).<br>Туура эмес этиштер толугу менен өзгөрөт (<code>go → went</code>).<br>Терс маани жана суроо үчүн <b>did</b> жардамчы этиши колдонулат: <code>I didn\\'t go</code>.',
        rule_kz: 'Өткен шақта болған оқиғаларды сипаттау үшін біз <b>Past Simple</b> қолданамыз.<br>Дұрыс етістіктерге <b>-ed</b> жалғанады (<code>work → worked</code>).<br>Бұрыс етістіктер толығымен өзгереді (<code>go → went</code>).<br>Болымсыздық пен сұрақ үшін <b>did</b> көмекші етістігі қолданылады: <code>I didn\\'t go</code>.',
        tables: [
          {
            title: '✅ Affirmative (Утверждение)',
            rows: [
              {
                subj: 'I / He / They',
                verb: 'worked / dropped',
                example: 'He dropped the box.',
                transcr: 'Хи дропт зэ бокс',
                tr_ru: 'Он уронил ящик (Правильный)',
                tr_uz: 'U qutini tushirib yubordi',
                tr_tj: 'Ӯ қуттиро афтонд',
                tr_kg: 'Ал кутучаны түшүрүп жиберди',
                tr_kz: 'Ол жәшікті түсіріп алды'
              },
              {
                subj: 'I / She / We',
                verb: 'went / lost / saw',
                example: 'I lost my ID badge.',
                transcr: 'Ай лост май ай-ди бэдж',
                tr_ru: 'Я потерял свой бейдж (Неправильный)',
                tr_uz: 'Men nishonimni yo\\'qotdim',
                tr_tj: 'Ман бейҷамро гум кардам',
                tr_kg: 'Мен бейджимди жоготтум',
                tr_kz: 'Мен бейджимді жоғалттым'
              }
            ]
          },
          {
            title: '❌ Negative (Отрицание)',
            rows: [
              {
                subj: 'I / He / She',
                verb: 'did not (didn\\'t)',
                example: 'I didn\\'t go to the field.',
                transcr: 'Ай диднт гоу ту зэ филд',
                tr_ru: 'Я не пошел в поле',
                tr_uz: 'Men dalaga bormadim',
                tr_tj: 'Ман ба майдон нарафтам',
                tr_kg: 'Мен талаага барган жокмун',
                tr_kz: 'Мен егістікке барған жоқпын'
              },
              {
                subj: 'We / You / They',
                verb: 'did not (didn\\'t)',
                example: 'The machine didn\\'t break down.',
                transcr: 'Зэ мэшин диднт брэйк даун',
                tr_ru: 'Машина не сломалась',
                tr_uz: 'Mashina buzilmadi',
                tr_tj: 'Мошина вайрон нашуд',
                tr_kg: 'Машина бузулган жок',
                tr_kz: 'Машина бұзылған жоқ'
              }
            ]
          },
          {
            title: '❓ Question (Вопрос)',
            rows: [
              {
                subj: 'Did',
                verb: 'you tell',
                example: 'Did you tell the manager?',
                transcr: 'Дид ю тэл зэ мэнэджэ?',
                tr_ru: 'Ты сказал менеджеру?',
                tr_uz: 'Menejerga aytdingizmi?',
                tr_tj: 'Шумо ба менеҷер гуфтед?',
                tr_kg: 'Менеджерге айттыңызбы?',
                tr_kz: 'Менеджерге айттыңыз ба?'
              },
              {
                subj: 'What',
                verb: 'did he say',
                example: 'What did you see?',
                transcr: 'Уот дид ю си?',
                tr_ru: 'Что вы видели?',
                tr_uz: 'Siz nimani ko\\'rdingiz?',
                tr_tj: 'Шумо чӣ дидед?',
                tr_kg: 'Сиз эмнени көрдүңүз?',
                tr_kz: 'Сіз не көрдіңіз?'
              }
            ]
          }
        ],
        examples: [
          {
            en: 'I picked sixty boxes yesterday and completed my timesheet.',
            ru: 'Вчера я собрал 60 ящиков и заполнил свой табель.',
            uz: 'Kecha men 60 ta quti terdim va vaqt jadvalimni to\\'ldirdim.',
            tj: 'Дирӯз ман 60 қуттӣ чидам ва ҷадвали вақтамро пур кардам.',
            kg: 'Кечээ мен 60 кутуча жыйдым жана убакыт таблицамды толтурдум.',
            kz: 'Кеше мен 60 жәшік жинадым және жұмыс уақыты кестемді толтырдым.'
          },
          {
            en: 'The tractor broke down this morning, so we started late.',
            ru: 'Трактор сломался сегодня утром, поэтому мы начали поздно.',
            uz: 'Traktor bu ertalab buzildi, shuning uchun biz kech boshladik.',
            tj: 'Трактор имрӯз субҳ вайрон шуд, бинобар ин мо дер оғоз кардем.',
            kg: 'Трактор бүгүн эртең менен бузулуп, ошондуктан биз кеч баштадык.',
            kz: 'Трактор бүгін таңертең бұзылды, сондықтан біз кеш бастадық.'
          },
          {
            en: 'I made a mistake. I dropped the scanner and it broke.',
            ru: 'Я совершил ошибку. Я уронил сканер, и он сломался.',
            uz: 'Men xato qildim. Skanerni tushirib yubordim va u buzildi.',
            tj: 'Ман хато кардам. Сканнерро афтондам ва он шикаст.',
            kg: 'Мен ката кетирдим. Сканерди түшүрүп жибердим, ал сынды.',
            kz: 'Мен қателік жасадым. Сканерді түсіріп алдым, ол сынды.'
          },
          {
            en: 'Did you report the accident to the supervisor?',
            ru: 'Ты сообщил о несчастном случае супервайзеру?',
            uz: 'Baxtsiz hodisa haqida supervayzerga xabar berdingizmi?',
            tj: 'Оё дар бораи ҳодисаи нохуш ба супервайзер хабар додед?',
            kg: 'Кырсык жөнүндө супервайзерге билдирдиңизби?',
            kz: 'Жазатайым оқиға туралы супервайзерге хабарладыңыз ба?'
          },
          {
            en: 'Yes, I told him. He checked the problem last night.',
            ru: 'Да, я сказал ему. Он проверил проблему вчера вечером.',
            uz: 'Ha, men unga aytdim. U muammoni kecha tunda tekshirdi.',
            tj: 'Бале, ман ба ӯ гуфтам. Ӯ шаби гузашта муамморо санҷид.',
            kg: 'Ооба, мен ага айттым. Ал көйгөйдү кечээ кечинде текшерди.',
            kz: 'Иә, мен оған айттым. Ол мәселені кеше кешке тексерді.'
          },
          {
            en: 'I forgot my ID badge at home. I left it on the table.',
            ru: 'Я забыл свой бейдж дома. Я оставил его на столе.',
            uz: 'Men ID nishonimni uyda unutdim. Uni stolda qoldirdim.',
            tj: 'Ман бейҷи худро дар хона фаромӯш кардам. Онро дар болои миз гузоштам.',
            kg: 'Мен ID бейджимди үйдө унутуп калдым. Аны столдо калтырдым.',
            kz: 'Мен ID бейджимді үйде ұмытып кеттім. Оны үстелде қалдырдым.'
          },
          {
            en: 'A worker fell down an hour ago. He didn\\'t feel good.',
            ru: 'Рабочий упал час назад. Он чувствовал себя нехорошо.',
            uz: 'Bir ishchi bir soat oldin yiqilib tushdi. O\\'zini yaxshi his qilmadi.',
            tj: 'Як коргар як соат пеш афтод. Ӯ худро нағз ҳис намекард.',
            kg: 'Бир жумушчу бир саат мурун жыгылып кетти. Ал өзүн жакшы сезген жок.',
            kz: 'Бір жұмысшы бір сағат бұрын құлап қалды. Ол өзін жақсы сезінген жоқ.'
          },
          {
            en: 'I found this phone in the greenhouse. Did you lose it?',
            ru: 'Я нашел этот телефон в теплице. Это ты его потерял?',
            uz: 'Bu telefonni issiqxonadan topdim. Siz yo\\'qotdingizmi?',
            tj: 'Ман ин телефонро дар гармхона ёфтам. Оё шумо онро гум кардед?',
            kg: 'Бул телефонду күнөсканадан таптым. Сиз жоготтуңузбу?',
            kz: 'Бұл телефонды жылыжайдан таптым. Сіз жоғалттыңыз ба?'
          },
          {
            en: 'I went to the office and gave the daily report to the manager.',
            ru: 'Я пошел в офис и отдал ежедневный отчет менеджеру.',
            uz: 'Men ofisga bordim va kunlik hisobotni menejerga berdim.',
            tj: 'Ман ба офис рафтам ва ҳисоботи рӯзонаро ба менеҷер додам.',
            kg: 'Мен кеңсеге барып, күнүмдүк отчётту менеджерге бердим.',
            kz: 'Мен кеңсеге барып, күнделікті есепті менеджерге бердім.'
          },
          {
            en: 'I didn\\'t see the incident. I came early and started work.',
            ru: 'Я не видел происшествия. Я пришел рано и начал работать.',
            uz: 'Men hodisani ko\\'rmadim. Men erta keldim va ishni boshladim.',
            tj: 'Ман ҳодисаро надидам. Ман барвақт омадам ва корро оғоз кардам.',
            kg: 'Мен окуяны көргөн жокмун. Мен эрте келип, иштей баштагам.',
            kz: 'Мен оқиғаны көрген жоқпын. Мен ерте келіп, жұмысты бастадым.'
          }
        ]
      },
      words: [
        {
          e: '📅',
          en: 'yesterday',
          ru: 'вчера',
          uz: 'kecha',
          tj: 'дирӯз',
          kg: 'кечээ',
          kz: 'кеше',
          pn: '/ˈjestədeɪ/',
          transcr: 'йестэдэй'
        },
        {
          e: '🗓️',
          en: 'last week',
          ru: 'на прошлой неделе',
          uz: 'o\\'tgan hafta',
          tj: 'ҳафтаи гузашта',
          kg: 'өткөн жума',
          kz: 'өткен аптада',
          pn: '/lɑːst wiːk/',
          transcr: 'ласт уик'
        },
        {
          e: '🌅',
          en: 'this morning',
          ru: 'сегодня утром',
          uz: 'bu ertalab',
          tj: 'имрӯз субҳ',
          kg: 'бүгүн эртең менен',
          kz: 'бүгін таңертең',
          pn: '/ðɪs ˈmɔːnɪŋ/',
          transcr: 'зис монин'
        },
        {
          e: '🌃',
          en: 'last night',
          ru: 'вчера вечером',
          uz: 'kecha tunda',
          tj: 'шаби гузашта',
          kg: 'кечээ кечинде',
          kz: 'кеше кешке',
          pn: '/lɑːst naɪt/',
          transcr: 'ласт найт'
        },
        {
          e: '⏳',
          en: 'ago',
          ru: 'назад (в прошлом)',
          uz: 'oldin',
          tj: 'пеш',
          kg: 'мурун',
          kz: 'бұрын',
          pn: '/əˈɡəʊ/',
          transcr: 'эгоу'
        },
        {
          e: '📋',
          en: 'timesheet',
          ru: 'табель',
          uz: 'vaqt jadvali',
          tj: 'ҷадвали вақт',
          kg: 'убакыт таблицасы',
          kz: 'жұмыс уақыты кестесі',
          pn: '/ˈtaɪmʃiːt/',
          transcr: 'таймшит'
        },
        {
          e: '📊',
          en: 'daily report',
          ru: 'ежедневный отчет',
          uz: 'kunlik hisobot',
          tj: 'ҳисоботи рӯзона',
          kg: 'күнүмдүк отчёт',
          kz: 'күнделікті есеп',
          pn: '/ˈdeɪli rɪˈpɔːt/',
          transcr: 'дэйли рипот'
        },
        {
          e: '🚨',
          en: 'accident',
          ru: 'несчастный случай',
          uz: 'baxtsiz hodisa',
          tj: 'ҳодисаи нохуш',
          kg: 'кырсык',
          kz: 'жазатайым оқиға',
          pn: '/ˈæksɪdənt/',
          transcr: 'эксидэнт'
        },
        {
          e: '⚠️',
          en: 'incident',
          ru: 'происшествие',
          uz: 'hodisa',
          tj: 'ҳодиса',
          kg: 'окуя',
          kz: 'оқиға',
          pn: '/ˈɪnsɪdənt/',
          transcr: 'инсидэнт'
        },
        {
          e: '❌',
          en: 'mistake',
          ru: 'ошибка',
          uz: 'xato',
          tj: 'хато',
          kg: 'ката',
          kz: 'қате',
          pn: '/mɪˈsteɪk/',
          transcr: 'мистэйк'
        },
        {
          e: '🛑',
          en: 'problem',
          ru: 'проблема',
          uz: 'muammo',
          tj: 'муаммо',
          kg: 'көйгөй',
          kz: 'мәселе',
          pn: '/ˈprɒbləm/',
          transcr: 'проблэм'
        },
        {
          e: '🐢',
          en: 'late',
          ru: 'поздно / опоздал',
          uz: 'kech',
          tj: 'дер',
          kg: 'кеч',
          kz: 'кеш',
          pn: '/leɪt/',
          transcr: 'лэйт'
        },
        {
          e: '🐇',
          en: 'early',
          ru: 'рано',
          uz: 'erta',
          tj: 'барвақт',
          kg: 'эрте',
          kz: 'ерте',
          pn: '/ˈɜːli/',
          transcr: 'ёли'
        },
        {
          e: '🔄',
          en: 'happen / happened',
          ru: 'случаться / случилось',
          uz: 'yuz bermoq',
          tj: 'рӯй додан',
          kg: 'болуу (окуя)',
          kz: 'болу',
          pn: '/ˈhæpən / ˈhæpənd/',
          transcr: 'хэпэн / хэпэнд'
        },
        {
          e: '⏬',
          en: 'drop / dropped',
          ru: 'ронять / уронил',
          uz: 'tushirib yubormoq',
          tj: 'афтондан',
          kg: 'түшүрүп жиберүү',
          kz: 'түсіріп алу',
          pn: '/drɒp / drɒpt/',
          transcr: 'дроп / дропт'
        },
        {
          e: '✅',
          en: 'check / checked',
          ru: 'проверять / проверил',
          uz: 'tekshirmoq',
          tj: 'санҷидан',
          kg: 'текшерүү',
          kz: 'тексеру',
          pn: '/tʃek / tʃekt/',
          transcr: 'чэк / чэкт'
        },
        {
          e: '🗣️',
          en: 'report / reported',
          ru: 'сообщать / сообщил',
          uz: 'xabar bermoq',
          tj: 'хабар додан',
          kg: 'билдирүү',
          kz: 'хабарлау',
          pn: '/rɪˈpɔːt / rɪˈpɔːtɪd/',
          transcr: 'рипот / рипотид'
        },
        {
          e: '🧠',
          en: 'remember / remembered',
          ru: 'помнить / вспомнил',
          uz: 'eslamoq',
          tj: 'дар хотир доштан',
          kg: 'эстеп калуу',
          kz: 'есте сақтау',
          pn: '/rɪˈmembə / rɪˈmembəd/',
          transcr: 'римэмбэ / римэмбэд'
        },
        {
          e: '❓',
          en: 'lose / lost',
          ru: 'терять / потерял',
          uz: 'yo\\'qotmoq',
          tj: 'гум кардан',
          kg: 'жоготуу',
          kz: 'жоғалту',
          pn: '/luːz / lɒst/',
          transcr: 'луз / лост'
        },
        {
          e: '🔎',
          en: 'find / found',
          ru: 'находить / нашел',
          uz: 'topmoq',
          tj: 'ёфтан',
          kg: 'табуу',
          kz: 'табу',
          pn: '/faɪnd / faʊnd/',
          transcr: 'файнд / фаунд'
        },
        {
          e: '🤷',
          en: 'forget / forgot',
          ru: 'забывать / забыл',
          uz: 'unutmoq',
          tj: 'фаромӯш кардан',
          kg: 'унутуу',
          kz: 'ұмыту',
          pn: '/fəˈɡet / fəˈɡɒt/',
          transcr: 'фэгэт / фэгот'
        },
        {
          e: '📉',
          en: 'fall / fell',
          ru: 'падать / упал',
          uz: 'yiqilmoq',
          tj: 'афтидан',
          kg: 'жыгылуу',
          kz: 'құлау',
          pn: '/fɔːl / fel/',
          transcr: 'фол / фэл'
        },
        {
          e: '🛠️',
          en: 'break down / broke down',
          ru: 'ломаться / сломался',
          uz: 'buzilmoq',
          tj: 'вайрон шудан',
          kg: 'бузулуу',
          kz: 'бұзылу',
          pn: '/breɪk daʊn / brəʊk daʊn/',
          transcr: 'брэйк даун / броук даун'
        },
        {
          e: '🚶',
          en: 'go / went',
          ru: 'идти / пошел',
          uz: 'bormoq / bordi',
          tj: 'рафтан / рафт',
          kg: 'баруу / барды',
          kz: 'бару / барды',
          pn: '/ɡəʊ / went/',
          transcr: 'гоу / уэнт'
        },
        {
          e: '👋',
          en: 'come / came',
          ru: 'приходить / пришел',
          uz: 'kelmoq / keldi',
          tj: 'омадан / омад',
          kg: 'келүү / келди',
          kz: 'келу / келді',
          pn: '/kʌm / keɪm/',
          transcr: 'кам / кэйм'
        },
        {
          e: '💬',
          en: 'tell / told',
          ru: 'говорить / сказал',
          uz: 'aytmoq / aytdi',
          tj: 'гуфтан / гуфт',
          kg: 'айтуу / айтты',
          kz: 'айту / айтты',
          pn: '/tel / təʊld/',
          transcr: 'тэл / тоулд'
        },
        {
          e: '🤲',
          en: 'give / gave',
          ru: 'давать / дал',
          uz: 'bermoq / berdi',
          tj: 'додан / дод',
          kg: 'берүү / берди',
          kz: 'беру / берді',
          pn: '/ɡɪv / ɡeɪv/',
          transcr: 'гив / гэйв'
        },
        {
          e: '🫴',
          en: 'take / took',
          ru: 'брать / взял',
          uz: 'olmoq / oldi',
          tj: 'гирифтан / гирифт',
          kg: 'алуу / алды',
          kz: 'алу / алды',
          pn: '/teɪk / tʊk/',
          transcr: 'тэйк / тук'
        },
        {
          e: '🔨',
          en: 'make / made',
          ru: 'делать / сделал',
          uz: 'qilmoq / qildi',
          tj: 'кардан / кард',
          kg: 'жасоо / жасады',
          kz: 'жасау / жасады',
          pn: '/meɪk / meɪd/',
          transcr: 'мэйк / мэйд'
        },
        {
          e: '👀',
          en: 'see / saw',
          ru: 'видеть / увидел',
          uz: 'ko\\'rmoq / ko\\'rdi',
          tj: 'дидан / дид',
          kg: 'көрүү / көрдү',
          kz: 'көру / көрді',
          pn: '/siː / sɔː/',
          transcr: 'си / со'
        }
      ],
      dialogue: [
        {
          s: 'm',
          en: 'Ahmad, I saw your daily report. What happened this morning?',
          ru: 'Ахмад, я видел твой ежедневный отчет. Что случилось сегодня утром?',
          uz: 'Ahmad, men sening kunlik hisobotingni ko\\'rdim. Bu ertalab nima bo\\'ldi?',
          tj: 'Аҳмад, ман ҳисоботи рӯзонаи туро дидам. Имрӯз субҳ чӣ шуд?',
          kg: 'Ахмад, мен сенин күнүмдүк отчётуңду көрдүм. Бүгүн эртең менен эмне болду?',
          kz: 'Ахмад, мен сенің күнделікті есебіңді көрдім. Бүгін таңертең не болды?',
          transcr: 'Ахмад, ай со ё дэйли рипот. Уот хэпэнд зис монин?'
        },
        {
          s: 'w',
          en: 'I made a mistake, boss. I dropped the scanner and it broke down.',
          ru: 'Я совершил ошибку, босс. Я уронил сканер, и он сломался.',
          uz: 'Men xato qildim, boshliq. Men skanerni tushirib yubordim va u buzildi.',
          tj: 'Ман хато кардам, сардор. Ман сканнерро афтондам ва он шикаст.',
          kg: 'Мен ката кетирдим, башчы. Мен сканерди түшүрүп жибердим, ал бузулду.',
          kz: 'Мен қателік жасадым, бастық. Мен сканерді түсіріп алдым, ол бұзылды.',
          transcr: 'Ай мэйд э мистэйк, бос. Ай дропт зэ сканэ энд ит броук даун.'
        },
        {
          s: 'm',
          en: 'When did it happen? Did you tell the line leader?',
          ru: 'Когда это случилось? Ты сказал бригадиру?',
          uz: 'Bu qachon yuz berdi? Brigadirga aytdingizmi?',
          tj: 'Ин кай рӯй дод? Ба бригадир гуфтед?',
          kg: 'Бул качан болду? Бригадирге айттыңызбы?',
          kz: 'Бұл қашан болды? Бригадирге айттыңыз ба?',
          transcr: 'Уэн дид ит хэпэн? Дид ю тэл зэ лайн лидэ?'
        },
        {
          s: 'w',
          en: 'It happened two hours ago. I went to the line leader, but I didn\\'t find him.',
          ru: 'Это случилось два часа назад. Я пошел к бригадиру, но не нашел его.',
          uz: 'Bu ikki soat oldin yuz berdi. Men brigadirning oldiga bordim, lekin uni topmadim.',
          tj: 'Ин ду соат пеш рӯй дод. Ман назди бригадир рафтам, аммо ӯро наёфтам.',
          kg: 'Бул эки саат мурун болду. Мен бригадирге бардым, бирок аны таппадым.',
          kz: 'Бұл екі сағат бұрын болды. Мен бригадирге бардым, бірақ оны таппадым.',
          transcr: 'Ит хэпэнд ту ауэз эгоу. Ай уэнт ту зэ лайн лидэ, бат ай диднт файнд хим.'
        },
        {
          s: 'm',
          en: 'I see. Did you check the machine? Is it a big problem?',
          ru: 'Понятно (Я вижу). Ты проверил аппарат? Это большая проблема?',
          uz: 'Tushunarli. Siz apparatni tekshirdingizmi? Bu katta muammomi?',
          tj: 'Фаҳмо. Шумо дастгоҳро санҷидед? Оё ин муаммои калон аст?',
          kg: 'Түшүнүктүү. Сиз аппаратты текшердиңизби? Бул чоң көйгөйбү?',
          kz: 'Түсінікті. Сіз аппаратты тексердіңіз бе? Бұл үлкен мәселе ме?',
          transcr: 'Ай си. Дид ю чэк зэ мэшин? Из ит э биг проблэм?'
        },
        {
          s: 'w',
          en: 'Yes, I checked it. The battery fell out. I gave it to the mechanic.',
          ru: 'Да, я проверил. Выпала батарея. Я отдал его механику.',
          uz: 'Ha, men tekshirdim. Batareyasi tushib ketdi. Men uni mexanikka berdim.',
          tj: 'Бале, ман санҷидам. Батареяаш афтод. Ман онро ба механик додам.',
          kg: 'Ооба, мен текшердим. Батареясы түшүп калды. Мен аны механикке бердим.',
          kz: 'Иә, мен тексердім. Батареясы түсіп қалды. Мен оны механикке бердім.',
          transcr: 'Йес, ай чэкт ит. Зэ бэтэри фэл аут. Ай гэйв ит ту зэ мэканик.'
        },
        {
          s: 'm',
          en: 'Good. And what about your ID badge? Did you lose it?',
          ru: 'Хорошо. А что с твоим бейджем? Ты потерял его?',
          uz: 'Yaxshi. Sizning ID nishoningiz nima bo\\'ldi? Uni yo\\'qotdingizmi?',
          tj: 'Хуб. Ва бейҷи шумо чӣ шуд? Оё онро гум кардед?',
          kg: 'Жакшы. А бейджиңиз эмне болду? Аны жоготтуңузбу?',
          kz: 'Жақсы. Ал бейджіңіз ше? Оны жоғалттыңыз ба?',
          transcr: 'Гуд. Энд уот эбаут ё ай-ди бэдж? Дид ю луз ит?'
        },
        {
          s: 'w',
          en: 'No, I forgot it at home. I remembered when I came to work.',
          ru: 'Нет, я забыл его дома. Я вспомнил, когда пришел на работу.',
          uz: 'Yo\\'q, men uni uyda unutdim. Ishga kelganimda esimga tushdi.',
          tj: 'Не, ман онро дар хона фаромӯш кардам. Вақте ки ба кор омадам, ба хотир овардам.',
          kg: 'Жок, мен аны үйдө унутуп калдым. Жумушка келгенде эстедим.',
          kz: 'Жоқ, мен оны үйде ұмытып кеттім. Жұмысқа келгенде есіме түсті.',
          transcr: 'Ноу, ай фэгот ит эт хоум. Ай римэмбэд уэн ай кэйм ту уёк.'
        },
        {
          s: 'm',
          en: 'Always report any incident early. Do not wait.',
          ru: 'Всегда докладывай о любом происшествии рано. Не жди.',
          uz: 'Har doim har qanday hodisa haqida erta xabar bering. Kutmang.',
          tj: 'Ҳамеша дар бораи ҳама гуна ҳодиса барвақт хабар диҳед. Интизор нашавед.',
          kg: 'Ар дайым ар кандай окуя жөнүндө эрте кабарлаңыз. Күтпөңүз.',
          kz: 'Әрқашан кез келген оқиға туралы ерте хабарлаңыз. Күтпеңіз.',
          transcr: 'Олуэйз рипот эни инсидэнт ёли. Ду нот уэйт.'
        },
        {
          s: 'w',
          en: 'Understood. Thank you, I will take a new scanner.',
          ru: 'Понял. Спасибо, я возьму новый сканер.',
          uz: 'Tushunarli. Rahmat, men yangi skaner olaman.',
          tj: 'Фаҳмо. Ташаккур, ман сканнери нав мегирам.',
          kg: 'Түшүнүктүү. Рахмат, мен жаңы сканер алам.',
          kz: 'Түсінікті. Рақмет, мен жаңа сканер аламын.',
          transcr: 'Андэстуд. Сэнк ю, ай уил тэйк э нью сканэ.'
        }
      ],
      quiz: [
        {
          q: 'Past form of \\'go\\' (irregular verb)',
          opts: [
            'goed',
            'went',
            'gone',
            'goes'
          ],
          c: 1,
          hint_ru: 'Вторая форма глагола go — это went.'
        },
        {
          q: '\\'I ___ work yesterday.\\' (Отрицание в прошлом)',
          opts: [
            'didn\\'t work',
            'don\\'t work',
            'didn\\'t worked',
            'not work'
          ],
          c: 0,
          hint_ru: 'Для отрицания используется didn\\'t + начальная форма глагола (work).'
        },
        {
          q: 'Past form of \\'lose\\' (терять)',
          opts: [
            'losed',
            'loose',
            'lost',
            'last'
          ],
          c: 2,
          hint_ru: 'Терять — lose, потерял — lost.'
        },
        {
          q: 'What is a \\'timesheet\\'? (табель)',
          opts: [
            'Daily report',
            'Paper for work hours',
            'Mistake',
            'Machine'
          ],
          c: 1,
          hint_ru: 'Timesheet — это бумага для учета рабочих часов (Paper for work hours).'
        },
        {
          q: 'Past form of \\'see\\' (видеть)',
          opts: [
            'seed',
            'saw',
            'seen',
            'say'
          ],
          c: 1,
          hint_ru: 'Видеть — see, видел — saw.'
        },
        {
          q: 'What is the opposite of \\'late\\'? (противоположность слова поздно)',
          opts: [
            'early',
            'ago',
            'yesterday',
            'problem'
          ],
          c: 0,
          hint_ru: 'Поздно — late, рано — early.'
        },
        {
          q: '\\'Did you ___ the line leader?\\' (Ты рассказал...?)',
          opts: [
            'told',
            'tells',
            'tell',
            'telling'
          ],
          c: 2,
          hint_ru: 'После вспомогательного глагола Did основной глагол стоит в начальной форме (tell).'
        },
        {
          q: 'What is \\'accident\\'? (несчастный случай)',
          opts: [
            'A good thing',
            'A problem or bad event',
            'A timesheet',
            'A machine'
          ],
          c: 1,
          hint_ru: 'Accident — это проблема или плохой случай (A problem or bad event).'
        },
        {
          q: 'Past form of \\'make\\' (делать)',
          opts: [
            'maked',
            'made',
            'make',
            'makeed'
          ],
          c: 1,
          hint_ru: 'Делать — make, сделал — made.'
        },
        {
          q: '\\'I ___ a mistake.\\' (Я сделал ошибку)',
          opts: [
            'made',
            'did',
            'went',
            'gave'
          ],
          c: 0,
          hint_ru: 'Делать ошибку — make a mistake. В прошлом времени — made a mistake.'
        }
      ]
    }`;

text_replaced = text.replace(/    \{\s*id: 13,[\s\S]*?(?=\s*\{\s*id: 14,)/, l13 + '\n');
fs.writeFileSync('a1.html', text_replaced);
console.log('Successfully replaced Lesson 13!');
