function doubleBasePalindromes(upTo) {
    const decimalPalindromes = generatePalindromes(upTo);
    return decimalPalindromes.filter(isBinaryPalindrome);

    function isBinaryPalindrome(num) {
        let currPow = 0;
        while(2 ** currPow <= num) {
            currPow++;
        }
        currPow --;
        while(num > 0 && currPow > 0) {
            const powVal = 2**currPow;
            if(num > powVal && num % 2 === 1) {
                num = (num - powVal - 1) / 2;
                currPow -= 2;
            } else if(num < powVal && num % 2 === 0) {
                num /= 2;
                currPow -= 2
            }else {
                return false;
            }
        }
        return true;
    }

    function generatePalindromes(upTo) {
        const maxDigits = String(upTo).length;
        const palindromes = [];
        for(let digits = 1; digits < maxDigits; digits ++) {
            const mirroredDigits = Math.floor(digits / 2);
            const freeDigit = digits % 2 === 1;
            if(mirroredDigits === 0) continue;
            for(let mirrored = 10 ** (mirroredDigits - 1); mirrored < 10 ** (mirroredDigits); mirrored++) {
                if(freeDigit) {
                    for(let free = 0; free <= 9; free++) {
                        palindromes.push(parseInt(String(mirrored) + free + String(mirrored).split("").reverse().join("")))
                    }
                } else {
                    palindromes.push(parseInt(String(mirrored) + String(mirrored).split("").reverse().join("")))
                }
            }
        }
        return [1,2,3,4,5,6,7,8,9].concat(palindromes);
    }
}

console.log(doubleBasePalindromes(1000000)
// .reduce((acc, el) => acc + el)
)