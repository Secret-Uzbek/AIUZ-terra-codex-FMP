import React, { useState, useEffect, useRef } from 'react';
import { Search, TreePine, Languages, Zap, RotateCcw, Network, ChevronDown, ChevronRight } from 'lucide-react';

const FractalLexicographyDemo = () => {
  const [selectedConcept, setSelectedConcept] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('ru');
  const [fractalLevel, setFractalLevel] = useState(2);
  const [showEmergence, setShowEmergence] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState(new Set(['root']));

  // Демонстрационные данные из исследования
  const lexicalData = {
    'гостеприимство': {
      id: 'hospitality',
      translations: {
        uz: { word: 'mehmonnavozlik', cultural_weight: 0.95 },
        de: { word: 'Gastfreundschaft', cultural_weight: 0.72 },
        ru: { word: 'гостеприимство', cultural_weight: 0.88 }
      },
      fractal_structure: {
        level_0: ['GOOD', 'GIVE', 'PERSON', 'COME', 'PLACE'],
        level_1: ['благородство', 'щедрость', 'человечность', 'принятие', 'пространство'],
        level_2: ['культурная традиция', 'социальная норма', 'эмоциональная открытость'],
        level_3: ['межкультурное взаимопонимание', 'туристическая привлекательность']
      },
      emergence_patterns: ['межкультурный мост', 'дипломатия повседневности', 'культурный капитал']
    },
    'дом': {
      id: 'home',
      translations: {
        uz: { word: 'uy', cultural_weight: 0.92 },
        de: { word: 'Haus', cultural_weight: 0.85 },
        ru: { word: 'дом', cultural_weight: 0.90 }
      },
      fractal_structure: {
        level_0: ['PLACE', 'HUMAN', 'LIVE', 'SAFE'],
        level_1: ['строение', 'убежище', 'территория', 'принадлежность'],
        level_2: ['архитектура', 'безопасность', 'идентичность', 'память'],
        level_3: ['культурный код', 'генетическая память пространства']
      },
      emergence_patterns: ['семейный очаг', 'Heimat', 'родовое гнездо']
    },
    'знание': {
      id: 'knowledge',
      translations: {
        uz: { word: 'bilim', cultural_weight: 0.88 },
        de: { word: 'Wissen', cultural_weight: 0.94 },
        ru: { word: 'знание', cultural_weight: 0.91 }
      },
      fractal_structure: {
        level_0: ['KNOW', 'THINK', 'TRUE', 'LEARN'],
        level_1: ['понимание', 'информация', 'опыт', 'мудрость'],
        level_2: ['эпистемология', 'наука', 'традиция', 'интуиция'],
        level_3: ['коллективный интеллект', 'культурная память']
      },
      emergence_patterns: ['философия познания', 'научная парадигма', 'народная мудрость']
    }
  };

  const languages = {
    uz: { name: 'Узбекский', color: 'bg-blue-500' },
    de: { name: 'Немецкий', color: 'bg-red-500' },
    ru: { name: 'Русский', color: 'bg-green-500' }
  };

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const FractalVisualization = ({ concept }) => {
    if (!concept) return null;

    const data = lexicalData[concept];
    if (!data) return null;

    const levels = Object.keys(data.fractal_structure);
    const maxLevel = Math.min(fractalLevel, levels.length - 1);

    return (
      <div className="space-y-4">
        {levels.slice(0, maxLevel + 1).map((level, levelIndex) => (
          <div key={level} className="relative">
            <div className="flex items-center mb-2">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                levelIndex === 0 ? 'bg-purple-500' :
                levelIndex === 1 ? 'bg-blue-500' :
                levelIndex === 2 ? 'bg-green-500' : 'bg-orange-500'
              }`} />
              <h4 className="font-semibold text-sm">
                {level === 'level_0' ? 'Семантические примитивы' :
                 level === 'level_1' ? 'Базовые концепты' :
                 level === 'level_2' ? 'Культурные модификации' :
                 'Эмерджентные концепты'}
              </h4>
            </div>
            
            <div className="ml-5 grid grid-cols-2 md:grid-cols-3 gap-2">
              {data.fractal_structure[level].map((item, index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-lg text-xs border transition-all duration-300 ${
                    levelIndex === 0 ? 'bg-purple-50 border-purple-200 text-purple-800' :
                    levelIndex === 1 ? 'bg-blue-50 border-blue-200 text-blue-800' :
                    levelIndex === 2 ? 'bg-green-50 border-green-200 text-green-800' :
                    'bg-orange-50 border-orange-200 text-orange-800'
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            
            {levelIndex < maxLevel && (
              <div className="flex justify-center my-2">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const MultilingualComparison = ({ concept }) => {
    if (!concept) return null;

    const data = lexicalData[concept];
    if (!data) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Languages className="w-5 h-5 mr-2" />
          Многоязычные соответствия
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(data.translations).map(([lang, info]) => (
            <div 
              key={lang}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                activeLanguage === lang 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
              onClick={() => setActiveLanguage(lang)}
            >
              <div className="flex items-center mb-2">
                <div className={`w-3 h-3 rounded-full mr-2 ${languages[lang].color}`} />
                <span className="font-medium text-sm">{languages[lang].name}</span>
              </div>
              
              <div className="text-xl font-bold mb-2">{info.word}</div>
              
              <div className="text-sm text-gray-600 mb-2">
                Культурная специфичность: {(info.cultural_weight * 100).toFixed(0)}%
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${languages[lang].color}`}
                  style={{ width: `${info.cultural_weight * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const EmergencePatterns = ({ concept }) => {
    if (!concept || !showEmergence) return null;

    const data = lexicalData[concept];
    if (!data) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Эмерджентные паттерны
        </h3>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-gray-600 mb-3">
            Концепты, возникающие на стыке языковых систем:
          </p>
          
          <div className="space-y-2">
            {data.emergence_patterns.map((pattern, index) => (
              <div 
                key={index}
                className="flex items-center p-2 bg-white rounded border border-purple-100"
              >
                <Network className="w-4 h-4 mr-2 text-purple-500" />
                <span className="text-sm font-medium">{pattern}</span>
                <div className="ml-auto">
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                    Эмерджентный
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const filteredConcepts = Object.keys(lexicalData).filter(concept =>
    concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
    Object.values(lexicalData[concept].translations).some(t => 
      t.word.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <TreePine className="w-8 h-8 mr-3 text-green-600" />
          Фрактальная лексикография
        </h1>
        <p className="text-gray-600 text-lg">
          Интерактивная демонстрация принципов самоподобия и эмерджентности в многоязычных лексических системах
        </p>
      </div>

      {/* Панель поиска и управления */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск концепта..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedConcept}
            onChange={(e) => setSelectedConcept(e.target.value)}
          >
            <option value="">Выберите концепт</option>
            {filteredConcepts.map(concept => (
              <option key={concept} value={concept}>{concept}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Глубина:</label>
            <input
              type="range"
              min="1"
              max="4"
              value={fractalLevel}
              onChange={(e) => setFractalLevel(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">{fractalLevel}</span>
          </div>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showEmergence}
              onChange={(e) => setShowEmergence(e.target.checked)}
              className="rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium">Показать эмерджентность</span>
          </label>
        </div>
      </div>

      {selectedConcept && (
        <div className="space-y-6">
          {/* Многоязычные соответствия */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <MultilingualComparison concept={selectedConcept} />
          </div>

          {/* Фрактальная структура */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <TreePine className="w-5 h-5 mr-2" />
              Фрактальная декомпозиция
            </h3>
            <FractalVisualization concept={selectedConcept} />
          </div>

          {/* Эмерджентные паттерны */}
          {showEmergence && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <EmergencePatterns concept={selectedConcept} />
            </div>
          )}
        </div>
      )}

      {/* Теоретическая информация */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Основные принципы</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Самоподобие</h4>
            <p className="text-sm text-purple-700">
              Языковые структуры повторяются на разных масштабах с сохранением основных организационных принципов.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Рекурсивность</h4>
            <p className="text-sm text-blue-700">
              Системы содержат себя в качестве компонентов, создавая циклы самоорганизации и развития.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Эмерджентность</h4>
            <p className="text-sm text-green-700">
              Взаимодействие простых правил порождает сложные явления, не предсказуемые из свойств компонентов.
            </p>
          </div>
        </div>
      </div>

      {/* Статистика исследования */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Результаты исследования</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">87%</div>
            <div className="text-sm text-gray-600">Точность кластеризации</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">23%</div>
            <div className="text-sm text-gray-600">Улучшение поиска</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">34%</div>
            <div className="text-sm text-gray-600">Сокращение времени навигации</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">150K</div>
            <div className="text-sm text-gray-600">Словоупотреблений в корпусе</div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        © 2025 - Проект AIUZ Terra Ecosystem v7.0 | Фрактальная метанаука в лексикографии
      </div>
    </div>
  );
};

export default FractalLexicographyDemo;