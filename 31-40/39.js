function maxIntegerRightTriangles(upToPerimeter) {
    const squareMap = new Map()
    const perimMap = new Map();
    for(let i = 1; i <= Math.floor(upToPerimeter / 2); i++) {
        squareMap.set(i * i, i);
    }
    for(const [cSquare, c] of squareMap.entries()) {
        for(const [bSquare, b] of squareMap.entries()) {
            if(b >= c) break;
            const a = squareMap.get(cSquare - bSquare);
            if(a > b) continue;
            const perim = a + b + c;
            if(a && perim <= upToPerimeter) {
                perimMap.set(perim, (perimMap.get(perim) || 0) + 1);
            }
        }
    }
    let maxPerim = 0;
    let maxVal = 0;
    for(const [perim, val] of perimMap.entries()) {
        if(val > maxVal) {
            maxPerim = perim;
            maxVal = val;
        }
    }
    return maxPerim;
}

console.log(maxIntegerRightTriangles(1000))