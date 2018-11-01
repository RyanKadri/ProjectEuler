function largestReciprocalCycleUnder(target) {
    let max = 0;
    for(let testNum = 1; testNum < target; testNum++) {
        max = Math.max(max, lengthReciprocalCycle(testNum))
    }
    return max;

    function lengthReciprocalCycle(divisor) {
        const alreadySeen = new Set();
        let remainder = 1;
        let length = 0;
        while(remainder > 0) {
            if(alreadySeen.has(remainder)) {
                return length;
            } else {
                alreadySeen.add(remainder);
                remainder = (remainder % divisor) * 10 
                length ++;
            }
        }
        return 0;
    }
}

console.log(largestReciprocalCycleUnder(1000))