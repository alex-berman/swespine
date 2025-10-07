// Based on Dolan, Paul DPhil. Modeling Valuations for EuroQol Health States. Medical Care 35(11):p 1095-1108, November 1997.

export function calculateEQ5DIndex(state) {
    const coefficients = {
        a: 0.081,
        MO: 0.069,
        SC: 0.104,
        UA: 0.036,
        PD: 0.123,
        AD: 0.071,
        M2: 0.176,
        S2: 0.006,
        U2: 0.022,
        P2: 0.140,
        A2: 0.094,
        N3: 0.269
    };

    const { mobility, selfCare, usualActivities, painDiscomfort, anxietyDepression } = state;
    if(mobility === 1 && selfCare === 1 && usualActivities === 1 && painDiscomfort === 1 && anxietyDepression === 1) {
      return 1;
    }

    // Derive the values for MO, SC, UA, PD, AD
    const MO = (mobility === 2) ? 1 : (mobility === 3) ? 2 : 0;
    const SC = (selfCare === 2) ? 1 : (selfCare === 3) ? 2 : 0;
    const UA = (usualActivities === 2) ? 1 : (usualActivities === 3) ? 2 : 0;
    const PD = (painDiscomfort === 2) ? 1 : (painDiscomfort === 3) ? 2 : 0;
    const AD = (anxietyDepression === 2) ? 1 : (anxietyDepression === 3) ? 2 : 0;

    // Derive the values for M2, S2, U2, P2, A2
    const M2 = (mobility === 3) ? 1 : 0;
    const S2 = (selfCare === 3) ? 1 : 0;
    const U2 = (usualActivities === 3) ? 1 : 0;
    const P2 = (painDiscomfort === 3) ? 1 : 0;
    const A2 = (anxietyDepression === 3) ? 1 : 0;

    // Derive the value for N3
    const N3 = (mobility === 3 || selfCare === 3 || usualActivities === 3 || painDiscomfort === 3 || anxietyDepression === 3) ? 1 : 0;

    // Calculate Y
    return 1 - (
      coefficients.a +
      coefficients.MO * MO +
      coefficients.SC * SC +
      coefficients.UA * UA +
      coefficients.PD * PD +
      coefficients.AD * AD +
      coefficients.M2 * M2 +
      coefficients.S2 * S2 +
      coefficients.U2 * U2 +
      coefficients.P2 * P2 +
      coefficients.A2 * A2 +
      coefficients.N3 * N3
    );
}
