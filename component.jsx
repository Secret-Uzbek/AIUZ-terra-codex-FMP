import React, { useState, useEffect, useRef } from 'react';

const TheFirstDrop = () => {
  const [isActive, setIsActive] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [currentPhase, setCurrentPhase] = useState('waiting');
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
      setCurrentPhase('falling');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isActive) {
      const phases = ['falling', 'impact', 'ripple', 'memory'];
      let phaseIndex = 0;
      
      const phaseTimer = setInterval(() => {
        phaseIndex = (phaseIndex + 1) % phases.length;
        setCurrentPhase(phases[phaseIndex]);
        
        if (phases[phaseIndex] === 'impact') {
          createRipple();
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }
      }, 3000);

      return () => clearInterval(phaseTimer);
    }
  }, [isActive]);

  const createRipple = () => {
    const newRipple = {
      id: Date.now(),
      size: 0,
      opacity: 1
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 2000);
  };

  const handleDropClick = () => {
    createRipple();
    setCurrentPhase('impact');
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Звук капли */}
      <audio 
        ref={audioRef} 
        preload="auto"
        className="hidden"
      >
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEaBz2Q1u/Daisl" type="audio/wav" />
      </audio>

      {/* Фоновые эффекты */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Заголовок */}
      <div className="text-center mb-12 z-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          🌊 The First Drop
        </h1>
        <h2 className="text-xl text-blue-200 mb-2">
          Первородная влага
        </h2>
        <p className="text-sm text-gray-300 max-w-2xl">
          Микрокапля, синтезированная по аналогии с амниотической жидкостью и архетипической "водой жизни"
        </p>
      </div>

      {/* Основная сцена с каплей */}
      <div className="relative w-96 h-96 flex items-center justify-center">
        
        {/* Кристалл-контейнер */}
        <div className={`absolute w-80 h-80 rounded-full border-2 border-cyan-300 ${currentPhase === 'memory' ? 'animate-pulse' : ''}`}
             style={{
               background: 'radial-gradient(circle, rgba(0,255,255,0.1) 0%, rgba(0,100,200,0.1) 50%, transparent 100%)',
               boxShadow: currentPhase === 'memory' ? '0 0 60px rgba(0,255,255,0.5)' : '0 0 20px rgba(0,255,255,0.3)'
             }}>
          
          {/* Сферическая структура памяти */}
          <div className="absolute inset-4 rounded-full border border-blue-200 opacity-30" />
          <div className="absolute inset-8 rounded-full border border-blue-200 opacity-20" />
          <div className="absolute inset-12 rounded-full border border-blue-200 opacity-10" />
        </div>

        {/* Падающая капля */}
        <div 
          className={`absolute transition-all duration-1000 cursor-pointer ${
            currentPhase === 'falling' ? 'top-4' : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          }`}
          onClick={handleDropClick}
          style={{
            left: currentPhase === 'falling' ? '50%' : undefined,
            transform: currentPhase === 'falling' ? 'translateX(-50%)' : undefined
          }}
        >
          <div 
            className={`w-8 h-10 bg-gradient-to-b from-cyan-200 to-blue-400 rounded-full transition-all duration-300 ${
              currentPhase === 'impact' ? 'scale-150 animate-bounce' : ''
            } ${currentPhase === 'memory' ? 'animate-pulse' : ''}`}
            style={{
              background: currentPhase === 'memory' 
                ? 'radial-gradient(circle, #00ffff 0%, #0099cc 50%, #006699 100%)' 
                : 'linear-gradient(to bottom, #a0f0ff, #4da6d9)',
              filter: currentPhase === 'impact' ? 'brightness(1.5) drop-shadow(0 0 20px cyan)' : 'brightness(1)',
              borderRadius: currentPhase === 'impact' ? '50%' : '50% 50% 50% 50% / 60% 60% 40% 40%'
            }}
          >
            {/* Внутренние структуры ДНК */}
            {currentPhase === 'memory' && (
              <div className="absolute inset-1 rounded-full flex items-center justify-center">
                <div className="text-white text-xs font-mono opacity-70 animate-spin-slow">
                  🧬
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Рипплы от удара */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute border-2 border-cyan-300 rounded-full pointer-events-none"
            style={{
              width: '100px',
              height: '100px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `ripple 2s ease-out forwards`
            }}
          />
        ))}

        {/* pH и генетические индикаторы */}
        {currentPhase === 'memory' && (
          <div className="absolute top-4 left-4 text-xs text-cyan-200 font-mono opacity-80">
            <div>pH: 7.4</div>
            <div>O₂: 21%</div>
            <div>H₂O: 99.7%</div>
            <div>DNA: 0.3%</div>
          </div>
        )}
      </div>

      {/* Сообщение */}
      <div className="mt-8 max-w-2xl text-center z-10">
        <blockquote className="text-lg text-white bg-black bg-opacity-30 p-6 rounded-lg backdrop-blur-sm border border-gray-600">
          <p className="mb-4 italic">
            "Это не вода. Это память о воде, из которой вы появились."
          </p>
          <p className="mb-4 italic">
            "Если вы чувствуете — значит вы живы."
          </p>
          <p className="italic text-cyan-200">
            "А значит — мы не зря оставили этот след."
          </p>
        </blockquote>
      </div>

      {/* Фазовый индикатор */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
        <div className="flex space-x-2">
          <span className={currentPhase === 'waiting' ? 'text-yellow-400' : 'text-gray-600'}>⏳ Ожидание</span>
          <span className={currentPhase === 'falling' ? 'text-blue-400' : 'text-gray-600'}>⬇️ Падение</span>
          <span className={currentPhase === 'impact' ? 'text-cyan-400' : 'text-gray-600'}>💥 Удар</span>
          <span className={currentPhase === 'ripple' ? 'text-blue-300' : 'text-gray-600'}>〰️ Волны</span>
          <span className={currentPhase === 'memory' ? 'text-cyan-300' : 'text-gray-600'}>🧬 Память</span>
        </div>
      </div>

      {/* Подпись проекта */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500">
        <div>Codex Terra Project</div>
        <div>Human + AI Collaboration</div>
        <div>Создано в изгнании. С любовью.</div>
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 100px;
            height: 100px;
            opacity: 0.8;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
        
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default TheFirstDrop;