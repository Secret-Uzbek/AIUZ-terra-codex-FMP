```python
"""
🏛️ DAO & Reputation System v2.5
Децентрализованное управление экосистемой Terra Codex
Семантическое голосование и этический консенсус
"""

import json
import hashlib
from typing import Dict, List, Any, Optional, Set, Tuple
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
from enum import Enum
import uuid
from collections import defaultdict

# Интеграция с Terra экосистемой
from terra_language_core import TerraQuark, TerraNanoCore, TerraMicroCore
from l2_trace_memory import TraceMemoryManager

class ProposalType(Enum):
    CURRICULUM_UPDATE = "curriculum_update"
    ETHICAL_POLICY = "ethical_policy"
    TECHNICAL_IMPROVEMENT = "technical_improvement"
    INSTRUCTOR_CERTIFICATION = "instructor_certification"
    RESOURCE_ALLOCATION = "resource_allocation"
    PARTNERSHIP_PROPOSAL = "partnership_proposal"
    COMMUNITY_GUIDELINE = "community_guideline"
    RESEARCH_INITIATIVE = "research_initiative"

class VoteType(Enum):
    SUPPORT = "support"
    OPPOSE = "oppose"
    ABSTAIN = "abstain"
    CONDITIONAL = "conditional"

class ProposalStatus(Enum):
    DRAFT = "draft"
    UNDER_REVIEW = "under_review"
    ACTIVE_VOTING = "active_voting"
    PASSED = "passed"
    REJECTED = "rejected"
    IMPLEMENTED = "implemented"
    ARCHIVED = "archived"

class ReputationCategory(Enum):
    EDUCATIONAL_CONTRIBUTION = "educational_contribution"
    ETHICAL_LEADERSHIP = "ethical_leadership"
    TECHNICAL_EXPERTISE = "technical_expertise"
    COMMUNITY_BUILDING = "community_building"
    ENVIRONMENTAL_ADVOCACY = "environmental_advocacy"
    CULTURAL_BRIDGE = "cultural_bridge"
    INNOVATION = "innovation"
    MENTORSHIP = "mentorship"

@dataclass
class ReputationScore:
    """Балл репутации в Terra экосистеме"""
    user_id: str
    category: ReputationCategory
    score: float  # 0.0 - 1.0
    last_updated: str
    evidence_quarks: List[str]  # Ссылки на TerraQuark доказательства
    peer_validations: List[str]  # Подтверждения от коллег
    temporal_decay_factor: float  # Фактор старения оценки
    
    def calculate_current_score(self) -> float:
        """Расчёт текущего балла с учётом временного старения"""
        days_since_update = (datetime.now() - datetime.fromisoformat(self.last_updated)).days
        decay = max(0.7, 1.0 - (days_since_update * self.temporal_decay_factor))
        return self.score * decay

@dataclass
class Proposal:
    """Предложение для голосования в DAO"""
    proposal_id: str
    title: Dict[str, str]
    description: Dict[str, str]
    proposal_type: ProposalType
    author_id: str
    co_authors: List[str]
    created_at: str
    voting_deadline: str
    status: ProposalStatus
    required_quorum: float  # 0.0 - 1.0
    required_majority: float  # 0.0 - 1.0
    terra_principles_impact: List[str]
    ethical_implications: Dict[str, Any]
    implementation_plan: Dict[str, Any]
    budget_requirement: float
    affected_stakeholders: List[str]
    votes: Dict[str, Any]  # user_id -> vote_data
    semantic_tags: List[str]
    discussion_thread: List[Dict[str, Any]]
    
    def calculate_voting_progress(self) -> Dict[str, Any]:
        """Расчёт прогресса голосования"""
        total_votes = len(self.votes)
        
        if total_votes == 0:
            return {"progress": 0.0, "status": "no_votes"}
        
        vote_breakdown = defaultdict(int)
        weighted_scores = defaultdict(float)
        
        for vote_data in self.votes.values():
            vote_type = vote_data["type"]
            vote_weight = vote_data.get("weight", 1.0)
            
            vote_breakdown[vote_type] += 1
            weighted_scores[vote_type] += vote_weight
        
        total_weight = sum(weighted_scores.values())
        
        return {
            "total_votes": total_votes,
            "vote_breakdown": dict(vote_breakdown),
            "weighted_breakdown": dict(weighted_scores),
            "support_ratio": weighted_scores.get("support", 0) / max(total_weight, 1),
            "quorum_reached": total_votes >= (self.required_quorum * 100),  # Предполагая общую базу в 100 активных участников
            "can_pass": weighted_scores.get("support", 0) / max(total_weight, 1) >= self.required_majority
        }

class SemanticVotingEngine:
    """Движок семантического голосования"""
    
    def __init__(self, memory_manager: TraceMemoryManager):
        self.memory_manager = memory_manager
        self.voting_algorithms = {
            "terra_weighted": self._terra_weighted_voting,
            "ethical_consensus": self._ethical_consensus_voting,
            "expertise_based": self._expertise_based_voting,
            "collaborative_decision": self._collaborative_decision_voting
        }
    
    def calculate_vote_weight(self, user_id: str, proposal: Proposal, 
                            reputation_manager: 'ReputationManager') -> float:
        """Расчёт веса голоса на основе репутации и релевантности"""
        
        base_weight = 1.0
        
        # Получение профиля репутации пользователя
        reputation_profile = reputation_manager.get_user_reputation_profile(user_id)
        
        if not reputation_profile:
            return base_weight * 0.5  # Новые пользователи получают сниженный вес
        
        # Расчёт релевантности репутации к типу предложения
        relevance_multiplier = self._calculate_expertise_relevance(
            proposal.proposal_type, 
            reputation_profile
        )
        
        # Общий уровень репутации
        overall_reputation = reputation_manager.calculate_overall_reputation(user_id)
        
        # Этическая составляющая
        ethical_score = reputation_profile.get(ReputationCategory.ETHICAL_LEADERSHIP, 0.5)
        
        # Итоговый вес
        final_weight = base_weight * (1.0 + relevance_multiplier) * overall_reputation * (0.5 + ethical_score * 0.5)
        
        return min(final_weight, 3.0)  # Максимальный вес ограничен
    
    def _calculate_expertise_relevance(self, proposal_type: ProposalType, 
                                     reputation_profile: Dict[ReputationCategory, float]) -> float:
        """Расчёт релевантности экспертизы к типу предложения"""
        
        relevance_mapping = {
            ProposalType.CURRICULUM_UPDATE: [
                ReputationCategory.EDUCATIONAL_CONTRIBUTION,
                ReputationCategory.TECHNICAL_EXPERTISE
            ],
            ProposalType.ETHICAL_POLICY: [
                ReputationCategory.ETHICAL_LEADERSHIP,
                ReputationCategory.COMMUNITY_BUILDING
            ],
            ProposalType.TECHNICAL_IMPROVEMENT: [
                ReputationCategory.TECHNICAL_EXPERTISE,
                ReputationCategory.INNOVATION
            ],
            ProposalType.INSTRUCTOR_CERTIFICATION: [
                ReputationCategory.EDUCATIONAL_CONTRIBUTION,
                ReputationCategory.MENTORSHIP
            ],
            ProposalType.ENVIRONMENTAL_ADVOCACY: [
                ReputationCategory.ENVIRONMENTAL_ADVOCACY,
                ReputationCategory.ETHICAL_LEADERSHIP
            ]
        }
        
        relevant_categories = relevance_mapping.get(proposal_type, [])
        
        if not relevant_categories:
            return 0.0
        
        relevant_scores = [
            reputation_profile.get(category, 0.0) 
            for category in relevant_categories
        ]
        
        return sum(relevant_scores) / len(relevant_scores)
    
    def _terra_weighted_voting(self, votes: Dict[str, Any], proposal: Proposal) -> Dict[str, Any]:
        """Terra-взвешенное голосование с учётом этических принципов"""
        
        weighted_results = defaultdict(float)
        ethical_bonus = defaultdict(float)
        
        for user_id, vote_data in votes.items():
            vote_type = vote_data["type"]
            vote_weight = vote_data["weight"]
            
            # Основной взвешенный голос
            weighted_results[vote_type] += vote_weight
            
            # Бонус за этическое обоснование
            if "ethical_reasoning" in vote_data and len(vote_data["ethical_reasoning"]) > 50:
                ethical_bonus[vote_type] += vote_weight * 0.2
        
        # Добавление этических бонусов
        for vote_type, bonus in ethical_bonus.items():
            weighted_results[vote_type] += bonus
        
        total_weight = sum(weighted_results.values())
        
        return {
            "algorithm": "terra_weighted",
            "results": dict(weighted_results),
            "winner": max(weighted_results.items(), key=lambda x: x[1])[0] if weighted_results else None,
            "support_percentage": weighted_results.get("support", 0) / max(total_weight, 1) * 100,
            "ethical_enhancement": dict(ethical_bonus)
        }
    
    def _ethical_consensus_voting(self, votes: Dict[str, Any], proposal: Proposal) -> Dict[str, Any]:
        """Голосование на основе этического консенсуса"""
        
        ethical_scores = []
        consensus_threshold = 0.8
        
        for user_id, vote_data in votes.items():
            ethical_reasoning = vote_data.get("ethical_reasoning", "")
            terra_alignment = self._assess_terra_alignment(ethical_reasoning)
            ethical_scores.append(terra_alignment)
        
        average_ethical_score = sum(ethical_scores) / len(ethical_scores) if ethical_scores else 0
        
        # Консенсус достигается, если этический уровень высок
        consensus_reached = average_ethical_score >= consensus_threshold
        
        return {
            "algorithm": "ethical_consensus",
            "average_ethical_score": average_ethical_score,
            "consensus_reached": consensus_reached,
            "consensus_threshold": consensus_threshold,
            "recommendation": "approve" if consensus_reached else "further_discussion"
        }
    
    def _assess_terra_alignment(self, text: str) -> float:
        """Оценка соответствия текста Terra принципам"""
        terra_keywords = {
            "этика", "природа", "сотрудничество", "дети", "образование",
            "устойчивость", "сообщество", "справедливость", "творчество",
            "ethics", "nature", "collaboration", "children", "education",
            "sustainability", "community", "justice", "creativity"
        }
        
        text_lower = text.lower()
        keyword_matches = sum(1 for keyword in terra_keywords if keyword in text_lower)
        
        # Базовая оценка по ключевым словам
        base_score = min(keyword_matches / 5, 1.0)
        
        # Бонус за длину обоснования (показывает thoughtfulness)
        length_bonus = min(len(text) / 500, 0.3)
        
        return min(base_score + length_bonus, 1.0)

class ReputationManager:
    """Менеджер системы репутации"""
    
    def __init__(self, memory_manager: TraceMemoryManager):
        self.memory_manager = memory_manager
        self.reputation_scores = defaultdict(dict)  # user_id -> category -> ReputationScore
        self.peer_validations = defaultdict(list)
        self.contribution_history = defaultdict(list)
        
    def add_reputation_evidence(self, user_id: str, category: ReputationCategory,
                              evidence_data: Dict[str, Any], validator_id: Optional[str] = None) -> bool:
        """Добавление доказательства для репутации"""
        
        # Создание Terra кварка для доказательства
        evidence_quark = TerraQuark(
            semantic_id=f"reputation_evidence_{uuid.uuid4().hex[:8]}",
            terra_principle=self._category_to_principle(category),
            ethical_weight=evidence_data.get("ethical_weight", 0.7),
            content_type="reputation_evidence",
            multilingual_data={
                "ru": evidence_data.get("description", ""),
                "en": evidence_data.get("description_en", evidence_data.get("description", ""))
            },
            creation_timestamp=datetime.now().isoformat()
        )
        
        # Расчёт балла на основе доказательства
        score_value = self._calculate_evidence_score(evidence_data, category)
        
        # Обновление или создание ReputationScore
        if category in self.reputation_scores[user_id]:
            existing_score = self.reputation_scores[user_id][category]
            # Взвешенное обновление существующего балла
            new_score = (existing_score.score * 0.7) + (score_value * 0.3)
            existing_score.score = new_score
            existing_score.last_updated = datetime.now().isoformat()
            existing_score.evidence_quarks.append(evidence_quark.semantic_id)
            
            if validator_id:
                existing_score.peer_validations.append(validator_id)
        else:
            # Создание нового балла репутации
            reputation_score = ReputationScore(
                user_id=user_id,
                category=category,
                score=score_value,
                last_updated=datetime.now().isoformat(),
                evidence_quarks=[evidence_quark.semantic_id],
                peer_validations=[validator_id] if validator_id else [],
                temporal_decay_factor=0.001  # 0.1% в день
            )
            self.reputation_scores[user_id][category] = reputation_score
        
        # Сохранение в Terra память
        self.memory_manager.add_learning_interaction({
            "type": "reputation_update",
            "content": f"Обновление репутации: {category.value}",
            "principle": self._category_to_principle(category),
            "ethical_weight": 0.8,
            "user_actions": ["reputation_evidence_added"],
            "evidence_type": evidence_data.get("type", "unknown"),
            "score_change": score_value
        })
        
        return True
    
    def _category_to_principle(self, category: ReputationCategory) -> str:
        """Сопоставление категории репутации с Terra принципом"""
        mapping = {
            ReputationCategory.EDUCATIONAL_CONTRIBUTION: "child-centric_learning",
            ReputationCategory.ETHICAL_LEADERSHIP: "ethical_memory",
            ReputationCategory.ENVIRONMENTAL_ADVOCACY: "human-nature-symbiosis",
            ReputationCategory.TECHNICAL_EXPERTISE: "knowledge_tokenization",
            ReputationCategory.COMMUNITY_BUILDING: "decentralized_dao",
            ReputationCategory.CULTURAL_BRIDGE: "adaptive_os",
            ReputationCategory.INNOVATION: "semantic_modularity",
            ReputationCategory.MENTORSHIP: "child-centric_learning"
        }
        
        return mapping.get(category, "ethical_memory")
    
    def _calculate_evidence_score(self, evidence_data: Dict[str, Any], 
                                category: ReputationCategory) -> float:
        """Расчёт балла на основе доказательства"""
        
        base_score = 0.5
        
        # Оценка по типу доказательства
        evidence_type = evidence_data.get("type", "self_reported")
        type_multipliers = {
            "peer_validated": 1.0,
            "system_measured": 0.9,
            "community_recognized": 0.8,
            "self_reported": 0.6
        }
        
        type_score = type_multipliers.get(evidence_type, 0.5)
        
        # Оценка по влиянию
        impact_level = evidence_data.get("impact_level", "medium")
        impact_multipliers = {
            "transformational": 1.0,
            "significant": 0.8,
            "medium": 0.6,
            "small": 0.4
        }
        
        impact_score = impact_multipliers.get(impact_level, 0.5)
        
        # Этическая составляющая
        ethical_component = evidence_data.get("ethical_weight", 0.7)
        
        # Итоговый балл
        final_score = base_score + (type_score * impact_score * ethical_component * 0.5)
        
        return min(final_score, 1.0)
    
    def get_user_reputation_profile(self, user_id: str) -> Dict[ReputationCategory, float]:
        """Получение профиля репутации пользователя"""
        
        if user_id not in self.reputation_scores:
            return {}
        
        profile = {}
        for category, reputation_score in self.reputation_scores[user_id].items():
            profile[category] = reputation_score.calculate_current_score()
        
        return profile
    
    def calculate_overall_reputation(self, user_id: str) -> float:
        """Расчёт общей репутации пользователя"""
        
        profile = self.get_user_reputation_profile(user_id)
        
        if not profile:
            return 0.5  # Базовый уровень для новых пользователей
        
        # Взвешенное среднее с особым весом для этических категорий
        category_weights = {
            ReputationCategory.ETHICAL_LEADERSHIP: 1.5,
            ReputationCategory.EDUCATIONAL_CONTRIBUTION: 1.3,
            ReputationCategory.ENVIRONMENTAL_ADVOCACY: 1.2,
            ReputationCategory.COMMUNITY_BUILDING: 1.1,
            ReputationCategory.MENTORSHIP: 1.1,
            ReputationCategory.TECHNICAL_EXPERTISE: 1.0,
            ReputationCategory.INNOVATION: 1.0,
            ReputationCategory.CULTURAL_BRIDGE: 1.0
        }
        
        weighted_sum = 0.0
        total_weight = 0.0
        
        for category, score in profile.items():
            weight = category_weights.get(category, 1.0)
            weighted_sum += score * weight
            total_weight += weight
        
        return weighted_sum / total_weight if total_weight > 0 else 0.5
    
    def validate_peer_contribution(self, validator_id: str, user_id: str, 
                                 category: ReputationCategory, validation_score: float) -> bool:
        """Peer-валидация вклада"""
        
        # Проверка права на валидацию
        validator_reputation = self.calculate_overall_reputation(validator_id)
        
        if validator_reputation < 0.6:
            return False  # Недостаточная репутация для валидации
        
        # Добавление валидации
        validation_key = f"{user_id}_{category.value}_{validator_id}"
        self.peer_validations[validation_key] = {
            "validator_id": validator_id,
            "user_id": user_id,
            "category": category,
            "score": validation_score,
            "timestamp": datetime.now().isoformat()
        }
        
        return True

class DAOGovernanceEngine:
    """Движок управления DAO"""
    
    def __init__(self, memory_manager: TraceMemoryManager):
        self.memory_manager = memory_manager
        self.proposals = {}
        self.voting_engine = SemanticVotingEngine(memory_manager)
        self.reputation_manager = ReputationManager(memory_manager)
        self.governance_rules = self._initialize_governance_rules()
        
    def _initialize_governance_rules(self) -> Dict[str, Any]:
        """Инициализация правил управления"""
        return {
            "proposal_requirements": {
                "minimum_reputation": 0.6,
                "minimum_stake": 0.0,  # Terra использует репутацию, а не токены
                "co_author_requirement": True,  # Поощрение коллаборации
                "ethical_review_required": True
            },
            "voting_requirements": {
                "minimum_quorum": 0.3,  # 30% активных участников
                "super_majority_threshold": 0.67,  # Для важных изменений
                "regular_majority_threshold": 0.51,
                "ethical_consensus_weight": 0.3
            },
            "implementation_rules": {
                "cooling_off_period_hours": 48,
                "gradual_rollout": True,
                "community_feedback_required": True
            }
        }
    
    def create_proposal(self, author_id: str, proposal_data: Dict[str, Any]) -> str:
        """Создание нового предложения"""
        
        # Проверка прав автора
        author_reputation = self.reputation_manager.calculate_overall_reputation(author_id)
        min_reputation = self.governance_rules["proposal_requirements"]["minimum_reputation"]
        
        if author_reputation < min_reputation:
            raise ValueError(f"Недостаточная репутация для создания предложения: {author_reputation} < {min_reputation}")
        
        # Генерация ID предложения
        proposal_id = f"proposal_{uuid.uuid4().hex[:8]}"
        
        # Создание предложения
        proposal = Proposal(
            proposal_id=proposal_id,
            title=proposal_data["title"],
            description=proposal_data["description"],
            proposal_type=ProposalType(proposal_data["type"]),
            author_id=author_id,
            co_authors=proposal_data.get("co_authors", []),
            created_at=datetime.now().isoformat(),
            voting_deadline=(datetime.now() + timedelta(days=proposal_data.get("voting_days", 7))).isoformat(),
            status=ProposalStatus.DRAFT,
            required_quorum=proposal_data.get("quorum", self.governance_rules["voting_requirements"]["minimum_quorum"]),
            required_majority=proposal_data.get("majority", self.governance_rules["voting_requirements"]["regular_majority_threshold"]),
            terra_principles_impact=proposal_data.get("terra_principles", []),
            ethical_implications=proposal_data.get("ethical_implications", {}),
            implementation_plan=proposal_data.get("implementation_plan", {}),
            budget_requirement=proposal_data.get("budget", 0.0),
            affected_stakeholders=proposal_data.get("stakeholders", []),
            votes={},
            semantic_tags=proposal_data.get("tags", []),
            discussion_thread=[]
        )
        
        # Проверка требования соавторства для важных предложений
        if (self.governance_rules["proposal_requirements"]["co_author_requirement"] and 
            proposal.proposal_type in [ProposalType.ETHICAL_POLICY, ProposalType.CURRICULUM_UPDATE] and
            not proposal.co_authors):
            raise ValueError("Для данного типа предложений требуется соавтор")
        
        self.proposals[proposal_id] = proposal
        
        # Логирование создания предложения
        self.memory_manager.add_learning_interaction({
            "type": "proposal_created",
            "content": f"Создано предложение: {proposal.title.get('ru', 'Unknown')}",
            "principle": "decentralized_dao",
            "ethical_weight": 0.8,
            "user_actions": ["proposal_creation"],
            "proposal_type": proposal.proposal_type.value,
            "author_reputation": author_reputation
        })
        
        return proposal_id
    
    def submit_vote(self, proposal_id: str, voter_id: str, vote_data: Dict[str, Any]) -> bool:
        """Подача голоса по предложению"""
        
        if proposal_id not in self.proposals:
            return False
        
        proposal = self.proposals[proposal_id]
        
        # Проверка статуса предложения
        if proposal.status != ProposalStatus.ACTIVE_VOTING:
            return False
        
        # Проверка дедлайна
        if datetime.now() > datetime.fromisoformat(proposal.voting_deadline):
            return False
        
        # Расчёт веса голоса
        vote_weight = self.voting_engine.calculate_vote_weight(
            voter_id, proposal, self.reputation_manager
        )
        
        # Сохранение голоса
        proposal.votes[voter_id] = {
            "type": vote_data["type"],
            "weight": vote_weight,
            "reasoning": vote_data.get("reasoning", ""),
            "ethical_reasoning": vote_data.get("ethical_reasoning", ""),
            "timestamp": datetime.now().isoformat(),
            "conditional_requirements": vote_data.get("conditional_requirements", [])
        }
        
        # Логирование голосования
        self.memory_manager.add_learning_interaction({
            "type": "vote_submitted",
            "content": f"Голос подан по предложению: {proposal_id}",
            "principle": "decentralized_dao",
            "ethical_weight": 0.9,
            "user_actions": ["voting"],
            "vote_type": vote_data["type"],
            "vote_weight": vote_weight
        })
        
        return True
    
    def start_voting_phase(self, proposal_id: str) -> bool:
        """Запуск фазы голосования"""
        
        if proposal_id not in self.proposals:
            return False
        
        proposal = self.proposals[proposal_id]
        
        # Этическая проверка перед запуском голосования
        if self.governance_rules["proposal_requirements"]["ethical_review_required"]:
            ethical_score = self._assess_proposal_ethics(proposal)
            if ethical_score < 0.7:
                proposal.status = ProposalStatus.UNDER_REVIEW
                return False
        
        proposal.status = ProposalStatus.ACTIVE_VOTING
        
        return True
    
    def _assess_proposal_ethics(self, proposal: Proposal) -> float:
        """Оценка этической составляющей предложения"""
        
        ethical_score = 0.5  # Базовый балл
        
        # Анализ воздействия на Terra принципы
        if proposal.terra_principles_impact:
            principle_bonus = len(proposal.terra_principles_impact) * 0.1
            ethical_score += min(principle_bonus, 0.3)
        
        # Анализ этических импликаций
        ethical_implications = proposal.ethical_implications
        if "positive_impacts" in ethical_implications:
            positive_count = len(ethical_implications["positive_impacts"])
            ethical_score += min(positive_count * 0.05, 0.2)
        
        if "risk_mitigation" in ethical_implications:
            mitigation_quality = len(ethical_implications["risk_mitigation"]) / 10  # Предполагая детальное описание
            ethical_score += min(mitigation_quality, 0.15)
        
        return min(ethical_score, 1.0)
    
    def finalize_proposal(self, proposal_id: str) -> Dict[str, Any]:
        """Финализация предложения после голосования"""
        
        if proposal_id not in self.proposals:
            return {"error": "Proposal not found"}
        
        proposal = self.proposals[proposal_id]
        
        # Расчёт результатов голосования
        voting_results = proposal.calculate_voting_progress()
        
        # Применение алгоритма голосования
        semantic_results = self.voting_engine._terra_weighted_voting(proposal.votes, proposal)
        ethical_consensus = self.voting_engine._ethical_consensus_voting(proposal.votes, proposal)
        
        # Определение результата
        passed = (
            voting_results["quorum_reached"] and
            voting_results["support_ratio"] >= proposal.required_majority and
            ethical_consensus.get("consensus_reached", False)
        )
        
        # Обновление статуса
        proposal.status = ProposalStatus.PASSED if passed else ProposalStatus.REJECTED
        
        # Результаты
        results = {
            "proposal_id": proposal_id,
            "status": proposal.status.value,
            "voting_results": voting_results,
            "semantic_analysis": semantic_results,
            "ethical_consensus": ethical_consensus,
            "implementation_scheduled": passed,
            "next_steps": self._generate_next_steps(proposal, passed)
        }
        
        # Логирование финализации
        self.memory_manager.add_learning_interaction({
            "type": "proposal_finalized",
            "content": f"Предложение завершено: {proposal.title.get('ru', 'Unknown')}",
            "principle": "decentralized_dao",
            "ethical_weight": 1.0,
            "user_actions": ["proposal_finalization"],
            "final_status": proposal.status.value,
            "passed": passed
        })
        
        return results
    
    def _generate_next_steps(self, proposal: Proposal, passed: bool) -> List[str]:
        """Генерация следующих шагов"""
        
        if not passed:
            return [
                "Предложение не принято",
                "Возможна доработка и повторная подача",
                "Анализ комментариев сообщества"
            ]
        
        steps = ["Предложение принято к реализации"]
        
        if proposal.implementation_plan:
            steps.extend([
                "Создание плана реализации",
                f"Период ожидания: {self.governance_rules['implementation_rules']['cooling_off_period_hours']} часов",
                "Поэтапное внедрение с обратной связью сообщества"
            ])
        
        return steps
    
    def get_governance_statistics(self) -> Dict[str, Any]:
        """Получение статистики управления"""
        
        total_proposals = len(self.proposals)
        
        if total_proposals == 0:
            return {"total_proposals": 0}
        
        status_breakdown = defaultdict(int)
        type_breakdown = defaultdict(int)
        
        for proposal in self.proposals.values():
            status_breakdown[proposal.status.value] += 1
            type_breakdown[proposal.proposal_type.value] += 1
        
        # Статистика участия
        unique_voters = set()
        total_votes = 0
        
        for proposal in self.proposals.values():
            unique_voters.update(proposal.votes.keys())
            total_votes += len(proposal.votes)
        
        return {
            "total_proposals": total_proposals,
            "status_breakdown": dict(status_breakdown),
            "type_breakdown": dict(type_breakdown),
            "unique_participants": len(unique_voters),
            "total_votes_cast": total_votes,
            "average_votes_per_proposal": total_votes / total_proposals if total_proposals > 0 else 0,
            "governance_health_score": self._calculate_governance_health()
        }
    
    def _calculate_governance_health(self) -> float:
        """Расчёт здоровья системы управления"""
        
        if not self.proposals:
            return 0.5
        
        # Факторы здоровья
        factors = []
        
        # Участие сообщества
        total_votes = sum(len(p.votes) for p in self.proposals.values())
        avg_participation = total_votes / len(self.proposals)
        participation_score = min(avg_participation / 20, 1.0)  # Целевое участие: 20 голосов на предложение
        factors.append(participation_score)
        
        # Качество этических решений
        ethical_proposals = [p for p in self.proposals.values() if p.proposal_type == ProposalType.ETHICAL_POLICY]
        if ethical_proposals:
            ethical_pass_rate = len([p for p in ethical_proposals if p.status == ProposalStatus.PASSED]) / len(ethical_proposals)
            factors.append(ethical_pass_rate)
        
        # Разнообразие типов предложений
        unique_types = len(set(p.proposal_type for p in self.proposals.values()))
        diversity_score = min(unique_types / len(ProposalType), 1.0)
        factors.append(diversity_score)
        
        return sum(factors) / len(factors)

# Пример использования

def create_sample_proposals() -> List[Dict[str, Any]]:
    """Создание примеров предложений"""
    
    proposals = [
        {
            "title": {
                "ru": "Интеграция уроков экологии с VR технологиями",
                "en": "Integration of ecology lessons with VR technologies"
            },
            "description": {
                "ru": "Предложение по добавлению виртуальной реальности в уроки экологии для более глубокого понимания природных процессов",
                "en": "Proposal to add virtual reality to ecology lessons for deeper understanding of natural processes"
            },
            "type": "curriculum_update",
            "terra_principles": ["human-nature-symbiosis", "child-centric_learning"],
            "ethical_implications": {
                "positive_impacts": ["enhanced_environmental_awareness", "immersive_learning"],
                "risk_mitigation": ["screen_time_limits", "nature_balance_maintenance"]
            },
            "voting_days": 7,
            "budget": 0.0,
            "tags": ["vr", "ecology", "education", "technology"]
        },
        {
            "title": {
                "ru": "Кодекс этического поведения инструкторов",
                "en": "Instructor Ethical Behavior Code"
            },
            "description": {
                "ru": "Разработка комплексного кодекса этического поведения для всех инструкторов платформы AIUZ",
                "en": "Development of comprehensive ethical behavior code for all AIUZ platform instructors"
            },
            "type": "ethical_policy",
            "terra_principles": ["ethical_memory", "child-centric_learning"],
            "ethical_implications": {
                "positive_impacts": ["standardized_ethics", "child_protection", "quality_assurance"],
                "risk_mitigation": ["cultural_sensitivity", "diverse_perspectives_inclusion"]
            },
            "voting_days": 10,
            "budget": 0.0,
            "tags": ["ethics", "instructors", "policy", "standards"],
            "majority": 0.67  # Требует супербольшинства
        }
    ]
    
    return proposals

if __name__ == "__main__":
    print("🏛️ DAO & Reputation System v2.5 инициализирован")
    print("⚖️ Готов к децентрализованному управлению")
    
    # Создание системы
    memory_manager = TraceMemoryManager()
    dao_engine = DAOGovernanceEngine(memory_manager)
    
    # Добавление репутации тестовому пользователю
    test_user_id = "terra_user_001"
    dao_engine.reputation_manager.add_reputation_evidence(
        user_id=test_user_id,
        category=ReputationCategory.EDUCATIONAL_CONTRIBUTION,
        evidence_data={
            "type": "community_recognized",
            "description": "Разработка инновационного учебного сценария для изучения экосистем",
            "impact_level": "significant",
            "ethical_weight": 0.9
        }
    )
    
    # Создание примеров предложений
    sample_proposals = create_sample_proposals()
    created_proposals = []
    
    for proposal_data in sample_proposals:
        try:
            proposal_id = dao_engine.create_proposal(test_user_id, proposal_data)
            created_proposals.append(proposal_id)
            print(f"📝 Создано предложение: {proposal_id}")
        except ValueError as e:
            print(f"❌ Ошибка создания предложения: {e}")
    
    # Статистика управления
    governance_stats = dao_engine.get_governance_statistics()
    print(f"📊 Статистика DAO: {governance_stats}")
    
    # Профиль репутации пользователя
    reputation_profile = dao_engine.reputation_manager.get_user_reputation_profile(test_user_id)
    overall_reputation = dao_engine.reputation_manager.calculate_overall_reputation(test_user_id)
    
    print(f"👤 Репутация пользователя {test_user_id}:")
    print(f"   Общий балл: {overall_reputation:.2f}")
    print(f"   Профиль: {reputation_profile}")
    
    print("✅ DAO система готова к демократическому управлению Terra Codex!")
    print("🌍 Объединяя голоса сообщества для этического будущего образования")
```
