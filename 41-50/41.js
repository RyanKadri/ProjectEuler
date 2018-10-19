function largestPanDigitalPrime(){
    for(let nDigits = 7; nDigits >= 1; nDigits --) {
        for(const panDigital of sortedPandigitals(nDigits)) {
            if(isPrime(panDigital)) {
                return panDigital;
            }
        }
    }

    function* sortedPandigitals(nDigits) {
        let digits = new Array(nDigits).fill().map((_, i) => nDigits - i);
        yield* formOptions(digits, 10 ** (nDigits - 1), 0);
        
        function* formOptions(available, factor, current) {
            if(available.length === 1) yield current + available[0];
            for(let pos = 0; pos < available.length; pos ++) {
                const rest = [...available.slice(0, pos), ...available.slice(pos + 1)];
                yield* formOptions(rest, factor / 10, current + available[pos] * factor);
            }
        }
    }

    function isPrime(num) {
        const upperBound = Math.floor(Math.sqrt(num));
        if(num % 2 === 0 || num % 3 === 0) return false;
        for(let test = 6; test <= upperBound; test += 6) {
            if((num % (test + 1) === 0) || (num % (test - 1) === 0)) {
                return false;
            }
        }
        return true;
    }
}

(function() {
    const start = performance.now();
    console.log(largestPanDigitalPrime());
    const end = performance.now();
    console.log(`Elapsed time: ${(end - start)} ms`)
})()