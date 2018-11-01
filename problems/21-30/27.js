function maxQuadraticPrimeCoefficientsUnder(target) {
    // TODO - The 10 here is a hack but is probably safe. Prime calculation should be dynamic/cached
    const primes = calcPrimesUnder(10 * target);
    const primeSet = new Set(primes);
    let possibleBs = primes
        .filter(prime => prime <= target);
    
    let maxSequence = 0, bestA, bestB;
    for(const b of possibleBs) {
        for(let a = -target + 1; a < target; a++) {
            if(!primeSet.has(a + b + 1)) continue;
            const length = lengthPrimeSequence(a, b);
            if(length > maxSequence) {
                maxSequence = length;
                bestA = a;
                bestB = b;
            }
        }
    }

    return [bestA, bestB];

    function lengthPrimeSequence(a,b) {
        let n = 0;
        while(primeSet.has(n * n + a * n + b)) n++
        return n;
    }

    function calcPrimesUnder(target) {
        const primes = [2];
        for(let testVal = 3; testVal <= target; testVal += 2) {
            if(isPrime(testVal)) {
                primes.push(testVal);
            }
        }
        return primes;

        function isPrime(val) {
            const cutoff = Math.sqrt(val);
            for(const prime of primes) {
                if(prime > cutoff) {
                    return true;
                } else if(val % prime === 0) {
                    return false;
                }
            }
            return true;
        }
    }

}

console.log(maxQuadraticPrimeCoefficientsUnder(1000).reduce((acc, el) => acc * el, 1));