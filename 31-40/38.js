function largestConcat() {
    let largestSum = 0;
    for(let i = 1; i < 10000; i++) {
        const sum = concatSum(i);
        if(sum && sum > largestSum && isPandigital(sum)) {
            largestSum = sum;
            console.log(i);
        }
    }
    return largestSum;

    function concatSum(n) {
        let sum = n;
        for(let i = 2; i <= 9; i++) {
            let nextProd = n * i;
            let pow10 = getNextPow10(nextProd);
            sum = sum * pow10 + nextProd;
            if(sum < 100000000) {
                continue;
            } else if(sum >= 100000000 && sum < 1000000000) {
                return sum;
            } else {
                return;
            }
        }
    }

    function getNextPow10(n) {
        let pow10 = 10;
        while(pow10 <= n) {
            pow10 *= 10;
        }
        return pow10;
    }

    function isPandigital(n) {
        let numSet = new Set()
        while(n > 0) {
            numSet.add(n % 10);
            n = Math.floor(n / 10);
        }
        numSet.delete(0)
        return numSet.size === 9;
    }
}

console.log(largestConcat())