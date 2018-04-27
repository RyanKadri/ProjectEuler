/* For this solution, imagine a number grid with cols and rows from 100-999.
 * This starts at 999,999 and iterates through the possible number pairs in product-size order
 * until it finds one where the pair's product is a palindrome. This will be the largest.
 */

function largestPalindromeProduct() {
    let a = 999, b = 999;
    while(!isPalindrome(a * b)) {
        if(a === 999) {
            const midpoint = (999 + b - 1) / 2;
            a = Math.floor(midpoint);
            b = Math.ceil(midpoint);
        } else {
            a += 1;
            b -= 1;
        }
    }
    return a * b;
}

function isPalindrome(num) {
    let str = "" + num;
    return innerPal(str);

    function innerPal(str) {
        if(str.length <= 1) {
            return true;
        } else {
            return str[0] === str[str.length - 1] && 
                innerPal(str.substring(1, str.length - 1));
        }
    }
}

console.log(largestPalindromeProduct())