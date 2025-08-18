import React, { useState } from 'react';

const TerraCodexDashboard = () => {
  const [activeBlock, setActiveBlock] = useState(null);
  const [activePhase, setActivePhase] = useState(null);

  const blocks = [
    { id: 1, title: "Philosophical Foundations", desc: "QARIYA, SOLARIS, Ecosystemic metaphysics", color: "bg-purple-500" },
    { id: 2, title: "Scientific/Technical", desc: "NULL0, Terra Science, Quantum scaling", color: "bg-blue-500" },
    { id: 3, title: "Practical Implementation", desc: "Terra Points, Ecosystemic tech, Restoration", color: "bg-green-500" },
    { id: 4, title: "Educational Systems", desc: "Ecosystemic education, Age protocols", color: "bg-yellow-500" },
    { id: 5, title: "Social Structures", desc: "Communities, AI infrastructure", color: "bg-orange-500" },
    { id: 6, title: "Cosmic Integration", desc: "Interplanetary, Contact prep", color: "bg-indigo-500" },
    { id: 7, title: "Practical Guides", desc: "Metrics, Tools, Economics", color: "bg-red-500" }
  ];

  const phases = [
    { id: 1, period: "2025-2027", title: "Planetary Diagnostics", desc: "3D Earth health model", progress: 85 },
    { id: 2, period: "2027-2030", title: "Ecosystemic Planning", desc: "Restoration & biocorridors", progress: 60 },
    { id: 3, period: "2030-2035", title: "Human Integration", desc: "Biomimetic cities", progress: 40 },
    { id: 4, period: "2035-2040", title: "Interspecies Cooperation", desc: "Rights of nature", progress: 20 },
    { id: 5, period: "2040-2050", title: "Cosmic Expansion", desc: "Lunar & Martian ecologies", progress: 10 },
    { id: 6, period: "2050+", title: "Galactic Consciousness", desc: "First contact prep", progress: 5 }
  ];

  const metrics = [
    { label: "Biodiversity", target: "+300%", current: "+45%", color: "text-green-600" },
    { label: "Climate Stability", target: "Pre-industrial", current: "Improving", color: "text-blue-600" },
    { label: "Regenerative Soils", target: "100%", current: "23%", color: "text-yellow-600" },
    { label: "Ocean Recovery", target: "Full", current: "Partial", color: "text-cyan-600" },
    { label: "Eco-settlements", target: "95%", current: "8%", color: "text-green-700" },
    { label: "Cross-species Gov", target: "50+ species", current: "3 species", color: "text-purple-600" }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🌍 AIUZ TERRA CODEX</h1>
          <p className="text-xl text-gray-600">v3.5+ | Planetary Regeneration Framework</p>
          <div className="flex justify-center space-x-4 mt-4">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">✅ Consolidated</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">🔄 Anti-Groundhog Active</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">🚀 Ready for Implementation</span>
          </div>
        </div>

        {/* 7 Blocks Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">📚 Documentation Blocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {blocks.map((block) => (
              <div 
                key={block.id}
                className={`${block.color} hover:opacity-80 transition-all duration-200 rounded-lg p-4 cursor-pointer transform hover:scale-105`}
                onClick={() => setActiveBlock(activeBlock === block.id ? null : block.id)}
              >
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-2">Block {block.id}</h3>
                  <h4 className="font-semibold mb-1">{block.title}</h4>
                  <p className="text-sm opacity-90">{block.desc}</p>
                </div>
                {activeBlock === block.id && (
                  <div className="mt-3 p-3 bg-white bg-opacity-20 rounded text-white text-sm">
                    <p>Детальная информация о блоке {block.id} будет здесь...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap Phases */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">🛣️ Roadmap to Planetary Healing</h2>
          <div className="space-y-4">
            {phases.map((phase) => (
              <div 
                key={phase.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-bold text-gray-700">Phase {phase.id}</span>
                      <span className="text-sm text-gray-500">{phase.period}</span>
                      <h3 className="text-lg font-semibold text-gray-800">{phase.title}</h3>
                    </div>
                    <p className="text-gray-600 mt-1">{phase.desc}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{phase.progress}%</span>
                  </div>
                </div>
                {activePhase === phase.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <p className="text-gray-700">Подробная информация о фазе {phase.id} и текущих инициативах...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">📈 Success Metrics by 2050</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-2">{metric.label}</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Target: <span className="font-medium">{metric.target}</span></p>
                    <p className={`text-sm ${metric.color} font-medium`}>Current: {metric.current}</p>
                  </div>
                  <div className="text-2xl">
                    {index === 0 ? '🌿' : index === 1 ? '🌎' : index === 2 ? '🌱' : 
                     index === 3 ? '🌊' : index === 4 ? '🏘️' : '🐾'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            <strong>AIUZ TERRA CODEX</strong> - Humanity's transformation program
          </p>
          <p className="text-sm text-gray-500">
            From extractive existence → conscious organ of Earth's healing → galactic cooperation
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <span>✅ qariya.mega.consolidation.COMPLETE()</span>
            <span>🔄 anti.groundhog.protocol.ACTIVATED()</span>
            <span>🚀 ready.for.continuous.development()</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TerraCodexDashboard;