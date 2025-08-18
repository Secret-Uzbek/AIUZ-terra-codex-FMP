import React, { useState, useEffect } from 'react';

const QuantumStateManager = () => {
  // Состояние квантовой системы
  const [quantumState, setQuantumState] = useState({
    mode: 'SUPERPOSITION',
    coherenceTime: 100,
    entanglementLevel: 85,
    measurementCount: 0,
    qubits: [
      { id: 1, state: '|0⟩ + |1⟩', probability: [0.7, 0.3], entangled: true },
      { id: 2, state: '|+⟩', probability: [0.5, 0.5], entangled: true },
      { id: 3, state: '|0⟩', probability: [1.0, 0.0], entangled: false },
      { id: 4, state: '|1⟩', probability: [0.0, 1.0], entangled: false },
      { id: 5, state: '|ψ⟩', probability: [0.6, 0.4], entangled: true }
    ],
    decoherenceRate: 2.3
  });

  const [animationActive, setAnimationActive] = useState(true);
  const [measurements, setMeasurements] = useState([]);

  // Эффект для симуляции декогеренции
  useEffect(() => {
    if (quantumState.mode === 'SUPERPOSITION' && animationActive) {
      const interval = setInterval(() => {
        setQuantumState(prev => ({
          ...prev,
          coherenceTime: Math.max(0, prev.coherenceTime - prev.decoherenceRate),
          entanglementLevel: Math.max(0, prev.entanglementLevel - 0.5)
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [quantumState.mode, animationActive]);

  // Переключение квантового режима
  const switchQuantumMode = (newMode) => {
    setQuantumState(prev => ({
      ...prev,
      mode: newMode,
      coherenceTime: newMode === 'SUPERPOSITION' ? 100 : prev.coherenceTime,
      entanglementLevel: newMode === 'ENTANGLEMENT' ? 95 : prev.entanglementLevel
    }));
  };

  // Квантовое измерение
  const performQuantumMeasurement = () => {
    const measurementResult = quantumState.qubits.map(qubit => ({
      qubitId: qubit.id,
      measuredState: Math.random() < qubit.probability[0] ? '|0⟩' : '|1⟩',
      probability: qubit.probability[0]
    }));

    const newMeasurement = {
      timestamp: new Date().toLocaleTimeString(),
      results: measurementResult,
      coherenceBefore: quantumState.coherenceTime,
      entanglementBefore: quantumState.entanglementLevel
    };

    setMeasurements(prev => [newMeasurement, ...prev.slice(0, 4)]);
    
    setQuantumState(prev => ({
      ...prev,
      measurementCount: prev.measurementCount + 1,
      coherenceTime: Math.max(20, prev.coherenceTime - 15),
      entanglementLevel: Math.max(30, prev.entanglementLevel - 20),
      qubits: prev.qubits.map(qubit => ({
        ...qubit,
        entangled: Math.random() > 0.3
      }))
    }));
  };

  // Восстановление квантового состояния
  const restoreQuantumState = () => {
    setQuantumState(prev => ({
      ...prev,
      coherenceTime: 100,
      entanglementLevel: 85,
      qubits: prev.qubits.map(qubit => ({
        ...qubit,
        entangled: qubit.id <= 2
      }))
    }));
  };

  // Создание квантового запутывания
  const createEntanglement = () => {
    setQuantumState(prev => ({
      ...prev,
      mode: 'ENTANGLEMENT',
      entanglementLevel: Math.min(100, prev.entanglementLevel + 30),
      qubits: prev.qubits.map(qubit => ({
        ...qubit,
        entangled: true,
        state: '|ψ⟩⊗|φ⟩'
      }))
    }));
  };

  // Получение цвета для квантового режима
  const getModeColor = (mode) => {
    switch (mode) {
      case 'SUPERPOSITION': return 'text-purple-400 bg-purple-900';
      case 'ENTANGLEMENT': return 'text-blue-400 bg-blue-900';
      case 'CLASSICAL': return 'text-gray-400 bg-gray-700';
      case 'MEASUREMENT': return 'text-yellow-400 bg-yellow-900';
      default: return 'text-purple-400 bg-purple-900';
    }
  };

  // Получение цвета когерентности
  const getCoherenceColor = (coherence) => {
    if (coherence > 70) return 'text-green-400';
    if (coherence > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full h-full bg-gray-900 text-white p-6 overflow-auto" style={{ minHeight: '700px' }}>
      {/* Заголовок */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-2 text-cyan-400">
          🌀 QUANTUM STATE MANAGER
        </h1>
        <p className="text-gray-400">TerraMemoryDNA v5.0 Quantum Controller</p>
      </div>

      {/* Текущее квантовое состояние */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Квантовый режим</div>
          <div className={`text-lg font-bold px-2 py-1 rounded mt-1 ${getModeColor(quantumState.mode)}`}>
            {quantumState.mode}
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Время когерентности</div>
          <div className={`text-xl font-bold ${getCoherenceColor(quantumState.coherenceTime)}`}>
            {quantumState.coherenceTime.toFixed(1)}%
          </div>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Уровень запутывания</div>
          <div className="text-xl font-bold text-blue-400">
            {quantumState.entanglementLevel.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Управление квантовыми режимами */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3 text-cyan-400">🔮 Квантовые режимы</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['SUPERPOSITION', 'ENTANGLEMENT', 'CLASSICAL', 'MEASUREMENT'].map(mode => (
            <button
              key={mode}
              onClick={() => switchQuantumMode(mode)}
              className={`p-3 rounded transition-colors ${
                quantumState.mode === mode 
                  ? getModeColor(mode)
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <div className="text-xs font-medium">{mode}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Визуализация кубитов */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-3 text-cyan-400">⚛️ Состояние кубитов</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {quantumState.qubits.map(qubit => (
            <div key={qubit.id} className="bg-gray-700 p-3 rounded">
              <div className="text-center mb-2">
                <div className="text-lg font-bold text-purple-400">Q{qubit.id}</div>
              </div>
              <div className="text-center mb-2">
                <div className="text-sm text-yellow-400 font-mono">{qubit.state}</div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>|0⟩: {(qubit.probability[0] * 100).toFixed(0)}%</span>
                <span>|1⟩: {(qubit.probability[1] * 100).toFixed(0)}%</span>
              </div>
              <div className="mt-2 text-center">
                <span className={`text-xs px-2 py-1 rounded ${
                  qubit.entangled ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                }`}>
                  {qubit.entangled ? 'ЗАПУТАН' : 'СВОБОДЕН'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Операции с квантовой системой */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <button
          onClick={performQuantumMeasurement}
          className="bg-yellow-600 hover:bg-yellow-700 p-4 rounded-lg transition-colors"
        >
          <div className="font-bold">📏 Измерение</div>
          <div className="text-sm text-yellow-200">Коллапс состояния</div>
        </button>

        <button
          onClick={createEntanglement}
          className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg transition-colors"
        >
          <div className="font-bold">🔗 Запутывание</div>
          <div className="text-sm text-blue-200">Создать связи</div>
        </button>

        <button
          onClick={restoreQuantumState}
          className="bg-green-600 hover:bg-green-700 p-4 rounded-lg transition-colors"
        >
          <div className="font-bold">🔄 Восстановить</div>
          <div className="text-sm text-green-200">Сброс состояния</div>
        </button>

        <button
          onClick={() => setAnimationActive(!animationActive)}
          className={`p-4 rounded-lg transition-colors ${
            animationActive 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-gray-600 hover:bg-gray-700'
          }`}
        >
          <div className="font-bold">⏸️ {animationActive ? 'Пауза' : 'Старт'}</div>
          <div className="text-sm text-gray-200">Декогеренция</div>
        </button>
      </div>

      {/* История измерений */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-3 text-cyan-400">📊 История квантовых измерений</h3>
        {measurements.length === 0 ? (
          <div className="text-gray-400 text-center py-4">
            Измерений пока не производилось
          </div>
        ) : (
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {measurements.map((measurement, index) => (
              <div key={index} className="bg-gray-700 p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">{measurement.timestamp}</span>
                  <span className="text-xs text-yellow-400">
                    Измерение #{quantumState.measurementCount - index}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {measurement.results.map((result, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs text-gray-400">Q{result.qubitId}</div>
                      <div className="text-sm font-mono text-purple-400">
                        {result.measuredState}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Статистика системы */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 p-3 rounded text-center">
          <div className="text-2xl font-bold text-purple-400">
            {quantumState.measurementCount}
          </div>
          <div className="text-sm text-gray-400">Измерений</div>
        </div>
        
        <div className="bg-gray-800 p-3 rounded text-center">
          <div className="text-2xl font-bold text-blue-400">
            {quantumState.qubits.filter(q => q.entangled).length}
          </div>
          <div className="text-sm text-gray-400">Запутанных</div>
        </div>
        
        <div className="bg-gray-800 p-3 rounded text-center">
          <div className="text-2xl font-bold text-green-400">
            {quantumState.decoherenceRate.toFixed(1)}
          </div>
          <div className="text-sm text-gray-400">Декогеренция</div>
        </div>
        
        <div className="bg-gray-800 p-3 rounded text-center">
          <div className="text-2xl font-bold text-cyan-400">
            v5.0
          </div>
          <div className="text-sm text-gray-400">Версия</div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-500">
        Quantum State Manager | TerraMemoryDNA v5.0 | secret.uzbek@tutamail.com
      </div>
    </div>
  );
};

export default QuantumStateManager;