function lychrelsUpTo(belowN) {
    const theoreticalLychrelLimit = 50;
    let count = 0;
    for(let testNum = 1; testNum <= belowN; testNum++) {
        let lyIteration = testNum, numIterations = 0, isPal = false;
        do {
            lyIteration = iterate(lyIteration);
            isPal = isPalindrome(lyIteration);
            numIterations ++;
        } while(!isPal && numIterations <= theoreticalLychrelLimit);
        if(!isPal) {
            count ++;
        }
    }
    return count;

    function iterate(num) {
        const revNum = reverse(num);
        return num + revNum;
    }

    function reverse(num) {
        let msd = maxPow10(num), acc = 0;
        while(num > 0) {
            acc = acc + (num % 10) * msd;
            num = Math.floor(num / 10);
            msd /= 10;
        }
        return acc;
    }

    function isPalindrome(num) {
        return num === reverse(num);
    }

    function maxPow10(num) {
        let pow10 = 1;
        while(pow10 <= num) {
            pow10 *= 10;
        }
        return pow10 / 10;
    }
}

console.log(lychrelsUpTo(10000))