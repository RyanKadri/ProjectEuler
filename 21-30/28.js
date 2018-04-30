function smartCalcDiagonals(spiralSize) {
    const diags = [1];
    for(let currLayer = 1; currLayer <= (spiralSize - 1) / 2; currLayer ++) {
        let lastDiag = diags[diags.length - 1];
        diags.push(lastDiag + 2 * currLayer);
        diags.push(lastDiag + 4 * currLayer);
        diags.push(lastDiag + 6 * currLayer);
        diags.push(lastDiag + 8 * currLayer);
    }
    return diags;
}

/** Brute-force approach in memory because why not? */
function calcDiagnalsForSpiralNums(spiralSize) {
    const startGrid = new Array(spiralSize)
        .fill().map(row => new Array(spiralSize).fill());
    let currX = (startGrid.length - 1) / 2, currY = currX;
    let currNum = 1, sideLength = 1, numsInLayer = 0;
    while(currNum <= spiralSize * spiralSize) {
        startGrid[currX][currY] = currNum;
        currNum++;
        numsInLayer++;
        if(numsInLayer >= (sideLength - 1) * 4) {
            sideLength += 2;
            numsInLayer = 0;
            currX ++;
        } else if(numsInLayer < sideLength - 1) {
            currY ++;
        } else if(numsInLayer >= sideLength -1 && numsInLayer < 2 * (sideLength - 1)) {
            currX --;
        } else if(numsInLayer >= 2 * (sideLength - 1) && numsInLayer < 3 * (sideLength - 1)) {
            currY --;
        } else {
            currX++;
        }
    }
    return [
        1,
        ...getLineFromCenter(startGrid, (x, y) => [x + 1, y - 1]),
        ...getLineFromCenter(startGrid, (x, y) => [x + 1, y + 1]),
        ...getLineFromCenter(startGrid, (x, y) => [x - 1, y + 1]),
        ...getLineFromCenter(startGrid, (x, y) => [x - 1, y - 1]),
    ];

    function getLineFromCenter(ofGrid, nextPoint) {
        let currX = (ofGrid.length - 1) / 2, currY = currX;
        const res = [];
        [currX, currY] = nextPoint(currX, currY);
        while(ofGrid[currX] !== undefined && ofGrid[currX][currY] !== undefined) {
            res.push(ofGrid[currX][currY])
            next = nextPoint(currX, currY);
            currX = next[0], currY = next[1];
        }
        return res;
    }
}

console.log(calcDiagnalsForSpiralNums(1001).reduce((acc, el) => acc + el, 0));
console.log(smartCalcDiagonals(1001).reduce((acc, el) => acc + el, 0));