# AIUZ_Compliance_Specification_FULL.ru.v1.1

## 🔐 Назначение
Этот документ устанавливает архитектурные, онтологические и операционные стандарты совместимости внутри экосистемы AIUZ / UBITIQUE. Он действует как универсальный фильтр валидации, semantic-bridge, и как ядро для любых международных грантовых, исследовательских и образовательных форматов.

---

## ⚙️ Структура слоёв (Layer Model)
| Уровень | Название     | Назначение                                      |
|---------|--------------|--------------------------------------------------|
| L0      | Manifesto    | Миссия, источник, философия                     |
| L1      | DAO Layer    | Governance, reputation, vote, civic contract    |
| L2      | Trace Σ      | Память, преемственность, session-linkage       |
| L3      | Codex Core   | Термины, идентичность, семантические узлы       |
| L4      | API Layer    | Semantic API, доступ к данным, модуль UI       |
| L5      | Civic UI     | Интерфейсы, визуализация, взаимодействие       |

---

## 🧠 Codex и онтология

### Стандарты:
- Все документы соответствуют `codex_terra_micro_core.json`
- Язык: `.md`, `.yaml`, `.txt`, `.json` — **только открытые форматы**
- Обязательный модуль: `creator_signature.yaml`
- Использование `autoinject_rule`, `semantic_quanta`, `inject_hash`

---

## 🛰️ Semantic API
| Endpoint              | Описание                                        |
|-----------------------|-------------------------------------------------|
| `/parse`              | Анализ запроса и лингвистическая декомпозиция  |
| `/glossary/query`     | Поиск термина в thesaurus                      |
| `/codex/contextualize`| Пояснение Codex-термина в контексте            |

---

## 🧾 Multilingual Packaging
AIUZ поддерживает семантическую совместимость между языками:
- `ru`, `uz-latin`, `en`, `de`
- Все ключевые документы доступны минимум на 2 из 4 языков

---

## 🧬 Базовое микроядро (из codex_terra_micro_core.json)
```yaml
core:
  identity:
    base_id: codex.seed.root
    license: OCL-0.2
  architecture:
    levels: [L0, L1, L2, L3, L4, L5]
    semantic_mode: injective
  autoinject_rule:
    mode: hash_link
    encoding: SHA-256
  semantic_quanta:
    base_unit: concept_pulse
```

AIUZ поддерживает семантическую совместимость между языками:
- `ru`, `uz-latin`, `en`, `de`
- Все ключевые документы доступны минимум на 2 из 4 языков

---

## 📂 Обязательные документы ядра v2:
- `file_index.md` — индекс и карта
- `creator_signature.yaml` — личный след
- `postlingua_trace.meta.yaml` — неязыковой слой смыслов
- `codex_terra_micro_core.json` — микроядро онтологии
- `validation_protocol.txt` — контрольный список
- `LiveClass_Core.md`, `Executive_Summary.md`, `Comparative_Review.md`

---

## 🔎 Проверка соответствия
Каждый документ AIUZ должен:
- Быть в открытом формате
- Иметь связку с `codex`, `trace`, `Σ-core`, `creator_signature`
- Иметь мета-блок (YAML или Markdown ID)
- Быть валиден семантически по `autoinject_rule`

---

## 🧭 Ревизия 2025-07-08
Добавлено:
- `/codex/postlingua/`
- `LiveClass_Core`, UX, TerraDevices
- PR/Grant материалы в единой структуре
- `compliance_spec_ru_v1.md` включён в `CleanCore v2`

---

## 📘 Лицензия
OCL-0.2 (Open Codex License)

