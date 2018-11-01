function maxPowerDigitSum(maxA,maxB) {
    let max = 0;
    for(let a = 1; a < maxA; a++) {
        for(let b = 1; b < maxB; b++) {
            const currSum = digitSum(pow(toDigits(a),b));
            if(currSum > max) {
                max = currSum;
            }
        }
    }
    return max;

    function digitSum(digits) {
        return digits.reduce((acc, el) => acc + el || 0);
    }

    function pow(a,b) {
        debugger;
        const powers = [{ pow: 1, val: a }];
        let currPow = 1;
        let val = a;
        while(currPow * 2 <= b) {
            val = mult(val, val);
            currPow *= 2;
            powers.push({ pow: currPow, val });
        }
        for(let i = powers.length - 2; i >= 0 && currPow < b; i--) {
            if(b - currPow >= powers[i].pow) {
                val = mult(val, powers[i].val);
                currPow += powers[i].pow;
            }
        }
        return val;
    }

    function mult(a,b) {
        const res = [];
        a = a.slice().reverse(); // This is not necessary but it makes the code a bit easier to read
        b = b.slice().reverse();
        for(let bPos = 0; bPos < b.length; bPos++) {
            const bDig = b[bPos];
            for(let aPos = 0; aPos < a.length; aPos++) {
                const aDig = a[aPos];
                const pos = aPos + bPos;
                let val = aDig * bDig;
                let offset = 0
                while(val > 0) {
                    val = val + (res[pos + offset] || 0);
                    res[pos + offset] = val % 10;
                    val = Math.floor(val / 10);
                    offset ++;
                }
            }
        }
        return res.reverse();
    }

    function toDigits(num) {
        const res = [];
        while(num > 0) {
            res.unshift(num % 10);
            num = Math.floor(num / 10);
        }
        return res;
    }
}

console.log(maxPowerDigitSum(100,100))