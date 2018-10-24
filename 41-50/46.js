function firstGoldbachCounterExample() {

    const primes = new Set([2])
    for(const composite of oddComposites()) {
        let squareInd = 0, isCounter = true, twiceSquare;
        do {
            squareInd ++;
            twiceSquare = 2 * squareInd ** 2;
            if(primes.has(composite - twiceSquare)) {
                isCounter = false;
            }
        } while(twiceSquare < composite && isCounter)
        if(isCounter) {
            return composite;
        }
    }

    function* oddComposites() {
        let testNum = 3;
        while(true) {
            let isComposite = false;
            const upperBound = testNum > 1000 ? Math.floor(Math.sqrt(testNum)) : testNum;
            for(const prime of primes) {
                if(prime > upperBound) break;
                if(testNum % prime === 0) {
                    isComposite = true;
                    break;
                }
            }
            if(isComposite) {
                yield testNum
            } else {
                primes.add(testNum);
            }

            testNum += 2;
        }
    }
}

console.log(firstGoldbachCounterExample());