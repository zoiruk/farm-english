const fs = require('fs');
let html = fs.readFileSync('a1.html', 'utf8');

// 1. Fix missing commas between lessons
// We look for patterns where a lesson object ends and another starts without a comma
for (let i = 2; i <= 15; i++) {
  const searchPattern = new RegExp('}\\s+{\\s+id: ' + i + ',', 'g');
  const replacement = '},\n    {\n      id: ' + i + ',';
  if (html.match(searchPattern)) {
    console.log('Fixing missing comma before Lesson ' + i);
    html = html.replace(searchPattern, replacement);
  }
}

// 2. Fix unescaped quotes in quiz questions
html = html.replace("q: 'What is the word for 'стопа'?',", "q: 'What is the word for стопа?',");
html = html.replace("q: 'To 'call in sick' means...',", "q: 'To call in sick means...',");
html = html.replace("q: 'What does 'marital status' mean? (семейное положение)',", "q: 'What does marital status mean? (семейное положение)',");
html = html.replace("q: 'What is a 'surname'? (фамилия)',", "q: 'What is a surname? (фамилия)',");
html = html.replace("q: 'What is a 'first name'? (имя)',", "q: 'What is a first name? (имя)',");
html = html.replace("q: 'What does 'NI number' mean? (номер соцстрахования)',", "q: 'What does NI number mean? (номер соцстрахования)',");
html = html.replace("q: 'What is 'single'? (холост)',", "q: 'What is single? (холост)',");
html = html.replace("q: 'What is 'married'? (женат/замужем)',", "q: 'What is married? (женат/замужем)',");

// 3. Fix duplicates in L2 (using the logic from previous attempts)
html = html.replace("en: 'washroom attendant'", "en: 'quality controller'");
html = html.replace("ru: 'сотрудник уборной'", "ru: 'контролер качества'");
html = html.replace("uz: 'hojatxona xodimi'", "uz: 'sifat nazoratchisi'");
html = html.replace("tj: 'коргари ҳоҷатхона'", "tj: 'назоратчии сифат'");
html = html.replace("kg: 'ажаткана кызматкери'", "kg: 'сапат контролеру'");
html = html.replace("pn: '/ˈwɒʃruːm əˈtendənt/'", "pn: '/ˈkwɒlɪti kənˈtrəʊlə/'");

html = html.replace("en: 'printer'", "en: 'camp manager'");
html = html.replace("ru: 'принтер'", "ru: 'менеджер лагеря'");
html = html.replace("uz: 'printer'", "uz: 'lager menejeri'");
html = html.replace("tj: 'принтер'", "tj: 'мудири лагер'");
html = html.replace("kg: 'принтер'", "kg: 'лагердин менеджери'");
html = html.replace("pn: '/ˈprɪntə/'", "pn: '/kæmp ˈmænɪdʒə/'");

html = html.replace("en: 'computer'", "en: 'forklift driver'");
html = html.replace("ru: 'компьютер'", "ru: 'водитель погрузчика'");
html = html.replace("uz: 'kompyuter'", "uz: 'avtoyuklagich haydovchisi'");
html = html.replace("tj: 'компютер'", "tj: 'ронандаи борбардор'");
html = html.replace("kg: 'компьютер'", "kg: 'жүк көтөргүч айдоочу'");
html = html.replace("pn: '/kəmˈpjuːtə/'", "pn: '/ˈfɔːklɪft ˈdraɪvə/'");

html = html.replace("en: 'high-vis vest'", "en: 'agronomist'");
html = html.replace("ru: 'светоотражающий жилет'", "ru: 'агроном'");
html = html.replace("uz: 'nur qaytaruvchi jilet'", "uz: 'agronom'");
html = html.replace("tj: 'куртаи нурбаргардонанда'", "tj: 'агроном'");
html = html.replace("kg: 'жарык кайтаруучу жилет'", "kg: 'агроном'");
html = html.replace("pn: '/ˌhaɪ ˈvɪz vest/'", "pn: '/əˈɡrɒnəmɪst/'");

// 4. Fix duplicates in L3
html = html.replace("en: 'notebook'", "en: 'secateurs'");
html = html.replace("ru: 'блокнот'", "ru: 'секатор'");
html = html.replace("uz: 'daftar'", "uz: 'sekator'");
html = html.replace("tj: 'дафтар'", "tj: 'секатор'");
html = html.replace("kg: 'блокнот'", "kg: 'секатор'");
html = html.replace("pn: '/ˈnəʊtbʊk/'", "pn: '/ˌsekəˈtɜːz/'");

html = html.replace("en: 'pen'", "en: 'shovel'");
html = html.replace("ru: 'ручка'", "ru: 'лопата'");
html = html.replace("uz: 'ruchka'", "uz: 'belkurak'");
html = html.replace("tj: 'қалам'", "tj: 'бел'");
html = html.replace("kg: 'калем'", "kg: 'күрөк'");
html = html.replace("pn: '/pen/'", "pn: '/ˈʃʌvl/'");

html = html.replace("en: 'paper'", "en: 'hose'");
html = html.replace("ru: 'бумага'", "ru: 'шланг'");
html = html.replace("uz: 'qog\\'oz'", "uz: 'shlang'");
html = html.replace("tj: 'коғаз'", "tj: 'шланг'");
html = html.replace("kg: 'кагаз'", "kg: 'шланг'");
html = html.replace("pn: '/ˈpeɪpə/'", "pn: '/həʊz/'");

html = html.replace("en: 'ruler'", "en: 'wheelbarrow'");
html = html.replace("ru: 'линейка'", "ru: 'тачка'");
html = html.replace("uz: 'chizg\\'ich'", "uz: 'zambilg\\'ach'");
html = html.replace("tj: 'хаткаш'", "tj: 'аробача'");
html = html.replace("kg: 'сызгыч'", "kg: 'замбилгич'");
html = html.replace("pn: '/ˈruːlə/'", "pn: '/ˈwiːlbærəʊ/'");

fs.writeFileSync('a1.html', html);
console.log('Master fix applied successfully.');
