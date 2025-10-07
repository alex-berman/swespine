export const MODELS = {
  "disc_herniation": {
    "satisfaction": {
      "intercept": [
        1.5388585661346286
      ],
      "coefficients": {
        "DurationBackPain": -0.23147883654484996,
        "ODI": -0.04943717761002949,
        "NRSBackPain": -0.25932667704696105,
        "HasOtherIllness": [
          -0.4005229244470301
        ],
        "HasSickPension": [
          -0.1507737119000015
        ],
        "CollegeUniversity": [
          0.1789827279650047
        ],
        "IsSmoker": [
          -0.3056319999618205
        ],
        "IsUnemployed": [
          -0.5887059755865629
        ],
        "IsPreviouslyOperated": [
          -0.48292646235498893
        ]
      },
      "estimator": "lr",
      "features": {
        "HasOtherIllness": {
          "type": "binary"
        },
        "DurationBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.3071332950851025,
            "scale": 1.0485210675818584
          }
        },
        "HasSickPension": {
          "type": "binary"
        },
        "CollegeUniversity": {
          "type": "binary"
        },
        "ODI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 47.51654235991585,
            "scale": 18.41025338076735
          }
        },
        "IsSmoker": {
          "type": "binary"
        },
        "IsUnemployed": {
          "type": "binary"
        },
        "IsPreviouslyOperated": {
          "type": "binary"
        },
        "NRSBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 5.146108242493785,
            "scale": 2.757433088068665
          }
        }
      },
      "means": {
        "DurationBackPain": -1.1278456123176193e-16,
        "ODI": 4.891860487160759e-17,
        "NRSBackPain": -1.2501421244966384e-16,
        "HasOtherIllness": [
          0.09868043602983362
        ],
        "HasSickPension": [
          0.19315356664754255
        ],
        "CollegeUniversity": [
          0.4293363931918149
        ],
        "IsSmoker": [
          0.06789061005928476
        ],
        "IsUnemployed": [
          0.07764390896921017
        ],
        "IsPreviouslyOperated": [
          0.12430675081277491
        ]
      },
      "num_observations": 5229
    },
    "ga": {
      "thresholds": [
        -0.28464375904635836,
        0.8691438926430168,
        1.4826229940673077,
        1.9268115257905307
      ],
      "coefficients": {
        "DurationLegPain": 0.1810441665936302,
        "NRSBackPain": 0.1676480696663707,
        "ClinicType": [
          0.10465651387675709,
          0.19528785385932582,
          0
        ],
        "HasSickPension": [
          0.12468432413980816
        ],
        "CollegeUniversity": [
          -0.10627089995571234
        ],
        "IsPreviouslyOperated": [
          0.33231348624483303
        ]
      },
      "estimator": "ordered_probit",
      "features": {
        "ClinicType": {
          "type": "categorical",
          "encoding": {
            "drop": [
              3
            ]
          }
        },
        "HasSickPension": {
          "type": "binary"
        },
        "CollegeUniversity": {
          "type": "binary"
        },
        "DurationLegPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.2112701252236135,
            "scale": 0.8638527070532155
          }
        },
        "IsPreviouslyOperated": {
          "type": "binary"
        },
        "NRSBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 5.174060822898032,
            "scale": 2.7590682756015963
          }
        }
      },
      "means": {
        "DurationLegPain": 2.0337538053956355e-17,
        "NRSBackPain": -3.050630708093453e-17,
        "ClinicType": [
          0.08389982110912343,
          0.28640429338103757,
          0
        ],
        "HasSickPension": [
          0.19749552772808587
        ],
        "CollegeUniversity": [
          0.4232558139534884
        ],
        "IsPreviouslyOperated": [
          0.12808586762075133
        ]
      },
      "num_observations": 5590
    },
    "stay": {
      "intercept": [
        1.0258577251454803
      ],
      "coefficients": {
        "DurationBackPain": 0.08155502785164018,
        "AbilityWalking": -0.142389182619918,
        "NRSBackPain": -0.045851030018348074,
        "AgeAtSurgery": 0.1284711215052967,
        "ClinicType": [
          0.07424209576187246,
          0.1711394937862877,
          -0.2453815895481581
        ]
      },
      "estimator": "ridge",
      "features": {
        "DurationBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.3337309871756635,
            "scale": 1.0363060931619839
          }
        },
        "AbilityWalking": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.607714484541207,
            "scale": 1.2303143753419847
          }
        },
        "ClinicType": {
          "type": "categorical",
          "encoding": {
            "drop": null
          }
        },
        "NRSBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 5.2941644298638035,
            "scale": 2.7505309964992852
          }
        },
        "AgeAtSurgery": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 44.83656427080226,
            "scale": 13.5250237040667
          }
        }
      },
      "means": {
        "DurationBackPain": 5.862913517058189e-17,
        "AbilityWalking": 8.617776494953e-17,
        "NRSBackPain": 1.4127502450742623e-17,
        "AgeAtSurgery": 2.3027828994710474e-16,
        "ClinicType": [
          0.09255393180236604,
          0.2588726513569937,
          0.6485734168406402
        ]
      },
      "num_observations": 10059,
      "cov_matrix": [
        [
          5.000101476012587,
          -4.66837078785504e-06,
          6.222586988022235e-06,
          -3.0748812310234317e-06,
          1.954860374879789e-06,
          -4.999830607211948,
          -5.000003732612681,
          -5.000064184127323
        ],
        [
          -4.66837078790023e-06,
          0.00011129316577824922,
          -1.697198459437742e-05,
          -3.267351710753712e-05,
          2.1399575655901384e-07,
          -6.3765196457284135e-06,
          -1.0651008117081128e-05,
          1.2359156974416275e-05
        ],
        [
          6.222586987982148e-06,
          -1.697198459437742e-05,
          0.00010754777623808845,
          1.9376186187844692e-05,
          1.5044629225781112e-05,
          1.2860025130150851e-05,
          7.975344541054218e-06,
          -1.4612782682838015e-05
        ],
        [
          -3.0748812310202506e-06,
          -3.267351710753712e-05,
          1.937618618784469e-05,
          0.00011197368297697302,
          -1.4312438209377617e-06,
          -7.819956794842014e-06,
          -1.8504823579797638e-06,
          6.595557922006095e-06
        ],
        [
          1.954860374848795e-06,
          2.1399575655901442e-07,
          1.5044629225781112e-05,
          -1.4312438209377621e-06,
          0.00010212466821497021,
          1.2805862952269828e-05,
          -1.0001439834936955e-05,
          -8.495627425303482e-07
        ],
        [
          -4.9998306072119485,
          -6.376519645792061e-06,
          1.286002513018673e-05,
          -7.819956794864699e-06,
          1.2805862952241536e-05,
          5.000641883337306,
          4.999736988606387,
          4.999790520808902
        ],
        [
          -5.000003732612682,
          -1.0651008117110411e-05,
          7.97534454102555e-06,
          -1.8504823579891555e-06,
          -1.000143983496359e-05,
          4.9997369886063865,
          5.000295694997547,
          4.999963583747921
        ],
        [
          -5.000064184127323,
          1.235915697436561e-05,
          -1.4612782682847886e-05,
          6.595557922003205e-06,
          -8.495627425239904e-07,
          4.999790520808902,
          4.99996358374792,
          5.0001817112803915
        ]
      ],
      "residual_variance": 28.276840827711638,
      "t_value": 1.9602000358855212
    }
  },
  "spinal_stenosis": {
    "satisfaction": {
      "intercept": [
        0.43142311428966634
      ],
      "coefficients": {
        "DurationBackPain": -0.05688627618431288,
        "ODI": -0.18116945839979798,
        "NRSBackPain": -0.1375479266604923,
        "AgeAtSurgery": -0.1769491925339438,
        "HasOtherIllness": [
          -0.2156934385233344
        ],
        "ClinicType": [
          0.04821242840294461,
          0.10122740998883854,
          0.2819832758978799
        ],
        "CollegeUniversity": [
          0.23756273905250958
        ],
        "DurationLegPain": [
          -0.5232167495634859,
          0.53634176947897,
          0.42200080495029224,
          0.1088709620177685,
          -0.1125736725937227
        ],
        "IsPreviouslyOperated": [
          -0.548321414615771
        ]
      },
      "estimator": "lr",
      "features": {
        "HasOtherIllness": {
          "type": "binary"
        },
        "DurationBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 3.113629923491074,
            "scale": 1.096819689721026
          }
        },
        "ClinicType": {
          "type": "categorical",
          "encoding": {
            "drop": null
          }
        },
        "CollegeUniversity": {
          "type": "binary"
        },
        "DurationLegPain": {
          "type": "categorical",
          "encoding": {
            "drop": null
          },
          "ordinal": true
        },
        "ODI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 42.01830546897138,
            "scale": 15.674691474158616
          }
        },
        "IsPreviouslyOperated": {
          "type": "binary"
        },
        "NRSBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 6.0322470954944745,
            "scale": 2.534663641088861
          }
        },
        "AgeAtSurgery": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 67.43661093794276,
            "scale": 10.490796272114638
          }
        }
      },
      "means": {
        "DurationBackPain": 1.0147734168973944e-16,
        "ODI": 2.0295468337947888e-16,
        "NRSBackPain": -4.1074162112513585e-17,
        "AgeAtSurgery": 1.2886011643141517e-17,
        "HasOtherIllness": [
          0.23287050155851516
        ],
        "ClinicType": [
          0.08149617455369793,
          0.23462737319353924,
          0.6838764522527628
        ],
        "CollegeUniversity": [
          0.34995749504108814
        ],
        "DurationLegPain": [
          0.03462737319353924,
          0.02550297534712383,
          0.2966846132048739,
          0.2676678945877019,
          0.37551714366676114
        ],
        "IsPreviouslyOperated": [
          0.19750637574383678
        ]
      },
      "num_observations": 17645
    },
    "ga": {
      "thresholds": [
        -0.43117393024227,
        0.4631079775499113,
        1.001824042093585,
        1.5747458770056877
      ],
      "coefficients": {
        "DurationBackPain": 0.07199668441777704,
        "DurationLegPain": 0.11648434218917174,
        "ODI": 0.1316293075096467,
        "NRSBackPain": 0.08414559610697528,
        "HasOtherIllness": [
          0.19334581301006
        ],
        "ClinicType": [
          0.18273701994737157,
          0.179297033012885,
          0
        ],
        "IsUnemployed": [
          0.1930935333106424
        ],
        "IsPreviouslyOperated": [
          0.34819835305335334
        ]
      },
      "estimator": "ordered_probit",
      "features": {
        "HasOtherIllness": {
          "type": "binary"
        },
        "DurationBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 3.116649780479568,
            "scale": 1.0859560903335401
          }
        },
        "ClinicType": {
          "type": "categorical",
          "encoding": {
            "drop": [
              3
            ]
          }
        },
        "DurationLegPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.981898007429922,
            "scale": 0.9712916876259579
          }
        },
        "ODI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 42.10678824721378,
            "scale": 15.678107374501991
          }
        },
        "IsUnemployed": {
          "type": "binary"
        },
        "IsPreviouslyOperated": {
          "type": "binary"
        },
        "NRSBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 6.02870651806822,
            "scale": 2.5280700367595235
          }
        }
      },
      "means": {
        "DurationBackPain": -1.8237503518327462e-16,
        "DurationLegPain": 1.1902370717224238e-16,
        "ODI": 5.759211637366567e-17,
        "NRSBackPain": 8.446843734804299e-17,
        "HasOtherIllness": [
          0.23080040526849038
        ],
        "ClinicType": [
          0.08186423505572442,
          0.23998649105032083,
          0
        ],
        "IsUnemployed": [
          0.10266801756163459
        ],
        "IsPreviouslyOperated": [
          0.19763593380614658
        ]
      },
      "num_observations": 14805
    },
    "stay": {
      "intercept": [
        1.9345656629905088
      ],
      "coefficients": {
        "OpLevel": 0.25225312167131053,
        "Height": -0.020613689071247776,
        "HasOtherIllness": [
          0.1503068618411569
        ],
        "ClinicType": [
          0.3268012681755976,
          0.16167289364980433,
          -0.48847416182533054
        ],
        "CollegeUniversity": [
          0.07323900175829327
        ]
      },
      "estimator": "ridge",
      "features": {
        "HasOtherIllness": {
          "type": "binary"
        },
        "ClinicType": {
          "type": "categorical",
          "encoding": {
            "drop": null
          }
        },
        "OpLevel": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 1.5842591462173932,
            "scale": 0.7869233892400065
          }
        },
        "CollegeUniversity": {
          "type": "binary"
        },
        "Height": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 171.34265250478168,
            "scale": 9.81238744534677
          }
        }
      },
      "means": {
        "OpLevel": -9.715637456370556e-17,
        "Height": -1.1668885403328385e-15,
        "HasOtherIllness": [
          0.24010092377813047
        ],
        "ClinicType": [
          0.09669149066048102,
          0.24364139502706222,
          0.6596671143124567
        ],
        "CollegeUniversity": [
          0.3516461156553941
        ]
      },
      "num_observations": 24573,
      "cov_matrix": [
        [
          5.000060650891432,
          -2.337456302985889e-07,
          1.2573844282281357e-06,
          -4.636660866049586e-05,
          -4.999928056331172,
          -4.99999289394211,
          -5.000018398739537,
          -4.421397458511585e-05
        ],
        [
          -2.33745630295738e-07,
          4.077830946010871e-05,
          -1.2835930498968922e-06,
          -2.0235547867239596e-06,
          -8.180898141109791e-07,
          7.387653520434724e-07,
          -1.544211693237771e-07,
          2.049158279430573e-06
        ],
        [
          1.257384428187485e-06,
          -1.2835930498968924e-06,
          4.1056855557764955e-05,
          3.202503499608459e-06,
          1.7943496690228004e-06,
          3.1369501340661456e-06,
          -3.6739153748540482e-06,
          -1.5371679331487044e-06
        ],
        [
          -4.636660866098747e-05,
          -2.0235547867239596e-06,
          3.202503499608459e-06,
          0.00022601760241538113,
          -2.1050704301457883e-05,
          -2.34055707337459e-05,
          -1.9103336248894114e-06,
          3.1220081204534817e-06
        ],
        [
          -4.999928056331173,
          -8.180898141057926e-07,
          1.7943496689784983e-06,
          -2.1050704301964114e-05,
          5.000253925295784,
          4.999896243406516,
          4.999921774870778,
          -1.2473399931115355e-05
        ],
        [
          -4.999992893942112,
          7.387653520487884e-07,
          3.136950134028382e-06,
          -2.3405570734248857e-05,
          4.999896243406517,
          5.000126934237021,
          4.999983928318604,
          -4.563395899328905e-06
        ],
        [
          -5.000018398739537,
          -1.544211693201832e-07,
          -3.673915374913201e-06,
          -1.9103336253778365e-06,
          4.999921774870778,
          4.999983928318603,
          5.000075897975332,
          -2.717717875460235e-05
        ],
        [
          -4.421397458511585e-05,
          2.0491582794305724e-06,
          -1.5371679331487046e-06,
          3.1220081204534847e-06,
          -1.247339993111536e-05,
          -4.5633958993288985e-06,
          -2.7177178754602348e-05,
          0.00018117721066610598
        ]
      ],
      "residual_variance": 27.113508952503203,
      "t_value": 1.960060560405461
    }
  },
  "rhizopathy": {
    "satisfaction": {
      "intercept": [
        1.4064445511358064
      ],
      "coefficients": {
        "DurationThoracicSpinePain": -0.1568220508677665,
        "AbilityWalking": 0.22311165974386815,
        "DurationCervicalSpinePain": -0.2438173349568581,
        "BMI": 0.024662787313727827,
        "NDI": -0.30004935545038947,
        "NRSNeckPain": -0.07803390392196512,
        "HasOtherIllness": [
          -0.14371648757730648
        ],
        "IsSmoker": [
          -0.3616788647753016
        ],
        "IsPreviouslyOperated": [
          -0.26714404183040036
        ]
      },
      "estimator": "lr",
      "features": {
        "HasOtherIllness": {
          "type": "binary"
        },
        "DurationThoracicSpinePain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.071115973741794,
            "scale": 1.6008673325136566
          }
        },
        "AbilityWalking": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 3.6394967177242887,
            "scale": 0.7408923064296488
          }
        },
        "DurationCervicalSpinePain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.9808533916849016,
            "scale": 1.0739428848233392
          }
        },
        "IsSmoker": {
          "type": "binary"
        },
        "BMI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 27.06234134912034,
            "scale": 4.477869526403213
          }
        },
        "IsPreviouslyOperated": {
          "type": "binary"
        },
        "NDI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 43.81400437636761,
            "scale": 16.289616940554577
          }
        },
        "NRSNeckPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 6.1181619256017505,
            "scale": 2.4942468840589673
          }
        }
      },
      "means": {
        "DurationThoracicSpinePain": 1.3507308570931883e-16,
        "AbilityWalking": 2.0601074942716252e-16,
        "DurationCervicalSpinePain": -6.510717080952778e-17,
        "BMI": -5.752753002871708e-16,
        "NDI": 9.328788653305473e-17,
        "NRSNeckPain": -1.166098581663184e-17,
        "HasOtherIllness": [
          0.20787746170678337
        ],
        "IsSmoker": [
          0.08041575492341356
        ],
        "IsPreviouslyOperated": [
          0.11269146608315099
        ]
      },
      "num_observations": 1828
    },
    "ga": {
      "thresholds": [
        -0.39484365892929,
        0.7247144965875283,
        1.4054206065956591,
        1.9215312228098569
      ],
      "coefficients": {
        "OpLevel": 0.01723441867093106,
        "DurationArmPain": 0.19793396672583707,
        "DurationCervicalSpinePain": 0.07456196243339071,
        "NDI": 0.21947581007423922,
        "NRSNeckPain": 0.016192981752137528,
        "HasOtherIllness": [
          0.16568283444086515
        ],
        "ClinicType": [
          0.16177438464430297,
          0.34383106109978884,
          0
        ],
        "IsSmoker": [
          0.2469223447284872
        ]
      },
      "estimator": "ordered_probit",
      "features": {
        "HasOtherIllness": {
          "type": "binary"
        },
        "ClinicType": {
          "type": "categorical",
          "encoding": {
            "drop": [
              3
            ]
          }
        },
        "OpLevel": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 1.4228855721393034,
            "scale": 0.5581164214740316
          }
        },
        "DurationArmPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.8308457711442787,
            "scale": 0.9869907825547636
          }
        },
        "DurationCervicalSpinePain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.982310668877833,
            "scale": 1.065939309793797
          }
        },
        "IsSmoker": {
          "type": "binary"
        },
        "NDI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 44.29684908789386,
            "scale": 16.147701208101928
          }
        },
        "NRSNeckPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 6.1459369817578775,
            "scale": 2.4498815572295007
          }
        }
      },
      "means": {
        "OpLevel": 7.855641080819239e-17,
        "DurationArmPain": -1.0605115459105973e-16,
        "DurationCervicalSpinePain": -9.623160324003569e-17,
        "NDI": 1.8853538593966175e-16,
        "NRSNeckPain": -9.426769296983087e-17,
        "HasOtherIllness": [
          0.21061359867330018
        ],
        "ClinicType": [
          0.28745163073521285,
          0.0812603648424544,
          0
        ],
        "IsSmoker": [
          0.0812603648424544
        ]
      },
      "num_observations": 1809
    },
    "stay": {
      "intercept": [
        1.250174591043633
      ],
      "coefficients": {
        "DurationThoracicSpinePain": -0.009278127331541108,
        "AbilityWalking": -0.03482930431193639,
        "DurationCervicalSpinePain": 0.011689099577449319,
        "EQ5DIndex": -0.027623619722210366,
        "NDI": 0.03784807734298075,
        "Height": -0.00544360832753323,
        "HasOtherIllness": [
          0.01927840548827201
        ],
        "HasSickPension": [
          0.005851308131565951
        ],
        "CollegeUniversity": [
          -0.018323446040384748
        ]
      },
      "estimator": "ridge",
      "features": {
        "HasOtherIllness": {
          "type": "binary"
        },
        "DurationThoracicSpinePain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.09788267962513,
            "scale": 1.5841979438894975
          }
        },
        "AbilityWalking": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 3.628601180145783,
            "scale": 0.7374080667980398
          }
        },
        "HasSickPension": {
          "type": "binary"
        },
        "CollegeUniversity": {
          "type": "binary"
        },
        "DurationCervicalSpinePain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.9767441860465116,
            "scale": 1.0665859759227558
          }
        },
        "EQ5DIndex": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 0.37450086775425206,
            "scale": 0.3188299331809999
          }
        },
        "NDI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 44.85005206525512,
            "scale": 16.059755026591272
          }
        },
        "Height": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 172.90836515098923,
            "scale": 9.268747868674515
          }
        }
      },
      "means": {
        "DurationThoracicSpinePain": 4.0694047691918266e-17,
        "AbilityWalking": -2.564958157551212e-16,
        "DurationCervicalSpinePain": 8.015494242347538e-17,
        "EQ5DIndex": -1.0358484867033741e-16,
        "NDI": -2.959567104866783e-17,
        "Height": 1.4612862580279742e-15,
        "HasOtherIllness": [
          0.200624783061437
        ],
        "HasSickPension": [
          0.2676154113155155
        ],
        "CollegeUniversity": [
          0.32974661575841724
        ]
      },
      "num_observations": 2881,
      "cov_matrix": [
        [
          0.0007850293244184189,
          -1.3643171446076614e-05,
          -3.027434604209171e-05,
          -1.908957444534909e-05,
          -2.1905105599539524e-05,
          6.437725988199469e-05,
          -3.642396313069313e-06,
          -0.00043378040346605065,
          -0.0005659920574915615,
          -0.0006048460900908579
        ],
        [
          -1.3643171446076618e-05,
          0.00043516687227974964,
          -8.249863482964925e-06,
          -0.00016491710252309927,
          1.4754863877876194e-05,
          -5.8626774587072466e-05,
          -2.3821972064730417e-06,
          -5.151150408300332e-05,
          1.0169954230511372e-05,
          6.446239341365329e-05
        ],
        [
          -3.0274346042091708e-05,
          -8.249863482964923e-06,
          0.0004216321232364544,
          -2.8901027973726688e-05,
          -3.3163969143571324e-05,
          0.00011796975008370665,
          -1.0476198064988218e-05,
          0.00016016609015856136,
          5.086004812004329e-05,
          -4.691283426066675e-05
        ],
        [
          -1.908957444534909e-05,
          -0.00016491710252309924,
          -2.8901027973726684e-05,
          0.00042614258656923325,
          -1.0672666302759444e-05,
          -4.097553549396537e-05,
          1.3250057676410294e-05,
          -5.870919440912634e-05,
          5.60617947496001e-05,
          4.8113988497164465e-05
        ],
        [
          -2.1905105599539548e-05,
          1.4754863877876189e-05,
          -3.316396914357134e-05,
          -1.067266630275944e-05,
          0.0005943422295869584,
          0.00036323349822969196,
          1.1214423981695887e-05,
          5.58666887683035e-05,
          9.111003320317247e-06,
          2.5046499810010034e-05
        ],
        [
          6.437725988199468e-05,
          -5.8626774587072466e-05,
          0.00011796975008370665,
          -4.0975535493965366e-05,
          0.0003632334982296919,
          0.000681289388763247,
          7.13248642107504e-05,
          -8.987169610091162e-05,
          -0.00016757136901122643,
          -4.558672346356141e-06
        ],
        [
          -3.6423963130693124e-06,
          -2.382197206473042e-06,
          -1.0476198064988214e-05,
          1.3250057676410294e-05,
          1.1214423981695885e-05,
          7.132486421075039e-05,
          0.00036097703888522117,
          1.9694420346177796e-06,
          -1.1559683571635854e-05,
          1.9229583616304255e-05
        ],
        [
          -0.00043378040346605054,
          -5.1511504083003314e-05,
          0.00016016609015856136,
          -5.870919440912635e-05,
          5.586668876830348e-05,
          -8.987169610091161e-05,
          1.969442034617781e-06,
          0.0023940729109977353,
          -0.0001745037953295608,
          5.382263665954235e-07
        ],
        [
          -0.0005659920574915616,
          1.016995423051137e-05,
          5.0860048120043294e-05,
          5.60617947496001e-05,
          9.111003320317204e-06,
          -0.0001675713690112265,
          -1.1559683571635859e-05,
          -0.00017450379532956063,
          0.0019429815374241574,
          0.0002457640479816045
        ],
        [
          -0.0006048460900908578,
          6.446239341365329e-05,
          -4.691283426066675e-05,
          4.8113988497164465e-05,
          2.504649981001003e-05,
          -4.558672346356155e-06,
          1.9229583616304255e-05,
          5.38226366595436e-07,
          0.00024576404798160457,
          0.0016345227916026914
        ]
      ],
      "residual_variance": 0.689466193276613,
      "t_value": 1.960790614511106
    }
  },
  "srbp": {
    "satisfaction": {
      "intercept": [
        1.3013353810228416
      ],
      "coefficients": {
        "OpLevel": -0.07834496230916296,
        "AbilityWalking": 0.2162728178304335,
        "DurationBackPain": -0.17201870897463978,
        "DurationLegPain": 0.149223985495983,
        "EQ5DIndex": 0.1858445520202879,
        "ODI": -0.040456576719425374,
        "CollegeUniversity": [
          0.3936464262108606
        ],
        "IsPreviouslyOperated": [
          -0.43029244224350605
        ],
        "HasOtherIllness": [
          -0.4747311050716133
        ]
      },
      "estimator": "lr",
      "features": {
        "OpLevel": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 1.4597213809812235,
            "scale": 0.6048819517487138
          }
        },
        "AbilityWalking": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 3.322228952150212,
            "scale": 0.9684840500558857
          }
        },
        "DurationBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 3.635372501514234,
            "scale": 0.6642621797417285
          }
        },
        "DurationLegPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 2.385221078134464,
            "scale": 1.6393479732169185
          }
        },
        "CollegeUniversity": {
          "type": "binary"
        },
        "IsPreviouslyOperated": {
          "type": "binary"
        },
        "EQ5DIndex": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 0.35446456692913386,
            "scale": 0.32157677537004875
          }
        },
        "ODI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 41.09206541490006,
            "scale": 14.008001651581347
          }
        },
        "HasOtherIllness": {
          "type": "binary"
        }
      },
      "means": {
        "OpLevel": -1.7214845203152033e-17,
        "AbilityWalking": 8.607422601576017e-18,
        "DurationBackPain": -2.560708223968865e-16,
        "DurationLegPain": 9.468164861733618e-17,
        "EQ5DIndex": 1.7322437985671733e-16,
        "ODI": -1.6354102942994431e-16,
        "CollegeUniversity": [
          0.39672925499697154
        ],
        "IsPreviouslyOperated": [
          0.28225317989097515
        ],
        "HasOtherIllness": [
          0.08903694730466384
        ]
      },
      "num_observations": 1651
    },
    "ga": {
      "thresholds": [
        -0.8559771886853852,
        0.6178344662018102,
        1.314263298640806,
        1.747209598372446
      ],
      "coefficients": {
        "NRSLegPain": 0.03227993866191934,
        "OpLevel": 0.03207207268852728,
        "DurationBackPain": 0.0943945172472789,
        "BMI": 0.05453569176907393,
        "EQ5DIndex": -0.03505810836442301,
        "ODI": 0.09447844618287042,
        "AgeAtSurgery": -0.08395730479174941,
        "HasSickPension": [
          0.10793331196588432
        ],
        "CollegeUniversity": [
          -0.1511372948612455
        ],
        "IsPreviouslyOperated": [
          0.286631971546768
        ],
        "IsSmoker": [
          0.271133713006202
        ],
        "HasOtherIllness": [
          0.35455863981866764
        ]
      },
      "estimator": "ordered_probit",
      "features": {
        "NRSLegPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 3.76,
            "scale": 2.972238765423889
          }
        },
        "HasSickPension": {
          "type": "binary"
        },
        "OpLevel": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 1.4609836065573771,
            "scale": 0.6043169967145887
          }
        },
        "DurationBackPain": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 3.641967213114754,
            "scale": 0.6531206794121893
          }
        },
        "BMI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 25.94634475843061,
            "scale": 3.7764910873560193
          }
        },
        "CollegeUniversity": {
          "type": "binary"
        },
        "IsPreviouslyOperated": {
          "type": "binary"
        },
        "IsSmoker": {
          "type": "binary"
        },
        "EQ5DIndex": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 0.35778032786885244,
            "scale": 0.3215751982625486
          }
        },
        "ODI": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 40.90754098360656,
            "scale": 13.959613017293233
          }
        },
        "HasOtherIllness": {
          "type": "binary"
        },
        "AgeAtSurgery": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 45.68196721311475,
            "scale": 10.529482546044207
          }
        }
      },
      "means": {
        "NRSLegPain": 3.7274373023480665e-17,
        "OpLevel": -1.1648241569837709e-16,
        "DurationBackPain": 1.3278995389614986e-16,
        "BMI": 7.035537908181975e-16,
        "EQ5DIndex": 2.4985478167301885e-16,
        "ODI": -1.2114171232631218e-16,
        "AgeAtSurgery": 1.3046030558218233e-16,
        "HasSickPension": [
          0.1940983606557377
        ],
        "CollegeUniversity": [
          0.39868852459016396
        ],
        "IsPreviouslyOperated": [
          0.2780327868852459
        ],
        "IsSmoker": [
          0.020327868852459016
        ],
        "HasOtherIllness": [
          0.08262295081967214
        ]
      },
      "num_observations": 1525
    },
    "stay": {
      "intercept": [
        2.7229000211868573
      ],
      "coefficients": {
        "OpLevel": 0.2241262016837943,
        "Height": -0.04556989464412989,
        "HasSickPension": [
          0.14761940831800002
        ],
        "HasAgePension": [
          -0.0378936952594213
        ],
        "ClinicType": [
          -0.49105663146603573,
          0.7361014966375706,
          -0.24504486517152038
        ],
        "IsSmoker": [
          -0.32587528416930944
        ],
        "HasOtherIllness": [
          -0.06039488183938958
        ]
      },
      "estimator": "ridge",
      "features": {
        "HasSickPension": {
          "type": "binary"
        },
        "OpLevel": {
          "type": "continuous",
          "data_type": "int",
          "scaler": {
            "type": "StandardScaler",
            "mean": 1.4453441295546559,
            "scale": 0.60568208864554
          }
        },
        "HasAgePension": {
          "type": "binary"
        },
        "ClinicType": {
          "type": "categorical",
          "encoding": {
            "drop": null
          }
        },
        "IsSmoker": {
          "type": "binary"
        },
        "Height": {
          "type": "continuous",
          "data_type": "float",
          "scaler": {
            "type": "StandardScaler",
            "mean": 174.54008097165993,
            "scale": 9.435430084746102
          }
        },
        "HasOtherIllness": {
          "type": "binary"
        }
      },
      "means": {
        "OpLevel": 3.452029485474171e-17,
        "Height": -1.4512907295180993e-15,
        "HasSickPension": [
          0.2089068825910931
        ],
        "HasAgePension": [
          0.03967611336032389
        ],
        "ClinicType": [
          0.04089068825910931,
          0.06315789473684211,
          0.8959514170040486
        ],
        "IsSmoker": [
          0.029959514170040485
        ],
        "HasOtherIllness": [
          0.09959514170040486
        ]
      },
      "num_observations": 2470,
      "cov_matrix": [
        [
          5.001201445926063,
          1.5531787089849664e-05,
          -7.040357934353884e-07,
          -0.00044623810510258647,
          -0.0005011804072319934,
          -4.998480703621883,
          -4.999381335108096,
          -5.000936515329301,
          -0.0004890914712056406,
          -0.0003232375294304567
        ],
        [
          1.553178708984143e-05,
          0.00040684491972069284,
          -2.0761258421490302e-05,
          -3.788096700434362e-06,
          -7.145814853469726e-05,
          -5.386660806378801e-06,
          3.484547371958707e-05,
          -1.3927025822816054e-05,
          -4.65946970007996e-05,
          -1.2219383049914376e-07
        ],
        [
          -7.04035793451636e-07,
          -2.07612584214903e-05,
          0.00040762143171389916,
          3.5329237766898306e-05,
          6.980840923609885e-05,
          -4.255682126959225e-06,
          1.94169322896572e-05,
          -1.586528595587193e-05,
          -1.976698470083293e-05,
          4.325735757967384e-05
        ],
        [
          -0.00044623810510245165,
          -3.7880967004343616e-06,
          3.53292377668983e-05,
          0.0024895357967870515,
          0.000297275691429676,
          -0.00017611919038766868,
          -0.00023312207247413173,
          -3.699684224194302e-05,
          5.699346292868348e-05,
          -0.0003239491066427062
        ],
        [
          -0.0005011804072327127,
          -7.145814853469727e-05,
          6.980840923609885e-05,
          0.00029727569142967605,
          0.010749853278587379,
          -0.0004533202664872458,
          -0.0001450230314122901,
          9.716289066655787e-05,
          -0.0002119906739364136,
          -0.0004059530103754737
        ],
        [
          -4.998480703621883,
          -5.3866608063858345e-06,
          -4.255682126969976e-06,
          -0.00017611919038755668,
          -0.0004533202664879466,
          5.00606249122406,
          4.997003123073079,
          4.998453682066329,
          -0.0005500799207785498,
          -0.00020132700037100805
        ],
        [
          -4.999381335108098,
          3.484547371958376e-05,
          1.9416932289646668e-05,
          -0.00023312207247401108,
          -0.0001450230314129902,
          4.997003123073081,
          5.0042835663373175,
          4.999331975466852,
          -9.509469976655912e-05,
          -9.677418345831206e-05
        ],
        [
          -5.000936515329302,
          -1.3927025822822839e-05,
          -1.5865285955887856e-05,
          -3.699684224180331e-05,
          9.716289066582912e-05,
          4.998453682066329,
          4.999331975466849,
          5.001277827122862,
          0.00015608314933811035,
          -2.513634560366757e-05
        ],
        [
          -0.0004890914712061395,
          -4.65946970007996e-05,
          -1.9766984700832938e-05,
          5.6993462928683534e-05,
          -0.0002119906739364136,
          -0.0005500799207780512,
          -9.509469976606045e-05,
          0.0001560831493386093,
          0.01404019015178231,
          -0.00046563572328801623
        ],
        [
          -0.0003232375294304401,
          -1.221938304991438e-07,
          4.325735757967385e-05,
          -0.00032394910664270625,
          -0.0004059530103754738,
          -0.00020132700037102456,
          -9.677418345832865e-05,
          -2.5136345603684117e-05,
          -0.00046563572328801634,
          0.0045970267057533765
        ]
      ],
      "residual_variance": 5.9066891057695905,
      "t_value": 1.9609287890156264
    }
  }
};
