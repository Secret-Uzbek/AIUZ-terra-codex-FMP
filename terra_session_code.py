
import json
import hashlib
import os

class TerraMetadata:
    def __init__(self):
        self.minimum_data = {
            "principles": ["semantic_modularity", "adaptive_os", "child-centric_learning", "ethical_memory", 
                           "knowledge_tokenization", "decentralized_dao", "human-nature-symbiosis"],
            "core_ontology": ["Codex_Terra", "ContextualEngine", "EthicalValidator"],
            "initial_resources": ["global_knowledge_database", "Codex_Terra_ontology"],
            "metadata_version": "1.0"
        }
        self.loaded_data = {}

    def load_minimum_data(self):
        self.loaded_data.update(self.minimum_data)
        return self.loaded_data

    def update_data(self, new_data):
        self.loaded_data.update(new_data)

    def get_data(self):
        return self.loaded_data

def save_session_with_metadata_v2(session_data, session_id, user_id, timestamp, metadata):
    session = {
        "session_id": session_id,
        "timestamp": timestamp,
        "user_id": user_id,
        "session_data": session_data,
        "metadata": metadata.load_minimum_data(),
        "hash_signature": hashlib.sha256(f"{session_id}{timestamp}{user_id}".encode()).hexdigest()
    }
    file_path = f"/mnt/data/{session_id}_session_with_metadata.json"
    with open(file_path, "w") as file:
        json.dump(session, file, indent=4)
    return file_path

def load_session_with_metadata_v2(session_id, metadata):
    file_path = f"/mnt/data/{session_id}_session_with_metadata.json"
    if not os.path.exists(file_path):
        return None
    with open(file_path, "r") as file:
        session = json.load(file)

    if "metadata" not in session:
        session["metadata"] = metadata.load_minimum_data()

    expected_hash = hashlib.sha256(f"{session_id}{session['timestamp']}{session['user_id']}".encode()).hexdigest()
    if session['hash_signature'] != expected_hash:
        return None

    return session
