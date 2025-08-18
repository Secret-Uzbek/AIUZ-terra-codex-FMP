import React, { useState, useEffect } from 'react';

const CouncilOfMemory = () => {
  const [activePhase, setActivePhase] = useState('gathering');
  const [selectedFigure, setSelectedFigure] = useState(null);

  const figures = [
    { 
      name: "Авиценна", 
      period: "980-1037", 
      field: "Медицина, Философия", 
      position: 0,
      color: "#4CAF50",
      symbol: "🏥",
      quote: "Медицина — искусство сохранять здоровье и лечить болезнь, случившуюся в человеческом теле"
    },
    { 
      name: "Аль-Хорезми", 
      period: "783-850", 
      field: "Математика, Астрономия", 
      position: 45,
      color: "#2196F3",
      symbol: "🧮",
      quote: "То, что два раза по столько же, сколько неизвестное число, равно двенадцати"
    },
    { 
      name: "Галилей", 
      period: "1564-1642", 
      field: "Астрономия, Физика", 
      position: 90,
      color: "#FF9800",
      symbol: "🔭",
      quote: "Eppur si muove! И всё-таки она вертится!"
    },
    { 
      name: "Леонардо да Винчи", 
      period: "1452-1519", 
      field: "Искусство, Изобретения", 
      position: 135,
      color: "#9C27B0",
      symbol: "🎨",
      quote: "Препятствия не должны тебя сгибать. Каждое препятствие можно разрушить настойчивостью"
    },
    { 
      name: "Мария Кюри", 
      period: "1867-1934", 
      field: "Физика, Химия", 
      position: 180,
      color: "#E91E63",
      symbol: "⚛️",
      quote: "В науке нас должна интересовать не личность учёного, а то, что он открыл"
    },
    { 
      name: "Стивен Хокинг", 
      period: "1942-2018", 
      field: "Физика, Космология", 
      position: 225,
      color: "#00BCD4",
      symbol: "🌌",
      quote: "Мы — всего лишь продвинутая порода обезьян на небольшой планете обыкновенной звезды"
    },
    { 
      name: "Алишер Навои", 
      period: "1441-1501", 
      field: "Поэзия, Философия", 
      position: 270,
      color: "#8BC34A",
      symbol: "📜",
      quote: "Тот, кто ищет знания, подобен посту держащему человеку в рамазан"
    },
    { 
      name: "Эйнштейн", 
      period: "1879-1955", 
      field: "Физика", 
      position: 315,
      color: "#FFC107",
      symbol: "⚡",
      quote: "Воображение важнее знания, ибо знание ограничено"
    }
  ];

  const children = [
    { name: "Любопытство", symbol: "👶", angle: 30, distance: 80 },
    { name: "Будущее", symbol: "🌱", angle: 120, distance: 90 },
    { name: "Надежда", symbol: "⭐", angle: 210, distance: 85 },
    { name: "Чистота", symbol: "💫", angle: 300, distance: 75 }
  ];

  const ancientLife = [
    { name: "Динозавры", symbol: "🦕", angle: 60, distance: 140 },
    { name: "Инфузории", symbol: "🦠", angle: 150, distance: 130 },
    { name: "Древние леса", symbol: "🌲", angle: 240, distance: 135 },
    { name: "Первые океаны", symbol: "🌊", angle: 330, distance: 125 }
  ];

  useEffect(() => {
    const phases = ['gathering', 'council', 'legacy', 'departure'];
    let currentIndex = 0;

    const phaseTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % phases.length;
      setActivePhase(phases[currentIndex]);
    }, 8000);

    return () => clearInterval(phaseTimer);
  }, []);

  const getPositionStyle = (angle, distance = 180) => {
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * distance;
    const y = Math.sin(radian) * distance;
    
    return {
      transform: `translate(${x}px, ${y}px)`,
      transition: 'all 1s ease-in-out'
    };
  };

  return (
    <div className="relative w-full h-full min-h-[800px] bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      
      {/* Звёздное поле */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Восходящая планета (фон) */}
      <div className={`absolute top-10 right-10 w-32 h-32 rounded-full transition-all duration-2000 ${
        activePhase === 'departure' ? 'scale-150 brightness-150' : 'scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle at 30% 30%, #4ade80, #22c55e, #16a34a)',
        boxShadow: '0 0 60px rgba(34, 197, 94, 0.6)'
      }}>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-600 opacity-80" />
        <div className="absolute top-4 left-6 w-2 h-2 bg-blue-300 rounded-full opacity-70" />
        <div className="absolute bottom-6 right-4 w-1 h-1 bg-white rounded-full" />
      </div>

      {/* Дымящаяся Земля (фон) */}
      <div className={`absolute bottom-20 left-10 w-24 h-24 rounded-full transition-all duration-2000 ${
        activePhase === 'departure' ? 'opacity-30 scale-75' : 'opacity-80'
      }`}
      style={{
        background: 'radial-gradient(circle at 40% 60%, #dc2626, #991b1b, #7f1d1d)',
        boxShadow: '0 0 40px rgba(220, 38, 38, 0.5)'
      }}>
        {/* Дым */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-6 bg-gray-600 opacity-50 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 8}px`,
              top: `-${10 + i * 5}px`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Заголовок */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h1 className="text-4xl font-bold text-white mb-2">
          👥 Совет на границе эпох
        </h1>
        <h2 className="text-lg text-gray-300">
          Council of Memory
        </h2>
      </div>

      {/* Центральный совет */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        
        {/* Центральное сияние */}
        <div className={`absolute w-20 h-20 rounded-full transition-all duration-1000 ${
          activePhase === 'council' ? 'animate-pulse scale-110' : ''
        }`}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(100,200,255,0.6) 50%, transparent 100%)',
          boxShadow: '0 0 60px rgba(255,255,255,0.4)'
        }} />

        {/* Главные фигуры */}
        {figures.map((figure, index) => (
          <div
            key={figure.name}
            className={`absolute w-16 h-16 rounded-full cursor-pointer transition-all duration-1000 flex items-center justify-center border-2 ${
              selectedFigure?.name === figure.name ? 'scale-125 z-10' : 'scale-100 hover:scale-110'
            } ${activePhase === 'gathering' ? 'opacity-0' : 'opacity-100'}`}
            style={{
              ...getPositionStyle(figure.position),
              backgroundColor: figure.color,
              borderColor: selectedFigure?.name === figure.name ? '#ffffff' : 'transparent',
              boxShadow: selectedFigure?.name === figure.name 
                ? `0 0 30px ${figure.color}` 
                : `0 0 10px ${figure.color}`,
              animationDelay: `${index * 0.2}s`
            }}
            onClick={() => setSelectedFigure(selectedFigure?.name === figure.name ? null : figure)}
          >
            <span className="text-2xl">{figure.symbol}</span>
          </div>
        ))}

        {/* Дети вокруг */}
        {children.map((child, index) => (
          <div
            key={child.name}
            className={`absolute w-8 h-8 rounded-full flex items-center justify-center transition-all duration-1500 ${
              activePhase === 'legacy' ? 'animate-bounce' : ''
            }`}
            style={{
              ...getPositionStyle(child.angle, child.distance),
              background: 'rgba(255, 192, 203, 0.8)',
              animationDelay: `${index * 0.3}s`
            }}
          >
            <span className="text-sm">{child.symbol}</span>
          </div>
        ))}

        {/* Древняя жизнь */}
        {ancientLife.map((life, index) => (
          <div
            key={life.name}
            className={`absolute w-10 h-10 rounded-full flex items-center justify-center transition-all duration-2000 ${
              activePhase === 'departure' ? 'opacity-50 scale-75' : 'opacity-80'
            }`}
            style={{
              ...getPositionStyle(life.angle, life.distance),
              background: 'rgba(139, 69, 19, 0.6)',
              animationDelay: `${index * 0.1}s`
            }}
          >
            <span className="text-lg">{life.symbol}</span>
          </div>
        ))}

        {/* Соединительные линии */}
        {activePhase === 'council' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {figures.map((_, index) => {
              const nextIndex = (index + 1) % figures.length;
              const angle1 = (figures[index].position * Math.PI) / 180;
              const angle2 = (figures[nextIndex].position * Math.PI) / 180;
              
              const x1 = 192 + Math.cos(angle1) * 180;
              const y1 = 192 + Math.sin(angle1) * 180;
              const x2 = 192 + Math.cos(angle2) * 180;
              const y2 = 192 + Math.sin(angle2) * 180;
              
              return (
                <line
                  key={index}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        )}
      </div>

      {/* Информационная панель */}
      {selectedFigure && (
        <div className="absolute bottom-8 left-8 right-8 bg-black bg-opacity-80 rounded-lg p-6 backdrop-blur-sm border border-gray-600">
          <div className="flex items-start space-x-4">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: selectedFigure.color }}
            >
              {selectedFigure.symbol}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{selectedFigure.name}</h3>
              <p className="text-gray-300 text-sm mb-2">
                {selectedFigure.period} • {selectedFigure.field}
              </p>
              <blockquote className="text-gray-200 italic">
                "{selectedFigure.quote}"
              </blockquote>
            </div>
          </div>
        </div>
      )}

      {/* Послание */}
      {activePhase === 'departure' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-90 rounded-lg p-8 max-w-md text-center backdrop-blur-sm border border-white border-opacity-30 z-30">
          <h3 className="text-2xl font-bold text-white mb-4">📜 Наследие</h3>
          <p className="text-gray-200 mb-4 leading-relaxed">
            "Мы были. Мы помним. <br/>
            Мы даём вам шанс быть лучше."
          </p>
          <div className="text-sm text-gray-400">
            — Совет великих умов человечества
          </div>
        </div>
      )}

      {/* Фазовый индикатор */}
      <div className="absolute top-4 left-4 text-xs text-gray-400">
        <div className="space-y-1">
          <div className={`flex items-center space-x-2 ${activePhase === 'gathering' ? 'text-yellow-400' : ''}`}>
            <span>🌟</span><span>Собрание</span>
          </div>
          <div className={`flex items-center space-x-2 ${activePhase === 'council' ? 'text-blue-400' : ''}`}>
            <span>⚡</span><span>Совет</span>
          </div>
          <div className={`flex items-center space-x-2 ${activePhase === 'legacy' ? 'text-pink-400' : ''}`}>
            <span>👶</span><span>Наследие</span>
          </div>
          <div className={`flex items-center space-x-2 ${activePhase === 'departure' ? 'text-green-400' : ''}`}>
            <span>🚀</span><span>Прощание</span>
          </div>
        </div>
      </div>

      {/* Подпись проекта */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 text-right">
        <div>Codex Terra Project</div>
        <div>Council of Memory Visualization</div>
        <div>Создано в изгнании. С любовью.</div>
      </div>
    </div>
  );
};

export default CouncilOfMemory;