export const tabs = [
  {
    'name': 'base_information',
    'label': 'Basinformation',
    'groups': [
      {
        'name': 'subgroup',
        'header': 'Undergrupp',
        'fields': [
          {
            'name': 'Diagnosis',
            'label': 'Diagnosgrupp',
            'type': 'select',
            'values': [
              { value: 'disc_herniation', label: 'Diskbråck' },
              { value: 'spinal_stenosis', label: 'Spinal stenos' },
              { value: 'srbp', label: 'Segmentrelaterad ryggsmärta (SRS) - fusion/protes' },
              { value: 'rhizopathy', label: 'Ritzopathi Nacke' },
            ],
            'value_type': 'string'
          },
          {
            'name': 'OpLevel',
            'label': 'Opererade nivåer',
            'type': 'buttons',
            'values': [
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
              { value: 5, label: '5+' }
            ],
            defaultValue: 1,
            alwaysEditable: true
          },
          {
            'name': 'ClinicType',
            'label': 'Kliniktyp',
            'type': 'select',
            'values': [
              { value: 1, label: 'Universitetssjukhus' },
              { value: 2, label: 'Offentlig' },
              { value: 3, label: 'Privat' }
            ],
            defaultValue: 1,
            alwaysEditable: true
          },
          {
            'name': 'Height',
            'label': 'Längd (cm)',
            'type': 'number',
            'range': { 'min': 0, 'max': 250, 'step': 1 },
            'show_range': true
          },
          {
            'name': 'Weight',
            'label': 'Vikt (kg)',
            'type': 'number',
            'range': { 'min': 0, 'max': 250, 'step': 1 },
            'show_range': true
          },
          {
            'name': 'BMI',
            'label': 'Kroppsmasseindex (BMI)',
            'type': 'number',
            'range': { 'min': 0, 'max': 40, 'step': 1 },
            'show_range': true
          },
        ]
      },
      {
        'name': 'main_sociodemographics',
        'header': 'Sociodemografi',
        'fields': [
          {
            'name': 'AgeAtSurgery',
            'label': 'Ålder',
            'type': 'number',
            'range': { 'min': 10, 'max': 110, 'step': 1 },
            'show_range': true
          },
          {
            'name': 'Female',
            'label': 'Kön',
            'type': 'buttons',
            'values': [
              { value: 0, label: 'Man' },
              { value: 1, label: 'Kvinna' }
            ]
          },
          {
            'name': 'IsUnemployed',
            'label': 'Arbetslös',
            'type': 'buttons',
            'values': [
              { value: 0, label: 'Nej' },
              { value: 1, label: 'Ja' }
            ]
          },
          {
            'name': 'HasSickPension',
            'label': 'Sjukpension/sjukersättning',
            'type': 'buttons',
            'values': [
              { value: 0, label: 'Nej' },
              { value: 1, label: 'Ja, heltid / deltid' }
            ]
          },
          {
            'name': 'HasAgePension',
            'label': 'Ålderspension',
            'type': 'buttons',
            'values': [
              { value: 0, label: 'Nej' },
              { value: 1, label: 'Ja, heltid / deltid' }
            ]
          },
          {
            'name': 'CollegeUniversity',
            'label': 'Utbildningsnivå',
            'type': 'buttons',
            'values': [
              { value: 0, label: 'Grundskola/gymnasium' },
              { value: 1, label: 'Högskola' }
            ]
          },
        ]
      },
      {
        'name': 'main_health_profile',
        'header': 'Hälsoprofil',
        'fields': [
          {
            'name': 'IsSmoker',
            'label': 'Rökare',
            'type': 'buttons',
            'values': [
              { value: 0, label: 'Nej' },
              { value: 1, label: 'Ja' }
            ]
          },
          {
            'name': 'IsPreviouslyOperated',
            'label': 'Tidigare ryggopererad',
            'type': 'buttons',
            'values': [
              { value: 0, label: 'Nej' },
              { value: 1, label: 'Ja' }
            ]
          },
          {
            'name': 'HasOtherIllness',
            'label': 'Samsjuklighet',
            'type': 'buttons',
            'values': [
              { value: 0, label: 'Nej' },
              { value: 1, label: 'Ja' }
            ]
          },
          {
            'name': 'EQ5DIndex',
            'label': 'EQ5D',
            'type': 'number',
            'range': { 'min': -0.59, 'max': 1, 'step': 0.01 },
            'show_range': true
          }
        ]
      }
    ]
  },
  {
    'name': 'diagnosis_specific_information',
    'label': 'Ryggspecifik information',
    'groups': [
      {
        'name': 'diagnosis_specific_demographics',
        'header': 'Sociodemografi',
        'fields': [
          {
            'name': 'AbilityWalking',
            'label': 'Promenadsträcka',
            'type': 'select',
            'values': [
              { value: 1, label: '0-100 meter' },
              { value: 2, label: '100-500 meter' },
              { value: 3, label: '0,5-1 kilometer' },
              { value: 4, label: 'Mer än 1 kilometer' }
            ]
          },
          {
            'name': 'DurationLegPain',
            'label': 'Smärtduration i ben',
            'type': 'select',
            'values': [
              { value: 0, label: 'Ingen smärta' },
              { value: 1, label: 'Mindre än 3 månader' },
              { value: 2, label: '3 till 12 månader' },
              { value: 3, label: '1 till 2 år' },
              { value: 4, label: 'Mer än 2 år' }
            ]
          },
          {
            'name': 'DurationBackPain',
            'label': 'Smärtduration i rygg',
            'type': 'select',
            'values': [
              { value: 0, label: 'Ingen smärta' },
              { value: 1, label: 'Mindre än 3 månader' },
              { value: 2, label: '3 till 12 månader' },
              { value: 3, label: '1 till 2 år' },
              { value: 4, label: 'Mer än 2 år' }
            ]
          },
          {
            'name': 'DurationCervicalSpinePain',
            'label': 'Smärtduration i halsrygg',
            'type': 'select',
            'values': [
              { value: 0, label: 'Ingen smärta' },
              { value: 1, label: 'Mindre än 3 månader' },
              { value: 2, label: '3 till 12 månader' },
              { value: 3, label: '1 till 2 år' },
              { value: 4, label: 'Mer än 2 år' }
            ]
          },
          {
            'name': 'DurationThoracicSpinePain',
            'label': 'Smärtduration i bröstrygg',
            'type': 'select',
            'values': [
              { value: 0, label: 'Ingen smärta' },
              { value: 1, label: 'Mindre än 3 månader' },
              { value: 2, label: '3 till 12 månader' },
              { value: 3, label: '1 till 2 år' },
              { value: 4, label: 'Mer än 2 år' }
            ]
          },
          {
            'name': 'DurationArmPain',
            'label': 'Smärtduration i arm',
            'type': 'select',
            'values': [
              { value: 0, label: 'Ingen smärta' },
              { value: 1, label: 'Mindre än 3 månader' },
              { value: 2, label: '3 till 12 månader' },
              { value: 3, label: '1 till 2 år' },
              { value: 4, label: 'Mer än 2 år' }
            ]
          },
        ]
      },
      {
        'name': 'diagnosis_specific_health_profile',
        'header': 'Hälsoprofil',
        'fields': [
          {
            'name': 'NRSLegPain',
            'label': 'Smärta i ben',
            'type': 'number',
            'range': { 'min': 0, 'max': 10, 'step': 1 },
            'show_range': true
          },
          {
            'name': 'NRSBackPain',
            'label': 'Smärta i rygg',
            'type': 'number',
            'range': { 'min': 0, 'max': 10, 'step': 1 },
            'show_range': true
          },
          {
            'name': 'NRSArmPain',
            'label': 'Smärta i arm',
            'type': 'number',
            'range': { 'min': 0, 'max': 10, 'step': 1 },
            'show_range': true
          },
          {
            'name': 'NRSNeckPain',
            'label': 'Smärta i nacke',
            'type': 'number',
            'range': { 'min': 0, 'max': 10, 'step': 1 },
            'show_range': true
          },
        ]
      },
      {
        'name': 'disability',
        'header': 'Funktionsnedsättning',
        'fields': [
          {
            'name': 'ODI',
            'label': 'Funktionsnedsättning (ODI)',
            'type': 'number',
            'range': { 'min': 0, 'max': 100, 'step': 1 },
            'show_range': true
          },
          {
            'name': 'NDI',
            'label': 'Funktionsnedsättning (NDI)',
            'type': 'number',
            'range': { 'min': 0, 'max': 100, 'step': 1 },
            'show_range': true
          },
        ]
      },
    ]
  }
];

export function getField(name) {
  for(const tab of tabs) {
    for(const group of tab.groups) {
      for(const field of group.fields) {
        if(field.name == name) {
          return field;
        }
      }
    }
  }
  throw new Error('Failed to get layout field for ' + name);
}