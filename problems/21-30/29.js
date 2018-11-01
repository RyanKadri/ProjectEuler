function distinctPowers(upToN) {
    const primeSet = new Set(calcPrimes(upToN));
    const factors = new Set();
    
    for(let a = 2; a <= upToN; a++) {
        calcFactors(a).forEach(factor => {
            factors.add(factor);
        });
    }

    return factors.size;

    function calcFactors(ofN) {
        const baseFactors = [];
        const factors = [];
        let remainder = ofN;
        for(const prime of primeSet) {
            if(prime > remainder) break;
            let factorMultiplicity = 0;
            while(remainder % prime === 0) {
                factorMultiplicity++;
                remainder /= prime;
            }
            if(factorMultiplicity > 0) baseFactors.push({ factor: prime, mult: factorMultiplicity});
        }
        for(let b = 2; b <= upToN; b++) {
            const bFactors = baseFactors.map(factor => ({factor: factor.factor, mult: factor.mult * b}));
            factors.push(serializeFactors(bFactors));
        }
        return factors;
    }

    function serializeFactors(factors) {
        return factors.reduce((acc, factor) => `${acc}*${factor.factor}^${factor.mult}`, '');
    }

    function calcPrimes(upToN) {
        const primes = [2];
        for(let testNum = 3; testNum <= upToN; testNum += 2) {
            if(isPrime(testNum)) {
                primes.push(testNum);
            }
        }
        return primes;
        
        function isPrime(testVal) {
            const cutoff = Math.sqrt(testVal);
            for(const prime of primes) {
                if(prime > cutoff) {
                    return true;
                } else if(testVal % prime === 0) {
                    return false;
                }
            }
            return true;
        }
    }

}

console.log(distinctPowers(100))