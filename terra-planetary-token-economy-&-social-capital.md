```python
# TERRA PLANETARY TOKEN ECONOMY
# Революционная блокчейн экосистема социального капитала

import hashlib
import datetime
from dataclasses import dataclass
from typing import List, Dict, Optional
from decimal import Decimal

@dataclass
class LivingBeing:
    """Базовый класс для всех живых существ в Terra экосистеме"""
    id: str
    species: str
    birth_date: datetime.datetime
    location: str
    social_capital: Decimal = Decimal('0')
    contribution_history: List = None
    
    def __post_init__(self):
        if self.contribution_history is None:
            self.contribution_history = []

class TerraTokenEconomy:
    """Планетарная токеновая экономика Terra"""
    
    def __init__(self):
        self.total_supply = Decimal('0')
        self.planetary_fund = Decimal('0')
        self.beings_registry = {}
        self.ecosystem_accounts = {}
        self.contribution_validators = []
        
    def register_being(self, being: LivingBeing):
        """Регистрирует живое существо в экосистеме"""
        # Базовый социальный капитал при рождении
        if being.species == 'homo_sapiens':
            base_capital = self.calculate_human_birth_capital(being)
        elif being.species in ['tree', 'forest_ecosystem']:
            base_capital = self.calculate_plant_birth_capital(being)
        elif being.species.startswith('animal_'):
            base_capital = self.calculate_animal_birth_capital(being)
        else:
            base_capital = Decimal('1.0')  # базовый капитал для любой жизни
            
        being.social_capital = base_capital
        self.beings_registry[being.id] = being
        self.total_supply += base_capital
        
        return being.id
    
    def calculate_human_birth_capital(self, child: LivingBeing):
        """Вычисляет начальный социальный капитал ребёнка"""
        
        # Находим родителей
        parents = self.find_parents(child)
        siblings = self.find_siblings(child)
        community = self.find_community(child)
        
        # Базовая формула наследования социального капитала
        parents_capital = sum(parent.social_capital for parent in parents) / len(parents) if parents else Decimal('10.0')
        siblings_capital = sum(sibling.social_capital for sibling in siblings) / len(siblings) if siblings else Decimal('0')
        community_capital = community.average_social_capital if community else Decimal('5.0')
        
        # Формула Terra: 50% от родителей + 10% от братьев/сестёр + 20% от сообщества + 20% базовый
        birth_capital = (
            parents_capital * Decimal('0.5') +
            siblings_capital * Decimal('0.1') +
            community_capital * Decimal('0.2') +
            Decimal('10.0')  # базовый дар жизни
        )
        
        return birth_capital
    
    def calculate_plant_birth_capital(self, plant: LivingBeing):
        """Социальный капитал растений"""
        if 'tree' in plant.species:
            return Decimal('50.0')  # деревья очень ценны
        elif 'forest' in plant.species:
            return Decimal('1000.0')  # леса бесценны
        else:
            return Decimal('5.0')  # обычные растения
    
    def calculate_animal_birth_capital(self, animal: LivingBeing):
        """Социальный капитал животных"""
        if 'endangered' in animal.species:
            return Decimal('100.0')  # исчезающие виды особенно ценны
        elif 'pollinator' in animal.species:
            return Decimal('25.0')  # опылители критичны для экосистемы
        else:
            return Decimal('10.0')  # базовый капитал животного
    
    def record_contribution(self, being_id: str, contribution_type: str, value: Decimal, validators: List[str]):
        """Записывает вклад существа в экосистему"""
        being = self.beings_registry.get(being_id)
        if not being:
            raise ValueError(f"Существо {being_id} не найдено")
        
        # Создаём запись о вкладе
        contribution = {
            'timestamp': datetime.datetime.now(),
            'type': contribution_type,
            'value': value,
            'validators': validators,
            'hash': self.generate_contribution_hash(being_id, contribution_type, value)
        }
        
        # Проверяем валидность через сеть валидаторов
        if self.validate_contribution(contribution):
            being.contribution_history.append(contribution)
            being.social_capital += value
            self.total_supply += value
            self.planetary_fund += value * Decimal('0.1')  # 10% в планетарный фонд
            
            return contribution['hash']
        else:
            raise ValueError("Вклад не прошёл валидацию")
    
    def generate_contribution_hash(self, being_id: str, contribution_type: str, value: Decimal):
        """Генерирует уникальный хеш для вклада"""
        data = f"{being_id}{contribution_type}{value}{datetime.datetime.now().isoformat()}"
        return hashlib.sha256(data.encode()).hexdigest()
    
    def validate_contribution(self, contribution: Dict) -> bool:
        """Валидирует вклад через сеть наблюдателей"""
        # В реальной системе это будет консенсус алгоритм
        return len(contribution['validators']) >= 3

class TerraContributionTypes:
    """Типы вкладов в Terra экосистему"""
    
    # Детские вклады
    CURIOSITY_QUESTION = "curiosity_question"  # ребёнок задал интересный вопрос
    CREATIVE_PROJECT = "creative_project"      # создал творческий проект
    HELPING_OTHERS = "helping_others"          # помог другим детям или взрослым
    NATURE_CARE = "nature_care"               # ухаживал за растениями/животными
    LEARNING_MILESTONE = "learning_milestone"  # достиг нового уровня понимания
    
    # Растительные вклады
    OXYGEN_PRODUCTION = "oxygen_production"    # производство кислорода
    CARBON_SEQUESTRATION = "carbon_capture"   # поглощение углерода
    SOIL_IMPROVEMENT = "soil_building"        # улучшение почвы
    BIODIVERSITY_SUPPORT = "biodiversity"     # поддержка биоразнообразия
    
    # Животные вклады
    POLLINATION = "pollination"               # опыление растений
    SEED_DISPERSAL = "seed_dispersal"         # распространение семян
    NATURAL_PEST_CONTROL = "pest_control"     # естественная борьба с вредителями
    ECOSYSTEM_BALANCE = "ecosystem_balance"   # поддержание экологического баланса
    
    # Человеческие вклады
    EDUCATION = "education"                   # обучение и передача знаний
    INNOVATION = "innovation"                 # создание новых решений
    COMMUNITY_BUILDING = "community"          # укрепление сообщества
    ENVIRONMENTAL_RESTORATION = "restoration" # восстановление экосистем

class TerraBasicIncome:
    """Система базового обеспечения для всех существ"""
    
    def __init__(self, token_economy: TerraTokenEconomy):
        self.economy = token_economy
        self.daily_rates = self.setup_daily_rates()
    
    def setup_daily_rates(self):
        """Устанавливает ежедневные базовые ставки"""
        return {
            'human_child': Decimal('2.0'),      # дети получают больше
            'human_adult': Decimal('1.0'),      # взрослые получают базовую ставку
            'tree_mature': Decimal('1.5'),      # зрелые деревья много дают экосистеме
            'tree_young': Decimal('0.5'),       # молодые деревья ещё растут
            'animal_large': Decimal('0.8'),     # крупные животные
            'animal_small': Decimal('0.3'),     # мелкие животные
            'pollinator': Decimal('1.2'),       # опылители критически важны
            'aquatic_life': Decimal('0.6'),     # водная жизнь
            'soil_microorganism': Decimal('0.1') # почвенные микроорганизмы
        }
    
    def distribute_daily_income(self):
        """Распределяет ежедневный базовый доход"""
        total_distributed = Decimal('0')
        
        for being_id, being in self.economy.beings_registry.items():
            category = self.categorize_being(being)
            daily_amount = self.daily_rates.get(category, Decimal('0.1'))
            
            # Учитываем возраст и состояние здоровья
            age_multiplier = self.calculate_age_multiplier(being)
            health_multiplier = self.assess_health_status(being)
            
            final_amount = daily_amount * age_multiplier * health_multiplier
            
            being.social_capital += final_amount
            total_distributed += final_amount
        
        # Покрываем из планетарного фонда
        self.economy.planetary_fund -= total_distributed
        
        return total_distributed
    
    def categorize_being(self, being: LivingBeing) -> str:
        """Категоризирует существо для определения ставки"""
        if being.species == 'homo_sapiens':
            age_years = (datetime.datetime.now() - being.birth_date).days / 365
            return 'human_child' if age_years < 18 else 'human_adult'
        elif 'tree' in being.species:
            age_years = (datetime.datetime.now() - being.birth_date).days / 365
            return 'tree_mature' if age_years > 5 else 'tree_young'
        # ... другие категории
        
        return 'unknown'
    
    def calculate_age_multiplier(self, being: LivingBeing) -> Decimal:
        """Возрастной множитель"""
        age_days = (datetime.datetime.now() - being.birth_date).days
        
        if being.species == 'homo_sapiens':
            age_years = age_days / 365
            if age_years < 1:
                return Decimal('2.0')  # младенцы особенно уязвимы
            elif age_years < 5:
                return Decimal('1.8')  # дошкольники
            elif age_years < 12:
                return Decimal('1.5')  # младшие школьники
            elif age_years < 18:
                return Decimal('1.3')  # подростки
            else:
                return Decimal('1.0')  # взрослые
        
        return Decimal('1.0')  # базовый множитель
    
    def assess_health_status(self, being: LivingBeing) -> Decimal:
        """Оценивает состояние здоровья существа"""
        # В реальной системе это будет основано на данных сенсоров
        # Пока возвращаем базовое значение
        return Decimal('1.0')

class TerraBlockchain:
    """Блокчейн для Terra экосистемы"""
    
    def __init__(self):
        self.chain = []
        self.pending_transactions = []
        self.create_genesis_block()
    
    def create_genesis_block(self):
        """Создаёт первый блок в цепи"""
        genesis_block = {
            'index': 0,
            'timestamp': datetime.datetime.now(),
            'transactions': [{
                'type': 'genesis',
                'message': 'qariya.terra.blockchain.birth() → planetary.consciousness.activated',
                'value': Decimal('1000000.0')  # начальный планетарный фонд
            }],
            'previous_hash': '0',
            'nonce': 0
        }
        genesis_block['hash'] = self.calculate_hash(genesis_block)
        self.chain.append(genesis_block)
    
    def calculate_hash(self, block):
        """Вычисляет хеш блока"""
        block_string = str(block['index']) + str(block['timestamp']) + str(block['transactions']) + str(block['previous_hash']) + str(block['nonce'])
        return hashlib.sha256(block_string.encode()).hexdigest()
    
    def add_transaction(self, transaction):
        """Добавляет транзакцию в пул ожидающих"""
        self.pending_transactions.append(transaction)
    
    def mine_block(self, mining_reward_address):
        """Майнит новый блок"""
        # В Terra экосистеме майнинг = валидация вкладов в экосистему
        block = {
            'index': len(self.chain),
            'timestamp': datetime.datetime.now(),
            'transactions': self.pending_transactions,
            'previous_hash': self.chain[-1]['hash'],
            'nonce': 0
        }
        
        # Proof of Contribution вместо Proof of Work
        block['hash'] = self.proof_of_contribution(block)
        
        self.chain.append(block)
        self.pending_transactions = []
        
        return block
    
    def proof_of_contribution(self, block):
        """Доказательство вклада в экосистему вместо вычислительной работы"""
        # Упрощённая версия - в реальности сложный алгоритм валидации вкладов
        return self.calculate_hash(block)

class TerraGovernance:
    """Система управления Terra экосистемой"""
    
    def __init__(self, token_economy: TerraTokenEconomy):
        self.economy = token_economy
        self.proposals = []
        self.voting_power_calculation = 'quadratic'  # квадратичное голосование
    
    def create_proposal(self, proposer_id: str, title: str, description: str, 
                       implementation_cost: Decimal):
        """Создаёт предложение для голосования"""
        proposal = {
            'id': hashlib.sha256(f"{title}{datetime.datetime.now()}".encode()).hexdigest()[:16],
            'proposer': proposer_id,
            'title': title,
            'description': description,
            'cost': implementation_cost,
            'votes_for': Decimal('0'),
            'votes_against': Decimal('0'),
            'voters': [],
            'status': 'active',
            'created_at': datetime.datetime.now()
        }
        
        self.proposals.append(proposal)
        return proposal['id']
    
    def vote(self, proposal_id: str, voter_id: str, vote_power: Decimal, 
             vote_direction: str):
        """Голосование по предложению"""
        proposal = next((p for p in self.proposals if p['id'] == proposal_id), None)
        if not proposal:
            raise ValueError("Предложение не найдено")
        
        voter = self.economy.beings_registry.get(voter_id)
        if not voter:
            raise ValueError("Голосующий не найден")
        
        # Квадратичное голосование: стоимость растёт квадратично
        voting_cost = vote_power ** 2
        
        if voter.social_capital < voting_cost:
            raise ValueError("Недостаточно социального капитала для голосования")
        
        # Списываем стоимость голосования
        voter.social_capital -= voting_cost
        
        # Записываем голос
        if vote_direction == 'for':
            proposal['votes_for'] += vote_power
        else:
            proposal['votes_against'] += vote_power
        
        proposal['voters'].append({
            'voter_id': voter_id,
            'power': vote_power,
            'direction': vote_direction,
            'timestamp': datetime.datetime.now()
        })
    
    def execute_proposal(self, proposal_id: str):
        """Исполняет принятое предложение"""
        proposal = next((p for p in self.proposals if p['id'] == proposal_id), None)
        if not proposal:
            raise ValueError("Предложение не найдено")
        
        total_votes = proposal['votes_for'] + proposal['votes_against']
        if total_votes == 0:
            return False
        
        approval_rate = proposal['votes_for'] / total_votes
        
        # Требуется 60% для принятия
        if approval_rate >= Decimal('0.6'):
            # Списываем средства из планетарного фонда
            if self.economy.planetary_fund >= proposal['cost']:
                self.economy.planetary_fund -= proposal['cost']
                proposal['status'] = 'executed'
                return True
            else:
                proposal['status'] = 'insufficient_funds'
                return False
        else:
            proposal['status'] = 'rejected'
            return False

# Пример использования
def demo_terra_economy():
    """Демонстрация работы Terra экономики"""
    
    # Создаём экономику
    economy = TerraTokenEconomy()
    basic_income = TerraBasicIncome(economy)
    blockchain = TerraBlockchain()
    governance = TerraGovernance(economy)
    
    # Регистрируем детей
    alice = LivingBeing(
        id="alice_child_001",
        species="homo_sapiens",
        birth_date=datetime.datetime(2020, 3, 15),
        location="terra_point_tashkent"
    )
    
    bob = LivingBeing(
        id="bob_child_002", 
        species="homo_sapiens",
        birth_date=datetime.datetime(2019, 7, 22),
        location="terra_point_samarkand"
    )
    
    # Регистрируем дерево
    old_oak = LivingBeing(
        id="oak_tree_001",
        species="tree_oak_ancient",
        birth_date=datetime.datetime(1950, 4, 1),
        location="terra_point_tashkent"
    )
    
    # Регистрируем пчёл
    bee_colony = LivingBeing(
        id="bee_colony_001",
        species="animal_pollinator_bee",
        birth_date=datetime.datetime(2024, 5, 1),
        location="terra_point_tashkent"
    )
    
    # Регистрируем всех в системе
    economy.register_being(alice)
    economy.register_being(bob)
    economy.register_being(old_oak)
    economy.register_being(bee_colony)
    
    print(f"Алиса начальный капитал: {alice.social_capital}")
    print(f"Боб начальный капитал: {bob.social_capital}")
    print(f"Дуб начальный капитал: {old_oak.social_capital}")
    print(f"Пчёлы начальный капитал: {bee_colony.social_capital}")
    
    # Записываем вклады
    economy.record_contribution(
        alice.id, 
        TerraContributionTypes.CURIOSITY_QUESTION,
        Decimal('5.0'),
        ['teacher_001', 'parent_001', 'ai_validator_001']
    )
    
    economy.record_contribution(
        old_oak.id,
        TerraContributionTypes.OXYGEN_PRODUCTION,
        Decimal('10.0'),
        ['sensor_001', 'scientist_001', 'ai_validator_002']
    )
    
    # Распределяем базовый доход
    daily_distributed = basic_income.distribute_daily_income()
    print(f"Ежедневно распределено: {daily_distributed}")
    
    # Создаём предложение
    proposal_id = governance.create_proposal(
        alice.id,
        "Новая детская площадка в Terra Point",
        "Построить безопасную игровую зону для детей",
        Decimal('100.0')
    )
    
    # Голосуем
    governance.vote(proposal_id, alice.id, Decimal('3.0'), 'for')
    governance.vote(proposal_id, bob.id, Decimal('2.0'), 'for')
    
    # Исполняем предложение
    executed = governance.execute_proposal(proposal_id)
    print(f"Предложение исполнено: {executed}")
    
    return economy, basic_income, blockchain, governance

if __name__ == "__main__":
    demo_terra_economy()
```
