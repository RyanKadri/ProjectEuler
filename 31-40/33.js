function digitCancelling() {

    const fractions = [];
    for(let numFirst = 1; numFirst <= 9; numFirst++) {
        for(let numSecond = 1; numSecond <= 9; numSecond++) {
            for(denomDigit = 1; denomDigit <= 9; denomDigit++) {
                const num = [numFirst, numSecond];
                const firstReduced = { num: numSecond, denom: denomDigit };
                const firstOption = { num , denom: [numFirst, denomDigit], reduced: firstReduced};
                const secondOption = { num , denom: [denomDigit, numFirst], reduced: firstReduced};
                const secondReduced = { num: numFirst, denom: denomDigit};
                const thirdOption = { num, denom: [numSecond, denomDigit], reduced: secondReduced};
                const fourthOption = { num, denom: [denomDigit, numSecond], reduced: secondReduced};

                for(const choice of [firstOption, secondOption, thirdOption, fourthOption]) {
                    if(nonTrivialReducible(choice)) {
                        fractions.push(toFraction(choice));
                    }
                }
            }
        }
    }
    const product = fractions.filter(frac => frac.num !== frac.denom && frac.num < frac.denom)
        .reduce((acc, el) => ({ num: acc.num * el.num, denom: acc.denom * el.denom }));
    return realReduce(product);

    function nonTrivialReducible(fractionIsh) {
        const actual = realReduce(toFraction(fractionIsh));
        const reduced = realReduce(fractionIsh.reduced);
        return actual.num === reduced.num && actual.denom === reduced.denom;
    }

    function realReduce(fraction) {
        for(let test = fraction.denom; test > 1; test --) {
            if(fraction.denom % test === 0 && fraction.num % test === 0) {
                return { num: fraction.num / test, denom: fraction.denom / test};
            }
        }
        return fraction;
    }

    function toFraction(fractionIsh) {
        const num = fractionIsh.num[0] * 10 + fractionIsh.num[1];
        const denom = fractionIsh.denom[0] * 10 + fractionIsh.denom[1];
        return { num, denom }
    }
}

console.log(digitCancelling());