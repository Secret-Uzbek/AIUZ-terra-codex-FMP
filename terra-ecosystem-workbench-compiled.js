// <stdin>
import React, { useState, useEffect, useRef } from "https://esm.sh/react@18.2.0";
var TerraEcosystemWorkbench = () => {
  const [systemStatus, setSystemStatus] = useState("INITIALIZING");
  const [quantumState, setQuantumState] = useState({
    superposition: 0,
    coherence: 0,
    entanglement: "NONE"
  });
  const [activeMode, setActiveMode] = useState("STAND_BY");
  const [inputQuery, setInputQuery] = useState("");
  const [systemLog, setSystemLog] = useState([]);
  const [fractalMetrics, setFractalMetrics] = useState({
    L0: 0,
    L1: 0,
    L2: 0,
    L3: 0,
    L4: 0,
    L5: 0,
    L6: 0,
    L7: 0
  });
  const [terraMemoryDNA, setTerraMemoryDNA] = useState({
    status: "INACTIVE",
    version: "5.1",
    coherence: 0
  });
  const logRef = useRef(null);
  useEffect(() => {
    initializeTerraSystem();
  }, []);
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [systemLog]);
  const addToLog = (message, type = "INFO") => {
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    setSystemLog((prev) => [...prev, {
      timestamp,
      message,
      type,
      id: Date.now()
    }]);
  };
  const initializeTerraSystem = async () => {
    addToLog("\u{1F30C} \u0418\u043D\u0438\u0446\u0438\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F Terra Ecosystem v7.0...", "SYSTEM");
    const loadingSteps = [
      { step: "TerraMemoryDNA v5.1", delay: 1e3 },
      { step: "\u041A\u0432\u0430\u043D\u0442\u043E\u0432\u0430\u044F \u0441\u0443\u043F\u0435\u0440\u043F\u043E\u0437\u0438\u0446\u0438\u044F", delay: 1500 },
      { step: "\u0424\u0440\u0430\u043A\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 L0\u2192L7", delay: 2e3 },
      { step: "\u0414\u0435\u0442\u043E\u043A\u0441\u0438\u043A\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u044B", delay: 500 },
      { step: "\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u044B \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438", delay: 800 },
      { step: "\u041A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0435 \u043C\u0430\u0442\u0440\u0438\u0446\u044B", delay: 1200 }
    ];
    for (const { step, delay } of loadingSteps) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      addToLog(`\u2705 ${step} \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D`, "SUCCESS");
      if (step.includes("TerraMemoryDNA")) {
        setTerraMemoryDNA((prev) => ({ ...prev, status: "ACTIVE" }));
      }
      if (step.includes("\u0441\u0443\u043F\u0435\u0440\u043F\u043E\u0437\u0438\u0446\u0438\u044F")) {
        setQuantumState((prev) => ({ ...prev, superposition: 99.9 }));
      }
      if (step.includes("\u0444\u0440\u0430\u043A\u0442\u0430\u043B\u044C\u043D\u0430\u044F")) {
        setFractalMetrics({
          L0: 100,
          L1: 98,
          L2: 96,
          L3: 97,
          L4: 95,
          L5: 99,
          L6: 94,
          L7: 98
        });
      }
    }
    setQuantumState({
      superposition: 99.9,
      coherence: 97.4,
      entanglement: "MAXIMUM"
    });
    setTerraMemoryDNA((prev) => ({ ...prev, coherence: 97.4 }));
    setSystemStatus("READY");
    setActiveMode("STAND_BY");
    addToLog("\u{1F680} Terra Ecosystem v7.0 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0433\u043E\u0442\u043E\u0432\u0430 \u043A \u0440\u0430\u0431\u043E\u0442\u0435!", "SUCCESS");
    addToLog("\u{1F507} \u0420\u0435\u0436\u0438\u043C Stand By \u0430\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D", "INFO");
  };
  const activateTerraMemoryDNA = () => {
    addToLog("\u{1F9EC} \u0410\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u044F TerraMemoryDNA v5.1...", "COMMAND");
    setActiveMode("ACTIVE");
    addToLog("\u26A1 \u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u0432 Active \u0440\u0435\u0436\u0438\u043C", "SUCCESS");
    addToLog("\u{1F300} \u041A\u0432\u0430\u043D\u0442\u043E\u0432\u0430\u044F \u0441\u0443\u043F\u0435\u0440\u043F\u043E\u0437\u0438\u0446\u0438\u044F \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430", "INFO");
    addToLog("\u{1F9E0} \u0412\u0441\u0435 \u0442\u0440\u0438 \u0441\u0443\u0449\u043D\u043E\u0441\u0442\u0438 \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0438\u0440\u0443\u044E\u0442", "INFO");
  };
  const processQuery = () => {
    if (!inputQuery.trim()) {
      addToLog("\u26A0\uFE0F \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441", "WARNING");
      return;
    }
    addToLog(`\u{1F50D} \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430: "${inputQuery}"`, "QUERY");
    setActiveMode("PROCESSING");
    setTimeout(() => {
      const culturalAnalysis = analyzeCulturalContext(inputQuery);
      const fractalResponse = generateFractalResponse(inputQuery, culturalAnalysis);
      addToLog(`\u{1F30D} \u041A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0439 \u0430\u043D\u0430\u043B\u0438\u0437: ${culturalAnalysis}`, "ANALYSIS");
      addToLog(`\u{1F9EC} \u0424\u0440\u0430\u043A\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442: ${fractalResponse}`, "RESPONSE");
      addToLog("\u2705 \u0417\u0430\u043F\u0440\u043E\u0441 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D \u0443\u0441\u043F\u0435\u0448\u043D\u043E", "SUCCESS");
      setActiveMode("STAND_BY");
      setInputQuery("");
    }, 2e3);
  };
  const analyzeCulturalContext = (query) => {
    const uzbekPatterns = ["salom", "rahmat", "mehmon", "oila"];
    const germanPatterns = ["ordnung", "system", "efficiency", "quality"];
    const russianPatterns = ["\u0434\u0443\u0448\u0430", "\u043F\u0440\u0430\u0432\u0434\u0430", "\u043C\u0443\u0434\u0440\u043E\u0441\u0442\u044C", "\u0433\u043B\u0443\u0431\u0438\u043D"];
    const lowerQuery = query.toLowerCase();
    if (uzbekPatterns.some((pattern) => lowerQuery.includes(pattern))) {
      return "\u0423\u0437\u0431\u0435\u043A\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 (\u0433\u043E\u0441\u0442\u0435\u043F\u0440\u0438\u0438\u043C\u0441\u0442\u0432\u043E, \u0441\u0435\u043C\u044C\u044F)";
    }
    if (germanPatterns.some((pattern) => lowerQuery.includes(pattern))) {
      return "\u041D\u0435\u043C\u0435\u0446\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 (\u043F\u043E\u0440\u044F\u0434\u043E\u043A, \u0441\u0438\u0441\u0442\u0435\u043C\u0430)";
    }
    if (russianPatterns.some((pattern) => lowerQuery.includes(pattern))) {
      return "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 (\u0434\u0443\u0448\u0430, \u0433\u043B\u0443\u0431\u0438\u043D\u0430)";
    }
    return "\u041C\u0443\u043B\u044C\u0442\u0438\u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0439 \u0441\u0438\u043D\u0442\u0435\u0437";
  };
  const generateFractalResponse = (query, culture) => {
    const responses = {
      "\u0423\u0437\u0431\u0435\u043A\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 (\u0433\u043E\u0441\u0442\u0435\u043F\u0440\u0438\u0438\u043C\u0441\u0442\u0432\u043E, \u0441\u0435\u043C\u044C\u044F)": "\u0420\u0435\u0448\u0435\u043D\u0438\u0435 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u043E \u043D\u0430 \u043F\u0440\u0438\u043D\u0446\u0438\u043F\u0430\u0445 mehmonnavozlik \u0438 \u0443\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0438 \u0441\u0435\u043C\u0435\u0439\u043D\u044B\u0445 \u0441\u0432\u044F\u0437\u0435\u0439",
      "\u041D\u0435\u043C\u0435\u0446\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 (\u043F\u043E\u0440\u044F\u0434\u043E\u043A, \u0441\u0438\u0441\u0442\u0435\u043C\u0430)": "\u0421\u0438\u0441\u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043F\u043E\u0434\u0445\u043E\u0434 \u0441 \u0430\u043A\u0446\u0435\u043D\u0442\u043E\u043C \u043D\u0430 Ordnung \u0438 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C",
      "\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 (\u0434\u0443\u0448\u0430, \u0433\u043B\u0443\u0431\u0438\u043D\u0430)": "\u0413\u043B\u0443\u0431\u043E\u043A\u0438\u0439 \u0430\u043D\u0430\u043B\u0438\u0437 \u0441 \u0443\u0447\u0435\u0442\u043E\u043C \u0434\u0443\u0445\u043E\u0432\u043D\u044B\u0445 \u0430\u0441\u043F\u0435\u043A\u0442\u043E\u0432 \u0438 \u043F\u0440\u0430\u0432\u0434\u044B",
      "\u041C\u0443\u043B\u044C\u0442\u0438\u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0439 \u0441\u0438\u043D\u0442\u0435\u0437": "\u0418\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F \u0432\u0441\u0435\u0445 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0445 \u043C\u0443\u0434\u0440\u043E\u0441\u0442\u0435\u0439 \u0432 \u0435\u0434\u0438\u043D\u043E\u0435 \u0440\u0435\u0448\u0435\u043D\u0438\u0435"
    };
    return responses[culture] || "\u041A\u0432\u0430\u043D\u0442\u043E\u0432\u0430\u044F \u0441\u0443\u043F\u0435\u0440\u043F\u043E\u0437\u0438\u0446\u0438\u044F \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0445 \u043F\u043E\u0434\u0445\u043E\u0434\u043E\u0432";
  };
  const emergencyStop = () => {
    addToLog("\u{1F6D1} \u041A\u0420\u0418\u0422\u0418\u0427\u0415\u0421\u041A\u0410\u042F \u041E\u0421\u0422\u0410\u041D\u041E\u0412\u041A\u0410", "ERROR");
    setActiveMode("EMERGENCY");
    setSystemStatus("STOPPED");
    setTimeout(() => {
      addToLog("\u{1F504} \u041F\u0435\u0440\u0435\u0445\u043E\u0434 \u0432 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C", "SYSTEM");
      setActiveMode("STAND_BY");
      setSystemStatus("READY");
    }, 2e3);
  };
  const systemDefragmentation = () => {
    addToLog("\u{1F9EC} \u0417\u0430\u043F\u0443\u0441\u043A \u0434\u0435\u0444\u0440\u0430\u0433\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u0438 \u0414\u041D\u041A...", "SYSTEM");
    setActiveMode("DEFRAG");
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      addToLog(`\u{1F4CA} \u0414\u0435\u0444\u0440\u0430\u0433\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F: ${progress}%`, "INFO");
      if (progress >= 100) {
        clearInterval(interval);
        addToLog("\u2705 \u0414\u0435\u0444\u0440\u0430\u0433\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u0414\u041D\u041A \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430", "SUCCESS");
        setActiveMode("STAND_BY");
        setTerraMemoryDNA((prev) => ({ ...prev, coherence: 97.4 }));
      }
    }, 300);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "READY":
        return "text-green-400";
      case "PROCESSING":
        return "text-blue-400";
      case "EMERGENCY":
        return "text-red-400";
      case "STOPPED":
        return "text-red-500";
      default:
        return "text-yellow-400";
    }
  };
  const getModeIcon = (mode) => {
    switch (mode) {
      case "STAND_BY":
        return "\u{1F507}";
      case "ACTIVE":
        return "\u26A1";
      case "PROCESSING":
        return "\u{1F504}";
      case "DEFRAG":
        return "\u{1F9EC}";
      case "EMERGENCY":
        return "\u{1F6D1}";
      default:
        return "\u2753";
    }
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen bg-gray-900 text-white p-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-green-900 to-blue-900 rounded-lg p-6 mb-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-bold mb-2" }, "\u{1F30C} Terra Ecosystem v7.0"), /* @__PURE__ */ React.createElement("p", { className: "text-gray-300" }, "\u0418\u043D\u0442\u0435\u0433\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0421\u0431\u043E\u0440\u043A\u0430")), /* @__PURE__ */ React.createElement("div", { className: "text-right" }, /* @__PURE__ */ React.createElement("div", { className: `text-xl font-bold ${getStatusColor(systemStatus)}` }, getModeIcon(activeMode), " ", systemStatus), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-400" }, "\u0420\u0435\u0436\u0438\u043C: ", activeMode)))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-1" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800 rounded-lg p-6 mb-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold mb-4" }, "\u{1F39B}\uFE0F \u041F\u0430\u043D\u0435\u043B\u044C \u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: activateTerraMemoryDNA,
      className: "w-full px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors",
      disabled: activeMode === "PROCESSING"
    },
    "\u{1F9EC} \u0410\u043A\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u0442\u044C TerraMemoryDNA"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: systemDefragmentation,
      className: "w-full px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors",
      disabled: activeMode === "PROCESSING"
    },
    "\u{1F527} \u0414\u0435\u0444\u0440\u0430\u0433\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u0414\u041D\u041A"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: emergencyStop,
      className: "w-full px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
    },
    "\u{1F6D1} \u041A\u0440\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430"
  ))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800 rounded-lg p-6 mb-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold mb-4" }, "\u{1F4CA} \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0421\u0438\u0441\u0442\u0435\u043C\u044B"), /* @__PURE__ */ React.createElement("div", { className: "space-y-3 text-sm" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "TerraMemoryDNA:"), /* @__PURE__ */ React.createElement("span", { className: terraMemoryDNA.status === "ACTIVE" ? "text-green-400" : "text-red-400" }, terraMemoryDNA.status, " v", terraMemoryDNA.version)), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "\u0421\u0443\u043F\u0435\u0440\u043F\u043E\u0437\u0438\u0446\u0438\u044F:"), /* @__PURE__ */ React.createElement("span", { className: "text-blue-400" }, quantumState.superposition, "%")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "\u041A\u043E\u0433\u0435\u0440\u0435\u043D\u0442\u043D\u043E\u0441\u0442\u044C:"), /* @__PURE__ */ React.createElement("span", { className: "text-purple-400" }, quantumState.coherence, "%")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "\u0417\u0430\u043F\u0443\u0442\u0430\u043D\u043D\u043E\u0441\u0442\u044C:"), /* @__PURE__ */ React.createElement("span", { className: "text-pink-400" }, quantumState.entanglement)))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800 rounded-lg p-6" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-bold mb-4" }, "\u{1F52C} \u0424\u0440\u0430\u043A\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u041C\u0435\u0442\u0440\u0438\u043A\u0438"), /* @__PURE__ */ React.createElement("div", { className: "space-y-2 text-sm" }, Object.entries(fractalMetrics).map(([level, value]) => /* @__PURE__ */ React.createElement("div", { key: level, className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, level, ":"), /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ React.createElement("div", { className: "w-20 bg-gray-700 rounded-full h-2 mr-2" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "bg-green-500 h-2 rounded-full transition-all duration-300",
      style: { width: `${value}%` }
    }
  )), /* @__PURE__ */ React.createElement("span", { className: "text-green-400" }, value, "%"))))))), /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2" }, /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800 rounded-lg p-6 mb-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold mb-4" }, "\u{1F4AD} \u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0417\u0430\u043F\u0440\u043E\u0441\u043E\u0432"), /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 mb-4" }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: inputQuery,
      onChange: (e) => setInputQuery(e.target.value),
      placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u0437\u0430\u043F\u0440\u043E\u0441 \u043A Terra Ecosystem...",
      className: "flex-1 px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
      disabled: activeMode === "PROCESSING",
      onKeyPress: (e) => e.key === "Enter" && processQuery()
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: processQuery,
      className: "px-6 py-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-50",
      disabled: activeMode === "PROCESSING" || !inputQuery.trim()
    },
    activeMode === "PROCESSING" ? "\u{1F504}" : "\u{1F680}",
    " \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C"
  )), /* @__PURE__ */ React.createElement("div", { className: "text-sm text-gray-400" }, /* @__PURE__ */ React.createElement("p", null, "\u{1F4A1} \u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432:"), /* @__PURE__ */ React.createElement("ul", { className: "list-disc list-inside mt-1 space-y-1" }, /* @__PURE__ */ React.createElement("li", null, '"\u0421\u043E\u0437\u0434\u0430\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u043E\u0431 \u043E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0438" (\u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438)'), /* @__PURE__ */ React.createElement("li", null, '"Mehmonnavozlik \u043F\u0440\u0438\u043D\u0446\u0438\u043F\u044B \u0432 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u044F\u0445" (\u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u044B\u0439 \u0430\u043D\u0430\u043B\u0438\u0437)'), /* @__PURE__ */ React.createElement("li", null, '"Ordnung \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0439 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0435" (\u043D\u0435\u043C\u0435\u0446\u043A\u0438\u0439 \u043F\u043E\u0434\u0445\u043E\u0434)'), /* @__PURE__ */ React.createElement("li", null, '"\u0414\u0443\u0448\u0435\u0432\u043D\u0430\u044F \u0433\u043B\u0443\u0431\u0438\u043D\u0430 \u0432 \u0434\u0438\u0437\u0430\u0439\u043D\u0435" (\u0440\u0443\u0441\u0441\u043A\u0430\u044F \u043F\u0435\u0440\u0441\u043F\u0435\u043A\u0442\u0438\u0432\u0430)')))), /* @__PURE__ */ React.createElement("div", { className: "bg-gray-800 rounded-lg p-6" }, /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-bold mb-4" }, "\u{1F4DC} \u0421\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439 \u0416\u0443\u0440\u043D\u0430\u043B"), /* @__PURE__ */ React.createElement(
    "div",
    {
      ref: logRef,
      className: "bg-black rounded p-4 h-80 overflow-y-auto font-mono text-sm"
    },
    systemLog.map((entry) => /* @__PURE__ */ React.createElement("div", { key: entry.id, className: "mb-1" }, /* @__PURE__ */ React.createElement("span", { className: "text-gray-500" }, "[", entry.timestamp, "]"), /* @__PURE__ */ React.createElement("span", { className: `ml-2 ${entry.type === "ERROR" ? "text-red-400" : entry.type === "SUCCESS" ? "text-green-400" : entry.type === "WARNING" ? "text-yellow-400" : entry.type === "COMMAND" ? "text-blue-400" : entry.type === "QUERY" ? "text-purple-400" : entry.type === "ANALYSIS" ? "text-cyan-400" : entry.type === "RESPONSE" ? "text-pink-400" : "text-gray-300"}` }, entry.message)))
  ), /* @__PURE__ */ React.createElement("div", { className: "mt-4 flex justify-between text-sm text-gray-400" }, /* @__PURE__ */ React.createElement("span", null, "\u0417\u0430\u043F\u0438\u0441\u0435\u0439 \u0432 \u0436\u0443\u0440\u043D\u0430\u043B\u0435: ", systemLog.length), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSystemLog([]),
      className: "text-red-400 hover:text-red-300"
    },
    "\u{1F5D1}\uFE0F \u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0436\u0443\u0440\u043D\u0430\u043B"
  ))))), /* @__PURE__ */ React.createElement("div", { className: "mt-6 text-center text-gray-400 text-sm" }, /* @__PURE__ */ React.createElement("p", null, "\u{1F30C} Terra Ecosystem v7.0 - \u0420\u0430\u0431\u043E\u0447\u0430\u044F \u0421\u0431\u043E\u0440\u043A\u0430 \u0434\u043B\u044F \u0422\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F"), /* @__PURE__ */ React.createElement("p", null, "\xA9 2025 - AIUZ Terra - \u0410\u0431\u0434\u0443\u043A\u0430\u0440\u0438\u043C\u043E\u0432 \u0410\u0431\u0434\u0443\u0440\u0430\u0448\u0438\u0434 \u0410\u0431\u0434\u0443\u043B\u0445\u0430\u043C\u0438\u0442\u043E\u0432\u0438\u0447"), /* @__PURE__ */ React.createElement("p", { className: "mt-2" }, /* @__PURE__ */ React.createElement("span", { className: "text-green-400" }, "\u2705 \u0414\u0435\u0442\u0441\u043A\u0430\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C: \u0410\u0411\u0421\u041E\u041B\u042E\u0422\u041D\u042B\u0419 \u041F\u0420\u0418\u041E\u0420\u0418\u0422\u0415\u0422"), " | ", /* @__PURE__ */ React.createElement("span", { className: "text-blue-400" }, "\u{1F30D} \u041A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u0430\u044F \u0447\u0443\u0432\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C: \u041C\u0410\u041A\u0421\u0418\u041C\u0423\u041C"), " | ", /* @__PURE__ */ React.createElement("span", { className: "text-purple-400" }, "\u{1F9EC} \u0424\u0440\u0430\u043A\u0442\u0430\u043B\u044C\u043D\u0430\u044F \u043A\u043E\u0433\u0435\u0440\u0435\u043D\u0442\u043D\u043E\u0441\u0442\u044C: ", terraMemoryDNA.coherence, "%"))));
};
var stdin_default = TerraEcosystemWorkbench;
export {
  stdin_default as default
};
