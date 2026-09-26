import {
  ArrowLeft,
  ShieldCheck,
  Activity,
  AlertTriangle,
  Brain,
  TrendingUp,
  FileWarning,
  CheckCircle
} from "lucide-react";

import {
  Link
} from "react-router-dom";


function Officer() {

  const reports = [
    {
      id: "RPT-128",
      observation: "Confined space gas test missing",
      risk: 82,
      status: "High Risk"
    },
    {
      id: "RPT-127",
      observation: "Improper PPE usage",
      risk: 58,
      status: "Review"
    },
    {
      id: "RPT-126",
      observation: "Oil leakage near flange",
      risk: 74,
      status: "High Risk"
    },
    {
      id: "RPT-125",
      observation: "Damaged electrical cable",
      risk: 41,
      status: "Resolved"
    }
  ];


  return (

    <div className="officer-page">

      <nav className="dashboard-navbar">

        <Link
          to="/"
          className="back-link"
        >
          <ArrowLeft size={18} />
          Home
        </Link>


        <div className="dashboard-brand">

          <ShieldCheck size={28} />

          <div>

            <strong>
              OIL Guardian AI
            </strong>

            <span>
              Safety Officer Dashboard
            </span>

          </div>

        </div>

        <div />

      </nav>


      <main className="dashboard-container">

        <div className="dashboard-heading">

          <div>

            <span>
              SAFETY INTELLIGENCE
            </span>

            <h1>
              Officer Dashboard
            </h1>

            <p>
              Monitor AI-assisted safety risk analysis.
            </p>

          </div>

          <div className="dashboard-status">

            <Activity size={18} />

            AI System Online

          </div>

        </div>


        <section className="stats-grid">

          <StatCard
            icon={<FileWarning />}
            title="Total Reports"
            value="128"
          />

          <StatCard
            icon={<AlertTriangle />}
            title="High Risk Reports"
            value="17"
          />

          <StatCard
            icon={<CheckCircle />}
            title="Resolved"
            value="94"
          />

          <StatCard
            icon={<TrendingUp />}
            title="Average Risk"
            value="28%"
          />

        </section>


        <section className="ensemble-dashboard-card">

          <div className="ensemble-header">

            <div>

              <span>
                HETEROGENEOUS ENSEMBLE
              </span>

              <h2>
                AI Safety Analysis
              </h2>

            </div>

            <Brain size={28} />

          </div>


          <div className="ensemble-main">

            <div className="ensemble-score">

              <span>
                SIF Probability
              </span>

              <strong>
                24%
              </strong>

              <div className="dashboard-progress">

                <div
                  style={{
                    width: "24%"
                  }}
                />

              </div>

              <small>
                Demo dashboard value
              </small>

            </div>


            <div className="risk-status">

              <span>
                Risk Level
              </span>

              <strong>
                Moderate
              </strong>

              <p>
                Final value will come from
                FastAPI soft voting.
              </p>

            </div>

          </div>

        </section>


        <section className="specialist-section">

          <div className="section-heading">

            <span>
              MODEL BREAKDOWN
            </span>

            <h2>
              Specialist Predictions
            </h2>

          </div>


          <div className="specialist-grid">

            <ModelCard
              name="Near Miss"
              probability="18%"
              icon={<Activity />}
            />

            <ModelCard
              name="Unsafe Act"
              probability="31%"
              icon={<AlertTriangle />}
            />

            <ModelCard
              name="Unsafe Condition"
              probability="22%"
              icon={<ShieldCheck />}
            />

          </div>

        </section>


        <section className="reports-section">

          <div className="section-heading">

            <span>
              RECENT ACTIVITY
            </span>

            <h2>
              Safety Reports
            </h2>

          </div>


          <div className="reports-table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>
                    Report
                  </th>

                  <th>
                    Observation
                  </th>

                  <th>
                    Risk
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {reports.map(
                  (report) => (

                    <tr key={report.id}>

                      <td>
                        {report.id}
                      </td>

                      <td>
                        {report.observation}
                      </td>

                      <td>
                        <strong>
                          {report.risk}%
                        </strong>
                      </td>

                      <td>

                        <span
                          className={`status-badge ${
                            report.status
                              .toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )
                          }`}
                        >
                          {report.status}
                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>

  );
}


function StatCard({
  icon,
  title,
  value
}) {

  return (

    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>

  );

}


function ModelCard({
  name,
  probability,
  icon
}) {

  return (

    <div className="model-card">

      <div className="model-card-top">

        <div className="model-icon">
          {icon}
        </div>

        <span>
          {name}
        </span>

      </div>

      <strong>
        {probability}
      </strong>

      <small>
        Demo value
      </small>

    </div>

  );

}


export default Officer;