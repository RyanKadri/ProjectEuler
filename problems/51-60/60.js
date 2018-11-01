// TODO - Improve code quality 
// This is not guaranteed to give the smallest qunituplet. Since they seem to be pretty rare, this does the trick
function primePairSets() {
    const numGenerated = 100000;
    const primes = generatePrimes(numGenerated);
    const primeSet = new Set(primes);
    const maxGenerated = primes[primes.length - 1];
    const cachedPairs = new Map();

    let max = 6;
    while(true) {
        const maxPrime = primes[max];
        for(let h = 5; h < max; h++) {
            const hPrime = primes[h];
            if(!isGoodPair(hPrime, maxPrime)) continue;
            for(let i = 4; i < h; i++) {
                const iPrime = primes[i];
                if(!isGoodPair(iPrime, hPrime) || !isGoodPair(iPrime, maxPrime)) continue;
                for(let j = 3; j < i; j++) {
                    const jPrime = primes[j];
                    if(!isGoodPair(jPrime, iPrime) || !isGoodPair(jPrime, hPrime) || !isGoodPair(jPrime, maxPrime)) continue;
                    for(let k = 1; k < j; k++) {
                        const kPrime = primes[k];
                        if(!isGoodPair(kPrime, jPrime) || !isGoodPair(kPrime, iPrime) || !isGoodPair(kPrime, hPrime) || !isGoodPair(kPrime, maxPrime)) continue;
                        return kPrime + jPrime + iPrime + hPrime + maxPrime;
                    }
                }
            }
        }
        max++;
    }
    
    function isGoodPair(a, b) {
        const cached = cachedPairs.get(hash(a,b));
        if(cached !== undefined) {
            return cached;
        } else {
            const res = isPrime(a * pow10(b) + b) && isPrime(b * pow10(a) + a)
            cachedPairs.set(hash(a,b), res);
            return res;
        }
        function hash(a,b) {
            return a * 100000 + b;
        }
    }

    function pow10(num) {
        let pow = 1;
        while(pow <= num) {
            pow *= 10;
        }
        return pow;
    }

    function generatePrimes(upToN) {
        const primes = new Array(5000)
        primes[0] = 2; primes[1] = 3; let curr = 2;
        const arr = new Array(upToN);
        const upperBound = Math.floor(Math.sqrt(upToN));
        let testNum;
        for(testNum = 6; testNum <= upToN; testNum += 6) {
            checkNum(testNum - 1);
            checkNum(testNum + 1);
        }
        return primes;

        function checkNum(num) {
            if(!arr[num - 1]) {
                primes[curr++] = num;
                if(num < upperBound) {
                    for(let future = num * 2; future < upToN; future += num) {
                        arr[future - 1] = true;
                    }
                }
            }
        }
    }

    // It's quick to precalculate primes up to 10M (or whatever is needed) but it looks that
    // causes memory turbulence (probably especially with sets). This approach uses less memory and hits the
    // cache better
    function isPrime(num) {
        if(primeSet.has(num)) {
            return true
        } else {
            if(num < maxGenerated) {
                return false;
            } else {
                const upperBound = Math.floor(Math.sqrt(num));
                for(const prime of primes) {
                    if(prime > upperBound) return true;
                    if(num % prime === 0) {
                        return false;
                    }
                }
                for(let testNum = manualPrimeStart; testNum <= upperBound; testNum += 6) {
                    if(num % (testNum - 1) === 0) return false;
                    if(num % (testNum + 1) === 0) return false;
                }
                return true;
            }
        }
    }
}

(function () {
    const start = Date.now();
    console.log(primePairSets())
    const stop = Date.now();
    console.log(`Took ${(stop - start) / 1000} seconds`)
})()