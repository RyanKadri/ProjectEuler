function truncatablePrimes() {
    const primes = new Set([2,3,5,7]);
    let maxPrime = 7;
    const truncPrimes = [];
    let currGuess = 11;
    while(truncPrimes.length < 11) {
        if(isTruncPrime(currGuess)) {
            truncPrimes.push(currGuess);
        }
        currGuess += 2;
    }
    return truncPrimes;

    function isTruncPrime(num) {
        if(!isPrime(num)) return false;
        const candidates = [];
        let maxPower = 1;
        while(maxPower < num) {
            maxPower *= 10;
        }
        maxPower /= 10;
        for(let i = maxPower; i > 1; i /= 10) {
            candidates.push(num % i);
        }
        for(let i = 10; i <= maxPower; i *= 10) {
            candidates.push(Math.floor(num / i));
        }

        return candidates.every(isPrime)
    }

    function isPrime(num) {
        if(primes.has(num)) return true;
        if(num < maxPrime) return false;

        const sqrt = Math.sqrt(num);
        for(const prime of primes) {
            if(prime > sqrt) break;
            if(num % prime === 0) {
                return false;
            }
        }
        primes.add(num);
        if(num > maxPrime) maxPrime = num;
        return true;
    }
}

console.log(truncatablePrimes().reduce((acc, el) => acc + el))