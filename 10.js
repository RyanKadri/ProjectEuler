function sumPrimesBelow(n) {
    const primes = [2];
    let testVal = 3;
    while(testVal < n) {
        if(isPrime(testVal)) primes.push(testVal);
        testVal += 2;
    }
    return primes.reduce((acc, el) => acc + el, 0);

    function isPrime(val) {
        const stopPoint = Math.sqrt(val);
        for(const prime of primes) {
            if( val % prime === 0 ) return false;
            else if(prime > stopPoint) break
        }
        return true;
    }
}

console.log(sumPrimesBelow(2000000));