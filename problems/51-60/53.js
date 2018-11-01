function combinatoricSelections(minInteresting) {
    let numSelections = 0;
    for(let n = 1; n <= 100; n++) {
        let sub = 0;
        for(let r = 1; r <= n; r++) {
            if(comb(n,r) > minInteresting) {
                sub ++;
            }
        }
        numSelections += sub;
    }
    return numSelections //Never going to use this return for this condition. But hey. Why not?

    function comb(n, r) {
        let res = 1;
        for(let mult = n; mult > (n-r); mult --) {
            res *= mult
        }
        if(res < minInteresting) return 0;
        for(let div = r; div > 1; div --) {
            res /= div;
        }
        return res;
    }
}

console.log(combinatoricSelections(1000000));