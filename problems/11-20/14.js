function longestCollatzUnderMax(max) {
    const collatzMap = new Map();
    let longest = 0, longestStart = 0;
    for(let testVal = 1; testVal < max; testVal++) {
        const cLength = collatzLength(testVal);
        collatzMap.set(testVal, cLength);
        if(cLength > longest) {
            longest = cLength;
            longestStart = testVal;
        }
    }
    return longestStart;

    function collatzLength(ofN) {
        let res;
        if(ofN === 1) return 1;
        else if(collatzMap.has(ofN)) return collatzMap.get(ofN);
        else if(ofN % 2 === 0) {
            res = 1 + collatzLength(ofN / 2);
        }
        else {
            res = 1 + collatzLength(ofN * 3 + 1);
        }
        collatzMap.set(ofN, res);
        return res;
    }
}

console.log(longestCollatzUnderMax(1000000));