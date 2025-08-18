
import yaml
import json
import re
from difflib import SequenceMatcher

def load_yaml(path):
    with open(path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def get_synonym_map(nlp_config):
    synonyms = {}
    for canonical, alts in nlp_config.get("synonym_mapping", {}).items():
        for alt in alts:
            synonyms[alt.lower()] = canonical
    return synonyms

def normalize_term(term, synonym_map, threshold=0.85):
    term_lower = term.lower()
    if term_lower in synonym_map:
        return synonym_map[term_lower]
    # fuzzy match
    for alt, canonical in synonym_map.items():
        if SequenceMatcher(None, term_lower, alt).ratio() >= threshold:
            return canonical
    return term  # return as-is if no match

def validate_entry(entry, thesaurus, rules, synonym_map, threshold=0.85):
    errors = []
    for rule in rules:
        field = rule.get("field")
        if not field:
            continue
        keys = field.split(".")
        value = entry
        for key in keys:
            value = value.get(key, {})
        if isinstance(value, dict): continue
        norm_value = normalize_term(str(value), synonym_map, threshold)
        th_path = rule["must_be_in_thesaurus"].split(".")
        valid_values = thesaurus
        for p in th_path:
            valid_values = valid_values.get(p, [])
        valid_set = [v["value"] if isinstance(v, dict) else v for v in valid_values]
        if norm_value not in valid_set:
            errors.append(f"Invalid value '{value}' for field '{field}' → normalized: '{norm_value}'")
    return errors

# Load validation protocol and thesaurus
protocol = load_yaml("validation_protocol_final.yaml")["validation_protocol"]
thesaurus = load_yaml(protocol["thesaurus_path"])["thesaurus"]
synonym_map = get_synonym_map(protocol.get("nlp_annotation", {}))
threshold = protocol["nlp_annotation"].get("match_threshold", 0.85)

# Example entry for testing
example = {
    "inventory": {
        "status": "в наличии"
    },
    "facility": {
        "type": "центр распределения"
    }
}

# Run validation
errors = validate_entry(example, thesaurus, protocol["rules"], synonym_map, threshold)
if errors:
    print("❌ Validation Errors:")
    for err in errors:
        print("-", err)
else:
    print("✅ Entry is valid!")
