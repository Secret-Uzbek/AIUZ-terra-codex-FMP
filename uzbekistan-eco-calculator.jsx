import React, { useState, useEffect } from 'react';

const { useStoredState } = hatch;

const UzbekistanEcoCalculator = () => {
  const [region, setRegion] = useStoredState('eco_region', 'tashkent');
  const [season, setSeason] = useStoredState('eco_season', 'summer');
  const [buildingType, setBuildingType] = useStoredState('eco_building_type', 'green_station');
  const [calculations, setCalculations] = useState({});
  const [language, setLanguage] = useStoredState('eco_language', 'ru');

  const translations = {
    ru: {
      title: '🌱 Эко-Калькулятор для Климата Узбекистана',
      subtitle: 'TERRA v6.0 - Адаптация к местным условиям',
      region: 'Регион',
      season: 'Сезон',
      buildingType: 'Тип здания',
      calculate: 'Рассчитать экопараметры',
      results: 'Результаты расчета',
      temperature: 'Температура',
      humidity: 'Влажность',
      solar: 'Солнечная энергия',
      wind: 'Ветровая энергия',
      water: 'Потребность в воде',
      cooling: 'Охлаждение',
      heating: 'Отопление',
      materials: 'Рекомендуемые материалы',
      efficiency: 'Энергоэффективность'
    },
    uz: {
      title: '🌱 O\'zbekiston Iqlimi uchun Eko-Kalkulyator',
      subtitle: 'TERRA v6.0 - Mahalliy sharoitlarga moslashish',
      region: 'Hudud',
      season: 'Fasl',
      buildingType: 'Bino turi',
      calculate: 'Eko-parametrlarni hisoblash',
      results: 'Hisoblash natijalari',
      temperature: 'Harorat',
      humidity: 'Namlik',
      solar: 'Quyosh energiyasi',
      wind: 'Shamol energiyasi',
      water: 'Suv ehtiyoji',
      cooling: 'Sovutish',
      heating: 'Isitish',
      materials: 'Tavsiya etilgan materiallar',
      efficiency: 'Energiya samaradorligi'
    },
    de: {
      title: '🌱 Öko-Rechner für Usbekistans Klima',
      subtitle: 'TERRA v6.0 - Anpassung an lokale Bedingungen',
      region: 'Region',
      season: 'Jahreszeit',
      buildingType: 'Gebäudetyp',
      calculate: 'Öko-Parameter berechnen',
      results: 'Berechnungsergebnisse',
      temperature: 'Temperatur',
      humidity: 'Luftfeuchtigkeit',
      solar: 'Solarenergie',
      wind: 'Windenergie',
      water: 'Wasserbedarf',
      cooling: 'Kühlung',
      heating: 'Heizung',
      materials: 'Empfohlene Materialien',
      efficiency: 'Energieeffizienz'
    },
    en: {
      title: '🌱 Eco-Calculator for Uzbekistan Climate',
      subtitle: 'TERRA v6.0 - Adaptation to local conditions',
      region: 'Region',
      season: 'Season',
      buildingType: 'Building Type',
      calculate: 'Calculate eco-parameters',
      results: 'Calculation Results',
      temperature: 'Temperature',
      humidity: 'Humidity',
      solar: 'Solar Energy',
      wind: 'Wind Energy',
      water: 'Water Demand',
      cooling: 'Cooling',
      heating: 'Heating',
      materials: 'Recommended Materials',
      efficiency: 'Energy Efficiency'
    }
  };

  const t = translations[language];

  const regions = {
    ru: {
      tashkent: 'Ташкент',
      samarkand: 'Самарканд',
      bukhara: 'Бухара',
      khiva: 'Хива',
      namangan: 'Наманган',
      andijan: 'Андижан',
      fergana: 'Фергана',
      nukus: 'Нукус',
      termez: 'Термез',
      karshi: 'Карши'
    },
    uz: {
      tashkent: 'Toshkent',
      samarkand: 'Samarqand',
      bukhara: 'Buxoro',
      khiva: 'Xiva',
      namangan: 'Namangan',
      andijan: 'Andijon',
      fergana: 'Farg\'ona',
      nukus: 'Nukus',
      termez: 'Termiz',
      karshi: 'Qarshi'
    },
    de: {
      tashkent: 'Taschkent',
      samarkand: 'Samarkand',
      bukhara: 'Buchara',
      khiva: 'Chiwa',
      namangan: 'Namangan',
      andijan: 'Andijon',
      fergana: 'Fergana',
      nukus: 'Nukus',
      termez: 'Termez',
      karshi: 'Qarshi'
    },
    en: {
      tashkent: 'Tashkent',
      samarkand: 'Samarkand',
      bukhara: 'Bukhara',
      khiva: 'Khiva',
      namangan: 'Namangan',
      andijan: 'Andijan',
      fergana: 'Fergana',
      nukus: 'Nukus',
      termez: 'Termez',
      karshi: 'Karshi'
    }
  };

  const seasons = {
    ru: { spring: 'Весна', summer: 'Лето', autumn: 'Осень', winter: 'Зима' },
    uz: { spring: 'Bahor', summer: 'Yoz', autumn: 'Kuz', winter: 'Qish' },
    de: { spring: 'Frühling', summer: 'Sommer', autumn: 'Herbst', winter: 'Winter' },
    en: { spring: 'Spring', summer: 'Summer', autumn: 'Autumn', winter: 'Winter' }
  };

  const buildingTypes = {
    ru: {
      green_station: 'Зеленая станция',
      residential: 'Жилое здание',
      commercial: 'Коммерческое здание',
      industrial: 'Промышленное здание',
      educational: 'Образовательное здание'
    },
    uz: {
      green_station: 'Yashil stansiya',
      residential: 'Turar-joy binosi',
      commercial: 'Tijorat binosi',
      industrial: 'Sanoat binosi',
      educational: 'Ta\'lim binosi'
    },
    de: {
      green_station: 'Grüne Station',
      residential: 'Wohngebäude',
      commercial: 'Gewerbegebäude',
      industrial: 'Industriegebäude',
      educational: 'Bildungsgebäude'
    },
    en: {
      green_station: 'Green Station',
      residential: 'Residential Building',
      commercial: 'Commercial Building',
      industrial: 'Industrial Building',
      educational: 'Educational Building'
    }
  };

  // Климатические данные Узбекистана
  const climateData = {
    tashkent: {
      spring: { temp: [15, 25], humidity: 65, solar: 6.5, wind: 3.2, precipitation: 45 },
      summer: { temp: [25, 40], humidity: 35, solar: 8.8, wind: 2.8, precipitation: 15 },
      autumn: { temp: [10, 22], humidity: 55, solar: 5.2, wind: 3.5, precipitation: 35 },
      winter: { temp: [-5, 8], humidity: 75, solar: 3.1, wind: 4.1, precipitation: 55 }
    },
    samarkand: {
      spring: { temp: [16, 26], humidity: 60, solar: 7.0, wind: 3.8, precipitation: 40 },
      summer: { temp: [26, 42], humidity: 30, solar: 9.2, wind: 3.2, precipitation: 10 },
      autumn: { temp: [12, 24], humidity: 50, solar: 5.8, wind: 4.0, precipitation: 30 },
      winter: { temp: [-3, 10], humidity: 70, solar: 3.5, wind: 4.5, precipitation: 50 }
    },
    bukhara: {
      spring: { temp: [18, 28], humidity: 55, solar: 7.2, wind: 4.2, precipitation: 35 },
      summer: { temp: [28, 45], humidity: 25, solar: 9.5, wind: 3.8, precipitation: 8 },
      autumn: { temp: [14, 26], humidity: 45, solar: 6.0, wind: 4.5, precipitation: 25 },
      winter: { temp: [0, 12], humidity: 65, solar: 3.8, wind: 5.0, precipitation: 45 }
    },
    nukus: {
      spring: { temp: [12, 22], humidity: 70, solar: 6.0, wind: 5.5, precipitation: 50 },
      summer: { temp: [22, 38], humidity: 40, solar: 8.5, wind: 4.8, precipitation: 20 },
      autumn: { temp: [8, 20], humidity: 60, solar: 4.8, wind: 6.0, precipitation: 40 },
      winter: { temp: [-8, 5], humidity: 80, solar: 2.5, wind: 6.5, precipitation: 65 }
    }
  };

  const calculateEcoParameters = () => {
    const climate = climateData[region]?.[season] || climateData.tashkent.summer;
    
    const calc = {
      avgTemp: Math.round((climate.temp[0] + climate.temp[1]) / 2),
      tempRange: `${climate.temp[0]}°C - ${climate.temp[1]}°C`,
      humidity: `${climate.humidity}%`,
      solarPotential: `${climate.solar} кВт⋅ч/м²⋅день`,
      windPotential: `${climate.wind} м/с средняя`,
      
      // Расчеты для зданий
      coolingNeeds: Math.max(0, (climate.temp[1] - 24) * 15),
      heatingNeeds: Math.max(0, (18 - climate.temp[0]) * 12),
      waterConsumption: 150 + (climate.temp[1] - 20) * 5,
      
      // Энергоэффективность
      solarEfficiency: Math.min(95, climate.solar * 10 + 20),
      ventilationNeeds: climate.humidity > 60 ? 'Высокие' : climate.humidity > 40 ? 'Средние' : 'Низкие',
      
      // Рекомендуемые материалы для региона
      materials: getMaterialsForClimate(climate),
      
      // Адаптационные меры
      adaptations: getClimateAdaptations(climate, region, season)
    };
    
    setCalculations(calc);
  };

  const getMaterialsForClimate = (climate) => {
    const materials = [];
    
    if (climate.temp[1] > 35) {
      materials.push('Светоотражающие покрытия');
      materials.push('Термоизоляционные блоки');
    }
    
    if (climate.temp[0] < 5) {
      materials.push('Утеплители из эко-материалов');
      materials.push('Тройные стеклопакеты');
    }
    
    if (climate.humidity > 65) {
      materials.push('Влагостойкие материалы');
      materials.push('Антигрибковые покрытия');
    }
    
    if (climate.solar > 7) {
      materials.push('Солнечные панели высокой эффективности');
      materials.push('Фотовольтаические материалы');
    }
    
    if (climate.wind > 4) {
      materials.push('Ветрозащитные конструкции');
      materials.push('Малые ветрогенераторы');
    }
    
    return materials.length > 0 ? materials : ['Стандартные эко-материалы'];
  };

  const getClimateAdaptations = (climate, region, season) => {
    const adaptations = [];
    
    // Для жаркого климата
    if (climate.temp[1] > 38) {
      adaptations.push('Система испарительного охлаждения');
      adaptations.push('Зеленые крыши и фасады');
      adaptations.push('Естественная вентиляция');
    }
    
    // Для холодного климата  
    if (climate.temp[0] < 0) {
      adaptations.push('Пассивное солнечное отопление');
      adaptations.push('Тепловые насосы');
      adaptations.push('Рекуперация тепла');
    }
    
    // Для засушливого климата
    if (climate.precipitation < 30) {
      adaptations.push('Сбор дождевой воды');
      adaptations.push('Капельное орошение');
      adaptations.push('Ксерофитные растения');
    }
    
    // Для ветреного климата
    if (climate.wind > 5) {
      adaptations.push('Ветрозащитные посадки');
      adaptations.push('Использование ветровой энергии');
    }
    
    return adaptations.length > 0 ? adaptations : ['Стандартные меры адаптации'];
  };

  useEffect(() => {
    calculateEcoParameters();
  }, [region, season, buildingType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-teal-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-green-400 text-black px-6 py-2 rounded-full mb-4 font-bold">
            🌱 TERRA v6.0 ECO CALCULATOR
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-xl text-green-200">{t.subtitle}</p>
          
          {/* Language Selector */}
          <div className="flex justify-center gap-4 mt-6">
            {['ru', 'uz', 'de', 'en'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  language === lang 
                    ? 'bg-green-400 text-black' 
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6">⚙️ Параметры</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white mb-3 font-semibold">{t.region}:</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
                >
                  {Object.entries(regions[language]).map(([key, value]) => (
                    <option key={key} value={key} className="bg-gray-800">{value}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white mb-3 font-semibold">{t.season}:</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(seasons[language]).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setSeason(key)}
                      className={`p-3 rounded-lg font-semibold transition-all ${
                        season === key 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white mb-3 font-semibold">{t.buildingType}:</label>
                <select
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30"
                >
                  {Object.entries(buildingTypes[language]).map(([key, value]) => (
                    <option key={key} value={key} className="bg-gray-800">{value}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={calculateEcoParameters}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-lg font-bold hover:from-green-600 hover:to-teal-600 transition-all"
              >
                🔄 {t.calculate}
              </button>
            </div>

            {/* Карта Узбекистана */}
            <div className="mt-6 bg-white/5 p-4 rounded-lg">
              <h3 className="text-white font-bold mb-2">🗺️ Карта регионов</h3>
              <div className="grid grid-cols-3 gap-1 text-xs">
                {Object.entries(regions[language]).map(([key, value]) => (
                  <div
                    key={key}
                    onClick={() => setRegion(key)}
                    className={`p-2 rounded cursor-pointer text-center transition-all ${
                      region === key ? 'bg-green-500 text-white' : 'bg-white/20 text-white/80 hover:bg-white/30'
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6">📊 {t.results}</h2>
              
              {calculations.avgTemp && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Климатические показатели */}
                  <div className="space-y-4">
                    <div className="bg-red-500/20 p-4 rounded-lg border border-red-400">
                      <h3 className="text-red-300 font-bold mb-2">🌡️ {t.temperature}</h3>
                      <p className="text-white text-lg">{calculations.tempRange}</p>
                      <p className="text-white/80">Среднее: {calculations.avgTemp}°C</p>
                    </div>

                    <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-400">
                      <h3 className="text-blue-300 font-bold mb-2">💧 {t.humidity}</h3>
                      <p className="text-white text-lg">{calculations.humidity}</p>
                    </div>

                    <div className="bg-yellow-500/20 p-4 rounded-lg border border-yellow-400">
                      <h3 className="text-yellow-300 font-bold mb-2">☀️ {t.solar}</h3>
                      <p className="text-white text-lg">{calculations.solarPotential}</p>
                      <p className="text-white/80">Эффективность: {calculations.solarEfficiency}%</p>
                    </div>

                    <div className="bg-gray-500/20 p-4 rounded-lg border border-gray-400">
                      <h3 className="text-gray-300 font-bold mb-2">💨 {t.wind}</h3>
                      <p className="text-white text-lg">{calculations.windPotential}</p>
                    </div>
                  </div>

                  {/* Энергетические потребности */}
                  <div className="space-y-4">
                    <div className="bg-cyan-500/20 p-4 rounded-lg border border-cyan-400">
                      <h3 className="text-cyan-300 font-bold mb-2">❄️ {t.cooling}</h3>
                      <p className="text-white text-lg">{calculations.coolingNeeds} кВт⋅ч/м²</p>
                    </div>

                    <div className="bg-orange-500/20 p-4 rounded-lg border border-orange-400">
                      <h3 className="text-orange-300 font-bold mb-2">🔥 {t.heating}</h3>
                      <p className="text-white text-lg">{calculations.heatingNeeds} кВт⋅ч/м²</p>
                    </div>

                    <div className="bg-purple-500/20 p-4 rounded-lg border border-purple-400">
                      <h3 className="text-purple-300 font-bold mb-2">💧 {t.water}</h3>
                      <p className="text-white text-lg">{calculations.waterConsumption} л/чел⋅день</p>
                    </div>

                    <div className="bg-green-500/20 p-4 rounded-lg border border-green-400">
                      <h3 className="text-green-300 font-bold mb-2">🌬️ Вентиляция</h3>
                      <p className="text-white text-lg">Потребности: {calculations.ventilationNeeds}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Рекомендации */}
            {calculations.materials && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">🏗️ {t.materials}</h3>
                  <ul className="space-y-2">
                    {calculations.materials.map((material, index) => (
                      <li key={index} className="text-white flex items-center">
                        <span className="text-green-400 mr-2">•</span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">🔧 Адаптационные меры</h3>
                  <ul className="space-y-2">
                    {calculations.adaptations.map((adaptation, index) => (
                      <li key={index} className="text-white flex items-center">
                        <span className="text-blue-400 mr-2">•</span>
                        {adaptation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/80">
          <div className="bg-green-400/20 rounded-lg p-4 border border-green-400/30">
            <p className="font-bold">🌱 TERRA v6.0 ECO CALCULATOR UZBEKISTAN</p>
            <p>CREATOR: Абдурашид Абдукаримов | secret.uzbek@tutamail.com</p>
            <p>Климатические данные адаптированы для всех регионов Узбекистана</p>
            <p className="text-sm">⚡ Quantum Eco-Calculation Engine | {new Date().toLocaleString('ru-RU')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UzbekistanEcoCalculator;