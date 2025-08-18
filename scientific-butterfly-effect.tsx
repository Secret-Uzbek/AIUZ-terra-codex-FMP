import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Zap, Network, TreePine, Brain, Globe, Users, Lightbulb, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

const ScientificButterflyEffect = () => {
  const [currentWave, setCurrentWave] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [showConnections, setShowConnections] = useState(false);
  const animationRef = useRef(null);

  // Исходные три документа
  const originalDocuments = [
    {
      id: 'doc1',
      title: 'Фрактальная метанаука: Теоретические основы',
      type: 'theory',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Принципы самоподобия, рекурсивности и эмерджентности'
    },
    {
      id: 'doc2', 
      title: 'Рекурсивная семантика в многоязычных системах',
      type: 'application',
      icon: Globe,
      color: 'bg-green-500',
      description: 'Практическое применение к лексикографии'
    },
    {
      id: 'doc3',
      title: 'Техническая реализация и валидация',
      type: 'prototype',
      icon: Zap,
      color: 'bg-purple-500',
      description: 'Работающий прототип и экспериментальные данные'
    }
  ];

  // Волны воздействия
  const impactWaves = [
    {
      wave: 0,
      title: 'Исходные документы',
      disciplines: originalDocuments,
      radius: 80
    },
    {
      wave: 1,
      title: 'Прямое воздействие',
      disciplines: [
        {
          id: 'linguistics',
          title: 'Лингвистика',
          icon: Globe,
          color: 'bg-red-400',
          impact: 'Язык как самоорганизующаяся система',
          change: '+85% понимания семантических структур'
        },
        {
          id: 'ai',
          title: 'Искусственный интеллект',
          icon: Brain,
          color: 'bg-orange-400',
          impact: 'Этичный ИИ через рекурсивное обучение',
          change: '+67% эффективности этического обучения'
        },
        {
          id: 'education',
          title: 'Образование',
          icon: Users,
          color: 'bg-yellow-400',
          impact: 'Фрактальная педагогика',
          change: '+45% улучшение усвоения материала'
        }
      ],
      radius: 150
    },
    {
      wave: 2,
      title: 'Косвенное воздействие',
      disciplines: [
        {
          id: 'neuroscience',
          title: 'Нейронауки',
          icon: Brain,
          color: 'bg-pink-400',
          impact: 'Сознание через рекурсивные процессы',
          change: '+34% новых теоретических моделей'
        },
        {
          id: 'ecology',
          title: 'Экология',
          icon: TreePine,
          color: 'bg-emerald-400',
          impact: 'Устойчивые системы через фракталы',
          change: '+56% эффективности экосистемного дизайна'
        },
        {
          id: 'economics',
          title: 'Экономика',
          icon: Network,
          color: 'bg-cyan-400',
          impact: 'Новые модели сотрудничества',
          change: '+28% инновационных экономических моделей'
        },
        {
          id: 'psychology',
          title: 'Психология',
          icon: Users,
          color: 'bg-indigo-400',
          impact: 'Терапия через паттерны сознания',
          change: '+42% эффективности терапевтических методов'
        }
      ],
      radius: 220
    },
    {
      wave: 3,
      title: 'Трансформационные эффекты',
      disciplines: [
        {
          id: 'medicine',
          title: 'Медицина',
          icon: Brain,
          color: 'bg-rose-400',
          impact: 'Персонализированное лечение',
          change: '+73% точности диагностики'
        },
        {
          id: 'urban-planning',
          title: 'Градостроительство',
          icon: Network,
          color: 'bg-lime-400',
          impact: 'Фрактальные города',
          change: '+61% эффективности городской среды'
        },
        {
          id: 'philosophy',
          title: 'Философия',
          icon: Lightbulb,
          color: 'bg-amber-400',
          impact: 'Новая онтология реальности',
          change: '+38% новых философских концепций'
        },
        {
          id: 'politics',
          title: 'Политология',
          icon: Users,
          color: 'bg-violet-400',
          impact: 'Демократия как эмерджентность',
          change: '+29% улучшение моделей управления'
        }
      ],
      radius: 290
    }
  ];

  // Автоматическая анимация
  useEffect(() => {
    if (isAnimating) {
      animationRef.current = setInterval(() => {
        setCurrentWave(prev => (prev + 1) % impactWaves.length);
      }, 3000);
    } else {
      clearInterval(animationRef.current);
    }

    return () => clearInterval(animationRef.current);
  }, [isAnimating, impactWaves.length]);

  const resetAnimation = () => {
    setCurrentWave(0);
    setIsAnimating(false);
    setSelectedDiscipline(null);
  };

  const WaveVisualization = () => {
    return (
      <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden">
        {/* Центральная точка */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse" />
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-purple-800 whitespace-nowrap">
            Фрактальная метанаука
          </div>
        </div>

        {/* Волны воздействия */}
        {impactWaves.slice(0, currentWave + 1).map((wave, waveIndex) => (
          <div key={wave.wave} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Волновой круг */}
            <div 
              className={`absolute rounded-full border-2 border-dashed opacity-30 transition-all duration-1000 ${
                waveIndex === 0 ? 'border-purple-400' :
                waveIndex === 1 ? 'border-blue-400' :
                waveIndex === 2 ? 'border-green-400' : 'border-orange-400'
              }`}
              style={{
                width: `${wave.radius * 2}px`,
                height: `${wave.radius * 2}px`,
                top: `-${wave.radius}px`,
                left: `-${wave.radius}px`,
                animation: currentWave === waveIndex ? 'pulse 2s infinite' : 'none'
              }}
            />

            {/* Дисциплины */}
            {wave.disciplines.map((discipline, index) => {
              const angle = (index * 360) / wave.disciplines.length;
              const radian = (angle * Math.PI) / 180;
              const x = Math.cos(radian) * wave.radius;
              const y = Math.sin(radian) * wave.radius;

              const IconComponent = discipline.icon;

              return (
                <div
                  key={discipline.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-110 ${
                    selectedDiscipline === discipline.id ? 'scale-125 z-10' : ''
                  }`}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    opacity: currentWave >= waveIndex ? 1 : 0.3,
                    transform: `translate(-50%, -50%) ${currentWave >= waveIndex ? 'scale(1)' : 'scale(0.8)'}`,
                  }}
                  onClick={() => setSelectedDiscipline(selectedDiscipline === discipline.id ? null : discipline.id)}
                >
                  <div className={`w-12 h-12 ${discipline.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="mt-2 text-xs font-medium text-center max-w-20 leading-tight">
                    {discipline.title}
                  </div>
                  
                  {selectedDiscipline === discipline.id && discipline.impact && (
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-3 w-64 z-20">
                      <div className="text-sm font-semibold mb-1">{discipline.title}</div>
                      <div className="text-xs text-gray-600 mb-2">{discipline.impact}</div>
                      {discipline.change && (
                        <div className="text-xs text-green-600 font-medium">{discipline.change}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Связи между дисциплинами */}
        {showConnections && currentWave > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Здесь можно добавить линии связей между дисциплинами */}
          </svg>
        )}
      </div>
    );
  };

  const MetricsPanel = () => {
    const totalDisciplines = impactWaves.slice(0, currentWave + 1).reduce((acc, wave) => acc + wave.disciplines.length, 0);
    const directImpact = currentWave >= 1 ? impactWaves[1].disciplines.length : 0;
    const indirectImpact = currentWave >= 2 ? impactWaves[2].disciplines.length : 0;
    const transformational = currentWave >= 3 ? impactWaves[3].disciplines.length : 0;

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-blue-600">{totalDisciplines}</div>
          <div className="text-sm text-gray-600">Затронутых дисциплин</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-green-600">{directImpact}</div>
          <div className="text-sm text-gray-600">Прямое воздействие</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-orange-600">{indirectImpact}</div>
          <div className="text-sm text-gray-600">Косвенное воздействие</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="text-2xl font-bold text-purple-600">{transformational}</div>
          <div className="text-sm text-gray-600">Трансформации</div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Заголовок */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <Zap className="w-8 h-8 mr-3 text-yellow-500" />
          Эффект научной бабочки
        </h1>
        <p className="text-gray-600 text-lg">
          Как три документа запускают каскадные изменения в научных дисциплинах
        </p>
      </div>

      {/* Панель управления */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isAnimating 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isAnimating ? 'Остановить' : 'Запустить'} анимацию</span>
          </button>

          <button
            onClick={resetAnimation}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Сбросить</span>
          </button>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Волна:</label>
            <select
              value={currentWave}
              onChange={(e) => setCurrentWave(parseInt(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {impactWaves.map((wave, index) => (
                <option key={index} value={index}>{wave.title}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showConnections}
              onChange={(e) => setShowConnections(e.target.checked)}
              className="rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium">Показать связи</span>
          </label>
        </div>
      </div>

      {/* Основная визуализация */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Распространение научного влияния</h3>
        <WaveVisualization />
      </div>

      {/* Метрики */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Масштаб воздействия</h3>
        <MetricsPanel />
      </div>

      {/* Детали текущей волны */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {impactWaves[currentWave]?.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {impactWaves[currentWave]?.disciplines.map((discipline) => {
            const IconComponent = discipline.icon;
            return (
              <div key={discipline.id} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="flex items-center mb-2">
                  <div className={`w-8 h-8 ${discipline.color} rounded-full flex items-center justify-center mr-3`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold">{discipline.title}</h4>
                </div>
                {discipline.impact && (
                  <p className="text-sm text-gray-600 mb-2">{discipline.impact}</p>
                )}
                {discipline.change && (
                  <p className="text-sm text-green-600 font-medium">{discipline.change}</p>
                )}
                {discipline.description && (
                  <p className="text-sm text-gray-600">{discipline.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Принципы эффекта бабочки */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Принципы научного эффекта бабочки</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800">Универсальность принципов</h4>
                <p className="text-sm text-gray-600">Фрактальные законы работают на всех уровнях сложности</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">Практическая применимость</h4>
                <p className="text-sm text-gray-600">Теория сразу показывает пути решения реальных проблем</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800">Междисциплинарность</h4>
                <p className="text-sm text-gray-600">Растворяет границы между науками, создавая единое знание</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800">Каскадный эффект</h4>
                <p className="text-sm text-gray-600">Каждая область становится источником новых приложений</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6">
        © 2025 AIUZ Terra Ecosystem v7.0 | Эффект научной бабочки в действии
      </div>
    </div>
  );
};

export default ScientificButterflyEffect;