// Same solution as 13 (minus some different triangle-fetching logic)
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

(async function() {
    const triangle = await fetch('https://projecteuler.net/project/resources/p067_triangle.txt')
        .then(resp => resp.text())
        .then(text => {
            return text.trim()
                       .split("\n")
                       .map(row => 
                           row.split(/\s+/)
                           .map(el => parseInt(el))
                       )
        });
    console.log(maxPath(triangle))
})()