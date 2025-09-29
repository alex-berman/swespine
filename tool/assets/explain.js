import {
  generateScalarFeatureDescription,
  generateNonRelativeNominalFeatureDescription,
  generateBinaryFeatureDescription,
  generateGlobalExplanation,
  generateEffectSizePhrase
} from './nlg.js';
import { getProductSum } from "./models.js";
import { getField } from "./form_fields.js";
import { isMonotonic } from "./utils.js";

const MAX_SLOPE = {
  lr: 0.25,
  ordered_probit: -1 / Math.sqrt(2 * Math.PI),
  ridge: 1,
}

export function getLocalExplanations(model, inverseLinkFunction, regressorValues, profileValues) {
  const meanRegressorValues = model.means;
  if(!(model.estimator in MAX_SLOPE)) {
    throw new Error('No max slope defined for ' + model.estimator);
  }
  const maxSlope = MAX_SLOPE[model.estimator];
  const derivativeSign = (maxSlope > 0) ? 1 : -1;

  function getProductSumContributions() {
    var result = {};
    const coefs = model.coefficients;
    for(const key in coefs) {
      var contribution = 0;
      if((key in regressorValues) && (key in meanRegressorValues)) {
        var coef = coefs[key];
        if(Array.isArray(coef)) {
          for(let i = 0; i < coef.length; i++) {
            contribution += coef[i] * (regressorValues[key][i] - meanRegressorValues[key][i]);
          }
        }
        else {
          contribution = coef * (regressorValues[key] - meanRegressorValues[key]);
        }
      }
      if(contribution != 0) {
        result[key] = contribution;
      }
    }
    return result;
  }

  function getNominalValue(regressor, valuesForAllRegressors, field) {
    const valuesForRegressor = valuesForAllRegressors[regressor];
    var result = 0;
    for(let i = 0; i < valuesForRegressor.length; i++) {
      result += valuesForRegressor[i] * field.values[i].value;
    }
    return result;
  }

  const coefs = model.coefficients;
  const meanProductSum = getProductSum(meanRegressorValues, model);
  //console.log('meanProductSum=' + meanProductSum);
  const meanPrediction = inverseLinkFunction(meanProductSum);
  //console.log('meanPrediction=' + meanPrediction);
  const productSum = getProductSum(regressorValues, model);
  //console.log('getLocalExplanations: productSum=' + productSum);
  const prediction = inverseLinkFunction(productSum);
  //console.log('getLocalExplanations: prediction=' + prediction);
  const productSumContributions = getProductSumContributions(meanRegressorValues, regressorValues, model);
  //console.log('productSumContributions: '); console.log(productSumContributions);
  const predictionContributions = Object.fromEntries(
    Object.entries(productSumContributions).map(([key, value]) => [
      key, inverseLinkFunction(productSum + value) - prediction]));
  //console.log('predictionContributions: '); console.log(JSON.stringify(predictionContributions));

  function getFeatureDescription(name) {
    const coef = coefs[name];
    let value = profileValues[name];
    var meanValue = null;
    var monotonic = null;
    const field = getField(name);
    if(Array.isArray(coef)) {
      if(coef.length == 1) {
        return generateBinaryFeatureDescription(name, value, field);
      }
      else {
        const nominalValue = getNominalValue(name, regressorValues, field);
        const featureInfo = model.features[name];
        if(isMonotonic(coef) && featureInfo.ordinal) {
          const nominalMeanValue = getNominalValue(name, meanRegressorValues, field);
          const isLow = (nominalValue < nominalMeanValue);
          const isZero = (value == field.values[0].value);
          return generateScalarFeatureDescription(name, isLow, isZero);
        }
        else {
          return generateNonRelativeNominalFeatureDescription(name, value, field);
        }
      }
    }
    else {
      const isLow = (regressorValues[name] < meanRegressorValues[name]);
      const isZero = (value == 0);
      return generateScalarFeatureDescription(name, isLow, isZero);
    }
  }

  const featureDescriptions = Object.fromEntries(
    Object.keys(model.coefficients).map(key => [
      key, getFeatureDescription(key)
    ])
  );

  return {
    meanPrediction: meanPrediction,
    meanProductSum: meanProductSum,
    meanRegressorValues: meanRegressorValues,
    predictionContributions: predictionContributions,
    productSumContributions: productSumContributions,
    productSum: productSum,
    regressorValues: regressorValues,
    prediction: prediction,
    featureDescriptions: featureDescriptions,
  }
}

export function getGlobalExplanations(task, model) {
  if(!(model.estimator in MAX_SLOPE)) {
    throw new Error('No max slope defined for ' + model.estimator);
  }
  const maxSlope = MAX_SLOPE[model.estimator];
  const derivativeSign = (maxSlope > 0) ? 1 : -1;
  const coefs = model.coefficients;

  return Object.entries(coefs).map(([name, coef]) => {
    const field = getField(name);
    const featureInfo = model.features[name];
    let rangeSize = null;
    let minIndex = null;
    let maxIndex = null;

    if(field.range) {
      rangeSize = field.range.max - field.range.min;
    }
    else if(!Array.isArray(coef) && field.values) {
      const values = field.values.map(valueInfo => valueInfo.value);
      rangeSize = Math.max(...values) - Math.min(...values);
    }

    if(Array.isArray(coef)) {
      rangeSize = Math.max(...coef) - Math.min(...coef);

      function getIndexOfMaxCoef() {
        return coef.reduce((maxIndex, currentValue, currentIndex, array) => {
          return currentValue * derivativeSign > array[maxIndex] * derivativeSign ? currentIndex : maxIndex;
        }, 0);
      }

      function getIndexOfMinCoef() {
        return coef.reduce((maxIndex, currentValue, currentIndex, array) => {
          return currentValue * derivativeSign < array[maxIndex] * derivativeSign ? currentIndex : maxIndex;
        }, 0);
      }

      minIndex = getIndexOfMinCoef();
      maxIndex = getIndexOfMaxCoef();
    }

    let [header, cellContentFunction, expressedCoef] = generateGlobalExplanation(
      task,name, field, featureInfo, coef, derivativeSign, rangeSize, minIndex, maxIndex);
    let coefMagnitude = Math.abs(expressedCoef);
    let scaler = model.features[name].scaler;
    if (scaler) {
      if(scaler.type === 'MinMaxScaler') {
        coefMagnitude *= model.features[name].scaler.scale;
      }
      else if(scaler.type === 'StandardScaler') {
        coefMagnitude /= model.features[name].scaler.scale;
      }
      else {
        throw new Error('Unsupported scaler type ' + scaler.type);
      }
    }

    let effectSize = coefMagnitude * Math.abs(maxSlope);
    let effectSizePhrase = generateEffectSizePhrase(task, effectSize);
    let cellContent = cellContentFunction(effectSizePhrase);
    return { header: header, effectSize: effectSize, coefMagnitude: coefMagnitude, cellContent: cellContent };
  });
}
