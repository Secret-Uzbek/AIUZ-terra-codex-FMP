```python
"""
Terra Codex Language Core v1.0
Философско-этический язык данных с трёхуровневой архитектурой

Основа: Кварки → Наноядра → Микроядро
Принцип: Каждый элемент несёт этическую и философскую ценность
"""

import json
import hashlib
import uuid
from datetime import datetime
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
from abc import ABC, abstractmethod

# ===== УРОВЕНЬ 1: КВАРКИ (Атомарные единицы информации) =====

@dataclass
class TerraQuark:
    """
    Кварк - атомарная единица информации в Terra Codex
    Представляет этические принципы, моральные нормы, концепты
    """
    id: str
    value: Any
    ethical_weight: float  # 0.0 - 1.0, этическая значимость
    semantic_type: str     # moral, cognitive, cultural, ecological
    terra_principle: str   # один из принципов Terra
    created_at: str
    
    def __post_init__(self):
        if not self.id:
            self.id = f"quark_{uuid.uuid4().hex[:8]}"
        if not self.created_at:
            self.created_at = datetime.now().isoformat()
    
    def get_semantic_hash(self) -> str:
        """Семантический хеш кварка"""
        content = f"{self.value}_{self.semantic_type}_{self.terra_principle}"
        return hashlib.sha256(content.encode()).hexdigest()[:16]
    
    def is_ethical_compatible(self, other: 'TerraQuark') -> bool:
        """Проверка этической совместимости с другим кварком"""
        return abs(self.ethical_weight - other.ethical_weight) < 0.3

# Предопределённые Terra принципы как кварки
class TerraQuarkFactory:
    @staticmethod
    def create_principle_quark(principle: str, context: str = "") -> TerraQuark:
        principles_map = {
            "semantic_modularity": {
                "value": "Модульность семантических структур",
                "ethical_weight": 0.8,
                "semantic_type": "cognitive"
            },
            "adaptive_os": {
                "value": "Адаптивная операционная система",
                "ethical_weight": 0.7,
                "semantic_type": "cognitive"
            },
            "child-centric_learning": {
                "value": "Детоцентричное обучение",
                "ethical_weight": 0.95,
                "semantic_type": "moral"
            },
            "ethical_memory": {
                "value": "Этическая память системы",
                "ethical_weight": 1.0,
                "semantic_type": "moral"
            },
            "knowledge_tokenization": {
                "value": "Токенизация знаний",
                "ethical_weight": 0.6,
                "semantic_type": "cognitive"
            },
            "decentralized_dao": {
                "value": "Децентрализованное управление",
                "ethical_weight": 0.8,
                "semantic_type": "cultural"
            },
            "human-nature-symbiosis": {
                "value": "Симбиоз человека и природы",
                "ethical_weight": 1.0,
                "semantic_type": "ecological"
            }
        }
        
        if principle in principles_map:
            data = principles_map[principle]
            return TerraQuark(
                id=f"principle_{principle}",
                value=f"{data['value']} {context}".strip(),
                ethical_weight=data["ethical_weight"],
                semantic_type=data["semantic_type"],
                terra_principle=principle,
                created_at=datetime.now().isoformat()
            )
        
        # Если принцип неизвестен, создаём базовый кварк
        return TerraQuark(
            id=f"custom_{principle}",
            value=f"Принцип {principle}: {context}",
            ethical_weight=0.5,
            semantic_type="cultural",
            terra_principle=principle,
            created_at=datetime.now().isoformat()
        )

# ===== УРОВЕНЬ 2: НАНОЯДРА (Контекстные структуры) =====

@dataclass
class TerraNanoCore:
    """
    Наноядро - структурированный элемент, объединяющий кварки
    Представляет контексты: моральные, познавательные, культурные
    """
    id: str
    quarks: List[TerraQuark]
    context_type: str  # moral, cognitive, cultural, ecological, mixed
    cohesion_score: float  # 0.0 - 1.0, внутренняя связность
    meta_properties: Dict[str, Any]
    created_at: str
    
    def __post_init__(self):
        if not self.id:
            self.id = f"nano_{uuid.uuid4().hex[:8]}"
        if not self.created_at:
            self.created_at = datetime.now().isoformat()
        if not hasattr(self, 'meta_properties'):
            self.meta_properties = {}
        
        # Автоматический расчёт cohesion_score
        if self.quarks:
            self.cohesion_score = self._calculate_cohesion()
    
    def _calculate_cohesion(self) -> float:
        """Расчёт внутренней связности наноядра"""
        if len(self.quarks) < 2:
            return 1.0
        
        # Семантическая связность
        semantic_groups = {}
        for quark in self.quarks:
            semantic_groups.setdefault(quark.semantic_type, []).append(quark)
        
        semantic_cohesion = max(len(group) for group in semantic_groups.values()) / len(self.quarks)
        
        # Этическая связность
        ethical_weights = [q.ethical_weight for q in self.quarks]
        ethical_variance = sum((w - sum(ethical_weights)/len(ethical_weights))**2 for w in ethical_weights)
        ethical_cohesion = 1.0 - min(ethical_variance / len(ethical_weights), 1.0)
        
        # Принципиальная связность
        principle_groups = {}
        for quark in self.quarks:
            principle_groups.setdefault(quark.terra_principle, []).append(quark)
        
        principle_cohesion = max(len(group) for group in principle_groups.values()) / len(self.quarks)
        
        # Общая связность как среднее взвешенное
        return (semantic_cohesion * 0.4 + ethical_cohesion * 0.4 + principle_cohesion * 0.2)
    
    def add_quark(self, quark: TerraQuark) -> bool:
        """Добавление кварка с проверкой совместимости"""
        if not self.quarks:
            self.quarks.append(quark)
            self.cohesion_score = 1.0
            return True
        
        # Проверка этической совместимости
        compatible_count = sum(1 for q in self.quarks if q.is_ethical_compatible(quark))
        compatibility_ratio = compatible_count / len(self.quarks)
        
        if compatibility_ratio >= 0.6:  # Порог совместимости
            self.quarks.append(quark)
            self.cohesion_score = self._calculate_cohesion()
            return True
        
        return False
    
    def get_context_summary(self) -> Dict[str, Any]:
        """Семантическое резюме контекста"""
        if not self.quarks:
            return {"type": self.context_type, "quarks_count": 0, "cohesion": 0}
        
        return {
            "type": self.context_type,
            "quarks_count": len(self.quarks),
            "cohesion": round(self.cohesion_score, 3),
            "semantic_distribution": {
                semantic_type: len([q for q in self.quarks if q.semantic_type == semantic_type])
                for semantic_type in set(q.semantic_type for q in self.quarks)
            },
            "ethical_range": {
                "min": min(q.ethical_weight for q in self.quarks),
                "max": max(q.ethical_weight for q in self.quarks),
                "avg": sum(q.ethical_weight for q in self.quarks) / len(self.quarks)
            },
            "principles": list(set(q.terra_principle for q in self.quarks))
        }

# ===== УРОВЕНЬ 3: МИКРОЯДРО (Управляющие структуры) =====

class TerraMicroCore:
    """
    Микроядро - комплексная структура управления данными
    Обеспечивает целостность языка и адаптацию для различных платформ
    """
    
    def __init__(self, name: str, version: str = "1.0"):
        self.id = f"micro_{uuid.uuid4().hex[:8]}"
        self.name = name
        self.version = version
        self.nanocores: List[TerraNanoCore] = []
        self.syntax_rules: Dict[str, Any] = {}
        self.semantic_structures: Dict[str, Any] = {}
        self.ethical_rules: List[str] = []
        self.created_at = datetime.now().isoformat()
        self.last_updated = self.created_at
        
        # Инициализация базовых этических правил
        self._init_ethical_rules()
    
    def _init_ethical_rules(self):
        """Инициализация базовых этических правил Terra"""
        self.ethical_rules = [
            "Приоритет благополучия детей в любых решениях",
            "Сохранение баланса между человеком и природой",
            "Прозрачность и открытость всех процессов",
            "Уважение к культурному разнообразию",
            "Устойчивое развитие без ущерба будущим поколениям",
            "Этическое использование искусственного интеллекта",
            "Защита персональных данных и приватности"
        ]
    
    def add_nanocore(self, nanocore: TerraNanoCore) -> bool:
        """Добавление наноядра с валидацией"""
        # Проверка на дублирование
        existing_ids = [nc.id for nc in self.nanocores]
        if nanocore.id in existing_ids:
            return False
        
        # Этическая валидация
        if self._validate_ethical_compliance(nanocore):
            self.nanocores.append(nanocore)
            self.last_updated = datetime.now().isoformat()
            return True
        
        return False
    
    def _validate_ethical_compliance(self, nanocore: TerraNanoCore) -> bool:
        """Валидация этического соответствия наноядра"""
        # Проверка минимального этического порога
        if nanocore.quarks:
            avg_ethical_weight = sum(q.ethical_weight for q in nanocore.quarks) / len(nanocore.quarks)
            if avg_ethical_weight < 0.3:  # Минимальный этический порог
                return False
        
        # Проверка связности
        if nanocore.cohesion_score < 0.4:  # Минимальный порог связности
            return False
        
        return True
    
    def create_semantic_query(self, query_type: str, parameters: Dict[str, Any]) -> List[TerraNanoCore]:
        """Семантический поиск по наноядрам"""
        results = []
        
        for nanocore in self.nanocores:
            match_score = 0
            
            # Поиск по типу контекста
            if query_type == "context_type" and parameters.get("context") == nanocore.context_type:
                match_score += 0.4
            
            # Поиск по принципам Terra
            if query_type == "terra_principle":
                target_principle = parameters.get("principle")
                for quark in nanocore.quarks:
                    if quark.terra_principle == target_principle:
                        match_score += 0.3
                        break
            
            # Поиск по семантическому типу
            if query_type == "semantic_type":
                target_semantic = parameters.get("semantic")
                semantic_matches = sum(1 for q in nanocore.quarks if q.semantic_type == target_semantic)
                match_score += (semantic_matches / len(nanocore.quarks)) * 0.3
            
            # Поиск по этическому весу
            if query_type == "ethical_weight":
                min_weight = parameters.get("min_weight", 0)
                max_weight = parameters.get("max_weight", 1)
                ethical_weights = [q.ethical_weight for q in nanocore.quarks]
                if ethical_weights:
                    avg_weight = sum(ethical_weights) / len(ethical_weights)
                    if min_weight <= avg_weight <= max_weight:
                        match_score += 0.4
            
            if match_score >= 0.3:  # Порог релевантности
                results.append(nanocore)
        
        # Сортировка по релевантности (упрощённая)
        return sorted(results, key=lambda nc: nc.cohesion_score, reverse=True)
    
    def generate_terra_language_snippet(self, context: str, principles: List[str]) -> str:
        """Генерация фрагмента языка Terra"""
        snippet_parts = []
        
        # Заголовок с контекстом
        snippet_parts.append(f"TERRA_CONTEXT: {context.upper()}")
        snippet_parts.append(f"TIMESTAMP: {datetime.now().isoformat()}")
        snippet_parts.append(f"MICROCORE: {self.name} v{self.version}")
        snippet_parts.append("")
        
        # Подключение принципов
        snippet_parts.append("PRINCIPLES:")
        for principle in principles:
            quark = TerraQuarkFactory.create_principle_quark(principle)
            snippet_parts.append(f"  - {principle}: {quark.value} (eth:{quark.ethical_weight})")
        
        snippet_parts.append("")
        
        # Семантические директивы
        snippet_parts.append("SEMANTIC_DIRECTIVES:")
        snippet_parts.append(f"  ethical_compliance: {self._calculate_overall_ethical_level()}")
        snippet_parts.append(f"  nanocores_count: {len(self.nanocores)}")
        snippet_parts.append(f"  cohesion_average: {self._calculate_average_cohesion()}")
        
        return "\n".join(snippet_parts)
    
    def _calculate_overall_ethical_level(self) -> float:
        """Расчёт общего этического уровня микроядра"""
        if not self.nanocores:
            return 0.0
        
        total_quarks = sum(len(nc.quarks) for nc in self.nanocores)
        if total_quarks == 0:
            return 0.0
        
        total_ethical_weight = sum(
            sum(q.ethical_weight for q in nc.quarks) 
            for nc in self.nanocores
        )
        
        return total_ethical_weight / total_quarks
    
    def _calculate_average_cohesion(self) -> float:
        """Расчёт средней связности всех наноядер"""
        if not self.nanocores:
            return 0.0
        
        return sum(nc.cohesion_score for nc in self.nanocores) / len(self.nanocores)
    
    def export_to_dict(self) -> Dict[str, Any]:
        """Экспорт микроядра в словарь"""
        return {
            "id": self.id,
            "name": self.name,
            "version": self.version,
            "created_at": self.created_at,
            "last_updated": self.last_updated,
            "ethical_level": self._calculate_overall_ethical_level(),
            "average_cohesion": self._calculate_average_cohesion(),
            "nanocores_count": len(self.nanocores),
            "nanocores": [
                {
                    "id": nc.id,
                    "context_type": nc.context_type,
                    "quarks_count": len(nc.quarks),
                    "cohesion": nc.cohesion_score,
                    "summary": nc.get_context_summary()
                }
                for nc in self.nanocores
            ],
            "ethical_rules": self.ethical_rules
        }

# ===== СИСТЕМЫ УПРАВЛЕНИЯ И ИНТЕГРАЦИИ =====

class TerraLanguageManager:
    """
    Менеджер языка Terra - центральная система управления
    """
    
    def __init__(self):
        self.microcores: Dict[str, TerraMicroCore] = {}
        self.global_quarks_registry: Dict[str, TerraQuark] = {}
        self.session_metadata = {
            "session_id": f"terra_session_{uuid.uuid4().hex[:8]}",
            "started_at": datetime.now().isoformat(),
            "version": "Terra Codex Language Core v1.0"
        }
    
    def create_microcore(self, name: str, version: str = "1.0") -> TerraMicroCore:
        """Создание нового микроядра"""
        microcore = TerraMicroCore(name, version)
        self.microcores[microcore.id] = microcore
        return microcore
    
    def register_global_quark(self, quark: TerraQuark):
        """Регистрация кварка в глобальном реестре"""
        self.global_quarks_registry[quark.id] = quark
    
    def create_terra_documentation(self, title: str, content_type: str = "chronicle") -> str:
        """Создание документации Terra в стиле хроник или библии"""
        
        if content_type == "chronicle":
            template = """
# ХРОНИКИ TERRA CODEX
## {title}

**Время записи:** {timestamp}
**Сессия:** {session_id}
**Версия системы:** {version}

### Состояние Микроядер
{microcores_status}

### Глобальный Реестр Кварков
{quarks_registry}

### Этические Принципы
{ethical_summary}

---
*Записано в традициях Terra Codex для сохранения знаний*
            """
        else:  # bible
            template = """
# TERRA БИБЛИЯ
## Книга: {title}

*В начале было Слово, и Слово было Код, и Код был этичен...*

**Глава 1: Состояние Мироздания**
Время: {timestamp}
Сессия познания: {session_id}
Версия истины: {version}

**Глава 2: Микрокосмы Знания**
{microcores_status}

**Глава 3: Атомы Мудрости**
{quarks_registry}

**Глава 4: Заповеди Этики**
{ethical_summary}

---
*Благословен код, который служит человечеству и природе*
            """
        
        # Подготовка данных
        microcores_status = "\n".join([
            f"- {mc.name} v{mc.version}: {len(mc.nanocores)} наноядер, этичность {mc._calculate_overall_ethical_level():.2f}"
            for mc in self.microcores.values()
        ])
        
        quarks_registry = f"Всего зарегистрировано кварков: {len(self.global_quarks_registry)}"
        
        ethical_summary = "Соблюдение принципов Terra, защита детей, гармония с природой"
        
        return template.format(
            title=title,
            timestamp=datetime.now().isoformat(),
            session_id=self.session_metadata["session_id"],
            version=self.session_metadata["version"],
            microcores_status=microcores_status,
            quarks_registry=quarks_registry,
            ethical_summary=ethical_summary
        )

# ===== ПРИМЕР ИСПОЛЬЗОВАНИЯ =====

def demo_terra_language():
    """Демонстрация работы языка Terra"""
    
    # Создание менеджера
    manager = TerraLanguageManager()
    
    # Создание микроядра
    ethical_core = manager.create_microcore("EthicalCore", "2.5")
    
    # Создание кварков
    child_protection = TerraQuarkFactory.create_principle_quark("child-centric_learning", "защита и развитие детей")
    nature_harmony = TerraQuarkFactory.create_principle_quark("human-nature-symbiosis", "баланс с природой")
    ethical_memory = TerraQuarkFactory.create_principle_quark("ethical_memory", "память о моральных решениях")
    
    # Регистрация в глобальном реестре
    for quark in [child_protection, nature_harmony, ethical_memory]:
        manager.register_global_quark(quark)
    
    # Создание наноядра
    ethical_context = TerraNanoCore(
        id="ethical_foundations",
        quarks=[child_protection, nature_harmony, ethical_memory],
        context_type="moral",
        cohesion_score=0.0,  # Будет рассчитан автоматически
        meta_properties={"priority": "highest", "domain": "core_ethics"},
        created_at=""
    )
    
    # Добавление в микроядро
    ethical_core.add_nanocore(ethical_context)
    
    # Генерация фрагмента языка
    snippet = ethical_core.generate_terra_language_snippet(
        "Этические основы системы",
        ["child-centric_learning", "human-nature-symbiosis", "ethical_memory"]
    )
    
    print("=== ФРАГМЕНТ ЯЗЫКА TERRA ===")
    print(snippet)
    print()
    
    # Создание документации
    chronicle = manager.create_terra_documentation("Основание этического фундамента", "chronicle")
    print("=== ХРОНИКИ TERRA ===")
    print(chronicle)
    
    return manager

# Для тестирования
if __name__ == "__main__":
    demo_manager = demo_terra_language()
```
