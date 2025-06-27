const LR = ['disc_herniation', 'spinal_stenosis', 'srbp'];
const HR = ['rhizopathy'];

function HRAndAgePension() {
  return HR.includes(localStorage.getItem('Diagnosis')) && localStorage.getItem('HasAgePension') === '1';
}

export const formSections = [
  {
    fields: [
      {
        info: 'Studie: <b>Effekter på beslutsfattande vid behandling av degenerativ ryggsjukdom när ett digitalt beslutsstöd används i beslutsprocessen</b> (2024-00839-01)',
      },
      {
        info: 'Följande information fylls i av <b>vårdgivaren</b> innan enheten lämnas över till patienten.',
      },
      {
        'name': 'Pnr',
        'label': 'Personnummer (ÅÅÅÅMMDD-NNNN)',
        'type': 'text',
        'inputmode': 'numeric'
      },
      {
        'name': 'Diagnosis',
        'label': 'Diagnosgrupp',
        'type': 'radio',
        'values': [
          { value: 'disc_herniation', label: 'Diskbråck' },
          { value: 'spinal_stenosis', label: 'Spinal stenos' },
          { value: 'srbp', label: 'Segmentrelaterad ryggsmärta (SRS) - fusion/protes' },
          { value: 'rhizopathy', label: 'Ritzopathi Nacke' },
        ],
        'value_type': 'string'
      },
      {
        'name': 'Condition',
        'label': 'Villkor',
        'type': 'radio',
        'values': [
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B' },
          { value: 'C', label: 'C' },
        ],
        'value_type': 'string'
      }
    ],
    canGoForward: true
  },
  {
    fields: [
      {
        info: 'Detta är ett formulär med frågor relaterade till Svenska Ryggregistret. Formuläret vänder sig deltagare i studien <i>Effekter på beslutsfattande vid behandling av degenerativ ryggsjukdom när ett digitalt beslutsstöd används i beslutsprocessen</i> (2024-00839-01).',
      },
      {
        'name': 'Height',
        'label': 'Längd (cm)',
        'type': 'number',
        'range': { 'min': 0, 'max': 250 }
      },
      {
        'name': 'Weight',
        'label': 'Vikt (kg)',
        'type': 'number',
        'range': { 'min': 0, 'max': 500 }
      },
      {
        'name': 'Female',
        'label': 'Kön',
        'type': 'radio',
        'values': [
          { value: 0, label: 'Man' },
          { value: 1, label: 'Kvinna' }
        ]
      },
      {
        'name': 'IsSmoker',
        'label': 'Röker du?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ]
      },
      {
        'diagnoses': LR,
        'name': 'IsPreviouslyOperated',
        'label': 'Har Du tidigare genomgått någon ryggoperation?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ]
      },
      {
        'diagnoses': HR,
        'name': 'IsPreviouslyOperated',
        'label': 'Har Du tidigare genomgått någon hals-/bröstryggsoperation?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ]
      },
      {
        condition: () => { return localStorage.getItem('IsPreviouslyOperated') == 1 },
        name: 'Preop-TidOpAnt',
        label: 'Hur många?',
        labelIndent: true,
        type: 'number',
        range: { min: 0, max: 20 }
      },
      {
        diagnoses: LR,
        name: 'Preop-InjBeh',
        label: 'Har Du nyligen genomgått en injektionsbehandling för ryggbesvär (sprutor/blockader)?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ]
      },
      {
        condition: () => { return localStorage.getItem('Preop-InjBeh') == 1 },
        diagnoses: LR,
        name: 'Preop-InjBehAnt',
        label: 'Hur många ungefär?',
        labelIndent: true,
        type: 'number',
        range: { min: 0, max: 100 }
      },
      {
        'name': 'HasAgePension',
        'label': 'Har Du för närvarande ålderspension?',
        'type': 'radio',
        'values': [
          { value: 1, modelValue: 1, label: 'Ja, på heltid' },
          { value: 2, modelValue: 1, label: 'Ja, på deltid' },
          { value: 0, modelValue: 0, label: 'Nej' },
        ]
      },
      {
        condition: () => { return !HRAndAgePension() },
        'name': 'Preop-ArbTyng',
        'label': 'Hur fysiskt betungande är Ditt nuvarande förvärvsarbete?',
        'type': 'radio',
        'values': [
          { value: 0, label: 'Jag förvärvsarbetar inte' },
          { value: 1, label: 'Lätt' },
          { value: 2, label: 'Medeltungt' },
          { value: 3, label: 'Tungt' },
        ]
      },
      {
        condition: () => { return !HRAndAgePension() },
        'name': 'IsUnemployed',
        'label': 'Är Du för närvarande arbetslös?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ]
      },
      {
        condition: () => { return !HRAndAgePension() },
        diagnoses: LR,
        'name': 'Preop-ArbOfor',
        'label': 'Har Du för närvarande sjukpenning?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja, på heltid för mina ryggbesvär' },
          { value: 2, label: 'Ja, på deltid för mina ryggbesvär' },
          { value: 3, label: 'Ja, pga annan sjukdom' },
          { value: 0, label: 'Nej' },
        ]
      },
      {
        condition: () => { return !HRAndAgePension() },
        diagnoses: HR,
        'name': 'Preop-ArbOfor',
        'label': 'Har Du för närvarande sjukpenning?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja, på heltid för mina hals-/bröstrygg/armbesvär' },
          { value: 2, label: 'Ja, på deltid för mina hals-/bröstrygg/armbesvär' },
          { value: 3, label: 'Ja, pga annan sjukdom' },
          { value: 0, label: 'Nej' },
        ]
      },
      {
        condition: () => {
          return !HRAndAgePension() && ['1','2','3'].includes(localStorage.getItem('Preop-ArbOfor'))
        },
        name: 'Preop-TidOfor',
        label: 'Sedan hur länge?',
        labelIndent: true,
        type: 'text'
      },
      {
        'name': 'HasSickPension',
        'label': 'Har Du för närvarande sjukersättning eller aktivitetsersättning?',
        'type': 'radio',
        'values': [
          { value: 1, modelValue: 1, label: 'Ja, på heltid' },
          { value: 2, modelValue: 1, label: 'Ja, på deltid' },
          { value: 0, modelValue: 0, label: 'Nej' },
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'rhizopathy', 'srbp'],
        name: 'DurationBackPain',
        label: 'Hur länge har Du haft Din nuvarande smärta i ryggen?',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag har ingen smärta i ryggen' },
          { value: 1, label: 'Mindre än 3 månader' },
          { value: 2, label: '3 till 12 månader' },
          { value: 3, label: '1 till 2 år' },
          { value: 4, label: 'Mer än 2 år' },
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'DurationLegPain',
        label: 'Hur länge har Du haft Din smärtutstrålning i benet/benen?',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag har ingen smärtutstrålning i benet/benen' },
          { value: 1, label: 'Mindre än 3 månader' },
          { value: 2, label: '3 till 12 månader' },
          { value: 3, label: '1 till 2 år' },
          { value: 4, label: 'Mer än 2 år' },
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'DurationCervicalSpinePain',
        label: 'Hur länge har Du haft Din nuvarande smärta i halsryggen?',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag har ingen smärta i halsryggen' },
          { value: 1, label: 'Mindre än 3 månader' },
          { value: 2, label: '3 till 12 månader' },
          { value: 3, label: '1 till 2 år' },
          { value: 4, label: 'Mer än 2 år' },
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'DurationThoracicSpinePain',
        label: 'Hur länge har Du haft Din nuvarande smärta i bröstryggen?',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag har ingen smärta i bröstryggen' },
          { value: 1, label: 'Mindre än 3 månader' },
          { value: 2, label: '3 till 12 månader' },
          { value: 3, label: '1 till 2 år' },
          { value: 4, label: 'Mer än 2 år' },
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'DurationArmPain',
        label: 'Hur länge har Du haft Din smärtutstrålning i armen/armarna?',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag har ingen smärtutstrålning i armen/armarna' },
          { value: 1, label: 'Mindre än 3 månader' },
          { value: 2, label: '3 till 12 månader' },
          { value: 3, label: '1 till 2 år' },
          { value: 4, label: 'Mer än 2 år' },
        ]
      },
      {
        'diagnoses': LR,
        'name': 'PreopLR-Medicin',
        'label': 'Tar Du smärtlindrande mediciner el tabletter för Dina ryggbesvär?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja, regelbundet' },
          { value: 2, label: 'Ja, ibland' },
          { value: 0, label: 'Nej' },
        ]
      },
      {
        'diagnoses': HR,
        'name': 'PreopHR-Medicin',
        'label': 'Tar Du smärtlindrande mediciner el tabletter för Dina bröstrygg/halsrygg/armbesvär?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja, regelbundet' },
          { value: 2, label: 'Ja, ibland' },
          { value: 0, label: 'Nej' },
        ]
      },
      {
        diagnoses: LR,
        condition: () => { return ['1','2'].includes(localStorage.getItem('PreopLR-Medicin')) },
        name: 'PreopLR-MedicinNarkotiskt',
        label: 'Är något av preparaten narkotiskt?',
        labelComplement: 'För att se en lista på exempel, <a href="javascript:showNarcoticsExamples();void(0)">klicka här</a>.',
        labelIndent: true,
        type: 'radio',
        values: [
          { value: 0, label: 'Nej' },
          { value: 1, label: 'Ja' },
          { value: 2, label: 'Vet inte' },
        ]
      },
      {
        diagnoses: HR,
        condition: () => { return ['1','2'].includes(localStorage.getItem('PreopHR-Medicin')) },
        name: 'PreopHR-MedicinMorfin',
        label: 'Är något av preparaten starkt, morfinliknande smärtstillande?',
        labelComplement: 'För att se en lista på exempel, <a href="javascript:showMorphineExamples();void(0)">klicka här</a>.',
        labelIndent: true,
        type: 'radio',
        values: [
          { value: 0, label: 'Nej' },
          { value: 1, label: 'Ja' },
          { value: 2, label: 'Vet inte' },
        ]
      },
      {
        diagnoses: HR,
        condition: () => { return ['1','2'].includes(localStorage.getItem('PreopHR-Medicin')) },
        name: 'PreopHR-MedicinNervsmarta',
        label: 'Är något av preparaten specifikt mot nervsmärta?',
        labelComplement: 'För att se en lista på exempel, <a href="javascript:showNervePainMedicationExamples();void(0)">klicka här</a>.',
        labelIndent: true,
        type: 'radio',
        values: [
          { value: 0, label: 'Nej' },
          { value: 1, label: 'Ja' },
          { value: 2, label: 'Vet inte' },
        ]
      },
      {
        'name': 'AbilityWalking',
        'label': 'Hur lång promenad klarar Du i normal takt?',
        'type': 'radio',
        'values': [
          { value: 1, modelValue: 1, label: 'Mindre än 100 meter' },
          { value: 2, modelValue: 2, label: '100 till 500 meter' },
          { value: 3, modelValue: 3, label: '0,5 till 1 kilometer' },
          { value: 4, modelValue: 4, label: 'Mer än 1 kilometer' },
        ]
      },
      {
        diagnoses: HR,
        name: 'PreOpHR-Finmotorik',
        label: 'Har Du fått försämrad finmotorik i händerna, t ex svårt att knäppa knappar eller tappar lättare saker?',
        type: 'radio',
        values: [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' },
        ]
      }
    ],
    canGoForward: true
  },
  {
    canGoBack: true,
    fields: [
      {
        info: 'Lider Du av någon/några av dessa sjukdomar som starkt begränsar Din livskvalitet?',
      },
      {
        name: 'HasOtherIllness_1',
        label: 'Hjärtsjukdom',
        type: 'radio',
        values: [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ],
      },
      {
        name: 'HasOtherIllness_2',
        label: 'Neurologisk sjukdom',
        type: 'radio',
        values: [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ],
      },
      {
        name: 'HasOtherIllness_3',
        label: 'Cancersjukdom',
        type: 'radio',
        values: [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ],
      },
      {
        name: 'HasOtherIllness_4',
        label: 'Annan sjukdom som påverkar/t Din gångförmåga',
        type: 'radio',
        values: [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ],
      },
      {
        name: 'HasOtherIllness_5',
        label: 'Annan sjukdom som ger smärtor',
        type: 'radio',
        values: [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' }
        ],
      },
    ],
    canGoForward: true
  },
  {
    canGoBack: true,
    fields: [
      {
        name: 'Preop-LakSam',
        label: 'Är det viktigt för Dig att Du får träffa samma läkare vid besöken på kliniken?',
        type: 'radio',
        values: [
          { value: 1, label: 'Mycket viktigt' },
          { value: 2, label: 'Ganska viktigt' },
          { value: 0, label: 'Spelar ingen roll' },
        ],
      }
    ],
    canGoForward: true
  },
  {
    canGoBack: true,
    fields: [
      {
        info: 'Markera Din smärtnivå under <u>senaste veckan</u> genom att välja det värde som bäst motsvarar smärtnivån, på vardera skala nedan. Markering längst till vänster (0) innebär smärtfri och längst till höger (10) innebär värsta tänkbara smärta.',
      },
      {
        'name': 'NRSBackPain',
        'label': 'Rygg',
        'diagnoses': ['disc_herniation', 'spinal_stenosis', 'rhizopathy', 'srbp'],
        'type': 'radio',
        'orientation': 'h',
        'values': [0,1,2,3,4,5,6,7,8,9,10].map(x => ({ value: x, label: x }))
      },
      {
        'name': 'NRSLegPain',
        'label': 'Ben',
        'diagnoses': ['disc_herniation', 'spinal_stenosis', 'srbp'],
        'type': 'radio',
        'orientation': 'h',
        'values': [0,1,2,3,4,5,6,7,8,9,10].map(x => ({ value: x, label: x }))
      },
      {
        'name': 'NRSNeckPain',
        'label': 'Hals-/bröstrygg',
        'diagnoses': ['rhizopathy'],
        'type': 'radio',
        'orientation': 'h',
        'values': [0,1,2,3,4,5,6,7,8,9,10].map(x => ({ value: x, label: x }))
      },
      {
        'name': 'NRSArmPain',
        'label': 'Arm',
        'diagnoses': ['rhizopathy'],
        'type': 'radio',
        'orientation': 'h',
        'values': [0,1,2,3,4,5,6,7,8,9,10].map(x => ({ value: x, label: x }))
      },
    ],
    canGoForward: true
  },
  {
    canGoBack: true,
    fields: [
      {
        name: 'Preop-ArbAter',
        label: 'Vad tror Du om Dina möjligheter att återgå i arbete?',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag är för närvarande i arbete' },
          { value: 1, label: 'Kommer att återgå i heltidsarbete' },
          { value: 2, label: 'Kommer att återgå i deltidsarbete' },
          { value: 3, label: 'Kommer att byta arbete/sysselsättning' },
          { value: 4, label: 'Kommer att ha fortsatt sjukpenning' },
          { value: 5, label: 'Kommer att ha pension/sjukersättning/aktivitetsersättning som tidigare' },
        ]
      },
      {
        'name': 'CollegeUniversity',
        'label': 'Vilken är din utbildningsnivå?',
        'type': 'radio',
        'values': [
          { value: 1, modelValue: 0, label: 'Grundskola' },
          { value: 2, modelValue: 0, label: 'Gymnasium' },
          { value: 3, modelValue: 1, label: 'Högskola' },
        ]
      },
      {
        diagnoses: LR,
        'name': 'PreopLR-FysterInnan',
        'label': 'Har du genomgått sjukgymnastik / fysioterapeutisk behandling / träning speciellt för ländryggen <b>innan</b> det blev bestämt att du skulle opereras?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' },
        ]
      },
      {
        diagnoses: HR,
        'name': 'PreopHR-FysterInnan',
        'label': 'Har du genomgått sjukgymnastik/fysioterapi speciellt för halsryggen <b>innan</b> det blev bestämt att Du skulle opereras?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' },
        ]
      },
      {
        diagnoses: LR,
        'name': 'PreopLR-FysterEfter',
        'label': 'Har du genomgått sjukgymnastik / fysioterapeutisk behandling / träning speciellt för ländryggen <b>efter</b> det blev bestämt att du skulle opereras?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' },
        ]
      },
      {
        diagnoses: HR,
        'name': 'PreopHR-FysterEfter',
        'label': 'Har du genomgått sjukgymnastik/fysioterapi speciellt för halsryggen <b>efter</b> det blev bestämt att Du skulle opereras?',
        'type': 'radio',
        'values': [
          { value: 1, label: 'Ja' },
          { value: 0, label: 'Nej' },
        ]
      },
    ],
    canGoForward: true
  },
  {
    canGoBack: true,
    fields: [
      {
        'info': 'Följande frågor är utformade för att ge oss information om hur Din ryggsmärta påverkar det dagliga livet. Besvara varje avsnitt och markera den ruta som passar Dig. Vi är medvetna om att det kan vara svårt att välja mellan två närstående påståenden, men var vänlig kryssa bara i den rutan som <i>mest</i> motsvarar Din situation.',
        'diagnoses': ['disc_herniation', 'spinal_stenosis', 'srbp'],
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_1',
        label: 'Smärtintensitet',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag har ingen smärta för närvarande' },
          { value: 1, label: 'Jag har väldigt svag smärta för närvarande' },
          { value: 2, label: 'Jag har måttlig smärta för närvarande' },
          { value: 3, label: 'Jag har ganska stark smärta för närvarande' },
          { value: 4, label: 'Jag har väldigt stark smärta för närvarande' },
          { value: 5, label: 'Jag har helt outhärdlig smärta för närvarande' }
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_2',
        label: 'Personlig omvårdnad',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag sköter mig själv utan att få mer smärta' },
          { value: 1, label: 'Jag sköter mig själv, men får mer smärta' },
          { value: 2, label: 'Jag sköter mig själv, men det gör ont och jag får vara försiktig' },
          { value: 3, label: 'Jag behöver en viss hjälp, men klarar det mesta själv' },
          { value: 4, label: 'Jag behöver hjälp varje dag med det mesta' },
          { value: 5, label: 'Jag klär inte på mig, har svårt att tvätta mig och ligger till sängs' }
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_3',
        label: 'Förmåga att lyfta',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan lyfta tunga saker utan att få ont' },
          { value: 1, label: 'Jag kan lyfta tunga saker, men får ont' },
          { value: 2, label: 'På grund av smärta kan jag inte lyfta tunga saker från golvet, det går bra om de är bra placerade, t ex på ett bord' },
          { value: 3, label: 'På grund av smärta kan jag inte lyfta tunga saker, men klarar lätta och medeltunga saker, om de är bra placerade' },
          { value: 4, label: 'Jag kan bara lyfta väldigt lätta saker' },
          { value: 5, label: 'Jag kan inte lyfta eller bära några saker' }
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_4',
        label: 'Gångförmåga',
        type: 'radio',
        values: [
          { value: 0, label: 'Smärtan hindrar mig inte från att gå hur långt som helst' },
          { value: 1, label: 'Smärtan hindrar mig från att gå mer än 1 km' },
          { value: 2, label: 'Smärtan hindrar mig från att gå mer än 500 m' },
          { value: 3, label: 'Smärtan hindrar mig från att gå mer än 100 m' },
          { value: 4, label: 'Jag kan bara gå om jag använder käpp eller kryckor' },
          { value: 5, label: 'Jag ligger mestadels till sängs och måste krypa till toaletten' }
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_5',
        label: 'Förmåga att sitta',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan sitta i vilken stol som helst så länge jag vill' },
          { value: 1, label: 'Jag kan sitta i min favoritstol så länge jag vill' },
          { value: 2, label: 'Smärtan hindrar mig från att sitta mer än 1 timme' },
          { value: 3, label: 'Smärtan hindrar mig från att sitta mer än 30 minuter' },
          { value: 4, label: 'Smärtan hindrar mig från att sitta mer än 10 minuter' },
          { value: 5, label: 'Smärtan hindrar mig från att sitta över huvud taget' }
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_6',
        label: 'Förmåga att stå',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan stå så länge jag vill utan att få mer ont' },
          { value: 1, label: 'Jag kan stå så länge jag vill, men får mer ont' },
          { value: 2, label: 'Smärtan hindrar mig från att stå mer än 1 timme' },
          { value: 3, label: 'Smärtan hindrar mig från att stå mer än 30 minuter' },
          { value: 4, label: 'Smärtan hindrar mig från att stå mer än 10 minuter' },
          { value: 5, label: 'Smärtan hindrar mig från att stå över huvud taget' }
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_7',
        label: 'Sömn',
        type: 'radio',
        values: [
          { value: 0, label: 'Smärtan hindrar mig inte från att sova' },
          { value: 1, label: 'Smärtan hindrar mig ibland från att sova' },
          { value: 2, label: 'På grund av smärtan sover jag mindre än 6 timmar per natt' },
          { value: 3, label: 'På grund av smärtan sover jag mindre än 4 timmar per natt' },
          { value: 4, label: 'På grund av smärtan sover jag mindre än 2 timmar per natt' },
          { value: 5, label: 'Smärtan hindrar mig från att sova över huvud taget' }
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_8',
        label: 'Sexualfunktion',
        type: 'radio',
        values: [
          { value: 0, label: 'Mitt sexualliv är normalt och orsakar inte mer smärta' },
          { value: 1, label: 'Mitt sexualliv är normalt men orsakar viss ökad smärta' },
          { value: 2, label: 'Mitt sexualliv är nästan normalt men väldigt smärtande' },
          { value: 3, label: 'Mitt sexualliv är starkt begränsat på grund av smärta' },
          { value: 4, label: 'Mitt sexualliv är nästan obefintligt på grund av smärta' },
          { value: 5, label: 'Smärtan hindrar mig från sexualliv över huvud taget' }
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_9',
        label: 'Socialt liv',
        type: 'radio',
        values: [
          { value: 0, label: 'Mitt sociala liv är normalt och ger ej ökade smärtor' },
          { value: 1, label: 'Mitt sociala liv är normalt men ökar smärtan' },
          { value: 2, label: 'Smärtan påverkar inte mitt sociala liv nämnvärt, men förhindrar mig att utföra mer ansträngande aktiviteter, såsom dans, motion och idrott' },
          { value: 3, label: 'Smärtan har begränsat mitt sociala liv och jag går inte ut så ofta' },
          { value: 4, label: 'Smärtan har begränsat mitt sociala liv och jag måste hålla mig hemma' },
          { value: 5, label: 'Jag har inget socialt liv på grund av smärtan' }
        ]
      },
      {
        diagnoses: ['disc_herniation', 'spinal_stenosis', 'srbp'],
        name: 'ODI_10',
        label: 'Resor',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan resa vart som helst utan att få mer ont' },
          { value: 1, label: 'Jag kan resa vart som helst men får mer ont' },
          { value: 2, label: 'Smärtan blir svår men jag klarar resor på mer än 2 timmar' },
          { value: 3, label: 'Smärtan hindrar mig från att göra resor på mer än 1 timme' },
          { value: 4, label: 'Smärtan gör att jag bara kan göra nödvändiga resor kortare än 30 minuter' },
          { value: 5, label: 'Smärtan hindrar mig att göra andra resor än för att få behandling' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        'info': 'Följande frågor är utformade för att ge oss information om hur Din nacksmärta påverkar det dagliga livet. Besvara varje avsnitt och markera den ruta som passar Dig. Vi är medvetna om att det kan vara svårt att välja mellan två närstående påståenden, men var vänlig kryssa bara i den rutan som <i>mest</i> motsvarar Din situation.',
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_1',
        label: 'Smärtintensitet',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag har ingen smärta för närvarande' },
          { value: 1, label: 'Smärtan är mycket lätt' },
          { value: 2, label: 'Smärtan är måttlig' },
          { value: 3, label: 'Smärtan är svår' },
          { value: 4, label: 'Smärtan är mycket svår' },
          { value: 5, label: 'Smärtan är värsta tänkbara' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_2',
        label: 'Personlig omvårdnad (hygien, påklädning etc)',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan sköta mig själv som vanligt utan att få ökad smärta' },
          { value: 1, label: 'Jag kan sköta mig själv som vanligt, men det orsakar ökad smärta' },
          { value: 2, label: 'Det innebär smärta att sköta mig själv och jag är försiktig och långsam' },
          { value: 3, label: 'Jag behöver en del hjälp, men klarar det mesta av min personliga omvårdnad' },
          { value: 4, label: 'Jag behöver hjälp varje dag med det mesta i min personliga omvårdnad' },
          { value: 5, label: 'Jag klär inte på mig, tvättar mig med svårigheter och ligger till sängs' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_3',
        label: 'Lyfta',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan lyfta tunga saker utan ökad smärta' },
          { value: 1, label: 'Jag kan lyfta tunga saker, men det ger ökad smärta' },
          { value: 2, label: 'Smärtan hindrar mig från att lyfta tunga föremål från golvet, men jag klarar det om det är lämpligt placerat, ex på ett bord' },
          { value: 3, label: 'Smärtan hindrar mig från att lyfta tunga föremål, men jag klarar medeltunga föremål, om de är lämpligt placerade' },
          { value: 4, label: 'Jag kan lyfta mycket lätta föremål' },
          { value: 5, label: 'Jag kan inte lyfta eller bära något överhuvudtaget' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_4',
        label: 'Läsning',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan läsa så mycket som jag vill utan smärta från nacken' },
          { value: 1, label: 'Jag kan läsa så mycket jag vill med lätt smärta i nacken' },
          { value: 2, label: 'Jag kan läsa så mycket jag vill, men med måttlig smärta i nacken' },
          { value: 3, label: 'Jag kan inte läsa så mycket jag vill p.g.a. måttlig smärta från nacken' },
          { value: 4, label: 'Jag kan knappast läsa alls p.g.a. svår smärta från nacken' },
          { value: 5, label: 'Jag kan inte läsa alls p.g.a. smärtan' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_5',
        label: 'Huvudvärk',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag har ingen huvudvärk överhuvudtaget' },
          { value: 1, label: 'Jag har lätt huvudvärk då och då' },
          { value: 2, label: 'Jag har måttlig huvudvärk då och då' },
          { value: 3, label: 'Jag har måttlig huvudvärk ofta' },
          { value: 4, label: 'Jag har svår huvudvärk ofta' },
          { value: 5, label: 'Jag har svår huvudvärk praktiskt taget hela tiden' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_6',
        label: 'Koncentration',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan koncentrera mig helt och hållet när jag behöver, utan problem' },
          { value: 1, label: 'Jag kan koncentrera mig helt och hållet när jag behöver, men får lindriga besvär' },
          { value: 2, label: 'Jag har måttliga svårigheter att koncentrera mig när jag behöver' },
          { value: 3, label: 'Jag har stora svårigheter att koncentrera mig när jag behöver' },
          { value: 4, label: 'Jag har avsevärda problem att koncentrera mig när jag behöver' },
          { value: 5, label: 'Jag kan inte koncentrera mig alls' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_7',
        label: 'Arbete',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan utföra så mycket arbete som jag vill' },
          { value: 1, label: 'Jag kan bara göra mitt vanliga arbete, men inte mer' },
          { value: 2, label: 'Jag kan göra det mesta av mitt vanliga arbete, men inte mer' },
          { value: 3, label: 'Jag kan inte utföra mitt vanliga arbete' },
          { value: 4, label: 'Jag kan knappast utföra något arbete alls' },
          { value: 5, label: 'Jag kan inte utföra något arbete alls' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_8',
        label: 'Bilkörning',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag kan köra bil utan någon nacksmärta' },
          { value: 1, label: 'Jag kan köra bil så länge jag vill, med lätt smärta i nacken' },
          { value: 2, label: 'Jag kan köra bil så länge jag vill, med måttlig smärta i nacken' },
          { value: 3, label: 'Jag kan inte köra bil så länge jag vill p.g.a. måttlig smärta från nacken' },
          { value: 4, label: 'Jag kan knappast köra bil alls p.g.a. svår smärta från nacken' },
          { value: 5, label: 'Jag kan inte köra bil alls p.g.a. nacksmärtan' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_9',
        label: 'Sömn',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag har inga problem med sömnen' },
          { value: 1, label: 'Min sömn är lätt störd (mindre än 1 tim sömnlöshet)' },
          { value: 2, label: 'Min sömn är måttligt störd (1-2 tim sömnlöshet)' },
          { value: 3, label: 'Min sömn är tämligen störd (2-3 tim sömnlöshet)' },
          { value: 4, label: 'Min sömn är kraftigt störd (3-5 tim sömnlöshet)' },
          { value: 5, label: 'Min sömn är helt och hållet störd (5-7 tim sömnlöshet p.g.a. smärtan)' }
        ]
      },
      {
        diagnoses: ['rhizopathy'],
        name: 'NDI_10',
        label: 'Fritidsaktiviteter',
        type: 'radio',
        values: [
          { value: 0, label: 'Jag klarar att utföra alla mina fritidsaktiviteter utan någon nacksmärta' },
          { value: 1, label: 'Jag klarar att utföra alla mina fritidsaktiviteter, men med lätt smärta i nacken' },
          { value: 2, label: 'Jag klarar att utföra de flesta, dock inte alla mina vanliga fritidsaktiviteter p.g.a. smärta i nacken' },
          { value: 3, label: 'Jag klarar bara att utföra ett fåtal av mina vanliga fritidsaktiviteter p.g.a. smärta i nacken' },
          { value: 4, label: 'Jag kan knappast utföra några fritidsaktiviteter p.g.a. smärta i nacken' },
          { value: 5, label: 'Jag kan inte utföra några fritidsaktiviteter alls' }
        ]
      }
    ],
    canGoForward: true
  },
  {
    canGoBack: true,
    fields: [
      {
        info: 'Markera, genom att kryssa i en ruta i varje nedanstående grupp, vilket påstående som bäst beskriver Ditt hälsotillstånd idag.'
      },
      {
        name: 'EQ5D_mobility',
        label: 'Rörlighet',
        type: 'radio',
        values: [
          { value: 1, label: 'Jag går utan svårigheter' },
          { value: 2, label: 'Jag kan gå men med viss svårighet' },
          { value: 3, label: 'Jag är sängliggande' }
        ]
      },
      {
        name: 'EQ5D_selfCare',
        label: 'Hygien',
        type: 'radio',
        values: [
          { value: 1, label: 'Jag behöver ingen hjälp med min dagliga hygien, mat eller påklädning' },
          { value: 2, label: 'Jag har vissa problem att tvätta eller klä mig själv' },
          { value: 3, label: 'Jag kan inte tvätta eller klä mig själv' }
        ]
      },
      {
        name: 'EQ5D_usualActivities',
        label: 'Huvudsakliga aktiviteter',
        type: 'radio',
        values: [
          { value: 1, label: 'Jag klarar av min huvudsakliga aktiviteter' },
          { value: 2, label: 'Jag har vissa problem med att klara av min huvudsakliga aktivitet' },
          { value: 3, label: 'Jag klarar inte av mina huvudsakliga aktiviteter' }
        ]
      },
      {
        name: 'EQ5D_painDiscomfort',
        label: 'Smärtor/besvär',
        type: 'radio',
        values: [
          { value: 1, label: 'Jag har varken smärtor eller besvär' },
          { value: 2, label: 'Jag har måttliga smärtor eller besvär' },
          { value: 3, label: 'Jag har svåra smärtor eller besvär' }
        ]
      },
      {
        name: 'EQ5D_anxietyDepression',
        label: 'Oro/nedstämdhet',
        type: 'radio',
        values: [
          { value: 1, label: 'Jag är inte orolig eller nedstämd' },
          { value: 2, label: 'Jag är orolig eller nedstämd i viss utsträckning' },
          { value: 3, label: 'Jag är i högsta grad orolig eller nedstämd' }
        ]
      }
    ],
    canGoForward: true
  },
  {
    canGoBack: true,
    fields: [
      {'info': 'Dina svar har registrerats och kommer förmedlas till läkaren. Ta med dig surfplattan när du ropas in. <b>Läkaren</b> klickar på Fortsätt-knappen nedan för att gå vidare till dialogstödet.'}
    ],
    canGoToTool: true
  }
];

export function getRegistrationFieldByName(name) {
  for(const section of formSections) {
    if(section.fields) {
      for(const field of section.fields) {
        if(field.name === name) {
          return field;
        }
      }
    }
  }
}
