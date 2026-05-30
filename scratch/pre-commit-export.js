const fs = require('fs');
const path = require('path');

// Target file
const a1Path = path.join(__dirname, '..', 'a1.html');
const backupsDir = path.join(__dirname, 'backups');

if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
}

try {
    const html = fs.readFileSync(a1Path, 'utf8');
    const startStr = 'const LESSONS = [';
    const start = html.indexOf(startStr);
    
    if (start === -1) {
        console.error("Error: 'const LESSONS = [' not found in a1.html");
        process.exit(1);
    }
    
    let bracketCount = 0;
    let inString = false;
    let escape = false;
    let end = -1;
    
    for (let i = start + startStr.length - 1; i < html.length; i++) {
        const c = html[i];
        
        if (escape) {
            escape = false;
            continue;
        }
        if (c === '\\') {
            escape = true;
            continue;
        }
        
        if (c === "'" || c === '"' || c === '`') {
            let isEscaped = false;
            let j = i - 1;
            while (j >= 0 && html[j] === '\\') {
                isEscaped = !isEscaped;
                j--;
            }
            
            if (!isEscaped) {
                if (!inString) {
                    inString = c;
                } else if (inString === c) {
                    inString = false;
                }
            }
            continue;
        }
        
        if (!inString) {
            if (c === '[') bracketCount++;
            if (c === ']') {
                bracketCount--;
                if (bracketCount === 0) {
                    end = i + 1;
                    break;
                }
            }
        }
    }
    
    if (end === -1) {
        console.error("Error: End of LESSONS array bracket not found");
        process.exit(1);
    }
    
    const lessonsCode = html.substring(start, end);
    
    // Create timestamp
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    
    const backupFile = path.join(backupsDir, `lessons_backup_${timestamp}.js`);
    fs.writeFileSync(backupFile, `module.exports = ${lessonsCode.substring('const LESSONS = '.length)};`);
    console.log(`Backup successfully created: scratch/backups/lessons_backup_${timestamp}.js`);
    
} catch (err) {
    console.error("Backup failed:", err);
    process.exit(1);
}
