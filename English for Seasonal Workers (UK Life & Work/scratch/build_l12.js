const fs = require('fs');
const text = fs.readFileSync('a1.html', 'utf8');

const l12 = `    {
      id: 12,
      mod: 6,
      name_ru: 'Заполняю форму',
      name_uz: 'Forma to\\'ldirish',
      name_tj: 'Анкета пур мекунам',
      name_kg: 'Форма толтурам',
      name_kz: 'Форма толтыру',
      cefr: 'was/were born · Personal information · Filling in forms',
      grammar: {
        title_ru: 'WAS / WERE BORN + личные данные',
        title_uz: 'WAS / WERE BORN + shaxsiy ma\\'lumotlar',
        title_tj: 'WAS / WERE BORN + маълумоти шахсӣ',
        title_kg: 'WAS / WERE BORN + жеке маалыматтар',
        title_kz: 'WAS / WERE BORN + жеке мәліметтер',
        rule_ru: 'Фраза <b>was/were born</b> используется для того, чтобы сказать, когда или где вы родились. Это глагол <i>to be</i> в прошедшем времени.<br>Для дат используем <b>on</b>: <code>I was born on the 5th of May.</code><br>Для городов и стран используем <b>in</b>: <code>I was born in Tashkent.</code><br>Года читаются парами: 1995 = nineteen ninety-five. 2024 = twenty twenty-four.',
        rule_uz: '<b>was/were born</b> iborasi qachon va qayerda tug\\'ilganingizni aytish uchun ishlatiladi. Bu o\\'tgan zamondagi <i>to be</i> fe\\'lidir.<br>Sanalar uchun <b>on</b> ishlatiladi: <code>I was born on the 5th of May.</code><br>Shaharlar va davlatlar uchun <b>in</b> ishlatiladi: <code>I was born in Tashkent.</code><br>Yillar ikkiga bo\\'lib o\\'qiladi: 1995 = nineteen ninety-five.',
        rule_tj: 'Ибораи <b>was/were born</b> барои гуфтани он ки кай ва дар куҷо таваллуд шудаед, истифода мешавад. Ин феъли <i>to be</i> дар замони гузашта аст.<br>Барои санаҳо <b>on</b> истифода мебарем: <code>I was born on the 5th of May.</code><br>Барои шаҳрҳо ва кишварҳо <b>in</b> истифода мебарем: <code>I was born in Tashkent.</code>',
        rule_kg: '<b>was/were born</b> фразасы качан жана кайда туулганыңызды айтуу үчүн колдонулат. Бул өткөн чактагы <i>to be</i> этиши.<br>Даталар үчүн <b>on</b> колдонобуз: <code>I was born on the 5th of May.</code><br>Шаарлар жана өлкөлөр үчүн <b>in</b> колдонобуз: <code>I was born in Tashkent.</code>',
        rule_kz: '<b>was/were born</b> тіркесі қашан және қайда туғаныңызды айту үшін қолданылады. Бұл өткен шақтағы <i>to be</i> етістігі.<br>Күндер үшін <b>on</b> қолданамыз: <code>I was born on the 5th of May.</code><br>Қалалар мен елдер үшін <b>in</b> қолданамыз: <code>I was born in Tashkent.</code>',
        tables: [
          {
            title: '✅ Affirmative (Утверждение)',
            rows: [
              {
                subj: 'I / He / She',
                verb: 'was born',
                example: 'I was born in a big city.',
                transcr: 'Ай уоз бон ин э биг сити',
                tr_ru: 'Я родился в большом городе',
                tr_uz: 'Men katta shaharda tug\\'ilganman',
                tr_tj: 'Ман дар шаҳри калон таваллуд шудаам',
                tr_kg: 'Мен чоң шаарда туулгам',
                tr_kz: 'Мен үлкен қалада тудым'
              },
              {
                subj: 'We / You / They',
                verb: 'were born',
                example: 'They were born in 1995.',
                transcr: 'Зэй уэ бон ин найнтин-найнти-файв',
                tr_ru: 'Они родились в 1995 году',
                tr_uz: 'Ular 1995 yilda tug\\'ilgan',
                tr_tj: 'Онҳо соли 1995 таваллуд шудаанд',
                tr_kg: 'Алар 1995-жылы туулган',
                tr_kz: 'Олар 1995 жылы туылған'
              }
            ]
          },
          {
            title: '❌ Negative (Отрицание)',
            rows: [
              {
                subj: 'I / He / She',
                verb: 'was not (wasn\\'t)',
                example: 'He wasn\\'t born in the UK.',
                transcr: 'Хи уознт бон ин зэ Ю Кей',
                tr_ru: 'Он не родился в Великобритании',
                tr_uz: 'U Buyuk Britaniyada tug\\'ilmagan',
                tr_tj: 'Ӯ дар Британияи Кабир таваллуд нашудааст',
                tr_kg: 'Ал Улуу Британияда туулган эмес',
                tr_kz: 'Ол Ұлыбританияда туған жоқ'
              },
              {
                subj: 'We / You / They',
                verb: 'were not (weren\\'t)',
                example: 'We weren\\'t born here.',
                transcr: 'Уи уёнт бон хиэ',
                tr_ru: 'Мы не родились здесь',
                tr_uz: 'Biz bu yerda tug\\'ilmaganmiz',
                tr_tj: 'Мо дар ин ҷо таваллуд нашудаем',
                tr_kg: 'Биз бул жерде туулган эмеспиз',
                tr_kz: 'Біз осында туған жоқпыз'
              }
            ]
          },
          {
            title: '❓ Question (Вопрос)',
            rows: [
              {
                subj: 'Where / When',
                verb: 'was he / were you',
                example: 'Where were you born?',
                transcr: 'Уээ уэ ю бон?',
                tr_ru: 'Где вы родились?',
                tr_uz: 'Siz qayerda tug\\'ilgansiz?',
                tr_tj: 'Шумо дар куҷо таваллуд шудаед?',
                tr_kg: 'Сиз кайда туулгансыз?',
                tr_kz: 'Сіз қайда тудыңыз?'
              }
            ]
          }
        ],
        examples: [
          {
            en: 'Please fill in this application with a black pen.',
            ru: 'Пожалуйста, заполните это заявление черной ручкой.',
            uz: 'Iltimos, bu arizani qora ruchka bilan to\\'ldiring.',
            tj: 'Лутфан, ин аризаро бо ручкаи сиёҳ пур кунед.',
            kg: 'Сураныч, бул арызды кара калем менен толтуруңуз.',
            kz: 'Өтінемін, бұл өтінішті қара қаламмен толтырыңыз.'
          },
          {
            en: 'Write your surname in capital letters, please.',
            ru: 'Напишите вашу фамилию заглавными буквами, пожалуйста.',
            uz: 'Familiyangizni bosh harflar bilan yozing, iltimos.',
            tj: 'Насаби худро бо ҳарфҳои калон нависед, лутфан.',
            kg: 'Фамилияңызды баш тамга менен жазыңыз, сураныч.',
            kz: 'Тегіңізді бас әріптермен жазыңызшы, өтінемін.'
          },
          {
            en: 'What is your marital status? Are you single or married?',
            ru: 'Какое у вас семейное положение? Вы холосты или женаты?',
            uz: 'Sizning oilaviy ahvolingiz qanday? Bo\\'ydoqmisiz yoki oilalimisiz?',
            tj: 'Вазъи оилавии шумо чӣ гуна аст? Муҷаррад ҳастед ё оиладор?',
            kg: 'Сиздин үй-бүлөлүк абалыңыз кандай? Бойдоксузбу же үй-бүлөлүүсүзбү?',
            kz: 'Сіздің отбасылық жағдайыңыз қандай? Бойдақсыз ба әлде үйленгенсіз бе?'
          },
          {
            en: 'My passport number is AB123456 and my nationality is Tajik.',
            ru: 'Мой номер паспорта AB123456, и моя национальность — таджик.',
            uz: 'Mening pasport raqamim AB123456 va millatim tojik.',
            tj: 'Рақами паспорти ман AB123456 аст ва миллати ман тоҷик аст.',
            kg: 'Менин паспорттук номерим AB123456 жана улутум тажик.',
            kz: 'Менің төлқұжат нөмірім AB123456 және ұлтым тәжік.'
          },
          {
            en: 'We need your home address, postcode and city.',
            ru: 'Нам нужен ваш домашний адрес, почтовый индекс и город.',
            uz: 'Bizga uy manzilingiz, pochta indeksingiz va shahringiz kerak.',
            tj: 'Ба мо суроғаи хона, индекси почта ва шаҳри шумо лозим аст.',
            kg: 'Бизге үй дарегиңиз, почта индексиңиз жана шаарыңыз керек.',
            kz: 'Бізге сіздің үй мекенжайыңыз, пошта индексіңіз және қалаңыз керек.'
          },
          {
            en: 'I was born in a small village, not in a big city.',
            ru: 'Я родился в маленькой деревне, а не в большом городе.',
            uz: 'Men katta shaharda emas, kichik qishloqda tug\\'ilganman.',
            tj: 'Ман дар деҳаи хурд таваллуд шудаам, на дар шаҳри калон.',
            kg: 'Мен чоң шаарда эмес, кичинекей айылда туулгам.',
            kz: 'Мен үлкен қалада емес, кішкентай ауылда тудым.'
          },
          {
            en: 'Please put your signature on this document.',
            ru: 'Пожалуйста, поставьте свою подпись на этом документе.',
            uz: 'Iltimos, ushbu hujjatga imzoingizni qo\\'ying.',
            tj: 'Лутфан, имзои худро дар ин ҳуҷҷат гузоред.',
            kg: 'Бул документке кол тамгаңызды коюңузчу.',
            kz: 'Өтінемін, осы құжатқа қолтаңбаңызды қойыңыз.'
          },
          {
            en: 'Who is your emergency contact in the UK?',
            ru: 'Кто ваш контакт для экстренной связи в Великобритании?',
            uz: 'Buyuk Britaniyadagi favqulodda aloqa shaxsingiz kim?',
            tj: 'Шахси тамос барои ҳолатҳои фавқулоддаи шумо дар Британия кист?',
            kg: 'Улуу Британиядагы шашылыш байланышыңыз ким?',
            kz: 'Ұлыбританиядағы төтенше жағдай бойынша байланысатын адамыңыз кім?'
          },
          {
            en: 'Print your full name here. Do not sign it.',
            ru: 'Напишите здесь ваше полное имя печатными буквами. Не подписывайте.',
            uz: 'Bu yerda to\\'liq ismingizni bosma harflar bilan yozing. Imzo qo\\'ymang.',
            tj: 'Номи пурраи худро дар ин ҷо чоп кунед. Имзо нагузоред.',
            kg: 'Бул жерге толук атыңызды басма тамга менен жазыңыз. Кол койбоңуз.',
            kz: 'Осы жерге толық атыңызды баспа әріптермен жазыңыз. Қол қоймаңыз.'
          },
          {
            en: 'My visa type is Seasonal Worker, male gender.',
            ru: 'Мой тип визы — сезонный рабочий, мужской пол.',
            uz: 'Mening viza turim — Mavsumiy ishchi, jinsim erkak.',
            tj: 'Намуди раводиди ман — Коргари мавсимӣ, ҷинси мард.',
            kg: 'Менин визамдын түрү — Мезгилдүү жумушчу, эркек жынысы.',
            kz: 'Менің виза түрім — Маусымдық жұмысшы, еркек жынысы.'
          }
        ]
      },
      words: [
        {
          e: '1️⃣',
          en: 'first name',
          ru: 'имя',
          uz: 'ism',
          tj: 'ном',
          kg: 'аты',
          kz: 'аты',
          pn: '/ˈfɜːst neɪm/',
          transcr: 'фёст нэйм'
        },
        {
          e: '2️⃣',
          en: 'surname',
          ru: 'фамилия',
          uz: 'familiya',
          tj: 'насаб',
          kg: 'фамилиясы',
          kz: 'тегі',
          pn: '/ˈsɜːneɪm/',
          transcr: 'сёнейм'
        },
        {
          e: '📇',
          en: 'full name',
          ru: 'полное имя',
          uz: 'to\\'liq ism',
          tj: 'номи пурра',
          kg: 'толук аты',
          kz: 'толық аты',
          pn: '/fʊl neɪm/',
          transcr: 'фул нэйм'
        },
        {
          e: '🌍',
          en: 'nationality',
          ru: 'гражданство',
          uz: 'fuqarolik',
          tj: 'шаҳрвандӣ',
          kg: 'жарандык',
          kz: 'азаматтық',
          pn: '/ˌnæʃəˈnælɪti/',
          transcr: 'нэшэнэлити'
        },
        {
          e: '📅',
          en: 'date of birth',
          ru: 'дата рождения',
          uz: 'tug\\'ilgan sana',
          tj: 'санаи таваллуд',
          kg: 'туулган күнү',
          kz: 'туған күні',
          pn: '/deɪt əv bɜːθ/',
          transcr: 'дэйт ов бёс'
        },
        {
          e: '👶',
          en: 'place of birth',
          ru: 'место рождения',
          uz: 'tug\\'ilgan joy',
          tj: 'ҷои таваллуд',
          kg: 'туулган жери',
          kz: 'туған жері',
          pn: '/pleɪs əv bɜːθ/',
          transcr: 'плэйс ов бёс'
        },
        {
          e: '🎂',
          en: 'born',
          ru: 'родился',
          uz: 'tug\\'ilgan',
          tj: 'таваллудшуда',
          kg: 'туулган',
          kz: 'туған',
          pn: '/bɔːn/',
          transcr: 'бон'
        },
        {
          e: '🆔',
          en: 'passport number',
          ru: 'номер паспорта',
          uz: 'pasport raqami',
          tj: 'рақами паспорт',
          kg: 'паспорт номери',
          kz: 'төлқұжат нөмірі',
          pn: '/ˈpɑːspɔːt ˈnʌmbə/',
          transcr: 'паспот намбэ'
        },
        {
          e: '🏦',
          en: 'NI number',
          ru: 'номер страховки',
          uz: 'sug\\'urta raqami',
          tj: 'рақами суғурта',
          kg: 'камсыздандыруу номери',
          kz: 'сақтандыру нөмірі',
          pn: '/en aɪ ˈnʌmbə/',
          transcr: 'эн ай намбэ'
        },
        {
          e: '🚨',
          en: 'emergency contact',
          ru: 'экстренный контакт',
          uz: 'favqulodda aloqa',
          tj: 'рақами алоқаи фаврӣ',
          kg: 'шашылыш байланыш',
          kz: 'төтенше байланыс',
          pn: '/ɪˈmɜːdʒənsi ˈkɒntækt/',
          transcr: 'имёрджэнси контакт'
        },
        {
          e: '🛂',
          en: 'visa type',
          ru: 'тип визы',
          uz: 'viza turi',
          tj: 'намуди раводид',
          kg: 'виза түрү',
          kz: 'виза түрі',
          pn: '/ˈviːzə taɪp/',
          transcr: 'визэ тайп'
        },
        {
          e: '📄',
          en: 'document',
          ru: 'документ',
          uz: 'hujjat',
          tj: 'ҳуҷҷат',
          kg: 'документ',
          kz: 'құжат',
          pn: '/ˈdɒkjumənt/',
          transcr: 'докьюмэнт'
        },
        {
          e: '🏠',
          en: 'home address',
          ru: 'домашний адрес',
          uz: 'uy manzili',
          tj: 'суроғаи хона',
          kg: 'үй дареги',
          kz: 'үй мекенжайы',
          pn: '/həʊm əˈdres/',
          transcr: 'хоум эдрэс'
        },
        {
          e: '📭',
          en: 'postcode',
          ru: 'почтовый индекс',
          uz: 'pochta indeksi',
          tj: 'индекси почта',
          kg: 'почта индекси',
          kz: 'пошта индексі',
          pn: '/ˈpəʊstkəʊd/',
          transcr: 'поусткоуд'
        },
        {
          e: '🌆',
          en: 'city',
          ru: 'город (крупный)',
          uz: 'shahar',
          tj: 'шаҳр',
          kg: 'шаар',
          kz: 'қала',
          pn: '/ˈsɪti/',
          transcr: 'сити'
        },
        {
          e: '📧',
          en: 'email',
          ru: 'эл. почта',
          uz: 'elektron pochta',
          tj: 'почтаи электронӣ',
          kg: 'электрондук почта',
          kz: 'электрондық пошта',
          pn: '/ˈiːmeɪl/',
          transcr: 'имейл'
        },
        {
          e: '🚻',
          en: 'gender',
          ru: 'пол',
          uz: 'jins',
          tj: 'ҷинс',
          kg: 'жынысы',
          kz: 'жынысы',
          pn: '/ˈdʒendə/',
          transcr: 'джэндэ'
        },
        {
          e: '👨',
          en: 'male',
          ru: 'мужской',
          uz: 'erkak',
          tj: 'мард',
          kg: 'эркек',
          kz: 'ер',
          pn: '/meɪl/',
          transcr: 'мэйл'
        },
        {
          e: '👩',
          en: 'female',
          ru: 'женский',
          uz: 'ayol',
          tj: 'зан',
          kg: 'аял',
          kz: 'әйел',
          pn: '/ˈfiːmeɪl/',
          transcr: 'фимэйл'
        },
        {
          e: '💍',
          en: 'marital status',
          ru: 'семейное положение',
          uz: 'oilaviy ahvol',
          tj: 'вазъи оилавӣ',
          kg: 'үй-бүлөлүк абалы',
          kz: 'отбасылық жағдайы',
          pn: '/ˈmærɪtl ˈsteɪtəs/',
          transcr: 'мэритл стэйтэс'
        },
        {
          e: '🧍',
          en: 'single',
          ru: 'не в браке',
          uz: 'bo\\'ydoq',
          tj: 'муҷаррад',
          kg: 'бойдок',
          kz: 'бойдақ',
          pn: '/ˈsɪŋɡl/',
          transcr: 'сингл'
        },
        {
          e: '👫',
          en: 'married',
          ru: 'в браке',
          uz: 'oilali',
          tj: 'оиладор',
          kg: 'үй-бүлөлүү',
          kz: 'үйленген',
          pn: '/ˈmærɪd/',
          transcr: 'мэрид'
        },
        {
          e: '📝',
          en: 'application',
          ru: 'заявление / анкета',
          uz: 'ariza',
          tj: 'ариза',
          kg: 'арыз',
          kz: 'өтініш',
          pn: '/ˌæplɪˈkeɪʃn/',
          transcr: 'эпликейшн'
        },
        {
          e: '✍️',
          en: 'signature',
          ru: 'подпись',
          uz: 'imzo',
          tj: 'имзо',
          kg: 'кол тамга',
          kz: 'қолтаңба',
          pn: '/ˈsɪɡnətʃə/',
          transcr: 'сигнэчэ'
        },
        {
          e: '✒️',
          en: 'sign',
          ru: 'подписать',
          uz: 'imzolash',
          tj: 'имзо кардан',
          kg: 'кол коюу',
          kz: 'қол қою',
          pn: '/saɪn/',
          transcr: 'сайн'
        },
        {
          e: '✏️',
          en: 'fill in',
          ru: 'заполнить',
          uz: 'to\\'ldirish',
          tj: 'пур кардан',
          kg: 'толтуруу',
          kz: 'толтыру',
          pn: '/fɪl ɪn/',
          transcr: 'фил ин'
        },
        {
          e: '🔠',
          en: 'capital letters',
          ru: 'заглавные буквы',
          uz: 'bosh harflar',
          tj: 'ҳарфҳои калон',
          kg: 'баш тамгалар',
          kz: 'бас әріптер',
          pn: '/ˈkæpɪtl ˈletəz/',
          transcr: 'кэпитл летэз'
        },
        {
          e: '🖨️',
          en: 'print',
          ru: 'писать печатно',
          uz: 'bosma harflar bilan yozish',
          tj: 'бо ҳарфҳои чопӣ навиштан',
          kg: 'басма тамгалар менен жазуу',
          kz: 'баспа әріптермен жазу',
          pn: '/prɪnt/',
          transcr: 'принт'
        },
        {
          e: '🖊️',
          en: 'pen',
          ru: 'ручка',
          uz: 'ruchka',
          tj: 'ручка',
          kg: 'калем',
          kz: 'қалам',
          pn: '/pen/',
          transcr: 'пэн'
        },
        {
          e: '📜',
          en: 'paper',
          ru: 'бумага',
          uz: 'qog\\'oz',
          tj: 'қоғаз',
          kg: 'кагаз',
          kz: 'қағаз',
          pn: '/ˈpeɪpə/',
          transcr: 'пейпэ'
        }
      ],
      dialogue: [
        {
          s: 'm',
          en: 'Good morning. I need to fill in your registration application.',
          ru: 'Доброе утро. Мне нужно заполнить вашу регистрационную анкету.',
          uz: 'Xayrli tong. Men sizning ro\\'yxatga olish arizangizni to\\'ldirishim kerak.',
          tj: 'Субҳ ба хайр. Ман бояд аризаи бақайдгирии шуморо пур кунам.',
          kg: 'Кутман таң. Мен сиздин каттоо арызыңызды толтурушум керек.',
          kz: 'Қайырлы таң. Мен сіздің тіркеу өтінішіңізді толтыруым керек.',
          transcr: 'Гуд монин. Ай нид ту фил ин ё рэджистрэйшн эпликейшн.'
        },
        {
          s: 'w',
          en: 'Good morning. I have my documents here.',
          ru: 'Доброе утро. У меня с собой документы.',
          uz: 'Xayrli tong. Hujjatlarim shu yerda.',
          tj: 'Субҳ ба хайр. Ҳуҷҷатҳои ман дар ин ҷо ҳастанд.',
          kg: 'Кутман таң. Менин документтерим ушул жерде.',
          kz: 'Қайырлы таң. Менің құжаттарым осында.',
          transcr: 'Гуд монин. Ай хэв май докьюмэнтс хиэ.'
        },
        {
          s: 'm',
          en: 'Great. What is your surname and first name?',
          ru: 'Отлично. Какая у вас фамилия и имя?',
          uz: 'Ajoyib. Familiyangiz va ismingiz nima?',
          tj: 'Олӣ. Насаб ва номи шумо чист?',
          kg: 'Сонун. Фамилияңыз жана атыңыз ким?',
          kz: 'Керемет. Тегіңіз бен атыңыз кім?',
          transcr: 'Грэйт. Уот из ё сёнейм энд фёст нэйм?'
        },
        {
          s: 'w',
          en: 'My full name is Ahmad Karimov. I am from Uzbekistan.',
          ru: 'Мое полное имя — Ахмад Каримов. Я из Узбекистана.',
          uz: 'Mening to\\'liq ismim Ahmad Karimov. Men O\\'zbekistondanman.',
          tj: 'Номи пурраи ман Аҳмад Каримов. Ман аз Ӯзбекистон ҳастам.',
          kg: 'Менин толук атым Ахмад Каримов. Мен Өзбекстандан болом.',
          kz: 'Менің толық атым Ахмад Каримов. Мен Өзбекстаннанмын.',
          transcr: 'Май фул нэйм из Ахмад Каримов. Ай эм фром Узбэкистан.'
        },
        {
          s: 'm',
          en: 'Okay. Please write it in capital letters on this paper.',
          ru: 'Хорошо. Пожалуйста, напишите это заглавными буквами на этой бумаге.',
          uz: 'Yaxshi. Iltimos, buni bosh harflar bilan shu qog\\'ozga yozing.',
          tj: 'Хуб. Лутфан, инро бо ҳарфҳои калон дар ин қоғаз нависед.',
          kg: 'Макул. Сураныч, муну баш тамга менен ушул кагазга жазыңыз.',
          kz: 'Жақсы. Өтінемін, мұны осы қағазға бас әріптермен жазыңыз.',
          transcr: 'Оукей. Плиз райт ит ин кэпитл летэз он зис пейпэ.'
        },
        {
          s: 'w',
          en: 'Sure. When were you born?',
          ru: 'Конечно. Когда вы родились?',
          uz: 'Albatta. Qachon tug\\'ilgansiz?',
          tj: 'Албатта. Шумо кай таваллуд шудаед?',
          kg: 'Албетте. Качан туулгансыз?',
          kz: 'Әрине. Қашан тудыңыз?',
          transcr: 'Шуэ. Уэн уэ ю бон?'
        },
        {
          s: 'w',
          en: 'I was born on the fifth of May, nineteen ninety-two.',
          ru: 'Я родился 5 мая 1992 года.',
          uz: 'Men 1992 yil 5 mayda tug\\'ilganman.',
          tj: 'Ман 5 майи 1992 таваллуд шудаам.',
          kg: 'Мен 1992-жылдын 5-майында туулгам.',
          kz: 'Мен 1992 жылы 5 мамырда тудым.',
          transcr: 'Ай уоз бон он зэ фифс ов мэй, найнтин-найнти-ту.'
        },
        {
          s: 'm',
          en: 'And what is your marital status? Single or married?',
          ru: 'А какое у вас семейное положение? Холосты или женаты?',
          uz: 'Va oilaviy ahvolingiz qanday? Bo\\'ydoqmisiz yoki oilalimisiz?',
          tj: 'Ва вазъи оилавии шумо чӣ гуна аст? Муҷаррад ҳастед ё оиладор?',
          kg: 'Жана үй-бүлөлүк абалыңыз кандай? Бойдоксузбу же үй-бүлөлүүсүзбү?',
          kz: 'Ал отбасылық жағдайыңыз қандай? Бойдақсыз ба әлде үйленгенсіз бе?',
          transcr: 'Энд уот из ё мэритл стэйтэс? Сингл о мэрид?'
        },
        {
          s: 'w',
          en: 'I am married. My wife is my emergency contact.',
          ru: 'Я женат. Моя жена — мой экстренный контакт.',
          uz: 'Men oilaliman. Xotinim mening favqulodda aloqam.',
          tj: 'Ман оиладор ҳастам. Занам тамоси фавқулоддаи ман аст.',
          kg: 'Мен үй-бүлөлүүмүн. Аялым менин шашылыш байланышым.',
          kz: 'Мен үйленгенмін. Әйелім менің төтенше байланысым.',
          transcr: 'Ай эм мэрид. Май уайф из май имёрджэнси контакт.'
        },
        {
          s: 'm',
          en: 'Thank you. Please sign the application here with this pen.',
          ru: 'Спасибо. Пожалуйста, подпишите анкету здесь этой ручкой.',
          uz: 'Rahmat. Iltimos, arizani shu ruchka bilan shu yerga imzolang.',
          tj: 'Ташаккур. Лутфан, аризаро дар ин ҷо бо ин ручка имзо кунед.',
          kg: 'Рахмат. Бул ручка менен арызга ушул жерге кол коюңуз.',
          kz: 'Рақмет. Өтінемін, өтінішке осы қаламмен мына жерге қол қойыңыз.',
          transcr: 'Сэнк ю. Плиз сайн зэ эпликейшн хиэ уиз зис пэн.'
        }
      ],
      quiz: [
        {
          q: '\\'She ___ born in Tashkent.\\' (она = she)',
          opts: [
            'were',
            'was',
            'is',
            'be'
          ],
          c: 1,
          hint_ru: 'Для I, He, She, It используется was born.'
        },
        {
          q: 'What does \'marital status\' mean? (семейное положение)',
          opts: [
            'Single or married',
            'Male or female',
            'City or village',
            'Pen or paper'
          ],
          c: 0,
          hint_ru: 'Семейное положение означает холост (single) или в браке (married).'
        },
        {
          q: '\\'They ___ born in Kyrgyzstan.\\' (they = они)',
          opts: [
            'was',
            'is',
            'were',
            'are'
          ],
          c: 2,
          hint_ru: 'Для We, You, They используется were born.'
        },
        {
          q: 'What is a \'surname\'? (фамилия)',
          opts: [
            'First name',
            'Last name',
            'Full name',
            'Nationality'
          ],
          c: 1,
          hint_ru: 'Surname — это фамилия, то есть Last name.'
        },
        {
          q: 'Please put your ___ on the document. (подпись)',
          opts: [
            'sign',
            'signature',
            'application',
            'pen'
          ],
          c: 1,
          hint_ru: 'Подпись — это существительное signature.'
        },
        {
          q: 'Write in ___ letters. (Заглавные буквы)',
          opts: [
            'capital',
            'big',
            'print',
            'single'
          ],
          c: 0,
          hint_ru: 'Заглавные буквы — capital letters.'
        },
        {
          q: 'What is \'single\'? (холост)',
          opts: [
            'Married',
            'Not married',
            'Male',
            'Female'
          ],
          c: 1,
          hint_ru: 'Холост / Не замужем (single) значит Not married.'
        },
        {
          q: 'Please ___ this application form. (заполните)',
          opts: [
            'fill on',
            'fill out',
            'fill in',
            'get in'
          ],
          c: 2,
          hint_ru: 'Заполнить анкету — fill in.'
        },
        {
          q: '\\'___ were you born?\\' — In 1995.',
          opts: [
            'Where',
            'When',
            'How',
            'What'
          ],
          c: 1,
          hint_ru: 'Ответ — год (1995), значит спрашивали "Когда?" (When?).'
        },
        {
          q: 'My gender is ___. (мужской)',
          opts: [
            'female',
            'male',
            'married',
            'single'
          ],
          c: 1,
          hint_ru: 'Мужской пол — male.'
        }
      ]
    }`;

text_replaced = text.replace(/    \{\s*id: 12,[\s\S]*?(?=\s*\{\s*id: 13,)/, l12 + '\n');
fs.writeFileSync('a1.html', text_replaced);
console.log('Successfully replaced Lesson 12!');
