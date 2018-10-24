function* primeSequencePermutations(sequenceLength, numDigits) {
    const max = 10 ** (numDigits) - 1, min = 10 ** (numDigits - 1);
    const validPrimes = generatePrimes(min, max);
    const primeSet = new Set(validPrimes);
    for(let firstInd = 0; firstInd < validPrimes.length - sequenceLength + 1; firstInd ++) {
        for(let secondInd = firstInd + 1; secondInd < validPrimes.length - sequenceLength + 2; secondInd ++) {
            const first = validPrimes[firstInd], second = validPrimes[secondInd];
            const diff = second - first;
            const sequence = [first, second];
            let isSequence = true;
            for(let next = 2; next < sequenceLength; next ++) {
                const test = first + diff * next;
                if(!primeSet.has(test)) {
                    isSequence = false;
                    break;
                } else {
                    sequence.push(test);
                }
            }
            if(isSequence && isPermutation(sequence)) {
                yield sequence;
            }
        }
    }

    function generatePrimes(min, max) {
        const primes = [2, 3];
        for(let test = 5; test <= max; test += 2) {
            let isPrime = true;
            for(const prime of primes) {
                if(test % prime === 0) {
                    isPrime = false;
                    break;
                }
            }
            if(isPrime) {
                primes.push(test);
            }
        }
        return primes.filter(prime => prime >= min && prime <= max);
    }

    function isPermutation(sequence) {
        const digitSets = sequence.map(num => calcDigits(num));
        const firstSet = digitSets[0];
        const numDigits = firstSet.size;
        for(let i = 1; i < sequence.length; i++) {
            const currSet = digitSets[i];
            if(currSet.size !== numDigits) return false;
            for(const digit of firstSet) {
                if(!currSet.has(digit)) return false;
            }
        }
        return true;
    }

    function calcDigits(num) {
        const res = [];
        let remainder = num;
        while(remainder > 0) {
            res.unshift(remainder % 10);
            remainder = Math.floor(remainder / 10);
        }
        return new Set(res);
    }

}

const generator = primeSequencePermutations(3,4);
console.log(generator.next().value)
console.log(generator.next().value)