import { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp,
  FileWarning,
  Clock,
  Eye,
  Filter
} from "lucide-react";

import AccountControls from "../components/AccountControls";

function Officer() {
  const [filter, setFilter] = useState("All");

  const reports = [
    {
      id: "06-2026-7052",
      category: "Unsafe Condition",
      risk: "High Risk",
      sif: "78.4%",
      location: "Duliajan Oilfield",
      department: "Drilling Operations",
      status: "Open",
      time: "12 min ago"
    },
    {
      id: "06-2026-7048",
      category: "Unsafe Act",
      risk: "High Risk",
      sif: "72.1%",
      location: "Duliajan Oilfield",
      department: "Maintenance",
      status: "Under Review",
      time: "28 min ago"
    },
    {
      id: "06-2026-7039",
      category: "Near Miss",
      risk: "Medium Risk",
      sif: "48.5%",
      location: "Digboi Refinery",
      department: "Production Operations",
      status: "Resolved",
      time: "1 hr ago"
    },
    {
      id: "06-2026-7027",
      category: "Unsafe Condition",
      risk: "Medium Risk",
      sif: "43.7%",
      location: "Duliajan Oilfield",
      department: "Electrical Operations",
      status: "Under Review",
      time: "2 hrs ago"
    },
    {
      id: "06-2026-7015",
      category: "Near Miss",
      risk: "Low Risk",
      sif: "21.6%",
      location: "Numaligarh Refinery",
      department: "HSE Department",
      status: "Resolved",
      time: "3 hrs ago"
    }
  ];

  const filteredReports =
    filter === "All"
      ? reports
      : reports.filter(
          (report) => report.risk === filter
        );

  return (
    <div className="officer-page">

      <AccountControls role="Safety Officer" />

      <main className="officer-container">

        <div className="officer-header">

          <div>

            <div className="officer-eyebrow">
              SAFETY OPERATIONS COMMAND
            </div>

            <h1>
              Safety Officer Dashboard
            </h1>

            <p>
              Monitor industrial safety reports,
              AI risk analysis, and active hazards.
            </p>

          </div>

          <div className="officer-live-status">
            <span />
            SYSTEM ONLINE
          </div>

        </div>

        <section className="officer-stat-grid">

          <div className="officer-stat-card">

            <div className="officer-stat-icon">
              <FileWarning size={21} />
            </div>

            <div>
              <span>
                TOTAL REPORTS
              </span>

              <strong>
                128
              </strong>

              <small>
                +12 this week
              </small>
            </div>

          </div>

          <div className="officer-stat-card">

            <div className="officer-stat-icon">
              <AlertTriangle size={21} />
            </div>

            <div>
              <span>
                HIGH RISK
              </span>

              <strong>
                17
              </strong>

              <small>
                Requires attention
              </small>
            </div>

          </div>

          <div className="officer-stat-card">

            <div className="officer-stat-icon">
              <CheckCircle size={21} />
            </div>

            <div>
              <span>
                RESOLVED
              </span>

              <strong>
                94
              </strong>

              <small>
                73.4% of reports
              </small>
            </div>

          </div>

          <div className="officer-stat-card">

            <div className="officer-stat-icon">
              <Activity size={21} />
            </div>

            <div>
              <span>
                AVERAGE SIF RISK
              </span>

              <strong>
                28%
              </strong>

              <small>
                Across all reports
              </small>
            </div>

          </div>

        </section>

        <section className="officer-analysis">

          <div className="section-heading">

            <div>
              <div className="section-label">
                <TrendingUp size={15} />
                AI ENSEMBLE ANALYSIS
              </div>

              <h2>
                Current Safety Risk Overview
              </h2>
            </div>

            <span className="moderate-badge">
              Moderate Risk
            </span>

          </div>

          <div className="ensemble-overview">

            <div className="ensemble-score">

              <span>
                OVERALL SIF PROBABILITY
              </span>

              <strong>
                24.0%
              </strong>

              <div className="risk-progress">
                <div
                  className="risk-progress-value"
                  style={{
                    width: "24%"
                  }}
                />
              </div>

            </div>

            <div className="ensemble-info">

              <div>
                <span>
                  Near Miss
                </span>

                <strong>
                  18%
                </strong>
              </div>

              <div>
                <span>
                  Unsafe Act
                </span>

                <strong>
                  31%
                </strong>
              </div>

              <div>
                <span>
                  Unsafe Condition
                </span>

                <strong>
                  22%
                </strong>
              </div>

            </div>

          </div>

        </section>

        <section className="officer-models">

          <div className="section-heading">

            <div>
              <div className="section-label">
                <ShieldCheck size={15} />
                SPECIALIST MODELS
              </div>

              <h2>
                Model Predictions
              </h2>
            </div>

          </div>

          <div className="model-card-grid">

            <div className="officer-model-card">

              <div className="model-card-top">

                <span>
                  NEAR MISS
                </span>

                <Activity size={17} />

              </div>

              <strong>
                18%
              </strong>

              <small>
                Incident Prevention
              </small>

            </div>

            <div className="officer-model-card">

              <div className="model-card-top">

                <span>
                  UNSAFE ACT
                </span>

                <Activity size={17} />

              </div>

              <strong>
                31%
              </strong>

              <small>
                Safe Work Practice
              </small>

            </div>

            <div className="officer-model-card">

              <div className="model-card-top">

                <span>
                  UNSAFE CONDITION
                </span>

                <Activity size={17} />

              </div>

              <strong>
                22%
              </strong>

              <small>
                Worksite Condition
              </small>

            </div>

          </div>

        </section>

        <section className="reports-section">

          <div className="reports-header">

            <div>

              <div className="section-label">
                <FileWarning size={15} />
                SAFETY REPORTS
              </div>

              <h2>
                Recent Reports
              </h2>

            </div>

            <div className="report-filter">

              <Filter size={14} />

              <select
                value={filter}
                onChange={(event) =>
                  setFilter(event.target.value)
                }
              >
                <option value="All">
                  All
                </option>

                <option value="High Risk">
                  High Risk
                </option>

                <option value="Medium Risk">
                  Medium Risk
                </option>

                <option value="Low Risk">
                  Low Risk
                </option>
              </select>

            </div>

          </div>

          <div className="reports-table-wrapper">

            <table className="reports-table">

              <thead>

                <tr>
                  <th>REPORT</th>
                  <th>CATEGORY</th>
                  <th>SIF RISK</th>
                  <th>LOCATION</th>
                  <th>STATUS</th>
                  <th>TIME</th>
                  <th></th>
                </tr>

              </thead>

              <tbody>

                {filteredReports.map((report) => (
                  <tr key={report.id}>

                    <td>
                      <strong className="report-id">
                        {report.id}
                      </strong>

                      <small>
                        {report.department}
                      </small>
                    </td>

                    <td>
                      <span className="category-text">
                        {report.category}
                      </span>
                    </td>

                    <td>

                      <span
                        className={`table-risk ${
                          report.risk === "High Risk"
                            ? "table-risk-high"
                            : report.risk ===
                              "Low Risk"
                            ? "table-risk-low"
                            : "table-risk-medium"
                        }`}
                      >
                        {report.sif}
                      </span>

                    </td>

                    <td>
                      <span className="location-text">
                        {report.location}
                      </span>
                    </td>

                    <td>

                      <span
                        className={`report-status ${
                          report.status ===
                          "Resolved"
                            ? "status-resolved"
                            : report.status ===
                              "Open"
                            ? "status-open"
                            : "status-review"
                        }`}
                      >
                        {report.status}
                      </span>

                    </td>

                    <td>

                      <span className="time-text">
                        <Clock size={12} />
                        {report.time}
                      </span>

                    </td>

                    <td>

                      <button
                        className="view-report-button"
                        title="View Report"
                      >
                        <Eye size={15} />
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Officer;