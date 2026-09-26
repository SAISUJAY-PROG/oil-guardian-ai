def soft_vote(
    near_miss_probability: float,
    unsafe_act_probability: float,
    unsafe_condition_probability: float,
    weights: tuple[float, float, float] = (1 / 3, 1 / 3, 1 / 3)
) -> dict:

    probabilities = [
        near_miss_probability,
        unsafe_act_probability,
        unsafe_condition_probability
    ]

    if len(weights) != 3:
        raise ValueError("Exactly three weights are required.")

    if any(weight < 0 for weight in weights):
        raise ValueError("Weights cannot be negative.")

    weight_sum = sum(weights)

    if weight_sum <= 0:
        raise ValueError("Weight sum must be greater than zero.")

    normalized_weights = [
        weight / weight_sum for weight in weights
    ]

    ensemble_probability = sum(
        probability * weight
        for probability, weight in zip(
            probabilities,
            normalized_weights
        )
    )

    ensemble_probability = max(
        0.0,
        min(1.0, ensemble_probability)
    )

    if ensemble_probability >= 0.70:
        risk_tier = "High"
    elif ensemble_probability >= 0.40:
        risk_tier = "Moderate"
    else:
        risk_tier = "Low"

    return {
        "sif_probability": round(ensemble_probability, 4),
        "sif_percentage": round(ensemble_probability * 100, 1),
        "is_sif": ensemble_probability >= 0.50,
        "risk_tier": risk_tier,
        "weights": {
            "near_miss": round(normalized_weights[0], 4),
            "unsafe_act": round(normalized_weights[1], 4),
            "unsafe_condition": round(normalized_weights[2], 4)
        }
    }