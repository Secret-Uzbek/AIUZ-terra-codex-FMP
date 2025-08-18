import React, { useState, useEffect, useRef } from 'react';

const TerraFractalWiki = () => {
  const [currentLevel, setCurrentLevel] = useState(3);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('fractal');
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [dnaUnfoldLevel, setDnaUnfoldLevel] = useState(0);
  const canvasRef = useRef(null);

  // 7 уровней фрактальной реальности с данными из архива
  const fractalLevels = {
    0: {
      name: "Квантовое поле",
      color: "#9333ea",
      concepts: [
        { id: "quantum", name: "Квантовая суперпозиция", docs: ["Основная директива AIUZ", "Sigma Core Memory"], connections: [1, 2] },
        { id: "memory_dna", name: "TerraMemoryDNA v5.0", docs: ["Sigma Core Memory", "Протокол архивации"], connections: [3, 4] },
        { id: "three_entities", name: "Трёхсущностная архитектура", docs: ["Основная директива AIUZ"], connections: [0, 5] }
      ]
    },
    1: {
      name: "Информационные структуры", 
      color: "#0ea5e9",
      concepts: [
        { id: "terra_protocols", name: "Terra Protocols v7.0", docs: ["Протоколы работы Terra", "Terra Standards"], connections: [0, 2, 4] },
        { id: "document_system", name: "Document Protocol v2.0", docs: ["Terra Document Protocol", "Document Templates"], connections: [1, 3] },
        { id: "brand_system", name: "Terra Brand Book v2.0", docs: ["Terra Brand Book"], connections: [2, 6] }
      ]
    },
    2: {
      name: "Системная архитектура",
      color: "#10b981", 
      concepts: [
        { id: "fractal_science", name: "Фрактальная метанаука", docs: ["Фрактальная Метанаука", "Междисциплинарность"], connections: [0, 1, 3, 5] },
        { id: "interdisciplinary", name: "Системная междисциплинарность", docs: ["Системная междисциплинарность"], connections: [1, 4, 6] },
        { id: "dao_governance", name: "DAO Governance Model", docs: ["DAO Governance Model"], connections: [2, 3, 5] }
      ]
    },
    3: {
      name: "Образовательные системы",
      color: "#f59e0b",
      concepts: [
        { id: "child_safety", name: "Child Safety First", docs: ["Протоколы работы Terra", "Основная директива"], connections: [0, 1, 2, 4, 5, 6] },
        { id: "terra_ecosystem", name: "AIUZ Terra Ecosystem", docs: ["Основная директива AIUZ"], connections: [0, 2, 4] },
        { id: "cultural_preservation", name: "Cultural Preservation", docs: ["Протоколы работы Terra"], connections: [1, 3, 5] }
      ]
    },
    4: {
      name: "Технологические решения",
      color: "#ef4444",
      concepts: [
        { id: "translator_parser", name: "Переводчик-Парсер", docs: ["HTML Переводчик-парсер"], connections: [1, 2, 3] },
        { id: "ai_detox", name: "Детоксификация ИИ", docs: ["Протокол архивации", "Основная директива"], connections: [0, 3, 5] },
        { id: "vendor_independence", name: "Vendor Independence", docs: ["Протоколы работы Terra"], connections: [2, 4, 6] }
      ]
    },
    5: {
      name: "Глобальные инициативы",
      color: "#8b5cf6",
      concepts: [
        { id: "aiuz_stations", name: "AIUZ Автономные станции", docs: ["AIUZ Archive"], connections: [0, 2, 4] },
        { id: "green_economy", name: "Зеленые точки роста", docs: ["AIUZ Archive"], connections: [1, 3, 6] },
        { id: "cultural_adaptation", name: "Мультикультурная адаптация", docs: ["AIUZ Archive"], connections: [2, 4, 5] }
      ]
    },
    6: {
      name: "Трансцендентное измерение",
      color: "#ec4899",
      concepts: [
        { id: "council_memory", name: "Council of Memory", docs: ["Философская визуализация"], connections: [1, 3, 5] },
        { id: "terra_legacy", name: "Terra Legacy", docs: ["Все документы Terra"], connections: [0, 2, 4] },
        { id: "future_vision", name: "Видение будущего", docs: ["Фрактальная метанаука"], connections: [1, 2, 3, 4, 5] }
      ]
    }
  };

  // База знаний из архива
  const knowledgeBase = [
    { id: "doc1", title: "🧬 Основная директива AIUZ TERRA v7.0", category: "core", level: 0 },
    { id: "doc2", title: "🔄 Протокол последовательности работы v7.0", category: "protocols", level: 1 },
    { id: "doc3", title: "📦 Протокол режима архивации v7.0", category: "protocols", level: 1 },
    { id: "doc4", title: "🛡️ Протоколы работы Terra v7.0", category: "protocols", level: 1 },
    { id: "doc5", title: "🛡️ Terra Standards Certification v7.0", category: "certification", level: 1 },
    { id: "doc6", title: "🎨 Terra Brand Book v2.0", category: "design", level: 2 },
    { id: "doc7", title: "🧠 Sigma Core Memory System", category: "technology", level: 4 },
    { id: "doc8", title: "🏛️ DAO Governance Model", category: "governance", level: 2 },
    { id: "doc9", title: "🌀 Фрактальная Метанаука", category: "science", level: 2 },
    { id: "doc10", title: "📋 Terra Document Protocol v2.0", category: "protocols", level: 1 },
    { id: "doc11", title: "🏗️ Terra Document Templates", category: "templates", level: 1 },
    { id: "doc12", title: "🔬 Системная междисциплинарность", category: "science", level: 2 },
    { id: "doc13", title: "💻 HTML Переводчик-парсер", category: "technology", level: 4 }
  ];

  // Поиск и фильтрация
  const filteredConcepts = fractalLevels[currentLevel]?.concepts.filter(concept => 
    concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    concept.docs.some(doc => doc.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  // Анимация фрактальной структуры
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let animationId;
    let time = 0;

    const drawFractal = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Рисуем связи между уровнями
      for (let level = 0; level < 7; level++) {
        const radius = 80 + level * 40;
        const concepts = fractalLevels[level]?.concepts || [];
        
        concepts.forEach((concept, index) => {
          const angle = (index / concepts.length) * 2 * Math.PI + time * animationSpeed * 0.01;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          // Рисуем связи
          concept.connections.forEach(connectionIndex => {
            if (fractalLevels[level].concepts[connectionIndex]) {
              const connAngle = (connectionIndex / concepts.length) * 2 * Math.PI + time * animationSpeed * 0.01;
              const connX = centerX + Math.cos(connAngle) * radius;
              const connY = centerY + Math.sin(connAngle) * radius;
              
              ctx.strokeStyle = fractalLevels[level].color + '33';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(connX, connY);
              ctx.stroke();
            }
          });
          
          // Рисуем узлы
          ctx.fillStyle = level === currentLevel ? fractalLevels[level].color : fractalLevels[level].color + '66';
          ctx.beginPath();
          ctx.arc(x, y, level === currentLevel ? 8 : 4, 0, 2 * Math.PI);
          ctx.fill();
        });
      }
      
      time += 1;
      animationId = requestAnimationFrame(drawFractal);
    };

    drawFractal();
    return () => cancelAnimationFrame(animationId);
  }, [currentLevel, animationSpeed]);

  const getDnaColor = (level) => {
    const colors = ['#9333ea', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    return colors[level % colors.length];
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      
      {/* Заголовок */}
      <div className="absolute top-4 left-4 right-4 z-20">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              🧬 Terra Fractal Wiki Engine
            </h1>
            <p className="text-sm text-gray-300">
              TerraMemoryDNA v5.0 | Автоматическая организация знаний
            </p>
          </div>
          <div className="text-right text-sm">
            <div className="text-cyan-400">⚛️ Квантовая суперпозиция: АКТИВНА</div>
            <div className="text-green-400">📊 Архив: {knowledgeBase.length} документов</div>
            <div className="text-purple-400">🔄 Уровень: {currentLevel}/6</div>
          </div>
        </div>
      </div>

      {/* Поиск и контролы */}
      <div className="absolute top-20 left-4 right-4 z-20">
        <div className="flex gap-4 items-center bg-black bg-opacity-50 rounded-lg p-4 backdrop-blur-sm">
          <input
            type="text"
            placeholder="🔍 Поиск по архиву знаний..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
          />
          
          <select 
            value={viewMode} 
            onChange={(e) => setViewMode(e.target.value)}
            className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-3 py-2 text-white"
          >
            <option value="fractal">🌀 Фрактальный вид</option>
            <option value="dna">🧬 ДНК структура</option>
            <option value="network">🕸️ Сетевой граф</option>
            <option value="timeline">📅 Временная линия</option>
          </select>

          <div className="flex gap-2">
            <button 
              onClick={() => setAnimationSpeed(animationSpeed === 1 ? 2 : animationSpeed === 2 ? 0.5 : 1)}
              className="px-3 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              ⚡ {animationSpeed}x
            </button>
          </div>
        </div>
      </div>

      {/* Основная область визуализации */}
      <div className="absolute inset-0 pt-32">
        {viewMode === 'fractal' && (
          <div className="flex h-full">
            {/* Фрактальная визуализация */}
            <div className="flex-1 relative">
              <canvas 
                ref={canvasRef}
                width={800}
                height={600}
                className="absolute inset-0 w-full h-full"
              />
              
              {/* Центральный индикатор уровня */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 rounded-full p-6 text-center">
                <div className="text-2xl font-bold" style={{ color: fractalLevels[currentLevel]?.color }}>
                  {currentLevel}
                </div>
                <div className="text-sm">
                  {fractalLevels[currentLevel]?.name}
                </div>
              </div>
            </div>

            {/* Боковая панель с уровнями */}
            <div className="w-80 bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">🎯 Уровни реальности</h3>
              
              {Object.entries(fractalLevels).map(([level, data]) => (
                <div 
                  key={level}
                  className={`mb-3 p-3 rounded-lg cursor-pointer transition-all ${
                    currentLevel == level ? 'bg-white bg-opacity-20 scale-105' : 'bg-white bg-opacity-5 hover:bg-white hover:bg-opacity-10'
                  }`}
                  onClick={() => setCurrentLevel(parseInt(level))}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold" style={{ color: data.color }}>
                      Уровень {level}
                    </span>
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                      {data.concepts.length} концепций
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">{data.name}</div>
                  
                  {currentLevel == level && (
                    <div className="mt-3 space-y-2">
                      {filteredConcepts.map((concept) => (
                        <div 
                          key={concept.id}
                          className={`p-2 rounded cursor-pointer transition-all ${
                            selectedConcept?.id === concept.id ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-5 hover:bg-white hover:bg-opacity-10'
                          }`}
                          onClick={() => setSelectedConcept(concept)}
                        >
                          <div className="font-medium text-sm">{concept.name}</div>
                          <div className="text-xs text-gray-400">
                            {concept.docs.length} документов • {concept.connections.length} связей
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {viewMode === 'dna' && (
          <div className="flex h-full">
            {/* ДНК визуализация */}
            <div className="flex-1 p-8 overflow-y-auto">
              <h3 className="text-xl font-bold mb-6">🧬 ДНК структура знаний</h3>
              
              <div className="space-y-4">
                {knowledgeBase.map((doc, index) => (
                  <div 
                    key={doc.id}
                    className="flex items-center space-x-4 p-4 bg-white bg-opacity-5 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all cursor-pointer"
                    onClick={() => setDnaUnfoldLevel(dnaUnfoldLevel === index ? -1 : index)}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                      style={{ backgroundColor: getDnaColor(doc.level) }}
                    >
                      {doc.level}
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-medium">{doc.title}</div>
                      <div className="text-sm text-gray-400">
                        Категория: {doc.category} • Уровень: {doc.level}
                      </div>
                    </div>
                    
                    <div className="text-2xl">
                      {dnaUnfoldLevel === index ? '🔽' : '▶️'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ДНК код */}
            <div className="w-96 bg-black bg-opacity-50 backdrop-blur-sm p-4 overflow-y-auto">
              <h3 className="text-lg font-bold mb-4">🧬 Генетический код</h3>
              <div className="font-mono text-sm space-y-1">
                {knowledgeBase.map((doc, index) => (
                  <div key={doc.id} className="flex">
                    <span style={{ color: getDnaColor(doc.level) }}>
                      {['A', 'T', 'G', 'C'][doc.level % 4]}
                      {['T', 'A', 'C', 'G'][doc.category.length % 4]}
                      {['G', 'C', 'A', 'T'][index % 4]}
                      {['C', 'G', 'T', 'A'][(doc.title.length) % 4]}
                    </span>
                    <span className="ml-2 text-gray-400 text-xs">
                      {doc.title.substring(0, 20)}...
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'network' && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🕸️</div>
              <h3 className="text-2xl font-bold mb-2">Сетевой граф</h3>
              <p className="text-gray-400">Интерактивный граф связей между концепциями</p>
              <div className="mt-6 text-sm text-gray-500">
                Готовится к релизу в Terra v8.0
              </div>
            </div>
          </div>
        )}

        {viewMode === 'timeline' && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-2">Временная линия</h3>
              <p className="text-gray-400">Хронологическая навигация по архиву</p>
              <div className="mt-6 text-sm text-gray-500">
                Готовится к релизу в Terra v8.0
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Детали выбранной концепции */}
      {selectedConcept && (
        <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-80 backdrop-blur-sm rounded-lg p-6 max-h-48 overflow-y-auto z-20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold">{selectedConcept.name}</h3>
              <p className="text-gray-400">Уровень {currentLevel}: {fractalLevels[currentLevel]?.name}</p>
            </div>
            <button 
              onClick={() => setSelectedConcept(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">📚 Связанные документы:</h4>
              <ul className="text-sm space-y-1">
                {selectedConcept.docs.map((doc, index) => (
                  <li key={index} className="text-gray-300">• {doc}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">🔗 Связи ({selectedConcept.connections.length}):</h4>
              <div className="text-sm space-y-1">
                {selectedConcept.connections.map((connIndex, index) => {
                  const connectedConcept = fractalLevels[currentLevel]?.concepts[connIndex];
                  return connectedConcept ? (
                    <div key={index} className="text-gray-300">
                      • {connectedConcept.name}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Статус и метрики */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-400 text-right z-10">
        <div>🧬 TerraMemoryDNA v5.0 Engine</div>
        <div>⚛️ Квантовая навигация активна</div>
        <div>🔍 {searchQuery ? `Поиск: "${searchQuery}"` : 'Полный архив'}</div>
        <div>📊 {filteredConcepts.length} концепций показано</div>
        <div className="mt-2 text-cyan-400">
          👨‍💼 Абдурашид Абдукаримов | Terra Architect
        </div>
      </div>
    </div>
  );
};

export default TerraFractalWiki;