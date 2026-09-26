function RiskCard({
  title,
  value,
  description
}) {

  return (

    <div className="risk-card">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

      {description && (
        <small>
          {description}
        </small>
      )}

    </div>

  );

}


export default RiskCard;