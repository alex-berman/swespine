export function createFormFieldWidget(field) {
  if(field.type == 'select') {
    const select = document.createElement('select');
    select.id = field.name;
    select.className = 'input';
    for(let value of field.values) {
      const option = document.createElement('option');
      option.text = value.label;
      option.value = value.value;
      select.appendChild(option);
    }
    return [select];
  }
  else if(field.type == 'radio') {
    const div = document.createElement('div');
    div.classList.add('input');
    div.classList.add(field.orientation === 'h' ? 'radio-group-horizontal' : 'radio-group');
    for(let value of field.values) {
      const labelElement = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'radio';
      input.id = field.name + value.value;
      input.name = field.name;
      input.value = value.value;
      labelElement.appendChild(input);

      if(field.orientation == 'h') {
        labelElement.appendChild(document.createElement('br'));
      }
      const labelText = document.createTextNode(value.label);
      labelElement.appendChild(labelText);

      div.appendChild(labelElement);
    }
    return [div];
  }
  else if(field.type == 'buttons') {
    const div = document.createElement('div');
    div.classList.add('input');
    div.classList.add('radio-group');
    for(let value of field.values) {
      const input = document.createElement('input');
      input.type = 'radio';
      input.id = field.name + value.value;
      input.name = field.name;
      input.value = value.value;
      div.appendChild(input);

      const labelElement = document.createElement('label');
      labelElement.setAttribute('for', input.id);
      labelElement.innerHTML = value.label;
      div.appendChild(labelElement);
    }
    return [div];
  }
  else if(field.type == 'number') {
    const valueElement = document.createElement('input');
    valueElement.type = 'text';
    valueElement.setAttribute('inputmode', 'numeric');
    valueElement.id = field.name;
    valueElement.className = 'rangeInput';
    valueElement.setAttribute("autocomplete", "off");

    var rangeElement;
    if(field.show_range) {
      rangeElement = document.createElement('input');
      rangeElement.type = 'range';
      rangeElement.id = field.name + '-range';
      rangeElement.name = field.name;
      rangeElement.min = field.range.min;
      rangeElement.max = field.range.max;
      rangeElement.step = field.range.step;
      rangeElement.className = 'rangeInput';
      if(field.defaultValue) {
        rangeElement.value = field.defaultValue;
      }
      rangeElement.addEventListener('input', () => {
          valueElement.value = rangeElement.value;
      });
    }

    valueElement.addEventListener('input', () => {
        let parsedValue = parseFloat(valueElement.value);
        if (parsedValue < field.range.min) {
            parsedValue = field.range.min;
        } else if (parsedValue > field.range.max) {
            parsedValue = field.range.max;
        }
        if(field.show_range) {
          rangeElement.value = parsedValue;
        }
    });

    var result = [valueElement];
    if(field.show_range) {
      result.push(rangeElement);
    }
    return result;
  }
  else if(field.type == 'text') {
    const element = document.createElement('input');
    element.type = 'text';
    if(field.inputmode) {
      element.setAttribute('inputmode', field.inputmode);
    }
    element.name = field.name;
    element.id = field.name;
    element.className = 'input';
    element.setAttribute("autocomplete", "off");
    if(field.name == 'Pnr') {
      element.addEventListener('input', () => {
          const result = parsePersonNumber(element.value);
          if(result !== false) {
            element.value = result;
          }
      });
    }
    return [element];
  }
  else {
    throw new Error('Unsupported field type ' + field.type);
  }
}

export function getFieldLabel(field, value) {
  for(let valueInfo of field.values) {
    if(valueInfo.value == value) {
      return valueInfo.label;
    }
  }
  throw new Error('Failed to get field label with value ' + value + ' for field with name ' + field.name);
}

export function updateFormFieldFromValue(field, value) {
  if(field.type == 'select') {
    const input = document.getElementById(field.name);
    if(!input) {
      throw new Error('Failed to get input element for ' + field.name);
    }
    var values = field.values.map(valueInfo => valueInfo.value);
    if(field.value_type != 'string') {
      values = values.map(key => parseInt(key));
    }
    input.selectedIndex = values.indexOf(value);
  }
  else if(field.type == 'buttons' || field.type == 'radio') {
    const radio = document.getElementById(field.name + value);
    if(!radio) {
      throw new Error('Failed to get input element for ' + field.name + ' with value ' + value);
    }
    radio.checked = true;
  }
  else if(field.type == 'number') {
    const input = document.getElementById(field.name);
    if(!input) {
      throw new Error('Failed to get range element for ' + field.name);
    }
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }
  else if(field.type == 'text') {
    const input = document.getElementById(field.name);
    if(!input) {
      throw new Error('Failed to get input element for ' + field.name);
    }
    input.value = value;
  }
  else {
    throw new Error('Failed to update form field of unsupported type ' + field.type);
  }
}

export function parsePersonNumber(value) {
  const pattern = /^\d{8}-?\d{4}$/;
  if (!pattern.test(value)) {
    return false;
  }

  const datePart = value.slice(0, 8);
  const year = parseInt(datePart.slice(0, 4), 10);
  const month = parseInt(datePart.slice(4, 6), 10);
  const day = parseInt(datePart.slice(6, 8), 10);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    return false;
  }

  const luhnChecksum = (str) => {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      let num = parseInt(str[i]);
      if (i % 2 === 0) num *= 2;
      if (num > 9) num -= 9;
      sum += num;
    }
    return sum % 10 === 0;
  };

  const controlPart = value.replace('-', '').slice(8);
  if (!luhnChecksum(datePart.slice(2) + controlPart)) {
    return false;
  }

  return `${datePart}-${controlPart}`;
}
