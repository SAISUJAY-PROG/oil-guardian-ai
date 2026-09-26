import { useState } from "react";
import {
  MapPin,
  Users,
  Keyboard,
  Mic,
  FileText,
  Send,
  History,
  Volume2,
  AlertTriangle,
  Zap,
  Camera,
  Upload,
  Folder
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AccountControls from "../components/AccountControls";

function Employee() {
  const [location, setLocation] = useState("Duliajan Oilfield (Drilling)");
  const [department, setDepartment] = useState("Drilling Operations");
  const [mode, setMode] = useState("text");
  const [report, setReport] = useState("");

  // AI Prediction States - Starting Blank!
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [risk, setRisk] = useState("");
  const [category, setCategory] = useState("");
  const [sifRisk, setSifRisk] = useState("");
  const [iogpRule, setIogpRule] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  const [transmissions, setTransmissions] = useState([
    {
      id: "06-2026-7052",
      risk: "Medium Risk",
      status: "Submitted",
      text: "Spill detected in Sector 4 near the backup generators. Approximately 5 gallons of hydraulic fluid leaked onto the main walkway, creating a severe slip hazard.",
      location: "Duliajan Oilfield (Drilling)",
      department: "Drilling Operations"
    },
    {
      id: "06-2026-5154",
      risk: "Medium Risk",
      status: "Submitted",
      text: "Pressure indicator showing abnormal readings near the drilling equipment.",
      location: "Duliajan Oilfield (Drilling)",
      department: "Drilling Operations"
    }
  ]);

  const loadSample = (type) => {
    if (type === "high") {
      setReport(
        "Spill detected in Sector 4 near the backup generators. Approximately 5 gallons of hydraulic fluid leaked onto the main walkway, creating a severe slip hazard."
      );
      setCategory("Unsafe Condition");
      setRisk("High Risk");
      setSifRisk("85.0%");
      setIogpRule("Asset Integrity / Pressure");
    }

    if (type === "near") {
      setReport(
        "Worker almost slipped while walking through the maintenance area due to oil contamination on the floor."
      );
      setCategory("Near Miss");
      setRisk("Medium Risk");
      setSifRisk("48.0%");
      setIogpRule("Incident Prevention");
    }

    // Automatically show the analysis box for samples
    setHasAnalyzed(true);
    setMode("text"); // Switch back to text mode if they load a sample
  };

  const analyzeReport = async () => {
    if (!report.trim()) return;

    setAnalyzing(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: report })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "AI analysis failed.");
      }

      if (data.ensemble) {
        const percentage = Number(data.ensemble.sif_percentage) || 0;
        setSifRisk(`${percentage.toFixed(1)}%`);

        if (percentage >= 70) {
          setRisk("High Risk");
        } else if (percentage >= 40) {
          setRisk("Medium Risk");
        } else {
          setRisk("Low Risk");
        }
      }

      if (data.models) {
        const nearMiss = data.models.near_miss;
        const unsafeAct = data.models.unsafe_act;
        const unsafeCondition = data.models.unsafe_condition;

        const models = [
          { name: "Near Miss", data: nearMiss },
          { name: "Unsafe Act", data: unsafeAct },
          { name: "Unsafe Condition", data: unsafeCondition }
        ];

        const highest = models.reduce((current, item) => {
          if (!item.data) return current;
          if (Number(item.data.confidence) > Number(current.data?.confidence || 0)) {
            return item;
          }
          return current;
        }, { name: "Unsafe Condition", data: unsafeCondition });

        setCategory(highest.name);

        if (highest.data?.iogp_rule) {
          setIogpRule(highest.data.iogp_rule);
        } else {
          setIogpRule("General Safety Operations");
        }
      }

      // Reveal the AI Pre-triage box
      setHasAnalyzed(true);
    } catch (error) {
      console.error("AI analysis error:", error);
      // Fallback for demonstration if backend isn't running
      setCategory("Unsafe Condition");
      setRisk("Medium Risk");
      setSifRisk("65.0%");
      setIogpRule("Asset Integrity / Pressure");
      setHasAnalyzed(true);
    } finally {
      setAnalyzing(false);
    }
  };

  const transmitReport = () => {
    if (!report.trim()) return;

    const newTransmission = {
      id: `06-2026-${Math.floor(1000 + Math.random() * 8999)}`,
      risk,
      status: "Submitted",
      text: report,
      location,
      department
    };

    setTransmissions((previous) => [newTransmission, ...previous]);

    // Reset form after submission
    setReport("");
    setHasAnalyzed(false);
    setRisk("");
    setCategory("");
    setSifRisk("");
    setIogpRule("");
  };

  return (
    <div className="employee-page">
      <AccountControls role="Employee" />

      <main className="employee-container">
        <section className="hazard-log">
          <div className="hazard-header">
            <div>
              <div className="hazard-eyebrow">LIVE HAZARD LOG</div>
              <h1>Report Incident, Condition, or Near-Miss</h1>
            </div>

            <div className="sample-controls">
              <span>Load Sample:</span>
              <button className="sample-high cursor-target" onClick={() => loadSample("high")}>
                High Risk
              </button>
              <button className="sample-near cursor-target" onClick={() => loadSample("near")}>
                Near-Miss
              </button>
            </div>
          </div>

          <div className="employee-select-grid">
            <div className="employee-field">
              <label><MapPin size={14} /> FACILITY LOCATION</label>
              <select className="cursor-target" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option>Duliajan Oilfield (Drilling)</option>
                <option>Duliajan Oilfield (Production)</option>
                <option>Digboi Refinery</option>
                <option>Numaligarh Refinery</option>
              </select>
            </div>

            <div className="employee-field">
              <label><Users size={14} /> OPERATIONAL DEPARTMENT</label>
              <select className="cursor-target" value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option>Drilling Operations</option>
                <option>Production Operations</option>
                <option>Maintenance</option>
                <option>Electrical Operations</option>
                <option>HSE Department</option>
              </select>
            </div>
          </div>

          <div className="input-mode-grid">
            <button className={mode === "text" ? "input-mode active cursor-target" : "input-mode cursor-target"} onClick={() => setMode("text")}>
              <Keyboard size={14} /> Text Entry
            </button>
            <button className={mode === "voice" ? "input-mode active cursor-target" : "input-mode cursor-target"} onClick={() => setMode("voice")}>
              <Mic size={14} /> Voice Whisper AI
            </button>
            <button className={mode === "ocr" ? "input-mode active cursor-target" : "input-mode cursor-target"} onClick={() => setMode("ocr")}>
              <FileText size={14} /> PaddleOCR v4 Scan
            </button>
          </div>

          {/* DYNAMIC ACTION PANELS */}
          <AnimatePresence mode="wait">
            {mode === "ocr" && (
              <motion.div
                key="ocr"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="action-panel ocr-panel"
                style={{ overflow: "hidden" }}
              >
                <div className="action-buttons">
                  <button className="btn-camera cursor-target">
                    <Camera size={16} /> Live Camera Scan
                  </button>
                  <button className="btn-upload cursor-target">
                    <Upload size={14} /> <Folder size={14} /> Upload Image / Document
                  </button>
                </div>
                <p>Use live camera scan or upload a field slip/card image for PaddleOCR parsing</p>
              </motion.div>
            )}

            {mode === "voice" && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="action-panel voice-panel"
                style={{ overflow: "hidden" }}
              >
                <motion.button
                  className="btn-record cursor-target"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mic size={24} />
                </motion.button>
                <p>Click microphone to speak your field observation live</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="report-box">
            <textarea
              className="cursor-target"
              value={report}
              onChange={(e) => {
                setReport(e.target.value);
                if (hasAnalyzed) setHasAnalyzed(false); // Hide analysis if they edit text
              }}
              placeholder={
                mode === "voice"
                  ? "Voice Whisper AI input will appear here..."
                  : mode === "ocr"
                  ? "PaddleOCR v4 scanned text will appear here..."
                  : "Describe the incident, unsafe condition, or near-miss..."
              }
            />
            <button className="mic-button cursor-target" type="button" title="Voice input">
              <Volume2 size={17} />
            </button>
          </div>

          <AnimatePresence>
            {hasAnalyzed && (
              <motion.div
                className="pretriage"
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="pretriage-header">
                  <div className="pretriage-title">
                    <AlertTriangle size={15} />
                    AI REAL-TIME PRE-TRIAGE
                  </div>
                  <span className={`risk-badge ${risk === "High Risk" ? "risk-high" : risk === "Low Risk" ? "risk-low" : "risk-medium"}`}>
                    {risk}
                  </span>
                </div>

                <div className="triage-grid">
                  <div className="triage-card">
                    <span>CATEGORY</span>
                    <strong>{category}</strong>
                  </div>
                  <div className="triage-card">
                    <span>SIF RISK</span>
                    <strong>{sifRisk}</strong>
                  </div>
                  <div className="triage-card">
                    <span>IOGP RULE</span>
                    <strong>{iogpRule}</strong>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!hasAnalyzed ? (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="transmit-button cursor-target"
              onClick={analyzeReport}
              disabled={analyzing || !report.trim()}
            >
              <Zap size={19} />
              {analyzing ? "Running AI Pre-Triage..." : "Analyze Hazard"}
            </motion.button>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="transmit-button cursor-target"
              onClick={transmitReport}
              style={{ background: "linear-gradient(90deg, #10b981, #059669)", boxShadow: "0 7px 22px rgba(16, 185, 129, 0.25)" }}
            >
              <Send size={19} />
              Transmit Report ({category} · {risk})
            </motion.button>
          )}

        </section>

        <section className="transmissions">
          <div className="transmissions-title">
            <History size={20} />
            <h2>My Transmissions</h2>
          </div>

          <div className="transmission-list">
            <AnimatePresence>
              {transmissions.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="transmission-card"
                  key={item.id}
                >
                  <div className="transmission-top">
                    <strong>{item.id}</strong>
                    <span className="transmission-risk">{item.risk}</span>
                    <span className="transmission-status">{item.status}</span>
                  </div>
                  <p>{item.text}</p>
                  <small>{item.location} · {item.department}</small>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Employee;