function largestPrimeFactor(ofN) {
    if(ofN % 2 === 0) return largestPrimeFactor(ofN / 2);
    for(let testFactor = 3; testFactor < Math.sqrt(ofN); testFactor += 2) {
        if(ofN % testFactor === 0) {
            return largestPrimeFactor(ofN / testFactor);
        } 
    }
    return ofN;
}

console.log(largestPrimeFactor(600851475143))