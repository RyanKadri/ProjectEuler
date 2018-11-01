function pandigitalProducts() {
    const products = new Set();
    searchProducts([], [1,2,3,4,5,6,7,8,9]);
    return Array.from(products).reduce((acc, el) => acc + el);
    
    function searchProducts(selected, toChoose) {
        if(toChoose.length === 1) {
            const toTest = selected.concat(toChoose[0]);
            const res = isPanProduct(toTest)
            if(res > 0) {
                products.add(res);
            }
        } else {
            for(let currPos = 0; currPos < toChoose.length; currPos++) {
                searchProducts([...selected, toChoose[currPos]], toChoose.filter((_, i) => i !== currPos))
            }
        }
    }

    /* Note that this function is technically not correct. It will only check 3 digit * 2 digit and 4 digit * 1 digit.
       Some orderings will return a false negative. The opposite order will return a correct positive so we don't need to
       check 2d * 3d and 1d * 4d
     */
    function isPanProduct(numArray) {
        const last4 = toNum(numArray.slice(5,9));
        if(
            (toNum(numArray.slice(0,3)) * toNum(numArray.slice(3,5)) === last4) ||
            (toNum(numArray.slice(0,4)) * toNum(numArray.slice(4,5)) === last4)
        ) {
            return last4;
        } else {
            return -1;
        }
    }

    function toNum(numArray) {
        const factors = [1, 10, 100, 1000];
        let sum = 0;
        for(let i = 0; i < numArray.length; i++) {
            sum += numArray[i] * factors[i];
        }
        return sum;
    }
}

console.log(pandigitalProducts());