// This only works for monotonically increasing functions.
// Luckily x => 2x is one of those...
// Same approach as problem 20
function digitsIterativeFunc(fn, startAt, numIterations) {
    let calcRes = [startAt];
    for(let itNum = 0; itNum < numIterations; itNum++) {
        let carry = 0;
        let nextRes = [];
        for(let currDigit = calcRes.length - 1; currDigit >= 0; currDigit--) {
            let nextDigit = fn(calcRes[currDigit], itNum) + carry;
            nextRes[currDigit] = nextDigit % 10;
            carry = Math.floor(nextDigit / 10);
        }
        while(carry > 0) {
            nextRes.unshift(carry % 10);
            carry = Math.floor(carry / 10);
        }
        calcRes = nextRes;
    }
    return calcRes;
}

console.log(digitsIterativeFunc(a => a*2, 1, 1000).reduce((acc, el) => acc + el, 0));