// Same solution as 67 (minus some different triangle-fetching logic)
function maxPath(triangle) {
    const calcTri = [triangle[triangle.length - 1].concat()];
    for(let row = triangle.length - 2; row >= 0; row--) {
        const currRow = triangle[row];
        const rowBelow = calcTri[0];
        const calcRow = currRow.map((el, ind) => el + Math.max(rowBelow[ind], rowBelow[ind + 1]));
        calcTri.unshift(calcRow);
    }
    return calcTri[0][0];
}

let triangle;
if(typeof window === 'undefined') {
    triangle = require('fs').readFileSync('./resources/18.txt', { encoding: 'utf8'});
} else {
    triangle = document.querySelector('.problem_content p:nth-last-child(2)').innerText
}
console.log(maxPath(
    triangle
        .trim()
        .split("\n")
        .map(row => 
            row.split(/\s+/)
               .map(el => parseInt(el))
        )
))