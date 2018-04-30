function largestProductSequence(inString, ofLength) {
    const nums = inString.split('').map(el => parseInt(el));
    let largest = 0;
    for(let i = 0; i < nums.length - ofLength + 1; i++) {
        let currProduct = nums.slice(i, i + ofLength).reduce((acc, i) => acc * i, 1);
        largest = Math.max(largest, currProduct);
    }
    return largest;
}

const numString = document.querySelector(".problem_content p:nth-child(2)").innerText.replace(/\s/g, '')
console.log(largestProductSequence(numString, 13));