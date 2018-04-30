// Collect all the needed prime factors and multiply;
function smallestNumberDivisibleByIntsUpTo(n) {
    let factors = [];
    for(let curr = 1; curr <= n; curr ++) {
        let remainder = curr;
        for(const factor of factors) {
            if(factor > curr) break;
            if(curr % factor === 0) {
                remainder /= factor;
            }
        }
        if(remainder > 1) factors.push(remainder);
    }
    return factors.reduce((acc, el) => acc * el, 1);
}

console.log(smallestNumberDivisibleByIntsUpTo(20))