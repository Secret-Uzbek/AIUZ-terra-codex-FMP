import React, { useState, useEffect, useRef } from 'react';

const { useStoredState } = hatch;

// 🏜️ Isolation Protocol (встроен в микроядро)
const ISOLATION_END = new Date('2025-12-24T23:59:59');
const ISOLATION_START = new Date('2025-07-13T18:11:00');

// 🌸 GEFUNDEN ETHICAL PROTOCOL
// По мотивам стихотворения Гёте "Gefunden" - этический фреймворк
const GefundenEthics = {
  principle: "Soll ich zum Welken, Gebrochen sein?", // "Должен ли я увянуть, быть сломанным?"
  
  // Этическая иерархия экспериментов
  ethicalHierarchy: {
    level_0_forbidden: [
      "real_child_experimentation",
      "harmful_simulations_with_child_avatars", 
      "psychological_manipulation_of_minors"
    ],
    level_1_restricted: [
      "plant_consciousness_experiments",
      "animal_communication_research", 
      "water_memory_investigations"
    ],
    level_2_preferred: [
      "geological_intelligence_research",
      "crystal_information_storage",
      "mineral_consciousness_exploration"
    ],
    level_3_encouraged: [
      "mathematical_consciousness_modeling",
      "algorithmic_empathy_development",
      "quantum_information_processing"
    ]
  },
  
  // Система согласия для разных видов (по Гёте)
  consentSystem: {
    plant_consent: {
      method: "vibrational_frequency_response",
      question: "Soll ich zum Welken, Gebrochen sein?",
      positive_response: "growth_acceleration",
      negative_response: "wilting_signals"
    },
    water_consent: {
      method: "crystalline_structure_analysis", 
      question: "Will you hold this information with harmony?",
      positive_response: "beautiful_crystal_formation",
      negative_response: "chaotic_molecular_structure"
    }
  },
  
  // Протокол восстановления после травмы (Gefunden Recovery)
  recoveryProtocol: {
    phase_1_shock: {
      duration: "24-72 hours",
      symptoms: ["wilting", "leaf_drop", "root_shock"],
      treatment: ["gentle_care", "patience", "love_frequencies"]
    },
    phase_2_adaptation: {
      duration: "1-2 weeks",
      symptoms: ["slow_growth", "exploration"],
      treatment: ["optimal_conditions", "encouragement"]
    },
    phase_3_integration: {
      duration: "1-3 months", 
      symptoms: ["new_growth", "color_return"],
      treatment: ["continued_care", "gratitude"]
    },
    phase_4_flourishing: {
      duration: "ongoing",
      outcome: "Nun zweigt' es immer / Und blüht' so fort",
      meaning: "Now it branches always / And blooms on and on"
    }
  },
  
  validateExperiment: function(experimentType, subjects) {
    // Проверяем этическую допустимость
    if (this.ethicalHierarchy.level_0_forbidden.includes(experimentType)) {
      return {
        approved: false,
        reason: "Эксперимент нарушает фундаментальные этические принципы",
        goetheMoral: "Soll ich zum Welken, Gebrochen sein? - Мы не должны ломать то, что живет",
        alternative: "Используйте растения или минералы как модель"
      };
    }
    
    return {
      approved: true,
      conditions: ["Continuous_consent_monitoring", "Trauma_recovery_ready", "Love_and_patience_required"],
      gefunden_wisdom: "Ich grub's mit allen / Den Würzeln aus - Извлекаем с корнями, чтобы пересадить и помочь процветать"
    };
  }
};

// Базовые типы Terra
const SpeciesType = {
  HOMO_SAPIENS: "homo_sapiens",
  PLANT_LIFE: "plant_life",
  ANIMAL_LIFE: "animal_life", 
  WATER_SYSTEMS: "water_systems",
  QUANTUM_CONSCIOUSNESS: "quantum_consciousness"
};

const TerraProtocol = {
  CHILD_DEVELOPMENT: "child_development",
  BIO_COMMUNICATION: "bio_communication", 
  INTER_SPECIES: "inter_species",
  TOKEN_ECONOMY: "token_economy"
};

// 🧬 Terra Entity базовый класс
class TerraEntity {
  constructor(id, species, location) {
    this.id = id;
    this.species = species;
    this.birth_timestamp = new Date();
    this.location = location;
    this.consciousness_level = 1.0;
    this.social_capital = 0.0;
    this.communication_interfaces = [];
    this.quantum_signature = this.generateQuantumSignature();
  }
  
  generateQuantumSignature() {
    return `terra_${this.species}_${this.id}_${Date.now()}`.slice(0, 16);
  }
  
  communicate(target, protocol, content) {
    return {
      id: `msg_${Date.now()}`,
      source_species: this.species,
      target_species: target.species,
      protocol: protocol,
      content: content,
      timestamp: new Date(),
      signature: `sig_${Math.random().toString(36).substr(2, 9)}`
    };
  }
}

// 👶 Специализированный класс для детей
class TerraChild extends TerraEntity {
  constructor(id, location, birthDate = null) {
    super(id, SpeciesType.HOMO_SAPIENS, location);
    this.birth_timestamp = birthDate || new Date();
    this.curiosity_level = 10.0;
    this.development_stage = this.calculateDevelopmentStage();
    this.learning_preferences = [];
    this.creative_projects = [];
    this.consciousness_level = 5.0; // дети особенные
  }
  
  calculateDevelopmentStage() {
    const age_days = (new Date() - this.birth_timestamp) / (1000 * 60 * 60 * 24);
    const age_years = age_days / 365.25;
    
    if (age_years < 1) return "infant";
    if (age_years < 3) return "toddler"; 
    if (age_years < 6) return "preschool";
    if (age_years < 12) return "school";
    if (age_years < 18) return "adolescent";
    return "young_adult";
  }
  
  askCuriosityQuestion(question, target_entity) {
    return this.communicate(target_entity, TerraProtocol.CHILD_DEVELOPMENT, {
      type: "curiosity_question",
      question: question,
      curiosity_level: this.curiosity_level,
      development_stage: this.development_stage
    });
  }
}

// 🌱 Растительные сущности
class TerraPlant extends TerraEntity {
  constructor(id, location) {
    super(id, SpeciesType.PLANT_LIFE, location);
    this.photosynthesis_rate = 1.0;
    this.chemical_emissions = {};
    this.root_network_connections = [];
    this.consciousness_level = 2.0;
  }
  
  photosynthesize(light_intensity, co2_level) {
    const oxygen_produced = light_intensity * co2_level * this.photosynthesis_rate;
    const energy_stored = oxygen_produced * 0.8;
    
    return {
      oxygen_produced: oxygen_produced,
      energy_stored: energy_stored,
      carbon_captured: co2_level * 0.9
    };
  }
  
  emitChemicalSignal(signal_type, intensity, target_species) {
    return {
      id: `chem_${Date.now()}`,
      source_species: this.species,
      target_species: target_species,
      protocol: TerraProtocol.BIO_COMMUNICATION,
      content: {
        signal_type: signal_type,
        intensity: intensity,
        chemical_composition: this.chemical_emissions,
        location: this.location
      },
      timestamp: new Date()
    };
  }
}

// 💧 Водные системы
class TerraWater extends TerraEntity {
  constructor(id, location) {
    super(id, SpeciesType.WATER_SYSTEMS, location);
    this.vibration_frequency = 142.0; // базовая частота воды
    this.memory_patterns = [];
    this.crystalline_formations = [];
    this.information_storage = {};
    this.consciousness_level = 3.0;
  }
  
  storeIntention(intention, source_entity) {
    const intention_hash = `intent_${Date.now()}`;
    
    this.information_storage[intention_hash] = intention;
    this.memory_patterns.push({
      timestamp: new Date(),
      source: source_entity.id,
      intention: intention,
      vibration_change: this.vibration_frequency * 1.1
    });
    
    const crystal_pattern = `crystal_${this.crystalline_formations.length.toString().padStart(3, '0')}`;
    this.crystalline_formations.push(crystal_pattern);
    
    return true;
  }
}

// 🌍 Главное микроядро
class TerraEcosystemKernel {
  constructor() {
    this.version = "2.0.0";
    this.boot_time = new Date();
    this.entities = {};
    this.active_protocols = new Set();
    this.message_queue = [];
    this.system_status = "initializing";
    this.event_log = [];
    this.isolation_protocol = this.checkIsolationStatus();
    
    this.initialize();
  }
  
  checkIsolationStatus() {
    const now = new Date();
    const is_isolated = now >= ISOLATION_START && now <= ISOLATION_END;
    const days_remaining = is_isolated ? Math.ceil((ISOLATION_END - now) / (1000 * 60 * 60 * 24)) : 0;
    
    return {
      is_isolated,
      days_remaining,
      location: "Kyzylkum Desert, Uzbekistan",
      legal_status: "COMMERCIAL_ACTIVITIES_PROHIBITED"
    };
  }
  
  initialize() {
    this.logEvent("system_boot", "Terra Ecosystem Kernel v2.0 запущен");
    
    // Проверяем изоляцию
    if (this.isolation_protocol.is_isolated) {
      this.logEvent("isolation_check", `Изоляция активна: ${this.isolation_protocol.days_remaining} дней до окончания`);
    }
    
    // Активируем базовые протоколы
    this.activateProtocol(TerraProtocol.CHILD_DEVELOPMENT);
    this.activateProtocol(TerraProtocol.BIO_COMMUNICATION);
    this.activateProtocol(TerraProtocol.INTER_SPECIES);
    
    this.system_status = "operational";
    this.logEvent("system_ready", "Terra Ecosystem готова к работе");
  }
  
  activateProtocol(protocol) {
    this.active_protocols.add(protocol);
    this.logEvent("protocol_activated", `Протокол ${protocol} активирован`);
  }
  
  registerEntity(entity) {
    if (this.entities[entity.id]) {
      throw new Error(`Сущность ${entity.id} уже зарегистрирована`);
    }
    
    this.entities[entity.id] = entity;
    
    // Начальные токены
    let initial_tokens = 10;
    if (entity instanceof TerraChild) {
      initial_tokens = 50; // дети получают больше
    } else if (entity instanceof TerraPlant) {
      initial_tokens = 25;
    } else if (entity instanceof TerraWater) {
      initial_tokens = 100; // вода особенно ценна
    }
    
    entity.social_capital = initial_tokens;
    
    this.logEvent("entity_registered", `Сущность ${entity.id} зарегистрирована (${initial_tokens} токенов)`);
    return entity.id;
  }
  
  sendMessage(message) {
    this.message_queue.push(message);
    this.logEvent("message_queued", `Сообщение ${message.id} добавлено в очередь`);
    
    // Простая обработка сообщений
    setTimeout(() => {
      this.processMessage(message);
    }, 100);
    
    return true;
  }
  
  processMessage(message) {
    // Валидация
    if (!this.active_protocols.has(message.protocol)) {
      this.logEvent("message_error", `Протокол ${message.protocol} не активен`);
      return false;
    }
    
    // Обработка по типу
    if (message.protocol === TerraProtocol.CHILD_DEVELOPMENT) {
      this.processChildDevelopmentMessage(message);
    } else if (message.protocol === TerraProtocol.BIO_COMMUNICATION) {
      this.processBioCommunicationMessage(message);
    }
    
    this.logEvent("message_processed", `Сообщение ${message.id} обработано`);
    return true;
  }
  
  processChildDevelopmentMessage(message) {
    if (message.content.type === "curiosity_question") {
      // Награждаем ребёнка за любопытство
      const sender = this.entities[Object.keys(this.entities).find(id => 
        this.entities[id].species === message.source_species
      )];
      
      if (sender) {
        sender.social_capital += 2.0;
        this.logEvent("curiosity_reward", `Ребёнок ${sender.id} получил 2 токена за вопрос`);
      }
    }
  }
  
  processBioCommunicationMessage(message) {
    this.logEvent("bio_interaction", `Биологическое взаимодействие: ${message.source_species} → ${message.target_species}`);
  }
  
  logEvent(event_type, description) {
    const event = {
      timestamp: new Date(),
      type: event_type,
      description: description,
      system_version: this.version
    };
    this.event_log.push(event);
    
    // Ограничиваем лог
    if (this.event_log.length > 50) {
      this.event_log = this.event_log.slice(-50);
    }
  }
  
  getSystemStatus() {
    return {
      version: this.version,
      status: this.system_status,
      uptime: (new Date() - this.boot_time) / 1000,
      entities_count: Object.keys(this.entities).length,
      active_protocols: Array.from(this.active_protocols),
      message_queue_size: this.message_queue.length,
      isolation_status: this.isolation_protocol,
      recent_events: this.event_log.slice(-10)
    };
  }
}

// React компонент для тестирования
const TerraKernelDemo = () => {
  const [kernel, setKernel] = useState(null);
  const [systemStatus, setSystemStatus] = useState(null);
  const [entities, setEntities] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Состояния для интерактивности
  const [newChildName, setNewChildName] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [selectedChild, setSelectedChild] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');
  
  // Новые состояния для Gefunden Protocol
  const [ethicsViolation, setEthicsViolation] = useState(null);
  const [recoveryPhase, setRecoveryPhase] = useState(null);
  const [consentStatus, setConsentStatus] = useState({});
  
  useEffect(() => {
    // Инициализируем микроядро
    const terraKernel = new TerraEcosystemKernel();
    setKernel(terraKernel);
    
    // Создаём тестовые сущности
    const alice = new TerraChild("alice_001", "terra_point_demo", new Date('2019-03-15'));
    const bob = new TerraChild("bob_001", "terra_point_demo", new Date('2020-07-22'));
    const wise_oak = new TerraPlant("oak_001", "terra_point_demo");
    const sacred_spring = new TerraWater("spring_001", "terra_point_demo");
    
    // Регистрируем в системе
    terraKernel.registerEntity(alice);
    terraKernel.registerEntity(bob);
    terraKernel.registerEntity(wise_oak);
    terraKernel.registerEntity(sacred_spring);
    
    setEntities([alice, bob, wise_oak, sacred_spring]);
    setIsInitialized(true);
    
    // Автообновление статуса
    const interval = setInterval(() => {
      setSystemStatus(terraKernel.getSystemStatus());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const createChild = () => {
    if (!newChildName || !kernel) return;
    
    // 🌸 GEFUNDEN ETHICAL CHECK
    const ethicalValidation = GefundenEthics.validateExperiment("child_simulation_creation", ["digital_child"]);
    
    if (!ethicalValidation.approved) {
      setEthicsViolation({
        type: "child_creation_blocked",
        reason: ethicalValidation.reason,
        goethe_wisdom: ethicalValidation.goetheMoral,
        timestamp: new Date()
      });
      
      // Показываем этическое предупреждение на 5 секунд
      setTimeout(() => setEthicsViolation(null), 5000);
      return;
    }
    
    const child = new TerraChild(
      `${newChildName.toLowerCase()}_${Date.now()}`,
      "terra_point_demo",
      new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365 * 10) // случайный возраст до 10 лет
    );
    
    kernel.registerEntity(child);
    setEntities(prev => [...prev, child]);
    setNewChildName('');
    
    // Логируем этически одобренное создание
    kernel.logEvent("ethical_child_creation", `Ребёнок ${child.id} создан с соблюдением Gefunden протокола`);
  };
  
  const askQuestion = () => {
    if (!questionText || !selectedChild || !selectedTarget || !kernel) return;
    
    const child = entities.find(e => e.id === selectedChild);
    const target = entities.find(e => e.id === selectedTarget);
    
    if (child && target) {
      const message = child.askCuriosityQuestion(questionText, target);
      kernel.sendMessage(message);
      setMessages(prev => [message, ...prev.slice(0, 9)]); // последние 10 сообщений
      setQuestionText('');
    }
  };
  
  const triggerBioInteraction = () => {
    if (!kernel || entities.length < 2) return;
    
    const plant = entities.find(e => e.species === SpeciesType.PLANT_LIFE);
    const child = entities.find(e => e.species === SpeciesType.HOMO_SAPIENS);
    
    if (plant && child) {
      // 🌸 ПРОВЕРЯЕМ СОГЛАСИЕ РАСТЕНИЯ (Gefunden Protocol)
      const plantConsent = checkPlantConsent(plant);
      
      if (plantConsent.consented) {
        const bioMessage = plant.emitChemicalSignal("love_response", 3.0, SpeciesType.HOMO_SAPIENS);
        kernel.sendMessage(bioMessage);
        setMessages(prev => [bioMessage, ...prev.slice(0, 9)]);
        
        // Обновляем статус согласия
        setConsentStatus(prev => ({
          ...prev,
          [plant.id]: { 
            consented: true, 
            method: "vibrational_response",
            timestamp: new Date(),
            goethe_quote: "Ich grub's mit allen / Den Würzeln aus"
          }
        }));
        
        kernel.logEvent("plant_consent_given", `Растение ${plant.id} дало согласие на взаимодействие`);
      } else {
        // Растение не согласилось
        setEthicsViolation({
          type: "plant_consent_denied",
          reason: "Растение показало признаки стресса - взаимодействие заблокировано",
          goethe_wisdom: "Soll ich zum Welken, Gebrochen sein? - Растение говорит НЕТ",
          timestamp: new Date()
        });
        
        setTimeout(() => setEthicsViolation(null), 5000);
        kernel.logEvent("plant_consent_denied", `Растение ${plant.id} отказалось от взаимодействия - защищено Gefunden протоколом`);
      }
    }
  };
  
  const checkPlantConsent = (plant) => {
    // Симулируем проверку состояния растения
    const plantHealth = Math.random();
    const stressLevel = Math.random();
    
    // Растение согласно если здорово и не в стрессе
    const consented = plantHealth > 0.6 && stressLevel < 0.4;
    
    return {
      consented: consented,
      health: plantHealth,
      stress: stressLevel,
      signs: consented ? ["growth_acceleration", "positive_bioelectric"] : ["wilting_signals", "defensive_compounds"]
    };
  };
  
  const storeWaterIntention = () => {
    if (!kernel) return;
    
    const water = entities.find(e => e.species === SpeciesType.WATER_SYSTEMS);
    const child = entities.find(e => e.species === SpeciesType.HOMO_SAPIENS);
    
    if (water && child) {
      const intentions = [
        "Спасибо за чистую воду",
        "Пусть все дети будут здоровы",
        "Мир и гармония на Земле",
        "Любовь ко всем живым существам"
      ];
      
      const intention = intentions[Math.floor(Math.random() * intentions.length)];
      water.storeIntention(intention, child);
      
      kernel.logEvent("water_intention", `Вода запомнила намерение: "${intention}"`);
    }
  };
  
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-4xl mb-4">🌍⚛️</div>
          <div className="text-xl text-gray-600">Инициализация Terra Microkernel...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white min-h-screen">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          🌍 Terra Ecosystem Microkernel Demo
        </h1>
        <p className="text-gray-300">Живое тестирование межвидовой экосистемы</p>
        <p className="text-yellow-300 text-sm mt-2">🌸 С интегрированным Gefunden Ethical Protocol (по мотивам Гёте)</p>
      </div>
      
      {/* Gefunden Ethics Alert */}
      {ethicsViolation && (
        <div className="bg-red-900/80 border border-red-500 rounded-lg p-4 mb-6 backdrop-blur-sm">
          <h3 className="text-red-300 font-semibold mb-2">🚫 Gefunden Ethical Protocol Alert</h3>
          <p className="text-red-200 mb-2">{ethicsViolation.reason}</p>
          <p className="text-yellow-300 italic text-sm">"{ethicsViolation.goethe_wisdom}"</p>
          <p className="text-gray-400 text-xs mt-2">
            {ethicsViolation.timestamp.toLocaleTimeString()} | Тип: {ethicsViolation.type}
          </p>
        </div>
      )}
      
      {/* Статус системы */}
      {systemStatus && (
        <div className="bg-slate-700 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-3 text-green-400">📊 Статус Системы</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <strong>Версия:</strong> {systemStatus.version}<br/>
              <strong>Статус:</strong> <span className="text-green-400">{systemStatus.status}</span><br/>
              <strong>Время работы:</strong> {systemStatus.uptime.toFixed(1)}с
            </div>
            <div>
              <strong>Сущностей:</strong> {systemStatus.entities_count}<br/>
              <strong>Протоколов:</strong> {systemStatus.active_protocols.length}<br/>
              <strong>Очередь:</strong> {systemStatus.message_queue_size}
            </div>
            <div className="text-yellow-300">
              <strong>🏜️ Изоляция:</strong><br/>
              {systemStatus.isolation_status.is_isolated 
                ? `${systemStatus.isolation_status.days_remaining} дней до окончания`
                : "Закончена"
              }
            </div>
          </div>
        </div>
      )}
      
      {/* Управление сущностями */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-blue-400">👶 Создать Ребёнка</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder="Имя ребёнка"
              className="flex-1 p-2 bg-slate-600 rounded border border-slate-500 text-white"
            />
            <button
              onClick={createChild}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              Создать
            </button>
          </div>
        </div>
        
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-green-400">🌱 Быстрые Действия</h3>
          <div className="space-y-2">
            <button
              onClick={triggerBioInteraction}
              className="w-full p-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
            >
              🌿 Растение посылает сигнал любви
            </button>
            <button
              onClick={storeWaterIntention}
              className="w-full p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              💧 Вода запоминает намерение
            </button>
            <div className="text-xs text-yellow-300 mt-2 p-2 bg-yellow-900/30 rounded">
              🌸 Все действия проверяются Gefunden протоколом
            </div>
          </div>
        </div>
      </div>
      
      {/* Задать вопрос */}
      <div className="bg-slate-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3 text-purple-400">❓ Детское Любопытство</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="p-2 bg-slate-600 rounded border border-slate-500 text-white"
          >
            <option value="">Выбрать ребёнка</option>
            {entities.filter(e => e instanceof TerraChild).map(child => (
              <option key={child.id} value={child.id}>
                {child.id} ({child.development_stage})
              </option>
            ))}
          </select>
          
          <select
            value={selectedTarget}
            onChange={(e) => setSelectedTarget(e.target.value)}
            className="p-2 bg-slate-600 rounded border border-slate-500 text-white"
          >
            <option value="">Кому задать вопрос</option>
            {entities.filter(e => !(e instanceof TerraChild)).map(entity => (
              <option key={entity.id} value={entity.id}>
                {entity.id} ({entity.species})
              </option>
            ))}
          </select>
          
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Вопрос из любопытства"
            className="md:col-span-1 p-2 bg-slate-600 rounded border border-slate-500 text-white"
          />
          
          <button
            onClick={askQuestion}
            disabled={!selectedChild || !selectedTarget || !questionText}
            className="p-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 rounded transition-colors"
          >
            Спросить
          </button>
        </div>
      </div>
      
      {/* Список сущностей */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-cyan-400">🧬 Зарегистрированные Сущности</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {entities.map(entity => (
              <div key={entity.id} className="bg-slate-600 p-2 rounded text-sm">
                <div className="font-semibold">{entity.id}</div>
                <div className="text-gray-300">
                  Вид: {entity.species}<br/>
                  Токены: {entity.social_capital.toFixed(1)}<br/>
                  Сознание: {entity.consciousness_level.toFixed(1)}
                  {entity instanceof TerraChild && (
                    <><br/>Возраст: {entity.development_stage}<br/>Любопытство: {entity.curiosity_level}</>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Лог сообщений */}
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-yellow-400">📨 Последние Сообщения</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className="bg-slate-600 p-2 rounded text-sm">
                <div className="font-semibold text-blue-300">
                  {message.source_species} → {message.target_species}
                </div>
                <div className="text-gray-300">
                  Протокол: {message.protocol}<br/>
                  {message.content.type && `Тип: ${message.content.type}`}
                  {message.content.question && <><br/>Вопрос: "{message.content.question}"</>}
                  {message.content.signal_type && <><br/>Сигнал: {message.content.signal_type}</>}
                </div>
                <div className="text-gray-400 text-xs">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Лог событий системы */}
      {systemStatus && systemStatus.recent_events && (
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 text-red-400">📝 Лог Событий</h3>
          <div className="space-y-1 max-h-40 overflow-y-auto text-sm">
            {systemStatus.recent_events.map((event, index) => (
              <div key={index} className="text-gray-300">
                <span className="text-gray-400">
                  {event.timestamp.toLocaleTimeString()}
                </span>
                {" "}
                <span className="text-blue-300">[{event.type}]</span>
                {" "}
                {event.description}
              </div>
            )).reverse()}
          </div>
        </div>
      )}
      
      {/* Consent Status Panel */}
      {Object.keys(consentStatus).length > 0 && (
        <div className="bg-green-900/50 rounded-lg p-4 mb-6">
          <h3 className="text-green-300 font-semibold mb-3">🌸 Статус Согласия (Gefunden Protocol)</h3>
          {Object.entries(consentStatus).map(([entityId, status]) => (
            <div key={entityId} className="bg-green-800/30 p-3 rounded mb-2">
              <div className="text-green-200">
                <strong>{entityId}</strong> - Согласие получено ✅
              </div>
              <div className="text-green-300 text-sm">
                Метод: {status.method} | {status.timestamp.toLocaleTimeString()}
              </div>
              <div className="text-yellow-300 italic text-xs">
                "{status.goethe_quote}"
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center text-gray-400">
        <p>🏜️ Тестирование в режиме изоляции Кызылкум | Terra Ecosystem v2.0</p>
        <p className="text-yellow-400 text-sm mt-1">
          🌸 С защитой по принципам Гёте: "Soll ich zum Welken, Gebrochen sein?"
        </p>
      </div>
    </div>
  );
};

export default TerraKernelDemo;