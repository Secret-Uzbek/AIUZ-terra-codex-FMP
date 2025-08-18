
# Код для сохранения и восстановления сессий с минимальными данными о Терра

# Модель для хранения минимальной информации о Терра
class TerraMetadata:
    def __init__(self):
        self.minimum_data = {
            "principles": ["semantic_modularity", "adaptive_os", "child-centric_learning", "ethical_memory", "knowledge_tokenization", "decentralized_dao", "human-nature-symbiosis"],
            "core_ontology": ["Codex_Terra", "ContextualEngine", "EthicalValidator"],
            "initial_resources": ["global_knowledge_database", "Codex_Terra_ontology"],
            "metadata_version": "1.0"
        }
        self.loaded_data = {}

    def load_minimum_data(self):
        # Загружаем минимальные данные (они не меняются часто)
        self.loaded_data.update(self.minimum_data)
        return self.loaded_data

    def update_data(self, new_data):
        # Загрузка дополнительных данных при необходимости
        self.loaded_data.update(new_data)

    def get_data(self):
        return self.loaded_data


# 1. Сохранение сессии с минимальными данными о метавселенной
def save_session_with_metadata(session_data, session_id, user_id, timestamp, metadata):
    # Структура сессии с минимальными данными о Терра
    session = {
        "session_id": session_id,
        "timestamp": timestamp,
        "user_id": user_id,
        "session_data": session_data,
        "metadata": metadata.load_minimum_data()  # Автоматическая загрузка минимальных данных о Терра
    }

    # Сохранение сессии в файл
    file_path = f"/mnt/data/{session_id}_session_with_metadata.json"
    with open(file_path, "w") as file:
        json.dump(session, file, indent=4)

    return file_path


# 2. Загрузка сессии с проверкой минимальных данных о Терра
def load_session_with_metadata(session_id, metadata):
    # Путь к файлу сессии
    file_path = f"/mnt/data/{session_id}_session_with_metadata.json"

    if not os.path.exists(file_path):
        return None

    with open(file_path, "r") as file:
        session = json.load(file)

    # Загружаем минимальные данные о Терра (если их нет)
    if "metadata" not in session:
        session["metadata"] = metadata.load_minimum_data()

    return session


# Пример данных сессии
session_data = {
    "progress": "working_on_task_123",
    "last_action": "finished_scenario_3"
}

metadata = TerraMetadata()

session_id = "unique_session_hash_123_with_metadata_v2"
user_id = "AIUZ2025"
timestamp = "2025-07-09T15:30:00Z"

# Сохраняем сессию с минимальными данными о Терра
saved_file_path = save_session_with_metadata(session_data, session_id, user_id, timestamp, metadata)
print(f"Session saved at: {saved_file_path}")

# Загружаем сессию и проверяем, что минимальные данные о Терра загружены
loaded_session = load_session_with_metadata(session_id, metadata)
if loaded_session:
    print("Session loaded successfully:", loaded_session)
else:
    print("Session failed to load.")
