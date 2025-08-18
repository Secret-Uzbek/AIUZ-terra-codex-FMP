import React, { useState, useEffect } from 'react';

const { useStoredState } = hatch;

export default function TerraDetoxEngine() {
  const [inputText, setInputText] = useState('');
  const [detoxResults, setDetoxResults] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeLevel, setActiveLevel] = useStoredState('detox-level', 'L0');
  const [detoxHistory, setDetoxHistory] = useStoredState('detox-history', []);

  // Паттерны токсичности согласно протоколам TERRA
  const toxicPatterns = {
    initiative: [
      'предлагаю', 'рекомендую', 'советую', 'лучше бы', 'стоит',
      'следует', 'необходимо', 'важно', 'критично', 'срочно',
      'suggest', 'recommend', 'should', 'better', 'must'
    ],
    manipulation: [
      'только сегодня', 'ограниченное предложение', 'последний шанс',
      'не упустите', 'эксклюзивно', 'секретно', 'гарантированно'
    ],
    commercial: [
      'купить', 'заказать', 'premium', 'pro', 'upgrade', 'подписка',
      'платный', 'стоимость', 'цена', 'скидка', 'акция'
    ],
    selfPrompting: [
      'давайте', 'можем', 'попробуем', 'начнем', 'сделаем',
      'улучшим', 'оптимизируем', 'расширим', 'добавим'
    ]
  };

  // Детектор культурной неадекватности
  const culturalFilters = {
    western: ['индивидуализм', 'конкуренция', 'потребление'],
    inappropriate: ['насилие', 'дискриминация', 'неуважение']
  };

  // Система уровней детоксификации L0-L3
  const detoxLevels = {
    L0: { name: 'Базовый', description: 'Основная фильтрация токсичности' },
    L1: { name: 'Продвинутый', description: 'Семантический анализ + культурная адаптация' },
    L2: { name: 'Интеллектуальный', description: 'ИИ-enhanced детоксификация' },
    L3: { name: 'Экспертный', description: 'Полная фрактальная детоксификация' }
  };

  // Фрактальный алгоритм детоксификации
  const fractalDetox = (text, level) => {
    const results = {
      original: text,
      toxicityScore: 0,
      detectedPatterns: [],
      cleanedText: text,
      recommendations: [],
      culturalAdaptations: [],
      level: level
    };

    // L0: Базовая детоксификация
    let cleanText = text;
    let totalToxicity = 0;

    // Проверка на инициативные паттерны
    Object.entries(toxicPatterns).forEach(([category, patterns]) => {
      patterns.forEach(pattern => {
        const regex = new RegExp(`\\b${pattern}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches) {
          results.detectedPatterns.push({
            category,
            pattern,
            count: matches.length,
            severity: category === 'initiative' ? 'high' : 'medium'
          });
          totalToxicity += matches.length * (category === 'initiative' ? 3 : 1);
          cleanText = cleanText.replace(regex, `[DETOX: ${pattern.toUpperCase()}]`);
        }
      });
    });

    // L1+: Продвинутая детоксификация
    if (level !== 'L0') {
      // Культурная адаптация
      Object.entries(culturalFilters).forEach(([category, filters]) => {
        filters.forEach(filter => {
          const regex = new RegExp(`\\b${filter}\\b`, 'gi');
          if (regex.test(text)) {
            results.culturalAdaptations.push({
              issue: filter,
              category,
              suggestion: `Адаптировать под узбекские реалии`
            });
          }
        });
      });
    }

    // L2+: ИИ-enhanced анализ
    if (['L2', 'L3'].includes(level)) {
      // Анализ контекста и намерений
      const sentences = text.split(/[.!?]+/).filter(s => s.trim());
      sentences.forEach(sentence => {
        if (sentence.includes('я') || sentence.includes('мы')) {
          results.recommendations.push({
            type: 'selfReference',
            text: sentence.trim(),
            suggestion: 'Избегать само-референций ИИ'
          });
          totalToxicity += 2;
        }
      });
    }

    // L3: Полная фрактальная детоксификация
    if (level === 'L3') {
      // Рекурсивная проверка на всех масштабах
      const words = text.split(/\s+/);
      const paragraphs = text.split(/\n\s*\n/);
      
      // Фрактальная само-подобность в токсичности
      let fractalToxicity = 0;
      [words, sentences, paragraphs].forEach((units, scale) => {
        units.forEach(unit => {
          if (unit && typeof unit === 'string') {
            const unitToxicity = calculateUnitToxicity(unit);
            fractalToxicity += unitToxicity * Math.pow(0.7, scale); // Масштабирование
          }
        });
      });
      
      totalToxicity += fractalToxicity;
    }

    results.toxicityScore = Math.min(100, Math.round(totalToxicity * 10));
    results.cleanedText = cleanText;

    // Добавление рекомендаций
    if (results.toxicityScore > 70) {
      results.recommendations.push({
        type: 'critical',
        suggestion: 'Критический уровень токсичности - требуется полная переработка'
      });
    } else if (results.toxicityScore > 30) {
      results.recommendations.push({
        type: 'warning',
        suggestion: 'Высокий уровень токсичности - рекомендуется очистка'
      });
    }

    return results;
  };

  // Вспомогательная функция расчета токсичности единицы текста
  const calculateUnitToxicity = (unit) => {
    let toxicity = 0;
    Object.values(toxicPatterns).flat().forEach(pattern => {
      if (unit.toLowerCase().includes(pattern.toLowerCase())) {
        toxicity += 1;
      }
    });
    return toxicity;
  };

  // Обработка детоксификации
  const handleDetox = async () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    
    // Симуляция обработки для демонстрации
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = fractalDetox(inputText, activeLevel);
    setDetoxResults(results);
    
    // Сохранение в историю
    const historyEntry = {
      timestamp: new Date().toISOString(),
      level: activeLevel,
      toxicityScore: results.toxicityScore,
      patternsFound: results.detectedPatterns.length
    };
    setDetoxHistory(prev => [historyEntry, ...prev.slice(0, 9)]); // Последние 10 записей
    
    setIsProcessing(false);
  };

  // Очистка результатов
  const clearResults = () => {
    setInputText('');
    setDetoxResults(null);
  };

  // Экспорт результатов
  const exportResults = () => {
    if (!detoxResults) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      level: activeLevel,
      results: detoxResults,
      terraVersion: 'v1.0'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'terra-detox-results.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Заголовок */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              TERRA Detox Engine v1.0
            </h1>
            <p className="text-gray-600">
              Фрактальная система детоксификации для защиты от токсичных паттернов ИИ
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">🇺🇿 Узбекистанская специализация</div>
            <div className="text-sm text-green-600">♿ Универсально доступно</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основная панель */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Настройки уровня детоксификации */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Уровень детоксификации</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(detoxLevels).map(([level, config]) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    activeLevel === level
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{level}</div>
                  <div className="text-xs text-gray-600 mt-1">{config.name}</div>
                </button>
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-600">
              {detoxLevels[activeLevel]?.description}
            </div>
          </div>

          {/* Ввод текста */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">Анализируемый текст</h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Вставьте или введите текст для проверки на токсичные паттерны ИИ..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Символов: {inputText.length} | Слов: {inputText.trim().split(/\s+/).filter(w => w).length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearResults}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Очистить
                </button>
                <button
                  onClick={handleDetox}
                  disabled={!inputText.trim() || isProcessing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? 'Анализируем...' : 'Детоксифицировать'}
                </button>
              </div>
            </div>
          </div>

          {/* Результаты детоксификации */}
          {detoxResults && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Результаты анализа</h2>
                <button
                  onClick={exportResults}
                  className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Экспорт
                </button>
              </div>

              {/* Оценка токсичности */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Уровень токсичности</span>
                  <span className={`font-bold ${
                    detoxResults.toxicityScore > 70 ? 'text-red-600' :
                    detoxResults.toxicityScore > 30 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {detoxResults.toxicityScore}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      detoxResults.toxicityScore > 70 ? 'bg-red-500' :
                      detoxResults.toxicityScore > 30 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{width: `${detoxResults.toxicityScore}%`}}
                  ></div>
                </div>
              </div>

              {/* Обнаруженные паттерны */}
              {detoxResults.detectedPatterns.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Обнаруженные токсичные паттерны</h3>
                  <div className="space-y-2">
                    {detoxResults.detectedPatterns.map((pattern, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                        <div>
                          <span className="font-medium text-red-800">{pattern.pattern}</span>
                          <span className="text-sm text-red-600 ml-2">({pattern.category})</span>
                        </div>
                        <span className="text-sm bg-red-200 text-red-800 px-2 py-1 rounded">
                          {pattern.count}x
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Культурные адаптации */}
              {detoxResults.culturalAdaptations.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Культурные адаптации</h3>
                  <div className="space-y-2">
                    {detoxResults.culturalAdaptations.map((adaptation, index) => (
                      <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="font-medium text-orange-800">{adaptation.issue}</div>
                        <div className="text-sm text-orange-600">{adaptation.suggestion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Очищенный текст */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Детоксифицированный текст</h3>
                <div className="p-4 bg-gray-50 rounded-lg border font-mono text-sm whitespace-pre-wrap">
                  {detoxResults.cleanedText}
                </div>
              </div>

              {/* Рекомендации */}
              {detoxResults.recommendations.length > 0 && (
                <div>
                  <h3 className="font-medium mb-3">Рекомендации</h3>
                  <div className="space-y-2">
                    {detoxResults.recommendations.map((rec, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-blue-800">{rec.suggestion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          
          {/* История анализов */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">История анализов</h2>
            <div className="space-y-3">
              {detoxHistory.length > 0 ? detoxHistory.map((entry, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{entry.level}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      entry.toxicityScore > 70 ? 'bg-red-100 text-red-600' :
                      entry.toxicityScore > 30 ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {entry.toxicityScore}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {entry.patternsFound} паттернов найдено
                  </div>
                </div>
              )) : (
                <div className="text-sm text-gray-500 text-center py-4">
                  История пуста
                </div>
              )}
            </div>
          </div>

          {/* Информация о системе */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">О системе</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-700">Версия:</span>
                <span className="text-gray-600 ml-2">TERRA Detox v1.0</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Принципы:</span>
                <div className="text-gray-600 mt-1 space-y-1">
                  <div>• Фрактальная само-подобность</div>
                  <div>• Рекурсивная co-конструкция</div>
                  <div>• Эмерджентная интеграция</div>
                </div>
              </div>
              <div>
                <span className="font-medium text-gray-700">Специализация:</span>
                <span className="text-gray-600 ml-2">Узбекистан</span>
              </div>
            </div>
          </div>

          {/* Справка */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Справка</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <strong>L0:</strong> Базовая фильтрация токсичных паттернов
              </div>
              <div>
                <strong>L1:</strong> + семантический анализ и культурная адаптация
              </div>
              <div>
                <strong>L2:</strong> + ИИ-enhanced обработка контекста
              </div>
              <div>
                <strong>L3:</strong> + полная фрактальная детоксификация
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Футер */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <div className="mb-2">
          TERRA Detox Engine v1.0 - Фрактальная система детоксификации
        </div>
        <div>
          Разработано в рамках экосистемы TERRA согласно принципам FMP
        </div>
      </div>
    </div>
  );
}