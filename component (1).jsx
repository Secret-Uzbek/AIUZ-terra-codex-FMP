import React, { useState, useEffect, useRef } from 'react';

const InteractiveSystems = () => {
  const [activeSystem, setActiveSystem] = useState('ecosystem');
  const [dataFlow, setDataFlow] = useState([]);
  const [connections, setConnections] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const canvasRef = useRef(null);

  const systems = {
    ecosystem: {
      name: 'Terra Ecosystem',
      color: '#00FFB3',
      nodes: [
        { id: 'child', label: '👶 Ребёнок', x: 200, y: 150, type: 'primary' },
        { id: 'ai', label: '🤖 ИИ', x: 350, y: 150, type: 'primary' },
        { id: 'nature', label: '🌱 Природа', x: 275, y: 80, type: 'secondary' },
        { id: 'education', label: '📚 Образование', x: 120, y: 220, type: 'secondary' },
        { id: 'technology', label: '⚛️ Технологии', x: 430, y: 220, type: 'secondary' },
        { id: 'safety', label: '🛡️ Безопасность', x: 275, y: 250, type: 'support' }
      ],
      connections: [
        { from: 'child', to: 'ai', type: 'bidirectional', strength: 0.9 },
        { from: 'child', to: 'nature', type: 'bidirectional', strength: 0.8 },
        { from: 'child', to: 'education', type: 'input', strength: 0.7 },
        { from: 'ai', to: 'technology', type: 'output', strength: 0.8 },
        { from: 'nature', to: 'ai', type: 'input', strength: 0.6 },
        { from: 'safety', to: 'child', type: 'protection', strength: 1.0 },
        { from: 'safety', to: 'ai', type: 'regulation', strength: 0.9 }
      ]
    },
    interdisciplinary: {
      name: 'Системная междисциплинарность',
      color: '#9370DB',
      nodes: [
        { id: 'quantum', label: '⚛️ Квант', x: 275, y: 100, type: 'primary' },
        { id: 'bio', label: '🧬 Био', x: 200, y: 180, type: 'primary' },
        { id: 'neuro', label: '🧠 Нейро', x: 350, y: 180, type: 'primary' },
        { id: 'tech', label: '💻 Тех', x: 120, y: 260, type: 'secondary' },
        { id: 'eco', label: '🌍 Эко', x: 275, y: 280, type: 'secondary' },
        { id: 'cosmic', label: '🌌 Космо', x: 430, y: 260, type: 'secondary' },
        { id: 'system', label: '🔄 Система', x: 275, y: 200, type: 'core' }
      ],
      connections: [
        { from: 'system', to: 'quantum', type: 'emerge', strength: 0.9 },
        { from: 'system', to: 'bio', type: 'emerge', strength: 0.9 },
        { from: 'system', to: 'neuro', type: 'emerge', strength: 0.9 },
        { from: 'quantum', to: 'bio', type: 'influence', strength: 0.7 },
        { from: 'bio', to: 'neuro', type: 'influence', strength: 0.8 },
        { from: 'neuro', to: 'tech', type: 'application', strength: 0.6 },
        { from: 'bio', to: 'eco', type: 'integration', strength: 0.8 },
        { from: 'quantum', to: 'cosmic', type: 'scale', strength: 0.7 }
      ]
    },
    communication: {
      name: 'Межвидовая коммуникация',
      color: '#32CD32',
      nodes: [
        { id: 'human', label: '👤 Человек', x: 275, y: 150, type: 'primary' },
        { id: 'plant', label: '🌿 Растения', x: 150, y: 100, type: 'species' },
        { id: 'animal', label: '🐾 Животные', x: 400, y: 100, type: 'species' },
        { id: 'water', label: '💧 Вода', x: 150, y: 200, type: 'species' },
        { id: 'soil', label: '🌍 Почва', x: 400, y: 200, type: 'species' },
        { id: 'ai_translator', label: '🔤 ИИ-переводчик', x: 275, y: 250, type: 'bridge' }
      ],
      connections: [
        { from: 'human', to: 'plant', type: 'chemical', strength: 0.6 },
        { from: 'human', to: 'animal', type: 'sound', strength: 0.8 },
        { from: 'human', to: 'water', type: 'vibration', strength: 0.5 },
        { from: 'human', to: 'soil', type: 'electromagnetic', strength: 0.4 },
        { from: 'ai_translator', to: 'human', type: 'interface', strength: 0.9 },
        { from: 'ai_translator', to: 'plant', type: 'decode', strength: 0.7 },
        { from: 'ai_translator', to: 'animal', type: 'decode', strength: 0.8 }
      ]
    }
  };

  const currentSystem = systems[activeSystem];

  // Анимация потоков данных
  useEffect(() => {
    const interval = setInterval(() => {
      const connection = currentSystem.connections[Math.floor(Math.random() * currentSystem.connections.length)];
      const fromNode = currentSystem.nodes.find(n => n.id === connection.from);
      const toNode = currentSystem.nodes.find(n => n.id === connection.to);
      
      if (fromNode && toNode) {
        const newFlow = {
          id: Date.now(),
          fromX: fromNode.x,
          fromY: fromNode.y,
          toX: toNode.x,
          toY: toNode.y,
          progress: 0,
          type: connection.type,
          strength: connection.strength
        };
        
        setDataFlow(prev => [...prev, newFlow]);
        
        setTimeout(() => {
          setDataFlow(prev => prev.filter(flow => flow.id !== newFlow.id));
        }, 2000);
      }
    }, 1000 / animationSpeed);

    return () => clearInterval(interval);
  }, [activeSystem, animationSpeed, currentSystem]);

  // Анимация движения частиц
  useEffect(() => {
    let animationId;
    
    const animate = () => {
      setDataFlow(prev => prev.map(flow => ({
        ...flow,
        progress: Math.min(flow.progress + 0.02 * animationSpeed, 1)
      })));
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [animationSpeed]);

  const getNodeStyle = (node) => {
    const baseClasses = "absolute rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg";
    
    const sizeClasses = {
      primary: "w-16 h-16",
      secondary: "w-12 h-12", 
      support: "w-10 h-10",
      species: "w-12 h-12",
      bridge: "w-14 h-14",
      core: "w-18 h-18"
    };

    const colorStyles = {
      primary: { backgroundColor: currentSystem.color, borderColor: 'white' },
      secondary: { backgroundColor: currentSystem.color + '80', borderColor: currentSystem.color },
      support: { backgroundColor: '#FFB6C1', borderColor: '#FF69B4' },
      species: { backgroundColor: '#90EE90', borderColor: '#32CD32' },
      bridge: { backgroundColor: '#87CEEB', borderColor: '#4169E1' },
      core: { backgroundColor: currentSystem.color, borderColor: 'white', boxShadow: `0 0 20px ${currentSystem.color}` }
    };

    return {
      className: `${baseClasses} ${sizeClasses[node.type] || sizeClasses.secondary}`,
      style: {
        left: `${node.x - 32}px`,
        top: `${node.y - 32}px`,
        ...colorStyles[node.type]
      }
    };
  };

  const getConnectionPath = (from, to) => {
    const fromNode = currentSystem.nodes.find(n => n.id === from);
    const toNode = currentSystem.nodes.find(n => n.id === to);
    
    if (!fromNode || !toNode) return '';
    
    // Создаём плавную кривую
    const midX = (fromNode.x + toNode.x) / 2;
    const midY = (fromNode.y + toNode.y) / 2 - 20;
    
    return `M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`;
  };

  const getFlowPosition = (flow) => {
    const dx = flow.toX - flow.fromX;
    const dy = flow.toY - flow.fromY;
    const x = flow.fromX + dx * flow.progress;
    const y = flow.fromY + dy * flow.progress;
    return { x, y };
  };

  return (
    <div className="relative w-full h-full min-h-[700px] bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 flex flex-col">
      
      {/* Заголовок и контролы */}
      <div className="flex justify-between items-center p-6 bg-black bg-opacity-30">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            🎨 Интерактивные Диаграммы
          </h1>
          <h2 className="text-lg text-gray-300">
            Системы в движении
          </h2>
        </div>
        
        <div className="flex space-x-4">
          {Object.entries(systems).map(([key, system]) => (
            <button
              key={key}
              onClick={() => setActiveSystem(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeSystem === key
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {system.name}
            </button>
          ))}
        </div>
      </div>

      {/* Контролы анимации */}
      <div className="flex justify-center p-4 space-x-4">
        <div className="flex items-center space-x-2 text-white">
          <span className="text-sm">Скорость:</span>
          {[0.5, 1, 2, 3].map(speed => (
            <button
              key={speed}
              onClick={() => setAnimationSpeed(speed)}
              className={`px-3 py-1 rounded transition-all ${
                animationSpeed === speed
                  ? 'bg-cyan-500 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Основная диаграмма */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0" ref={canvasRef}>
          
          {/* SVG для соединений */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Статические соединения */}
            {currentSystem.connections.map((connection, index) => (
              <path
                key={index}
                d={getConnectionPath(connection.from, connection.to)}
                stroke={currentSystem.color}
                strokeWidth={Math.max(1, connection.strength * 3)}
                fill="none"
                opacity={0.3}
                strokeDasharray={connection.type === 'bidirectional' ? '5,5' : 'none'}
              />
            ))}
            
            {/* Стрелки направления */}
            {currentSystem.connections.map((connection, index) => {
              const fromNode = currentSystem.nodes.find(n => n.id === connection.from);
              const toNode = currentSystem.nodes.find(n => n.id === connection.to);
              if (!fromNode || !toNode) return null;
              
              const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
              const arrowX = toNode.x - Math.cos(angle) * 35;
              const arrowY = toNode.y - Math.sin(angle) * 35;
              
              return (
                <polygon
                  key={`arrow-${index}`}
                  points="0,-5 10,0 0,5"
                  fill={currentSystem.color}
                  opacity={0.6}
                  transform={`translate(${arrowX}, ${arrowY}) rotate(${angle * 180 / Math.PI})`}
                />
              );
            })}
          </svg>

          {/* Узлы системы */}
          {currentSystem.nodes.map((node) => {
            const nodeStyle = getNodeStyle(node);
            return (
              <div
                key={node.id}
                className={nodeStyle.className}
                style={nodeStyle.style}
                title={node.label}
              >
                <span className="text-center leading-tight">
                  {node.label}
                </span>
              </div>
            );
          })}

          {/* Анимированные частицы потока данных */}
          {dataFlow.map((flow) => {
            const position = getFlowPosition(flow);
            return (
              <div
                key={flow.id}
                className="absolute w-3 h-3 rounded-full pointer-events-none transition-all duration-75"
                style={{
                  left: `${position.x - 6}px`,
                  top: `${position.y - 6}px`,
                  backgroundColor: currentSystem.color,
                  boxShadow: `0 0 10px ${currentSystem.color}`,
                  opacity: Math.sin(flow.progress * Math.PI) // Плавное появление и исчезание
                }}
              />
            );
          })}

          {/* Эффекты взаимодействия */}
          {currentSystem.nodes.map((node, index) => (
            <div
              key={`pulse-${node.id}`}
              className="absolute rounded-full pointer-events-none animate-ping"
              style={{
                left: `${node.x - 40}px`,
                top: `${node.y - 40}px`,
                width: '80px',
                height: '80px',
                backgroundColor: currentSystem.color,
                opacity: 0.1,
                animationDelay: `${index * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Информационная панель */}
      <div className="p-6 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">
            {currentSystem.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-cyan-300 mb-2">Узлы системы:</h4>
              <div className="text-gray-300 space-y-1">
                {currentSystem.nodes.map(node => (
                  <div key={node.id}>{node.label}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-purple-300 mb-2">Типы связей:</h4>
              <div className="text-gray-300 space-y-1">
                <div>↔️ Двунаправленные</div>
                <div>→ Влияние</div>
                <div>⚡ Эмерджентные</div>
                <div>🔄 Обратная связь</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-green-300 mb-2">Характеристики:</h4>
              <div className="text-gray-300 space-y-1">
                <div>Узлов: {currentSystem.nodes.length}</div>
                <div>Связей: {currentSystem.connections.length}</div>
                <div>Активных потоков: {dataFlow.length}</div>
                <div>Скорость: {animationSpeed}x</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Подпись проекта */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 text-right">
        <div>Terra Interactive Systems</div>
        <div>Dynamic Visualization Engine</div>
        <div>Real-time Data Flow Simulation</div>
      </div>
    </div>
  );
};

export default InteractiveSystems;