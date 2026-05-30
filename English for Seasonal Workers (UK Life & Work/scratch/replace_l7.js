const fs = require('fs');

const file = 'a1.html';
const html = fs.readFileSync(file, 'utf8');

const match = html.match(/    \{\r?\n\s*id: 7,[\s\S]*?\r?\n    \},\r?\n(?=    \{\r?\n\s*id: 8,)/);

if (!match) {
  throw new Error('Could not locate lesson 7 block');
}

const replacement = `    {
      "id": 7,
      "mod": 3,
      "name_ru": "Я сейчас собираю!",
      "name_uz": "Men hozir termoqdaman!",
      "name_tj": "Ман ҳоло мечинам!",
      "name_kg": "Мен азыр жыйып жатам!",
      "name_kz": "Мен қазір теріп жатырмын!",
      "cefr": "Present Continuous · Contrast with Present Simple · Future plans",
      "grammar": {
        "title_ru": "PRESENT CONTINUOUS: что происходит прямо сейчас",
        "title_uz": "PRESENT CONTINUOUS: hozir nima bo'lyapti",
        "title_tj": "PRESENT CONTINUOUS: ҳоло чӣ шуда истодааст",
        "title_kg": "PRESENT CONTINUOUS: азыр эмне болуп жатат",
        "title_kz": "PRESENT CONTINUOUS: дәл қазір не болып жатыр",
        "intro_ru": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>I am working</code> = я сейчас работаю</div><div><code>She is packing</code> = она сейчас упаковывает</div><div><code>They are loading</code> = они сейчас грузят</div><div><code>Are you waiting?</code> = ты сейчас ждёшь?</div></div>",
        "intro_uz": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>I am working</code> = men hozir ishlayapman</div><div><code>She is packing</code> = u hozir qadoqlayapti</div><div><code>They are loading</code> = ular hozir yuklayapti</div><div><code>Are you waiting?</code> = sen hozir kutyapsanmi?</div></div>",
        "intro_tj": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>I am working</code> = ман ҳоло кор карда истодаам</div><div><code>She is packing</code> = ӯ ҳоло баста истодааст</div><div><code>They are loading</code> = онҳо ҳоло бор мекунанд</div><div><code>Are you waiting?</code> = ту ҳоло интизорӣ мекашӣ?</div></div>",
        "intro_kg": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>I am working</code> = мен азыр иштеп жатам</div><div><code>She is packing</code> = ал азыр таңгактап жатат</div><div><code>They are loading</code> = алар азыр жүктөп жатат</div><div><code>Are you waiting?</code> = сен азыр күтүп жатасыңбы?</div></div>",
        "intro_kz": "<div style=\\"display:grid;grid-template-columns:1fr 1fr;gap:4px\\"><div><code>I am working</code> = мен қазір жұмыс істеп жатырмын</div><div><code>She is packing</code> = ол қазір қаптап жатыр</div><div><code>They are loading</code> = олар қазір тиеп жатыр</div><div><code>Are you waiting?</code> = сен қазір күтіп тұрсың ба?</div></div>",
        "note_ru": "Present Simple = обычно / каждый день. Present Continuous = прямо сейчас. Мы также используем его для ближайших планов: <code>I am starting at 6 tomorrow.</code>",
        "note_uz": "Present Simple = odatda / har kuni. Present Continuous = hozir. Yaqin reja uchun ham ishlatamiz: <code>I am starting at 6 tomorrow.</code>",
        "note_tj": "Present Simple = одатан / ҳар рӯз. Present Continuous = ҳоло. Барои нақшаи наздик ҳам истифода мешавад: <code>I am starting at 6 tomorrow.</code>",
        "note_kg": "Present Simple = адатта / ар күнү. Present Continuous = азыр. Жакынкы план үчүн да колдонобуз: <code>I am starting at 6 tomorrow.</code>",
        "note_kz": "Present Simple = әдетте / күнде. Present Continuous = қазір. Жақын жоспар үшін де қолданамыз: <code>I am starting at 6 tomorrow.</code>",
        "cultural_ru": "На британской ферме часто коротко уточняют статус: <code>I am coming</code>, <code>We are loading now</code>, <code>I am on my break</code>.",
        "cultural_uz": "Britaniya fermasida holatni qisqa aytishadi: <code>I am coming</code>, <code>We are loading now</code>, <code>I am on my break</code>.",
        "cultural_tj": "Дар фермаи Бритониё ҳолатро кӯтоҳ мегӯянд: <code>I am coming</code>, <code>We are loading now</code>, <code>I am on my break</code>.",
        "cultural_kg": "Британия фермасында абалды кыска айтышат: <code>I am coming</code>, <code>We are loading now</code>, <code>I am on my break</code>.",
        "cultural_kz": "Британия фермасында жағдайды қысқа айтады: <code>I am coming</code>, <code>We are loading now</code>, <code>I am on my break</code>.",
        "forms": {
          "positive": {
            "label_ru": "Утверждение",
            "label_uz": "Tasdiq",
            "label_tj": "Тасдиқ",
            "label_kg": "Ырастоо",
            "label_kz": "Растау",
            "rule_ru": "Формула: <code>am/is/are + verb-ing</code>. Говорим о действии, которое идет сейчас.",
            "rule_uz": "Formula: <code>am/is/are + verb-ing</code>. Hozir ketayotgan harakat haqida gapiramiz.",
            "rule_tj": "Шакл: <code>am/is/are + verb-ing</code>. Дар бораи амале, ки ҳоло меравад, мегӯем.",
            "rule_kg": "Формула: <code>am/is/are + verb-ing</code>. Азыр болуп жаткан аракетти айтабыз.",
            "rule_kz": "Формула: <code>am/is/are + verb-ing</code>. Дәл қазір болып жатқан әрекетті айтамыз.",
            "table": [
              {
                "subj": "I",
                "verb": "am picking",
                "example": "I am picking strawberries now.",
                "transcr": "Ай эм пикин строубэриз нау",
                "tr_ru": "Я сейчас собираю клубнику.",
                "tr_uz": "Men hozir qulupnay teryapman.",
                "tr_tj": "Ман ҳоло тутизамин мечинам.",
                "tr_kg": "Мен азыр кулпунай терип жатам.",
                "tr_kz": "Мен қазір құлпынай теріп жатырмын."
              },
              {
                "subj": "She",
                "verb": "is packing",
                "example": "She is packing the boxes.",
                "transcr": "Ши из пэкин зэ боксиз",
                "tr_ru": "Она сейчас упаковывает коробки.",
                "tr_uz": "U hozir qutilarni qadoqlayapti.",
                "tr_tj": "Ӯ ҳоло қуттиҳоро баста истодааст.",
                "tr_kg": "Ал азыр кутуларды таңгактап жатат.",
                "tr_kz": "Ол қазір қораптарды қаптап жатыр."
              },
              {
                "subj": "We",
                "verb": "are loading",
                "example": "We are loading the van.",
                "transcr": "Уи а лоудин зэ вэн",
                "tr_ru": "Мы сейчас загружаем фургон.",
                "tr_uz": "Biz hozir furgonni yuklayapmiz.",
                "tr_tj": "Мо ҳоло мошини боркашро бор мекунем.",
                "tr_kg": "Биз азыр фургонду жүктөп жатабыз.",
                "tr_kz": "Біз қазір фургонды тиеп жатырмыз."
              },
              {
                "subj": "They",
                "verb": "are starting",
                "example": "They are starting at six tomorrow.",
                "transcr": "Зэй а статин эт сикс тумороу",
                "tr_ru": "Они начинают завтра в шесть.",
                "tr_uz": "Ular ertaga soat oltida boshlayapti.",
                "tr_tj": "Онҳо фардо соати шаш сар мекунанд.",
                "tr_kg": "Алар эртең саат алтыда баштап жатат.",
                "tr_kz": "Олар ертең сағат алтыда бастап жатыр."
              }
            ]
          },
          "negative": {
            "label_ru": "Отрицание",
            "label_uz": "Inkor",
            "label_tj": "Инкор",
            "label_kg": "Терс",
            "label_kz": "Теріс",
            "rule_ru": "Для отрицания ставим <code>not</code>: <code>am not / is not / are not</code>.",
            "rule_uz": "Inkor uchun <code>not</code> qo'shamiz: <code>am not / is not / are not</code>.",
            "rule_tj": "Барои инкор <code>not</code> мегузорем: <code>am not / is not / are not</code>.",
            "rule_kg": "Терс форма үчүн <code>not</code> кошобуз: <code>am not / is not / are not</code>.",
            "rule_kz": "Теріс форма үшін <code>not</code> қосамыз: <code>am not / is not / are not</code>.",
            "table": [
              {
                "subj": "He",
                "verb": "is not working",
                "example": "He is not working today.",
                "transcr": "Хи из нот уокин тудэй",
                "tr_ru": "Он сегодня не работает.",
                "tr_uz": "U bugun ishlamayapti.",
                "tr_tj": "Ӯ имрӯз кор карда истода нест.",
                "tr_kg": "Ал бүгүн иштеп жаткан жок.",
                "tr_kz": "Ол бүгін жұмыс істеп жатқан жоқ."
              },
              {
                "subj": "I",
                "verb": "am not driving",
                "example": "I am not driving now.",
                "transcr": "Ай эм нот драйвин нау",
                "tr_ru": "Я сейчас не веду машину.",
                "tr_uz": "Men hozir haydamayapman.",
                "tr_tj": "Ман ҳоло ронандагӣ карда истода нестам.",
                "tr_kg": "Мен азыр айдап жаткан жокмун.",
                "tr_kz": "Мен қазір айдап жатқан жоқпын."
              },
              {
                "subj": "We",
                "verb": "are not resting",
                "example": "We are not resting yet.",
                "transcr": "Уи а нот рэстин йет",
                "tr_ru": "Мы еще не отдыхаем.",
                "tr_uz": "Biz hali dam olayotganimiz yo'q.",
                "tr_tj": "Мо ҳоло ҳанӯз дам гирифта истода нестем.",
                "tr_kg": "Биз азырынча эс алып жаткан жокпуз.",
                "tr_kz": "Біз әлі дем алып жатқан жоқпыз."
              }
            ]
          },
          "question": {
            "label_ru": "Вопрос",
            "label_uz": "Savol",
            "label_tj": "Савол",
            "label_kg": "Суроо",
            "label_kz": "Сұрақ",
            "rule_ru": "В вопросе <code>am/is/are</code> выходит вперед: <code>Are you waiting?</code>",
            "rule_uz": "Savolda <code>am/is/are</code> oldinga chiqadi: <code>Are you waiting?</code>",
            "rule_tj": "Дар савол <code>am/is/are</code> ба аввал мебарояд: <code>Are you waiting?</code>",
            "rule_kg": "Суроодо <code>am/is/are</code> алдыга чыгат: <code>Are you waiting?</code>",
            "rule_kz": "Сұрақта <code>am/is/are</code> алдыға шығады: <code>Are you waiting?</code>",
            "table": [
              {
                "subj": "you",
                "verb": "Are",
                "example": "Are you waiting for the supervisor?",
                "transcr": "А ю уэйтин фо зэ супэвайзэ",
                "tr_ru": "Ты ждешь супервайзера?",
                "tr_uz": "Sen supervayzerni kutyapsanmi?",
                "tr_tj": "Ту супервайзерро интизорӣ мекашӣ?",
                "tr_kg": "Сен супервайзерди күтүп жатасыңбы?",
                "tr_kz": "Сен супервайзерді күтіп тұрсың ба?"
              },
              {
                "subj": "they",
                "verb": "Are",
                "example": "Are they moving the crates?",
                "transcr": "А зэй мувин зэ крэйтс",
                "tr_ru": "Они двигают ящики?",
                "tr_uz": "Ular yashiklarni ko'chiryaptimi?",
                "tr_tj": "Онҳо қуттиҳоро ҷунбонда истодаанд?",
                "tr_kg": "Алар ящиктерди жылдырып жатышабы?",
                "tr_kz": "Олар жәшіктерді жылжытып жатыр ма?"
              },
              {
                "subj": "she",
                "verb": "Is",
                "example": "Is she coming tonight?",
                "transcr": "Из ши камин тынайт",
                "tr_ru": "Она приходит сегодня вечером?",
                "tr_uz": "U bugun kechqurun kelyaptimi?",
                "tr_tj": "Ӯ имшаб меояд?",
                "tr_kg": "Ал бүгүн кечинде келип жатабы?",
                "tr_kz": "Ол бүгін кешке келіп жатыр ма?"
              }
            ]
          }
        }
      },
      "words": [
        { "e": "⚙️", "en": "working", "ru": "работающий", "uz": "ishlayotgan", "tj": "кор карда истода", "kg": "иштеп жаткан", "kz": "жұмыс істеп жатқан", "pn": "/ˈwɜːkɪŋ/", "transcr": "уокин" },
        { "e": "🍓", "en": "picking", "ru": "собирающий", "uz": "terayotgan", "tj": "мечина", "kg": "терип жаткан", "kz": "теріп жатқан", "pn": "/ˈpɪkɪŋ/", "transcr": "пикин" },
        { "e": "📦", "en": "packing", "ru": "упаковывающий", "uz": "qadoqlayotgan", "tj": "баста истода", "kg": "таңгактап жаткан", "kz": "қаптап жатқан", "pn": "/ˈpækɪŋ/", "transcr": "пэкин" },
        { "e": "🧺", "en": "carrying", "ru": "несущий", "uz": "ko'tarayotgan", "tj": "бардошта истода", "kg": "көтөрүп жаткан", "kz": "көтеріп жатқан", "pn": "/ˈkæriɪŋ/", "transcr": "кэрииң" },
        { "e": "🚚", "en": "loading", "ru": "загружающий", "uz": "yuklayotgan", "tj": "бор карда истода", "kg": "жүктөп жаткан", "kz": "тиеп жатқан", "pn": "/ˈləʊdɪŋ/", "transcr": "лоудин" },
        { "e": "🧼", "en": "washing", "ru": "моющий", "uz": "yuvayotgan", "tj": "шуста истода", "kg": "жууп жаткан", "kz": "жуып жатқан", "pn": "/ˈwɒʃɪŋ/", "transcr": "уошин" },
        { "e": "🧹", "en": "cleaning", "ru": "убирающий", "uz": "tozalayotgan", "tj": "тоза карда истода", "kg": "тазалап жаткан", "kz": "тазалап жатқан", "pn": "/ˈkliːnɪŋ/", "transcr": "клинин" },
        { "e": "✅", "en": "checking", "ru": "проверяющий", "uz": "tekshirayotgan", "tj": "санҷида истода", "kg": "текшерип жаткан", "kz": "тексеріп жатқан", "pn": "/ˈtʃekɪŋ/", "transcr": "чекин" },
        { "e": "↔️", "en": "moving", "ru": "двигающий", "uz": "ko'chirayotgan", "tj": "ҷунбонда истода", "kg": "жылдырып жаткан", "kz": "жылжытып жатқан", "pn": "/ˈmuːvɪŋ/", "transcr": "мувин" },
        { "e": "⏳", "en": "waiting", "ru": "ждущий", "uz": "kutayotgan", "tj": "интизор", "kg": "күтүп жаткан", "kz": "күтіп тұрған", "pn": "/ˈweɪtɪŋ/", "transcr": "уэйтин" },
        { "e": "😌", "en": "resting", "ru": "отдыхающий", "uz": "dam olayotgan", "tj": "дам гирифта истода", "kg": "эс алып жаткан", "kz": "дем алып жатқан", "pn": "/ˈrestɪŋ/", "transcr": "рэстин" },
        { "e": "🚦", "en": "starting", "ru": "начинающий", "uz": "boshlayotgan", "tj": "сар карда истода", "kg": "баштап жаткан", "kz": "бастап жатқан", "pn": "/ˈstɑːtɪŋ/", "transcr": "статин" },
        { "e": "🏁", "en": "finishing", "ru": "заканчивающий", "uz": "tugatayotgan", "tj": "тамом карда истода", "kg": "аяктап жаткан", "kz": "аяқтап жатқан", "pn": "/ˈfɪnɪʃɪŋ/", "transcr": "финишин" },
        { "e": "🤝", "en": "meeting", "ru": "встречающий", "uz": "uchrashayotgan", "tj": "вохӯрда истода", "kg": "жолугуп жаткан", "kz": "кездесіп жатқан", "pn": "/ˈmiːtɪŋ/", "transcr": "митин" },
        { "e": "🆘", "en": "helping", "ru": "помогающий", "uz": "yordam berayotgan", "tj": "ёрӣ дода истода", "kg": "жардам берип жаткан", "kz": "көмектесіп жатқан", "pn": "/ˈhelpɪŋ/", "transcr": "хэлпин" },
        { "e": "🔧", "en": "fixing", "ru": "чинящий", "uz": "tuzatayotgan", "tj": "ислоҳ карда истода", "kg": "оңдоп жаткан", "kz": "жөндеп жатқан", "pn": "/ˈfɪksɪŋ/", "transcr": "фиксин" },
        { "e": "🚜", "en": "driving", "ru": "ведущий", "uz": "haydayotgan", "tj": "ронда истода", "kg": "айдап жаткан", "kz": "айдап жатқан", "pn": "/ˈdraɪvɪŋ/", "transcr": "драйвин" },
        { "e": "🚶", "en": "walking", "ru": "идущий", "uz": "yurayotgan", "tj": "рафта истода", "kg": "басып жаткан", "kz": "жүріп жатқан", "pn": "/ˈwɔːkɪŋ/", "transcr": "уокин" },
        { "e": "🗣️", "en": "talking", "ru": "говорящий", "uz": "gapirayotgan", "tj": "гап зада истода", "kg": "сүйлөп жаткан", "kz": "сөйлеп жатқан", "pn": "/ˈtɔːkɪŋ/", "transcr": "токин" },
        { "e": "👂", "en": "listening", "ru": "слушающий", "uz": "tinglayotgan", "tj": "гӯш карда истода", "kg": "угуп жаткан", "kz": "тыңдап жатқан", "pn": "/ˈlɪsənɪŋ/", "transcr": "лисэнин" },
        { "e": "🌧️", "en": "raining", "ru": "идущий дождь", "uz": "yomg'ir yog'ayotgan", "tj": "борон борида истода", "kg": "жамгыр жаап жаткан", "kz": "жаңбыр жауып жатқан", "pn": "/ˈreɪnɪŋ/", "transcr": "рэйнин" },
        { "e": "🌞", "en": "shining", "ru": "светящий", "uz": "porlayotgan", "tj": "дурахшида истода", "kg": "жаркырап жаткан", "kz": "жарқырап тұрған", "pn": "/ˈʃaɪnɪŋ/", "transcr": "шайнин" },
        { "e": "🚪", "en": "arriving", "ru": "прибывающий", "uz": "kelayotgan", "tj": "расида истода", "kg": "келип жаткан", "kz": "келіп жатқан", "pn": "/əˈraɪvɪŋ/", "transcr": "эрайвин" },
        { "e": "👋", "en": "leaving", "ru": "уходящий", "uz": "ketayotgan", "tj": "рафта истода", "kg": "кетип жаткан", "kz": "кетіп жатқан", "pn": "/ˈliːvɪŋ/", "transcr": "ливин" },
        { "e": "🗓️", "en": "planning", "ru": "планирующий", "uz": "rejalashtirayotgan", "tj": "нақша карда истода", "kg": "пландап жаткан", "kz": "жоспарлап жатқан", "pn": "/ˈplænɪŋ/", "transcr": "плэнин" },
        { "e": "➡️", "en": "tomorrow", "ru": "завтра", "uz": "ertaga", "tj": "фардо", "kg": "эртең", "kz": "ертең", "pn": "/təˈmɒrəʊ/", "transcr": "тумороу" },
        { "e": "🌙", "en": "tonight", "ru": "сегодня вечером", "uz": "bugun kechqurun", "tj": "имшаб", "kg": "бүгүн кечинде", "kz": "бүгін кешке", "pn": "/təˈnaɪt/", "transcr": "тынайт" },
        { "e": "☕", "en": "break", "ru": "перерыв", "uz": "tanaffus", "tj": "танаффус", "kg": "тыныгуу", "kz": "үзіліс", "pn": "/breɪk/", "transcr": "брэйк" },
        { "e": "📋", "en": "busy", "ru": "занятой", "uz": "band", "tj": "банд", "kg": "бош эмес", "kz": "бос емес", "pn": "/ˈbɪzi/", "transcr": "бизи" },
        { "e": "🟢", "en": "free", "ru": "свободный", "uz": "bo'sh", "tj": "озод", "kg": "бош", "kz": "бос", "pn": "/friː/", "transcr": "фри" }
      ],
      "dialogue": [
        { "s": "m", "en": "What are you doing now?", "ru": "Что ты сейчас делаешь?", "uz": "Sen hozir nima qilyapsan?", "tj": "Ту ҳоло чӣ кор карда истодаӣ?", "kg": "Сен азыр эмне кылып жатасың?", "kz": "Сен қазір не істеп жатырсың?", "transcr": "Уот а ю дуин нау" },
        { "s": "w", "en": "I am picking strawberries in row four.", "ru": "Я сейчас собираю клубнику в четвёртом ряду.", "uz": "Men hozir to'rtinchi qatorda qulupnay teryapman.", "tj": "Ман ҳоло дар қатори чорум тутизамин мечинам.", "kg": "Мен азыр төртүнчү катарда кулпунай терип жатам.", "kz": "Мен қазір төртінші қатарда құлпынай теріп жатырмын.", "transcr": "Ай эм пикин строубэриз ин роу фор" },
        { "s": "m", "en": "Is Sam helping you today?", "ru": "Сэм сегодня тебе помогает?", "uz": "Sem bugun senga yordam beryaptimi?", "tj": "Сэм имрӯз ба ту ёрӣ дода истодааст?", "kg": "Сэм бүгүн сага жардам берип жатабы?", "kz": "Сэм бүгін саған көмектесіп жатыр ма?", "transcr": "Из Сэм хэлпин ю тудэй" },
        { "s": "w", "en": "No, he is loading the van with boxes.", "ru": "Нет, он загружает фургон коробками.", "uz": "Yo'q, u furgonga qutilarni yuklayapti.", "tj": "Не, ӯ мошинро бо қуттиҳо бор карда истодааст.", "kg": "Жок, ал фургонго кутуларды жүктөп жатат.", "kz": "Жоқ, ол фургонға қораптарды тиеп жатыр.", "transcr": "Ноу, хи из лоудин зэ вэн уиз боксиз" },
        { "s": "m", "en": "Are you working after lunch too?", "ru": "Ты после обеда тоже работаешь?", "uz": "Sen tushlikdan keyin ham ishlayapsanmi?", "tj": "Ту баъд аз нисфирӯзӣ ҳам кор карда истодаӣ?", "kg": "Сен түштөн кийин да иштеп жатасыңбы?", "kz": "Сен түстен кейін де жұмыс істеп жатырсың ба?", "transcr": "А ю уокин афтэ ланч ту" },
        { "s": "w", "en": "Yes, I am finishing at five today.", "ru": "Да, я заканчиваю сегодня в пять.", "uz": "Ha, men bugun soat beshda tugatayapman.", "tj": "Ҳа, ман имрӯз соати панҷ тамом мекунам.", "kg": "Ооба, мен бүгүн саат беште аяктап жатам.", "kz": "Иә, мен бүгін сағат бесте аяқтап жатырмын.", "transcr": "Йес, ай эм финишин эт файв тудэй" },
        { "s": "m", "en": "What are you doing tomorrow morning?", "ru": "Что ты делаешь завтра утром?", "uz": "Sen ertaga ertalab nima qilyapsan?", "tj": "Ту фардо саҳар чӣ кор мекунӣ?", "kg": "Сен эртең эртең менен эмне кылып жатасың?", "kz": "Сен ертең таңертең не істеп жатырсың?", "transcr": "Уот а ю дуин тумороу монин" },
        { "s": "w", "en": "I am starting at six and then I am packing fruit.", "ru": "Я начинаю в шесть, а потом упаковываю фрукты.", "uz": "Men soat oltida boshlayman, keyin mevalarni qadoqlayman.", "tj": "Ман соати шаш сар мекунам, баъд меваҳоро баста истодаам.", "kg": "Мен саат алтыда баштайм, анан мөмөлөрдү таңгактайм.", "kz": "Мен сағат алтыда бастаймын, сосын жемісті қаптаймын.", "transcr": "Ай эм статин эт сикс энд зэн ай эм пэкин фрут" },
        { "s": "m", "en": "OK, I am meeting the supervisor now. See you tonight.", "ru": "Хорошо, я сейчас встречаюсь с супервайзером. Увидимся вечером.", "uz": "Mayli, men hozir supervayzer bilan uchrashyapman. Kechqurun ko'rishamiz.", "tj": "Хуб, ман ҳоло бо супервайзер вомехӯрам. Имшаб мебинемат.", "kg": "Макул, мен азыр супервайзер менен жолугуп жатам. Кечинде көрүшөбүз.", "kz": "Жақсы, мен қазір супервайзермен кездесіп жатырмын. Кешке көрісеміз.", "transcr": "Окей, ай эм митин зэ супэвайзэ нау. Си ю тынайт" },
        { "s": "w", "en": "See you. I am going on my break in ten minutes.", "ru": "Увидимся. Я иду на перерыв через десять минут.", "uz": "Ko'rishguncha. Men o'n daqiqadan keyin tanaffusga chiqyapman.", "tj": "Хайр, ман баъд аз даҳ дақиқа ба танаффус меравам.", "kg": "Көрүшкөнчө. Мен он мүнөттөн кийин тыныгууга чыгып жатам.", "kz": "Көріскенше. Мен он минуттан кейін үзіліске шығып жатырмын.", "transcr": "Си ю. Ай эм гоуин он май брэйк ин тэн минутс" }
      ],
      "quiz": [
        {
          "q": "[COMPLETE] \\"I am ___ boxes now.\\"",
          "opts": ["packing", "pack", "packs", "packed"],
          "c": 0,
          "hint_ru": "Я сейчас упаковываю коробки.",
          "hint_uz": "Men hozir qutilarni qadoqlayapman.",
          "hint_tj": "Ман ҳоло қуттиҳоро баста истодаам.",
          "hint_kg": "Мен азыр кутуларды таңгактап жатам.",
          "hint_kz": "Мен қазір қораптарды қаптап жатырмын."
        },
        {
          "q": "[NEGATIVE]",
          "opts": ["She not working today.", "She is not working today.", "She does not working today.", "She no working today."],
          "c": 1,
          "hint_ru": "Она сегодня не работает.",
          "hint_uz": "U bugun ishlamayapti.",
          "hint_tj": "Ӯ имрӯз кор карда истода нест.",
          "hint_kg": "Ал бүгүн иштеп жаткан жок.",
          "hint_kz": "Ол бүгін жұмыс істеп жатқан жоқ."
        },
        {
          "q": "[QUESTION]",
          "opts": ["Are they loading the van?", "Do they loading the van?", "They are loading the van?", "Is they loading the van?"],
          "c": 0,
          "hint_ru": "Они сейчас загружают фургон?",
          "hint_uz": "Ular hozir furgonni yuklayaptimi?",
          "hint_tj": "Онҳо ҳоло мошинро бор мекунанд?",
          "hint_kg": "Алар азыр фургонду жүктөп жатышабы?",
          "hint_kz": "Олар қазір фургонды тиеп жатыр ма?"
        },
        {
          "q": "[TRANSLATE]",
          "opts": ["waiting", "moving", "helping", "fixing"],
          "c": 0,
          "hint_ru": "ждущий / ожидающий",
          "hint_uz": "kutayotgan",
          "hint_tj": "интизор",
          "hint_kg": "күтүп жаткан",
          "hint_kz": "күтіп тұрған"
        },
        {
          "q": "[COMPLETE] \\"We are ___ for the supervisor.\\"",
          "opts": ["waiting", "wait", "waits", "waited"],
          "c": 0,
          "hint_ru": "Мы ждём супервайзера.",
          "hint_uz": "Biz supervayzerni kutyapmiz.",
          "hint_tj": "Мо супервайзерро интизорем.",
          "hint_kg": "Биз супервайзерди күтүп жатабыз.",
          "hint_kz": "Біз супервайзерді күтіп тұрмыз."
        },
        {
          "q": "[CORRECT]",
          "opts": ["He is checking the list.", "He checking the list.", "He does checking the list.", "He check the list now."],
          "c": 0,
          "hint_ru": "Он сейчас проверяет список.",
          "hint_uz": "U hozir ro'yxatni tekshirayotir.",
          "hint_tj": "Ӯ ҳоло рӯйхатро санҷида истодааст.",
          "hint_kg": "Ал азыр тизмени текшерип жатат.",
          "hint_kz": "Ол қазір тізімді тексеріп жатыр."
        },
        {
          "q": "[NEGATIVE]",
          "opts": ["I am not driving now.", "I not am driving now.", "I do not driving now.", "I am no driving now."],
          "c": 0,
          "hint_ru": "Я сейчас не веду машину.",
          "hint_uz": "Men hozir haydamayapman.",
          "hint_tj": "Ман ҳоло ронандагӣ карда истода нестам.",
          "hint_kg": "Мен азыр айдап жаткан жокмун.",
          "hint_kz": "Мен қазір айдап жатқан жоқпын."
        },
        {
          "q": "[TRANSLATE]",
          "opts": ["tomorrow", "tonight", "break", "busy"],
          "c": 0,
          "hint_ru": "завтра",
          "hint_uz": "ertaga",
          "hint_tj": "фардо",
          "hint_kg": "эртең",
          "hint_kz": "ертең"
        },
        {
          "q": "[COMPLETE] \\"They are ___ at six tomorrow.\\"",
          "opts": ["starting", "start", "starts", "started"],
          "c": 0,
          "hint_ru": "Они начинают завтра в шесть.",
          "hint_uz": "Ular ertaga soat oltida boshlayapti.",
          "hint_tj": "Онҳо фардо соати шаш сар мекунанд.",
          "hint_kg": "Алар эртең саат алтыда баштап жатат.",
          "hint_kz": "Олар ертең сағат алтыда бастап жатыр."
        },
        {
          "q": "[QUESTION]",
          "opts": ["What are you doing now?", "What do you doing now?", "What you are doing now?", "What is you doing now?"],
          "c": 0,
          "hint_ru": "Что ты сейчас делаешь?",
          "hint_uz": "Sen hozir nima qilyapsan?",
          "hint_tj": "Ту ҳоло чӣ кор карда истодаӣ?",
          "hint_kg": "Сен азыр эмне кылып жатасың?",
          "hint_kz": "Сен қазір не істеп жатырсың?"
        }
      ]
    },`;

const updated = html.replace(match[0], replacement);
fs.writeFileSync(file, updated, 'utf8');
console.log('Lesson 7 replaced');
