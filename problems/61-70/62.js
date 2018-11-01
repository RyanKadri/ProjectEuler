function cubicPermutations(nPermutations) {
    const permMap = new Map();

    let cubeBase = 1;
    while(true) {
        const cube = cubeBase ** 3;
        const permHash = hash(cube);
        const hashVal = permMap.get(permHash) || { rep: cube, count: 0 };
        if(++hashVal.count === nPermutations) {
            return hashVal.rep;
        }
        permMap.set(permHash, hashVal)
        cubeBase++;
    }

    function hash(num) {
        let res = 0;
        while(num > 0) {
            const lsd = num % 10;
            res += 10 ** lsd;
            num = Math.floor(num / 10);
        }
        return res;
    }
}

console.log(cubicPermutations(5))