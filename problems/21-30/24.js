/*
 * 01 10 -- 1 permutation for each leading digit
 * 012 021 102 120 201 210 -- 2 for each leading digit
 * 0123 0132 0213 0231 0312 0321 ... -- 6 for each leading digit
 * In general (n)! permutations of n inner digits for each leading
 * So 9! inner permutations for each starting digit
 * Then 8! inner permutations for each next starting digit. Taking remainders
 * allows us to figure out which digits we land on in order
 */

function findNthLexicographicPermutation(withMDigits, nthOrdering) {
    let leftover = nthOrdering - 1, currDigit = 1;
    const availableDigits = new Array(withMDigits).fill().map((_, i) => i);
    const digits = [];
    while(leftover > 0) {
        const numCombinations = fact(withMDigits - currDigit);
        const divResult = Math.floor(leftover / numCombinations)
        digits.push(availableDigits.splice(divResult, 1)[0]);
        leftover = leftover % numCombinations;
        currDigit ++;
        if(availableDigits.length === 0) {
            throw new Error('There were not ' + nthOrdering + ' orderings possible ' +
                'in ' + withMDigits + 'digits');
        }
    }
    if(availableDigits.length > 0) { digits.push(...availableDigits ) }
    return digits.reduce((acc, el) => `${acc}${el}`, "");

    function fact(n) {
        return n <= 1 ? 1 : n * fact(n-1);
    }
}

console.log(findNthLexicographicPermutation(10, 1000000))