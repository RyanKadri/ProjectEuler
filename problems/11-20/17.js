function num2Word(num) {
    const lowNums = ['one', 'two', 'three', 'four', 'five',
                      'six', 'seven', 'eight', 'nine', 'ten',
                      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
                      'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const HUNDRED = 'hundred';
    const THOUSAND = 'thousand';
    
    if(num === 0) {
        return '';
    } else if(num <= lowNums.length) {
        return lowNums[num - 1];
    } else if(num >= 20 && num <= 99) {
        return tens[Math.floor(num / 10) - 2] + ' ' + num2Word(num % 10);
    } else if(num >= 100 && num <= 999) {
        const hundredPart = num2Word(Math.floor(num / 100)) + ' ' + HUNDRED;
        const tensPart = (num % 100 > 0 ? ' and ' + num2Word(num % 100) : '');
        return hundredPart + tensPart;
    } else if(num === 1000) {
        return lowNums[0] + ' ' + THOUSAND;
    } else {
        throw new Error(`Oh no ${num}. What do?`)
    }
}

console.log(
    new Array(1000)
        .fill()
        .map((_, i) => i + 1)
        .map(num2Word)
        .map(word => word.replace(/\s+/g, ''))
        .map(word => word.length)
        .reduce((acc, el) => acc + el, 0)
);