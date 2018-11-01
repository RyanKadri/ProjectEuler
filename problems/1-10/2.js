function sumEvenFibs(target) {
    let sum = 2;
    let nMinus2 = 1, nMinus1 = 1, next = 2;
    while(next < target) {
        next = nMinus1 + nMinus2;
        if(next % 2 === 0) {
            sum += next;
        }
        nMinus2 = nMinus1;
        nMinus1 = next;
    }
    return sum;
}

console.log(sumEvenFibs(4000000));