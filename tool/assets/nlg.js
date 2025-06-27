import { getFieldLabel } from '../../form.js';

const numberFormat = new Intl.NumberFormat('se-SV', {
  useGrouping: true,
  maximumSignificantDigits: 1
});

function toLeadingLowercase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function toLeadingUppercase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateBinaryFeatureDescription(name, value, field) {
  if(name == 'Female') {
    return getFieldLabel(field, value);
  }
  else {
    if(name == 'IsUnemployed') { return value ? 'Arbetslös' : 'Inte arbetslös'; }
    if(name == 'HasSickPension') { return value ? 'Har sjukpension/sjukersättning' : 'Ingen sjukpension/sjukersättning'; }
    if(name == 'HasAgePension') { return value ? 'Har ålderspension' : 'Ingen ålderspension'; }
    if(name == 'IsSmoker') { return value ? 'Rökare' : 'Inte rökare'; }
    if(name == 'IsPreviouslyOperated') { return value ? 'Tidigare ryggopererad' : 'Inte tidigare ryggopererad'; }
    if(name == 'HasOtherIllness') { return value ? 'Har andra sjukdomar' : 'Inga andra sjukdomar'; }
    if(name == 'CollegeUniversity') { return value ? 'Högskoleutbildad' : 'Ingen högskoleutbildning'; }
    throw new Error('Failed to generate feature description for binary feature ' + name);
  }
}

export function generateScalarFeatureDescription(name, isLow, isZero) {
  if(name == 'AgeAtSurgery') {
    return 'Relativt ' + (isLow ? 'låg' : 'hög') + ' ålder';
  }
  if(name == 'Weight') {
    return 'Relativt ' + (isLow ? 'låg' : 'hög') + ' vikt';
  }
  if(name == 'AbilityWalking') {
    return 'Kan gå relativt ' + (isLow ? 'kort' : 'långt') + ' i normal takt';
  }
  if(name == 'EQ5DIndex') {
    return 'Relativt ' + (isLow ? 'låg' : 'hög') + ' EQ5D';
  }
  if(name == 'ODI' || name == 'NDI') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'låg' : 'hög'))) + ' funktionsnedsättning';
  }
  if(name == 'NRSBackPain') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'lite' : 'mycket'))) + ' ryggsmärta';
  }
  if(name == 'NRSNeckPain') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'lite' : 'mycket'))) + ' nacksmärta';
  }
  if(name == 'NRSArmPain') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'lite' : 'mycket'))) + ' armsmärta';
  }
  if(name == 'NRSLegPain') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'lite' : 'mycket'))) + ' bensmärta';
  }
  if(name == 'DurationBackPain') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'kort' : 'lång'))) + ' smärtduration i rygg';
  }
  if(name == 'DurationLegPain') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'kort' : 'lång'))) + ' smärtduration i ben';
  }
  if(name == 'DurationCervicalSpinePain') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'kort' : 'lång'))) + ' smärtduration i halsrygg';
  }
  if(name == 'DurationArmPain') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'kort' : 'lång'))) + ' smärtduration i arm';
  }
  if(name == 'DurationThoracicSpinePain') {
    return (isZero ? 'Ingen' : ('Relativt ' + (isLow ? 'kort' : 'lång'))) + ' smärtduration i bröstrygg';
  }
  if(name == 'OpLevel') {
    return 'Relativt ' + (isLow ? 'få' : 'många') + ' opererade nivåer';
  }
  if(name == 'BMI') {
    return 'Relativt ' + (isLow ? 'lågt' : 'högt') + ' BMI';
  }
  if(name == 'Height') {
    return 'Relativt ' + (isLow ? 'kort' : 'lång') + ' till växten';
  }
  throw new Error('Failed to generate relative feature description for ' + name);
}

function generateRelativeClausePredicateForClinicType(value) {
  switch(value) {
    case 1: return 'vårdas på universitetssjukhus';
    case 2: return 'vårdas på offentlig klinik';
    case 3: return 'vårdas på privat klinik';
  }
  throw new Error('Failed to generate relative clausefor clinic type ' + value);
}

export function generateNonRelativeNominalFeatureDescription(name, value, field) {
  const label = getFieldLabel(field, value);
  if(name == 'AbilityWalking') {
    return 'Kan gå ' + toLeadingLowercase(label) + ' i normal takt';
  }
  if(name == 'DurationLegPain') {
    return (label === 'Ingen smärta') ? 'Ingen bensmärta' : 'Har haft bensmärta ' + toLeadingLowercase(label);
  }
  if(name == 'DurationBackPain') {
    return (label === 'Ingen smärta') ? 'Ingen ryggsmärta' : 'Har haft ryggsmärta ' + toLeadingLowercase(label);
  }
  if(name == 'DurationArmPain') {
    return (label === 'Ingen smärta') ? 'Ingen armsmärta' : 'Har haft armsmärta ' + toLeadingLowercase(label);
  }
  if(name == 'DurationCervicalSpinePain') {
    return (label === 'Ingen smärta') ? 'Ingen nacksmärta' : 'Har haft smärta i hals-/bröstrygg ' + toLeadingLowercase(label);
  }
  if(name == 'OpLevel') {
    return 'Opereras ' + label + ' ' + (label == 1 ? 'nivå' : 'nivåer');
  }
  if(name == 'ClinicType') {
    return toLeadingUppercase(generateRelativeClausePredicateForClinicType(value));
  }
  throw new Error('Failed to generate feature non-relative nominal feature description for ' + name);
}

export function generateGlobalExplanation(task, name, field, featureInfo, coef, derivativeSign, rangeSize, minIndex, maxIndex) {
  let expressedCoef = (derivativeSign > 0 ? coef : -coef);
  let outcomeSign = (task === 'stay' ? -1 : 1);
  let linguisticallyNegative = ((coef < 0 ? 1 : -1) * derivativeSign * outcomeSign) > 0;

  function generateNominal() {
    function generateOptionNounPhrase(optionIndex) {
      const label = field.values[optionIndex].label;
      if(name == 'AbilityWalking') {
        return 'Patienter som kan gå ' + toLeadingLowercase(label) + ' i normal takt';
      }
      if(name.startsWith('Duration')) {
        if(label === "Ingen smärta") {
          return 'Patienter utan smärta';
        }
        else {
          return 'Patienter som upplevt smärta i ' + toLeadingLowercase(label);
        }
      }
      if(name == 'OpLevel') {
        return 'Patienter som opereras ' + label + ' ' + (label == 1 ? 'nivå' : 'nivåer');
      }
      if(name == 'ClinicType') {
        const value = field.values[optionIndex].value;
        return 'Patienter som ' + generateRelativeClausePredicateForClinicType(value);
      }
      throw new Error('Failed to generate noun phrase for ' + name);
    }

    if(task === 'satisfaction') {
      return (P) => `${generateOptionNounPhrase(maxIndex)} beräknas ha högst sannolikhet att bli nöjda. ${
      generateOptionNounPhrase(minIndex)} beräknas ha lägst sannolikhet att bli nöjda. Skillnaden kan vara upp till ${P}.`;
    }
    if(task === 'ga') {
      return (P) => `${generateOptionNounPhrase(maxIndex)} beräknas ha högst sannolikhet för lyckat utfall. ${
      generateOptionNounPhrase(minIndex)} beräknas ha lägst sannolikhet för lyckat utfall. Skillnaden kan vara upp till ${P}.`;
    }
    if(task === 'stay') {
      return (P) => `${generateOptionNounPhrase(minIndex)} beräknas ha kortast vårdtid. ${
      generateOptionNounPhrase(maxIndex)} beräknas ha längst vårdtid. Skillnaden kan vara upp till ${P}.`;
    }
  }

  let h, g;
  if(featureInfo.type == 'categorical') {
    switch (name) {
      case 'AbilityWalking':
        h = 'Promenadsträcka';
        g = generateNominal();
        expressedCoef = rangeSize;
        break;
      case 'DurationLegPain':
        h = 'Smärtduration i ben';
        g = generateNominal();
        expressedCoef = rangeSize;
        break;
      case 'DurationBackPain':
        h = 'Smärtduration i rygg';
        g = generateNominal();
        expressedCoef = rangeSize;
        break;
      case 'DurationCervicalSpinePain':
        h = 'Smärtduration i hals-/bröstrygg';
        g = generateNominal();
        expressedCoef = rangeSize;
        break;
      case 'DurationArmPain':
        h = 'Smärtduration i arm';
        g = generateNominal();
        expressedCoef = rangeSize;
        break;
      case 'OpLevel':
        h = 'Opererade nivåer';
        g = generateNominal();
        expressedCoef = rangeSize;
        break;
      case 'ClinicType':
        h = 'Kliniktyp';
        g = generateNominal();
        expressedCoef = rangeSize;
        break;
      default:
        throw new Error('Failed to generate global explanation for categorical feature ' + name);
    }
  }
  else {
    function generateDefiniteConsequent() {
      if(task === 'satisfaction') {
        return 'högre beräknas sannolikheten att bli nöjd';
      }
      if(task === 'ga') {
        return 'högre beräknas sannolikheten för lyckat utfall';
      }
      if(task === 'stay') {
        return 'kortare beräknas vårdtiden bli';
      }
      throw new Error('Failed to generate definite consequent');
    }
    
    function generatePluralConsequent() {
      if(task === 'satisfaction') {
        return 'högre sannolikhet att bli nöjda';
      }
      if(task === 'ga') {
        return 'högre sannolikhet för lyckat utfall';
      }
      if(task === 'stay') {
        return 'kortare vårdtid';
      }
      throw new Error('Failed to generate plural consequent');
    }

    switch (name) {
      case 'AbilityWalking':
        h = 'Promenadsträcka';
        g = (P) => `Ju ${(linguisticallyNegative ? 'kortare' : 'längre')} patienten kan gå i normal takt, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`;
        expressedCoef *= rangeSize;
        break;
      case 'AgeAtSurgery':
        h = 'Ålder';
        g = (P) => `Ju ${(linguisticallyNegative ? 'lägre' : 'högre')} ålder, desto ${generateDefiniteConsequent()}. Sannolikheten påverkas med upp till ${P} per tiotal år.`;
        expressedCoef *= 10;
        break;
      case 'Weight':
        h = 'Vikt';
        g = (P) => `Ju ${(linguisticallyNegative ? 'lägre' : 'högre')} vikt, desto ${generateDefiniteConsequent()}. Sannolikheten påverkas med upp till ${P} per tiotal kilo.`;
        expressedCoef *= 10;
        break;
      case 'Height':
        h = 'Längd';
        g = (P) => `Ju ${(linguisticallyNegative ? 'kortare' : 'längre')} patienten är till växten, desto ${generateDefiniteConsequent()}. Sannolikheten påverkas med upp till ${P} per decimeter.`;
        expressedCoef *= 10;
        break;
      case 'Female':
        h = 'Kön';
        g = (P) => `${(linguisticallyNegative ? 'Män' : 'Kvinnor')} beräknas ha ${generatePluralConsequent()}. Skillnaden mellan kvinnor och män kan vara upp till ${P}.`;
        break;
      case 'IsPreviouslyOperated':
        h = 'Tidigare ryggopererad';
        g = (P) => `Patienter som ${(linguisticallyNegative ? 'inte' : '')} tidigare ryggopererats beräknas ha ${generatePluralConsequent()}. Skillnaden kan vara upp till ${P}.`;
        break;
      case 'CollegeUniversity':
        h = 'Utbildningsnivå';
        g = (P) => `Patienter ${(linguisticallyNegative ? 'utan' : 'med')} högskoleutbildning beräknas ha ${generatePluralConsequent()}. Skillnaden kan vara upp till ${P}.`;
        break;
      case 'IsSmoker':
        h = 'Rökare';
        g = (P) => `${(linguisticallyNegative ? 'Icke-rökare' : 'Rökare')} beräknas ha ${generatePluralConsequent()}. Skillnaden kan vara upp till ${P}.`;
        break;
      case 'IsUnemployed':
        h = 'Arbetslös';
        g = (P) => `${(linguisticallyNegative ? 'Icke-arbetslösa' : 'Arbetslösa')} beräknas ha ${generatePluralConsequent()}. Skillnaden kan vara upp till ${P}.`
        break;
      case 'HasAgePension':
        h = 'Ålderspension';
        g = (P) => `Patienter ${(linguisticallyNegative ? 'utan' : 'med')} ålderspension beräknas ha ${generatePluralConsequent()}. Skillnaden kan vara upp till ${P}.`;
        break;
      case 'HasSickPension':
        h = 'Sjukpension/sjukersättning';
        g = (P) => `Patienter ${(linguisticallyNegative ? 'utan' : 'med')} sjukpension/sjukersättning beräknas ha ${generatePluralConsequent()}. Skillnaden kan vara upp till ${P}.`;
        break;
      case 'HasOtherIllness':
        h = 'Samsjuklighet';
        g = (P) => `Patienter ${(linguisticallyNegative ? 'utan' : 'med')} andra sjukdomar beräknas ha ${generatePluralConsequent()}. Skillnaden kan vara upp till ${P}.`;
        break;
      case 'EQ5DIndex':
        h = 'EQ5D';
        g = (P) => `Ju ${(linguisticallyNegative ? 'lägre' : 'högre')} EQ5D, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`;
        expressedCoef *= rangeSize;
        break;
      case 'NRSBackPain':
        h = 'Smärta i rygg';
        g = (P) => `Ju ${(linguisticallyNegative ? 'mindre' : 'mer')} ryggsmärta, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'NRSLegPain':
        h = 'Smärta i ben';
        g = (P) => `Ju ${(linguisticallyNegative ? 'mindre' : 'mer')} bensmärta, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'NRSNeckPain':
        h = 'Smärta i nacke';
        g = (P) => `Ju ${(linguisticallyNegative ? 'mindre' : 'mer')} nacksmärta, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'NRSArmPain':
        h = 'Smärta i arm';
        g = (P) => `Ju ${(linguisticallyNegative ? 'mindre' : 'mer')} armsmärta, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'ODI':
      case 'NDI':
        h = 'Funktionsnedsättning';
        g = (P) => `Ju ${(linguisticallyNegative ? 'lägre' : 'högre')} funktionsnedsättning, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`;
        expressedCoef *= rangeSize;
        break;
      case 'DurationBackPain':
        h = 'Smärtduration i rygg';
        g = (P) => `Ju ${(linguisticallyNegative ? 'kortare' : 'längre')} smärtduration i rygg, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'DurationLegPain':
        h = 'Smärtduration i ben';
        g = (P) => `Ju ${(linguisticallyNegative ? 'kortare' : 'längre')} smärtduration i ben, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'DurationArmPain':
        h = 'Smärtduration i arm';
        g = (P) => `Ju ${(linguisticallyNegative ? 'kortare' : 'längre')} smärtduration i arm, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'DurationCervicalSpinePain':
        h = 'Smärtduration i halsrygg';
        g = (P) => `Ju ${(linguisticallyNegative ? 'kortare' : 'längre')} smärtduration i halsrygg, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'DurationThoracicSpinePain':
        h = 'Smärtduration i bröstrygg';
        g = (P) => `Ju ${(linguisticallyNegative ? 'kortare' : 'längre')} smärtduration i bröstrygg, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'OpLevel':
        h = 'Opererade nivåer';
        g = (P) => `Ju ${(linguisticallyNegative ? 'färre' : 'fler')} opererade nivåer, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`
        expressedCoef *= rangeSize;
        break;
      case 'BMI':
        h = 'Kroppsmasseindex (BMI)';
        g = (P) => `Ju ${(linguisticallyNegative ? 'lägre' : 'högre')} kroppsmasseindex, desto ${generateDefiniteConsequent()}. Skillnaden kan vara upp till ${P}.`;
        expressedCoef *= rangeSize;
        break;
      default:
        throw new Error('Failed to generate global explanation for non-categorical feature ' + name);
    }
  }

  return [h, g, expressedCoef];
}

export function generateEffectSizePhrase(task, effectSize) {
  if(task === 'stay') {
    const formattedDays = numberFormat.format(effectSize);
    return formattedDays + ' ' + (formattedDays == '1' ? 'dag' : 'dagar');
  }
  else {
    let effectSizePerc = effectSize * 100;
    let digits = (effectSizePerc < 1) ? 1 : 0;
    let formattedFloat = effectSizePerc.toFixed(digits);
    if(formattedFloat === '1.0') {
      formattedFloat = '1';
    }
    return '<b>' + formattedFloat + '</b> ' + ((
        formattedFloat === '1' || formattedFloat.startsWith('1.')) ? 'procentenhet' : 'procentenheter');
  }
}
