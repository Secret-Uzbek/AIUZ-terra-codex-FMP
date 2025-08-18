import React, { useState } from 'react';

const FMPAnalysisDashboard = () => {
  const [activeSection, setActiveSection] = useState('coherence');
  
  const coherenceData = {
    strengths: [
      { title: "Structural Recursion", score: 95, description: "Монография демонстрирует фрактальные свойства в собственной структуре" },
      { title: "Cross-Scale Integration", score: 90, description: "Успешное масштабирование принципов от индивидуального к глобальному" },
      { title: "Methodological Consistency", score: 88, description: "Последовательное применение участной валидации" }
    ],
    improvements: [
      { title: "Empirical Grounding", priority: "HIGH", description: "Нужны дополнительные эмпирические валидации" },
      { title: "Cultural Sensitivity", priority: "MEDIUM", description: "Расширение неза падных эпистемологических перспектив" },
      { title: "Practical Implementation", priority: "HIGH", description: "Больше конкретных руководств для практиков" }
    ]
  };

  const publicationStrategy = [
    { venue: "arXiv", timeline: "Immediate", status: "ready", priority: 1 },
    { venue: "Complexity Journal", timeline: "3-6 months", status: "revision-needed", priority: 1 },
    { venue: "RINC Journals", timeline: "6-12 months", status: "translation-needed", priority: 2 },
    { venue: "Local Uzbek", timeline: "12+ months", status: "adaptation-needed", priority: 3 }
  ];

  const actionPlan = [
    { task: "Bibliography & Citations", time: "20 mins", status: "ready", priority: 1 },
    { task: "Publication Strategy", time: "25 mins", status: "ready", priority: 1 },
    { task: "Discipline Proposal", time: "15 mins", status: "ready", priority: 2 },
    { task: "Visual Navigation Map", time: "10 mins", status: "ready", priority: 2 }
  ];

  const stats = {
    totalWords: "~50,000",
    sections: "10 major chapters",
    references: "127+ academic sources",
    principles: "3 fundamental FMP principles",
    caseStudies: "3 detailed applications"
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🔬 FMP Monograph Strategic Analysis
        </h1>
        <p className="text-lg text-gray-600">
          Fractal Metascience analyzing itself - recursive coherence validation
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-lg p-1 flex space-x-1">
          {['coherence', 'strategy', 'action', 'stats'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeSection === section
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {section === 'coherence' && '🧠 Coherence'}
              {section === 'strategy' && '📚 Publication'}
              {section === 'action' && '🎯 Action Plan'}
              {section === 'stats' && '📊 Statistics'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      {activeSection === 'coherence' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
              ✅ Fractal Self-Similarity Strengths
            </h2>
            <div className="space-y-4">
              {coherenceData.strengths.map((strength, index) => (
                <div key={index} className="border-l-4 border-green-400 pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{strength.title}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {strength.score}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{strength.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Enhancement */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-amber-600 mb-4 flex items-center">
              ⚠️ Enhancement Opportunities
            </h2>
            <div className="space-y-4">
              {coherenceData.improvements.map((improvement, index) => (
                <div key={index} className="border-l-4 border-amber-400 pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">{improvement.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      improvement.priority === 'HIGH' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {improvement.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{improvement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'strategy' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">📚 Publication Roadmap</h2>
          <div className="space-y-4">
            {publicationStrategy.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${
                    item.priority === 1 ? 'bg-red-400' : 
                    item.priority === 2 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.venue}</h3>
                    <p className="text-sm text-gray-600">{item.timeline}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  item.status === 'ready' ? 'bg-green-100 text-green-800' :
                  item.status === 'revision-needed' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === 'action' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">🎯 Immediate Action Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actionPlan.map((action, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{action.task}</h3>
                  <span className="text-sm text-gray-500">{action.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    action.priority === 1 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    Priority {action.priority}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {action.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">🔄 Recursive Implementation Strategy</h3>
            <div className="space-y-2 text-sm text-purple-700">
              <p><strong>Cycle 1</strong> (This session): Core infrastructure (bibliography, formatting)</p>
              <p><strong>Cycle 2</strong> (Next session): Refinement and expansion</p>
              <p><strong>Cycle 3</strong> (Future): Community engagement and validation</p>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'stats' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{value}</div>
              <div className="text-sm text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">🚀 Ready to Proceed?</h2>
        <p className="mb-4">Following FMP methodology with iterative cycles and participatory validation</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Bibliography Generation
          </button>
          <button className="border border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Begin Publication Strategy
          </button>
        </div>
      </div>
    </div>
  );
};

export default FMPAnalysisDashboard;