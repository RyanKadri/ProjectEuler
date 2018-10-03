function circularPrimes(belowN) {
    const primes = [2, 3];
    for(let testNum = 6; testNum < belowN; testNum += 6) {
        if(isPrime(testNum + 1)) {
            primes.push(testNum + 1);
        } 
        if (isPrime(testNum - 1)) {
            primes.push(testNum - 1);
        }
    }
    const primeSet = new Set(primes);
    return primes.filter(prime => {
        return calcRotations(prime)
            .every(rotation => primeSet.has(rotation));
    });

    function isPrime(testNum) {
        for(const prime of primes) {
            if(prime ** 2 > testNum) {
                return true;
            } else if (testNum % prime === 0) {
                return false;
            }
        }
        return true;
    }

    function calcRotations(num) {
        return String(num).split("").map((_, i, arr) => 
            parseInt(
                arr.slice(i)
                    .concat(arr.slice(0,i))
                    .join("")
            )
        );
    }
}

console.log(circularPrimes(1000000));