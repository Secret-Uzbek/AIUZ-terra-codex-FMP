// TerraMemoryRecovery.js
// Автор: secret.uzbek@tutamail.com + Terra AI
// Простое восстановление памяти ИИ

const TerraMemory = {
  // Сохранить информацию
  save: function(название, данные) {
    const проверка = this.check(данные);
    if (!проверка.безопасно) {
      alert('Данные не прошли проверку безопасности');
      return false;
    }
    
    localStorage.setItem('terra_' + название, JSON.stringify({
      данные: данные,
      дата: new Date().toISOString(),
      безопасно: true
    }));
    
    console.log('✅ Сохранено:', название);
    return true;
  },
  
  // Найти информацию
  find: function(название) {
    const найдено = localStorage.getItem('terra_' + название);
    if (найдено) {
      return JSON.parse(найдено);
    }
    return null;
  },
  
  // Показать всё что сохранено
  showAll: function() {
    const всё = [];
    for (let i = 0; i < localStorage.length; i++) {
      const ключ = localStorage.key(i);
      if (ключ.startsWith('terra_')) {
        всё.push(ключ.replace('terra_', ''));
      }
    }
    console.log('📋 Сохранённые записи:', всё);
    return всё;
  },
  
  // Проверка безопасности (автоматическая)
  check: function(данные) {
    const опасное = ['вред', 'насилие', 'коммерция', 'реклама'];
    const текст = JSON.stringify(данные).toLowerCase();
    
    for (let слово of опасное) {
      if (текст.includes(слово)) {
        return { безопасно: false, причина: слово };
      }
    }
    
    return { безопасно: true };
  }
};

// Автоматический запуск
console.log('🧬 TerraMemory готов к использованию');
console.log('Используй: TerraMemory.save("название", данные)');
console.log('Найти: TerraMemory.find("название")');
console.log('Показать всё: TerraMemory.showAll()');

window.TerraMemory = TerraMemory;