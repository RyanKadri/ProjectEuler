// Not really worth optimizing
function powerfulDigitCounts() {
    let count = 0;
    for(let i = 1; i <= 9; i++) {
        for(let j = 1; j <= 22; j++) {
            if(Math.floor(Math.log10(i ** j)) + 1 === j) {
                count ++;
            } else {
                break;
            }
        }
    }
    return count;
}

console.log(powerfulDigitCounts())