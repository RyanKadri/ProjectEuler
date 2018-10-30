// Note - Can't replace 1,2,4 digits and end up with 8 primes. Will always have >=3 numbers div by 3
// Can't replace last digit. Last digit must be 1,3,7 or 9. Sum of remaining can't be div by 3.
// Generate primes that meet these criteria and contain 3 zeros. Other that rotations of the zeros
// are in a set of precalculated primes

function primeDigitRelpacements(){

    const primes = new Set([2,3]);
    let testNum = 5;
    for(const { prime, mask } of generateCandidates()) {
        let count = 1;
        for(let multiplier = 1; multiplier <= 9; multiplier++) {
            if(primes.has(prime + mask * multiplier)) {
                count ++;
            }
        }
        if(count >= 8) {
            return prime;
        }
    }

    function* generateCandidates() {
        for(const prime of primes) {
            const digits = toDigits(prime);
            let factor = 1;
            const digitCounts = new Array(3).fill().map((_, i) => ({ count: 0, mask: 0, digit: i}));
            for(let i = digits.length - 1; i >= 0; i--) {
                const digit = digits[i];
                if(digit === 0 || digit === 1 || digit === 2) {
                    const marker = digitCounts[digit];
                    marker.count += 1;
                    marker.mask += factor;
                }
                factor *= 10;
            }
            for(counter of digitCounts) {
                if(counter.count >= 3) { //TODO - This is not quite right. Need all permutations of masks;
                    const mask = counter.mask;
                    ensurePrimes(prime + (9 - counter.digit) * mask);
                    yield { prime, mask }
                }
            }
            ensurePrimes(prime + 1000);
        }
    }

    function toDigits(num) {
        const digits = [];
        while(num > 0) {
            digits.unshift(num % 10);
            num = Math.floor(num / 10);
        }
        return digits;
    }

    function isPrime(n) {
        const upperBound = Math.floor(Math.sqrt(n));
        for(const prime of primes) {
            if(prime > upperBound) break;
            if(n % prime === 0) {
                return false;
            }
        }
        primes.add(n);
        return true;
    }

    function ensurePrimes(upToN) {
        while(testNum < upToN) {
            isPrime(testNum);
            testNum += 2;
        }
    }
}

console.log(primeDigitRelpacements())