# L5 UI Layer - IoT Integration & Semantic Interface API

**\[DOCUMENT\_TYPE]:** Module\
**\[SESSION\_ID]:** AIUZ\_SESSION\_L5\_IOT\
**\[AUTHOR]:** AIUZ2025\
**\[MODULE\_TYPE]:** L5\
**\[VERSION]:** 1.0\
**\[DATE]:** 2025-07-12

***

## 🌐 IoT Semantic Integration API

### Подключение устройств к системе терминов

Реализация протокола подключения IoT устройств к семантической системе AIUZ с автоматической интерпретацией данных.

```python
"""
L5 IoT Semantic Integration API
Подключение устройств к Terra Language Core
"""

import json
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from datetime import datetime
import asyncio

# Интеграция с Terra экосистемой
from terra_language_core import TerraQuark, TerraNanoCore, TerraMicroCore
from l1_dao_interaction_protocol import AIInteractionProtocol

@dataclass
class IoTDevice:
    """Семантически подключенное IoT устройство"""
    device_uuid: str
    device_type: str
    semantic_profile: Dict[str, Any]
    capabilities: List[str]
    vocabulary_domains: List[str]
    terra_principles: List[str]
    last_heartbeat: str
    connection_status: str

class SemanticIoTAPI:
    """API для семантического взаимодействия с IoT устройствами"""
    
    def __init__(self, terra_core: TerraMicroCore, ai_protocol: AIInteractionProtocol):
        self.terra_core = terra_core
        self.ai_protocol = ai_protocol
        self.connected_devices = {}
        self.semantic_mappings = {}
        
    async def register_device(self, device_info: Dict[str, Any]) -> Dict[str, Any]:
        """Регистрация устройства в семантической сети"""
        
        # Валидация этических принципов устройства
        if not self._validate_device_ethics(device_info):
            raise ValueError("Устройство не соответствует этическим принципам Terra")
        
        device_uuid = device_info["uuid"]
        
        # Создание семантического профиля
        semantic_profile = await self._create_semantic_profile(device_info)
        
        # Согласование словаря терминов
        vocabulary = await self._negotiate_vocabulary(device_info)
        
        device = IoTDevice(
            device_uuid=device_uuid,
            device_type=device_info["type"],
            semantic_profile=semantic_profile,
            capabilities=device_info.get("capabilities", []),
            vocabulary_domains=vocabulary,
            terra_principles=device_info.get("terra_principles", []),
            last_heartbeat=datetime.now().isoformat(),
            connection_status="connected"
        )
        
        self.connected_devices[device_uuid] = device
        
        # Создание Terra кварков для устройства
        await self._create_device_quarks(device)
        
        return {
            "device_uuid": device_uuid,
            "semantic_profile": semantic_profile,
            "vocabulary_endpoint": f"/vocabulary/{device_uuid}",
            "command_endpoint": f"/command/{device_uuid}",
            "status": "registered"
        }
    
    async def semantic_query(self, device_uuid: str, query: str) -> Dict[str, Any]:
        """Семантический запрос к устройству"""
        
        if device_uuid not in self.connected_devices:
            raise ValueError(f"Устройство {device_uuid} не зарегистрировано")
        
        device = self.connected_devices[device_uuid]
        
        # Парсинг семантического запроса
        parsed_query = await self._parse_semantic_query(query, device)
        
        # Применение AI Interaction Protocol для валидации
        validation_result = self.ai_protocol.validate_interaction({
            "type": "iot_query",
            "content": query,
            "device_type": device.device_type,
            "user_actions": ["iot_interaction"]
        })
        
        if not validation_result["is_valid"]:
            raise ValueError("Запрос не прошел этическую валидацию")
        
        # Маршрутизация к устройству
        device_response = await self._route_to_device(device_uuid, parsed_query)
        
        # Семантическая интерпретация ответа
        semantic_response = await self._semantify_response(device_response, device)
        
        return {
            "device_uuid": device_uuid,
            "query": query,
            "semantic_interpretation": semantic_response,
            "raw_data": device_response,
            "timestamp": datetime.now().isoformat(),
            "validation_passed": True
        }
    
    async def semantic_command(self, device_uuid: str, command: str) -> Dict[str, Any]:
        """Семантическая команда устройству"""
        
        device = self.connected_devices.get(device_uuid)
        if not device:
            raise ValueError(f"Устройство {device_uuid} не найдено")
        
        # Парсинг семантической команды
        semantic_instruction = await self._parse_command(command, device)
        
        # Валидация через AI Interaction Protocol
        validation_result = self.ai_protocol.validate_interaction({
            "type": "iot_command",
            "content": command,
            "device_type": device.device_type,
            "user_actions": ["device_control"],
            "ethical_weight": 0.9  # Высокий вес для команд управления
        })
        
        if not validation_result["is_valid"]:
            raise ValueError("Команда не прошла этическую валидацию")
        
        # Трансляция в протокол устройства
        device_commands = await self._translate_to_device_protocol(semantic_instruction, device)
        
        # Выполнение команды
        execution_result = await self._execute_on_device(device_uuid, device_commands)
        
        return {
            "device_uuid": device_uuid,
            "command": command,
            "semantic_instruction": semantic_instruction,
            "execution_result": execution_result,
            "timestamp": datetime.now().isoformat()
        }
    
    async def _create_semantic_profile(self, device_info: Dict[str, Any]) -> Dict[str, Any]:
        """Создание семантического профиля устройства"""
        
        return {
            "device_identity": {
                "type": device_info["type"],
                "manufacturer": device_info.get("manufacturer", "unknown"),
                "model": device_info.get("model", "unknown"),
                "version": device_info.get("version", "1.0")
            },
            "semantic_capabilities": {
                "data_interpretation": True,
                "command_execution": True,
                "context_awareness": device_info.get("context_aware", False),
                "learning_adaptation": device_info.get("adaptive", False)
            },
            "terra_alignment": {
                "ethical_compliance": True,
                "nature_integration": device_info.get("nature_friendly", False),
                "human_centric": device_info.get("human_centric", True)
            }
        }
    
    async def _negotiate_vocabulary(self, device_info: Dict[str, Any]) -> List[str]:
        """Согласование словаря терминов с устройством"""
        
        device_type = device_info["type"]
        
        # Базовые домены по типу устройства
        vocabulary_mapping = {
            "smart_fridge": ["food_terminology", "temperature_concepts", "time_expressions"],
            "air_quality_sensor": ["environmental_monitoring", "health_indicators", "air_quality"],
            "smart_thermostat": ["temperature_control", "energy_management", "comfort_settings"],
            "security_camera": ["security_concepts", "motion_detection", "privacy_settings"],
            "smart_speaker": ["audio_control", "voice_commands", "entertainment"],
            "garden_sensor": ["plant_care", "soil_conditions", "weather_monitoring"]
        }
        
        base_domains = vocabulary_mapping.get(device_type, ["basic_iot"])
        
        # Добавление пользовательских доменов
        custom_domains = device_info.get("vocabulary_domains", [])
        
        return base_domains + custom_domains
    
    async def _create_device_quarks(self, device: IoTDevice):
        """Создание Terra кварков для устройства"""
        
        # Кварк регистрации устройства
        registration_quark = TerraQuark(
            semantic_id=f"iot_device_{device.device_uuid}",
            terra_principle="human-nature-symbiosis",  # IoT как мост между человеком и природой
            ethical_weight=0.8,
            content_type="iot_device",
            multilingual_data={
                "ru": f"IoT устройство: {device.device_type}",
                "en": f"IoT device: {device.device_type}",
                "uz": f"IoT qurilma: {device.device_type}"
            },
            creation_timestamp=datetime.now().isoformat()
        )
        
        # Добавление кварка в Terra ядро
        await self._add_quark_to_core(registration_quark)
        
        # Кварки для каждой возможности устройства
        for capability in device.capabilities:
            capability_quark = TerraQuark(
                semantic_id=f"iot_capability_{device.device_uuid}_{capability}",
                terra_principle="semantic_modularity",
                ethical_weight=0.7,
                content_type="device_capability",
                multilingual_data={
                    "ru": f"Возможность устройства: {capability}",
                    "en": f"Device capability: {capability}"
                },
                creation_timestamp=datetime.now().isoformat()
            )
            await self._add_quark_to_core(capability_quark)
    
    async def _add_quark_to_core(self, quark: TerraQuark):
        """Добавление кварка в Terra ядро"""
        # Здесь должна быть интеграция с реальным Terra ядром
        pass
    
    def _validate_device_ethics(self, device_info: Dict[str, Any]) -> bool:
        """Валидация этических принципов устройства"""
        
        # Проверка на соответствие Terra принципам
        required_ethics = ["privacy_protection", "human_centric_design"]
        device_ethics = device_info.get("ethical_features", [])
        
        return len(set(required_ethics) & set(device_ethics)) >= 1
    
    async def _parse_semantic_query(self, query: str, device: IoTDevice) -> Dict[str, Any]:
        """Парсинг семантического запроса"""
        
        # Простой парсер (в реальности здесь был бы NLP)
        query_lower = query.lower()
        
        parsed = {
            "intent": "unknown",
            "parameters": {},
            "expected_response_type": "data"
        }
        
        # Определение намерения по ключевым словам
        if any(word in query_lower for word in ["температура", "temperature"]):
            parsed["intent"] = "get_temperature"
        elif any(word in query_lower for word in ["статус", "status", "состояние"]):
            parsed["intent"] = "get_status"
        elif any(word in query_lower for word in ["данные", "data", "информация"]):
            parsed["intent"] = "get_data"
        
        return parsed
    
    async def _route_to_device(self, device_uuid: str, parsed_query: Dict[str, Any]) -> Dict[str, Any]:
        """Маршрутизация запроса к устройству"""
        
        # Симуляция ответа устройства
        device = self.connected_devices[device_uuid]
        
        if parsed_query["intent"] == "get_temperature":
            return {
                "temperature": 22.5,
                "unit": "celsius",
                "sensor_location": "main_room",
                "timestamp": datetime.now().isoformat()
            }
        elif parsed_query["intent"] == "get_status":
            return {
                "status": "operational",
                "uptime": "72h 15m",
                "last_maintenance": "2025-07-10T10:00:00Z"
            }
        else:
            return {"message": "Query not supported"}
    
    async def _semantify_response(self, device_response: Dict[str, Any], device: IoTDevice) -> Dict[str, Any]:
        """Семантическая интерпретация ответа устройства"""
        
        interpretation = {
            "semantic_meaning": {},
            "context": {},
            "actionable_insights": []
        }
        
        # Интерпретация температурных данных
        if "temperature" in device_response:
            temp = device_response["temperature"]
            interpretation["semantic_meaning"]["temperature_status"] = (
                "comfortable" if 20 <= temp <= 25 else
                "cold" if temp < 20 else "hot"
            )
            interpretation["context"]["comfort_level"] = "optimal" if 20 <= temp <= 25 else "suboptimal"
            
            if temp < 18:
                interpretation["actionable_insights"].append("Consider increasing heating")
            elif temp > 26:
                interpretation["actionable_insights"].append("Consider increasing cooling")
        
        return interpretation
    
    async def _parse_command(self, command: str, device: IoTDevice) -> Dict[str, Any]:
        """Парсинг семантической команды"""
        
        command_lower = command.lower()
        
        parsed = {
            "action": "unknown",
            "parameters": {},
            "priority": "normal"
        }
        
        # Определение действия
        if any(word in command_lower for word in ["установи", "set", "настрой"]):
            parsed["action"] = "set_parameter"
            
            # Извлечение параметров температуры
            if "температур" in command_lower or "temperature" in command_lower:
                parsed["parameters"]["type"] = "temperature"
                # Простой поиск числа в команде
                import re
                numbers = re.findall(r'\d+', command)
                if numbers:
                    parsed["parameters"]["value"] = int(numbers[0])
        
        elif any(word in command_lower for word in ["включи", "turn on", "enable"]):
            parsed["action"] = "enable"
        elif any(word in command_lower for word in ["выключи", "turn off", "disable"]):
            parsed["action"] = "disable"
        
        return parsed
    
    async def _translate_to_device_protocol(self, semantic_instruction: Dict[str, Any], device: IoTDevice) -> List[Dict[str, Any]]:
        """Трансляция семантической инструкции в протокол устройства"""
        
        device_commands = []
        
        if semantic_instruction["action"] == "set_parameter":
            if semantic_instruction["parameters"].get("type") == "temperature":
                device_commands.append({
                    "command": "SET_TEMPERATURE",
                    "value": semantic_instruction["parameters"]["value"],
                    "unit": "celsius"
                })
        
        elif semantic_instruction["action"] == "enable":
            device_commands.append({
                "command": "POWER_ON"
            })
        
        elif semantic_instruction["action"] == "disable":
            device_commands.append({
                "command": "POWER_OFF"
            })
        
        return device_commands
    
    async def _execute_on_device(self, device_uuid: str, device_commands: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Выполнение команд на устройстве"""
        
        # Симуляция выполнения команд
        results = []
        
        for command in device_commands:
            if command["command"] == "SET_TEMPERATURE":
                results.append({
                    "command": command["command"],
                    "status": "executed",
                    "new_value": command["value"],
                    "execution_time": datetime.now().isoformat()
                })
            else:
                results.append({
                    "command": command["command"],
                    "status": "executed",
                    "execution_time": datetime.now().isoformat()
                })
        
        return {
            "execution_summary": f"{len(results)} commands executed successfully",
            "command_results": results,
            "device_status": "operational"
        }
    
    def get_connected_devices(self) -> List[Dict[str, Any]]:
        """Получение списка подключенных устройств"""
        
        return [
            {
                "device_uuid": device.device_uuid,
                "device_type": device.device_type,
                "status": device.connection_status,
                "capabilities": device.capabilities,
                "last_heartbeat": device.last_heartbeat
            }
            for device in self.connected_devices.values()
        ]
    
    async def update_device_heartbeat(self, device_uuid: str):
        """Обновление heartbeat устройства"""
        
        if device_uuid in self.connected_devices:
            self.connected_devices[device_uuid].last_heartbeat = datetime.now().isoformat()
            self.connected_devices[device_uuid].connection_status = "connected"

# Пример использования
class SmartFridgeIntegration:
    """Пример интеграции умного холодильника"""
    
    def __init__(self, fridge_uuid: str):
        self.device_id = fridge_uuid
        self.semantic_profile = {
            "device_type": "smart_fridge",
            "capabilities": [
                "temperature_control",
                "inventory_tracking", 
                "energy_management",
                "user_interaction"
            ],
            "vocabulary_domains": [
                "food_terminology",
                "temperature_concepts",
                "time_expressions",
                "quantity_measures"
            ],
            "ethical_features": [
                "privacy_protection",
                "energy_efficiency",
                "food_waste_reduction"
            ],
            "terra_principles": [
                "human-nature-symbiosis",
                "ethical_memory"
            ]
        }
    
    async def register_with_aiuz(self, semantic_api: SemanticIoTAPI):
        """Регистрация в системе AIUZ"""
        
        device_info = {
            "uuid": self.device_id,
            "type": "smart_fridge",
            "manufacturer": "EcoSmart",
            "model": "GreenFridge Pro",
            "version": "2.1",
            "capabilities": self.semantic_profile["capabilities"],
            "vocabulary_domains": self.semantic_profile["vocabulary_domains"],
            "ethical_features": self.semantic_profile["ethical_features"],
            "terra_principles": self.semantic_profile["terra_principles"],
            "context_aware": True,
            "adaptive": True,
            "nature_friendly": True,
            "human_centric": True
        }
        
        registration_result = await semantic_api.register_device(device_info)
        return registration_result
    
    def translate_sensor_data(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """Преобразование сырых данных в семантические концепты"""
        
        semantic_data = {}
        
        # Трансляция температурных данных
        if "temp_celsius" in raw_data:
            temp = raw_data["temp_celsius"]
            if temp <= 4:
                semantic_data["cooling_zone"] = "optimal_refrigeration"
            elif temp <= 0:
                semantic_data["cooling_zone"] = "freezing_zone"
            else:
                semantic_data["cooling_zone"] = "inefficient_cooling"
        
        # Трансляция данных о содержимом
        if "items_detected" in raw_data:
            semantic_data["inventory_status"] = []
            for item in raw_data["items_detected"]:
                semantic_data["inventory_status"].append({
                    "item_type": item["type"],
                    "semantic_category": self._categorize_food_item(item["type"]),
                    "freshness_level": self._assess_freshness(item),
                    "storage_recommendation": self._get_storage_recommendation(item["type"])
                })
        
        # Трансляция энергопотребления
        if "power_consumption" in raw_data:
            consumption = raw_data["power_consumption"]
            semantic_data["energy_efficiency"] = (
                "excellent" if consumption < 150 else
                "good" if consumption < 200 else
                "needs_optimization"
            )
        
        return semantic_data
    
    def _categorize_food_item(self, item_type: str) -> str:
        """Семантическая категоризация продуктов"""
        
        categories = {
            "dairy": ["milk", "cheese", "yogurt", "butter"],
            "vegetables": ["carrot", "lettuce", "tomato", "onion"],
            "fruits": ["apple", "banana", "orange", "grapes"],
            "meat": ["chicken", "beef", "pork", "fish"],
            "beverages": ["juice", "soda", "water", "wine"]
        }
        
        for category, items in categories.items():
            if any(item in item_type.lower() for item in items):
                return category
        
        return "other"
    
    def _assess_freshness(self, item: Dict[str, Any]) -> str:
        """Оценка свежести продукта"""
        
        # Простая оценка на основе времени хранения
        storage_days = item.get("storage_days", 0)
        item_type = item["type"].lower()
        
        if "milk" in item_type:
            return "fresh" if storage_days < 3 else "expires_soon" if storage_days < 7 else "expired"
        elif any(veg in item_type for veg in ["lettuce", "spinach"]):
            return "fresh" if storage_days < 5 else "wilting" if storage_days < 10 else "spoiled"
        else:
            return "fresh" if storage_days < 7 else "aging"
    
    def _get_storage_recommendation(self, item_type: str) -> str:
        """Рекомендации по хранению"""
        
        recommendations = {
            "milk": "Keep in main refrigerator section, use within 7 days",
            "lettuce": "Store in crisper drawer with high humidity",
            "apple": "Store in crisper drawer, can last 4-6 weeks",
            "chicken": "Use within 2 days or freeze"
        }
        
        for key, recommendation in recommendations.items():
            if key in item_type.lower():
                return recommendation
        
        return "Follow standard refrigeration guidelines"

# Инициализация системы
async def initialize_iot_system():
    """Инициализация IoT системы с семантической интеграцией"""
    
    # Создание компонентов
    terra_core = TerraMicroCore(name="iot_core", version="1.0")
    ai_protocol = AIInteractionProtocol()
    
    # Создание IoT API
    iot_api = SemanticIoTAPI(terra_core, ai_protocol)
    
    # Регистрация умного холодильника
    smart_fridge = SmartFridgeIntegration("fridge_001")
    registration_result = await smart_fridge.register_with_aiuz(iot_api)
    
    print(f"✅ Умный холодильник зарегистрирован: {registration_result['device_uuid']}")
    
    # Пример семантического запроса
    query_result = await iot_api.semantic_query(
        "fridge_001", 
        "Какая температура в холодильнике?"
    )
    
    print(f"🔍 Результат запроса: {query_result['semantic_interpretation']}")
    
    # Пример семантической команды
    command_result = await iot_api.semantic_command(
        "fridge_001",
        "Установи оптимальную температуру для молочных продуктов"
    )
    
    print(f"⚙️ Результат команды: {command_result['execution_result']}")
    
    return iot_api

if __name__ == "__main__":
    print("🌐 L5 IoT Semantic Integration API инициализирован")
    print("🔗 Готов к подключению устройств к Terra экосистеме")
    
    # Запуск инициализации
    import asyncio
    asyncio.run(initialize_iot_system())
    
    print("✅ IoT система успешно интегрирована с AIUZ!")
```

## 🎯 Ключевые возможности L5 IoT API:

### 1. **Семантическая регистрация устройств**

* Автоматическое создание семантических профилей
* Валидация этических принципов устройств
* Интеграция с Terra Language Core

### 2. **Естественноязыковые запросы к IoT**

* "Какая температура в холодильнике?" → семантическая интерпретация
* Поддержка мультиязычности (ru/en/uz)
* Контекстуальное понимание команд

### 3. **Этическая валидация IoT взаимодействий**

* Интеграция с L1 AI Interaction Protocol
* Проверка команд на этическое соответствие
* Защита приватности пользователей

### 4. **Адаптивные возможности**

* Обучение на основе взаимодействий пользователя
* Создание Terra кварков для каждого устройства
* Семантическая память между сессиями

***

✅ **Шаг 2 завершён** - IoT интеграция готова!

**Переходим к Шагу 3?** Создание автофиксации документов или финального архивного файла?
