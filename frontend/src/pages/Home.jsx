import {
  ShieldCheck,
  Brain,
  Activity,
  ArrowRight
} from "lucide-react";

import {
  Link
} from "react-router-dom";


function Home() {

  return (
    <div className="home-page">

      <nav className="home-navbar">

        <div className="brand">

          <ShieldCheck size={30} />

          <div>
            <h2>OIL Guardian AI</h2>
            <span>Industrial Safety Intelligence</span>
          </div>

        </div>

        <div className="nav-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/employee">
            Employee
          </Link>

          <Link to="/officer">
            Officer
          </Link>

        </div>

      </nav>


      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            <Brain size={18} />
            AI-Powered Industrial Safety
          </div>

          <h1>
            Predict.
            <span> Prevent.</span>
            <br />
            Protect.
          </h1>

          <p>
            OIL Guardian AI analyzes safety observations using
            multiple specialized AI models and combines their
            predictions using heterogeneous soft voting.
          </p>

          <div className="hero-buttons">

            <Link
              to="/employee"
              className="primary-button"
            >
              Submit Report
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/officer"
              className="secondary-button"
            >
              Officer Dashboard
            </Link>

          </div>

        </div>


        <div className="hero-ai-card">

          <div className="ai-card-header">

            <div>
              <span>AI ENSEMBLE</span>
              <h3>Safety Analysis</h3>
            </div>

            <Activity size={24} />

          </div>


          <div className="sif-display">

            <span>SIF Probability</span>

            <strong>24%</strong>

            <div className="progress-bar">
              <div
                className="progress-value"
                style={{ width: "24%" }}
              />
            </div>

            <small>Demo visualization</small>

          </div>


          <div className="mini-models">

            <div>
              <span>Near Miss</span>
              <strong>18%</strong>
            </div>

            <div>
              <span>Unsafe Act</span>
              <strong>31%</strong>
            </div>

            <div>
              <span>Unsafe Condition</span>
              <strong>22%</strong>
            </div>

          </div>

        </div>

      </section>


      <section className="features-section">

        <div className="section-heading">

          <span>CAPABILITIES</span>

          <h2>
            Multi-model safety intelligence
          </h2>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <ShieldCheck size={30} />

            <h3>
              Near Miss Detection
            </h3>

            <p>
              Detect potential serious incidents from
              reported safety observations.
            </p>

          </div>


          <div className="feature-card">

            <Brain size={30} />

            <h3>
              Unsafe Act Detection
            </h3>

            <p>
              Identify unsafe worker actions and
              operational safety risks.
            </p>

          </div>


          <div className="feature-card">

            <Activity size={30} />

            <h3>
              Unsafe Condition Detection
            </h3>

            <p>
              Analyze hazardous workplace conditions
              using a dedicated AI model.
            </p>

          </div>

        </div>

      </section>


      <section className="about-section">

        <div>

          <span>ABOUT OIL GUARDIAN AI</span>

          <h2>
            One observation.
            <br />
            Multiple AI perspectives.
          </h2>

        </div>

        <p>
          OIL Guardian AI combines predictions from
          Near Miss, Unsafe Act and Unsafe Condition
          models to produce a unified safety risk
          assessment for each submitted report.
        </p>

      </section>

    </div>
  );
}


export default Home;