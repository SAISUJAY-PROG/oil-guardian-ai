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
  AlertTriangle
} from "lucide-react";

import AccountControls from "../components/AccountControls";

function Employee() {
  const [location, setLocation] = useState(
    "Duliajan Oilfield (Drilling)"
  );

  const [department, setDepartment] = useState(
    "Drilling Operations"
  );

  const [mode, setMode] = useState("text");

  const [report, setReport] = useState("");

  const [risk, setRisk] = useState("Medium Risk");

  const [category, setCategory] = useState(
    "Unsafe Condition"
  );

  const [sifRisk, setSifRisk] = useState("65.0%");

  const [iogpRule, setIogpRule] = useState(
    "Asset Integrity / Pressure"
  );

  const [analyzing, setAnalyzing] = useState(false);

  const [transmissions, setTransmissions] = useState([
    {
      id: "06-2026-7052",
      risk: "Medium Risk",
      status: "Submitted",
      text:
        "Spill detected in Sector 4 near the backup generators. Approximately 5 gallons of hydraulic fluid leaked onto the main walkway, creating a severe slip hazard.",
      location: "Duliajan Oilfield (Drilling)",
      department: "Drilling Operations"
    },
    {
      id: "06-2026-5154",
      risk: "Medium Risk",
      status: "Submitted",
      text:
        "Pressure indicator showing abnormal readings near the drilling equipment.",
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
      setRisk("Medium Risk");
      setSifRisk("65.0%");
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
  };

  const analyzeReport = async () => {
    if (!report.trim()) {
      return;
    }

    setAnalyzing(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            text: report
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "AI analysis failed."
        );
      }

      if (data.ensemble) {
        const percentage =
          Number(data.ensemble.sif_percentage) || 0;

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
        const unsafeCondition =
          data.models.unsafe_condition;

        const models = [
          {
            name: "Near Miss",
            data: nearMiss
          },
          {
            name: "Unsafe Act",
            data: unsafeAct
          },
          {
            name: "Unsafe Condition",
            data: unsafeCondition
          }
        ];

        const highest = models.reduce(
          (current, item) => {
            if (!item.data) return current;

            if (
              Number(item.data.confidence) >
              Number(current.data?.confidence || 0)
            ) {
              return item;
            }

            return current;
          },
          {
            name: "Unsafe Condition",
            data: unsafeCondition
          }
        );

        if (highest.name === "Near Miss") {
          setCategory("Near Miss");
        } else if (highest.name === "Unsafe Act") {
          setCategory("Unsafe Act");
        } else {
          setCategory("Unsafe Condition");
        }

        if (highest.data?.iogp_rule) {
          setIogpRule(highest.data.iogp_rule);
        }
      }
    } catch (error) {
      console.error(
        "AI analysis error:",
        error
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const transmitReport = async () => {
    if (!report.trim() || analyzing) {
      return;
    }

    await analyzeReport();

    const newTransmission = {
      id: `06-2026-${Math.floor(
        1000 + Math.random() * 8999
      )}`,
      risk,
      status: "Submitted",
      text: report,
      location,
      department
    };

    setTransmissions((previous) => [
      newTransmission,
      ...previous
    ]);
  };

  return (
    <div className="employee-page">

      <AccountControls role="Employee" />

      <main className="employee-container">

        <section className="hazard-log">

          <div className="hazard-header">

            <div>
              <div className="hazard-eyebrow">
                LIVE HAZARD LOG
              </div>

              <h1>
                Report Incident, Condition, or Near-Miss
              </h1>
            </div>

            <div className="sample-controls">

              <span>Load Sample:</span>

              <button
                className="sample-high"
                onClick={() => loadSample("high")}
              >
                High Risk
              </button>

              <button
                className="sample-near"
                onClick={() => loadSample("near")}
              >
                Near-Miss
              </button>

            </div>

          </div>

          <div className="employee-select-grid">

            <div className="employee-field">

              <label>
                <MapPin size={14} />
                FACILITY LOCATION
              </label>

              <select
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
              >
                <option>
                  Duliajan Oilfield (Drilling)
                </option>

                <option>
                  Duliajan Oilfield (Production)
                </option>

                <option>
                  Digboi Refinery
                </option>

                <option>
                  Numaligarh Refinery
                </option>
              </select>

            </div>

            <div className="employee-field">

              <label>
                <Users size={14} />
                OPERATIONAL DEPARTMENT
              </label>

              <select
                value={department}
                onChange={(event) =>
                  setDepartment(event.target.value)
                }
              >
                <option>
                  Drilling Operations
                </option>

                <option>
                  Production Operations
                </option>

                <option>
                  Maintenance
                </option>

                <option>
                  Electrical Operations
                </option>

                <option>
                  HSE Department
                </option>
              </select>

            </div>

          </div>

          <div className="input-mode-grid">

            <button
              className={
                mode === "text"
                  ? "input-mode active"
                  : "input-mode"
              }
              onClick={() => setMode("text")}
            >
              <Keyboard size={14} />
              Text Entry
            </button>

            <button
              className={
                mode === "voice"
                  ? "input-mode active"
                  : "input-mode"
              }
              onClick={() => setMode("voice")}
            >
              <Mic size={14} />
              Voice Whisper AI
            </button>

            <button
              className={
                mode === "ocr"
                  ? "input-mode active"
                  : "input-mode"
              }
              onClick={() => setMode("ocr")}
            >
              <FileText size={14} />
              PaddleOCR v4 Scan
            </button>

          </div>

          <div className="report-box">

            <textarea
              value={report}
              onChange={(event) =>
                setReport(event.target.value)
              }
              placeholder={
                mode === "voice"
                  ? "Voice Whisper AI input..."
                  : mode === "ocr"
                  ? "PaddleOCR v4 scanned text..."
                  : "Describe the incident, unsafe condition, or near-miss..."
              }
            />

            <button
              className="mic-button"
              type="button"
              title="Voice input"
            >
              <Volume2 size={17} />
            </button>

          </div>

          <div className="pretriage">

            <div className="pretriage-header">

              <div className="pretriage-title">
                <AlertTriangle size={15} />
                AI REAL-TIME PRE-TRIAGE
              </div>

              <span
                className={`risk-badge ${
                  risk === "High Risk"
                    ? "risk-high"
                    : risk === "Low Risk"
                    ? "risk-low"
                    : "risk-medium"
                }`}
              >
                {risk}
              </span>

            </div>

            <div className="triage-grid">

              <div className="triage-card">

                <span>CATEGORY</span>

                <strong>
                  {category}
                </strong>

              </div>

              <div className="triage-card">

                <span>SIF RISK</span>

                <strong>
                  {sifRisk}
                </strong>

              </div>

              <div className="triage-card">

                <span>IOGP RULE</span>

                <strong>
                  {iogpRule}
                </strong>

              </div>

            </div>

          </div>

          <button
            className="transmit-button"
            onClick={transmitReport}
            disabled={analyzing}
          >
            <Send size={19} />

            {analyzing
              ? "Analyzing Report..."
              : `Transmit Report (${category} · ${risk})`}
          </button>

        </section>

        <section className="transmissions">

          <div className="transmissions-title">

            <History size={20} />

            <h2>
              My Transmissions
            </h2>

          </div>

          <div className="transmission-list">

            {transmissions.map((item) => (
              <div
                className="transmission-card"
                key={item.id}
              >

                <div className="transmission-top">

                  <strong>
                    {item.id}
                  </strong>

                  <span className="transmission-risk">
                    {item.risk}
                  </span>

                  <span className="transmission-status">
                    {item.status}
                  </span>

                </div>

                <p>
                  {item.text}
                </p>

                <small>
                  {item.location} ·{" "}
                  {item.department}
                </small>

              </div>
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default Employee;