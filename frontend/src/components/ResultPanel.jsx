function ResultPanel({
  result
}) {

  if (!result) {
    return null;
  }


  return (

    <div className="result-panel">

      <h2>
        AI Analysis
      </h2>


      <div>

        <span>
          SIF Probability
        </span>

        <strong>
          {result.ensemble?.sif_percentage}%
        </strong>

      </div>


      <div>

        <span>
          Risk Level
        </span>

        <strong>
          {result.ensemble?.risk_tier}
        </strong>

      </div>

    </div>

  );

}


export default ResultPanel;