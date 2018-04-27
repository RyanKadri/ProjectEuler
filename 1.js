(new Array(999))
    .fill()
    .map((_, i) => i + 1)
    .filter(i => i % 3 === 0 || i % 5 === 0)
    .reduce((acc, el) => acc + el);