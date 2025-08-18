import re

# Вставляем полный текст из Canvas (усечённая часть, примерная)
text = """<ВСТАВИТЬ СЮДА ПОЛНЫЙ ТЕКСТ ИЗ Canvas>"""

# Анализ статистики
num_words = len(re.findall(r'\b\w+\b', text))
num_chars = len(text)
num_sections = len(re.findall(r'^###\s+\d+\.', text, re.MULTILINE))
num_quotes = len(re.findall(r'"[^"]+"', text)) + len(re.findall(r'“[^”]+”', text))
num_references = len(re.findall(r'- \*.+?\*', text))  # markdown references

{
    "Words": num_words,
    "Characters": num_chars,
    "Number of Sections": num_sections,
    "Quotes": num_quotes,
    "References (approx)": num_references
}
