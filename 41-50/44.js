//TODO - Revisit. This takes a long time to run correctly.
function minDiffPentagonals() {
    let minDiff = Number.MAX_VALUE;
    let lastPent = 1
    let currentPent = 5;
    let currInput = 2;
    const pentagonals = [1];
    debugger;

    while((currentPent - lastPent) < minDiff) {
        for(const previous of pentagonals) {
            if((currentPent - previous) < minDiff &&
                isPentagonal(currentPent + previous) && 
                isPentagonal(currentPent - previous)) {
                // Just returning this value gives you the correct result much faster. It is not guaranteed to
                // actually be correct though.
                minDiff = currentPent - previous;
            }
        }
        pentagonals.push(currentPent);
        currInput ++;
        lastPent = currentPent;
        currentPent = pentagonalAt(currInput);
    }

    return minDiff;

    function isPentagonal(n) {
        const calculated = new Map();
        return innerPent();

        function innerPent() {
            const previousAnswer = calculated.get(n);
            if(previousAnswer !== undefined) return previousAnswer;
            const pos = (1 + Math.sqrt(1 + 24 * n)) / 6;
            let res = false;
            if(Math.trunc(pos) === pos) {
                res = true;
            }
            calculated.set(n, res);
            return res;
        }
    }

    function pentagonalAt(n) {
        return n * (3 * n - 1) / 2;
    }
}

console.log(minDiffPentagonals());