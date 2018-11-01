function firstTriangleNumberWithNDivisors(n) {
    let currTri = 1;
    let inc = 2;
    while(numDivisors(currTri) < n) {
        currTri += inc;
        inc++;
    }
    return currTri;

    function numDivisors(n) {
        const cutoff = Math.sqrt(n);
        let res = 0;
        for(let i = 1; i < cutoff; i++) {
            if(n % i === 0) res += 2;
        }
        if(n % cutoff) res++;
        return res;
    }
}

console.log(firstTriangleNumberWithNDivisors(500));