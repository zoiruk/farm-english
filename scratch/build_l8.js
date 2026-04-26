const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');

const l8 = `    {
      id: 8,
      mod: 4,
      name_ru: 'Мой СИЗ — моя защита',
      name_uz: 'Mening PPE — mening himoyam',
      name_tj: 'PPE-и ман — ҳимояи ман',
      name_kg: 'Менин PPE — менин коргоом',
      name_kz: 'Менің ЖҚҚ — менің қорғанысым',
      cefr: 'have/has · have got · Adjectives · Colours · Clothing (PPE)',
      grammar: {
        title_ru: 'HAVE / HAS · HAVE GOT + прилагательные и цвета',
        title_uz: 'HAVE / HAS · HAVE GOT + sifatlar va ranglar',
        title_tj: 'HAVE / HAS · HAVE GOT + сифатҳо ва рангҳо',
        title_kg: 'HAVE / HAS · HAVE GOT + сын атооч жана түстөр',
        title_kz: 'HAVE / HAS · HAVE GOT + сын есімдер және түстер',
        rule_ru: 'В Британии очень часто говорят <b>have got</b> вместо <b>have</b> (у меня есть). Это одно и то же. Для He/She/It используем <b>has</b> или <b>has got</b>.<br>Прилагательное (какой?) всегда ставится ПЕРЕД существительным: <b>heavy boots</b> (тяжелые ботинки), <b>an orange vest</b> (оранжевый жилет).',
        rule_uz: 'Buyuk Britaniyada odatda <b>have</b> o\\'rniga <b>have got</b> deyishadi (menda bor). Ikkalasi bir xil. He/She/It uchun <b>has</b> yoki <b>has got</b> ishlatamiz.<br>Sifat har doim otdan OLDIN keladi: <b>heavy boots</b> (og\\'ir etiklar), <b>an orange vest</b> (to\\'q sariq vest).',
        rule_tj: 'Дар Бритониё аксар вақт ба ҷои <b>have</b> <b>have got</b> мегӯянд (ман дорам). Ин як маъно дорад. Барои He/She/It мо <b>has</b> ё <b>has got</b> истифода мебарем.<br>Сифат ҳамеша ПЕШ аз исм меояд: <b>heavy boots</b> (мӯзаҳои вазнин), <b>an orange vest</b> (жилети норанҷӣ).',
        rule_kg: 'Британияда көбүнчө <b>have</b> ордуна <b>have got</b> колдонулат (менде бар). Бул бир маани. He/She/It үчүн <b>has</b> же <b>has got</b> колдонобуз.<br>Сын атооч дайыма атоочтун АЛДЫНДА келет: <b>heavy boots</b> (оор ботинкалар), <b>an orange vest</b> (апельсин жилети).',
        rule_kz: 'Британияда жиі <b>have</b> орнына <b>have got</b> қолданылады (менде бар). Бұл бір мағына. He/She/It үшін <b>has</b> немесе <b>has got</b> қолданамыз.<br>Сын есім әрқашан зат есімнің АЛДЫНДА келеді: <b>heavy boots</b> (ауыр етіктер), <b>an orange vest</b> (сарғыш жилет).',
        tables: [
          {
            title: '✅ Affirmative (Утверждение)',
            rows: [
              {
                subj: 'I / You / We / They',
                verb: 'have got (\\'ve got)',
                example: 'I have got a new vest.',
                transcr: 'Ай хэв гот э нью вест',
                tr_ru: 'У меня есть новый жилет',
                tr_uz: 'Menda yangi vest bor',
                tr_tj: 'Ман жилети нав дорам',
                tr_kg: 'Менде жаңы жилет бар',
                tr_kz: 'Менде жаңа жилет бар'
              },
              {
                subj: 'He / She / It',
                verb: 'has got (\\'s got)',
                example: 'He has got heavy boots.',
                transcr: 'Хи хэз гот хэви бутс',
                tr_ru: 'У него есть тяжелые ботинки',
                tr_uz: 'Unda og\\'ir etiklar bor',
                tr_tj: 'Ӯ мӯзаҳои вазнин дорад',
                tr_kg: 'Анда оор ботинкалар бар',
                tr_kz: 'Онда ауыр етіктер бар'
              }
            ]
          },
          {
            title: '❌ Negative (Отрицание)',
            rows: [
              {
                subj: 'I / You / We / They',
                verb: 'have not got (haven\\'t got)',
                example: 'We haven\\'t got earplugs.',
                transcr: 'Уи хэвнт гот иэплагз',
                tr_ru: 'У нас нет берушей',
                tr_uz: 'Bizda quloqchinlar yo\\'q',
                tr_tj: 'Мо гӯшмонак надорем',
                tr_kg: 'Бизде кулакчындар жок',
                tr_kz: 'Бізде құлаққаптар жоқ'
              },
              {
                subj: 'He / She / It',
                verb: 'has not got (hasn\\'t got)',
                example: 'She hasn\\'t got an apron.',
                transcr: 'Ши хэзнт гот эн эйпрэн',
                tr_ru: 'У неё нет фартука',
                tr_uz: 'Unda fartuk yo\\'q',
                tr_tj: 'Вай пешдоман надорад',
                tr_kg: 'Анда алжапкыч жок',
                tr_kz: 'Онда алжапқыш жоқ'
              }
            ]
          },
          {
            title: '❓ Question (Вопрос)',
            rows: [
              {
                subj: 'Have',
                verb: 'I / you / we / they',
                example: 'Have you got your PPE?',
                transcr: 'Хэв ю гот ё пи-пи-и?',
                tr_ru: 'У тебя есть твой СИЗ?',
                tr_uz: 'Senda PPE bormi?',
                tr_tj: 'Шумо PPE-и худро доред?',
                tr_kg: 'Сизде PPE барбы?',
                tr_kz: 'Сенде PPE бар ма?'
              },
              {
                subj: 'Has',
                verb: 'he / she / it',
                example: 'Has he got safety glasses?',
                transcr: 'Хэз хи гот сэйфти гласиз?',
                tr_ru: 'У него есть защитные очки?',
                tr_uz: 'Unda himoya ko\\'zoynaklari bormi?',
                tr_tj: 'Оё ӯ айнакҳои ҳифозатӣ дорад?',
                tr_kg: 'Анда коргоочу көзайнектери барбы?',
                tr_kz: 'Онда қорғаныш көзілдірігі бар ма?'
              }
            ]
          }
        ],
        examples: [
          {
            en: 'I have got my gloves. He has a high-visibility orange vest.',
            ru: 'У меня есть перчатки. У него есть оранжевый сигнальный жилет.',
            uz: 'Menda qo\\'lqop bor. Unda ko\\'rinuvchan to\\'q sariq vest bor.',
            tj: 'Дастпӯшакам ҳаст. Ӯ жилети баланддиди норанҷӣ дорад.',
            kg: 'Менде колгабым бар. Анда жогорку көрүнүм апельсин жилети бар.',
            kz: 'Менде қолғабым бар. Онда сарғыш сигналдық жилеті бар.'
          },
          {
            en: 'She hasn\\'t got heavy boots. Can you give her a pair?',
            ru: 'У неё нет тяжёлых ботинок. Вы можете дать ей пару?',
            uz: 'Unda og\\'ir etiklar yo\\'q. Unga bir juft bera olasizmi?',
            tj: 'Вай мӯзаи вазнин надорад. Метавонед ба вай як ҷуфт диҳед?',
            kg: 'Анда оор ботинкалар жок. Ага бир жуп бере аласызбы?',
            kz: 'Онда ауыр етіктер жоқ. Оған бір жұп бере аласыз ба?'
          },
          {
            en: 'Have you got a face mask? Yes, I have.',
            ru: 'У тебя есть маска для лица? Да, есть.',
            uz: 'Senda yuz niqobi bormi? Ha, bor.',
            tj: 'Шумо маскаи рӯй доред? Бале, дорам.',
            kg: 'Сизде беткап барбы? Ооба, бар.',
            kz: 'Сенде бетперде бар ма? Иә, бар.'
          },
          {
            en: 'My boots are wet. Have you got dry boots?',
            ru: 'Мои ботинки мокрые. У вас есть сухие ботинки?',
            uz: 'Etiklarim ho\\'l. Sizda quruq etiklar bormi?',
            tj: 'Мӯзаҳои ман тар ҳастанд. Шумо мӯзаҳои хушк доред?',
            kg: 'Менин өтүктөрүм суу. Сизде кургак өтүктөр барбы?',
            kz: 'Менің етіктерім сулы. Сізде құрғақ етіктер бар ма?'
          },
          {
            en: 'This harness is tight. I need a loose one.',
            ru: 'Эта страховка тесная. Мне нужна более свободная.',
            uz: 'Bu straxovka tor. Menga kengrog\\'i kerak.',
            tj: 'Ин камарбанди бехатарӣ танг аст. Ба ман васеътараш лозим аст.',
            kg: 'Бул коргоочу кур тар. Мага кененрээги керек.',
            kz: 'Бұл қауіпсіздік белдігі тар. Маған кеңірегі керек.'
          },
          {
            en: 'He hasn\\'t got knee pads. It is dangerous.',
            ru: 'У него нет наколенников. Это опасно.',
            uz: 'Unda tizza himoyachilari yo\\'q. Bu xavfli.',
            tj: 'Ӯ зонубанд надорад. Ин хатарнок аст.',
            kg: 'Анын тизе коргоочулары жок. Бул кооптуу.',
            kz: 'Оның тізеқаптары жоқ. Бұл қауіпті.'
          },
          {
            en: 'Are your rubber boots comfortable?',
            ru: 'Твои резиновые сапоги удобные?',
            uz: 'Sening rezina etiklaring qulaymi?',
            tj: 'Мӯзаҳои резинии шумо бароҳатанд?',
            kg: 'Сенин резина өтүктөрүң ыңгайлуубу?',
            kz: 'Сенің резеңке етіктерің ыңғайлы ма?'
          },
          {
            en: 'I haven\\'t got an apron. My workwear is dirty.',
            ru: 'У меня нет фартука. Моя рабочая одежда грязная.',
            uz: 'Menda fartuk yo\\'q. Ish kiyimim iflos.',
            tj: 'Ман пешдоман надорам. Либоси кории ман ифлос аст.',
            kg: 'Менде алжапкыч жок. Жумуш кийимим кир.',
            kz: 'Менде алжапқыш жоқ. Менің жұмыс киімім кір.'
          },
          {
            en: 'Has she got warm thermal underwear?',
            ru: 'У неё есть тёплое термобельё?',
            uz: 'Unda issiq termal ichki kiyim bormi?',
            tj: 'Оё вай либоси тагпӯши гарм дорад?',
            kg: 'Анын жылуу жылуулук ич кийими барбы?',
            kz: 'Онда жылы термо ішкиім бар ма?'
          },
          {
            en: 'The ladder is broken. Have you got a safe ladder?',
            ru: 'Лестница сломана. У вас есть безопасная лестница?',
            uz: 'Narvon singan. Sizda xavfsiz narvon bormi?',
            tj: 'Нардбон шикастааст. Шумо нардбони бехатар доред?',
            kg: 'Шаты сынган. Сизде коопсуз шаты барбы?',
            kz: 'Баспалдақ сынған. Сізде қауіпсіз баспалдақ бар ма?'
          }
        ]
      },
      words: [
        {
          e: '🦺',
          en: 'high-vis vest',
          ru: 'сигнальный жилет',
          uz: 'ko\\'rinuvchan vest',
          tj: 'жилети баланддид',
          kg: 'жогорку көрүнүм жилети',
          kz: 'сигналдық жилет',
          pn: '/haɪ vɪz vest/',
          transcr: 'хай виз вест'
        },
        {
          e: '⛑️',
          en: 'hard hat',
          ru: 'каска',
          uz: 'kaska',
          tj: 'каска',
          kg: 'каска',
          kz: 'каска',
          pn: '/hɑːd hæt/',
          transcr: 'хад хэт'
        },
        {
          e: '🧥',
          en: 'waterproof jacket',
          ru: 'непромокаемая куртка',
          uz: 'suv o\\'tkazmaydigan ko\\'ylak',
          tj: 'куртаи обногузар',
          kg: 'суу өтпөйт күртө',
          kz: 'су өткізбейтін күртеше',
          pn: '/ˈwɔːtəpruːf ˈdʒækɪt/',
          transcr: 'уотэпруф джэкит'
        },
        {
          e: '👓',
          en: 'safety glasses',
          ru: 'защитные очки',
          uz: 'himoya ko\\'zoynagi',
          tj: 'айнаки ҳифозатӣ',
          kg: 'коргоочу көзайнек',
          kz: 'қорғаныш көзілдірігі',
          pn: '/ˈseɪfti ˈɡlɑːsɪz/',
          transcr: 'сэйфти гласиз'
        },
        {
          e: '🎽',
          en: 'apron',
          ru: 'фартук',
          uz: 'fartuk',
          tj: 'пешдоман',
          kg: 'алжапкыч',
          kz: 'алжапқыш',
          pn: '/ˈeɪprən/',
          transcr: 'эйпрэн'
        },
        {
          e: '🎧',
          en: 'earplugs',
          ru: 'беруши',
          uz: 'quloqchin',
          tj: 'гӯшмонак',
          kg: 'кулакчын',
          kz: 'құлаққап',
          pn: '/ˈɪəplʌɡz/',
          transcr: 'иэплагз'
        },
        {
          e: '🕸️',
          en: 'hairnet',
          ru: 'сеточка для волос',
          uz: 'soch to\\'ri',
          tj: 'тӯри мӯй',
          kg: 'чач торчосу',
          kz: 'шаш торы',
          pn: '/ˈheənet/',
          transcr: 'хээнэт'
        },
        {
          e: '🛡️',
          en: 'knee pads',
          ru: 'наколенники',
          uz: 'tizza himoyachilari',
          tj: 'зонубанд',
          kg: 'тизе коргоочу',
          kz: 'тізеқап',
          pn: '/niː pædz/',
          transcr: 'ни пэдз'
        },
        {
          e: '👢',
          en: 'rubber boots',
          ru: 'резиновые сапоги',
          uz: 'rezina etiklar',
          tj: 'мӯзаҳои резинӣ',
          kg: 'резина өтүктөр',
          kz: 'резеңке етіктер',
          pn: '/ˈrʌbə buːts/',
          transcr: 'рабэ бутс'
        },
        {
          e: '😷',
          en: 'face mask',
          ru: 'лицевая маска',
          uz: 'yuz niqobi',
          tj: 'маскаи рӯй',
          kg: 'беткап',
          kz: 'бетперде',
          pn: '/feɪs mɑːsk/',
          transcr: 'фэйс маск'
        },
        {
          e: '🪢',
          en: 'harness',
          ru: 'страховочный пояс',
          uz: 'straxovka',
          tj: 'камарбанди бехатарӣ',
          kg: 'коргоочу кур',
          kz: 'қауіпсіздік белдігі',
          pn: '/ˈhɑːnɪs/',
          transcr: 'ханис'
        },
        {
          e: '👷‍♂️',
          en: 'workwear',
          ru: 'рабочая одежда',
          uz: 'ish kiyimi',
          tj: 'либоси корӣ',
          kg: 'жумуш кийими',
          kz: 'жұмыс киімі',
          pn: '/ˈwɜːkweə/',
          transcr: 'уэквэа'
        },
        {
          e: '🏋️',
          en: 'heavy',
          ru: 'тяжелый',
          uz: 'og\\'ir',
          tj: 'вазнин',
          kg: 'оор',
          kz: 'ауыр',
          pn: '/ˈhevi/',
          transcr: 'хэви'
        },
        {
          e: '🪶',
          en: 'light',
          ru: 'легкий',
          uz: 'yengil',
          tj: 'сабук',
          kg: 'жеңил',
          kz: 'жеңіл',
          pn: '/laɪt/',
          transcr: 'лайт'
        },
        {
          e: '💧',
          en: 'wet',
          ru: 'мокрый',
          uz: 'ho\\'l',
          tj: 'тар',
          kg: 'суу',
          kz: 'сулы',
          pn: '/wet/',
          transcr: 'уэт'
        },
        {
          e: '🏜️',
          en: 'dry',
          ru: 'сухой',
          uz: 'quruq',
          tj: 'хушк',
          kg: 'кургак',
          kz: 'құрғақ',
          pn: '/draɪ/',
          transcr: 'драй'
        },
        {
          e: '🔥',
          en: 'warm',
          ru: 'теплый',
          uz: 'issiq',
          tj: 'гарм',
          kg: 'жылуу',
          kz: 'жылы',
          pn: '/wɔːm/',
          transcr: 'уом'
        },
        {
          e: '❄️',
          en: 'cool',
          ru: 'прохладный',
          uz: 'salqin',
          tj: 'салқын',
          kg: 'салкын',
          kz: 'салқын',
          pn: '/kuːl/',
          transcr: 'кул'
        },
        {
          e: '✨',
          en: 'new',
          ru: 'новый',
          uz: 'yangi',
          tj: 'нав',
          kg: 'жаңы',
          kz: 'жаңа',
          pn: '/njuː/',
          transcr: 'нью'
        },
        {
          e: '🕰️',
          en: 'old',
          ru: 'старый',
          uz: 'eski',
          tj: 'кӯҳна',
          kg: 'эски',
          kz: 'ескі',
          pn: '/əʊld/',
          transcr: 'оулд'
        },
        {
          e: '📏',
          en: 'long',
          ru: 'длинный',
          uz: 'uzun',
          tj: 'дароз',
          kg: 'узун',
          kz: 'ұзын',
          pn: '/lɒŋ/',
          transcr: 'лон'
        },
        {
          e: '🤏',
          en: 'short',
          ru: 'короткий',
          uz: 'qisqa',
          tj: 'кӯтоҳ',
          kg: 'кыска',
          kz: 'қысқа',
          pn: '/ʃɔːt/',
          transcr: 'шот'
        },
        {
          e: '😖',
          en: 'tight',
          ru: 'тесный',
          uz: 'tor',
          tj: 'танг',
          kg: 'тар',
          kz: 'тар',
          pn: '/taɪt/',
          transcr: 'тайт'
        },
        {
          e: '😌',
          en: 'loose',
          ru: 'свободный',
          uz: 'keng',
          tj: 'васеъ',
          kg: 'кенен',
          kz: 'кең',
          pn: '/luːs/',
          transcr: 'лус'
        },
        {
          e: '🛋️',
          en: 'comfortable',
          ru: 'удобный',
          uz: 'qulay',
          tj: 'бароҳат',
          kg: 'ыңгайлуу',
          kz: 'ыңғайлы',
          pn: '/ˈkʌmfətəbl/',
          transcr: 'камфэтэбл'
        },
        {
          e: '😣',
          en: 'uncomfortable',
          ru: 'неудобный',
          uz: 'noqulay',
          tj: 'нороҳат',
          kg: 'ыңгайсыз',
          kz: 'ыңғайсыз',
          pn: '/ʌnˈkʌmfətəbl/',
          transcr: 'анкамфэтэбл'
        },
        {
          e: '✅',
          en: 'safe',
          ru: 'безопасный',
          uz: 'xavfsiz',
          tj: 'бехатар',
          kg: 'коопсуз',
          kz: 'қауіпсіз',
          pn: '/seɪf/',
          transcr: 'сэйф'
        },
        {
          e: '⚠️',
          en: 'dangerous',
          ru: 'опасный',
          uz: 'xavfli',
          tj: 'хатарнок',
          kg: 'кооптуу',
          kz: 'қауіпті',
          pn: '/ˈdeɪndʒərəs/',
          transcr: 'дэйнджэрэс'
        },
        {
          e: '💔',
          en: 'broken',
          ru: 'сломанный',
          uz: 'singan',
          tj: 'шикаста',
          kg: 'сынган',
          kz: 'сынған',
          pn: '/ˈbrəʊkən/',
          transcr: 'броукэн'
        },
        {
          e: '🔧',
          en: 'fixed',
          ru: 'исправный',
          uz: 'tuzatilgan',
          tj: 'соз',
          kg: 'оңдолгон',
          kz: 'жөнделген',
          pn: '/fɪkst/',
          transcr: 'фикст'
        }
      ],
      dialogue: [
        {
          s: 'm',
          en: 'Good morning! Before you start — have you got all your PPE today?',
          ru: 'Доброе утро! Прежде чем начать — у вас сегодня весь ваш СИЗ?',
          uz: 'Xayrli tong! Boshlashdan oldin — bugun barcha PPE sizda bormi?',
          tj: 'Субҳ бахайр! Пеш аз оғоз — оё имрӯз ҳамаи PPE-и шумо ҳаст?',
          kg: 'Кутман эртең! Башталардан мурун — бүгүн бардык PPE сизде барбы?',
          kz: 'Қайырлы таң! Бастамас бұрын — бүгін барлық ЖҚҚ сізде бар ма?',
          transcr: 'Гуд монин! Бифо ю стат — хэв ю гот ол ё пи-пи-и тэдэй?'
        },
        {
          s: 'w',
          en: 'I have my gloves and my orange vest. But I haven\\'t got rubber boots.',
          ru: 'У меня есть перчатки и оранжевый жилет. Но у меня нет резиновых сапог.',
          uz: 'Menda qo\\'lqoplar va to\\'q sariq vest bor. Lekin menda rezina etiklar yo\\'q.',
          tj: 'Дастпӯшак ва жилети норанҷиам ҳаст. Аммо ман мӯзаи резинӣ надорам.',
          kg: 'Менде колгаптарым жана апельсин жилетим бар. Бирок резина өтүктөрүм жок.',
          kz: 'Менде қолғаптар мен сарғыш жилетім бар. Бірақ резеңке етіктерім жоқ.',
          transcr: 'Ай хэв май главз энд май ориндж вест. Бат ай хэвнт гот рабэ бутс.'
        },
        {
          s: 'm',
          en: 'You cannot work without boots. It is wet and dangerous.',
          ru: 'Без ботинок работать нельзя. Там мокро и опасно.',
          uz: 'Etiksiz ishlash mumkin emas. U yer ho\\'l va xavfli.',
          tj: 'Бе мӯза кор кардан мумкин нест. Он ҷо тар ва хатарнок аст.',
          kg: 'Ботинкасыз иштей албайсыз. Ал жер суу жана кооптуу.',
          kz: 'Етіксіз жұмыс істеуге болмайды. Ол жер сулы әрі қауіпті.',
          transcr: 'Ю канот уэк уизаут бутс. Ит из уэт энд дэйнджэрэс.'
        },
        {
          s: 'w',
          en: 'Can you give me boots? My old boots are broken.',
          ru: 'Можете дать мне сапоги? Мои старые сапоги сломаны (порваны).',
          uz: 'Menga etik bera olasizmi? Mening eski etiklarim yirtilgan.',
          tj: 'Метавонед ба ман мӯза диҳед? Мӯзаҳои кӯҳнаи ман даридаанд.',
          kg: 'Мага өтүк бере аласызбы? Эски өтүктөрүм айрылган.',
          kz: 'Маған етік бере аласыз ба? Менің ескі етіктерім жыртылған.',
          transcr: 'Кэн ю гив ми бутс? Май оулд бутс ар броукэн.'
        },
        {
          s: 'm',
          en: 'Here you are. Have you got a hairnet and knee pads?',
          ru: 'Пожалуйста. У тебя есть сеточка для волос и наколенники?',
          uz: 'Marhamat. Senda soch to\\'ri va tizza himoyachilari bormi?',
          tj: 'Бфармоед. Шумо тӯри мӯй ва зонубанд доред?',
          kg: 'Мине. Сизде чач торчосу жана тизе коргоочулар барбы?',
          kz: 'Міне. Сенде шаш торы мен тізеқаптар бар ма?',
          transcr: 'Хиэ ю а. Хэв ю гот э хээнэт энд ни пэдз?'
        },
        {
          s: 'w',
          en: 'I have got a hairnet. But my knee pads are very tight.',
          ru: 'Сеточка у меня есть. Но мои наколенники очень тесные.',
          uz: 'Menda soch to\\'ri bor. Lekin tizza himoyachilarim juda tor.',
          tj: 'Ман тӯри мӯй дорам. Аммо зонубандҳои ман хеле танг ҳастанд.',
          kg: 'Менде чач торчосу бар. Бирок тизе коргоочуларым өтө тар.',
          kz: 'Менде шаш торы бар. Бірақ тізеқаптарым өте тар.',
          transcr: 'Ай хэв гот э хээнэт. Бат май ни пэдз ар вери тайт.'
        },
        {
          s: 'm',
          en: 'They are uncomfortable. Take these new knee pads. They are loose.',
          ru: 'Они неудобные. Возьми эти новые наколенники. Они свободные.',
          uz: 'Ular noqulay. Bu yangi tizza himoyachilarini ol. Ular keng.',
          tj: 'Онҳо нороҳатанд. Ин зонубандҳои навро гиред. Онҳо васеъ ҳастанд.',
          kg: 'Алар ыңгайсыз. Бул жаңы тизе коргоочуларды ал. Алар кенен.',
          kz: 'Олар ыңғайсыз. Мына жаңа тізеқаптарды ал. Олар кең.',
          transcr: 'Зэй ар анкамфэтэбл. Тэйк зиз нью ни пэдз. Зэй ар лус.'
        },
        {
          s: 'w',
          en: 'Thank you. The new knee pads are comfortable and light.',
          ru: 'Спасибо. Новые наколенники удобные и легкие.',
          uz: 'Rahmat. Yangi tizza himoyachilari qulay va yengil.',
          tj: 'Ташаккур. Зонубандҳои нав бароҳат ва сабуканд.',
          kg: 'Рахмат. Жаңы тизе коргоочулар ыңгайлуу жана жеңил.',
          kz: 'Рақмет. Жаңа тізеқаптар ыңғайлы әрі жеңіл.',
          transcr: 'Сэнк ю. Зэ нью ни пэдз ар камфэтэбл энд лайт.'
        },
        {
          s: 'm',
          en: 'One more thing. Has your partner got an apron?',
          ru: 'Ещё одно. У твоего напарника есть фартук?',
          uz: 'Yana bir narsa. Sening sherigingda fartuk bormi?',
          tj: 'Боз як чиз. Оё ҳамкори шумо пешдоман дорад?',
          kg: 'Дагы бир нерсе. Сенин өнөктөшүңдө алжапкыч барбы?',
          kz: 'Тағы бір нәрсе. Сенің серіктесіңде алжапқыш бар ма?',
          transcr: 'Уан мо син. Хэз ё патнэ гот эн эйпрэн?'
        },
        {
          s: 'w',
          en: 'No, he hasn\\'t. His apron is very dirty.',
          ru: 'Нет. Его фартук очень грязный.',
          uz: 'Yo\\'q. Uning fartugi juda iflos.',
          tj: 'Не. Пешдомани ӯ хеле ифлос аст.',
          kg: 'Жок. Анын алжапкычы өтө кир.',
          kz: 'Жоқ. Оның алжапқышы өте кір.',
          transcr: 'Ноу, хи хэзнт. Хиз эйпрэн из вери дёти.'
        }
      ],
      quiz: [
        {
          q: '\\'I ___ got my new rubber boots.\\'',
          opts: [
            'has',
            'am',
            'have',
            'does'
          ],
          c: 2,
          hint_ru: 'У меня есть новые резиновые сапоги'
        },
        {
          q: 'Adjective order: \\'a ___ jacket\\'',
          opts: [
            'waterproof heavy black',
            'black waterproof heavy',
            'heavy black waterproof',
            'heavy waterproof black'
          ],
          c: 2,
          hint_ru: 'Прилагательное размера/качества идет раньше цвета: тяжелая черная непромокаемая'
        },
        {
          q: '\\'She ___ got heavy boots.\\' (negative)',
          opts: [
            'has',
            'haven\\'t',
            'hasn\\'t',
            'have'
          ],
          c: 2,
          hint_ru: 'У неё нет (She)'
        },
        {
          q: 'How to translate \\'удобный\\'? (comfortable)',
          opts: [
            'dangerous',
            'comfortable',
            'tight',
            'loose'
          ],
          c: 1,
          hint_ru: 'Удобный'
        },
        {
          q: '\\'___ he got a clean apron?\\' (question)',
          opts: [
            'Have',
            'Has',
            'Does',
            'Is'
          ],
          c: 1,
          hint_ru: 'Вопрос для He'
        },
        {
          q: 'What is the opposite of \\'wet\\'? (мокрый)',
          opts: [
            'heavy',
            'dry',
            'warm',
            'short'
          ],
          c: 1,
          hint_ru: 'Антоним слова "мокрый"'
        },
        {
          q: 'What is \\'hairnet\\'? (сеточка)',
          opts: [
            'Сеточка для волос',
            'Наколенники',
            'Респиратор',
            'Фартук'
          ],
          c: 0,
          hint_ru: 'Hair + net (волосы + сеть)'
        },
        {
          q: '\\'My shoes are very ___, they hurt my feet.\\' (тесные)',
          opts: [
            'loose',
            'comfortable',
            'tight',
            'safe'
          ],
          c: 2,
          hint_ru: 'Они делают больно ногам, значит они тесные'
        },
        {
          q: '\\'We ___ got knee pads.\\' (negative)',
          opts: [
            'hasn\\'t',
            'don\\'t',
            'haven\\'t',
            'isn\\'t'
          ],
          c: 2,
          hint_ru: 'Отрицание для We'
        },
        {
          q: '\\'Always wear a hard hat. It is ___!\\' (безопасный)',
          opts: [
            'dangerous',
            'safe',
            'broken',
            'wet'
          ],
          c: 1,
          hint_ru: 'Носить каску — это безопасно'
        }
      ]
    }`;

text_replaced = text.replace(/    \{\s*id: 8,[\s\S]*?(?=\s*\{\s*id: 9,)/, l8 + '\n');
fs.writeFileSync('a1.html', text_replaced);
console.log('Successfully replaced Lesson 8!');
