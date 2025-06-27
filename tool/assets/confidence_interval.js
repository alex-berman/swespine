function calculatePredictionVariance(X_new, covMatrix, residualVariance) {
  let variance = 0;

  // Compute X_new^T * covMatrix * X_new
  for (let i = 0; i < X_new.length; i++) {
    for (let j = 0; j < X_new.length; j++) {
      variance += X_new[i] * covMatrix[i][j] * X_new[j];
    }
  }

  // Scale by residual variance
  return residualVariance * variance;
}

function flattenRegressorValues(regressorValues) {
  var result = [];
  for(const v of Object.values(regressorValues)) {
    if(Array.isArray(v)) {
      for(const w of v) {
        result.push(w);
      }
    }
    else {
      result.push(v);
    }
  }
  return result;
}

export function estimateConfidenceInterval(model, regressorValues, yPred) {
  const x = flattenRegressorValues(regressorValues);
  const X_with_intercept = [1, ...x];
  const predictionVariance = calculatePredictionVariance(X_with_intercept, model.cov_matrix, model.residual_variance);
  const predictionSE = Math.sqrt(predictionVariance);
  const marginOfError = model.t_value * predictionSE;
  const lowerBound = yPred - marginOfError;
  const upperBound = yPred + marginOfError;
  return [lowerBound, upperBound];
}
