import React, { useState, useEffect } from 'react';

const { useStoredState } = hatch;

const GreenStationPlanner = () => {
  const [currentProject, setCurrentProject] = useStoredState('terra_project', {
    name: 'Зеленая Станция Ташкент-1',
    location: 'Ташкент, Узбекистан',
    climate: 'континентальный',
    area: 1000,
    capacity: 500,
    energySource: 'solar',
    waterSystem: 'recycling',
    materials: ['eco-concrete', 'local-stone'],
    budget: 250000,
    timeline: 18
  });
  
  const [calculations, setCalculations] = useState({});
  const [language, setLanguage] = useStoredState('terra_language', 'ru');
  
  const translations = {
    ru: {
      title: '🏗️ Архитектурный Планировщик Зеленых Станций',
      subtitle: 'TERRA v6.0 - Планирование для климата Узбекистана',
      project: 'Проект',
      location: 'Местоположение',
      climate: 'Климат',
      area: 'Площадь (м²)',
      capacity: 'Вместимость (чел)',
      energySource: 'Источник энергии',
      waterSystem: 'Система водоснабжения',
      materials: 'Материалы',
      budget: 'Бюджет ($)',
      timeline: 'Срок (месяцы)',
      calculate: 'Рассчитать проект',
      results: 'Результаты расчета'
    },
    uz: {
      title: '🏗️ Yashil Stansiyalar Arxitektura Rejalashtiruvchisi',
      subtitle: 'TERRA v6.0 - O\'zbekiston iqlimi uchun rejalashtirish',
      project: 'Loyiha',
      location: 'Joylashuv',
      climate: 'Iqlim',
      area: 'Maydon (m²)',
      capacity: 'Sig\'im (kishi)',
      energySource: 'Energiya manbai',
      waterSystem: 'Suv ta\'minoti tizimi',
      materials: 'Materiallar',
      budget: 'Byudjet ($)',
      timeline: 'Muddat (oy)',
      calculate: 'Loyihani hisoblash',
      results: 'Hisoblash natijalari'
    },
    de: {
      title: '🏗️ Architektur-Planer für Grüne Stationen',
      subtitle: 'TERRA v6.0 - Planung für Usbekistans Klima',
      project: 'Projekt',
      location: 'Standort',
      climate: 'Klima',
      area: 'Fläche (m²)',
      capacity: 'Kapazität (Pers.)',
      energySource: 'Energiequelle',
      waterSystem: 'Wassersystem',
      materials: 'Materialien',
      budget: 'Budget ($)',
      timeline: 'Zeitrahmen (Monate)',
      calculate: 'Projekt berechnen',
      results: 'Berechnungsergebnisse'
    },
    en: {
      title: '🏗️ Architectural Planner for Green Stations',
      subtitle: 'TERRA v6.0 - Planning for Uzbekistan Climate',
      project: 'Project',
      location: 'Location',
      climate: 'Climate',
      area: 'Area (m²)',
      capacity: 'Capacity (people)',
      energySource: 'Energy Source',
      waterSystem: 'Water System',
      materials: 'Materials',
      budget: 'Budget ($)',
      timeline: 'Timeline (months)',
      calculate: 'Calculate Project',
      results: 'Calculation Results'
    }
  };

  const t = translations[language];

  const climateZones = {
    ru: ['континентальный', 'пустынный', 'степной', 'горный'],
    uz: ['kontinental', 'cho\'l', 'dasht', 'tog\'li'],
    de: ['kontinental', 'Wüste', 'Steppe', 'Gebirge'],
    en: ['continental', 'desert', 'steppe', 'mountain']
  };

  const energySources = {
    ru: ['solar', 'wind', 'geothermal', 'hybrid'],
    uz: ['quyosh', 'shamol', 'geotermal', 'gibrid'],
    de: ['Solar', 'Wind', 'Geothermie', 'Hybrid'],
    en: ['solar', 'wind', 'geothermal', 'hybrid']
  };

  const waterSystems = {
    ru: ['recycling', 'rainwater', 'groundwater', 'mixed'],
    uz: ['qayta ishlash', 'yomg\'ir suvi', 'yer osti suvi', 'aralash'],
    de: ['Recycling', 'Regenwasser', 'Grundwasser', 'Gemischt'],
    en: ['recycling', 'rainwater', 'groundwater', 'mixed']
  };

  const calculateProject = () => {
    const calc = {
      energyNeeds: Math.round(currentProject.area * 0.15 * currentProject.capacity / 100),
      solarPanels: Math.round(currentProject.area * 0.15 * currentProject.capacity / 100 / 0.3),
      waterNeeds: Math.round(currentProject.capacity * 150),
      constructionCost: Math.round(currentProject.area * 450 + currentProject.capacity * 800),
      operationalCost: Math.round((currentProject.area * 450 + currentProject.capacity * 800) * 0.08),
      co2Reduction: Math.round(currentProject.area * 0.025 + currentProject.capacity * 0.5),
      timelineOptimized: Math.max(12, Math.round(currentProject.timeline * 0.85)),
      roi: Math.round(((currentProject.budget - (currentProject.area * 450 + currentProject.capacity * 800)) / currentProject.budget) * 100)
    };
    
    setCalculations(calc);
  };

  useEffect(() => {
    calculateProject();
  }, [currentProject]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full mb-4 font-bold">
            🧬 TERRA v6.0 QUANTUM PLANNER
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-xl text-blue-200">{t.subtitle}</p>
          
          {/* Language Selector */}
          <div className="flex justify-center gap-4 mt-6">
            {['ru', 'uz', 'de', 'en'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  language === lang 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {lang === 'ru' && '🇷🇺 РУ'}
                {lang === 'uz' && '🇺🇿 UZ'}
                {lang === 'de' && '🇩🇪 DE'}
                {lang === 'en' && '🇬🇧 EN'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">📋 {t.project}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">{t.project}:</label>
                <input
                  type="text"
                  value={currentProject.name}
                  onChange={(e) => setCurrentProject({...currentProject, name: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30"
                />
              </div>

              <div>
                <label className="block text-white mb-2">{t.location}:</label>
                <input
                  type="text"
                  value={currentProject.location}
                  onChange={(e) => setCurrentProject({...currentProject, location: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30"
                />
              </div>

              <div>
                <label className="block text-white mb-2">{t.climate}:</label>
                <select
                  value={currentProject.climate}
                  onChange={(e) => setCurrentProject({...currentProject, climate: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
                >
                  {climateZones[language].map(zone => (
                    <option key={zone} value={zone} className="bg-gray-800">{zone}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">{t.area}:</label>
                  <input
                    type="number"
                    value={currentProject.area}
                    onChange={(e) => setCurrentProject({...currentProject, area: parseInt(e.target.value) || 0})}
                    className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">{t.capacity}:</label>
                  <input
                    type="number"
                    value={currentProject.capacity}
                    onChange={(e) => setCurrentProject({...currentProject, capacity: parseInt(e.target.value) || 0})}
                    className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">{t.energySource}:</label>
                <select
                  value={currentProject.energySource}
                  onChange={(e) => setCurrentProject({...currentProject, energySource: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
                >
                  {energySources[language].map(source => (
                    <option key={source} value={source} className="bg-gray-800">{source}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-2">{t.waterSystem}:</label>
                <select
                  value={currentProject.waterSystem}
                  onChange={(e) => setCurrentProject({...currentProject, waterSystem: e.target.value})}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
                >
                  {waterSystems[language].map(system => (
                    <option key={system} value={system} className="bg-gray-800">{system}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">{t.budget}:</label>
                  <input
                    type="number"
                    value={currentProject.budget}
                    onChange={(e) => setCurrentProject({...currentProject, budget: parseInt(e.target.value) || 0})}
                    className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">{t.timeline}:</label>
                  <input
                    type="number"
                    value={currentProject.timeline}
                    onChange={(e) => setCurrentProject({...currentProject, timeline: parseInt(e.target.value) || 0})}
                    className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
                  />
                </div>
              </div>

              <button
                onClick={calculateProject}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-lg font-bold hover:from-green-600 hover:to-blue-600 transition-all"
              >
                🔄 {t.calculate}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">📊 {t.results}</h2>
            
            {calculations.energyNeeds && (
              <div className="space-y-4">
                <div className="bg-green-500/20 p-4 rounded-lg border border-green-400">
                  <h3 className="text-green-300 font-bold mb-2">⚡ Энергетика</h3>
                  <p className="text-white">Потребность: {calculations.energyNeeds} кВт/ч</p>
                  <p className="text-white">Солнечные панели: {calculations.solarPanels} шт</p>
                </div>

                <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400">
                  <h3 className="text-blue-300 font-bold mb-2">💧 Водоснабжение</h3>
                  <p className="text-white">Потребность: {calculations.waterNeeds} л/день</p>
                  <p className="text-white">Система: {currentProject.waterSystem}</p>
                </div>

                <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-400">
                  <h3 className="text-yellow-300 font-bold mb-2">💰 Экономика</h3>
                  <p className="text-white">Строительство: ${calculations.constructionCost.toLocaleString()}</p>
                  <p className="text-white">Эксплуатация: ${calculations.operationalCost.toLocaleString()}/год</p>
                  <p className="text-white">ROI: {calculations.roi}%</p>
                </div>

                <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-400">
                  <h3 className="text-purple-300 font-bold mb-2">🌱 Экология</h3>
                  <p className="text-white">Снижение CO₂: {calculations.co2Reduction} тонн/год</p>
                  <p className="text-white">Класс эффективности: A+</p>
                </div>

                <div className="bg-orange-500/20 p-4 rounded-lg border border-orange-400">
                  <h3 className="text-orange-300 font-bold mb-2">⏱️ Сроки</h3>
                  <p className="text-white">Оптимизированный срок: {calculations.timelineOptimized} месяцев</p>
                  <p className="text-white">Экономия времени: {currentProject.timeline - calculations.timelineOptimized} месяцев</p>
                </div>

                {/* Архитектурная визуализация */}
                <div className="bg-gray-500/20 p-4 rounded-lg border border-gray-400">
                  <h3 className="text-gray-300 font-bold mb-2">🏗️ Архитектура</h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-green-600/40 p-2 rounded">
                      <div className="text-2xl">🌳</div>
                      <div className="text-xs text-white">Зеленая зона</div>
                    </div>
                    <div className="bg-blue-600/40 p-2 rounded">
                      <div className="text-2xl">🏢</div>
                      <div className="text-xs text-white">Главное здание</div>
                    </div>
                    <div className="bg-yellow-600/40 p-2 rounded">
                      <div className="text-2xl">☀️</div>
                      <div className="text-xs text-white">Солн. панели</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/80">
          <div className="bg-yellow-400/20 rounded-lg p-4 border border-yellow-400/30">
            <p className="font-bold">🧬 TERRA v6.0 QUANTUM ARCHITECTURE ENGINE</p>
            <p>CREATOR: Абдурашид Абдукаримов | secret.uzbek@tutamail.com</p>
            <p>Специально для зеленых станций Узбекистана | {new Date().toLocaleString('ru-RU')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreenStationPlanner;