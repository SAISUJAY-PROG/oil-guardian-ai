import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  User,
  Power,
  RefreshCw,
  Flame,
  AlertTriangle,
  CheckCircle,
  Database,
  Crosshair,
  Search,
  Calendar,
  FilterX,
  ChevronDown,
  X,
  ArrowLeft,
  Activity,
  MapPin,
  CheckSquare,
  MessageSquare,
  Target,
  Settings,
  BrainCircuit,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Officer() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All Risk Tiers");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [showProfile, setShowProfile] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);

  // NEW STATE FOR CONFIRMATION MODAL
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  const logs = [
    {
      id: "06-2026-5483",
      site: "Duliajan Oilfield (Drilling) · Drilling Operations",
      date: "9/21/2026, 11:30:19 AM",
      category: "Near-Miss",
      risk: "High Risk",
      sif: "90.0%",
      status: "Resolved",
      rule: "Mechanical Lifting",
      standard: "OISD Standard 179",
      description: "Crane hoist sling slipped while moving drill collar.",
      highlight: "slipped",
      models: { a: "12.0%", b: "76.0%", c: "93.3%" }
    },
    {
      id: "06-2026-5332",
      site: "Duliajan Oilfield (Drilling) · Drilling Operations",
      date: "9/20/2026, 14:15:00 PM",
      category: "Unsafe Condition",
      risk: "Medium Risk",
      sif: "52.3%",
      status: "Submitted",
      rule: "Asset Integrity / Pressure",
      standard: "OISD Standard 114",
      description: "Pressure indicator showing abnormal readings near the drilling equipment.",
      highlight: "abnormal readings",
      models: { a: "5.0%", b: "82.1%", c: "41.0%" }
    },
    {
      id: "06-2026-1236",
      site: "Digboi Refinery · Maintenance",
      date: "9/19/2026, 09:45:22 AM",
      category: "Unsafe Act",
      risk: "Medium Risk",
      sif: "65.0%",
      status: "Submitted",
      rule: "Working at Height",
      standard: "OISD Standard 192",
      description: "Improper scaffolding setup observed near sector 4. Workers paused operation.",
      highlight: "Improper scaffolding",
      models: { a: "88.5%", b: "45.2%", c: "60.1%" }
    }
  ];

  const pageVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  const handleConfirmUpdate = () => {
    // In a real integration, API call to update status happens here
    setShowConfirmModal(false);
    setSelectedLog(null); // Returns user to the main table
  };

  return (
    <div className="telemetry-page">
      {/* NAVBAR */}
      <nav className="telemetry-navbar">
        <div className="telemetry-nav-left">
          <div className="telemetry-brand">
            <div className="telemetry-logo"><Shield size={18} /></div>
            <span>OIL Guardian <strong className="text-orange">AI</strong></span>
          </div>
          <div className="telemetry-live-badge">
            <span className="live-dot" /> Command Center Live
          </div>
        </div>
        <div className="telemetry-nav-right">
          <button className="telemetry-btn-profile cursor-target" onClick={() => setShowProfile(true)}>
            <div className="profile-icon-blue"><User size={14} /></div>
            Safety Officer (Lead) <ChevronDown size={14} className="text-muted" />
          </button>
          <button className="telemetry-btn-logout cursor-target" onClick={() => navigate("/")} title="Secure Logout">
            <Power size={14} />
          </button>
        </div>
      </nav>

      <main className="telemetry-container">
        <AnimatePresence mode="wait">
          {!selectedLog ? (
            /* =========================================
               DASHBOARD VIEW (TABLE)
            ========================================= */
            <motion.div key="dashboard" variants={pageVariants} initial="hidden" animate="show" exit="exit">
              <div className="telemetry-header">
                <div>
                  <h1>Safety Telemetry Feed</h1>
                  <p>Live neural analysis of reports submitted across oilfields.</p>
                </div>
                <button className="telemetry-btn-sync cursor-target"><RefreshCw size={14} /> Sync Feeds</button>
              </div>

              <div className="telemetry-metrics-grid">
                <div className="metric-card">
                  <div className="metric-top text-red"><span>High Risk</span><Flame size={14} /></div>
                  <strong>1</strong>
                </div>
                <div className="metric-card">
                  <div className="metric-top text-orange"><span>Medium Risk</span><AlertTriangle size={14} /></div>
                  <strong>2</strong>
                </div>
                <div className="metric-card">
                  <div className="metric-top text-green"><span>Low Risk</span></div>
                  <strong>0</strong>
                </div>
                <div className="metric-card">
                  <div className="metric-top text-blue"><span>Active Inves.</span><Crosshair size={14} /></div>
                  <strong>0</strong>
                </div>
                <div className="metric-card">
                  <div className="metric-top text-muted"><span>Resolved</span><CheckCircle size={14} /></div>
                  <strong>1</strong>
                </div>
                <div className="metric-card">
                  <div className="metric-top text-orange"><span>Total Logs</span><Database size={14} /></div>
                  <strong>3</strong>
                </div>
              </div>

              <div className="telemetry-filters">
                <div className="filter-search">
                  <Search size={16} className="text-muted" />
                  <input
                    type="text"
                    className="cursor-target"
                    placeholder="Search Telemetry ID, site, department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <select className="cursor-target" value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
                  <option>All Risk Tiers</option>
                  <option>High Risk</option>
                  <option>Medium Risk</option>
                </select>
                <select className="cursor-target" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option>All Categories</option>
                  <option>Near-Miss</option>
                  <option>Unsafe Condition</option>
                </select>
                <button className="btn-clear-filters cursor-target"><FilterX size={16} /></button>
              </div>

              <div className="telemetry-table-wrapper">
                <table className="telemetry-table">
                  <thead>
                    <tr>
                      <th>TELEMETRY ID</th>
                      <th>SITE & DEPARTMENT</th>
                      <th>CATEGORY</th>
                      <th>RISK TIER</th>
                      <th>SIF PROB.</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr
                        key={log.id}
                        onClick={() => setSelectedLog(log)}
                        className="telemetry-row-clickable cursor-target"
                      >
                        <td className="text-white font-bold">{log.id}</td>
                        <td className="text-muted">{log.site}</td>
                        <td className="text-muted">{log.category}</td>
                        <td>
                          <span className={`risk-pill ${log.risk === 'High Risk' ? 'pill-red' : 'pill-orange'}`}>
                            {log.risk}
                          </span>
                        </td>
                        <td className="text-orange font-bold">{log.sif}</td>
                        <td className={log.status === 'Resolved' ? 'text-green' : 'text-muted'}>
                          {log.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            /* =========================================
               DETAILED REPORT VIEW
            ========================================= */
            <motion.div key="details" variants={pageVariants} initial="hidden" animate="show" exit="exit" className="report-detail-view">

              <div className="report-detail-header">
                <button className="btn-back cursor-target" onClick={() => setSelectedLog(null)}>
                  <ArrowLeft size={16} /> Back to Telemetry Feed
                </button>
                <div className="report-meta">
                  <MapPin size={14} /> {selectedLog.site} · {selectedLog.date}
                </div>
              </div>

              {/* TOP 4 KPI CARDS */}
              <div className="report-kpi-grid">
                <div className="report-kpi-card">
                  <div className="kpi-top"><span>SIF PRECURSOR PROB.</span> <Activity size={14} className="text-orange"/></div>
                  <div className="kpi-main">
                    <h2>{selectedLog.sif}</h2>
                    <span className={`risk-pill ${selectedLog.risk === 'High Risk' ? 'pill-red' : 'pill-orange'}`}>
                      {selectedLog.risk === 'High Risk' ? 'CRITICAL' : 'MODERATE'}
                    </span>
                  </div>
                  <div className="kpi-bar">
                    <div
                      className="kpi-fill"
                      style={{
                        width: selectedLog.sif,
                        background: selectedLog.risk === 'High Risk' ? '#ef4444' : '#f97316'
                      }}
                    />
                  </div>
                  <small>Likelihood of fatal or life-altering harm</small>
                </div>

                <div className="report-kpi-card">
                  <div className="kpi-top"><span>INCIDENT CATEGORY</span> <Target size={14} className="text-blue"/></div>
                  <div className="kpi-main">
                    <h2 className="text-white">{selectedLog.category}</h2>
                  </div>
                  <div className="kpi-sub text-blue"><CheckCircle size={12}/> High-Energy Close Call</div>
                  <small>Classified across Act, Cond., Near-Miss</small>
                </div>

                <div className="report-kpi-card">
                  <div className="kpi-top"><span>OPERATIONAL SEVERITY</span> <AlertTriangle size={14} className="text-orange"/></div>
                  <div className="kpi-main">
                    <h2 className="text-orange">{selectedLog.risk}</h2>
                  </div>
                  <div className="kpi-sub text-muted"><Settings size={12}/> Tier 2 Operational Event</div>
                  <small>Assessed on frequency & exposure</small>
                </div>

                <div className="report-kpi-card">
                  <div className="kpi-top"><span>IOGP LIFE-SAVING RULE</span> <Shield size={14} className="text-blue"/></div>
                  <div className="kpi-main">
                    <h2 className="text-white" style={{ fontSize: '18px' }}>{selectedLog.rule}</h2>
                  </div>
                  <div className="kpi-sub">
                    <span className="oisd-badge"><Database size={10}/> {selectedLog.standard}</span>
                  </div>
                  <small>Regulatory safety mandate compliance</small>
                </div>
              </div>

              {/* MAIN CONTENT GRID */}
              <div className="report-main-grid">

                {/* LEFT COLUMN: AI DIAGNOSTICS */}
                <div className="report-left-col">

                  <div className="report-section-box">
                    <div className="section-box-header">
                      <div className="step-badge">01</div>
                      <h3>Field Observation & Semantic XAI Extraction</h3>
                      <span className="shap-badge">SHAP TOKEN WEIGHTS</span>
                    </div>
                    <div className="xai-text-box">
                      {selectedLog.description.split(selectedLog.highlight).map((part, i, arr) =>
                        i === arr.length - 1 ? (
                          part
                        ) : (
                          <span key={i}>
                            {part}<span className="xai-highlight">{selectedLog.highlight}</span>
                          </span>
                        )
                      )}
                    </div>
                    <div className="xai-footer">
                      <span><span className="dot-orange"></span> SIF Trigger Tokens (Kinetic / Pressure / Height)</span>
                      <span>Confidence Threshold: <strong>0.82</strong></span>
                    </div>
                  </div>

                  <div className="report-section-box">
                    <div className="section-box-header">
                      <div className="step-badge">02</div>
                      <h3>3-Expert Ensemble Diagnostics (BERT + RoBERTa + XGBoost)</h3>
                      <span className="calibrated-badge">Calibrated Soft-Voting Stack</span>
                    </div>

                    <div className="ensemble-model-row">
                      <div className="model-row-top">
                        <span><BrainCircuit size={14} className="text-blue"/> Model A · Unsafe Act Specialist (Behavioral)</span>
                        <strong>{selectedLog.models.a}</strong>
                      </div>
                      <div className="model-bar">
                        <div className="model-fill bg-blue" style={{ width: selectedLog.models.a }} />
                      </div>
                      <small>Probability of intentional procedural omission by operator</small>
                    </div>

                    <div className="ensemble-model-row">
                      <div className="model-row-top">
                        <span><AlertTriangle size={14} className="text-orange"/> Model B · Unsafe Condition Specialist (Mechanical)</span>
                        <strong className="text-orange">{selectedLog.models.b}</strong>
                      </div>
                      <div className="model-bar">
                        <div className="model-fill bg-orange" style={{ width: selectedLog.models.b }} />
                      </div>
                      <small>Elevated degradation on hardware / environmental factors</small>
                    </div>

                    <div className="ensemble-model-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                      <div className="model-row-top">
                        <span><Flame size={14} className="text-orange"/> Model C · Near-Miss High-Energy Precursor (SIF Engine)</span>
                        <strong className="text-orange">{selectedLog.models.c}</strong>
                      </div>
                      <div className="model-bar">
                        <div className="model-fill bg-orange" style={{ width: selectedLog.models.c }} />
                      </div>
                      <small>Confirmed high-energy barrier failure with proximity to personnel</small>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: WORKFLOW */}
                <div className="report-right-col">

                  <div className="report-section-box workflow-box">
                    <div className="workflow-eyebrow">COMMAND WORKFLOW</div>
                    <h3>Authorize Status Override</h3>

                    <div className="workflow-field">
                      <label>LIFECYCLE STATUS</label>
                      <select className="cursor-target" defaultValue={selectedLog.status}>
                        <option value="Submitted">Submitted (Under Review)</option>
                        <option value="Investigating">Active Investigation</option>
                        <option value="Resolved">Resolved & Closed</option>
                      </select>
                    </div>

                    <div className="workflow-field">
                      <label>ASSIGN LEAD INVESTIGATOR</label>
                      <input className="cursor-target" type="text" placeholder="e.g., Rig Supv. Barua (Drilling)" />
                    </div>

                    <div className="workflow-field">
                      <label>ACTION REMARKS</label>
                      <textarea className="cursor-target" placeholder="Record mandatory regulatory notes..."></textarea>
                    </div>

                    <button
                      className="btn-authorize cursor-target"
                      onClick={() => setShowConfirmModal(true)}
                    >
                      <CheckSquare size={16} /> Authorize Status Update
                    </button>
                  </div>

                  <div className="report-section-box notes-box">
                    <div className="notes-header">
                      <h3><MessageSquare size={14} className="text-orange"/> Officer Notes</h3>
                      <span className="entries-badge">1 Entries</span>
                    </div>

                    <div className="note-item">
                      <div className="note-top"><strong>oil-79655</strong> <span>11:30 AM</span></div>
                      <p>Report submitted and logged into central database.</p>
                    </div>

                    <div className="note-input-area">
                      <input className="cursor-target" type="text" placeholder="Add confidential inspection note..." />
                      <button className="cursor-target"><Send size={14} /> Post</button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* CONFIRMATION OVERLAY MODAL */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            className="profile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="confirm-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="confirm-icon">
                <AlertTriangle size={32} className="text-orange" />
              </div>
              <h3>Confirm Status Override</h3>
              <p>Are you sure you want to authorize this lifecycle update? This action is permanently logged to the audit trail.</p>

              <div className="confirm-actions">
                <button className="btn-cancel cursor-target" onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </button>
                <button className="btn-confirm cursor-target" onClick={handleConfirmUpdate}>
                  Authorize Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PROFILE OVERLAY MODAL */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="profile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="profile-modal">
              <button className="profile-close cursor-target" onClick={() => setShowProfile(false)}>
                <X size={24} />
              </button>
              <div className="profile-header">
                <div className="profile-avatar"><User size={34} /></div>
                <div className="profile-heading">
                  <h2>Mahamad Huzaif Patel</h2>
                  <h3>Safety Officer (Lead)</h3>
                  <span className="profile-certification">OISD Certified Active</span>
                </div>
              </div>
              <div className="profile-divider" />
              <div className="profile-info">
                <div className="profile-row"><span>Company</span><strong>Oil India Limited</strong></div>
                <div className="profile-row"><span>Total Incidents Reviewed</span><strong>128 Reports</strong></div>
              </div>
              <button className="close-profile-button cursor-target" onClick={() => setShowProfile(false)}>Close Profile</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Officer;