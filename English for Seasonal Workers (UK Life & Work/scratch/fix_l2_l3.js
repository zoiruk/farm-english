const fs = require('fs');
let html = fs.readFileSync('a1.html', 'utf8');

// Replace L2 objects
html = html.replace(/en: 'washroom attendant'/g, "en: 'quality controller'");
html = html.replace(/ru: 'сотрудник уборной'/g, "ru: 'контролер качества'");
html = html.replace(/uz: 'hojatxona xodimi'/g, "uz: 'sifat nazoratchisi'");
html = html.replace(/tj: 'коргари ҳоҷатхона'/g, "tj: 'назоратчии сифат'");
html = html.replace(/kg: 'ажаткана кызматкери'/g, "kg: 'сапат контролеру'");
html = html.replace(/pn: '\\/ˈwɒʃruːm əˈtendənt\\/'/g, "pn: '/ˈkwɒlɪti kənˈtrəʊlə/'");

html = html.replace(/en: 'printer'/g, "en: 'camp manager'");
html = html.replace(/ru: 'принтер'/g, "ru: 'менеджер лагеря'");
html = html.replace(/uz: 'printer'/g, "uz: 'lager menejeri'");
html = html.replace(/tj: 'принтер'/g, "tj: 'мудири лагер'");
html = html.replace(/kg: 'принтер'/g, "kg: 'лагердин менеджери'");
html = html.replace(/pn: '\\/ˈprɪntə\\/'/g, "pn: '/kæmp ˈmænɪdʒə/'");

html = html.replace(/en: 'computer'/g, "en: 'forklift driver'");
html = html.replace(/ru: 'компьютер'/g, "ru: 'водитель погрузчика'");
html = html.replace(/uz: 'kompyuter'/g, "uz: 'avtoyuklagich haydovchisi'");
html = html.replace(/tj: 'компютер'/g, "tj: 'ронандаи борбардор'");
html = html.replace(/kg: 'компьютер'/g, "kg: 'жүк көтөргүч айдоочу'");
html = html.replace(/pn: '\\/kəmˈpjuːtə\\/'/g, "pn: '/ˈfɔːklɪft ˈdraɪvə/'");

html = html.replace(/en: 'high-vis vest'/g, "en: 'agronomist'");
html = html.replace(/ru: 'светоотражающий жилет'/g, "ru: 'агроном'");
html = html.replace(/uz: 'nur qaytaruvchi jilet'/g, "uz: 'agronom'");
html = html.replace(/tj: 'куртаи нурбаргардонанда'/g, "tj: 'агроном'");
html = html.replace(/kg: 'жарык кайтаруучу жилет'/g, "kg: 'агроном'");
html = html.replace(/pn: '\\/ˌhaɪ ˈvɪz vest\\/'/g, "pn: '/əˈɡrɒnəmɪst/'");

// Replace L3 objects
html = html.replace(/en: 'notebook'/g, "en: 'secateurs'");
html = html.replace(/ru: 'блокнот'/g, "ru: 'секатор'");
html = html.replace(/uz: 'daftar'/g, "uz: 'sekator'");
html = html.replace(/tj: 'дафтар'/g, "tj: 'секатор'");
html = html.replace(/kg: 'блокнот'/g, "kg: 'секатор'");
html = html.replace(/pn: '\\/ˈnəʊtbʊk\\/'/g, "pn: '/ˌsekəˈtɜːz/'");

html = html.replace(/en: 'pen'/g, "en: 'shovel'");
html = html.replace(/ru: 'ручка'/g, "ru: 'лопата'");
html = html.replace(/uz: 'ruchka'/g, "uz: 'belkurak'");
html = html.replace(/tj: 'қалам'/g, "tj: 'бел'");
html = html.replace(/kg: 'калем'/g, "kg: 'күрөк'");
html = html.replace(/pn: '\\/pen\\/'/g, "pn: '/ˈʃʌvl/'");

html = html.replace(/en: 'paper'/g, "en: 'hose'");
html = html.replace(/ru: 'бумага'/g, "ru: 'шланг'");
html = html.replace(/uz: 'qog\\'oz'/g, "uz: 'shlang'");
html = html.replace(/tj: 'коғаз'/g, "tj: 'шланг'");
html = html.replace(/kg: 'кагаз'/g, "kg: 'шланг'");
html = html.replace(/pn: '\\/ˈpeɪpə\\/'/g, "pn: '/həʊz/'");

html = html.replace(/en: 'ruler'/g, "en: 'wheelbarrow'");
html = html.replace(/ru: 'линейка'/g, "ru: 'тачка'");
html = html.replace(/uz: 'chizg\\'ich'/g, "uz: 'zambilg\\'ach'");
html = html.replace(/tj: 'хаткаш'/g, "tj: 'аробача'");
html = html.replace(/kg: 'сызгыч'/g, "kg: 'замбилгич'");
html = html.replace(/pn: '\\/ˈruːlə\\/'/g, "pn: '/ˈwiːlbærəʊ/'");

// Fix missing commas before ID: X
for(let i=8; i<=15; i++) {
  html = html.replace(new RegExp('    \\}\\r?\n\\r?\n    \\{\\r?\n      id: ' + i + ',', 'g'), '    },\n    {\n      id: ' + i + ',');
}

fs.writeFileSync('a1.html', html);
console.log('Fixed duplicates in L2 and L3');
