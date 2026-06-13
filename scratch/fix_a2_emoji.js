// fix_a2_emoji.js — Task 6.4: fix emoji diversity in A2 lessons to ≥80% unique per lesson
// Run: node scratch/fix_a2_emoji.js
'use strict';
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'a2.html');
let html = fs.readFileSync(filePath, 'utf8');
const le = html.includes('\r\n') ? '\r\n' : '\n';
html = html.replace(/[ \t]+\r\n/g, '\r\n').replace(/[ \t]+\n/g, '\n');

// fixes[lessonId][wordEn] = newEmoji  ('' = Material Symbol / no suitable emoji)
const fixes = {
  1: {
    'payslip': '🧾',
    'earn': '💰',
    'paid': '✅',
    'salary': '💵',
    'tax': '🏛️',
    'hours': '⏱️',
    'overtime': '🕐',
    'gross': '',
    'net': '',
    'deduction': '➖',
    'basic': '',
    'national insurance': '🛡️',
    'bank account': '🏦',
    'code': '🔢',
    'money': '💸',
    'rate': '📈',
    'slip': '📄',
    'details': '📝',
    'query': '❓',
    'correct': '☑️',
    'pay': '💳',
    'tax code': '',
    'bank details': '🔑',
    'deduct': '',
    'earn money': '📊',
    'wrong': '❌',
    'explain': '🗣️',
    'receive': '📬',
    'payroll': '🖥️',
    'underpayment': '⬇️'
  },
  4: {
    'health centre': '🏥',
    'medical form': '📋',
    'stethoscope': '🩺',
    'painkiller': '💊',
    'waiting area': '🪑',
    'patient': '🧑‍⚕️',
    'pulse': '❤️',
    'ibuprofen': '',
    'reception desk': '🖥️',
    'health record': '📄',
    'blood pressure': '🩸',
    'prescription pad': '📝',
    'NHS number': '🆔',
    'sick note': '🗒️',
    'scan': '🔬',
    'pharmacy bag': '🛍️',
    'urgent care': '🚨',
    'consent form': '✍️',
    'X-ray': '🦴',
    'repeat prescription': '🔄',
    'out of hours': '🌙',
    'triage': '⚡',
    'swab': '🧪',
    'over the counter': '🏪',
    'walk-in centre': '🚶',
    'medical history': '📚',
    'diagnosis': '🔍',
    'course of treatment': '💉',
    'referral letter': '✉️',
    'follow-up appointment': '📅'
  },
  5: {
    'pharmacist': '👨‍⚕️',
    'symptom': '😷',
    'diagnose': '🔍',
    'antibiotic': '',
    'allergy': '🌸',
    'vitamin': '',
    'high temperature': '🔥',
    'sore throat': '🤐',
    'capsule': '',
    'checkup': '🩺',
    'spray': '',
    'specialist': '👩‍⚕️',
    'outpatient': '🚶',
    'dosage': '',
    'examine': '🔎',
    'side effect': '⚠️',
    'discharge': '🚪',
    'follow-up': '📅'
  },
  6: {
    'one-way ticket': '🎫',
    'return ticket': '🔄',
    'boarding point': '📍',
    'train schedule': '🗓️',
    'express': '⚡',
    'booking': '📲',
    'interchange': '🔀',
    'reserved': '🪑',
    'carriage': '🚃',
    'valid': '✅',
    'concourse': '🏛️',
    'peak': '📈',
    'off-peak': '📉',
    'conductor': '👷',
    'route map': '🗺️',
    'terminal': '🏁',
    'penalty': '💸',
    'track': '🛤️',
    'coach station': '🚌',
    'fare card': '💳',
    'connection': '🔗',
    'overhead': '',
    'stamp': '📮',
    'intercity': '🚄',
    'minibus stop': '🚐',
    'upgrade': '⬆️',
    'departure board': '🖥️',
    'waiting room': '⏳',
    'season ticket': '🎟️',
    'guard': '👮'
  },
  7: {
    'city centre': '🏙️',
    'supermarket': '🛒',
    'post office': '📮',
    'bank': '🏦',
    'traffic lights': '🚦',
    'junction': '🔀',
    'roundabout': '🔵',
    'block': '🏢',
    'pedestrian': '🚶',
    'crossing': '🚸',
    'suburb': '🏘️',
    'landmark': '📍',
    'building': '🏗️',
    'car park': '🅿️',
    'shopping centre': '🏬',
    'address': '📬',
    'footpath': '👣',
    'district': '',
    'shortcut': '↗️',
    'council': '🏛️',
    'pavement': '',
    'alley': '🌃',
    'avenue': '',
    'road sign': '🪧',
    'library': '📚',
    'underpass': '🚇',
    'square': '',
    'locate': '🔍',
    'intersection': '',
    'directions': '🧭'
  },
  8: {
    'voicemail': '📩',
    'missed call': '📵',
    'hold': '⏸️',
    'extension': '',
    'landline': '☎️',
    'charge': '🔋',
    'engaged': '🔴',
    'speaker': '🔊',
    'transfer': '🔀',
    'callback': '🔙',
    'dial': '',
    'reception': '📶',
    'urgent': '🚨',
    'reachable': '✅',
    'confirm': '☑️',
    'update': '📲',
    'issue': '⚠️',
    'notify': '🔔',
    'arrange': '🗓️',
    'contact': '📱',
    'leave a message': '💬',
    'hang up': '📴',
    'pick up': '📞',
    'network coverage': '📡',
    'put through': '➡️',
    'engaged tone': '🎵',
    'operator': '👨‍💼',
    'roaming': '🌍',
    'pick up the phone': '',
    'number': '🔢'
  },
  9: {
    'thread': '🧵',
    'photo': '🖼️',
    'follow': '👁️',
    'subscribe': '🔖',
    'username': '🏷️',
    'log in': '🔑',
    'data': '🗃️',
    'install': '⬇️',
    'alert': '🚨'
  },
  10: {
    'rights': '⚖️',
    'entitlement': '✅',
    'rest break': '⏱️',
    'employment law': '📜',
    'minimum wage': '💵',
    'work record': '📄',
    'union': '🤝',
    'grievance': '😤',
    'tribunal': '🏛️',
    'redundancy': '📭',
    'shift pattern': '⏰',
    'deductions': '➖',
    'notice period': '📅',
    'appeal': '📬',
    'written warning': '✉️',
    'mediation': '🕊️',
    'overtime pay': '💰',
    'working hours': '🕐',
    'legislation': '📖',
    'annual leave': '🏖️',
    'dispute': '⚡',
    'sick pay': '💸',
    'lunch break': '🍽️',
    'health and safety': '🦺',
    'wage slip': '🧾',
    'collective agreement': '🤲',
    'probation': '⏳',
    'flexi-time': '🔄',
    'compensation': '💳',
    'zero-hours contract': ''
  },
  11: {
    'complaint': '📋',
    'clause': '',
    'terms': '',
    'breach': '💥',
    'dismissal': '🚪',
    'formal': '👔',
    'resolve': '✅',
    'procedure': '📖',
    'HR department': '🏢',
    'verbal': '🗣️',
    'negotiate': '🤝',
    'penalty clause': '',
    'settlement': '💰',
    'evidence': '📸',
    'witness': '👁️',
    'outcome': '📊',
    'unfair': '⚡',
    'deadline': '⏰',
    'mutual': '🤲',
    'termination': '❌',
    'fair': '☀️',
    'clause number': '🔢',
    'agree': '👍',
    'disagree': '👎',
    'legal': '🏛️',
    'illegal': '🚫',
    'comply': '☑️',
    'obligation': '📌',
    'sanction': '⚖️',
    'amendment': '✏️'
  },
  12: {
    'visa renewal': '📅',
    'immigration': '🛂',
    'permit': '🎫',
    'sponsor': '🤝',
    'biometric': '🔬',
    'border': '🗺️',
    'expiry date': '🗓️',
    'entry clearance': '🚪',
    'declaration': '📝',
    'customs': '🧳',
    'certificate': '🎓',
    'residence': '🏠',
    'renewal': '🔄',
    'deport': '✈️',
    'appeal form': '📋',
    'endorsement': '✒️',
    'authorised': '✅',
    'expired': '⌛',
    'apply': '📨',
    'processing': '⚙️',
    'fee': '💰',
    'interview': '🎙️',
    'supporting documents': '📂',
    'overstay': '⏰',
    'reference number': '🔢',
    'right to work': '💪',
    'proof': '📸',
    'check-in': '☑️',
    'extend': '➕',
    'seasonal worker': '👷'
  },
  13: {
    'culture': '🇬🇧',
    'custom': '📜',
    'tradition': '🎏',
    'polite': '🤲',
    'friendly': '😊',
    'forecast': '⛅',
    'local bar': '🍺',
    'celebration': '🎉',
    'local': '📍',
    'waiting line': '🧍',
    'humour': '😄',
    'respect': '🤝',
    'drizzle': '🌧️',
    'festival': '🎪',
    'neighbour': '🏘️',
    'countryside': '🌄',
    'charity': '❤️',
    'volunteer': '🙋',
    'overcast': '☁️',
    'heritage': '🏰',
    'community': '👥',
    'nature walk': '🌿',
    'bank holiday': '📅',
    'apologise': '🙏',
    'mild': '🌤️',
    'accent': '🗣️',
    'dialect': '💬',
    'woodland': '🌳',
    'etiquette': '👔',
    'integration': '🔄'
  },
  14: {
    'January': '🎆',
    'February': '💝',
    'March': '🌱',
    'April': '🌧️',
    'May': '🌺',
    'June': '🌞',
    'July': '🌻',
    'August': '🏖️',
    'September': '🍁',
    'October': '🎃',
    'November': '💨',
    'December': '🎄',
    'planner': '📓',
    'booking date': '🔖',
    'anniversary': '🎊',
    'quarter': '📊',
    'duration': '⏳',
    'period': '📆',
    'midday': '🕛',
    'midnight': '🌙'
  },
  15: {
    'farewell': '👋',
    'achievement': '🏆',
    'reference letter': '📝',
    'diploma': '🏅',
    'experience': '💼',
    'keep in touch': '🤝',
    'hometown': '🏠',
    'flight': '✈️',
    'suitcase': '🎒',
    'savings': '💰',
    'abroad': '🌍',
    'grateful': '🙏',
    'feedback': '📋',
    'proud': '😊',
    'memorable': '🌟',
    'recommend': '👍',
    'review': '⭐',
    'return home': '🏡',
    'progress': '📈',
    'bond': '❤️',
    'evaluation': '📊',
    'reward': '🎁',
    'opportunity': '🚪',
    'lasting': '♾️',
    'impression': '🌈',
    'skill': '🔧',
    'confidence': '💪',
    'farewell party': '🎉',
    'final': '🏁',
    'inspire': '💡'
  }
};

function getLessonWordsRange(id) {
  const lstart = html.indexOf('"id": ' + id + ',');
  if (lstart === -1) throw new Error('Lesson ' + id + ' not found');
  const wsStart = html.indexOf('"words":', lstart);
  const wsEnd = html.indexOf('],', wsStart) + 2;
  return { wsStart, wsEnd };
}

function replaceEmoji(block, wordEn, newEmoji) {
  const enPat = '"en": "' + wordEn + '"';
  const enIdx = block.indexOf(enPat);
  if (enIdx === -1) return null;

  const ePat = '"e": "';
  const eIdx = block.lastIndexOf(ePat, enIdx);
  if (eIdx === -1) return null;

  const eValStart = eIdx + ePat.length;
  const eValEnd = block.indexOf('"', eValStart);
  if (eValEnd === -1) return null;

  return block.slice(0, eValStart) + newEmoji + block.slice(eValEnd);
}

let errors = 0;
for (const [lessonIdStr, wordMap] of Object.entries(fixes)) {
  const id = parseInt(lessonIdStr);
  const { wsStart, wsEnd } = getLessonWordsRange(id);
  let block = html.slice(wsStart, wsEnd);

  for (const [wordEn, newEmoji] of Object.entries(wordMap)) {
    const updated = replaceEmoji(block, wordEn, newEmoji);
    if (updated === null) {
      console.error('L' + id + ': word not found: "' + wordEn + '"');
      errors++;
    } else {
      block = updated;
    }
  }

  html = html.slice(0, wsStart) + block + html.slice(wsEnd);
}

if (errors > 0) {
  console.error(errors + ' error(s). Aborting — file NOT written.');
  process.exit(1);
}

fs.writeFileSync(filePath, html, 'utf8');
console.log('Done. a2.html updated.');
