function ModelBreakdown({
  models
}) {

  if (!models) {
    return null;
  }


  return (

    <div className="model-breakdown">

      <div>

        <span>
          Near Miss
        </span>

        <strong>
          {models.near_miss?.confidence ?? 0}%
        </strong>

      </div>


      <div>

        <span>
          Unsafe Act
        </span>

        <strong>
          {models.unsafe_act?.confidence ?? 0}%
        </strong>

      </div>


      <div>

        <span>
          Unsafe Condition
        </span>

        <strong>
          {models.unsafe_condition?.confidence ?? 0}%
        </strong>

      </div>

    </div>

  );

}


export default ModelBreakdown;