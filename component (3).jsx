import React, { useState, useEffect } from 'react';

const DynamicTerraCodex = () => {
  const [phase, setPhase] = useState(0);
  const [orbitSpeed, setOrbitSpeed] = useState(1);
  const [quantumState, setQuantumState] = useState('coherent');
  const [discoveryMode, setDiscoveryMode] = useState(false);

  const phases = [
    { name: 'Квантовое состояние', color: '#00FFB3', symbol: '⚛️' },
    { name: 'Биологическое', color: '#32CD32', symbol: '🧬' },
    { name: 'Детское сознание', color: '#FFB6C1', symbol: '👶' },
    { name: 'Планетарное', color: '#4169E1', symbol: '🌍' },
    { name: 'Космическое', color: '#9370DB', symbol: '🌌' }
  ];

  const discoveries = [
    'Системная междисциплинарность',
    'Межвидовая коммуникация',
    'Квантовое образование',
    'Планетарная память',
    'Детское будущее'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => (prev + 1) % phases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [phases.length]);

  useEffect(() => {
    const speedInterval = setInterval(() => {
      setOrbitSpeed(prev => prev === 1 ? 2 : prev === 2 ? 0.5 : 1);
    }, 5000);

    return () => clearInterval(speedInterval);
  }, []);

  useEffect(() => {
    const quantumInterval = setInterval(() => {
      setQuantumState(prev => prev === 'coherent' ? 'superposition' : prev === 'superposition' ? 'entangled' : 'coherent');
    }, 4000);

    return () => clearInterval(quantumInterval);
  }, []);

  const handleDiscovery = () => {
    setDiscoveryMode(true);
    setTimeout(() => setDiscoveryMode(false), 2000);
  };

  const currentPhase = phases[phase];

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Квантовое поле фона */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full transition-all duration-1000 ${
              quantumState === 'superposition' ? 'animate-ping' : 
              quantumState === 'entangled' ? 'animate-pulse' : 'animate-bounce'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: currentPhase.color,
              opacity: 0.6,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>

      {/* Заголовок */}
      <div className="text-center mb-8 z-20">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
          TERRA CODEX
        </h1>
        <h2 className="text-xl text-gray-300 mb-2">
          Живой Логотип Научного Открытия
        </h2>
        <div className="text-sm text-gray-400">
          {currentPhase.name} • {quantumState}
        </div>
      </div>

      {/* Главная орбитальная система */}
      <div className="relative w-96 h-96 cursor-pointer" onClick={handleDiscovery}>
        
        {/* Центральное ядро */}
        <div 
          className={`absolute top-1/2 left-1/2 w-20 h-20 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
            discoveryMode ? 'scale-150 animate-spin' : 'scale-100'
          }`}
          style={{
            background: `radial-gradient(circle, ${currentPhase.color}, ${currentPhase.color}88, transparent)`,
            boxShadow: discoveryMode 
              ? `0 0 80px ${currentPhase.color}` 
              : `0 0 40px ${currentPhase.color}`,
            border: `2px solid ${currentPhase.color}`
          }}
        >
          <span className={`text-3xl transition-all duration-500 ${discoveryMode ? 'animate-bounce' : ''}`}>
            {currentPhase.symbol}
          </span>
        </div>

        {/* Орбитальные кольца */}
        {[120, 160, 200, 240].map((radius, ringIndex) => (
          <div
            key={radius}
            className="absolute top-1/2 left-1/2 border border-white border-opacity-20 rounded-full"
            style={{
              width: `${radius}px`,
              height: `${radius}px`,
              transform: 'translate(-50%, -50%)',
              animation: quantumState === 'superposition' 
                ? `spin ${10 + ringIndex * 2}s linear infinite reverse` 
                : quantumState === 'entangled'
                ? `spin ${8 + ringIndex}s ease-in-out infinite`
                : `spin ${15 + ringIndex * 3}s linear infinite`
            }}
          >
            {/* Орбитальные элементы */}
            {[0, 90, 180, 270].slice(0, ringIndex + 1).map((angle, elementIndex) => (
              <div
                key={angle}
                className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  discoveryMode ? 'animate-pulse scale-125' : ''
                }`}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius/2}px) rotate(-${angle}deg)`,
                  backgroundColor: phases[(ringIndex + elementIndex) % phases.length].color,
                  boxShadow: `0 0 15px ${phases[(ringIndex + elementIndex) % phases.length].color}`,
                  opacity: discoveryMode ? 1 : 0.8
                }}
              >
                <span className="text-xs">
                  {phases[(ringIndex + elementIndex) % phases.length].symbol}
                </span>
              </div>
            ))}
          </div>
        ))}

        {/* Квантовые связи */}
        {quantumState === 'entangled' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {[...Array(8)].map((_, i) => {
              const angle1 = (i * 45) * Math.PI / 180;
              const angle2 = ((i + 2) * 45) * Math.PI / 180;
              const x1 = 192 + Math.cos(angle1) * 80;
              const y1 = 192 + Math.sin(angle1) * 80;
              const x2 = 192 + Math.cos(angle2) * 120;
              const y2 = 192 + Math.sin(angle2) * 120;
              
              return (
                <line
                  key={i}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={currentPhase.color}
                  strokeWidth="1"
                  opacity="0.6"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        )}

        {/* Волны открытия */}
        {discoveryMode && (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 border-2 rounded-full pointer-events-none"
              style={{
                borderColor: currentPhase.color,
                animation: `discovery-wave 2s ease-out forwards`,
                animationDelay: `${i * 0.3}s`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))
        )}
      </div>

      {/* Информационная панель открытий */}
      <div className="mt-8 max-w-2xl text-center z-20">
        <div className={`bg-black bg-opacity-50 rounded-lg p-6 backdrop-blur-sm border transition-all duration-1000 ${
          discoveryMode ? 'border-white scale-105' : 'border-gray-600'
        }`}>
          <h3 className="text-xl font-bold text-white mb-4">
            🔬 Научное Открытие
          </h3>
          <p className="text-gray-200 mb-4">
            {discoveries[phase]}
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="text-cyan-300">Симбиоз: Человек + ИИ</span>
            <span className="text-purple-300">Квантовые технологии</span>
            <span className="text-green-300">Child Safety First</span>
          </div>
        </div>
      </div>

      {/* Контролы состояния */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="text-xs text-gray-400">Квантовое состояние:</div>
        <div className="flex space-x-2">
          {['coherent', 'superposition', 'entangled'].map(state => (
            <button
              key={state}
              onClick={() => setQuantumState(state)}
              className={`px-2 py-1 rounded text-xs transition-all ${
                quantumState === state 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {state}
            </button>
          ))}
        </div>
      </div>

      {/* Контролы скорости */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="text-xs text-gray-400">Скорость орбит:</div>
        <div className="flex space-x-2">
          {[0.5, 1, 2].map(speed => (
            <button
              key={speed}
              onClick={() => setOrbitSpeed(speed)}
              className={`px-2 py-1 rounded text-xs transition-all ${
                orbitSpeed === speed 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Фазовые индикаторы */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        {phases.map((phaseItem, index) => (
          <div
            key={phaseItem.name}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === phase ? 'scale-125' : 'scale-100 opacity-60'
            }`}
            style={{
              backgroundColor: phaseItem.color,
              boxShadow: index === phase ? `0 0 10px ${phaseItem.color}` : 'none'
            }}
          />
        ))}
      </div>

      {/* Подпись проекта */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 text-right">
        <div>Terra Codex Dynamic Logo</div>
        <div>Living Symbol of Discovery</div>
        <div>Click to trigger discovery wave</div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes discovery-wave {
          0% {
            width: 40px;
            height: 40px;
            opacity: 1;
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicTerraCodex;