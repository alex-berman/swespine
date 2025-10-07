import { formSections } from "./form_structure.js";
import { createFormFieldWidget, updateFormFieldFromValue, parsePersonNumber } from "../form.js";
import { openPopup, closePopup } from "../popup.js";
import { MODELS } from "../tool/assets/model_data/model_data.js";

export function initializeForm(containerId) {
  window.onerror = function(message, source, lineno, colno, error) {
    openPopup(`<p>Ett tekniskt fel har uppstått.</p><div class="errorDetail">${message}</div>`,
    [[ 'OK', closePopup ]], {});
  };

  var currentSectionIndex = localStorage.getItem('currentSectionIndex');
  if(currentSectionIndex === null) {
    initializeCurrentSession(containerId, 0);
  }
  else {
    function resumeSession() {
      currentSectionIndex = parseInt(currentSectionIndex);
      if(currentSectionIndex < 0 || currentSectionIndex >= formSections.length) {
        currentSectionIndex = 0;
      }
      closePopup();
      initializeCurrentSession(containerId, currentSectionIndex);
    }

    function promptDiscardSession() {
      function discardSession() {
        closePopup();
        localStorage.clear();
        initializeCurrentSession(containerId, 0);
      }

      closePopup();
      openPopup('<p>Vänligen bekräfta att den pågående session avslutas.</p>',
        [
          ['Nej, återuppta sessionen istället', resumeSession],
          ['Ja, avsluta sessionen', discardSession]
        ], {}
      );
    }

    openPopup(
      '<p>Det finns en pågående session.</p>',
      [
        ['Återuppta sessionen', resumeSession],
        ['Avsluta sessionen', promptDiscardSession]
      ], {}
    );
  }
}

function initializeCurrentSession(containerId, currentSectionIndex) {
  const outerContainer = document.getElementById(containerId);
  const formElement = document.createElement('form');
  const container = document.createElement('div');
  formElement.appendChild(container);
  outerContainer.appendChild(formElement);

  var currentSection = formSections[currentSectionIndex];
  var rows = {};

  function includeFieldsInCurrentSection() {
    for(const field of currentSection.fields) {
      if(includeField(currentSection, field)) {
        return true;
      }
    }
    return false;
  }

  function navigate(step) {
    if(step == 1) {
      if(!validateFormValues()) {
        return;
      }
    }
    currentSectionIndex += step;
    if(currentSectionIndex < formSections.length) {
      currentSection = formSections[currentSectionIndex];
      if(includeFieldsInCurrentSection()) {
        localStorage.setItem('currentSectionIndex', currentSectionIndex);
        container.innerHTML = '';
        loadCurrentSession();
        window.scrollTo(0, 0);
      }
      else if(currentSectionIndex > 0) {
        navigate(step);
      }
    } else {
      proceedToTool();
    }
  }

  function validateFormValues() {
    var errorMessage = '';
    for(const field of currentSection.fields) {
      if(!field.info && includeField(currentSection, field)) {
        if(!(field.condition && !field.condition())) {
          if(field.name == 'Pnr') {
            const value = getFormValue(field);
            if(parsePersonNumber(value) === false) {
              errorMessage += '<p>Felaktigt personnummer</p>';
            }
          }
          else {
            const value = getFormValue(field);
            if(typeof value === 'undefined') {
              errorMessage += '<p>Vänligen svara på: ' + field.label + '</p>';
            }
            else if(field.type === 'number') {
              if(value < field.range.min || value > field.range.max) {
                errorMessage += '<p>Felaktigt värde för ' + field.label + '</p>';
              }
            }
          }
        }
      }
    }
    if(errorMessage.length == 0) {
      return true;
    }
    else {
      openPopup(errorMessage, [ ['OK', closePopup]], { width: '400px' });
      return false;
    }
  }

  function loadCurrentSession() {
    addSectionContent();
    updateFormFieldsFromLocalStorage();
    updateWhetherFieldsEnabled();
  }

  function updateFormFieldsFromLocalStorage() {
    if(currentSection.fields) {
      for(const field of currentSection.fields) {
        if(includeField(currentSection, field)) {
          const value = localStorage.getItem(field.name);
          if(value) {
            updateFormFieldFromValue(field, value);
          }
        }
      }
    }
  }

  function addSectionContent() {
    if(currentSection.fields) {
      const table = document.createElement('table');
      table.className = 'formTable';
      for(const field of currentSection.fields) {
        if(includeField(currentSection, field)) {
          const tr = document.createElement('tr');
          rows[field.name] = tr;
          if(field.info) {
            const td = document.createElement('td');
            td.setAttribute('colspan', 2);
            td.classList.add('formInfo');
            td.classList.add('formCell');
            td.innerHTML = field.info;
            tr.appendChild(td);
          }
          else {
            const labelCell = document.createElement('td');
            labelCell.classList.add('formGroupLabel');
            labelCell.classList.add('formCell');
            if(field.labelIndent) {
              labelCell.style.paddingLeft = '15px';
            }
            labelCell.innerHTML = field.label;
            if(field.labelComplement) {
              labelCell.innerHTML += '<br><br>' + field.labelComplement;
            }
            tr.appendChild(labelCell);

            const widgetCell = document.createElement('td');
            widgetCell.classList.add('formCell');
            const widgetElements = createFormFieldWidget(field);
            for(const widgetElement of widgetElements) {
              widgetCell.appendChild(widgetElement);
            }
            tr.appendChild(widgetCell);
          }
          table.appendChild(tr);
        }
      }
      container.appendChild(table);
    }

    function addNavigationButtons() {
      const buttonsContainer = document.createElement('div');
      buttonsContainer.className = 'navigationButtonsContainer';

      if(currentSection.canGoBack) {
        const prevButton = document.createElement('button');
        prevButton.type = 'button';
        prevButton.textContent = 'Tillbaka';
        prevButton.onclick = () => navigate(-1);
        buttonsContainer.appendChild(prevButton);
      }

      if(currentSection.canGoForward || currentSection.canGoToTool) {
        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.className = 'nextButton';
        nextButton.textContent = (currentSection.canGoForward ? 'Fortsätt' : 'Fortsätt till dialogstödet');
        nextButton.onclick = () => navigate(1);
        currentSection.nextButton = nextButton;
        buttonsContainer.appendChild(nextButton);
      }

      container.appendChild(buttonsContainer);
    }

    const formElements = document.querySelectorAll("input, select");
    formElements.forEach(function(element) {
      element.addEventListener("input", handleInputChange);
    });

    addNavigationButtons();
    outerContainer.style.display = 'block';
  }

  loadCurrentSession();

  function handleInputChange(event) {
    const valuesInCurrentSection = getValuesInCurrentSection();
    for(const [name, value] of Object.entries(valuesInCurrentSection)) {
      localStorage.setItem(name, value);
    }
    updateWhetherFieldsEnabled();
  }

  function getValuesInCurrentSection() {
    var result = {};
    for(const field of currentSection.fields) {
      if(includeField(currentSection, field)) {
        if(!('info' in field)) {
          const value = getFormValue(field);
          if(typeof value !== 'undefined') {
            result[field.name] = value;
          }
        }
      }
    }
    return result;
  }

  function updateWhetherFieldsEnabled() {
    for(const field of currentSection.fields) {
      if(includeField(currentSection, field)) {
        if(field.condition) {
          const enabled = field.condition();
          const row = rows[field.name];
          row.style.opacity = enabled ? '1' : '0.5';
          const elements = row.querySelectorAll("input, textarea, select, button");
          elements.forEach(field => {
              field.disabled = !enabled;
          });
        }
      }
    }
  }
}

function getFormValue(field) {
  if(field.type == 'number' ) {
    const element = document.getElementById(field.name);
    if(element.value.length > 0) {
      return element.value;
    }
  }
  else if(field.type == 'radio') {
    for(let valueInfo of field.values) {
      const element = document.getElementById(field.name + valueInfo.value);
      if(element.checked) {
        return element.value;
      }
    }
  }
  else if(field.type == 'text') {
    const element = document.getElementById(field.name);
    if(element.value.length > 0) {
      return element.value;
    }
  }
}

function includeField(section, field) {
  if(field.diagnoses) {
    const diagnosis = localStorage.getItem('Diagnosis');
    return field.diagnoses.includes(diagnosis);
  }
  else {
    return true;
  }
}

function proceedToTool() {
  location.href = 'tool/'
}

export function promptEndSession() {
  function endSession() {
    localStorage.clear();
    location.href = '.';
  }

  openPopup('<p>Inmatade patientuppgifter kommer att raderas från webbläsaren.</p>',
    [
      ['Nej, avbryt inte sessionen', closePopup],
      ['Ja, avbryt sessionen', endSession],
    ], {}
  );
}

export function showNarcoticsExamples() {
  openPopup(`<p><b>Narkotiska preparat:</b></p>
  <p>
Citodon<br>
Citodon forte<br>
Citodon minor<br>
Dolcontin<br>
Durogesic Depotplåster<br>
Fentanyl Depotplåster<br>
Fentanyl<br>
Ketogan<br>
Kodein<br>
Matrifen Depotplåster<br>
Matrimed Depotplåster<br>
Morfin<br>
Nobligan<br>
Norspan Depotplåster<br>
Nycofen Depotplåster<br>
Oxikodon<br>
Oxycodone<br>
OxyContin<br>
OxyNorm<br>
Panocod<br>
Pentadol<br>
Palexia<br>
Paracetamol/ Kodein<br>
Quatrofen Depotplåster<br>
Temgesic<br>
Tiparol<br>
Tradolan<br>
Tramadol<br>
Treo comp
</p>`, [ ['OK', closePopup ]], {});
}

export function showMorphineExamples() {
  openPopup(`<p><b>Morfinliknande smärtstillande preparat:</b></p>
  <p>
Citodon<br>
Citodon forte<br>
Citodon minor<br>
Dolcontin<br>
Durogesic Depotplåster<br>
Fentanyl Depotplåster<br>
Fentanyl<br>
Ketogan<br>
Kodein<br>
Matrifen Depotplåster<br>
Matrimed Depotplåster<br>
Morfin<br>
Nobligan<br>
Norspan Depotplåster<br>
Nycofen Depotplåster<br>
Oxikodon<br>
Oxycodone<br>
OxyContin<br>
OxyNorm<br>
Panocod<br>
Pentadol<br>
Palexia<br>
Paracetamol/ Kodein<br>
Quatrofen Depotplåster<br>
Temgesic<br>
Tiparol<br>
Tradolan<br>
Tramadol<br>
Treo comp
</p>`, [ ['OK', closePopup ]], {});
}


export function showNervePainMedicationExamples() {
  openPopup(`<p><b>Preparat specifikt mot nervsmärta:</b></p>
  <p>
  Amitryptilin<br>
  Cymbalta<br>
  Duloxetine<br>
  Gabapentin<br>
  Lyrica<br>
  Neurontin<br>
  Pregabalin<br>
  Saroten<br>
</p>`, [ ['OK', closePopup ]], {});
}