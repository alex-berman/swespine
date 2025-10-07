import { tabs, getField } from "./assets/form_fields.js";
import { createFormFieldWidget, updateFormFieldFromValue } from "../form.js";
import { MODELS } from "./assets/model_data/model_data.js";
import { presets } from "./assets/presets.js";
import { getLocalExplanations, getGlobalExplanations } from "./assets/explain.js";
import {
  getLogisticRegressionProbabilities,
  getProductSum,
  logOddsToProb,
  getOrderedProbitProbabilities,
  linearPredictionGivenThresholdAndProbability,
  getLinearRegressionPrediction,
  identityFunction
} from "./assets/models.js";
import {
  getRegistrationFieldByName,
  formSections
} from "../registration/form_structure.js";
import { calculateEQ5DIndex } from "./assets/eq5d.js";
import { openPopup, closePopup } from "../popup.js";

const TASKS = ['satisfaction', 'ga', 'stay'];

const SATISFACTION_POLES = [
  "Tveksam/missnöjd",
  "Nöjd",
];
const SATISFACTION_COLORS = [
  [233, 134, 129],
  [118, 213, 158],
];
const POSITIVE_COLOR = SATISFACTION_COLORS[0];

const GA_POLES = [
  "Ej lyckat utfall",
  "Lyckat utfall",
];
const GA_LEVELS = [
  "Helt försvunnen",
  "Mycket förbättrad",
  "Något förbättrad",
  "Oförändrad",
  "Försämrad",
];
const GA_COLORS = [
  [77, 200, 129],
  [197, 229, 209],
  [255, 234, 118],
  [255, 210, 107],
  [243, 126, 119],
];

export const NUM_INITIALLY_SHOWN_CONTRIBUTIONS = 3;

const numberFormat = new Intl.NumberFormat('se-SV', {
  useGrouping: true
});

const QUESTIONNAIRE_CONTENT_FOR_STAY = {
  question: "Opdatum, Utskrivningsdatum",
  definition: "Utskrivningsdatum minus Opdatum = antal dygn"
};

const QUESTIONNAIRE_CONTENT = {
  disc_herniation: {
    satisfaction: {
      question: "Hur är Din inställning till resultatet av Din genomgångna ryggoperation?",
      definition: "<li>Nöjd patient: <i>Nöjd</i><li>Missnöjd patient: <i>tveksam</i> eller <i>missnöjd</i>."
    },
    ga: {
      question: "Hur är Din bensmärta/ischias idag jämfört med före operationen?",
      definition: "Lyckat utfall: <i>Helt försvunnen</i> eller <i>mycket förbättrad</i>"
    },
    stay: QUESTIONNAIRE_CONTENT_FOR_STAY,
  },

  spinal_stenosis: {
    satisfaction: {
      question: "Hur är Din inställning till resultatet av Din genomgångna ryggoperation?",
      definition: "<li>Nöjd patient: <i>Nöjd</i><li>Missnöjd patient: <i>tveksam</i> eller <i>missnöjd</i>."
    },
    ga: {
      question: "Hur är Din bensmärta/ischias idag jämfört med före operationen?",
      definition: "Lyckat utfall: <i>Helt försvunnen</i> eller <i>mycket förbättrad</i>"
    },
    stay: QUESTIONNAIRE_CONTENT_FOR_STAY,
  },

  rhizopathy: {
    satisfaction: {
      question: "Hur är Din inställning till resultatet av Din genomgångna hals-/bröstryggsoperation?",
      definition: "<li>Nöjd patient: <i>Nöjd</i><li>Missnöjd patient: <i>tveksam</i> eller <i>missnöjd</i>."
    },
    ga: {
      question: "Hur är Din armsmärta idag jämfört med före operationen? ",
      definition: "Lyckat utfall: <i>Helt försvunnen</i> eller <i>mycket förbättrad</i>"
    },
    stay: QUESTIONNAIRE_CONTENT_FOR_STAY,
  },

  srbp: {
    satisfaction: {
      question: "Hur är Din inställning till resultatet av Din genomgångna ryggoperation?",
      definition: "<li>Nöjd patient: <i>Nöjd</i><li>Missnöjd patient: <i>tveksam</i> eller <i>missnöjd</i>."
    },
    ga: {
      question: "Hur är Din ryggsmärta idag jämfört med före operationen?",
      definition: "Lyckat utfall: <i>Helt försvunnen</i> eller <i>mycket förbättrad</i>"
    },
    stay: QUESTIONNAIRE_CONTENT_FOR_STAY,
  },
};

var profileValues;
var settingProfileValues = false;
var condition;
var editable;
var detailed;

export function initializePredictionTool() {
  window.onerror = function(message, source, lineno, colno, error) {
    openPopup(`<p>Ett tekniskt fel har uppstått.</p><div class="errorDetail">${message}</div>`,
    [[ 'OK', closePopup ]], {});
  };

  initializeTabs();

  const urlParams = new URLSearchParams(window.location.search);
  const preset = urlParams.get('preset');
  if(preset) {
    profileValues = presets[preset];
  }
  else if(urlParams.get('random')) {
    profileValues = randomProfileValues();
  }
  else if(localStorage.getItem('Diagnosis')) {
    profileValues = getProfileValuesFromLocalStorage();
  }
  else {
    function goToStartPage() {
      location.href = '../';
    }
    openPopup('<p>Det finns ingen pågående session. Återgår till startsidan.</p>',
      [ ['OK', goToStartPage] ], {});
    return;
  }
  console.log('profileValues='); console.log(profileValues);

  condition = urlParams.get('condition');
  if(condition === null) {
    condition = getFromLocalStorage('Condition');
  }

  editable = urlParams.get('editable');
  detailed = urlParams.get('detailed');
  initializeForm();

  updateFormFromProfileValues();

  function handleInputChange(event) {
    if(!settingProfileValues) {
      profileValues = getProfileValuesFromForm();
      console.log('profileValues='); console.log(profileValues);
      updateFormFieldVisibilityFromDiagnosis();
      updatePredictionsAndExplanations();
    }
  }

  const formElements = document.querySelectorAll("input, select");
  formElements.forEach(function(element) {
      element.addEventListener("input", handleInputChange);
  });

  if(condition == 'C') {
    document.getElementById('container').style.width = '500px';
    document.getElementById('right-section').style.display = 'none';
  }
  else {
    updatePredictionsAndExplanations();
  }

  document.getElementById('loader').style.display = 'none';
}

function updatePredictionsAndExplanations() {
  const diagnosis = profileValues.Diagnosis;
  const modelsForDiagnosis = MODELS[diagnosis];
  const globalExplanations = Object.fromEntries(
    TASKS.map(task => [task, getGlobalExplanations(task, modelsForDiagnosis[task])]));

  const satisfactionModel = MODELS[diagnosis].satisfaction;
  updateLogisticRegressionPrediction('satisfaction', satisfactionModel);
  plotLogisticRegressionProbabilitiesPieChart('satisfaction', satisfactionModel, SATISFACTION_POLES, SATISFACTION_COLORS);
  generateExplanationSection(
    diagnosis,
    'satisfaction',
    'Diagrammet visar hur sannolikheten att bli nöjd med operation beräknas utifrån sannolikheten att bli nöjd för en genomsnittlig patient samt faktorer avseende vald patientprofil.',
    'Modellen förutsäger nöjdhet på basis av en stor mängd data om tidigare operationsresultat från alla kliniker i Sverige under en tioårsperiod, och uppdateras varje år.',
    'Hur de olika faktorerna i allmänhet påverkar beräknad nöjdhet framgår nedan.');
  if(condition === 'B') {
    updateLogisticRegressionExplanation(diagnosis,
      'satisfaction', satisfactionModel, SATISFACTION_POLES, SATISFACTION_COLORS, globalExplanations.satisfaction);
  }

  const gaModel = MODELS[diagnosis].ga;
  updateOrderedProbitPrediction('ga', gaModel);
  plotOrderedProbabilitiesPieChart('ga', gaModel, GA_LEVELS, GA_COLORS);
  generateExplanationSection(
    diagnosis,
    'ga',
    'Diagrammet visar hur sannolikheten för lyckat utfall av operation (smärtan helt försvunnen eller mycket förbättrad efter 1 år) beräknas utifrån sannolikheten för lyckat utfall för en genomsnittlig patient samt faktorer avseende vald patientprofil.',
    'Modellen förutsäger utfall på basis av en stor mängd data om tidigare operationsresultat från alla kliniker i Sverige under en tioårsperiod, och uppdateras varje år.',
    'Hur de olika faktorerna i allmänhet påverkar beräknat utfall framgår nedan.');
  if(condition === 'B') {
    updateOrderedProbitExplanation(diagnosis, 'ga', gaModel, GA_POLES, GA_COLORS, globalExplanations.ga);
  }

  const stayModel = MODELS[diagnosis].stay;
  updateLinearRegressionPredictionOfDays('stay', stayModel);
  updatePredictionElaborationForDays('stay', stayModel);
  generateExplanationSection(
    diagnosis,
    'stay',
    'Diagrammet visar hur den förväntade vårdtiden (antal dagar) beräknas utifrån den genomsnittliga vårdtiden samt faktorer avseende vald patientprofil.',
    'Modellen förutsäger förväntad vårdtid (antal dagar) på basis av en stor mängd data om tidigare operationsresultat från alla kliniker i Sverige under en tioårsperiod, och uppdateras varje år.',
    'Hur de olika faktorerna i allmänhet påverkar beräknad vårdtid framgår nedan.');
  if(condition === 'B') {
    updateStayExplanation(diagnosis, stayModel, globalExplanations.stay);
  }

  for(const [task, taskSpecificGlobalExplanations] of Object.entries(globalExplanations)) {
    updateGlobalExplanations(task, taskSpecificGlobalExplanations);
  }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, precision) {
    return (Math.random() * (max - min) + min).toFixed(precision);
}

function randomProfileValues() {
  function randomValue(field) {
    if(field.type == 'select' || field.type == 'buttons') {
      const values = field.values.map(valueInfo => valueInfo.value);
      return values[Math.floor(Math.random() * values.length)];
    }
    else if(field.type == 'number') {
      const range = field.range.max - field.range.min;
      const numSteps = Math.floor(range / field.range.step);
      const randomStep = Math.floor(Math.random() * (numSteps + 1));
      return field.range.min + (randomStep * field.range.step);
    }
    else {
      throw new Error('Unsupported data type ' + field.type);
    }
  }

  var result = {};
  for(const tab of tabs) {
    for(const group of tab.groups) {
      for(const field of group.fields) {
        result[field.name] = randomValue(field);
      }
    }
  }
  return result;
}

function getFieldNamesForCurrentDiagnosis() {
  const diagnosis = profileValues.Diagnosis;
  const modelsForDiagnosis = MODELS[diagnosis];
  const names = Object.values(modelsForDiagnosis).flatMap(model => Object.keys(model.coefficients));
  const uniqueNames = ["Diagnosis", ...new Set(names)];
  return uniqueNames;
}

function updateFormFromProfileValues() {
  updateFormFieldVisibilityFromDiagnosis();
  updateFormFieldValuesFromProfileValues();
}

function updateFormFieldVisibilityFromDiagnosis() {
  const activeFieldNames = getFieldNamesForCurrentDiagnosis();
  for(const tab of tabs) {
    for(const group of tab.groups) {
      const fieldsToProcess = group.fields.filter(field => !(condition === 'C' && field.alwaysEditable));
      const fieldsToDisplay = fieldsToProcess.filter(field => activeFieldNames.includes(field.name));
      const headerDiv = document.getElementById(`form_header_${group.name}`);
      headerDiv.style.display = (fieldsToDisplay.length > 0) ? '' : 'none';
      for(const field of fieldsToProcess) {
        const groupDiv = document.getElementById(`form-group-${field.name}`);
        groupDiv.style.display = (activeFieldNames.includes(field.name) ? '' : 'none');
      }
    }
  }
}

function updateFormFieldValuesFromProfileValues() {
  const activeFieldNames = getFieldNamesForCurrentDiagnosis();
  for(const tab of tabs) {
    for(const group of tab.groups) {
      for(const field of group.fields) {
        if(field.name in profileValues) {
          if(!(condition === 'C' && field.alwaysEditable)) {
            if(editable || field.alwaysEditable) {
              updateFormFieldFromValue(field, profileValues[field.name]);
            }
            else {
              updateStaticValue(field, profileValues[field.name]);
            }
          }
        }
        else if(field.name in activeFieldNames) {
          console.warn('Field with name ' + name + ' missing in profile');
        }
      }
    }
  }
}

function initializeTabs() {
  const tabsDiv = document.getElementById('tabs');
  tabsDiv.innerHTML = '';
  var firstTab = true;
  for(const tab of tabs) {
    var button = document.createElement('button');
    button.dataset.tab = tab.name;
    button.classList.add('tab-button');
    button.classList.add('tab-button-patient-data');
    if(firstTab) {
      button.classList.add('active');
      firstTab = false;
    }
    button.innerHTML = tab.label;
    tabsDiv.appendChild(button);
  }

  document.querySelectorAll('.tab-button-patient-data').forEach(button => {
      button.addEventListener('click', () => {
          document.querySelectorAll('.tab-button-patient-data').forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          document.querySelectorAll('.tab-pane-patient-data').forEach(pane => pane.classList.remove('active'));
          document.getElementById(button.dataset.tab).classList.add('active');
      });
  });

  document.querySelectorAll('.tab-button-prediction').forEach(button => {
      button.addEventListener('click', () => {
          document.querySelectorAll('.tab-button-prediction').forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          document.querySelectorAll('.tab-pane-prediction').forEach(pane => pane.classList.remove('active'));
          document.getElementById(button.dataset.tab).classList.add('active');
      });
  });
}

function initializeForm() {
  const tabContent = document.getElementById('tab-content');
  var firstTab = true;
  for(const tab of tabs) {
    const tabDiv = document.createElement('div');
    tabDiv.id = tab.name;
    tabDiv.classList.add('tab-pane');
    tabDiv.classList.add('tab-pane-patient-data');
    if(firstTab) {
      tabDiv.classList.add('active');
      firstTab = false;
    }

    for(const group of tab.groups) {
      const h = document.createElement('div');
      h.id = `form_header_${group.name}`;
      h.className = 'formHeader';
      h.innerHTML = group.header;
      tabDiv.appendChild(h);

      const widgetsDiv = document.createElement('div');
      widgetsDiv.className = 'formWidgets';
      for(const field of group.fields) {
        if(!(condition === 'C' && field.alwaysEditable)) {
          const groupDiv = document.createElement('div');
          groupDiv.id = `form-group-${field.name}`;
          groupDiv.className = 'form-group';

          const formGroupLabel = document.createElement('label');
          formGroupLabel.setAttribute('for', field.name);
          formGroupLabel.className = 'formGroupLabel';
          formGroupLabel.innerHTML = field.label;
          groupDiv.appendChild(formGroupLabel);

          const widgetElements = (editable || field.alwaysEditable) ? createFormFieldWidget(field) : createStaticValueWidget(field);
          for(const widgetElement of widgetElements) {
            groupDiv.appendChild(widgetElement);
          }
          widgetsDiv.appendChild(groupDiv);
        }
      }
      tabDiv.appendChild(widgetsDiv);
    }

    tabContent.appendChild(tabDiv);
  }
}

function createStaticValueWidget(field) {
  const valueDiv = document.createElement('div');
  valueDiv.id = 'staticValue_' + field.name;
  return [valueDiv];
}

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function getProfileValuesFromForm() {
  var result = {};
  for(const tab of tabs) {
    for(const group of tab.groups) {
      for(const field of group.fields) {
        if(editable || field.alwaysEditable) {
          result[field.name] = getEditableFormValue(field);
        }
        else {
          result[field.name] = profileValues[field.name];
        }
      }
    }
  }
  return result;
}

function getEditableFormValue(field) {
  if(field.type == 'select') {
    const element = document.getElementById(field.name);
    var value = element.options[element.selectedIndex].value;
    if(field.value_type != 'string') {
      value = parseInt(value);
    }
    return value;
  }
  else if(field.type == 'number') {
    const element = document.getElementById(field.name);
    return parseFloat(element.value);
  }
  else if(field.type == 'buttons') {
    for(let valueInfo of field.values) {
      const element = document.getElementById(field.name + valueInfo.value);
      if(element.checked) {
        return parseInt(valueInfo.value);
      }
    }
  }
}

export function getRegressorValues(model, profileValues) {
  const coefs = model.coefficients;
  var result = {}
  for(const regressor in coefs) {
    var coef = coefs[regressor];
    if(!(regressor in profileValues)) {
      throw new Error('Missing profile value for ' + regressor);
    }
    if(Array.isArray(coef)) {
      result[regressor] = getNominalRegressorValues(regressor, coef.length, profileValues);
    }
    else {
      result[regressor] = getScalarRegressorValue(model, regressor, profileValues);
    }
  }
  return result;
}

function getNominalRegressorValues(varName, n, profileValues) {
  const profileValue = profileValues[varName];
  if(n == 1) {
    if(profileValue) {
      return [1];
    } else {
      return [0];
    }
  }
  else if(n > 1) {
    const field = getField(varName);
    const values = field.values.map(valueInfo => valueInfo.value);
    return range(n).map(function(i) { return values[i] == profileValue ? 1 : 0; })
  }
}

function getScalarRegressorValue(model, name, profileValues) {
  var result = profileValues[name];
  if(model.features[name].scaler) {
    const scaler = model.features[name].scaler;
    if(scaler) {
      if(scaler.type === 'MinMaxScaler') {
        result = result * scaler.scale + scaler.min;
      }
      else if(scaler.type === 'StandardScaler') {
        result = (result - scaler.mean) / scaler.scale;
      }
      else {
        throw new Error('Unsupported scaler type ' + scaler.type);
      }
    }
  }
  return result;
}

function updateLogisticRegressionPrediction(id, model) {
  const regressorValues = getRegressorValues(model, profileValues);
  console.log('updateLogisticRegressionPrediction: regressorValues='); console.log(regressorValues);
  const productSum = getProductSum(regressorValues, model);
  //console.log('updateLogisticRegressionPrediction: productSum=' + productSum);
  const proba = getLogisticRegressionProbabilities(model, productSum);
  const positiveProbabilityPerc = Math.round(proba[1] * 100);
  updatePrediction(id, positiveProbabilityPerc + '%');
}

function updateLinearRegressionPredictionOfDays(id, model) {
  const formattedDays = getFormattedPredictedDays(model);
  updatePrediction(id, formattedDays);
}

function getFormattedPredictedDays(model) {
  const regressorValues = getRegressorValues(model, profileValues);
  console.log('getFormattedPredictedDays: regressorValues='); console.log(regressorValues);
  const productSum = getProductSum(regressorValues, model);
  //console.log('updateLinearRegressionPredictionOfDays: productSum=' + productSum);
  const prediction = getLinearRegressionPrediction(model, productSum);
  const days = Math.round(prediction);
  return `Ca ${days} ${(days === 1) ? 'dag' : 'dagar'}`;
}

function updatePredictionElaborationForDays(id, model) {
  const formattedDays = getFormattedPredictedDays(model);
  var content = '<div class="predictionElaborationTop">Förväntad vårdtid efter en hypotetisk operation, baserat på vald patientprofil:</div>';
  content += `<div class="predictionElaborationMain">${formattedDays}</div>`;
  document.getElementById(`predictionElaboration_${id}`).innerHTML = content;
}

function asCount(x) {
  return Math.max(Math.round(x, 0));
}

function formatProbability(probability, _regressorValues) {
  return `${Math.round(probability * 100)}%`;
}

function updateLogisticRegressionExplanation(diagnosis, id, model, axisTicks, colors, globalExplanations) {
  const regressorValues = getRegressorValues(model, profileValues);
  console.log('getLocalExplanations for ' + id);
  const explanations = getLocalExplanations(model, logOddsToProb, regressorValues, profileValues);
  const maxGlobalEffectSize = Math.max(...Object.values(globalExplanations).map(item => item.effectSize));
  const gradient = generateGradient(colors, [0, 1]);
  plotLocalFeatureContributions(
    id,
    model,
    explanations,
    maxGlobalEffectSize,
    'Genomsnittlig patient',
    'Positiva faktorer',
    'Negativa faktorer',
    'Sammanvägd sannolikhet',
    { formatPrediction: formatProbability, predictionBackground: gradient, axisTicks: axisTicks });
}

function updateStayExplanation(diagnosis, model, globalExplanations) {
  const regressorValues = getRegressorValues(model, profileValues);
  console.log('getLocalExplanations for stay');
  const explanations = getLocalExplanations(model, identityFunction, regressorValues, profileValues);
  const maxGlobalEffectSize = Math.max(...Object.values(globalExplanations).map(item => item.effectSize));
  const maxDays = Math.round(explanations.prediction + maxGlobalEffectSize/2) + 2.5;

  plotLocalFeatureContributions(
    'stay',
    model,
    explanations,
    maxGlobalEffectSize,
    'Genomsnittlig vårdtid',
    'Faktorer som förlänger vårdtiden',
    'Faktorer som förkortar vårdtiden',
    'Sammanvägd förväntad vårdtid',
    { integerScale: true, maxPrediction: maxDays, negativeFactorsFirst: true }
  );
}

function generateExplanationSection(
    diagnosis, task, textBelowFeatureContributions, textAboveTable,
    additionalTextAboveTableInConditionB) {
  const swespine_question = QUESTIONNAIRE_CONTENT[diagnosis][task].question;
  const swespine_definition = QUESTIONNAIRE_CONTENT[diagnosis][task].definition;
  const num_observations = numberFormat.format(MODELS[diagnosis][task].num_observations) + ' operationer';

  var content = '';
  if(condition == 'B') {
    content += `
            <div class="explanationHeader">Förklaring</div>
            <div id="featureContributions_${task}"></div>
            <div class="textBelowFeatureContributions">${textBelowFeatureContributions}</div>`;
  }
  content += `
            <div id="global-explanation-${task}" class="globalExplanationContainer">
              <div class="ac">
                <div class="ac-header">
                  <button type="button" class="ac-trigger">Mer information</button>
                </div>
                <div class="ac-panel">
                  <div style="padding:20px">
                    <b>Fråga i swespine</b>:
                    <ul>${swespine_question}</ul>
                    <b>Definition</b>:
                    <ul>${swespine_definition}</ul>
                    <b>Antal observationer</b>:
                    <ul>${num_observations}</ul>
                    <p>Antal observationer syftar till totala antalet operationer som ligger till grund för prediktionsmodellen och inte för vald patienttyp.</p>
                    <p>${textAboveTable}`;
  if(condition == 'B') {
    content += ' ' + additionalTextAboveTableInConditionB;
  }
  content += '</p>';
  if(condition == 'A') {
    content += '<p><b>Variabler i modell:</b></p>';
  }
  content += `
                    <div id="globalExplanations_${task}"></div>
                  </div>
                 </div>
              </div>
            </div>
        </div>
    `;
  document.getElementById(`explanationSection_${task}`).innerHTML = content;

  new Accordion(`#global-explanation-${task}`, {
    duration: 100,
    onOpen: function(currentElement) {
      currentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

function updateOrderedProbitPrediction(id, model) {
  const regressorValues = getRegressorValues(model, profileValues);
  console.log('updateOrderedProbitPrediction: regressor values: '); console.log(regressorValues);
  //console.log('calculating product sum for ordered probit');
  const productSum = getProductSum(regressorValues, model);
  //console.log('updateOrderedProbitPrediction: productSum=' + productSum);
  const probabilities = getOrderedProbitProbabilities(model, productSum);
  const positiveProbability = orderedProbitProbabilityOfPositiveOutcome(model, productSum);
  updatePrediction(id, Math.round(positiveProbability * 100) + '%');
}

export function orderedProbitProbabilityOfPositiveOutcome(model, productSum) {
  const probs = getOrderedProbitProbabilities(model, productSum);
  //console.log('orderedProbitProbabilityOfPositiveOutcome: productSum='); console.log(productSum);
  //console.log('orderedProbitProbabilityOfPositiveOutcome: probs='); console.log(probs);
  return probs[0] + probs[1]; // Helt försvunnen + Mycket förbättrad
}

function updateOrderedProbitExplanation(diagnosis, id, model, axisTicks, colors, globalExplanations) {
  const minProb = 0.001;
  const maxProb = 0.999;
  const minProductSum = linearPredictionGivenThresholdAndProbability(
    model.thresholds[0], minProb);
  const maxProductSum = linearPredictionGivenThresholdAndProbability(
    model.thresholds[model.thresholds.length - 1], maxProb);

  function toRelativePosition(threshold) {
    return 1 - (threshold - minProductSum) / (maxProductSum - minProductSum);
  }

  function probabilityOfPositiveOutcome(productSum) {
    return orderedProbitProbabilityOfPositiveOutcome(model, productSum);
  }

  const regressorValues = getRegressorValues(model, profileValues);
  console.log('getLocalExplanations for ' + id);
  const explanations = getLocalExplanations(model, probabilityOfPositiveOutcome, regressorValues, profileValues);
  const maxGlobalEffectSize = Math.max(...Object.values(globalExplanations).map(item => item.effectSize));
  const gradient = generateGradient(
    [...colors].reverse(), [0, ...model.thresholds.map(toRelativePosition), 1]);
  plotLocalFeatureContributions(
    id,
    model,
    explanations,
    maxGlobalEffectSize,
    'Genomsnittlig patient',
    'Positiva faktorer',
    'Negativa faktorer',
    'Sammanvägd sannolikhet',
    { formatPrediction: formatProbability, predictionBackground: gradient, axisTicks: axisTicks }
  );
}

function updatePrediction(id, content) {
  document.getElementById(`tab_prediction_${id}`).innerHTML = content;
}

function sortByValue(obj) {
  const entries = Object.entries(obj);
  entries.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
  return Object.fromEntries(entries);
};

function generateGradient(colors, colorSteps) {
  var result = 'linear-gradient(to right';
  for(let i = 0; i < colors.length; i++) {
    const color = colors[i];
    result += `, rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.7)`;
    result += ` ${Math.round(100 * colorSteps[i])}%`;
  }
  result += ')';
  return result;
}

function plotLocalFeatureContributions(
  id, model, explanations, maxGlobalEffectSize, topLineLabel,
  positiveFactorsHeader, negativeFactorsHeader, bottomLineLabel,
  {
    formatPrediction=null,
    integerScale=false,
    predictionBackground=null,
    maxPrediction=null,
    axisTicks=null,
    negativeFactorsFirst=false
  })
{
  const container = document.getElementById(`featureContributions_${id}`);
  container.innerHTML = '';
  const table = document.createElement('table');
  table.className = 'localExplanationsTable';

  const predictionBarContainerWidth = 400;
  const predictionBarContainerHalfWidth = Math.round((predictionBarContainerWidth - 1) / 2);
  const minShownBarWidth = 1;
  const maxLinearValue = Math.max(
    Math.abs(explanations.meanProductSum),
    Math.abs(explanations.productSum),
    ...Object.values(explanations.productSumContributions).map(Math.abs));

  function scalePrediction(x) {
    return (maxPrediction === null) ? x : (x / maxPrediction);
  }

  function contributionBarWidth(contribution) {
    return scalePrediction(Math.abs(contribution) * predictionBarContainerHalfWidth / maxGlobalEffectSize);
  }

  function linearBarWidth(value) {
    return Math.abs(value) * predictionBarContainerWidth / 2 / maxLinearValue * 0.95;
  }

  function filterContributions(contributions, f) {
    return Object.fromEntries(Object.entries(contributions).filter(f));
  }

  function addAxisTicks() {
    const row = document.createElement('tr');
    const emptyCell = document.createElement('td');
    row.appendChild(emptyCell);

    const ticksCell = document.createElement('td');
    const innerTable = document.createElement('table');
    innerTable.style.width = '100%';
    const innerRow = document.createElement('tr');

    const leftCell = document.createElement('td')
    leftCell.align = 'left';
    leftCell.className = 'tick';
    leftCell.innerHTML = axisTicks[0];
    innerRow.appendChild(leftCell);

    const rightCell = document.createElement('td')
    rightCell.align = 'right';
    rightCell.className = 'tick';
    rightCell.innerHTML = axisTicks[1];
    innerRow.appendChild(rightCell);

    innerTable.appendChild(innerRow);
    ticksCell.appendChild(innerTable);
    row.appendChild(ticksCell);
    table.appendChild(row);
  }

  function addVerticalSpace() {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colspan = 2;
    cell.className = 'verticalSpace';
    row.appendChild(cell);
    table.appendChild(row);
  }

  function addHeader(header) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.className = 'featureContributionsHeader';
    cell.innerHTML = header + ':';
    row.appendChild(cell);

    const contentCell = document.createElement('td');
    contentCell.className = 'contentCell';
    const line = document.createElement('div');
    line.className = 'verticalLine';
    contentCell.appendChild(line);
    row.appendChild(contentCell);

    table.appendChild(row);
  }

  function addRow(label, value, labelClass, type, isBottomLine, regressorValues) {
    const row = document.createElement('tr');
    const labelCell = document.createElement('td');
    labelCell.classList.add(labelClass);
    if(isBottomLine) {
      labelCell.classList.add('localExplanationBottomLine');
    }
    labelCell.innerHTML = label;
    row.appendChild(labelCell);
    const contentCell = document.createElement('td');
    contentCell.classList.add('contentCell');
    if(isBottomLine && !integerScale) {
      contentCell.classList.add('localExplanationBottomLine');
    }

    if(type == 'prediction') {
      const predictionRangeDiv = document.createElement('div');
      const valueDiv = document.createElement('div');
      if(integerScale) {
        valueDiv.className = 'predictionMarkerForIntegerRange';
        valueDiv.style.position = 'relative';
        valueDiv.style.left = `${Math.round(scalePrediction(Math.max(value, 0)) * predictionBarContainerWidth) - 7}px`;
        predictionRangeDiv.className = 'predictionIntegerRange';
        const tickContainer = document.createElement('div');
        tickContainer.className = 'predictionIntegerTickContainer';
        for (let i = 0; i <= maxPrediction; i++) {
          const tick = document.createElement('div');
          tick.className = 'predictionIntegerTick';
          tick.style.left = `${Math.round(scalePrediction(i) * predictionBarContainerWidth)}px`;
          tickContainer.appendChild(tick);

          const label = document.createElement('div');
          label.className = 'predictionIntegerLabel';
          label.style.left = `${Math.round(scalePrediction(i) * predictionBarContainerWidth)}px`;
          label.style.marginTop = isBottomLine ? '15px' : '-18px';
          label.innerText = i.toString();
          tick.appendChild(label);
        }
        predictionRangeDiv.appendChild(tickContainer);
      }
      else {
        valueDiv.className = 'predictionMarkerForContinuousRange';
        const relativeWidth = 0.1;
        valueDiv.style.width = `${Math.round(relativeWidth * 100)}%`;
        valueDiv.style.position = 'relative';
        valueDiv.style.left = `${Math.round(scalePrediction(value) * (1 - relativeWidth) * 100)}%`;
        valueDiv.innerHTML = formatPrediction(value, regressorValues);
        predictionRangeDiv.className = 'predictionContinuousRange';
        if(predictionBackground) {
          predictionRangeDiv.style.background = predictionBackground;
        }
      }
      predictionRangeDiv.appendChild(valueDiv);
      contentCell.appendChild(predictionRangeDiv);
    }
    else if(type == 'contribution' || type == 'linear') {
      const line = document.createElement('div');
      line.className = 'verticalLine';
      contentCell.appendChild(line);

      const bar = document.createElement('div');
      bar.className = 'bar';
      const barWidth = (type == 'linear' || detailed) ? linearBarWidth(value) : contributionBarWidth(value);
      bar.style.width = `${barWidth}px`;
      if(value < 0) {
        bar.style.left = `${predictionBarContainerHalfWidth - barWidth}px`;
      } else {
        bar.style.left = `${predictionBarContainerHalfWidth + 1}px`;
      }
      contentCell.appendChild(bar);
    }

    row.appendChild(contentCell);
    if(detailed) {
      const valueCell = document.createElement('td');
      const valueFormatter = new Intl.NumberFormat('se-SV', {
        maximumFractionDigits: 2
      });
      valueCell.innerHTML = valueFormatter.format(value);
      row.appendChild(valueCell);
    }
    table.appendChild(row);
    return row;
  }

  function addToggleMoreLess(rows) {
    var showAll = false;
    const showMore = '<img src="assets/icons/chevron_down.svg" style="vertical-align: bottom;"> Visa fler';
    const showFewer = '<img src="assets/icons/chevron_up.svg" style="vertical-align: bottom;"> Visa färre';

    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.className = 'toggleMoreLessCell';
    cell.colspan = 2;
    const button = document.createElement('div');
    button.innerHTML = showMore;

    function toggle() {
      showAll = !showAll;
      update();
    }
    
    function update() {
      if(showAll) {
        for(const row of rows) {
          row.style.display = 'table-row';
        }
        button.innerHTML = showFewer;
      }
      else {
        for(var i = NUM_INITIALLY_SHOWN_CONTRIBUTIONS; i < rows.length; i++) {
          rows[i].style.display = 'none';
        }
        button.innerHTML = showMore;
      }
    }

    button.addEventListener('click', toggle);
    update();
    cell.appendChild(button);
    row.appendChild(cell);
    table.appendChild(row);
  }

  function addPotentialSection(contributions, header) {
    const numContributions = Object.values(contributions).length;
    if(numContributions > 0) {
      var rows = [];
      const sortedContributions = sortByValue(contributions);
      addVerticalSpace();
      addHeader(header);
      for(const name in sortedContributions) {
        const row = addRow(explanations.featureDescriptions[name], contributions[name], 'featureLabel', 'contribution');
        rows.push(row);
      }
      if(numContributions > NUM_INITIALLY_SHOWN_CONTRIBUTIONS) {
        addToggleMoreLess(rows);
      }
    }
  }

  if(axisTicks) {
    addAxisTicks();
  }
  addRow(topLineLabel, explanations.meanPrediction, 'nonFeatureLabel', 'prediction');
  if(detailed) {
    addRow('Genomsnittlig linjär prediktion', explanations.meanProductSum, 'nonFeatureLabel', 'linear');
  }
  const contributions = detailed ? explanations.productSumContributions : explanations.predictionContributions;
  const positiveContributions = filterContributions(
    contributions, ([_, x]) => (x > 0 && contributionBarWidth(x) >= minShownBarWidth));
  const negativeContributions = filterContributions(
    contributions, ([_, x]) => (x < 0 && contributionBarWidth(x) >= minShownBarWidth));
  if(negativeFactorsFirst) {
    addPotentialSection(negativeContributions, negativeFactorsHeader);
    addPotentialSection(positiveContributions, positiveFactorsHeader);
  }
  else {
    addPotentialSection(positiveContributions, positiveFactorsHeader);
    addPotentialSection(negativeContributions, negativeFactorsHeader);
  }

  if(detailed) {
    addRow('Linjär prediktion', explanations.productSum, 'nonFeatureLabel', 'linear');
  }
  addRow(bottomLineLabel, explanations.prediction, 'nonFeatureLabel', 'prediction', true, explanations.regressorValues);
  container.appendChild(table);
}

function updateGlobalExplanations(id, items) {
  const container = document.getElementById(`globalExplanations_${id}`);
  let content = '';
  if(condition == 'A') {
    content += '<ul>';
    items.sort((a, b) => a.header.localeCompare(b.header, 'sv'));
    for (const item of items) {
      content += `<li>${item.header}</li>`;
    }
    content += '</ul>';
  }
  else if(condition == 'B') {
    content += '<table>';
    items.sort((a, b) => b.coefMagnitude - a.coefMagnitude);
    for (const item of items) {
      content += '<tr>';
      content += '<td class="globalExplanationsTableHeader">' + item.header + '</td>';
      content += '<td class="globalExplanationsTableContent">' + item.cellContent + '</td>';
      content += '</tr>';
    }
    content += '</table>';
  }
  container.innerHTML = content;
}

function plotLogisticRegressionProbabilitiesPieChart(id, model, levels, colors) {
  const regressorValues = getRegressorValues(model, profileValues);
  const productSum = getProductSum(regressorValues, model);
  const probs = getLogisticRegressionProbabilities(model, productSum);
  const percentages = probs.map((prob, _) => Math.round(prob * 100));
  plotPieChart(id, [...percentages].reverse(), [...levels].reverse(), [...colors].reverse());
}

function plotOrderedProbabilitiesPieChart(id, model, levels, colors) {
  const regressorValues = getRegressorValues(model, profileValues);
  const productSum = getProductSum(regressorValues, model);
  //console.log('product sum for ordered probabilities: ' + productSum);
  const probs = getOrderedProbitProbabilities(model, productSum);
  //console.log('probabilities:'); console.log(probs);
  const percentages = probs.map((prob, _) => Math.round(prob * 100));
  plotPieChart(id, percentages, levels, colors);
}

function plotPieChart(id, values, levels, colors) {
  var data = [{
    values: values,
    labels: levels,
    text: values.map(x => `${x}%`),
    textinfo: 'text',
    hovertemplate: '%{label}: %{text}<extra></extra>',
    type: 'pie',
    marker: {
      colors: colors.map(cssColorString),
    },
    sort: false,
    rotation: 0,
    direction: 'clockwise',
  }];

  var layout = {
    margin: {
        t: 0,
        b: 0,
        l: 20,
        r: 50
    },
    width: 450,
    height: 350,
    legend: {
      traceorder: 'normal',
      x: 1,
      y: 0.5,
      orientation: 'v',
      itemclick: false,
      itemdoubleclick: false,
    },
    font: {
      family: 'Arial, sans-serif',
      size: 16
    }
  };

  const divID = `probabilitiesPieChart_${id}`;
  Plotly.newPlot(
    divID,
    {
      data: data,
      layout: layout,
      config: {
          displayModeBar: false,
          static: true
      }
    });
}

function cssColorString(rgbValues) {
  return `rgb(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]})`;
}

export function getProfileValues() {
  return profileValues;
}

export function setProfileValues(v) {
  settingProfileValues = true;
  profileValues = v;
  console.log('profileValues='); console.log(profileValues);
  updateFormFromProfileValues();
  settingProfileValues = false;
  updatePredictionsAndExplanations();
}

function getProfileValuesFromLocalStorage() {
  function getProfileValue(field) {
    const registrationField = getRegistrationFieldByName(field.name);
    if(typeof registrationField === 'undefined') {
      if('defaultValue' in field) {
        return field.defaultValue;
      }
      else if(field.name == 'AgeAtSurgery') {
        const pnr = getFromLocalStorage('Pnr');
        return calculateAge(pnr);
      }
      else if(field.name == 'ODI' || field.name == 'NDI') {
        return calculateDisabilityIndexFromLocalStorage(field.name);
      }
      else if(field.name == 'BMI') {
        return calculateBMIFromLocalStorage(field.name);
      }
      else if(field.name == 'HasOtherIllness') {
        return getOtherIllnessFromLocalStorageAsBinaryValue();
      }
      else if(field.name == 'EQ5DIndex') {
        return calculateEQ5DIndexFromLocalStorage();
      }
      else {
        throw new Error('Failed to get registration field for ' + field.name);
      }
    }
    else {
      const registrationValue = getFromLocalStorage(field.name);
      if('values' in field) {
        for(const valueInfo of registrationField.values) {
          if(valueInfo.value == registrationValue) {
            return ('modelValue' in valueInfo) ? valueInfo.modelValue : valueInfo.value;
          }
        }
        throw new Error('Failed to get registration value for ' + field.name);
      }
      else {
        if(field.type == 'number') {
          return parseFloat(registrationValue);
        }
        return registrationValue;
      }
    }
  }

  function calculateAge(personNumber) {
    const birthYear = parseInt(personNumber.substring(0, 4), 10);
    const birthMonth = parseInt(personNumber.substring(4, 6), 10);
    const birthDay = parseInt(personNumber.substring(6, 8), 10);
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  var result = {};
  result['Diagnosis'] = getProfileValue(getField('Diagnosis'));
  const modelsForDiagnosis = MODELS[result['Diagnosis']];
  const names = Object.values(modelsForDiagnosis).flatMap(model => Object.keys(model.coefficients));
  const uniqueNames = new Set(names);
  for(const name of uniqueNames) {
    const field = getField(name);
    result[field.name] = getProfileValue(field);
  }
  return result;
}

function getFromLocalStorage(name) {
  const storedValue = localStorage.getItem(name);
  if(storedValue === null) {
    throw new Error('Failed to get ' + name + ' from local storage');
  }
  return storedValue;
}

function calculateDisabilityIndexFromLocalStorage(name) {
  var totalScore = 0;
  for(let i = 1; i <= 10; i++) {
    const item = name + '_' + i;
    const storedValue = getFromLocalStorage(item);
    const value = parseInt(storedValue);
    if(value >= 0 && value <= 5) {
      totalScore += value;
    }
    else {
      throw new Error('Unexpected value ' + value + ' for ' + item);
    }
  }
  return totalScore * 100 / (5 * 10);
}

function calculateBMIFromLocalStorage() {
  const height = getFromLocalStorage('Height');
  const heightM = height / 100;
  const weight = getFromLocalStorage('Weight');
  return weight / (heightM * heightM);
}

function calculateEQ5DIndexFromLocalStorage() {
  function getValue(name) {
    const stringValue = getFromLocalStorage(name);
    const value = parseInt(stringValue);
    if(!(1 <= value <= 3)) {
      alert('Unexpected value ' + stringValue + ' for ' + name);
    }
    return value;
  }
  
  const state = {
    mobility: getValue('EQ5D_mobility'),
    selfCare: getValue('EQ5D_selfCare'),
    usualActivities: getValue('EQ5D_usualActivities'),
    painDiscomfort: getValue('EQ5D_painDiscomfort'),
    anxietyDepression: getValue('EQ5D_anxietyDepression')
  };
  return calculateEQ5DIndex(state);
}

function getOtherIllnessFromLocalStorageAsBinaryValue() {
  const fields = getRegistrationFieldsByPrefix('HasOtherIllness');
  for(const field of fields) {
    const value = getFromLocalStorage(field.name);
    if(parseInt(value) == 1) {
      return 1;
    }
  }
  return 0;
}

function getRegistrationFieldsByPrefix(prefix) {
  var result = [];
  for(const section of formSections) {
    if(section.fields) {
      for(const field of section.fields) {
        if(field.name && field.name.startsWith(prefix)) {
          result.push(field);
        }
      }
    }
  }
  return result;
}

function updateStaticValue(field, value) {
  const label = getLabel(field, value);
  const staticValueDiv = document.getElementById('staticValue_' + field.name);
  staticValueDiv.textContent = label;
}

function getLabel(field, value) {
  function getLabelAmongValues() {
    for(const valueInfo of field.values) {
      if(valueInfo.value == value) {
        return valueInfo.label;
      }
    }
    throw new Error('Failed to get label for ' + field.name + ' with value ' + value);
  }

  if(field.type == 'select' || field.type == 'buttons' || field.type == 'radio') {
    return getLabelAmongValues();
  }
  else if(field.type == 'number') {
    if(field.range && field.range.step) {
      const numberFormat = new Intl.NumberFormat('se-SV', {
        maximumFractionDigits: -Math.log10(field.range.step)
      });
      return numberFormat.format(value);
    }
    else {
      return value;
    }
  }
  else if(field.type == 'text') {
    return value;
  }
  else {
    throw new Error('Failed to get label of unsupported type ' + field.type);
  }
}

export function savePatientData() {
  var content = '';
  for(const section of formSections) {
    if(section.fields) {
      for(const field of section.fields) {
        const value = localStorage.getItem(field.name);
        if(value !== null) {
          content += field.name + '\t' + field.label + '\t' + value;
          const label = getLabel(field, value);
          if(label != value) {
            content += '\t' + label;
          }
          content += '\n';
        }
      }
    }
  }

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `EBBA-${localStorage.getItem('Pnr')}.tsv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function promptEndSession() {
  function endSession() {
    localStorage.clear();
    location.href = '../';
  }

  openPopup('<p>Inmatade patientuppgifter kommer att raderas från webbläsaren. Om inmatade uppgifter ska ingå i studien, se till att spara patientuppgifter till fil innan sessionen avslutas.</p>',
    [
      ['Nej, avsluta inte sessionen', closePopup],
      ['Ja, avsluta sessionen', endSession],
    ], {}
  );
}