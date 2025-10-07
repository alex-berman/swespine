// Logistic regression

export function getLogisticRegressionProbabilities(model, predictedLogOdds) {
  const positiveProbability = logOddsToProb(predictedLogOdds);
  const negativeProbability = 1 - positiveProbability;
  return [negativeProbability, positiveProbability];
}

export function logOddsToProb(logOdds) {
  return 1 / (1 + Math.exp(-logOdds));
}

export function probToLogOdds(probability) {
  return Math.log(probability / (1 - probability));
}


// Linear regression

export function identityFunction(productSum) {
  return productSum;
}

export function getLinearRegressionPrediction(model, productSum) {
  return identityFunction(productSum);
}


// Poisson regression

export function getPoissonRegressionPrediction(model, productSum) {
  return Math.exp(productSum);
}


// Ordered probit

export function getOrderedProbitProbabilities(model, productSum) {
  const thresholds = [-Infinity, ...model.thresholds, Infinity];
  return probabilitiesGivenLatentVariableAndThresholds(productSum, thresholds);
}

function transformThresholdParams(thresholdParams) {
  var currentValue = thresholdParams[0];
  var result = [-Infinity, currentValue];
  for(var i = 1; i < thresholdParams.length; i++) {
    currentValue += Math.exp(thresholdParams[i]);
    result.push(currentValue);
  }
  result.push(Infinity);
  return result;
}

function probabilitiesGivenLatentVariableAndThresholds(xb, thresholds) {
  var result = [];
  for(var i = 0; i < (thresholds.length - 1); i++) {
    const low = thresholds[i] - xb;
    const upp = thresholds[i + 1] - xb;
    const prob = intervalProbability(low, upp);
    result.push(prob);
  }
  return result;
}

function intervalProbability(low, upp) {
  return Math.max(jStat.normal.cdf(upp, 0, 1) - jStat.normal.cdf(low, 0, 1), 0);
}

function linearPrediction(coefs, featureValues) {
  var result = 0;
  for(var i = 0; i < coefs.length; i++) {
    result += coefs[i] * featureValues[i];
  }
  return result;
}

export function linearPredictionGivenThresholdAndProbability(threshold, probability) {
  return threshold - jStat.normal.inv(probability, 0, 1);
}


// Common

export function getProductSum(regressorValues, model, log) {
  var result = 0;
  if(model.intercept) {
    result += model.intercept[0];
  }
  const coefs = model.coefficients;
  for(const key in coefs) {
    const coef = coefs[key];
    const product = getProduct(key, regressorValues, coef, log);
    if(log) {
      console.log(`product for ${key}: ${product}`);
    }
    if(product) {
      result += product;
    }
  }
  return result;
}

function getProduct(key, regressorValues, coef, log) {
  if(key == 'Intercept') {
    return coef[0];
  }
  else if(key != 'Thresholds') {
    if(regressorValues[key]) {
      if(Array.isArray(coef)) {
        var result = 0;
        for(let i = 0; i < coef.length; i++) {
          const product = coef[i] * regressorValues[key][i];
          result += product;
          if(log) {
            console.log(`product for ${key}, index ${i}: ${product}`);
          }
        }
        return result;
      }
      else {
        return coef * regressorValues[key];
      }
    }
  }
  return 0;
}
