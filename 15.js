function routesInGrid(ofSize) {
    resMap = new Map();
    return pathsFromPoint(0,0);

    function pathsFromPoint(x, y) {
        const coord = coordString(x, y);
        if(x >= ofSize || y >= ofSize) {
            return 1;
        } else if(resMap.has(coord)) {
            return resMap.get(coord);
        } else {
            const length = pathsFromPoint(x + 1, y) + pathsFromPoint(x, y + 1);
            resMap.set(coord, length)
            return length;
        }
    }

    function coordString(x, y) {
        return `${x},${y}`;
    }
}

console.log(routesInGrid(20));