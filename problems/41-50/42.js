function triangleWords(allowedWords) {
    const wordSize = Math.max(...allowedWords.map(word => word.length));
    
    const maxTriangle = wordSize * 26;
    const triangleSet = new Set()

    let triangle = 1;
    let trianglePos = 1;
    while(triangle <= maxTriangle) {
        triangleSet.add(triangle);
        triangle = (trianglePos * (trianglePos + 1)) / 2;
        trianglePos ++;
    }

    let numTriangleWords = 0;
    for(const word of allowedWords.map(word => word.toLowerCase())) {
        let sum = 0;
        for(let letter = 0; letter < word.length; letter ++) {
            sum += (word.charCodeAt(letter) - 96)
        }
        if(triangleSet.has(sum)) {
            numTriangleWords ++;
        }
    }
    return numTriangleWords;
}

(async function() {
    let href;
    if(typeof window === 'undefined') {
        href = 'https://projecteuler.net/project/resources/p042_words.txt';
    } else {
        const link = document.querySelector('.problem_content a');
        href = link.href;
    }
    const words = await fetch(href)
        .then(res => res.text())
        .then(text => text.replace(/"/g, "").split(","));
    console.log(triangleWords(words));
})()