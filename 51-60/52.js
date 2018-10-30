function permutedMultiples() {

    let test = 1, found;
    do {
        if(test === 142857) debugger;
        const startDigest = calcDigest(test);
        found = true;
        for(let mult = 2; mult <= 6 && found; mult++) {
            if(calcDigest(mult * test) !== startDigest){
                found = false;
            }
        }
        test ++ ;
    } while(!found);

    return test - 1;

    function calcDigest(n) {
        let acc = 0;
        while(n > 0) {
            const digit = n % 10;
            acc += 10 ** digit;
            n = Math.floor(n / 10)
        }
        return acc;
    }
}

console.log(permutedMultiples())