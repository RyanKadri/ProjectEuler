function nthPrime(n) {
    const primes = [2];
    let test = 3;
    while(primes.length < n) {
        if(isPrime(test)) {
            primes.push(test);
        }
        test += 2;
    }
    return primes.pop();

    function isPrime(num) {
        const stopPoint = Math.sqrt(num);
        for(const prime of primes) {
            if(num % prime === 0) return false;
            else if(prime > stopPoint) break;
        }
        return true;
    }
}

console.log(nthPrime(10001))