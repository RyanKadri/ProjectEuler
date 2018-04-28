// The trick here is that with 100 numbers, we can only ever carry two decimal places forward.

function firstNDigitsOfSum(vals, nDigits) {
    const digitsToInclude = nDigits + Math.log10(nDigits);
    const sum = vals.map(row => row.substr(0, digitsToInclude))
        .map(row => parseInt(row))
        .reduce((acc, row) => acc + row, 0);
    return `${sum}`.substr(0, nDigits);
}

const vals = document.querySelector('.problem_content div').innerText
    .trim()
    .split("\n")

console.log(firstNDigitsOfSum(vals, 10));