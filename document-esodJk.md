```python
"""
L2 Trace Σ Memory System v1.0
Система сохранения и восстановления сессий Terra Codex
Обеспечивает непрерывность памяти между сессиями с минимальными данными
"""

import json
import hashlib
import sqlite3
import pickle
import gzip
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, asdict
from pathlib import Path

# Интеграция с Terra Language Core
from terra_language_core import TerraQuark, TerraNanoCore, TerraMicroCore, TerraLanguageManager

@dataclass
class SessionMetadata:
    """Минимальные метаданные сессии"""
    session_id: str
    user_id: str
    timestamp: str
    terra_version: str
    ethical_level: float
    principles_snapshot: List[str]
    context_hash: str
    
class CompressedMemoryUnit:
    """Сжатая единица памяти для эффективного хранения"""
    
    def __init__(self, data: Any, compression_level: int = 6):
        self.original_size = len(str(data))
        self.compressed_data = gzip.compress(
            pickle.dumps(data), 
            compresslevel=compression_level
        )
        self.compressed_size = len(self.compressed_data)
        self.compression_ratio = self.original_size / self.compressed_size if self.compressed_size > 0 else 1.0
    
    def decompress(self) -> Any:
        """Восстановление данных"""
        return pickle.loads(gzip.decompress(self.compressed_data))
    
    def get_compression_stats(self) -> Dict[str, Any]:
        return {
            "original_size": self.original_size,
            "compressed_size": self.compressed_size,
            "compression_ratio": round(self.compression_ratio, 2),
            "space_saved_percent": round((1 - 1/self.compression_ratio) * 100, 1)
        }

class TerraMemoryDB:
    """База данных памяти Terra с оптимизацией для быстрого доступа"""
    
    def __init__(self, db_path: str = "terra_memory.db"):
        self.db = TerraMemoryDB(db_path)
        self.language_manager = TerraLanguageManager()
        self.active_session = None
        self.compression_threshold = 0.7  # Порог сжатия для больших объектов
    
    def create_session_context(self, user_id: str, terra_principles: List[str]) -> str:
        """Создание контекста новой сессии"""
        timestamp = datetime.now().isoformat()
        context_data = {
            "user_id": user_id,
            "timestamp": timestamp,
            "principles": terra_principles,
            "terra_version": "2.5",
            "session_type": "interactive_learning"
        }
        
        context_hash = hashlib.sha256(json.dumps(context_data, sort_keys=True).encode()).hexdigest()[:16]
        session_id = f"terra_{context_hash}_{timestamp.split('T')[0].replace('-', '')}"
        
        # Создание метаданных сессии
        metadata = SessionMetadata(
            session_id=session_id,
            user_id=user_id,
            timestamp=timestamp,
            terra_version="2.5",
            ethical_level=self._calculate_ethical_level(terra_principles),
            principles_snapshot=terra_principles,
            context_hash=context_hash
        )
        
        self.active_session = {
            "metadata": metadata,
            "microcores": [],
            "start_time": datetime.now(),
            "interaction_count": 0
        }
        
        return session_id
    
    def add_learning_interaction(self, interaction_data: Dict[str, Any]) -> bool:
        """Добавление обучающего взаимодействия в текущую сессию"""
        if not self.active_session:
            raise ValueError("Нет активной сессии. Создайте сессию через create_session_context()")
        
        # Создание кварков из взаимодействия
        quarks = self._extract_quarks_from_interaction(interaction_data)
        
        # Создание наноядра для контекста взаимодействия
        nanocore = self.language_manager.create_nanocore(
            context_type=interaction_data.get("type", "learning_interaction"),
            quarks=quarks,
            ethical_validation=True
        )
        
        # Поиск или создание микроядра для данного типа контекста
        microcore = self._find_or_create_microcore(nanocore.context_type)
        microcore.add_nanocore(nanocore)
        
        self.active_session["interaction_count"] += 1
        
        return True
    
    def save_current_session(self) -> bool:
        """Сохранение текущей активной сессии"""
        if not self.active_session:
            return False
        
        success = self.db.save_session(
            self.active_session["metadata"],
            self.active_session["microcores"]
        )
        
        if success:
            print(f"✅ Сессия {self.active_session['metadata'].session_id} сохранена")
            print(f"   📊 Взаимодействий: {self.active_session['interaction_count']}")
            print(f"   🧬 Микроядер: {len(self.active_session['microcores'])}")
            self.active_session = None
        
        return success
    
    def restore_session(self, session_id: str) -> bool:
        """Восстановление сессии по ID"""
        result = self.db.load_session(session_id)
        
        if result:
            metadata, microcores = result
            self.active_session = {
                "metadata": metadata,
                "microcores": microcores,
                "start_time": datetime.fromisoformat(metadata.timestamp),
                "interaction_count": sum(len(mc.nanocores) for mc in microcores)
            }
            
            print(f"🔄 Сессия {session_id} восстановлена")
            print(f"   📅 Создана: {metadata.timestamp}")
            print(f"   🎯 Этический уровень: {metadata.ethical_level}")
            return True
        
        return False
    
    def search_similar_sessions(self, current_principles: List[str], similarity_threshold: float = 0.6) -> List[Dict]:
        """Поиск похожих сессий по принципам Terra"""
        results = []
        
        for principle in current_principles:
            sessions = self.db.find_sessions_by_principle(principle)
            
            for session_info in sessions:
                similarity = self._calculate_principle_similarity(
                    current_principles, 
                    session_info.get("principles", [])
                )
                
                if similarity >= similarity_threshold:
                    results.append({
                        **session_info,
                        "similarity_score": similarity,
                        "matching_principle": principle
                    })
        
        # Сортировка по релевантности
        return sorted(results, key=lambda x: x["similarity_score"], reverse=True)
    
    def _calculate_ethical_level(self, principles: List[str]) -> float:
        """Расчёт этического уровня на основе принципов Terra"""
        ethical_weights = {
            "semantic_modularity": 0.8,
            "adaptive_os": 0.7,
            "child-centric_learning": 1.0,  # Максимальный вес
            "ethical_memory": 0.9,
            "knowledge_tokenization": 0.6,
            "decentralized_dao": 0.8,
            "human-nature-symbiosis": 1.0  # Максимальный вес
        }
        
        if not principles:
            return 0.5  # Базовый уровень
        
        total_weight = sum(ethical_weights.get(p, 0.5) for p in principles)
        return min(total_weight / len(principles), 1.0)
    
    def _extract_quarks_from_interaction(self, interaction_data: Dict[str, Any]) -> List[TerraQuark]:
        """Извлечение кварков из данных взаимодействия"""
        quarks = []
        
        # Основной кварк из контента
        if "content" in interaction_data:
            content_quark = TerraQuark(
                semantic_id=f"content_{hashlib.md5(str(interaction_data['content']).encode()).hexdigest()[:8]}",
                terra_principle=interaction_data.get("principle", "knowledge_acquisition"),
                ethical_weight=interaction_data.get("ethical_weight", 0.7),
                content_type="text",
                multilingual_data={
                    "ru": interaction_data["content"]
                },
                creation_timestamp=datetime.now().isoformat()
            )
            quarks.append(content_quark)
        
        # Кварки из действий пользователя
        if "user_actions" in interaction_data:
            for action in interaction_data["user_actions"]:
                action_quark = TerraQuark(
                    semantic_id=f"action_{hashlib.md5(str(action).encode()).hexdigest()[:8]}",
                    terra_principle="adaptive_learning",
                    ethical_weight=0.6,
                    content_type="user_action",
                    multilingual_data={"en": str(action)},
                    creation_timestamp=datetime.now().isoformat()
                )
                quarks.append(action_quark)
        
        return quarks
    
    def _find_or_create_microcore(self, context_type: str) -> TerraMicroCore:
        """Поиск или создание микроядра для контекста"""
        if not self.active_session:
            raise ValueError("Нет активной сессии")
        
        # Поиск существующего микроядра
        for microcore in self.active_session["microcores"]:
            if context_type in microcore.supported_contexts:
                return microcore
        
        # Создание нового микроядра
        new_microcore = self.language_manager.create_microcore(
            name=f"microcore_{context_type}",
            version="2.5",
            supported_contexts=[context_type]
        )
        
        self.active_session["microcores"].append(new_microcore)
        return new_microcore
    
    def _calculate_principle_similarity(self, principles1: List[str], principles2: List[str]) -> float:
        """Расчёт схожести между наборами принципов"""
        if not principles1 or not principles2:
            return 0.0
        
        set1, set2 = set(principles1), set(principles2)
        intersection = len(set1 & set2)
        union = len(set1 | set2)
        
        return intersection / union if union > 0 else 0.0
    
    def get_session_analytics(self) -> Dict[str, Any]:
        """Аналитика текущей сессии"""
        if not self.active_session:
            return {"error": "Нет активной сессии"}
        
        duration = datetime.now() - self.active_session["start_time"]
        
        return {
            "session_id": self.active_session["metadata"].session_id,
            "duration_minutes": duration.total_seconds() / 60,
            "interactions_count": self.active_session["interaction_count"],
            "microcores_count": len(self.active_session["microcores"]),
            "ethical_level": self.active_session["metadata"].ethical_level,
            "principles": self.active_session["metadata"].principles_snapshot,
            "estimated_memory_size": self._estimate_session_size()
        }
    
    def _estimate_session_size(self) -> Dict[str, int]:
        """Оценка размера текущей сессии в памяти"""
        if not self.active_session:
            return {"total_bytes": 0}
        
        # Приблизительная оценка размера
        metadata_size = len(json.dumps(asdict(self.active_session["metadata"])))
        microcores_size = sum(
            len(str(mc.export_to_dict())) for mc in self.active_session["microcores"]
        )
        
        return {
            "metadata_bytes": metadata_size,
            "microcores_bytes": microcores_size,
            "total_bytes": metadata_size + microcores_size,
            "compression_potential": self._estimate_compression_potential()
        }
    
    def _estimate_compression_potential(self) -> float:
        """Оценка потенциала сжатия для текущей сессии"""
        # Эмпирическая оценка на основе типичных данных Terra
        return self.compression_threshold


# Пример использования системы памяти
if __name__ == "__main__":
    # Инициализация менеджера памяти
    memory_manager = TraceMemoryManager()
    
    # Создание сессии для пользователя
    session_id = memory_manager.create_session_context(
        user_id="terra_user_001",
        terra_principles=[
            "child-centric_learning",
            "ethical_memory", 
            "human-nature-symbiosis"
        ]
    )
    
    print(f"🚀 Создана сессия: {session_id}")
    
    # Добавление обучающих взаимодействий
    interactions = [
        {
            "type": "educational_content",
            "content": "Изучение экосистемы леса через виртуальную реальность",
            "principle": "human-nature-symbiosis",
            "ethical_weight": 0.9,
            "user_actions": ["vr_exploration", "tree_identification", "ecosystem_mapping"]
        },
        {
            "type": "collaborative_learning",
            "content": "Совместный проект с детьми из разных стран",
            "principle": "child-centric_learning",
            "ethical_weight": 1.0,
            "user_actions": ["cross_cultural_communication", "project_collaboration"]
        }
    ]
    
    for interaction in interactions:
        memory_manager.add_learning_interaction(interaction)
    
    # Аналитика сессии
    analytics = memory_manager.get_session_analytics()
    print(f"📊 Аналитика сессии: {analytics}")
    
    # Сохранение сессии
    memory_manager.save_current_session()
    
    # Демонстрация поиска похожих сессий
    similar_sessions = memory_manager.search_similar_sessions([
        "child-centric_learning",
        "human-nature-symbiosis"
    ])
    
    print(f"🔍 Найдено похожих сессий: {len(similar_sessions)}")
    
    print("\n🧬 L2 Trace Σ Memory System v1.0 инициализирована успешно!")
    print("✅ Готова к интеграции с полной экосистемой Terra Codex v2.5")_path = db_path
        self.init_database()
    
    def init_database(self):
        """Инициализация структуры БД"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Таблица сессий
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS sessions (
                session_id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                terra_version TEXT NOT NULL,
                ethical_level REAL NOT NULL,
                principles_snapshot TEXT NOT NULL,
                context_hash TEXT NOT NULL,
                metadata_json TEXT NOT NULL
            )
        ''')
        
        # Таблица микроядер (сжатых)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS microcores (
                microcore_id TEXT PRIMARY KEY,
                session_id TEXT NOT NULL,
                name TEXT NOT NULL,
                version TEXT NOT NULL,
                compressed_data BLOB NOT NULL,
                compression_stats TEXT NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY (session_id) REFERENCES sessions (session_id)
            )
        ''')
        
        # Таблица быстрого поиска по принципам
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS principle_index (
                principle_name TEXT NOT NULL,
                session_id TEXT NOT NULL,
                microcore_id TEXT NOT NULL,
                ethical_weight REAL NOT NULL,
                context_type TEXT NOT NULL,
                PRIMARY KEY (principle_name, session_id, microcore_id)
            )
        ''')
        
        # Индексы для быстрого поиска
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_sessions_user_time ON sessions (user_id, timestamp)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_microcores_session ON microcores (session_id)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_principle_name ON principle_index (principle_name)')
        
        conn.commit()
        conn.close()
    
    def save_session(self, session_metadata: SessionMetadata, microcores: List[TerraMicroCore]) -> bool:
        """Сохранение сессии с компрессией"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Сохранение метаданных сессии
            cursor.execute('''
                INSERT OR REPLACE INTO sessions 
                (session_id, user_id, timestamp, terra_version, ethical_level, 
                 principles_snapshot, context_hash, metadata_json)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                session_metadata.session_id,
                session_metadata.user_id,
                session_metadata.timestamp,
                session_metadata.terra_version,
                session_metadata.ethical_level,
                json.dumps(session_metadata.principles_snapshot),
                session_metadata.context_hash,
                json.dumps(asdict(session_metadata))
            ))
            
            # Сохранение микроядер
            for microcore in microcores:
                # Компрессия микроядра
                compressed_unit = CompressedMemoryUnit(microcore.export_to_dict())
                
                cursor.execute('''
                    INSERT OR REPLACE INTO microcores
                    (microcore_id, session_id, name, version, compressed_data, 
                     compression_stats, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (
                    microcore.id,
                    session_metadata.session_id,
                    microcore.name,
                    microcore.version,
                    compressed_unit.compressed_data,
                    json.dumps(compressed_unit.get_compression_stats()),
                    microcore.created_at
                ))
                
                # Индексация принципов для быстрого поиска
                for nanocore in microcore.nanocores:
                    for quark in nanocore.quarks:
                        cursor.execute('''
                            INSERT OR REPLACE INTO principle_index
                            (principle_name, session_id, microcore_id, ethical_weight, context_type)
                            VALUES (?, ?, ?, ?, ?)
                        ''', (
                            quark.terra_principle,
                            session_metadata.session_id,
                            microcore.id,
                            quark.ethical_weight,
                            nanocore.context_type
                        ))
            
            conn.commit()
            conn.close()
            return True
            
        except Exception as e:
            print(f"Ошибка сохранения сессии: {e}")
            return False
    
    def load_session(self, session_id: str) -> Optional[Tuple[SessionMetadata, List[TerraMicroCore]]]:
        """Загрузка сессии с декомпрессией"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Загрузка метаданных
            cursor.execute('SELECT * FROM sessions WHERE session_id = ?', (session_id,))
            session_row = cursor.fetchone()
            
            if not session_row:
                return None
            
            # Восстановление метаданных
            metadata = SessionMetadata(
                session_id=session_row[0],
                user_id=session_row[1],
                timestamp=session_row[2],
                terra_version=session_row[3],
                ethical_level=session_row[4],
                principles_snapshot=json.loads(session_row[5]),
                context_hash=session_row[6]
            )
            
            # Загрузка микроядер
            cursor.execute('SELECT * FROM microcores WHERE session_id = ?', (session_id,))
            microcore_rows = cursor.fetchall()
            
            microcores = []
            for row in microcore_rows:
                # Декомпрессия данных
                compressed_data = row[4]
                decompressed_data = pickle.loads(gzip.decompress(compressed_data))
                
                # Восстановление микроядра (упрощённое)
                # В реальной реализации нужно полное восстановление объекта
                microcore_dict = decompressed_data
                # TODO: Реализовать полное восстановление TerraMicroCore из dict
                
            conn.close()
            return metadata, microcores
            
        except Exception as e:
            print(f"Ошибка загрузки сессии: {e}")
            return None
    
    def find_sessions_by_principle(self, principle_name: str, days_back: int = 30) -> List[str]:
        """Поиск сессий по принципу Terra"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cutoff_date = (datetime.now() - timedelta(days=days_back)).isoformat()
            
            cursor.execute('''
                SELECT DISTINCT pi.session_id, s.timestamp, s.ethical_level
                FROM principle_index pi
                JOIN sessions s ON pi.session_id = s.session_id
                WHERE pi.principle_name = ? AND s.timestamp >= ?
                ORDER BY s.timestamp DESC
            ''', (principle_name, cutoff_date))
            
            results = cursor.fetchall()
            conn.close()
            
            return [{"session_id": r[0], "timestamp": r[1], "ethical_level": r[2]} for r in results]
            
        except Exception as e:
            print(f"Ошибка поиска по принципу: {e}")
            return []

class TraceMemoryManager:
    """Основной менеджер системы памяти Trace Σ"""
    
    def __init__(self, db_path: str = "terra_memory.db"):
        self.db
```
