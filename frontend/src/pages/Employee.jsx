import {
  useState
} from "react";

import {
  ArrowLeft,
  ShieldCheck,
  Upload,
  Mic,
  Image,
  FileText,
  Send,
  LoaderCircle
} from "lucide-react";

import {
  Link
} from "react-router-dom";


function Employee() {

  const [report, setReport] = useState("");

  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const analyzeReport = async () => {

    if (!report.trim()) {

      setError(
        "Please enter a safety observation before submitting."
      );

      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

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
          data.detail ||
          "AI analysis failed."
        );

      }


      if (data.error) {

        throw new Error(
          data.error
        );

      }


      setResult(data);

    } catch (err) {

      setError(
        err.message ||
        "Unable to connect to the AI backend."
      );

    } finally {

      setLoading(false);

    }

  };


  const handleFileChange = (event) => {

    const selectedFile =
      event.target.files?.[0];

    if (selectedFile) {

      setFile(selectedFile);

    }

  };


  return (

    <div className="employee-page">

      <nav className="portal-navbar">

        <Link
          to="/"
          className="back-link"
        >
          <ArrowLeft size={18} />
          Home
        </Link>


        <div className="portal-brand">

          <ShieldCheck size={28} />

          <div>

            <strong>
              OIL Guardian AI
            </strong>

            <span>
              Employee Safety Portal
            </span>

          </div>

        </div>

        <div />

      </nav>


      <main className="employee-container">

        <div className="employee-heading">

          <span>
            SAFETY REPORT
          </span>

          <h1>
            Submit a Safety Observation
          </h1>

          <p>
            Describe the unsafe act, unsafe condition,
            near miss or other safety observation.
          </p>

        </div>


        <div className="employee-grid">

          <section className="report-card">

            <div className="card-title">

              <FileText size={22} />

              <div>

                <h2>
                  Observation Details
                </h2>

                <p>
                  Provide as much detail as possible.
                </p>

              </div>

            </div>


            <textarea
              value={report}
              onChange={(e) =>
                setReport(e.target.value)
              }
              placeholder="Example: Worker entered a confined space without performing the required gas test..."
              maxLength={2000}
            />


            <div className="character-count">

              {report.length} / 2000

            </div>


            <div className="upload-grid">

              <label className="upload-box">

                <Image size={24} />

                <span>
                  Upload Image
                </span>

                <small>
                  Evidence / handwritten report
                </small>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />

              </label>


              <label className="upload-box">

                <Mic size={24} />

                <span>
                  Upload Audio
                </span>

                <small>
                  Voice safety observation
                </small>

                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                />

              </label>

            </div>


            {file && (

              <div className="selected-file">

                <Upload size={18} />

                <span>
                  {file.name}
                </span>

              </div>

            )}


            {error && (

              <div className="error-message">

                {error}

              </div>

            )}


            <button
              className="analyze-button"
              onClick={analyzeReport}
              disabled={loading}
            >

              {loading ? (

                <>
                  <LoaderCircle
                    size={20}
                    className="spin"
                  />

                  Analyzing...
                </>

              ) : (

                <>
                  <Send size={20} />

                  Analyze Safety Report
                </>

              )}

            </button>

          </section>


          <section className="employee-info-card">

            <div className="info-icon">
              <BrainIcon />
            </div>

            <h2>
              AI Analysis Pipeline
            </h2>

            <p>
              Your observation is analyzed by three
              specialized safety models.
            </p>


            <div className="pipeline-step">

              <span>01</span>

              <div>
                <strong>
                  Near Miss
                </strong>

                <small>
                  Identifies near-miss risk
                </small>
              </div>

            </div>


            <div className="pipeline-step">

              <span>02</span>

              <div>
                <strong>
                  Unsafe Act
                </strong>

                <small>
                  Identifies unsafe actions
                </small>
              </div>

            </div>


            <div className="pipeline-step">

              <span>03</span>

              <div>
                <strong>
                  Unsafe Condition
                </strong>

                <small>
                  Identifies hazardous conditions
                </small>
              </div>

            </div>


            <div className="pipeline-step">

              <span>04</span>

              <div>
                <strong>
                  Soft Voting
                </strong>

                <small>
                  Combines model probabilities
                </small>
              </div>

            </div>

          </section>

        </div>


        {result && (

          <section className="employee-result">

            <h2>
              AI Analysis Result
            </h2>


            <div className="result-summary">

              <div>

                <span>
                  Final SIF Probability
                </span>

                <strong>
                  {result.ensemble.sif_percentage}%
                </strong>

              </div>


              <div>

                <span>
                  Risk Level
                </span>

                <strong>
                  {result.ensemble.risk_tier}
                </strong>

              </div>

            </div>


            <div className="result-model-grid">

              <ResultModel
                name="Near Miss"
                data={result.models.near_miss}
              />

              <ResultModel
                name="Unsafe Act"
                data={result.models.unsafe_act}
              />

              <ResultModel
                name="Unsafe Condition"
                data={
                  result.models.unsafe_condition
                }
              />

            </div>

          </section>

        )}

      </main>

    </div>

  );
}


function ResultModel({
  name,
  data
}) {

  return (

    <div className="result-model">

      <span>
        {name}
      </span>

      <strong>
        {data.confidence}%
      </strong>

      <small>
        {data.iogp_rule}
      </small>

    </div>

  );

}


function BrainIcon() {

  return (
    <ShieldCheck size={26} />
  );

}


export default Employee;