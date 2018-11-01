function* triPentaHexaNumber() {
    const triangles = sequenceFactory(1);
    const pentagons = sequenceFactory(3);
    const hexagons = sequenceFactory(4);

    let pentagon = 0, hexagon = 0;
    for(const triangle of triangles) {
        while(pentagon < triangle) { pentagon = pentagons.next().value }
        while(hexagon < triangle) { hexagon = hexagons.next().value }
        if(triangle === pentagon && triangle === hexagon) {
            yield triangle;
        }
    }

    function sequenceFactory(increment) {
        return (function*() {
            let curr = 0;
            let add = 1;
            while(true) {
                curr = curr + add;
                add += increment;
                yield curr;
            }
        })()
    }
}

(function() {
    const generator = triPentaHexaNumber();
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);
})()