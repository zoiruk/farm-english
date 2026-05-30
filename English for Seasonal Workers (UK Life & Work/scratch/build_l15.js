const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');

const l15 = `    {
      id: 15,
      mod: 6,
      name_ru: 'Чай? С удовольствием! ☕',
      name_uz: 'Choy? Jon deb! ☕',
      name_tj: 'Чой? Бо камоли майл! ☕',
      name_kg: 'Чайбы? Жакшы болот! ☕',
      name_kz: 'Шай ма? Қуана-қуана! ☕',
      cefr: 'Social interaction · Would you like? · British politeness & Small talk',
      grammar: {
        title_ru: 'Британская вежливость (Would you like...?)',
        title_uz: 'Britancha xushmuomalalik (Would you like...?)',
        title_tj: 'Одоби бритониёӣ (Would you like...?)',
        title_kg: 'Британиялык сылыктык (Would you like...?)',
        title_kz: 'Британдық сыпайылық (Would you like...?)',
        rule_ru: 'В Англии очень важна вежливость. Для предложений используется фраза <b>Would you like...?</b> (Не хотели бы вы...?).<br>Предложение: <code>Would you like a cup of tea?</code> (Не хотите ли чашку чая?)<br>Ответ: <code>Yes, please.</code> (Да, пожалуйста) или <code>No, thank you.</code> (Нет, спасибо).<br>Выражение желания: <code>I would like a biscuit.</code> (Я бы хотел печенье).<br>Также британцы используют сленг: <b>Cheers</b> (спасибо/пока), <b>mate</b> (приятель), <b>Alright?</b> (вместо "как дела?").',
        rule_uz: 'Angliyada xushmuomalalik juda muhim. Takliflar uchun <b>Would you like...?</b> (... xohlaysizmi?) iborasi ishlatiladi.<br>Taklif: <code>Would you like a cup of tea?</code> (Bir piyola choy xohlaysizmi?)<br>Javob: <code>Yes, please.</code> (Ha, iltimos) yoki <code>No, thank you.</code> (Yo\\'q, rahmat).<br>Britaniyaliklar ko\\'p ishlatadigan so\\'zlar: <b>Cheers</b> (rahmat/xayr), <b>mate</b> (og\\'ayni), <b>Alright?</b> (qandaysiz?).',
        rule_tj: 'Дар Англия эҳтиром хеле муҳим аст. Барои пешниҳодҳо ибораи <b>Would you like...?</b> (... мехоҳед?) истифода мешавад.<br>Пешниҳод: <code>Would you like a cup of tea?</code> (Як пиёла чой мехоҳед?)<br>Ҷавоб: <code>Yes, please.</code> (Бале, лутфан) ё <code>No, thank you.</code> (Не, ташаккур).<br>Инчунин сленг истифода мешавад: <b>Cheers</b> (ташаккур/хайр), <b>mate</b> (ҷӯра), <b>Alright?</b> (чӣ хел?).',
        rule_kg: 'Англияда сылыктык абдан маанилүү. Сунуштар үчүн <b>Would you like...?</b> (... каалайсызбы?) сөз айкашы колдонулат.<br>Сунуш: <code>Would you like a cup of tea?</code> (Бир чыны чай каалайсызбы?)<br>Жооп: <code>Yes, please.</code> (Ооба, сураныч) же <code>No, thank you.</code> (Жок, рахмат).<br>Сленг: <b>Cheers</b> (рахмат/кош), <b>mate</b> (дос), <b>Alright?</b> (кандайсыз?).',
        rule_kz: 'Англияда сыпайылық өте маңызды. Ұсыныстар үшін <b>Would you like...?</b> (... қалайсыз ба?) тіркесі қолданылады.<br>Ұсыныс: <code>Would you like a cup of tea?</code> (Бір шыны шай қалайсыз ба?)<br>Жауап: <code>Yes, please.</code> (Иә, өтінемін) немесе <code>No, thank you.</code> (Жоқ, рақмет).<br>Сленг: <b>Cheers</b> (рақмет/сау бол), <b>mate</b> (дос), <b>Alright?</b> (қалайсыз?).',
        tables: [
          {
            title: '✅ Offers (Предложение)',
            rows: [
              {
                subj: 'Would',
                verb: 'you like',
                example: 'Would you like a cup of tea?',
                transcr: 'Вуд ю лайк э кап ов ти?',
                tr_ru: 'Не хотите ли чашку чая?',
                tr_uz: 'Bir piyola choy xohlaysizmi?',
                tr_tj: 'Як пиёла чой мехоҳед?',
                tr_kg: 'Бир чыны чай каалайсызбы?',
                tr_kz: 'Бір шыны шай қалайсыз ба?'
              },
              {
                subj: 'Would',
                verb: 'you like',
                example: 'Would you like a biscuit?',
                transcr: 'Вуд ю лайк э бискит?',
                tr_ru: 'Не хотите ли печенье?',
                tr_uz: 'Pechenye xohlaysizmi?',
                tr_tj: 'Кулчақанд мехоҳед?',
                tr_kg: 'Печенье каалайсызбы?',
                tr_kz: 'Печенье қалайсыз ба?'
              }
            ]
          },
          {
            title: '❓ Responses (Ответы)',
            rows: [
              {
                subj: 'Yes,',
                verb: 'please.',
                example: 'Yes, please. Thank you.',
                transcr: 'Йес, плиз. Сэнк ю.',
                tr_ru: 'Да, пожалуйста. Спасибо.',
                tr_uz: 'Ha, iltimos. Rahmat.',
                tr_tj: 'Бале, лутфан. Ташаккур.',
                tr_kg: 'Ооба, сураныч. Рахмат.',
                tr_kz: 'Иә, өтінемін. Рақмет.'
              },
              {
                subj: 'No,',
                verb: 'thank you.',
                example: 'No, thank you. I am fine.',
                transcr: 'Ноу, сэнк ю. Ай эм файн.',
                tr_ru: 'Нет, спасибо. Я в порядке.',
                tr_uz: 'Yo\\'q, rahmat. Men yaxshiman.',
                tr_tj: 'Не, ташаккур. Ман хубам.',
                tr_kg: 'Жок, рахмат. Мен жакшымын.',
                tr_kz: 'Жоқ, рақмет. Мен жақсымын.'
              }
            ]
          },
          {
            title: '⭐️ Desires (Желания)',
            rows: [
              {
                subj: 'I would',
                verb: 'like',
                example: 'I would like to rest.',
                transcr: 'Ай вуд лайк ту рэст',
                tr_ru: 'Я бы хотел отдохнуть.',
                tr_uz: 'Men dam olishni xohlardim.',
                tr_tj: 'Ман мехостам истироҳат кунам.',
                tr_kg: 'Мен эс алууну каалайт элем.',
                tr_kz: 'Мен демалғым келеді.'
              }
            ]
          }
        ],
        examples: [
          {
            en: 'Alright, mate? Are you tired today?',
            ru: 'Как дела, приятель? Ты сегодня устал?',
            uz: 'Qalaysiz, og\\'ayni? Bugun charchadingizmi?',
            tj: 'Чӣ хел, ҷӯра? Шумо имрӯз хаста шудед?',
            kg: 'Кандайсың, дос? Бүгүн чарчадыңбы?',
            kz: 'Қалайсың, дос? Бүгін шаршадың ба?'
          },
          {
            en: 'Yes, I am very busy today. It is hard work.',
            ru: 'Да, я сегодня очень занят. Это тяжелая работа.',
            uz: 'Ha, men bugun juda bandman. Bu qiyin ish.',
            tj: 'Бале, ман имрӯз хеле бандам. Ин кори душвор аст.',
            kg: 'Ооба, мен бүгүн абдан бошо эмесмин. Бул оор жумуш.',
            kz: 'Иә, мен бүгін өте бос емеспін. Бұл ауыр жұмыс.'
          },
          {
            en: 'Would you like a cup of tea and a biscuit?',
            ru: 'Не хочешь ли чашку чая и печенье?',
            uz: 'Bir piyola choy va pechenye xohlaysizmi?',
            tj: 'Як пиёла чой ва кулчақанд мехоҳед?',
            kg: 'Бир чыны чай жана печенье каалайсызбы?',
            kz: 'Бір шыны шай мен печенье қалайсыз ба?'
          },
          {
            en: 'Yes, please! That would be lovely.',
            ru: 'Да, пожалуйста! Это было бы прекрасно.',
            uz: 'Ha, iltimos! Bu ajoyib bo\\'lardi.',
            tj: 'Бале, лутфан! Ин олӣ мебуд.',
            kg: 'Ооба, сураныч! Бул сонун болмок.',
            kz: 'Иә, өтінемін! Бұл керемет болар еді.'
          },
          {
            en: 'Are you hungry or thirsty?',
            ru: 'Ты голоден или хочешь пить?',
            uz: 'Siz ochmisiz yoki chanqaganmisiz?',
            tj: 'Шумо гурусна ё ташна ҳастед?',
            kg: 'Сиз ачсызбы же суусадыңызбы?',
            kz: 'Сіз ашсыз ба немесе шөлдедіңіз бе?'
          },
          {
            en: 'I am thirsty. I would like some water, please.',
            ru: 'Я хочу пить. Я бы хотел воды, пожалуйста.',
            uz: 'Men chanqadim. Iltimos, suv olsam degandim.',
            tj: 'Ман ташнаам. Ман каме об мехостам, лутфан.',
            kg: 'Мен суусадым. Мага суу керек эле, сураныч.',
            kz: 'Мен шөлдедім. Маған су керек еді, өтінемін.'
          },
          {
            en: 'Excuse me, is this seat free?',
            ru: 'Извините, это место свободно?',
            uz: 'Kechirasiz, bu joy bo\\'shmi?',
            tj: 'Мебахшед, ин ҷой озод аст?',
            kg: 'Кечиресиз, бул орун бошпу?',
            kz: 'Кешіріңіз, бұл орын бос па?'
          },
          {
            en: 'Of course, mate. You\\'re welcome to sit.',
            ru: 'Конечно, приятель. Пожалуйста, садись (Добро пожаловать).',
            uz: 'Albatta, og\\'ayni. O\\'tirishingiz mumkin.',
            tj: 'Албатта, ҷӯра. Метавонед нишинед.',
            kg: 'Албетте, дос. Отурсаңыз болот.',
            kz: 'Әрине, дос. Отыруға болады.'
          },
          {
            en: 'Lovely weather today! Enjoy your weekend!',
            ru: 'Прекрасная погода сегодня! Наслаждайся выходными!',
            uz: 'Bugun ob-havo ajoyib! Dam olish kunlaringizni yaxshi o\\'tkazing!',
            tj: 'Обу ҳавои зебо имрӯз! Аз рӯзҳои истироҳат лаззат баред!',
            kg: 'Бүгүн аба ырайы сонун! Дем алыш күндөрүңүздү жакшы өткөрүңүз!',
            kz: 'Бүгін ауа райы керемет! Демалыс күндеріңізді жақсы өткізіңіз!'
          },
          {
            en: 'Cheers, mate! See you tomorrow.',
            ru: 'Спасибо, приятель! Увидимся завтра.',
            uz: 'Rahmat, og\\'ayni! Ertaga ko\\'rishguncha.',
            tj: 'Ташаккур, ҷӯра! Фардо мебинем.',
            kg: 'Рахмат, дос! Эртең көрүшкөнчө.',
            kz: 'Рақмет, дос! Ертең кездескенше.'
          }
        ]
      },
      words: [
        {
          e: '🙏',
          en: 'please',
          ru: 'пожалуйста',
          uz: 'iltimos',
          tj: 'лутфан',
          kg: 'сураныч',
          kz: 'өтінемін',
          pn: '/pliːz/',
          transcr: 'плиз'
        },
        {
          e: '🤝',
          en: 'thank you',
          ru: 'спасибо',
          uz: 'rahmat',
          tj: 'ташаккур',
          kg: 'рахмат',
          kz: 'рақмет',
          pn: '/θæŋk juː/',
          transcr: 'сэнк ю'
        },
        {
          e: '😔',
          en: 'sorry',
          ru: 'извините',
          uz: 'kechirasiz',
          tj: 'мебахшед',
          kg: 'кечиресиз',
          kz: 'кешіріңіз',
          pn: '/ˈsɒri/',
          transcr: 'сори'
        },
        {
          e: '🙋',
          en: 'excuse me',
          ru: 'прошу прощения',
          uz: 'kechirasiz',
          tj: 'узр',
          kg: 'кечиресиз',
          kz: 'кешіріңіз',
          pn: '/ɪkˈskjuːz miː/',
          transcr: 'икскьюз ми'
        },
        {
          e: '😊',
          en: 'you\\'re welcome',
          ru: 'пожалуйста (в ответ на спасибо)',
          uz: 'arzimaydi',
          tj: 'марҳамат',
          kg: 'эч нерсе эмес',
          kz: 'оқасы жоқ',
          pn: '/jʊə ˈwelkəm/',
          transcr: 'юа уэлкэм'
        },
        {
          e: '🍻',
          en: 'cheers',
          ru: 'спасибо / пока (сленг)',
          uz: 'rahmat / xayr',
          tj: 'ташаккур / хайр',
          kg: 'рахмат / кош',
          kz: 'рақмет / сау бол',
          pn: '/tʃɪəz/',
          transcr: 'чиэз'
        },
        {
          e: '👊',
          en: 'mate',
          ru: 'приятель',
          uz: 'og\\'ayni',
          tj: 'ҷӯра',
          kg: 'дос',
          kz: 'дос',
          pn: '/meɪt/',
          transcr: 'мэйт'
        },
        {
          e: '👍',
          en: 'alright?',
          ru: 'как дела?',
          uz: 'qandaysiz?',
          tj: 'чӣ хел?',
          kg: 'кандайсыз?',
          kz: 'қалайсыз?',
          pn: '/ɔːlˈraɪt/',
          transcr: 'олрайт'
        },
        {
          e: '✨',
          en: 'lovely',
          ru: 'прекрасный',
          uz: 'ajoyib',
          tj: 'зебо',
          kg: 'сонун',
          kz: 'керемет',
          pn: '/ˈlʌvli/',
          transcr: 'лавли'
        },
        {
          e: '🌟',
          en: 'brilliant',
          ru: 'отличный',
          uz: 'ajoyib',
          tj: 'олӣ',
          kg: 'сонун',
          kz: 'тамаша',
          pn: '/ˈbrɪliənt/',
          transcr: 'брилиэнт'
        },
        {
          e: '⭐',
          en: 'great',
          ru: 'великолепный',
          uz: 'ajoyib',
          tj: 'бузург',
          kg: 'сонун',
          kz: 'керемет',
          pn: '/ɡreɪt/',
          transcr: 'грэйт'
        },
        {
          e: '✅',
          en: 'sure',
          ru: 'конечно',
          uz: 'albatta',
          tj: 'албатта',
          kg: 'албетте',
          kz: 'әрине',
          pn: '/ʃʊə/',
          transcr: 'шуэ'
        },
        {
          e: '💯',
          en: 'of course',
          ru: 'конечно',
          uz: 'albatta',
          tj: 'албатта',
          kg: 'албетте',
          kz: 'әрине',
          pn: '/əv kɔːs/',
          transcr: 'ов кос'
        },
        {
          e: '🥱',
          en: 'tired',
          ru: 'уставший',
          uz: 'charchagan',
          tj: 'хаста',
          kg: 'чарчаган',
          kz: 'шаршаған',
          pn: '/ˈtaɪəd/',
          transcr: 'тайэд'
        },
        {
          e: '😄',
          en: 'happy',
          ru: 'счастливый',
          uz: 'xursand',
          tj: 'хушбахт',
          kg: 'бактылуу',
          kz: 'бақытты',
          pn: '/ˈhæpi/',
          transcr: 'хэпи'
        },
        {
          e: '😋',
          en: 'hungry',
          ru: 'голодный',
          uz: 'och',
          tj: 'гурусна',
          kg: 'ач',
          kz: 'аш',
          pn: '/ˈhʌŋɡri/',
          transcr: 'хангри'
        },
        {
          e: '🥵',
          en: 'thirsty',
          ru: 'хочет пить',
          uz: 'chanqagan',
          tj: 'ташна',
          kg: 'суусаган',
          kz: 'шөлдеген',
          pn: '/ˈθɜːsti/',
          transcr: 'сёсти'
        },
        {
          e: '🍵',
          en: 'tea',
          ru: 'чай',
          uz: 'choy',
          tj: 'чой',
          kg: 'чай',
          kz: 'шай',
          pn: '/tiː/',
          transcr: 'ти'
        },
        {
          e: '☕',
          en: 'cup',
          ru: 'чашка',
          uz: 'piyola',
          tj: 'пиёла',
          kg: 'чыны',
          kz: 'шыны',
          pn: '/kʌp/',
          transcr: 'кап'
        },
        {
          e: '🍺',
          en: 'mug',
          ru: 'кружка',
          uz: 'krujka',
          tj: 'кружка',
          kg: 'кружка',
          kz: 'саптыаяқ',
          pn: '/mʌɡ/',
          transcr: 'маг'
        },
        {
          e: '🍪',
          en: 'biscuit',
          ru: 'печенье',
          uz: 'pechenye',
          tj: 'кулчақанд',
          kg: 'печенье',
          kz: 'печенье',
          pn: '/ˈbɪskɪt/',
          transcr: 'бискит'
        },
        {
          e: '🍰',
          en: 'cake',
          ru: 'торт / кекс',
          uz: 'tort',
          tj: 'торт',
          kg: 'торт',
          kz: 'торт',
          pn: '/keɪk/',
          transcr: 'кэйк'
        },
        {
          e: '🍻',
          en: 'pub',
          ru: 'паб',
          uz: 'pab',
          tj: 'паб',
          kg: 'паб',
          kz: 'паб',
          pn: '/pʌb/',
          transcr: 'паб'
        },
        {
          e: '🌤️',
          en: 'weather',
          ru: 'погода',
          uz: 'ob-havo',
          tj: 'обу ҳаво',
          kg: 'аба ырайы',
          kz: 'ауа райы',
          pn: '/ˈweðə/',
          transcr: 'уэзэ'
        },
        {
          e: '🎉',
          en: 'weekend',
          ru: 'выходные',
          uz: 'dam olish kunlari',
          tj: 'рӯзҳои истироҳат',
          kg: 'дем алыш күндөрү',
          kz: 'демалыс күндері',
          pn: '/ˌwiːkˈend/',
          transcr: 'уикэнд'
        },
        {
          e: '🥳',
          en: 'enjoy',
          ru: 'наслаждаться',
          uz: 'rohatlanmoq',
          tj: 'лаззат бурдан',
          kg: 'ырахаттануу',
          kz: 'ләззат алу',
          pn: '/ɪnˈdʒɔɪ/',
          transcr: 'инджой'
        },
        {
          e: '☀️',
          en: 'today',
          ru: 'сегодня',
          uz: 'bugun',
          tj: 'имрӯз',
          kg: 'бүгүн',
          kz: 'бүгін',
          pn: '/təˈdeɪ/',
          transcr: 'тудэй'
        },
        {
          e: '🔜',
          en: 'tomorrow',
          ru: 'завтра',
          uz: 'ertaga',
          tj: 'фардо',
          kg: 'эртең',
          kz: 'ертең',
          pn: '/təˈmɒrəʊ/',
          transcr: 'тумороу'
        },
        {
          e: '🏃',
          en: 'busy',
          ru: 'занятый',
          uz: 'band',
          tj: 'банд',
          kg: 'бошо эмес',
          kz: 'бос емес',
          pn: '/ˈbɪzi/',
          transcr: 'бизи'
        },
        {
          e: '😌',
          en: 'free',
          ru: 'свободный',
          uz: 'bo\\'sh',
          tj: 'озод',
          kg: 'бош',
          kz: 'бос',
          pn: '/friː/',
          transcr: 'фри'
        }
      ],
      dialogue: [
        {
          s: 'm',
          en: 'Alright, mate? Are you tired? It is a busy day today.',
          ru: 'Как дела, приятель? Ты устал? Сегодня тяжелый день.',
          uz: 'Qalaysiz, og\\'ayni? Charchadingizmi? Bugun band kun.',
          tj: 'Чӣ хел, ҷӯра? Шумо хаста шудед? Имрӯз рӯзи банд аст.',
          kg: 'Кандайсың, дос? Чарчадыңбы? Бүгүн бошо эмес күн.',
          kz: 'Қалайсың, дос? Шаршадың ба? Бүгін бос емес күн.',
          transcr: 'Олрайт, мэйт? А ю тайэд? Ит из э бизи дэй тудэй.'
        },
        {
          s: 'w',
          en: 'Yes, I am very tired. And I am hungry too.',
          ru: 'Да, я очень устал. И я также голоден.',
          uz: 'Ha, men juda charchadim. Va men ham ochman.',
          tj: 'Бале, ман хеле хастаам. Ва ман ҳам гуруснаам.',
          kg: 'Ооба, мен абдан чарчадым. Жана мен да ачмын.',
          kz: 'Иә, мен өте шаршадым. Және мен де ашпын.',
          transcr: 'Йес, ай эм вэри тайэд. Энд ай эм хангри ту.'
        },
        {
          s: 'm',
          en: 'Would you like a cup of tea and a biscuit?',
          ru: 'Не хочешь ли чашку чая и печенье?',
          uz: 'Bir piyola choy va pechenye xohlaysizmi?',
          tj: 'Як пиёла чой ва кулчақанд мехоҳед?',
          kg: 'Бир чыны чай жана печенье каалайсызбы?',
          kz: 'Бір шыны шай мен печенье қалайсыз ба?',
          transcr: 'Вуд ю лайк э кап ов ти энд э бискит?'
        },
        {
          s: 'w',
          en: 'Yes, please! That would be lovely. Thank you.',
          ru: 'Да, пожалуйста! Это было бы прекрасно. Спасибо.',
          uz: 'Ha, iltimos! Bu ajoyib bo\\'lardi. Rahmat.',
          tj: 'Бале, лутфан! Ин олӣ мебуд. Ташаккур.',
          kg: 'Ооба, сураныч! Бул сонун болмок. Рахмат.',
          kz: 'Иә, өтінемін! Бұл керемет болар еді. Рақмет.',
          transcr: 'Йес, плиз! Зэт вуд би лавли. Сэнк ю.'
        },
        {
          s: 'm',
          en: 'You\\'re welcome. Here is your tea. Lovely weather today, isn\\'t it?',
          ru: 'Не за что (Пожалуйста). Вот твой чай. Прекрасная погода сегодня, не так ли?',
          uz: 'Arzimaydi. Mana choyingiz. Bugun ajoyib ob-havo, shunday emasmi?',
          tj: 'Марҳамат. Ин чойи шумо. Имрӯз обу ҳавои зебо аст, ҳамин тавр не?',
          kg: 'Эч нерсе эмес. Мына чайың. Бүгүн аба ырайы сонун, туурабы?',
          kz: 'Оқасы жоқ. Міне шайыңыз. Бүгін ауа райы керемет, солай емес пе?',
          transcr: 'Юа уэлкэм. Хиэ из ё ти. Лавли уэзэ тудэй, изнт ит?'
        },
        {
          s: 'w',
          en: 'Yes, brilliant! The sun is shining. Are you free tomorrow?',
          ru: 'Да, отличная! Солнце светит. Ты свободен завтра?',
          uz: 'Ha, ajoyib! Quyosh charaqlab turibdi. Ertaga bo\\'shmisiz?',
          tj: 'Бале, олӣ! Офтоб медурахшад. Шумо фардо озодед?',
          kg: 'Ооба, сонун! Күн тийип турат. Эртең бошсуңбу?',
          kz: 'Иә, тамаша! Күн жарқырап тұр. Ертең боссыз ба?',
          transcr: 'Йес, брилиэнт! Зэ сан из шайнин. А ю фри тумороу?'
        },
        {
          s: 'm',
          en: 'No, sorry. I am busy. But I am free on the weekend.',
          ru: 'Нет, извини. Я занят. Но я свободен на выходных.',
          uz: 'Yo\\'q, kechirasiz. Men bandman. Lekin dam olish kunlari bo\\'shman.',
          tj: 'Не, мебахшед. Ман бандам. Аммо рӯзҳои истироҳат озодам.',
          kg: 'Жок, кечиресиз. Мен бошо эмесмин. Бирок дем алыш күндөрү бошмун.',
          kz: 'Жоқ, кешіріңіз. Мен бос емеспін. Бірақ демалыс күндері боспын.',
          transcr: 'Ноу, сори. Ай эм бизи. Бат ай эм фри он зэ уикэнд.'
        },
        {
          s: 'w',
          en: 'Great! Would you like to go to the pub on Saturday?',
          ru: 'Великолепно! Не хочешь ли пойти в паб в субботу?',
          uz: 'Ajoyib! Shanba kuni pabga borishni xohlaysizmi?',
          tj: 'Бузург! Шумо мехоҳед рӯзи шанбе ба паб равед?',
          kg: 'Сонун! Ишемби күнү пабга барууну каалайсызбы?',
          kz: 'Керемет! Сенбі күні пабқа барғыңыз келе ме?',
          transcr: 'Грэйт! Вуд ю лайк ту гоу ту зэ паб он сатэдэй?'
        },
        {
          s: 'm',
          en: 'Of course! I would like that. Enjoy your break.',
          ru: 'Конечно! Я бы с удовольствием. Наслаждайся перерывом.',
          uz: 'Albatta! Men buni xohlardim. Tanaffusdan rohatlaning.',
          tj: 'Албатта! Ман инро мехостам. Аз танаффус лаззат баред.',
          kg: 'Албетте! Мен муну каалайт элем. Тыныгууңду жакшы өткөр.',
          kz: 'Әрине! Мен мұны қалар едім. Үзілісіңізді жақсы өткізіңіз.',
          transcr: 'Ов кос! Ай вуд лайк зэт. Инджой ё брэйк.'
        },
        {
          s: 'w',
          en: 'Cheers, mate! See you later.',
          ru: 'Спасибо, приятель! Увидимся позже.',
          uz: 'Rahmat, og\\'ayni! Keyinroq ko\\'rishguncha.',
          tj: 'Ташаккур, ҷӯра! Дертар мебинем.',
          kg: 'Рахмат, дос! Кийинчерээк көрүшкөнчө.',
          kz: 'Рақмет, дос! Кейінірек кездескенше.',
          transcr: 'Чиэз, мэйт! Си ю лэйтэ.'
        }
      ],
      quiz: [
        {
          q: 'Would you like a cup of tea?',
          opts: [
            'Yes, I do.',
            'Yes, please.',
            'Yes, thank you.',
            'Yes, sure.'
          ],
          c: 1,
          hint_ru: 'Вежливый ответ: Yes, please (Да, пожалуйста).'
        },
        {
          q: 'What does Cheers mean in the UK?',
          opts: [
            'Hello',
            'Bad weather',
            'Thank you or Goodbye',
            'A cup of tea'
          ],
          c: 2,
          hint_ru: 'В Англии слово Cheers часто означает спасибо или пока.'
        },
        {
          q: 'If you want food, you are...',
          opts: [
            'tired',
            'happy',
            'thirsty',
            'hungry'
          ],
          c: 3,
          hint_ru: 'Если вы хотите есть, вы hungry (голодный). Thirsty — хочет пить.'
        },
        {
          q: 'If you want water, you are...',
          opts: [
            'thirsty',
            'hungry',
            'tired',
            'busy'
          ],
          c: 0,
          hint_ru: 'Если вы хотите пить, вы thirsty.'
        },
        {
          q: 'What is a mate?',
          opts: [
            'A farm manager',
            'A friend or colleague',
            'A cup of tea',
            'A bus ticket'
          ],
          c: 1,
          hint_ru: 'Mate — это друг, приятель, коллега.'
        },
        {
          q: 'How to say конечно in English?',
          opts: [
            'sorry',
            'lovely',
            'of course',
            'enjoy'
          ],
          c: 2,
          hint_ru: 'Конечно — of course или sure.'
        },
        {
          q: 'Alright? means...',
          opts: [
            'How are you?',
            'Goodbye',
            'Thank you',
            'Sorry'
          ],
          c: 0,
          hint_ru: 'Британское Alright? означает Как дела? (В порядке?).'
        },
        {
          q: 'I am ___ today. I have a lot of work.',
          opts: [
            'free',
            'lovely',
            'busy',
            'thirsty'
          ],
          c: 2,
          hint_ru: 'Много работы — значит вы busy (заняты).'
        },
        {
          q: 'What do you eat with tea?',
          opts: [
            'A pub',
            'A weekend',
            'A biscuit',
            'A mug'
          ],
          c: 2,
          hint_ru: 'С чаем едят biscuit (печенье).'
        },
        {
          q: '___ your weekend! (Наслаждайся)',
          opts: [
            'Enjoy',
            'Busy',
            'Tired',
            'Brilliant'
          ],
          c: 0,
          hint_ru: 'Наслаждаться — enjoy.'
        }
      ]
    }`;

text_replaced = text.replace(/    \{\s*id: 15,[\s\S]*?(?=\s*\]\n\s*\};)/, l15 + '\n');
fs.writeFileSync('a1.html', text_replaced);
console.log('Successfully replaced Lesson 15!');
