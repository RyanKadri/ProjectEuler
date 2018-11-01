function noSumInTwoAbundants() {
    const MAX_WITH_NO_SUM = 28123;
    const abundantNums = new Set();
    new Array(MAX_WITH_NO_SUM + 1)
        .fill()
        .map((_, i) => i)
        .map(sumPropDivisors)
        .forEach((sumDivisors, num) => {
            if(sumDivisors > num) {
                abundantNums.add(num);
            }
        });
    let total = 0;
    for(let testNum = 1; testNum <= MAX_WITH_NO_SUM; testNum ++) {
        if(!isSumOfAbundants(testNum)) {
            total += testNum;
        }
    }
    return total;

    function isSumOfAbundants(num) {
        for(const abundant of abundantNums) {
            if(abundant > num) return false;
            else if(abundantNums.has(num - abundant)) {
                return true;
            }
        }
        return false;
    }

    function sumPropDivisors(num) {
        if(num <= 1) return 0;
        let sum = 1;
        const cutoff = Math.sqrt(num);
        for(let testDivisor = 2; testDivisor < cutoff; testDivisor++) {
            if(num % testDivisor === 0) {
                sum += (testDivisor + num / testDivisor);
            }
        }
        if(num % cutoff === 0) sum += cutoff;
        return sum;
    }
}

console.log(noSumInTwoAbundants())