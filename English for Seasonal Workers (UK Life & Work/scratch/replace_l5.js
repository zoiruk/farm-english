const fs = require('fs');

const file = 'a1.html';
const html = fs.readFileSync(file, 'utf8');

const match = html.match(/    \{\r?\n\s*"id": 5,[\s\S]*?\r?\n    \},\r?\n(?=    \{\r?\n\s*id: 6,)/);
if (!match) {
  throw new Error('Could not locate lesson 5 block');
}

const replacement = `    {
      "id": 5,
      "mod": 2,
      "name_ru": "Где столовая?",
      "name_uz": "Oshxona qayerda?",
      "name_tj": "Ошхона куҷост?",
      "name_kg": "Ашкана кайда?",
      "name_kz": "Асхана қайда?",
      "cefr": "Questions (Where/What) · Prepositions of place · Directions",
      "grammar": {
        "title_ru": "Предлоги места и вопросы WHERE / WHAT",
        "title_uz": "Joy predloglari va WHERE / WHAT savollari",
        "title_tj": "Пешояндҳои ҷой ва саволҳои WHERE / WHAT",
        "title_kg": "Жай предлогдору жана WHERE / WHAT суроолору",
        "title_kz": "Орын предлогтары және WHERE / WHAT сұрақтары",
        "intro_ru": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>in</code> = внутри</div><div><code>on</code> = на поверхности</div><div><code>at</code> = у / в точке</div><div><code>next to</code> = рядом с</div><div><code>behind</code> = позади</div><div><code>in front of</code> = перед</div><div><code>between</code> = между</div><div><code>opposite</code> = напротив</div></div>",
        "intro_uz": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>in</code> = ichida</div><div><code>on</code> = ustida</div><div><code>at</code> = yonida / nuqtada</div><div><code>next to</code> = yonida</div><div><code>behind</code> = ortida</div><div><code>in front of</code> = oldida</div><div><code>between</code> = o'rtasida</div><div><code>opposite</code> = ro'parasida</div></div>",
        "intro_tj": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>in</code> = дар дохили</div><div><code>on</code> = рӯйи</div><div><code>at</code> = назди / дар нуқта</div><div><code>next to</code> = дар паҳлӯи</div><div><code>behind</code> = пушти</div><div><code>in front of</code> = пеши</div><div><code>between</code> = байни</div><div><code>opposite</code> = рӯ ба рӯ</div></div>",
        "intro_kg": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>in</code> = ичинде</div><div><code>on</code> = үстүндө</div><div><code>at</code> = жанында / чекитте</div><div><code>next to</code> = жанында</div><div><code>behind</code> = артында</div><div><code>in front of</code> = алдында</div><div><code>between</code> = ортосунда</div><div><code>opposite</code> = маңдайында</div></div>",
        "intro_kz": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>in</code> = ішінде</div><div><code>on</code> = үстінде</div><div><code>at</code> = жанында / нүктеде</div><div><code>next to</code> = жанында</div><div><code>behind</code> = артында</div><div><code>in front of</code> = алдында</div><div><code>between</code> = арасында</div><div><code>opposite</code> = қарсысында</div></div>",
        "note_ru": "Для маршрута часто используют короткие команды: <code>go straight</code>, <code>turn left</code>, <code>turn right</code>, <code>go past</code>.",
        "note_uz": "Yo'nalishda qisqa buyruqlar ishlatiladi: <code>go straight</code>, <code>turn left</code>, <code>turn right</code>, <code>go past</code>.",
        "note_tj": "Барои роҳ аксар фармонҳои кӯтоҳро истифода мебаранд: <code>go straight</code>, <code>turn left</code>, <code>turn right</code>, <code>go past</code>.",
        "note_kg": "Жол көрсөтүүдө кыска буйруктар колдонулат: <code>go straight</code>, <code>turn left</code>, <code>turn right</code>, <code>go past</code>.",
        "note_kz": "Бағыт көрсеткенде қысқа бұйрықтар қолданылады: <code>go straight</code>, <code>turn left</code>, <code>turn right</code>, <code>go past</code>.",
        "cultural_ru": "На британской ферме обычно сначала говорят <code>Excuse me</code> или <code>Please</code>, а потом спрашивают дорогу.",
        "cultural_uz": "Britaniya fermasida odatda avval <code>Excuse me</code> yoki <code>Please</code> deyishadi, keyin yo'l so'rashadi.",
        "cultural_tj": "Дар фермаи Бритониё одатан аввал <code>Excuse me</code> ё <code>Please</code> мегӯянд, баъд роҳ мепурсанд.",
        "cultural_kg": "Британия фермасында адатта алгач <code>Excuse me</code> же <code>Please</code> дешет, анан жол сурашат.",
        "cultural_kz": "Британия фермасында әдетте алдымен <code>Excuse me</code> немесе <code>Please</code> дейді, сосын жол сұрайды.",
        "forms": {
          "positive": {
            "label_ru": "Утверждение",
            "label_uz": "Tasdiq",
            "label_tj": "Тасдиқ",
            "label_kg": "Ырастоо",
            "label_kz": "Растау",
            "rule_ru": "Говорим, где находится место: <code>The canteen is next to the gate.</code>",
            "rule_uz": "Joy qayerda ekanini aytamiz: <code>The canteen is next to the gate.</code>",
            "rule_tj": "Мегӯем, ки ҷой куҷост: <code>The canteen is next to the gate.</code>",
            "rule_kg": "Жай кайда экенин айтабыз: <code>The canteen is next to the gate.</code>",
            "rule_kz": "Орынның қайда екенін айтамыз: <code>The canteen is next to the gate.</code>",
            "table": [
              { "subj": "The canteen", "verb": "is next to", "example": "The canteen is next to the gate.", "transcr": "Зэ кэнтин из некст ту зэ гейт", "tr_ru": "Столовая рядом с воротами.", "tr_uz": "Oshxona darvoza yonida.", "tr_tj": "Ошхона дар паҳлӯи дарвоза аст.", "tr_kg": "Ашкана дарбазанын жанында.", "tr_kz": "Асхана қақпаның жанында." },
              { "subj": "The barn", "verb": "is behind", "example": "The barn is behind the warehouse.", "transcr": "Зэ бан из бихайнд зэ уэахаус", "tr_ru": "Амбар позади склада.", "tr_uz": "Omborxona ombor ortida.", "tr_tj": "Анбор пушти склад аст.", "tr_kg": "Сарай кампанын артында.", "tr_kz": "Қора қойманың артында." },
              { "subj": "The loading bay", "verb": "is in front of", "example": "The loading bay is in front of the packing shed.", "transcr": "Зэ лоудин бэй из ин франт ов зэ пакин шед", "tr_ru": "Зона погрузки перед упаковочным навесом.", "tr_uz": "Yuklash joyi qadoqlash shiyponi oldida.", "tr_tj": "Ҷои боркунӣ пеши навеси бастабандӣ аст.", "tr_kg": "Жүктөө жери таңгактоо жайынын алдында.", "tr_kz": "Тиеу орны қаптау бастырмасының алдында." },
              { "subj": "The checkpoint", "verb": "is on", "example": "The checkpoint is on the left.", "transcr": "Зэ чекпойнт из он зэ лефт", "tr_ru": "Пост проверки слева.", "tr_uz": "Nazorat nuqtasi chap tomonda.", "tr_tj": "Нуқтаи назорат дар тарафи чап аст.", "tr_kg": "Текшерүү жайы сол жакта.", "tr_kz": "Тексеру орны сол жақта." }
            ]
          },
          "negative": {
            "label_ru": "Отрицание",
            "label_uz": "Inkor",
            "label_tj": "Инкор",
            "label_kg": "Терс",
            "label_kz": "Теріс",
            "rule_ru": "Для отрицания добавляем <code>not</code>: <code>The canteen is not behind the fence.</code>",
            "rule_uz": "Inkor uchun <code>not</code> qo'shiladi: <code>The canteen is not behind the fence.</code>",
            "rule_tj": "Барои инкор <code>not</code> илова мешавад: <code>The canteen is not behind the fence.</code>",
            "rule_kg": "Терс форма үчүн <code>not</code> кошулат: <code>The canteen is not behind the fence.</code>",
            "rule_kz": "Теріс форма үшін <code>not</code> қосылады: <code>The canteen is not behind the fence.</code>",
            "table": [
              { "subj": "The exit", "verb": "is not at", "example": "The exit is not at the barn.", "transcr": "Зи экзит из нот эт зэ бан", "tr_ru": "Выход не у амбара.", "tr_uz": "Chiqish omborxona yonida emas.", "tr_tj": "Баромад назди анбор нест.", "tr_kg": "Чыгуу сарайдын жанында эмес.", "tr_kz": "Шығу қораның жанында емес." },
              { "subj": "The canteen", "verb": "is not behind", "example": "The canteen is not behind the fence.", "transcr": "Зэ кэнтин из нот бихайнд зэ фэнс", "tr_ru": "Столовая не за забором.", "tr_uz": "Oshxona panjara ortida emas.", "tr_tj": "Ошхона пушти девор нест.", "tr_kg": "Ашкана тосмонун артында эмес.", "tr_kz": "Асхана қоршаудың артында емес." },
              { "subj": "The signpost", "verb": "is not on", "example": "The signpost is not on the right.", "transcr": "Зэ сайнпоуст из нот он зэ райт", "tr_ru": "Указатель не справа.", "tr_uz": "Ko'rsatkich o'ng tomonda emas.", "tr_tj": "Нишона дар тарафи рост нест.", "tr_kg": "Көрсөткүч оң жакта эмес.", "tr_kz": "Көрсеткіш оң жақта емес." }
            ]
          },
          "question": {
            "label_ru": "Вопрос",
            "label_uz": "Savol",
            "label_tj": "Савол",
            "label_kg": "Суроо",
            "label_kz": "Сұрақ",
            "rule_ru": "В вопросе используем <code>Where is...?</code> / <code>What is...?</code> или ставим <code>is</code> вперед.",
            "rule_uz": "Savolda <code>Where is...?</code> / <code>What is...?</code> ishlatiladi yoki <code>is</code> oldinga chiqadi.",
            "rule_tj": "Дар савол <code>Where is...?</code> / <code>What is...?</code> истифода мешавад ё <code>is</code> ба аввал мебарояд.",
            "rule_kg": "Суроодо <code>Where is...?</code> / <code>What is...?</code> колдонулат же <code>is</code> алдыга чыгат.",
            "rule_kz": "Сұрақта <code>Where is...?</code> / <code>What is...?</code> қолданылады немесе <code>is</code> алдыға шығады.",
            "table": [
              { "subj": "the canteen", "verb": "Where is", "example": "Where is the canteen?", "transcr": "Уэа из зэ кэнтин", "tr_ru": "Где столовая?", "tr_uz": "Oshxona qayerda?", "tr_tj": "Ошхона куҷост?", "tr_kg": "Ашкана кайда?", "tr_kz": "Асхана қайда?" },
              { "subj": "behind the gate", "verb": "What is", "example": "What is behind the gate?", "transcr": "Уот из бихайнд зэ гейт", "tr_ru": "Что за воротами?", "tr_uz": "Darvoza ortida nima bor?", "tr_tj": "Дар пушти дарвоза чӣ ҳаст?", "tr_kg": "Дарбазанын артында эмне бар?", "tr_kz": "Қақпаның артында не бар?" },
              { "subj": "the yard between the barn and the warehouse", "verb": "Is", "example": "Is the yard between the barn and the warehouse?", "transcr": "Из зэ яд битуин зэ бан энд зэ уэахаус", "tr_ru": "Двор между амбаром и складом?", "tr_uz": "Hovli omborxona bilan ombor o'rtasidami?", "tr_tj": "Ҳавлӣ байни анбор ва склад аст?", "tr_kg": "Короо сарай менен кампанын ортосундабы?", "tr_kz": "Аула қора мен қойманың арасында ма?" }
            ]
          }
        }
      },
      "words": [
        { "e": "🍽️", "en": "canteen", "ru": "столовая", "uz": "oshxona", "tj": "ошхона", "kg": "ашкана", "kz": "асхана", "pn": "/kænˈtiːn/", "transcr": "кэнтин" },
        { "e": "🚪", "en": "gate", "ru": "ворота", "uz": "darvoza", "tj": "дарвоза", "kg": "дарбаза", "kz": "қақпа", "pn": "/ɡeɪt/", "transcr": "гейт" },
        { "e": "➡️", "en": "entrance", "ru": "вход", "uz": "kirish", "tj": "даромадгоҳ", "kg": "кире бериш", "kz": "кіреберіс", "pn": "/ˈentrəns/", "transcr": "энтрэнс" },
        { "e": "⬅️", "en": "exit", "ru": "выход", "uz": "chiqish", "tj": "баромад", "kg": "чыгуу", "kz": "шығу", "pn": "/ˈeksɪt/", "transcr": "эксит" },
        { "e": "🏚️", "en": "barn", "ru": "амбар", "uz": "omborxona", "tj": "анбор", "kg": "сарай", "kz": "қора", "pn": "/bɑːn/", "transcr": "бан" },
        { "e": "🏡", "en": "yard", "ru": "двор", "uz": "hovli", "tj": "ҳавлӣ", "kg": "короо", "kz": "аула", "pn": "/jɑːd/", "transcr": "яд" },
        { "e": "🛣️", "en": "lane", "ru": "дорожка", "uz": "yo'lak", "tj": "роҳча", "kg": "жол", "kz": "жолақ", "pn": "/leɪn/", "transcr": "лейн" },
        { "e": "👣", "en": "path", "ru": "тропинка", "uz": "yo'lcha", "tj": "роҳча", "kg": "жолче", "kz": "соқпақ", "pn": "/pɑːθ/", "transcr": "пас" },
        { "e": "🪵", "en": "fence", "ru": "забор", "uz": "panjara", "tj": "девор", "kg": "тосмо", "kz": "қоршау", "pn": "/fens/", "transcr": "фэнс" },
        { "e": "🏬", "en": "warehouse", "ru": "склад", "uz": "ombor", "tj": "склад", "kg": "кампа", "kz": "қойма", "pn": "/ˈweəhaʊs/", "transcr": "уэахаус" },
        { "e": "🏠", "en": "packing shed", "ru": "упаковочный навес", "uz": "qadoqlash shiyponi", "tj": "навеси бастабандӣ", "kg": "таңгактоо жайы", "kz": "қаптау бастырмасы", "pn": "/ˈpækɪŋ ʃed/", "transcr": "пакин шед" },
        { "e": "📦", "en": "loading bay", "ru": "зона погрузки", "uz": "yuklash joyi", "tj": "ҷои боркунӣ", "kg": "жүктөө жери", "kz": "тиеу орны", "pn": "/ˈləʊdɪŋ beɪ/", "transcr": "лоудин бэй" },
        { "e": "✅", "en": "checkpoint", "ru": "пост проверки", "uz": "nazorat nuqtasi", "tj": "нуқтаи назорат", "kg": "текшерүү жайы", "kz": "тексеру орны", "pn": "/ˈtʃekpɔɪnt/", "transcr": "чекпойнт" },
        { "e": "🪧", "en": "signpost", "ru": "указатель", "uz": "ko'rsatkich", "tj": "нишона", "kg": "көрсөткүч", "kz": "көрсеткіш", "pn": "/ˈsaɪnpəʊst/", "transcr": "сайнпоуст" },
        { "e": "➡️", "en": "arrow", "ru": "стрелка", "uz": "strelka", "tj": "тирча", "kg": "жебе", "kz": "жебе", "pn": "/ˈærəʊ/", "transcr": "эроу" },
        { "e": "🌉", "en": "bridge", "ru": "мост", "uz": "ko'prik", "tj": "пул", "kg": "көпүрө", "kz": "көпір", "pn": "/brɪdʒ/", "transcr": "бридж" },
        { "e": "↔️", "en": "next to", "ru": "рядом с", "uz": "yonida", "tj": "дар паҳлӯи", "kg": "жанында", "kz": "жанында", "pn": "/nekst tuː/", "transcr": "некст ту" },
        { "e": "🔜", "en": "in front of", "ru": "перед", "uz": "oldida", "tj": "пеши", "kg": "алдында", "kz": "алдында", "pn": "/ɪn frʌnt əv/", "transcr": "ин франт ов" },
        { "e": "🔙", "en": "behind", "ru": "позади", "uz": "ortida", "tj": "пушти", "kg": "артында", "kz": "артында", "pn": "/bɪˈhaɪnd/", "transcr": "бихайнд" },
        { "e": "↕️", "en": "between", "ru": "между", "uz": "o'rtasida", "tj": "байни", "kg": "ортосунда", "kz": "арасында", "pn": "/bɪˈtwiːn/", "transcr": "битуин" },
        { "e": "🪞", "en": "opposite", "ru": "напротив", "uz": "ro'parasida", "tj": "рӯ ба рӯ", "kg": "маңдайында", "kz": "қарсысында", "pn": "/ˈɒpəzɪt/", "transcr": "опозит" },
        { "e": "⬅️", "en": "on the left", "ru": "слева", "uz": "chap tomonda", "tj": "дар чап", "kg": "сол жакта", "kz": "сол жақта", "pn": "/ɒn ðə left/", "transcr": "он зэ лефт" },
        { "e": "➡️", "en": "on the right", "ru": "справа", "uz": "o'ng tomonda", "tj": "дар рост", "kg": "оң жакта", "kz": "оң жақта", "pn": "/ɒn ðə raɪt/", "transcr": "он зэ райт" },
        { "e": "⬆️", "en": "go straight", "ru": "идите прямо", "uz": "to'g'ri boring", "tj": "рост равед", "kg": "түз баргыла", "kz": "түз жүріңіз", "pn": "/ɡəʊ streɪt/", "transcr": "гоу стрейт" },
        { "e": "↪️", "en": "turn left", "ru": "поверните налево", "uz": "chapga buriling", "tj": "ба чап гардед", "kg": "солго бурулгула", "kz": "солға бұрылыңыз", "pn": "/tɜːn left/", "transcr": "тён лефт" },
        { "e": "↩️", "en": "turn right", "ru": "поверните направо", "uz": "o'ngga buriling", "tj": "ба рост гардед", "kg": "оңго бурулгула", "kz": "оңға бұрылыңыз", "pn": "/tɜːn raɪt/", "transcr": "тён райт" },
        { "e": "🚶", "en": "go past", "ru": "пройдите мимо", "uz": "yonidan o'ting", "tj": "аз паҳлӯяш гузаред", "kg": "жанынан өтгүлө", "kz": "жанынан өтіңіз", "pn": "/ɡəʊ pɑːst/", "transcr": "гоу паст" },
        { "e": "🏠", "en": "inside", "ru": "внутри", "uz": "ichida", "tj": "дар дохил", "kg": "ичинде", "kz": "ішінде", "pn": "/ˌɪnˈsaɪd/", "transcr": "инсайд" },
        { "e": "🌤️", "en": "outside", "ru": "снаружи", "uz": "tashqarida", "tj": "берун", "kg": "сыртта", "kz": "сыртта", "pn": "/ˌaʊtˈsaɪd/", "transcr": "аутсайд" },
        { "e": "🔝", "en": "straight ahead", "ru": "прямо впереди", "uz": "to'g'ri oldinda", "tj": "рост пеш", "kg": "түз алдыда", "kz": "тура алда", "pn": "/streɪt əˈhed/", "transcr": "стрейт эхед" }
      ],
      "dialogue": [
        { "s": "m", "en": "Excuse me, where is the canteen?", "ru": "Извините, где столовая?", "uz": "Kechirasiz, oshxona qayerda?", "tj": "Мебахшед, ошхона куҷост?", "kg": "Кечиресиз, ашкана кайда?", "kz": "Кешіріңіз, асхана қайда?", "transcr": "Экскьюз ми, уэа из зэ кэнтин" },
        { "s": "w", "en": "Go straight and turn left at the gate.", "ru": "Идите прямо и поверните налево у ворот.", "uz": "To'g'ri boring va darvozada chapga buriling.", "tj": "Рост равед ва назди дарвоза ба чап гардед.", "kg": "Түз барып, дарбазадан солго бурулгула.", "kz": "Тура жүріп, қақпадан солға бұрылыңыз.", "transcr": "Гоу стрейт энд тён лефт эт зэ гейт" },
        { "s": "m", "en": "Is it in the yard?", "ru": "Она во дворе?", "uz": "U hovlidami?", "tj": "Ӯ дар ҳавлӣ аст?", "kg": "Ал короодобу?", "kz": "Ол аулада ма?", "transcr": "Из ит ин зэ яд" },
        { "s": "w", "en": "No, it is next to the barn.", "ru": "Нет, она рядом с амбаром.", "uz": "Yo'q, u omborxona yonida.", "tj": "Не, ӯ дар паҳлӯи анбор аст.", "kg": "Жок, ал сарайдын жанында.", "kz": "Жоқ, ол қораның жанында.", "transcr": "Ноу, ит из некст ту зэ бан" },
        { "s": "m", "en": "What is behind the barn?", "ru": "Что позади амбара?", "uz": "Omborxona ortida nima bor?", "tj": "Дар пушти анбор чӣ ҳаст?", "kg": "Сарайдын артында эмне бар?", "kz": "Қораның артында не бар?", "transcr": "Уот из бихайнд зэ бан" },
        { "s": "w", "en": "The packing shed is behind it.", "ru": "За ним упаковочный навес.", "uz": "Qadoqlash shiyponi uning ortida.", "tj": "Навеси бастабандӣ пушти он аст.", "kg": "Анын артында таңгактоо жайы бар.", "kz": "Оның артында қаптау бастырмасы бар.", "transcr": "Зэ пакин шед из бихайнд ит" },
        { "s": "m", "en": "And where is the toilet, please?", "ru": "А где туалет, пожалуйста?", "uz": "Iltimos, hojatxona qayerda?", "tj": "Лутфан, ҳоҷатхона куҷост?", "kg": "Сураныч, даараткана кайда?", "kz": "Өтінемін, дәретхана қайда?", "transcr": "Энд уэа из зэ тойлит, плиз" },
        { "s": "w", "en": "It is between the office and the warehouse.", "ru": "Он между офисом и складом.", "uz": "U ofis bilan ombor o'rtasida.", "tj": "Ӯ байни офис ва склад аст.", "kg": "Ал офис менен кампанын ортосунда.", "kz": "Ол офис пен қойманың арасында.", "transcr": "Ит из битуин зи офис энд зэ уэахаус" },
        { "s": "m", "en": "Thank you. Is the exit near the checkpoint?", "ru": "Спасибо. Выход рядом с постом проверки?", "uz": "Rahmat. Chiqish nazorat nuqtasi yonidami?", "tj": "Ташаккур. Баромад назди нуқтаи назорат аст?", "kg": "Рахмат. Чыгуу текшерүү жайынын жанындабы?", "kz": "Рахмет. Шығу тексеру орнының жанында ма?", "transcr": "Сэнк ю. Из зи экзит ниа зэ чекпойнт" },
        { "s": "w", "en": "Yes. Go past the fence and you will see it on the right.", "ru": "Да. Пройдите мимо забора, и вы увидите его справа.", "uz": "Ha. Panjara yonidan o'ting, uni o'ng tomonda ko'rasiz.", "tj": "Ҳа. Аз назди девор гузаред, онро дар тарафи рост мебинед.", "kg": "Ооба. Тосмонун жанынан өтүңүз, аны оң жактан көрөсүз.", "kz": "Иә. Қоршаудың жанынан өтіңіз, оны оң жақтан көресіз.", "transcr": "Йес. Гоу паст зэ фэнс энд ю уил си ит он зэ райт" }
      ],
      "quiz": [
        { "q": "[COMPLETE] \\"The barn is ___ the warehouse.\\"", "opts": ["behind", "between", "in", "on"], "c": 0, "hint_ru": "Амбар позади склада.", "hint_uz": "Omborxona ombor ortida.", "hint_tj": "Анбор пушти склад аст.", "hint_kg": "Сарай кампанын артында.", "hint_kz": "Қора қойманың артында." },
        { "q": "[COMPLETE] \\"The checkpoint is ___ the left.\\"", "opts": ["on", "in", "at", "behind"], "c": 0, "hint_ru": "Пост проверки слева.", "hint_uz": "Nazorat nuqtasi chap tomonda.", "hint_tj": "Нуқтаи назорат дар тарафи чап аст.", "hint_kg": "Текшерүү жайы сол жакта.", "hint_kz": "Тексеру орны сол жақта." },
        { "q": "[QUESTION]", "opts": ["Where is the exit?", "What is the exit?", "Who is the exit?", "When is the exit?"], "c": 0, "hint_ru": "Где выход?", "hint_uz": "Chiqish qayerda?", "hint_tj": "Баромад куҷост?", "hint_kg": "Чыгуу кайда?", "hint_kz": "Шығу қайда?" },
        { "q": "[TRANSLATE]", "opts": ["gate", "yard", "fence", "barn"], "c": 0, "hint_ru": "ворота", "hint_uz": "darvoza", "hint_tj": "дарвоза", "hint_kg": "дарбаза", "hint_kz": "қақпа" },
        { "q": "[TRANSLATE]", "opts": ["warehouse", "canteen", "bridge", "arrow"], "c": 1, "hint_ru": "столовая", "hint_uz": "oshxona", "hint_tj": "ошхона", "hint_kg": "ашкана", "hint_kz": "асхана" },
        { "q": "[CORRECT]", "opts": ["Turn left at the gate.", "Turn left in the gate.", "Turn left behind gate is.", "Left turn the gate."], "c": 0, "hint_ru": "Поверните налево у ворот.", "hint_uz": "Darvozada chapga buriling.", "hint_tj": "Назди дарвоза ба чап гардед.", "hint_kg": "Дарбазадан солго бурулгула.", "hint_kz": "Қақпадан солға бұрылыңыз." },
        { "q": "[NEGATIVE]", "opts": ["The canteen is not behind the fence.", "The canteen not is behind the fence.", "The canteen does not behind the fence.", "The canteen no behind the fence."], "c": 0, "hint_ru": "Столовая не за забором.", "hint_uz": "Oshxona panjara ortida emas.", "hint_tj": "Ошхона пушти девор нест.", "hint_kg": "Ашкана тосмонун артында эмес.", "hint_kz": "Асхана қоршаудың артында емес." },
        { "q": "[COMPLETE] \\"Go ___ and turn right.\\"", "opts": ["straight", "between", "opposite", "behind"], "c": 0, "hint_ru": "Идите прямо и поверните направо.", "hint_uz": "To'g'ri boring va o'ngga buriling.", "hint_tj": "Рост равед ва ба рост гардед.", "hint_kg": "Түз барып, оңго бурулгула.", "hint_kz": "Тура жүріп, оңға бұрылыңыз." },
        { "q": "[TRANSLATE]", "opts": ["between", "inside", "outside", "opposite"], "c": 0, "hint_ru": "между", "hint_uz": "o'rtasida", "hint_tj": "байни", "hint_kg": "ортосунда", "hint_kz": "арасында" },
        { "q": "[QUESTION]", "opts": ["What is behind the gate?", "What behind is the gate?", "Is what behind the gate?", "Do what behind the gate?"], "c": 0, "hint_ru": "Что за воротами?", "hint_uz": "Darvoza ortida nima bor?", "hint_tj": "Дар пушти дарвоза чӣ ҳаст?", "hint_kg": "Дарбазанын артында эмне бар?", "hint_kz": "Қақпаның артында не бар?" }
      ]
    },`;

fs.writeFileSync(file, html.replace(match[0], replacement), 'utf8');
console.log('Lesson 5 replaced');
