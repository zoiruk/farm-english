const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');

const l10 = `    {
      id: 10,
      mod: 5,
      name_ru: 'В магазине Tesco',
      name_uz: 'Tesco do\\'konida',
      name_tj: 'Дар дӯкони Tesco',
      name_kg: 'Tesco дүкөнүндө',
      name_kz: 'Tesco дүкенінде',
      cefr: 'Food & drink vocabulary · Shopping · How much/many · want/would like',
      grammar: {
        title_ru: 'HOW MUCH / HOW MANY · WANT / WOULD LIKE',
        title_uz: 'HOW MUCH / HOW MANY · WANT / WOULD LIKE',
        title_tj: 'HOW MUCH / HOW MANY · WANT / WOULD LIKE',
        title_kg: 'HOW MUCH / HOW MANY · WANT / WOULD LIKE',
        title_kz: 'HOW MUCH / HOW MANY · WANT / WOULD LIKE',
        rule_ru: '<code>How much</code> = сколько (для неисчисляемых: milk, rice, money).<br><code>How many</code> = сколько (для исчисляемых: eggs, bananas, bags).<br>В Британии <b>НЕВЕЖЛИВО</b> говорить <code>I want</code> (я хочу). Всегда используйте вежливое <code>I would like</code> или кратко <code>I\\'d like</code> (мне бы хотелось).',
        rule_uz: '<code>How much</code> = qancha (sanalmaydigan: milk, rice, money).<br><code>How many</code> = nechta (sanaladigan: eggs, bananas, bags).<br>Britaniyada <code>I want</code> (men xohlayman) deyish <b>QO\\'POL</b> hisoblanadi. Har doim xushmuomala <code>I would like</code> yoki qisqacha <code>I\\'d like</code> (men xohlardim) dan foydalaning.',
        rule_tj: '<code>How much</code> = чанд (ҳисобнашаванда: milk, rice, money).<br><code>How many</code> = чанд (ҳисобшаванда: eggs, bananas, bags).<br>Дар Бритониё <code>I want</code> (ман мехоҳам) гуфтан <b>БЕАДАБӢ</b> аст. Ҳамеша муассабона <code>I would like</code> ё кӯтоҳ <code>I\\'d like</code> (ман мехостам) -ро истифода баред.',
        rule_kg: '<code>How much</code> = канча (эсептелбейт: milk, rice, money).<br><code>How many</code> = канча (эсептелет: eggs, bananas, bags).<br>Британияда <code>I want</code> (мен каалайм) деп айтуу <b>СЫЛЫК ЭМЕС</b>. Дайыма сылык <code>I would like</code> же кыскача <code>I\\'d like</code> (мен каалайт элем) колдонуңуз.',
        rule_kz: '<code>How much</code> = қанша (саналмайтын: milk, rice, money).<br><code>How many</code> = қанша (саналатын: eggs, bananas, bags).<br>Британияда <code>I want</code> (мен қалаймын) деп айту <b>ДӨРЕКІЛІК</b> болып саналады. Әрқашан сыпайы <code>I would like</code> немесе қысқаша <code>I\\'d like</code> (маған қажет еді) қолданыңыз.',
        tables: [
          {
            title: '✅ Polite Request (Вежливая просьба)',
            rows: [
              {
                subj: 'I / We / He / She',
                verb: 'would like (\\'d like)',
                example: 'I\\'d like some cheese, please.',
                transcr: 'Айд лайк сам чиз, плиз',
                tr_ru: 'Мне бы хотелось немного сыра, пожалуйста',
                tr_uz: 'Iltimos, menga biroz pishloq bering',
                tr_tj: 'Лутфан, ба ман каме панир диҳед',
                tr_kg: 'Суранам, мага бир аз сыр бериңиз',
                tr_kz: 'Өтінемін, маған аздап ірімшік беріңіз'
              }
            ]
          },
          {
            title: '❌ Negative / Want (Отрицание)',
            rows: [
              {
                subj: 'I / You / We',
                verb: 'do not want (don\\'t want)',
                example: 'I don\\'t want this expensive meat.',
                transcr: 'Ай доунт уонт зис икспэнсив мит',
                tr_ru: 'Я не хочу это дорогое мясо',
                tr_uz: 'Men bu qimmat go\\'shtni xohlamayman',
                tr_tj: 'Ман ин гӯшти гаронбаҳоро намехоҳам',
                tr_kg: 'Мен бул кымбат этти каалабайм',
                tr_kz: 'Мен мына қымбат етті қаламаймын'
              }
            ]
          },
          {
            title: '❓ Question (Вопрос о количестве)',
            rows: [
              {
                subj: 'How much',
                verb: 'milk / rice',
                example: 'How much milk would you like?',
                transcr: 'Хау мач милк вуд ю лайк?',
                tr_ru: 'Сколько молока вы бы хотели?',
                tr_uz: 'Qancha sut xohlaysiz?',
                tr_tj: 'Чӣ қадар шир мехоҳед?',
                tr_kg: 'Канча сүт каалайсыз?',
                tr_kz: 'Қанша сүт қалайсыз?'
              },
              {
                subj: 'How many',
                verb: 'eggs / bananas',
                example: 'How many bananas do you want?',
                transcr: 'Хау мэни бэнаназ ду ю уонт?',
                tr_ru: 'Сколько бананов ты хочешь?',
                tr_uz: 'Nechta banan xohlaysan?',
                tr_tj: 'Чанд банан мехоҳед?',
                tr_kg: 'Канча банан каалайсың?',
                tr_kz: 'Қанша банан қалайсың?'
              }
            ]
          }
        ],
        examples: [
          {
            en: 'I\\'d like a packet of pasta and some garlic, please.',
            ru: 'Мне бы хотелось пачку макарон и немного чеснока, пожалуйста.',
            uz: 'Iltimos, menga bir pachka makaron va biroz sarimsoq bering.',
            tj: 'Лутфан, ба ман як қуттӣ макарон ва каме сирпиёз диҳед.',
            kg: 'Суранам, мага бир пачка макарон жана бир аз сарымсак бериңиз.',
            kz: 'Өтінемін, маған бір қорап макарон және аздап сарымсақ беріңіз.'
          },
          {
            en: 'How much is this chicken? It is very expensive.',
            ru: 'Сколько стоит эта курица? Она очень дорогая.',
            uz: 'Bu tovuq qancha turadi? U juda qimmat.',
            tj: 'Ин мурғ чанд пул аст? Он хеле гарон аст.',
            kg: 'Бул тоок канча турат? Ал абдан кымбат.',
            kz: 'Бұл тауық қанша тұрады? Ол өте қымбат.'
          },
          {
            en: 'How many potatoes do we need? Just a bag.',
            ru: 'Сколько картошки нам нужно? Всего лишь пакет.',
            uz: 'Bizga qancha kartoshka kerak? Faqat bir xalta.',
            tj: 'Ба мо чӣ қадар картошка лозим аст? Фақат як халта.',
            kg: 'Бизге канча картошка керек? Жөн гана бир баштык.',
            kz: 'Бізге қанша картоп керек? Тек бір қапшық.'
          },
          {
            en: 'Would you like to pay by cash or card?',
            ru: 'Вы бы хотели оплатить наличными или картой?',
            uz: 'Siz naqd pul yoki karta orqali to\\'lamoqchimisiz?',
            tj: 'Шумо мехоҳед бо пули нақд ё корт пардохт кунед?',
            kg: 'Накталай акча же карта менен төлөөнү каалайсызбы?',
            kz: 'Қолма-қол ақшамен немесе картамен төлегіңіз келе ме?'
          },
          {
            en: 'I don\\'t want sugar or salt. I want fresh fish.',
            ru: 'Я не хочу сахар или соль. Я хочу свежую рыбу.',
            uz: 'Men shakar yoki tuz xohlamayman. Men yangi baliq xohlayman.',
            tj: 'Ман шакар ё намак намехоҳам. Ман моҳии тару тоза мехоҳам.',
            kg: 'Мен кумшекер же туз каалабайм. Мен жаңы балык каалайм.',
            kz: 'Мен қант немесе тұз қаламаймын. Мен жаңа балық қалаймын.'
          },
          {
            en: 'There is a discount on this butter today.',
            ru: 'Сегодня на это сливочное масло есть скидка.',
            uz: 'Bugun bu sariyog\\'ga chegirma bor.',
            tj: 'Имрӯз ба ин маска тахфиф ҳаст.',
            kg: 'Бүгүн бул сары майга арзандатуу бар.',
            kz: 'Бүгін бұл сары майға жеңілдік бар.'
          },
          {
            en: 'Can I have a receipt, please? Yes, here you are.',
            ru: 'Можно мне чек, пожалуйста? Да, вот, пожалуйста.',
            uz: 'Kvitansiyani olsam maylimi, iltimos? Ha, marhamat.',
            tj: 'Метавонам квитансияро гирам, лутфан? Бале, марҳамат.',
            kg: 'Чекти алсам болобу, суранам? Ооба, минеки.',
            kz: 'Чекті алсам бола ма, өтінемін? Иә, мінеки.'
          },
          {
            en: 'How much oil and flour is in the tin?',
            ru: 'Сколько масла и муки в этой банке?',
            uz: 'Bu bankada qancha yog\\' va un bor?',
            tj: 'Дар ин қуттӣ чӣ қадар равған ва орд ҳаст?',
            kg: 'Бул банкада канча май жана ун бар?',
            kz: 'Бұл қалбырда қанша май және ұн бар?'
          },
          {
            en: 'I\\'d like to buy some cheap sausages and onions.',
            ru: 'Мне бы хотелось купить дешевые сосиски и лук.',
            uz: 'Men biroz arzon sosiska va piyoz sotib olmoqchiman.',
            tj: 'Ман мехоҳам каме ҳасибҳои арзон ва пиёз харам.',
            kg: 'Мен бир аз арзан сосиска жана пияз сатып алгым келет.',
            kz: 'Мен аздап арзан шұжық пен пияз сатып алғым келеді.'
          },
          {
            en: 'This bottle of milk is one pound and fifty pence (£1.50).',
            ru: 'Эта бутылка молока стоит один фунт и пятьдесят пенсов (£1.50).',
            uz: 'Bu bir butilka sut bir funt ellik pens turadi (£1.50).',
            tj: 'Ин як шиша шир як фунту панҷоҳ пенс аст (£1.50).',
            kg: 'Бул бир бөтөлкө сүт бир фунт элүү пенс турат (£1.50).',
            kz: 'Бұл бір бөтелке сүт бір фунт елу пенс тұрады (£1.50).'
          }
        ]
      },
      words: [
        {
          e: '🍞',
          en: 'bread',
          ru: 'хлеб',
          uz: 'non',
          tj: 'нон',
          kg: 'нан',
          kz: 'нан',
          pn: '/bred/',
          transcr: 'брэд'
        },
        {
          e: '🥛',
          en: 'milk',
          ru: 'молоко',
          uz: 'sut',
          tj: 'шир',
          kg: 'сүт',
          kz: 'сүт',
          pn: '/mɪlk/',
          transcr: 'милк'
        },
        {
          e: '🍚',
          en: 'rice',
          ru: 'рис',
          uz: 'guruch',
          tj: 'биринҷ',
          kg: 'күрүч',
          kz: 'күріш',
          pn: '/raɪs/',
          transcr: 'райс'
        },
        {
          e: '🥚',
          en: 'eggs',
          ru: 'яйца',
          uz: 'tuxumlar',
          tj: 'тухмҳо',
          kg: 'жумурткалар',
          kz: 'жұмыртқалар',
          pn: '/eɡz/',
          transcr: 'эгз'
        },
        {
          e: '🧾',
          en: 'receipt',
          ru: 'чек',
          uz: 'kvitansiya',
          tj: 'квитансия',
          kg: 'чек',
          kz: 'чек',
          pn: '/rɪˈsiːt/',
          transcr: 'рисит'
        },
        {
          e: '💷',
          en: 'pound (£) / pence (p)',
          ru: 'фунт / пенс',
          uz: 'funt / pens',
          tj: 'фунт / пенс',
          kg: 'фунт / пенс',
          kz: 'фунт / пенс',
          pn: '/paʊnd / pens/',
          transcr: 'паунд / пенс'
        },
        {
          e: '🧀',
          en: 'cheese',
          ru: 'сыр',
          uz: 'pishloq',
          tj: 'панир',
          kg: 'сыр',
          kz: 'ірімшік',
          pn: '/tʃiːz/',
          transcr: 'чиз'
        },
        {
          e: '🥩',
          en: 'meat',
          ru: 'мясо',
          uz: 'go\\'sht',
          tj: 'гӯшт',
          kg: 'эт',
          kz: 'ет',
          pn: '/miːt/',
          transcr: 'мит'
        },
        {
          e: '🍗',
          en: 'chicken',
          ru: 'курица',
          uz: 'tovuq',
          tj: 'мурғ',
          kg: 'тоок',
          kz: 'тауық',
          pn: '/ˈtʃɪkɪn/',
          transcr: 'чикин'
        },
        {
          e: '🐟',
          en: 'fish',
          ru: 'рыба',
          uz: 'baliq',
          tj: 'моҳӣ',
          kg: 'балык',
          kz: 'балық',
          pn: '/fɪʃ/',
          transcr: 'фиш'
        },
        {
          e: '🧈',
          en: 'butter',
          ru: 'сливочное масло',
          uz: 'sariyog\\'',
          tj: 'маска',
          kg: 'сары май',
          kz: 'сары май',
          pn: '/ˈbʌtə/',
          transcr: 'батэ'
        },
        {
          e: '🫗',
          en: 'oil',
          ru: 'растительное масло',
          uz: 'yog\\'',
          tj: 'равған',
          kg: 'өсүмдүк майы',
          kz: 'өсімдік майы',
          pn: '/ɔɪl/',
          transcr: 'ойл'
        },
        {
          e: '🍯',
          en: 'sugar',
          ru: 'сахар',
          uz: 'shakar',
          tj: 'шакар',
          kg: 'кумшекер',
          kz: 'қант',
          pn: '/ˈʃʊɡə/',
          transcr: 'шугэ'
        },
        {
          e: '🧂',
          en: 'salt',
          ru: 'соль',
          uz: 'tuz',
          tj: 'намак',
          kg: 'туз',
          kz: 'тұз',
          pn: '/sɔːlt/',
          transcr: 'солт'
        },
        {
          e: '🌶️',
          en: 'pepper',
          ru: 'перец',
          uz: 'murch',
          tj: 'мурч',
          kg: 'калемпир',
          kz: 'бұрыш',
          pn: '/ˈpepə/',
          transcr: 'пепэ'
        },
        {
          e: '🥔',
          en: 'potato',
          ru: 'картошка',
          uz: 'kartoshka',
          tj: 'картошка',
          kg: 'картошка',
          kz: 'картоп',
          pn: '/pəˈteɪtəʊ/',
          transcr: 'пэтэйтоу'
        },
        {
          e: '🧅',
          en: 'onion',
          ru: 'лук',
          uz: 'piyoz',
          tj: 'пиёз',
          kg: 'пияз',
          kz: 'пияз',
          pn: '/ˈʌnjən/',
          transcr: 'аньйэн'
        },
        {
          e: '🧄',
          en: 'garlic',
          ru: 'чеснок',
          uz: 'sarimsoq',
          tj: 'сирпиёз',
          kg: 'сарымсак',
          kz: 'сарымсақ',
          pn: '/ˈɡɑːlɪk/',
          transcr: 'галик'
        },
        {
          e: '🍝',
          en: 'pasta',
          ru: 'макароны',
          uz: 'makaron',
          tj: 'макарон',
          kg: 'макарон',
          kz: 'макарон',
          pn: '/ˈpæstə/',
          transcr: 'пэстэ'
        },
        {
          e: '🌾',
          en: 'flour',
          ru: 'мука',
          uz: 'un',
          tj: 'орд',
          kg: 'ун',
          kz: 'ұн',
          pn: '/ˈflaʊə/',
          transcr: 'флауэ'
        },
        {
          e: '🍌',
          en: 'banana',
          ru: 'банан',
          uz: 'banan',
          tj: 'банан',
          kg: 'банан',
          kz: 'банан',
          pn: '/bəˈnɑːnə/',
          transcr: 'бэнана'
        },
        {
          e: '🌭',
          en: 'sausage',
          ru: 'сосиска / колбаса',
          uz: 'sosiska',
          tj: 'ҳасиб',
          kg: 'сосиска',
          kz: 'шұжық',
          pn: '/ˈsɒsɪdʒ/',
          transcr: 'сосидж'
        },
        {
          e: '🍾',
          en: 'bottle',
          ru: 'бутылка',
          uz: 'butilka',
          tj: 'шиша',
          kg: 'бөтөлкө',
          kz: 'бөтелке',
          pn: '/ˈbɒtl/',
          transcr: 'ботл'
        },
        {
          e: '🥫',
          en: 'tin',
          ru: 'жестяная банка',
          uz: 'konserva',
          tj: 'консерва',
          kg: 'банка',
          kz: 'қалбыр',
          pn: '/tɪn/',
          transcr: 'тин'
        },
        {
          e: '📦',
          en: 'packet',
          ru: 'пачка / упаковка',
          uz: 'pachka',
          tj: 'қуттӣ',
          kg: 'пачка',
          kz: 'қорап',
          pn: '/ˈpækɪt/',
          transcr: 'пэкит'
        },
        {
          e: '📉',
          en: 'cheap',
          ru: 'дешевый',
          uz: 'arzon',
          tj: 'арзон',
          kg: 'арзан',
          kz: 'арзан',
          pn: '/tʃiːp/',
          transcr: 'чип'
        },
        {
          e: '💎',
          en: 'expensive',
          ru: 'дорогой',
          uz: 'qimmat',
          tj: 'гарон',
          kg: 'кымбат',
          kz: 'қымбат',
          pn: '/ɪkˈspensɪv/',
          transcr: 'икспэнсив'
        },
        {
          e: '🏷️',
          en: 'discount',
          ru: 'скидка',
          uz: 'chegirma',
          tj: 'тахфиф',
          kg: 'арзандатуу',
          kz: 'жеңілдік',
          pn: '/ˈdɪskaʊnt/',
          transcr: 'дискаунт'
        },
        {
          e: '💵',
          en: 'cash',
          ru: 'наличные',
          uz: 'naqd pul',
          tj: 'пули нақд',
          kg: 'накталай акча',
          kz: 'қолма-қол ақша',
          pn: '/kæʃ/',
          transcr: 'кэш'
        },
        {
          e: '💳',
          en: 'card',
          ru: 'карта',
          uz: 'karta',
          tj: 'корт',
          kg: 'карта',
          kz: 'карта',
          pn: '/kɑːd/',
          transcr: 'кад'
        }
      ],
      dialogue: [
        {
          s: 'w',
          en: 'Excuse me. How much is this chicken?',
          ru: 'Извините. Сколько стоит эта курица?',
          uz: 'Kechirasiz. Bu tovuq qancha?',
          tj: 'Бубахшед. Ин мурғ чанд пул аст?',
          kg: 'Кечириңиз. Бул тоок канча турат?',
          kz: 'Кешіріңіз. Бұл тауық қанша тұрады?',
          transcr: 'Икскьюз ми. Хау мач из зис чикин?'
        },
        {
          s: 'm',
          en: 'It is four pounds and fifty pence (£4.50).',
          ru: 'Она стоит четыре фунта и пятьдесят пенсов (£4.50).',
          uz: 'Bu to\\'rt funt ellik pens (£4.50).',
          tj: 'Он чор фунту панҷоҳ пенс аст (£4.50).',
          kg: 'Бул төрт фунт элүү пенс (£4.50).',
          kz: 'Ол төрт фунт елу пенс тұрады (£4.50).',
          transcr: 'Ит из фо паундз энд фифти пэнс.'
        },
        {
          s: 'w',
          en: 'That is quite expensive. Is there a discount?',
          ru: 'Это довольно дорого. Есть ли скидка?',
          uz: 'Bu ancha qimmat. Chegirma bormi?',
          tj: 'Ин хеле гарон аст. Оё тахфиф ҳаст?',
          kg: 'Бул кыйла кымбат. Арзандатуу барбы?',
          kz: 'Бұл айтарлықтай қымбат. Жеңілдік бар ма?',
          transcr: 'Зэт из куайт икспэнсив. Из зеэр э дискаунт?'
        },
        {
          s: 'm',
          en: 'No, but these sausages are very cheap today.',
          ru: 'Нет, но эти сосиски сегодня очень дешевые.',
          uz: 'Yo\\'q, lekin bu sosiskalar bugun juda arzon.',
          tj: 'Не, аммо ин ҳасибҳо имрӯз хеле арзон ҳастанд.',
          kg: 'Жок, бирок бул сосискалар бүгүн абдан арзан.',
          kz: 'Жоқ, бірақ бұл шұжықтар бүгін өте арзан.',
          transcr: 'Ноу, бат зиз сосиджиз а вери чип тэдэй.'
        },
        {
          s: 'w',
          en: 'Okay, I\\'d like two packets of sausages, please.',
          ru: 'Хорошо, мне бы хотелось две пачки сосисок, пожалуйста.',
          uz: 'Yaxshi, iltimos menga ikki pachka sosiska bering.',
          tj: 'Хуб, лутфан ба ман ду қуттӣ ҳасиб диҳед.',
          kg: 'Макул, мага эки пачка сосиска бериңизчи.',
          kz: 'Жақсы, өтінемін, маған екі қорап шұжық беріңіз.',
          transcr: 'Оукей, айд лайк ту пэкитс ов сосиджиз, плиз.'
        },
        {
          s: 'm',
          en: 'Sure. Would you like anything else? Milk or bread?',
          ru: 'Конечно. Хотели бы вы что-нибудь еще? Молоко или хлеб?',
          uz: 'Albatta. Yana biror narsa xohlaysizmi? Sut yoki non?',
          tj: 'Албатта. Боз чизе мехоҳед? Шир ё нон?',
          kg: 'Албетте. Дагы бир нерсе каалайсызбы? Сүт же нан?',
          kz: 'Әрине. Тағы бір нәрсе қалайсыз ба? Сүт немесе нан?',
          transcr: 'Шуэ. Вуд ю лайк энисин элс? Милк о брэд?'
        },
        {
          s: 'w',
          en: 'Yes, I\\'d like a bottle of milk and some cheese.',
          ru: 'Да, я бы хотел бутылку молока и немного сыра.',
          uz: 'Ha, men bir butilka sut va biroz pishloq olmoqchiman.',
          tj: 'Бале, ман як шиша шир ва каме панир мехоҳам.',
          kg: 'Ооба, мен бир бөтөлкө сүт жана бир аз сыр алгым келет.',
          kz: 'Иә, мен бір бөтелке сүт және аздап ірімшік алғым келеді.',
          transcr: 'Йес, айд лайк э ботл ов милк энд сам чиз.'
        },
        {
          s: 'm',
          en: 'That will be nine pounds (£9.00). Would you like a bag?',
          ru: 'С вас девять фунтов (£9.00). Вам нужен пакет?',
          uz: 'Bu to\\'qqiz funt bo\\'ladi (£9.00). Xalta xohlaysizmi?',
          tj: 'Ин нӯҳ фунт мешавад (£9.00). Шумо халта мехоҳед?',
          kg: 'Бул тогуз фунт болот (£9.00). Сиз баштык каалайсызбы?',
          kz: 'Бұл тоғыз фунт болады (£9.00). Сізге пакет керек пе?',
          transcr: 'Зэт уил би найн паундз. Вуд ю лайк э бэг?'
        },
        {
          s: 'w',
          en: 'No, thank you. I have my bag. Can I pay by card?',
          ru: 'Нет, спасибо. У меня есть свой пакет. Могу я оплатить картой?',
          uz: 'Yo\\'q, rahmat. Mening xaltam bor. Karta orqali to\\'lasam bo\\'ladimi?',
          tj: 'Не, ташаккур. Ман халта дорам. Метавонам бо корт пардохт кунам?',
          kg: 'Жок, рахмат. Менин баштыгым бар. Карта менен төлөсөм болобу?',
          kz: 'Жоқ, рақмет. Менің пакетім бар. Картамен төлеуге бола ма?',
          transcr: 'Ноу, сэнк ю. Ай хэв май бэг. Кэн ай пэй бай кад?'
        },
        {
          s: 'm',
          en: 'Yes, of course. Here is your receipt. Have a good day!',
          ru: 'Да, конечно. Вот ваш чек. Хорошего дня!',
          uz: 'Ha, albatta. Mana sizning kvitansiyangiz. Yaxshi kun tilayman!',
          tj: 'Бале, албатта. Ин квитансияи шумо. Рӯзи хуб!',
          kg: 'Ооба, албетте. Бул сиздин чекиңиз. Күнүңүз жакшы өтсүн!',
          kz: 'Иә, әрине. Міне сіздің чегіңіз. Күніңіз сәтті өтсін!',
          transcr: 'Йес, ов кос. Хиэ из ё рисит. Хэв э гуд дэй!'
        }
      ],
      quiz: [
        {
          q: '\\'How ___ milk do you want?\\' (milk = uncountable)',
          opts: [
            'many',
            'much',
            'any',
            'some'
          ],
          c: 1,
          hint_ru: 'Молоко нельзя посчитать поштучно (одно молоко, два молока), поэтому используем much'
        },
        {
          q: '\\'How ___ eggs do you need?\\' (eggs = countable)',
          opts: [
            'much',
            'some',
            'many',
            'any'
          ],
          c: 2,
          hint_ru: 'Яйца можно посчитать (одно яйцо, два яйца), поэтому используем many'
        },
        {
          q: 'The MOST POLITE way to order in a shop:',
          opts: [
            'I want six eggs',
            'Give me six eggs',
            'I\\'d like six eggs, please',
            'Six eggs!'
          ],
          c: 2,
          hint_ru: 'В Британии всегда нужно использовать I would like (I\\'d like) для вежливости'
        },
        {
          q: 'How to translate \\'дешевый\\'? (cheap)',
          opts: [
            'expensive',
            'cheap',
            'discount',
            'cash'
          ],
          c: 1,
          hint_ru: 'Дешевый по-английски cheap'
        },
        {
          q: '\\'I want a ___ of pasta.\\' (пачка)',
          opts: [
            'bottle',
            'tin',
            'packet',
            'pound'
          ],
          c: 2,
          hint_ru: 'Пачка или упаковка — это packet'
        },
        {
          q: 'What is the opposite of \\'expensive\\'? (дорогой)',
          opts: [
            'cheap',
            'receipt',
            'cash',
            'sugar'
          ],
          c: 0,
          hint_ru: 'Антоним дорогого — дешевый (cheap)'
        },
        {
          q: '\\'Can I pay by ___?\\' (карта)',
          opts: [
            'cash',
            'discount',
            'receipt',
            'card'
          ],
          c: 3,
          hint_ru: 'Карта — это card'
        },
        {
          q: 'What is \\'garlic\\'? (чеснок)',
          opts: [
            'лук',
            'картошка',
            'чеснок',
            'масло'
          ],
          c: 2,
          hint_ru: 'Garlic — это чеснок'
        },
        {
          q: '\\'I don\\'t want any ___ in my tea.\\' (сахар)',
          opts: [
            'salt',
            'sugar',
            'pepper',
            'flour'
          ],
          c: 1,
          hint_ru: 'В чай обычно добавляют сахар (sugar)'
        },
        {
          q: '\\'Here is your ___ for £4.50.\\' (чек)',
          opts: [
            'receipt',
            'discount',
            'card',
            'packet'
          ],
          c: 0,
          hint_ru: 'Бумажка об оплате — это чек (receipt)'
        }
      ]
    }`;

text_replaced = text.replace(/    \{\s*id: 10,[\s\S]*?(?=\s*\{\s*id: 11,)/, l10 + '\n');
fs.writeFileSync('a1.html', text_replaced);
console.log('Successfully replaced Lesson 10!');
