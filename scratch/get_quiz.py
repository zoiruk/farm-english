with open("a1.html", "rb") as f:
    lines = f.readlines()

in_render_quiz = False
braces = 0

for i, l in enumerate(lines):
    try:
        text = l.decode('utf-8')
        if 'function renderQuiz' in text:
            in_render_quiz = True
            
        if in_render_quiz:
            print(f"{i+1:04}: {text.strip('\r\n')}")
            braces += text.count('{') - text.count('}')
            if braces == 0 and '}' in text:
                break
    except Exception as e:
        pass
