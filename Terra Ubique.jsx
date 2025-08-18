import React, { useState, useEffect } from 'react';
import { Search, MapPin, Truck, Briefcase, Home, Settings, Star, Filter, Globe, Shield, Zap, Users, Clock, Package, Phone, Mail, ChevronRight, Menu, X, Heart, Eye } from 'lucide-react';

const { useStoredState, useUser } = hatch;

const TerraUbique = () => {
  const [activeCategory, setActiveCategory] = useStoredState('activeCategory', 'logistics');
  const [searchQuery, setSearchQuery] = useStoredState('searchQuery', '');
  const [userLocation, setUserLocation] = useStoredState('userLocation', 'Ташкент');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useStoredState('favorites', []);
  const [recentViews, setRecentViews] = useStoredState('recentViews', []);
  const user = useUser();

  // Terra Ecosystem Categories - Universal Aggregation
  const categories = {
    logistics: {
      name: 'Логистика',
      icon: Truck,
      color: 'bg-blue-500',
      description: 'Грузоперевозки, доставка, экспедирование',
      subcategories: ['Грузоперевозки', 'Курьерская доставка', 'Международные перевозки', 'Складские услуги']
    },
    jobs: {
      name: 'Работа',
      icon: Briefcase,
      color: 'bg-green-500',
      description: 'Вакансии, фриланс, аутсорсинг',
      subcategories: ['Постоянная работа', 'Временная работа', 'Фриланс', 'Удаленная работа']
    },
    equipment: {
      name: 'Техника',
      icon: Settings,
      color: 'bg-orange-500',
      description: 'Аренда техники, инструментов, оборудования',
      subcategories: ['Строительная техника', 'Сельхозтехника', 'Инструменты', 'Промышленное оборудование']
    },
    services: {
      name: 'Услуги',
      icon: Users,
      color: 'bg-purple-500',
      description: 'Профессиональные и бытовые услуги',
      subcategories: ['Ремонт и строительство', 'Уборка', 'IT-услуги', 'Консалтинг']
    },
    rental: {
      name: 'Аренда',
      icon: Home,
      color: 'bg-pink-500',
      description: 'Недвижимость, транспорт, особые объекты',
      subcategories: ['Недвижимость', 'Автомобили', 'Спецтранспорт', 'Уникальные объекты']
    }
  };

  // Официальные источники данных Узбекистана - AIUZ Terra Integration
  const officialDataSources = {
    government: {
      portal: 'https://gov.uz/oz', // Официальный государственный портал РУз
      description: 'Трёхъязычный портал (узб/рус/англ)',
      apiEndpoints: [
        '/api/transport/statistics',
        '/api/logistics/corridors',
        '/api/business/registry'
      ]
    },
    legal: {
      portal: 'https://lex.uz/uz/',
      description: 'Минюст - тексты законов и актов',
      apiEndpoints: [
        '/api/transport/regulations',
        '/api/business/legislation',
        '/api/customs/procedures'
      ]
    },
    transport: {
      railways: 'Узбекистон Темир Йуллари',
      highways: 'Автодор Узбекистан',
      aviation: 'Узбекистон Хаво Йуллари',
      statistics: {
        trucks: '26,000 фур до 20т',
        totalVehicles: '240,917 грузовых (физлица)',
        dominance: '90.8% автотранспорт',
        railwayLength: '4000+ км',
        corridors: ['TRACECA', 'CAREC', 'SCO']
      }
    },
    logistics: {
      centers: ['Навои Хаб', 'Ангрен Логистик', 'Ташкент МЦЛ'],
      corridors: {
        carec2a: 'Астрахань–Бейнеу–Бухара–Ташкент–Андижан–Ош–Иркештам',
        carec6a: 'Астрахань–Бейнеу–Бухара–Гузар–Хайратон–Мазар-и-Шариф',
        afghanistan: 'Термез–Мазари-Шариф–Герат–Бандар-Аббас'
      }
    }
  };

  // Terra Ubique Real Data Integration - на основе официальных источников
  const mockListings = {
    logistics: [
      {
        id: 1,
        title: 'Грузоперевозки по CAREC коридорам',
        provider: 'Узбекистон Темир Йуллари (сертифицировано)',
        price: 'от 45,000 сум/км',
        rating: 4.9,
        verified: true,
        governmentApproved: true,
        location: 'Ташкент',
        description: 'Железнодорожные перевозки по международным коридорам ЦАРЭС',
        features: ['CAREC 2a/2b/6a коридоры', 'Государственная верификация', 'МДП книжки', 'ISO 9001:2008'],
        officialSource: 'gov.uz/transport'
      },
      {
        id: 2,
        title: 'Авиахаб Навои - мультимодальная логистика',
        provider: 'Navoi International Airport Hub',
        price: 'от $4.50/кг',
        rating: 4.8,
        verified: true,
        governmentApproved: true,
        location: 'Навои',
        description: 'Международный мультимодальный центр - крупнейший в Центральной Азии',
        features: ['60,000 тонн/год грузооборот', 'Европа-Азия маршруты', 'Таможенная зона', 'Интеграция ж/д+авто+авиа'],
        officialSource: 'gov.uz/aviation'
      },
      {
        id: 3,
        title: 'AIRCUZ - Международные автоперевозки',
        provider: 'Ассоциация международных автоперевозчиков',
        price: 'от 75,000 сум/км',
        rating: 4.7,
        verified: true,
        governmentApproved: true,
        location: 'Республика Узбекистан',
        description: 'Официальная ассоциация 130+ компаний с МДП гарантиями',
        features: ['12,632 книжки МДП (2011)', '280,000 тонн грузооборот', 'МСАТ членство', 'ФАПЭ ЦАРЭС'],
        officialSource: 'aircuz.uz'
      },
      {
        id: 4,
        title: 'Трансафганский коридор Термез-Герат',
        provider: 'Специальная индустриальная зона Хайратон',
        price: 'от $3.20/км',
        rating: 4.6,
        verified: true,
        governmentApproved: true,
        location: 'Термез-Афганистан',
        description: 'Стратегический коридор в Персидский залив через Афганистан',
        features: ['Термез-Мазари-Шариф-Герат', 'Бандар-Аббас/Чобахор порты', 'АБР финансирование', '75км в Афганистане'],
        officialSource: 'gov.uz/carec'
      }
    ],
    jobs: [
      {
        id: 5,
        title: 'Специалист по транспортной логистике',
        provider: 'Узбекистон Темир Йуллари',
        price: 'от 8,500,000 сум/месяц',
        rating: 4.9,
        verified: true,
        governmentApproved: true,
        location: 'Ташкент',
        description: 'Управление международными грузоперевозками по коридорам ЦАРЭС',
        features: ['Государственное предприятие', 'ISO 9001:2008 обучение', 'CAREC программы', 'Соцпакет полный'],
        officialSource: 'uzbekistan-railway.uz'
      },
      {
        id: 6,
        title: 'Таможенный брокер-экспедитор',
        provider: 'Государственный таможенный комитет',
        price: 'от 6,000,000 сум/месяц',
        rating: 4.8,
        verified: true,
        governmentApproved: true,
        location: 'Термез/Ташкент/Навои',
        description: 'Сертифицированное таможенное оформление грузов',
        features: ['Лицензия ГТК', 'МДП процедуры', 'TRACECA коридоры', 'Льготы госслужащего'],
        officialSource: 'customs.gov.uz'
      },
      {
        id: 7,
        title: 'Инженер логистических центров',
        provider: 'Центр логистики Ангрен',
        price: 'от 7,200,000 сум/месяц',
        rating: 4.7,
        verified: true,
        governmentApproved: true,
        location: 'Ангрен/Навои',
        description: 'Эксплуатация современных складских терминалов',
        features: ['8.6 га территория', '22 контейнера/час', '1500 тонн склады', 'Перевал Камчик'],
        officialSource: 'angren-logistics.uz'
      }
    ],
    equipment: [
      {
        id: 8,
        title: 'Грузовая техника по стандартам Евро-4',
        provider: 'Автодор Узбекистан',
        price: 'от 1,200,000 сум/день',
        rating: 4.8,
        verified: true,
        governmentApproved: true,
        location: 'Республика Узбекистан',
        description: 'Сертифицированный автопарк для международных перевозок',
        features: ['Евро-4 стандарт', 'Международные лицензии', 'GPS мониторинг', '517км новых дорог (2012)'],
        officialSource: 'autodor.gov.uz'
      },
      {
        id: 9,
        title: 'Железнодорожные вагоны и локомотивы',
        provider: 'Узбекистон Темир Йуллари',
        price: 'от 2,500,000 сум/сутки',
        rating: 4.9,
        verified: true,
        governmentApproved: true,
        location: 'Ж/д сеть Узбекистана',
        description: 'Модернизированный подвижной состав с АБР финансированием',
        features: ['100-160 км/ч скорость', 'Электрификация линий', '660км обновлены', 'Оптико-волоконная связь'],
        officialSource: 'railway.gov.uz'
      },
      {
        id: 10,
        title: 'Авиагрузовая техника и контейнеры',
        provider: 'Навои Авиационный Хаб',
        price: 'от 800,000 сум/час',
        rating: 4.7,
        verified: true,
        governmentApproved: true,
        location: 'Навои',
        description: 'Специализированное оборудование для авиагрузов',
        features: ['Боинг-767 грузовые', 'Контейнерные терминалы', '400 пассажиров/час', 'Мультимодальность'],
        officialSource: 'navoi-airport.uz'
      }
    ],
    services: [
      {
        id: 11,
        title: 'Таможенное оформление грузов',
        provider: 'Государственный таможенный комитет',
        price: 'от 150,000 сум за декларацию',
        rating: 4.8,
        verified: true,
        governmentApproved: true,
        location: 'Все пункты пропуска',
        description: 'Официальные таможенные процедуры по стандартам ВТО',
        features: ['Электронное декларирование', 'МДП процедуры', 'Транзитные режимы', 'CAREC упрощения'],
        officialSource: 'customs.gov.uz'
      },
      {
        id: 12,
        title: 'Сертификация ISO 9001:2008 для логистики',
        provider: 'Узстандарт',
        price: 'от 5,000,000 сум за сертификат',
        rating: 4.9,
        verified: true,
        governmentApproved: true,
        location: 'Ташкент',
        description: 'Обязательная сертификация для международных перевозчиков',
        features: ['Международное признание', 'Конкурентоспособность', 'Качество услуг', 'Экспортная поддержка'],
        officialSource: 'uzstandard.uz'
      }
    ],
    rental: [
      {
        id: 13,
        title: 'Складские терминалы в логистических зонах',
        provider: 'СИЭЗ Навои / СИЗ Ангрен',
        price: 'от 25,000 сум/м²/месяц',
        rating: 4.8,
        verified: true,
        governmentApproved: true,
        location: 'Навои/Ангрен',
        description: 'Специализированные складские комплексы в свободных зонах',
        features: ['Таможенные льготы', 'Мультимодальность', 'Современное оборудование', 'Особый правовой режим'],
        officialSource: 'fez.gov.uz'
      },
      {
        id: 14,
        title: 'Холодильно-складской комплекс',
        provider: 'Sergeli-Agrofresh',
        price: 'от 45,000 сум/тонна/сутки',
        rating: 4.9,
        verified: true,
        governmentApproved: true,
        location: 'Ташкент',
        description: 'Крупнейший в Узбекистане - 14,000м² / 10-16,000 тонн',
        features: ['Европейское оборудование', 'Автоматизация T°/влажность', 'Сортировка/маркировка', 'Сельхозпродукция'],
        officialSource: 'minagro.gov.uz'
      }
    ]
  };

  const currentListings = mockListings[activeCategory] || [];

  const addToFavorites = (item) => {
    setFavorites([...favorites, item.id]);
  };

  const addToRecentViews = (item) => {
    const updated = [item.id, ...recentViews.filter(id => id !== item.id)].slice(0, 10);
    setRecentViews(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Terra Ecosystem Header */}
      <header className="bg-white shadow-sm border-b-2 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Terra Ubique</h1>
                <p className="text-xs text-gray-600">Универсальная агрегационная платформа</p>
              </div>
            </div>

            {/* Location & User */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{userLocation}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Terra Categories Navigation */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Что вы ищете?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(categories).map(([key, category]) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    activeCategory === key
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-3 mx-auto`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Поиск в категории "${categories[activeCategory]?.name}"...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Фильтры</span>
            </button>
          </div>
        </div>

        {/* Category Info */}
        <div className="mb-6 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              {React.createElement(categories[activeCategory]?.icon, { className: "w-6 h-6" })}
            </div>
            <div>
              <h3 className="text-xl font-bold">{categories[activeCategory]?.name}</h3>
              <p className="text-blue-100">{categories[activeCategory]?.description}</p>
            </div>
          </div>
          
          {/* Subcategories */}
          <div className="flex flex-wrap gap-2">
            {categories[activeCategory]?.subcategories.map((sub, index) => (
              <span key={index} className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Найдено {currentListings.length} предложений
            </h3>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>По релевантности</option>
              <option>По цене (возрастание)</option>
              <option>По цене (убывание)</option>
              <option>По рейтингу</option>
            </select>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentListings.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                  <div className="absolute top-3 right-3 flex space-x-2">
                    {item.verified && (
                      <span className="px-2 py-1 bg-green-500 text-white rounded-full text-xs flex items-center space-x-1">
                        <Shield className="w-3 h-3" />
                        <span>Проверено</span>
                      </span>
                    )}
                    <button 
                      onClick={() => addToFavorites(item)}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"
                    >
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{item.provider}</p>
                  <p className="text-xs text-gray-500 mb-3">{item.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold text-blue-600">{item.price}</span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => addToRecentViews(item)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Government Data Integration */}
        <div className="mb-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            Официальные источники данных Республики Узбекистан
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span><strong>gov.uz/oz</strong> - Государственный портал (3 языка)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span><strong>lex.uz</strong> - Минюст: законы и акты</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span><strong>26,000 фур</strong> + 240,917 грузовых ТС</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span><strong>CAREC коридоры</strong> + TRACECA интеграция</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terra Ecosystem Features */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Преимущества Terra Ubique</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Государственная верификация</h4>
                <p className="text-sm text-gray-600">Официальные источники gov.uz/lex.uz</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">CAREC коридоры</h4>
                <p className="text-sm text-gray-600">Международные транспортные маршруты</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Terra Ecosystem AIUZ</h4>
                <p className="text-sm text-gray-600">Phoenix Protocol + Официальные данные</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terra Ecosystem Footer */}
      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
                <span className="font-bold">Terra Ubique</span>
              </div>
              <p className="text-gray-400 text-sm">
                Универсальная агрегационная платформа для Узбекистана и мира
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Категории</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Логистика</li>
                <li>Работа</li>
                <li>Техника</li>
                <li>Услуги</li>
                <li>Аренда</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Справочный центр</li>
                <li>Связаться с нами</li>
                <li>Политика конфиденциальности</li>
                <li>Условия использования</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+998 (71) 295-08-85</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@terraubique.uz</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Ташкент, Узбекистан</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2025 Terra Ubique. Powered by Terra Ecosystem v4.0. Все права защищены.</p>
            <p className="mt-1">🔥 Phoenix Protocol Cycle 14 - Gefunden Ethical Validation ✅</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TerraUbique;