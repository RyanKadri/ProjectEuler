function firstFibWithNDigits(n) {
    let lastFib = [1], currFib = [1];
    let currInd = 2;
    let nextFib;
    do {
        nextFib = add(lastFib, currFib);
        lastFib = currFib;
        currFib = nextFib;
        currInd++;
    } while(nextFib.length < n);

    return currInd;

    function add(num1, num2) {
        let num1Ind = num1.length - 1;
        let num2Ind = num2.length - 1;
        const res = [];
        let carry = 0;
        for(let offset = 0; offset <= Math.max(num1Ind, num2Ind); offset ++) {
            const num1Part = num1[num1Ind - offset];
            const num2Part = num2[num2Ind - offset];
            const digitRes = normalize(num1Part) + normalize(num2Part) + carry;
            carry = Math.floor(digitRes / 10);
            res.unshift(digitRes % 10)
        }
        while(carry > 0) {
            res.unshift(carry % 10);
            carry = Math.floor(carry / 10);
        }
        return res;
    }

    function normalize(maybeNum) {
        return maybeNum === undefined ? 0 : maybeNum;
    }
}

console.log(firstFibWithNDigits(1000))