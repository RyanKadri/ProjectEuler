function champernowneProd() {
    const cs = new Array(200000).fill().map((_, i) => String(i)).join("").split("");
    const desiredDigits = [1, 10, 100, 1000, 10000, 100000, 1000000].map(d => cs[d]);
    return desiredDigits.reduce((acc, d) => acc * parseInt(d), 1);
}

console.log(champernowneProd())