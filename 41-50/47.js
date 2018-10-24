function consecutivePrimes(n) {
    const primes = new Set([2,3]);
    let currNum = 2;
    let maxTest = 3;
    let sequence = [];
    while(sequence.length < n) {
        if(currNum > maxTest) {
            generatePrimes(maxTest, maxTest + 1000);
            maxTest = maxTest + 1000;
        }
        let remainder = currNum;
        let factorCount = 0;
        for(const prime of primes) {
            if(factorCount > n || prime > remainder) break;
            if(remainder % prime === 0){
                factorCount ++;
                while(remainder % prime === 0) {
                    remainder /= prime;
                }
            }
        }
        if(factorCount >= n) {
            sequence.push(currNum);
        } else {
            sequence = [];
        }
        currNum ++;
    }
    return sequence;

    function generatePrimes(fromN, upToN) {
        const startAt = (Math.ceil(fromN / 6)) * 6;
        for(let testNum = startAt; testNum <= upToN; testNum += 6) {
            checkPrime(testNum - 1);
            checkPrime(testNum + 1);
        }

        function checkPrime(testNum) {
            let wasPrime = true;
            let upperBound = testNum;
            if(testNum > 1000) {
                upperBound = Math.floor(Math.sqrt(testNum));
            }
            for(const prime of primes) {
                if(testNum % prime === 0) {
                    wasPrime = false;
                    break;
                } else if(prime > upperBound) {
                    break;
                }
            }
            if(wasPrime) {
                primes.add(testNum)
            }
            return wasPrime;
        }
    }
}

console.log(consecutivePrimes(4))