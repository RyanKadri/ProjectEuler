function findAmicableNumbers(upToN) {
    return new Array(upToN)
        .fill()
        .map((_, ind) => ind)
        .map(findSumOfDivisors)
        .filter((div, ind, divisors) => divisors[div] === ind && divisors[div] !== div);

    function findSumOfDivisors(n) {
        if(n <= 1) return 0;
        let divSum = 1;
        const cutoff = Math.sqrt(n);
        for(let testDiv = 2; testDiv < cutoff; testDiv++) {
            if(n % testDiv === 0) divSum += (testDiv + n / testDiv)
        }
        if(n % cutoff === 0) divSum += cutoff;
        return divSum;
    }
}

console.log(findAmicableNumbers(10000).reduce((acc, el) => acc + el, 0));