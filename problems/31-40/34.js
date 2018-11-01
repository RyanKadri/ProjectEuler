function digitFactorials() {
    let sum = 0;
    const factorials = new Array(10).fill().map((_, i) => factorial(i)).reduce((acc, el, i) => { acc[i] = el; return acc }, {});
    for(let num = 10; num < 10000000; num++) {
        if(isSumFactorials(num)) {
            sum += num
        }
    }

    return sum;

    function isSumFactorials(num) {
        let sum = 0;
        for(const digit of "" + num) {
            sum += factorials[digit];
            if(sum > num) return false;
        }
        return sum === num;
    }

    function factorial(n) {
        if(n <= 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }
}

console.log(digitFactorials());