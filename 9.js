function findTripletProduct() {
    for(let a = 1; a < 332; a++) {
        for(let b = a; b < 499; b++) {
            const c = 1000 - a - b;
            if(a * a + b * b === c * c) {
                console.log(`a: ${a}, b: ${b}, c: ${c}`);
                return a * b * c;
            }
        }
    }
}

console.log(findTripletProduct());