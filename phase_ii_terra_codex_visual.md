import React, { useState, useEffect } from 'react';

const DynamicTerraCodex = () => { const [phase, setPhase] = useState(0); const [orbitSpeed, setOrbitSpeed] = useState(1); const [quantumState, setQuantumState] = useState('coherent'); const [discoveryMode, setDiscoveryMode] = useState(false);

const phases = [ { name: 'Квантовое состояние', color: '#00FFB3', symbol: '⚛️' }, { name: 'Биологическое', color: '#32CD32', symbol: '🧬' }, { name: 'Детское сознание', color: '#FFB6C1', symbol: '👶' }, { name: 'Планетарное', color: '#4169E1', symbol: '🌍' }, { name: 'Космическое', color: '#9370DB', symbol: '🌌' } ];

const discoveries = [ 'Системная междисциплинарность', 'Межвидовая коммуникация', 'Квантовое образование', 'Планетарная память', 'Детское будущее' ];

useEffect(() => { const interval = setInterval(() => { setPhase(prev => (prev + 1) % phases.length); }, 3000);

```
return () => clearInterval(interval);
```

}, [phases.length]);

useEffect(() => { const speedInterval = setInterval(() => { setOrbitSpeed(prev => prev === 1 ? 2 : prev === 2 ? 0.5 : 1); }, 5000);

```
return () => clearInterval(speedInterval);
```

}, []);

useEffect(() => { const quantumInterval = setInterval(() => { setQuantumState(prev => prev === 'coherent' ? 'superposition' : prev === 'superposition' ? 'entangled' : 'coherent'); }, 4000);

```
return () => clearInterval(quantumInterval);
```

}, []);

const handleDiscovery = () => { setDiscoveryMode(true); setTimeout(() => setDiscoveryMode(false), 2000); };

const currentPhase = phases[phase];

return (  {/\* Тут визуализация Terra Codex \*/}  Terra Codex Simulation Фаза: {currentPhase.name} • Состояние: {quantumState} Запуск волны открытия   ); };

export default DynamicTerraCodex;



---
**Contact:** a.abdukarimov@fractal-metascience.org  
**ORCID:** 0009-0000-6394-4912
