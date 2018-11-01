function spiralPrimes() {
    let sideLength = 0, currDiags = [1,1,1,1], numPrimes = 0, numDiags = 1;
    do {
        for(let i = 0; i < currDiags.length; i++) {
            currDiags[i] += 4 * sideLength + (i + 1) * 2;
        }
        for(const diag of currDiags) {
            if(isPrime(diag)) {
                numPrimes ++;
            }
        }
        sideLength += 2;
        numDiags += 4;
    } while(numPrimes / numDiags > 0.1)
    return sideLength + 1;

    function isPrime(num) {
        if(num === 2 || num === 3) return true;
        if(num % 2 === 0 || num % 3 === 0) {
            return false;
        }
        const upperBound = Math.floor(Math.sqrt(num));
        for(let i = 5; i <= upperBound; i+=2) {
            if(num % i === 0) {
                return false;
            }
        }
        return true;
    }

}

console.log(spiralPrimes())