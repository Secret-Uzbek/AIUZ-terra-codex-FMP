```python
"""
🌍 AIUZ LiveClass v2.5 
Глобальная иммерсивная образовательная платформа
Связывает учащихся по всему миру через Terra Codex принципы
"""

import asyncio
import json
from typing import Dict, List, Any, Optional, Set
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
from enum import Enum
import uuid
from collections import defaultdict

# Интеграция с Terra экосистемой
from ai_education_module import StudentProfile, LearningScenario, InteractiveLearningEnvironment
from l2_trace_memory import TraceMemoryManager

class RegionType(Enum):
    RUSSIAN_HUB = "ru_hub"
    GLOBAL_ENGLISH = "en_global" 
    EUROPEAN_MULTILANG = "eu_multi"
    CENTRAL_ASIA = "central_asia"
    UNIVERSAL_ACCESS = "universal"

class ClassroomType(Enum):
    VIRTUAL_REALITY = "vr_immersive"
    AUGMENTED_REALITY = "ar_enhanced"
    TRADITIONAL_ONLINE = "online_traditional"
    HYBRID_PHYSICAL = "hybrid_space"
    OUTDOOR_NATURE = "nature_based"
    SPACE_STATION = "space_iss"
    UNDERWATER = "ocean_exploration"
    FOREST_LABORATORY = "forest_lab"

class LiveClassStatus(Enum):
    SCHEDULED = "scheduled"
    LIVE = "live"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    ARCHIVED = "archived"

@dataclass
class GlobalClassroom:
    """Глобальная аудитория для совместного обучения"""
    classroom_id: str
    title: Dict[str, str]
    description: Dict[str, str]
    classroom_type: ClassroomType
    region: RegionType
    max_participants: int
    current_participants: int
    age_range: tuple
    supported_languages: List[str]
    instructor_profile: Dict[str, Any]
    location_metadata: Dict[str, Any]  # Координаты, часовой пояс, и т.д.
    terra_principles: List[str]
    ethical_guidelines: List[str]
    accessibility_features: List[str]
    created_at: str
    
    def validate_terra_compliance(self) -> bool:
        """Проверка соответствия Terra принципам"""
        required_principles = {"child-centric_learning", "human-nature-symbiosis"}
        return len(set(self.terra_principles) & required_principles) >= 1

@dataclass
class LiveSession:
    """Живая образовательная сессия"""
    session_id: str
    classroom_id: str
    title: Dict[str, str]
    description: Dict[str, str]
    instructor_id: str
    co_instructors: List[str]
    scheduled_start: str
    scheduled_end: str
    actual_start: Optional[str]
    actual_end: Optional[str]
    status: LiveClassStatus
    participants: List[str]  # student_ids
    waiting_list: List[str]
    learning_scenario: LearningScenario
    real_time_data: Dict[str, Any]
    interaction_log: List[Dict[str, Any]]
    collaboration_groups: List[List[str]]
    assessment_data: Dict[str, Any]
    
    def get_duration_minutes(self) -> Optional[int]:
        """Получение продолжительности сессии"""
        if self.actual_start and self.actual_end:
            start = datetime.fromisoformat(self.actual_start)
            end = datetime.fromisoformat(self.actual_end)
            return int((end - start).total_seconds() / 60)
        return None

class GlobalInstructorNetwork:
    """Сеть глобальных инструкторов"""
    
    def __init__(self):
        self.instructors = {}
        self.specializations = defaultdict(list)
        self.availability_calendar = defaultdict(list)
        self.rating_system = {}
        
    def register_instructor(self, instructor_data: Dict[str, Any]) -> str:
        """Регистрация нового инструктора"""
        instructor_id = f"instructor_{uuid.uuid4().hex[:8]}"
        
        # Валидация Terra принципов у инструктора
        terra_alignment = self._validate_instructor_terra_alignment(instructor_data)
        
        instructor_profile = {
            "instructor_id": instructor_id,
            "name": instructor_data["name"],
            "languages": instructor_data["languages"],
            "specializations": instructor_data["specializations"],
            "regions": instructor_data.get("regions", [RegionType.UNIVERSAL_ACCESS]),
            "certifications": instructor_data.get("certifications", []),
            "terra_alignment_score": terra_alignment,
            "experience_years": instructor_data.get("experience_years", 0),
            "preferred_age_groups": instructor_data.get("age_groups", []),
            "location": instructor_data.get("location", {}),
            "time_zone": instructor_data.get("time_zone", "UTC"),
            "bio": instructor_data.get("bio", {}),
            "teaching_philosophy": instructor_data.get("philosophy", {}),
            "availability": instructor_data.get("availability", {}),
            "rating": 0.0,
            "total_sessions": 0,
            "created_at": datetime.now().isoformat()
        }
        
        self.instructors[instructor_id] = instructor_profile
        
        # Индексация по специализациям
        for spec in instructor_data["specializations"]:
            self.specializations[spec].append(instructor_id)
            
        return instructor_id
    
    def _validate_instructor_terra_alignment(self, instructor_data: Dict) -> float:
        """Валидация соответствия инструктора Terra принципам"""
        alignment_score = 0.0
        
        # Проверка философии обучения
        philosophy = instructor_data.get("philosophy", {})
        terra_keywords = {
            "nature", "ethical", "collaborative", "child-centric", 
            "sustainable", "global", "empathy", "creativity"
        }
        
        philosophy_text = " ".join(philosophy.values()).lower()
        keyword_matches = sum(1 for keyword in terra_keywords if keyword in philosophy_text)
        alignment_score += (keyword_matches / len(terra_keywords)) * 0.4
        
        # Проверка сертификаций
        certifications = instructor_data.get("certifications", [])
        terra_relevant_certs = ["environmental_education", "ethics_teaching", "global_education", "nature_pedagogy"]
        cert_score = len(set(certifications) & set(terra_relevant_certs)) / len(terra_relevant_certs)
        alignment_score += cert_score * 0.3
        
        # Проверка опыта с детьми
        age_groups = instructor_data.get("age_groups", [])
        child_focus = len([ag for ag in age_groups if ag[1] <= 16]) / max(len(age_groups), 1)
        alignment_score += child_focus * 0.3
        
        return min(alignment_score, 1.0)
    
    def find_optimal_instructor(self, session_requirements: Dict[str, Any]) -> Optional[str]:
        """Поиск оптимального инструктора для сессии"""
        candidates = []
        
        required_specialization = session_requirements.get("specialization")
        required_languages = session_requirements.get("languages", [])
        required_region = session_requirements.get("region")
        target_age_range = session_requirements.get("age_range", (0, 100))
        
        # Фильтрация кандидатов
        for instructor_id, profile in self.instructors.items():
            if required_specialization and required_specialization not in profile["specializations"]:
                continue
                
            if required_languages and not any(lang in profile["languages"] for lang in required_languages):
                continue
                
            if required_region and required_region not in profile["regions"]:
                continue
            
            # Проверка возрастного диапазона
            age_compatibility = any(
                age_range[0] <= target_age_range[1] and age_range[1] >= target_age_range[0]
                for age_range in profile["preferred_age_groups"]
            )
            
            if profile["preferred_age_groups"] and not age_compatibility:
                continue
            
            # Расчёт score кандидата
            score = self._calculate_instructor_score(profile, session_requirements)
            candidates.append((instructor_id, score))
        
        # Сортировка по релевантности
        candidates.sort(key=lambda x: x[1], reverse=True)
        
        return candidates[0][0] if candidates else None
    
    def _calculate_instructor_score(self, instructor_profile: Dict, requirements: Dict) -> float:
        """Расчёт релевантности инструктора для сессии"""
        score = 0.0
        
        # Terra alignment (40%)
        score += instructor_profile["terra_alignment_score"] * 0.4
        
        # Рейтинг и опыт (30%)
        experience_score = min(instructor_profile["experience_years"] / 10, 1.0)
        rating_score = instructor_profile["rating"] / 5.0
        score += (experience_score + rating_score) / 2 * 0.3
        
        # Языковое соответствие (20%)
        required_languages = requirements.get("languages", [])
        if required_languages:
            lang_match = len(set(instructor_profile["languages"]) & set(required_languages)) / len(required_languages)
            score += lang_match * 0.2
        else:
            score += 0.2
        
        # Доступность (10%)
        # Упрощённая проверка доступности
        score += 0.1  # Предполагаем, что инструктор доступен
        
        return score

class LiveClassManager:
    """Менеджер живых классов и сессий"""
    
    def __init__(self, memory_manager: TraceMemoryManager):
        self.memory_manager = memory_manager
        self.classrooms = {}
        self.sessions = {}
        self.instructor_network = GlobalInstructorNetwork()
        self.active_connections = {}  # Веб-сокет подключения
        self.collaboration_engine = CollaborationEngine()
        self.translation_service = RealTimeTranslationService()
        
    def create_global_classroom(self, classroom_data: Dict[str, Any]) -> str:
        """Создание глобальной аудитории"""
        classroom_id = f"classroom_{uuid.uuid4().hex[:8]}"
        
        classroom = GlobalClassroom(
            classroom_id=classroom_id,
            title=classroom_data["title"],
            description=classroom_data["description"],
            classroom_type=ClassroomType(classroom_data["type"]),
            region=RegionType(classroom_data["region"]),
            max_participants=classroom_data.get("max_participants", 30),
            current_participants=0,
            age_range=tuple(classroom_data["age_range"]),
            supported_languages=classroom_data["languages"],
            instructor_profile=classroom_data.get("instructor", {}),
            location_metadata=classroom_data.get("location", {}),
            terra_principles=classroom_data.get("terra_principles", []),
            ethical_guidelines=classroom_data.get("ethical_guidelines", []),
            accessibility_features=classroom_data.get("accessibility", []),
            created_at=datetime.now().isoformat()
        )
        
        # Валидация Terra соответствия
        if not classroom.validate_terra_compliance():
            raise ValueError("Аудитория не соответствует Terra принципам")
        
        self.classrooms[classroom_id] = classroom
        return classroom_id
    
    def schedule_live_session(self, session_data: Dict[str, Any]) -> str:
        """Планирование живой образовательной сессии"""
        session_id = f"session_{uuid.uuid4().hex[:8]}"
        
        # Поиск оптимального инструктора
        instructor_requirements = {
            "specialization": session_data.get("subject"),
            "languages": session_data.get("languages", []),
            "region": session_data.get("region"),
            "age_range": session_data.get("age_range", (6, 18))
        }
        
        instructor_id = self.instructor_network.find_optimal_instructor(instructor_requirements)
        if not instructor_id:
            raise ValueError("Не найден подходящий инструктор")
        
        session = LiveSession(
            session_id=session_id,
            classroom_id=session_data["classroom_id"],
            title=session_data["title"],
            description=session_data["description"],
            instructor_id=instructor_id,
            co_instructors=session_data.get("co_instructors", []),
            scheduled_start=session_data["scheduled_start"],
            scheduled_end=session_data["scheduled_end"],
            actual_start=None,
            actual_end=None,
            status=LiveClassStatus.SCHEDULED,
            participants=[],
            waiting_list=[],
            learning_scenario=session_data["learning_scenario"],
            real_time_data={},
            interaction_log=[],
            collaboration_groups=[],
            assessment_data={}
        )
        
        self.sessions[session_id] = session
        
        # Логирование в Terra память
        self.memory_manager.add_learning_interaction({
            "type": "session_scheduled",
            "content": f"Запланирована сессия: {session.title.get('ru', session.title.get('en'))}",
            "principle": "child-centric_learning",
            "ethical_weight": 0.8,
            "user_actions": ["session_scheduling"],
            "session_metadata": {
                "classroom_type": session_data.get("classroom_type"),
                "expected_participants": session_data.get("max_participants", 0)
            }
        })
        
        return session_id
    
    async def start_live_session(self, session_id: str) -> bool:
        """Запуск живой сессии"""
        if session_id not in self.sessions:
            return False
        
        session = self.sessions[session_id]
        session.status = LiveClassStatus.LIVE
        session.actual_start = datetime.now().isoformat()
        
        # Инициализация real-time систем
        await self._initialize_collaboration_systems(session)
        await self._setup_translation_services(session)
        await self._create_collaboration_groups(session)
        
        # Уведомление участников
        await self._notify_session_start(session)
        
        # Логирование старта
        self.memory_manager.add_learning_interaction({
            "type": "session_started",
            "content": f"Началась живая сессия: {session.title.get('ru', 'Unknown')}",
            "principle": "collaborative_learning",
            "ethical_weight": 0.9,
            "user_actions": ["session_start"],
            "participant_count": len(session.participants)
        })
        
        return True
    
    async def _initialize_collaboration_systems(self, session: LiveSession):
        """Инициализация систем коллаборации"""
        collaboration_config = {
            "session_id": session.session_id,
            "max_group_size": 4,
            "cross_cultural_mixing": True,
            "language_diversity": True,
            "age_balanced_groups": True
        }
        
        await self.collaboration_engine.initialize_session(collaboration_config)
    
    async def _setup_translation_services(self, session: LiveSession):
        """Настройка сервисов перевода"""
        classroom = self.classrooms[session.classroom_id]
        languages = classroom.supported_languages
        
        await self.translation_service.initialize_for_session(
            session.session_id, 
            source_languages=languages,
            target_languages=languages
        )
    
    async def _create_collaboration_groups(self, session: LiveSession):
        """Создание групп для коллаборации"""
        participants = session.participants
        
        if len(participants) < 2:
            return
        
        # Алгоритм создания сбалансированных групп
        groups = await self.collaboration_engine.create_balanced_groups(
            participants,
            target_group_size=4,
            diversity_criteria=["language", "age", "region"]
        )
        
        session.collaboration_groups = groups
    
    async def _notify_session_start(self, session: LiveSession):
        """Уведомление участников о начале сессии"""
        notification_data = {
            "type": "session_started",
            "session_id": session.session_id,
            "title": session.title,
            "instructor": session.instructor_id,
            "classroom_type": self.classrooms[session.classroom_id].classroom_type.value
        }
        
        for participant_id in session.participants:
            await self._send_notification(participant_id, notification_data)
    
    async def _send_notification(self, user_id: str, notification: Dict):
        """Отправка уведомления пользователю"""
        # Имитация отправки уведомления
        print(f"📱 Уведомление для {user_id}: {notification['type']}")
    
    def register_participant(self, session_id: str, student_profile: StudentProfile) -> bool:
        """Регистрация участника на сессию"""
        if session_id not in self.sessions:
            return False
        
        session = self.sessions[session_id]
        classroom = self.classrooms[session.classroom_id]
        
        # Проверка возрастных ограничений
        if not (classroom.age_range[0] <= student_profile.age <= classroom.age_range[1]):
            return False
        
        # Проверка наличия мест
        if len(session.participants) >= classroom.max_participants:
            session.waiting_list.append(student_profile.student_id)
            return False
        
        # Регистрация участника
        session.participants.append(student_profile.student_id)
        classroom.current_participants += 1
        
        # Логирование регистрации
        self.memory_manager.add_learning_interaction({
            "type": "participant_registered",
            "content": f"Участник {student_profile.name} зарегистрирован на сессию",
            "principle": "inclusive_education",
            "ethical_weight": 0.8,
            "user_actions": ["registration"],
            "participant_data": {
                "age": student_profile.age,
                "languages": student_profile.preferred_languages,
                "interests": student_profile.interests
            }
        })
        
        return True
    
    def get_global_statistics(self) -> Dict[str, Any]:
        """Получение глобальной статистики платформы"""
        stats = {
            "total_classrooms": len(self.classrooms),
            "active_sessions": len([s for s in self.sessions.values() if s.status == LiveClassStatus.LIVE]),
            "total_instructors": len(self.instructor_network.instructors),
            "regions_active": len(set(c.region for c in self.classrooms.values())),
            "classroom_types": {
                ct.value: len([c for c in self.classrooms.values() if c.classroom_type == ct])
                for ct in ClassroomType
            },
            "language_coverage": list(set().union(*[c.supported_languages for c in self.classrooms.values()])),
            "total_participants": sum(c.current_participants for c in self.classrooms.values()),
            "ethical_compliance_rate": self._calculate_ethical_compliance_rate()
        }
        
        return stats
    
    def _calculate_ethical_compliance_rate(self) -> float:
        """Расчёт процента соответствия этическим принципам"""
        if not self.classrooms:
            return 0.0
        
        compliant_classrooms = sum(1 for c in self.classrooms.values() if c.validate_terra_compliance())
        return compliant_classrooms / len(self.classrooms)

class CollaborationEngine:
    """Движок коллаборативного обучения"""
    
    def __init__(self):
        self.active_sessions = {}
        self.group_dynamics = {}
        
    async def initialize_session(self, config: Dict[str, Any]):
        """Инициализация сессии коллаборации"""
        session_id = config["session_id"]
        self.active_sessions[session_id] = {
            "config": config,
            "groups": [],
            "interaction_matrix": {},
            "engagement_metrics": {}
        }
    
    async def create_balanced_groups(self, participants: List[str], 
                                   target_group_size: int = 4,
                                   diversity_criteria: List[str] = None) -> List[List[str]]:
        """Создание сбалансированных групп участников"""
        if len(participants) < 2:
            return [participants] if participants else []
        
        # Упрощённый алгоритм группировки
        groups = []
        shuffled_participants = participants.copy()
        
        # Перемешивание для разнообразия
        import random
        random.shuffle(shuffled_participants)
        
        for i in range(0, len(shuffled_participants), target_group_size):
            group = shuffled_participants[i:i + target_group_size]
            groups.append(group)
        
        # Балансировка последней группы если она слишком маленькая
        if len(groups) > 1 and len(groups[-1]) < 2:
            last_group = groups.pop()
            groups[-1].extend(last_group)
        
        return groups

class RealTimeTranslationService:
    """Сервис перевода в реальном времени"""
    
    def __init__(self):
        self.active_sessions = {}
        self.supported_languages = ["ru", "en", "uz", "de", "fr", "es", "zh", "ar"]
        
    async def initialize_for_session(self, session_id: str, 
                                   source_languages: List[str],
                                   target_languages: List[str]):
        """Инициализация перевода для сессии"""
        self.active_sessions[session_id] = {
            "source_languages": source_languages,
            "target_languages": target_languages,
            "translation_cache": {},
            "real_time_streams": {}
        }
    
    async def translate_message(self, session_id: str, message: str, 
                              source_lang: str, target_lang: str) -> str:
        """Перевод сообщения"""
        # Упрощённая имитация перевода
        cache_key = f"{source_lang}_{target_lang}_{hash(message)}"
        
        if session_id in self.active_sessions:
            cache = self.active_sessions[session_id]["translation_cache"]
            if cache_key in cache:
                return cache[cache_key]
        
        # Имитация перевода (в реальности здесь был бы API перевода)
        translated = f"[{target_lang.upper()}] {message}"
        
        if session_id in self.active_sessions:
            self.active_sessions[session_id]["translation_cache"][cache_key] = translated
        
        return translated

# Примеры использования

def create_sample_iss_classroom() -> Dict[str, Any]:
    """Создание примера аудитории МКС"""
    return {
        "title": {
            "ru": "Космическая лаборатория МКС",
            "en": "ISS Space Laboratory",
            "uz": "XKS kosmik laboratoriyasi"
        },
        "description": {
            "ru": "Прямая трансляция экспериментов с Международной космической станции",
            "en": "Live experiments from the International Space Station"
        },
        "type": "space_iss",
        "region": "universal",
        "max_participants": 100,
        "age_range": [10, 18],
        "languages": ["ru", "en", "es"],
        "terra_principles": ["human-nature-symbiosis", "child-centric_learning"],
        "ethical_guidelines": ["space_ethics", "international_cooperation"],
        "accessibility": ["sign_language", "audio_description", "low_bandwidth_mode"],
        "location": {
            "type": "orbital",
            "altitude_km": 408,
            "orbital_period_minutes": 92
        }
    }

def create_sample_forest_classroom() -> Dict[str, Any]:
    """Создание примера лесной аудитории"""
    return {
        "title": {
            "ru": "Лесная экологическая лаборатория",
            "en": "Forest Ecological Laboratory", 
            "de": "Waldökologisches Labor"
        },
        "description": {
            "ru": "Изучение экосистемы леса в естественной среде",
            "en": "Forest ecosystem study in natural environment"
        },
        "type": "forest_lab",
        "region": "eu_multi",
        "max_participants": 25,
        "age_range": [8, 16],
        "languages": ["ru", "en", "de"],
        "terra_principles": ["human-nature-symbiosis", "ecological_consciousness"],
        "ethical_guidelines": ["leave_no_trace", "respect_wildlife", "sustainable_observation"],
        "accessibility": ["wheelchair_accessible_paths", "sensory_accommodations"],
        "location": {
            "type": "terrestrial",
            "coordinates": [52.5200, 13.4050],  # Berlin area
            "ecosystem_type": "temperate_deciduous_forest",
            "protected_status": "nature_reserve"
        }
    }

if __name__ == "__main__":
    print("🌍 AIUZ LiveClass v2.5 инициализирован")
    print("🚀 Готов к глобальному образованию")
    
    # Создание менеджера
    memory_manager = TraceMemoryManager()
    liveclass_manager = LiveClassManager(memory_manager)
    
    # Создание примеров аудиторий
    iss_classroom_data = create_sample_iss_classroom()
    forest_classroom_data = create_sample_forest_classroom()
    
    iss_classroom_id = liveclass_manager.create_global_classroom(iss_classroom_data)
    forest_classroom_id = liveclass_manager.create_global_classroom(forest_classroom_data)
    
    print(f"🛰️ Создана космическая аудитория: {iss_classroom_id}")
    print(f"🌲 Создана лесная аудитория: {forest_classroom_id}")
    
    # Регистрация инструктора
    instructor_data = {
        "name": "Dr. Elena Космонавт",
        "languages": ["ru", "en"],
        "specializations": ["space_science", "physics", "international_cooperation"],
        "regions": [RegionType.UNIVERSAL_ACCESS],
        "certifications": ["space_education", "environmental_education"],
        "experience_years": 15,
        "age_groups": [(10, 18), (18, 25)],
        "philosophy": {
            "ru": "Космос объединяет человечество и показывает хрупкость нашей планеты",
            "en": "Space unites humanity and shows the fragility of our planet"
        },
        "location": {"country": "Russia", "city": "Moscow"},
        "time_zone": "UTC+3"
    }
    
    instructor_id = liveclass_manager.instructor_network.register_instructor(instructor_data)
    print(f"👩‍🚀 Зарегистрирован инструктор: {instructor_id}")
    
    # Получение статистики
    stats = liveclass_manager.get_global_statistics()
    print(f"📊 Глобальная статистика: {stats}")
    
    print("✅ AIUZ LiveClass готов к проведению глобальных уроков!")
    print("🌍 Связывая детей всего мира через образование и этику")
```
