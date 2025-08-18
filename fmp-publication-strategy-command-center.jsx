import React, { useState, useEffect } from 'react';

const FMPPublicationStrategy = () => {
  const [activePhase, setActivePhase] = useState('phase1');
  const [completedTasks, setCompletedTasks] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState({});

  // Phases data
  const phases = {
    phase1: {
      title: "Preprint & Open Access",
      timeline: "0-3 months",
      color: "bg-green-500",
      platforms: [
        { name: "arXiv", format: "PDF + LaTeX", audience: "International researchers", status: "ready" },
        { name: "ResearchGate", format: "PDF + materials", audience: "Academic network", status: "ready" },
        { name: "Academia.edu", format: "Formatted chapters", audience: "Broader academic", status: "ready" },
        { name: "SSRN", format: "Social science focus", audience: "Policy researchers", status: "ready" }
      ]
    },
    phase2: {
      title: "Peer-Reviewed Journals",
      timeline: "3-18 months",
      color: "bg-blue-500",
      platforms: [
        { name: "Complexity", impact: "2.3", focus: "Complex systems", status: "targeting" },
        { name: "Systems Research", impact: "1.8", focus: "Systems thinking", status: "targeting" },
        { name: "Futures", impact: "3.0", focus: "Future studies", status: "targeting" },
        { name: "AI & Society", impact: "3.5", focus: "AI ethics/philosophy", status: "targeting" }
      ]
    },
    phase3: {
      title: "Russian Academic Integration",
      timeline: "6-12 months",
      color: "bg-purple-500",
      platforms: [
        { name: "Вопросы философии", focus: "Philosophical foundations", status: "translation-needed" },
        { name: "Образование и наука", focus: "Educational applications", status: "translation-needed" },
        { name: "Искусственный интеллект", focus: "AI applications", status: "translation-needed" },
        { name: "Системный анализ", focus: "Systems thinking", status: "translation-needed" }
      ]
    },
    phase4: {
      title: "Central Asian Integration",
      timeline: "12+ months",
      color: "bg-orange-500",
      platforms: [
        { name: "НУУз им. Мирзо Улугбека", focus: "National University", status: "cultural-adaptation" },
        { name: "ТУИТ", focus: "IT University", status: "cultural-adaptation" },
        { name: "Узбекский журнал образовательных технологий", focus: "Educational Technology", status: "cultural-adaptation" }
      ]
    }
  };

  const conferences = [
    { name: "NetSci 2025", date: "May 2025", location: "Vienna", deadline: "January 2025", relevance: "Network science", priority: "high" },
    { name: "ICCS 2025", date: "June 2025", location: "Barcelona", deadline: "February 2025", relevance: "Complex systems", priority: "high" },
    { name: "AERA 2025", date: "April 2025", location: "Chicago", deadline: "October 2024", relevance: "Educational applications", priority: "medium" },
    { name: "AIES 2025", date: "August 2025", location: "Berkeley", deadline: "March 2025", relevance: "AI ethics", priority: "high" }
  ];

  const immediateActions = [
    { task: "arXiv submission preparation", timeframe: "This Week", priority: "critical", completed: false },
    { task: "Journal target list refinement", timeframe: "This Week", priority: "high", completed: false },
    { task: "Network activation", timeframe: "This Week", priority: "high", completed: false },
    { task: "Conference submissions", timeframe: "This Month", priority: "medium", completed: false },
    { task: "Peer review registration", timeframe: "This Month", priority: "medium", completed: false },
    { task: "Collaboration outreach", timeframe: "This Month", priority: "medium", completed: false }
  ];

  const successMetrics = {
    quantitative: [
      { metric: "Citation count", target: "100+ in first year", current: "0" },
      { metric: "Downloads/views", target: "10,000+ views", current: "0" },
      { metric: "H-index contribution", target: "+3 points", current: "0" },
      { metric: "Media mentions", target: "50+ mentions", current: "0" }
    ],
    qualitative: [
      { metric: "Keynote invitations", status: "pending" },
      { metric: "Editorial board appointments", status: "pending" },
      { metric: "Collaboration requests", status: "pending" },
      { metric: "Course adoptions", status: "pending" }
    ]
  };

  const toggleTask = (index) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedTasks(newCompleted);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'targeting': return 'bg-blue-100 text-blue-800';
      case 'translation-needed': return 'bg-purple-100 text-purple-800';
      case 'cultural-adaptation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🌍 FMP Global Publication Strategy
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Fractal Metascience Paradigm: Strategic Dissemination for Scientific Revolution
        </p>
        <div className="bg-white rounded-lg p-4 shadow-lg inline-block">
          <div className="text-2xl font-bold text-indigo-600">127+ References • 50K+ Words • 4 Publication Phases</div>
        </div>
      </div>

      {/* Phase Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(phases).map(([key, phase]) => (
            <button
              key={key}
              onClick={() => setActivePhase(key)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activePhase === key
                  ? `${phase.color} text-white shadow-lg transform scale-105`
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              <div className="text-sm opacity-75">{phase.timeline}</div>
              <div>{phase.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Phase Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Phase Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <div className={`w-4 h-4 rounded-full ${phases[activePhase].color} mr-3`}></div>
              {phases[activePhase].title}
            </h2>
            <div className="space-y-4">
              {phases[activePhase].platforms.map((platform, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{platform.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(platform.status)}`}>
                      {platform.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {platform.format && <div><strong>Format:</strong> {platform.format}</div>}
                    {platform.audience && <div><strong>Audience:</strong> {platform.audience}</div>}
                    {platform.impact && <div><strong>Impact Factor:</strong> {platform.impact}</div>}
                    {platform.focus && <div><strong>Focus:</strong> {platform.focus}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Success Metrics</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Quantitative</h4>
                {successMetrics.quantitative.map((metric, index) => (
                  <div key={index} className="text-sm mb-2">
                    <div className="flex justify-between">
                      <span>{metric.metric}</span>
                      <span className="text-gray-500">{metric.current}</span>
                    </div>
                    <div className="text-xs text-gray-500">Target: {metric.target}</div>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Qualitative</h4>
                {successMetrics.qualitative.map((metric, index) => (
                  <div key={index} className="text-sm mb-2 flex justify-between">
                    <span>{metric.metric}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{metric.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Living Document Badge */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-white">
            <h4 className="font-bold mb-2">💡 Innovation</h4>
            <div className="text-sm">
              <strong>"Living Document" Strategy</strong>
              <ul className="mt-2 text-xs opacity-90">
                <li>• Version control</li>
                <li>• Community contributions</li>
                <li>• Recursive refinement</li>
                <li>• Multi-format adaptations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Conference Strategy */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Target Conferences 2025</h3>
          <div className="space-y-3">
            {conferences.map((conf, index) => (
              <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{conf.name}</h4>
                    <div className="text-sm text-gray-600">{conf.date} • {conf.location}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    conf.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {conf.priority}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  <strong>Deadline:</strong> {conf.deadline} • <strong>Focus:</strong> {conf.relevance}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">🚀 Immediate Actions</h3>
          <div className="space-y-3">
            {immediateActions.map((action, index) => (
              <div key={index} className={`border rounded-lg p-3 ${getPriorityColor(action.priority)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={completedTasks.has(index)}
                      onChange={() => toggleTask(index)}
                      className="mr-3 h-4 w-4"
                    />
                    <div>
                      <div className={`font-medium ${completedTasks.has(index) ? 'line-through opacity-60' : ''}`}>
                        {action.task}
                      </div>
                      <div className="text-xs opacity-75">{action.timeframe}</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {action.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">🌟 Strategic Revolution Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm">Publication Phases</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-2xl font-bold">15+</div>
            <div className="text-sm">Target Journals</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm">Key Conferences</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-2xl font-bold">{completedTasks.size}/{immediateActions.length}</div>
            <div className="text-sm">Tasks Complete</div>
          </div>
        </div>
        <p className="text-lg opacity-90">
          Following FMP principles: recursive refinement, fractal dissemination, living document evolution
        </p>
      </div>
    </div>
  );
};

export default FMPPublicationStrategy;