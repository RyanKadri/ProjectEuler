function findNumbersEqualToSumOfNthPowerDigits(nthPower) {
    const upperBound = calcUpperBound();
    const res = [];
    for(let testVal = 10; testVal < upperBound; testVal++) {
        if(testVal === sumPowDigits(testVal)) {
            res.push(testVal);
        }
    }
    return res;

    function sumPowDigits(val) {
        const digits = `${val}`.split("").map(dig => parseInt(dig));
        return digits.reduce((acc, dig) => acc + dig ** nthPower, 0);
    }

    function calcUpperBound() {
        let test = 1;
        while((10 ** (test + 1) - 1) / test < 9 ** nthPower) {
            test++;
        }
        return 9 ** (nthPower) * (test + 1);
    }
}

console.log(
    findNumbersEqualToSumOfNthPowerDigits(5)
        .reduce((acc, el) => acc + el, 0)
);