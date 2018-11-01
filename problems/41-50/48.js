function selfPowersTrunc(upToN, nDigits) {
    const remainderNum = 10 ** nDigits;
    let sum = 0;
    for(let n = 1; n <= upToN; n++) {
        sum = lastN(sum + calcSelfPower(n));
    }
    return sum;

    function calcSelfPower(n) {
        let acc = 1;
        for(let i = 0; i < n; i++) {
            acc = lastN(acc * n);
        }
        return acc;
    }

    function lastN(n) {
        return n > remainderNum ? n % remainderNum : n
    }
}

console.log(selfPowersTrunc(1000, 10))