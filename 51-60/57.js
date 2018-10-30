function squareRootConvergents(expansionsBelowN) {
    let count = 0;
    for(const frac of sqrtIterations()) {
        if(moreDigits(frac.num, frac.denom)) {
            count ++;
        }
    }
    return count;

    function* sqrtIterations() {
        let iterations = 0, frac = {num: 1, denom: 1};
        while(iterations++ <= expansionsBelowN) {
            let denom = frac.num + frac.denom;
            let num = frac.denom + denom;
            frac = reduceFraction({ num, denom });
            yield frac;
        }
    }
    
    //These fractions don't reduce (kinda makes sense for an irrational number). This "reduces" the fraction and still retains enough precision
    function reduceFraction(frac) {
        const res = { ...frac }
        if(frac.num > 100 && frac.denom > 100) {
            res.num /= 10;
            res.denom /= 10;
        }
        return res;
    }

    function moreDigits(a,b) {
        let pow10 = 1;
        while(pow10 < a) {
            pow10 *= 10;
        }
        return Math.floor(b / (pow10 / 10)) === 0
    }
}

console.log(squareRootConvergents(1000))