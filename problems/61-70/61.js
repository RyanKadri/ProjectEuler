function cyclicalFigurate() {
    const maxNum = 9999, minNum = 1010;
    const groupMaps = [1, 2, 3, 4, 5, 6].map(inc => generateGroup(minNum, maxNum, inc));
    
    let res;
    for(const groupMap of groupMaps) {
        for(const [startPair, endPairs] of groupMap.entries()) {
            for(const endPair of endPairs) {
                res = traverse(groupMaps.filter(map => map !== groupMap), endPair);
                if(res && res.endPair === startPair) {
                    res = { endPair: res.endPair, sum: res.sum + startPair * 100 + endPair };
                    break;
                }
            }
        }
    }
    return res.sum;

    function traverse(groupMaps, startPair) {
        if(groupMaps.length === 1) {
            const endPair = groupMaps[0].get(startPair);
            if(endPair) {
                // Since we know there's only one number like this... 
                return { endPair: endPair[0], sum: startPair * 100 + endPair[0] };
            }
        } else {
            for(const current of groupMaps) {
                const endPairs = current.get(startPair);
                if(endPairs) {
                    const otherMaps = groupMaps.filter(map => map !== current)
                    for(const pair of endPairs) {
                        const res = traverse(otherMaps, pair);
                        if(res) {
                            return { endPair: res.endPair, sum: res.sum + startPair * 100 + pair }
                        }
                    }
                }
            }
        }
    }

    function generateGroup(minNum, maxNum, inc) {
        let adder = 1;
        const res = new Map();
        for(let el = 0; el <= maxNum; el += adder, adder += inc) {
            if(el < minNum) continue;
            const firstDigits = Math.floor(el / 100);
            const lastDigits = el % 100;
            const digitMapping = res.get(firstDigits) || [];
            digitMapping.push(lastDigits);
            res.set(firstDigits, digitMapping);
        }
        return res;
    }
}

(function () {
    const start = performance.now();
    console.log(cyclicalFigurate())
    const stop = performance.now();
    console.log(`Took ${stop - start} ms`)
})()