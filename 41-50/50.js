function largestConsecutivePrimes(belowN) {

    const primeSet = generatePrimes();
    const primes = Array.from(primeSet)

    let sum = 0, firstInd = 0, endInd = 0;
    for(endInd = 0; sum + primes[endInd] < belowN; endInd ++) {
        sum += primes[endInd];
    }

    let maxSeq = 0, maxSum = 0;
    let tempSum = sum, tempEnd = endInd, found = false;
    while(!found) {
        tempSum -= primes[tempEnd--];
        if(primeSet.has(tempSum)) {
            maxSeq = tempEnd - firstInd;
            maxSum = tempSum;
            found = true;
        }
    }

    tempSum = sum, tempEnd = endInd, found = false;
    while(!found && (tempEnd - firstInd) > maxSeq) {
        tempSum -= primes[firstInd++];
        const additionCandidate = primes[endInd + 1];
        if(tempSum + additionCandidate < belowN) {
            tempSum += additionCandidate;
            endInd ++;
        }
        if(primeSet.has(tempSum)) {
            maxSeq = tempEnd - firstInd;
            maxSum = tempSum;
            found = true;
        }
    }

    return {maxSeq, maxSum};

    function generatePrimes(){
        const primes = new Set([2,3]);
        for(let test = 6; test <= belowN - 1; test += 6) {
            checkPrime(test - 1);
            checkPrime(test + 1);
        }
        return primes;

        function checkPrime(n) {
            const upperBound = n > 1000 ? Math.floor(Math.sqrt(n)) : n;
            for(const prime of primes) {
                if(prime > upperBound) break;
                if(n % prime === 0) {
                    return;
                }
            }
            return primes.add(n);
        }
    }
}

console.log(largestConsecutivePrimes(1000000))