function largestSequenceInGrid(grid, seqLength) {
    const gridRows = grid.length, gridCols = grid[0].length;
    const largestHoriz = largestInLine(grid, (r,c) => [r, c + 1]);
    const largestVert = largestInLine(grid, (r,c) => [r + 1, c]);
    const largestDiag = largestInLine(grid, (r,c) => [r + 1, c + 1]);
    const largestRevDiag = largestInLine(grid, (r,c) => [r + 1, c - 1]);
    return Math.max(largestHoriz, largestVert, largestDiag, largestRevDiag);

    function largestInLine(grid, nextCoord) {
        let largest = 0;
        for(let row = 0; row < gridRows; row ++) {
            for(let col = 0; col < gridCols; col ++) {
                const seq = sequenceFrom(row, col, nextCoord) || [0];
                const prod = seq.reduce((acc, el) => acc * el, 1);
                if(prod > largest) {
                    largest = prod;
                    console.log(row, col);
                }
            }
        }
        return largest;
    }

    function sequenceFrom(startRow, startCol, nextCoord) {
        const seq = [];
        let row = startRow, col = startCol;
        for(let inc = 0; inc < seqLength; inc ++) {
            if(row >= gridRows || col >= gridCols) return;
            seq.push(grid[row][col]);
            [row, col] = nextCoord(row, col);
        }
        return seq;
    }

}

const grid = document.querySelector('.problem_content p:nth-child(2)').innerText
    .trim()
    .split("\n")
    .map(row => 
        row.split(/\s+/)
            .map(el => parseInt(el))
    );

console.log(largestSequenceInGrid(grid, 4));