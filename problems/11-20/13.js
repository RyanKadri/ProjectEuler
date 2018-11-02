// The trick here is that with 100 numbers, we can only ever carry two decimal places forward.

function firstNDigitsOfSum(vals, nDigits) {
    const digitsToInclude = nDigits + Math.log10(nDigits);
    const sum = vals.map(row => row.substr(0, digitsToInclude))
        .map(row => parseInt(row))
        .reduce((acc, row) => acc + row, 0);
    return `${sum}`.substr(0, nDigits);
}

let vals;

if(typeof window === 'undefined'){
    vals = require('fs').readFileSync('./resources/13.txt', { encoding: 'utf8'});
} else { 
    vals = document.querySelector('.problem_content div').innerText
}

console.log(firstNDigitsOfSum(vals.trim().split("\n"), 10));