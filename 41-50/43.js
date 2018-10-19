function panDigitalDivisibility() {

    let sum = 0;
    for(const panDigital of panDigitals(10)) {
        sum += panDigital;
    }
    return sum;

    function* panDigitals(nDigits) {
        let digits = new Array(nDigits).fill().map((_, i) => nDigits - i - 1);
        const checkpoints = { 
            1000: 17, 10000: 13, 100000: 11, 1000000: 7, 10000000: 5, 100000000: 3, 1000000000: 2
        };

        yield* formOptions(digits, 1, 0);
        
        function* formOptions(available, factor, current) {
            for(let pos = 0; pos < available.length; pos ++) {
                const rest = [...available.slice(0, pos), ...available.slice(pos + 1)];
                const factorTest = checkpoints[factor];
                if(factorTest){
                    const toTest = Math.floor(current / (factor / 1000)); 
                    if(toTest % factorTest !== 0) continue;
                }
                if(available.length === 1 && available[0] !== 0) {
                    yield current + available[0] * factor;
                } else {
                    yield* formOptions(rest, factor * 10, current + available[pos] * factor);
                }
            }
        }
    }
}

(function() {
    const start = performance.now();
    const ans = panDigitalDivisibility()
    const end = performance.now();
    console.log(ans)
    console.log(`Took ${end - start} ms`)
})()