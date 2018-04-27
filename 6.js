function sumSquares(ofArray) {
    return ofArray.reduce((acc, el) => acc + el ** 2, 0);
}

function squareSum(ofArray) {
    return ofArray.reduce((acc, el) => acc + el, 0) ** 2;
}

const nums = (new Array(100)).fill().map((_, i) => i + 1);
console.log(squareSum(nums) - sumSquares(nums));