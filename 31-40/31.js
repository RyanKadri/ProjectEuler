function changeCombinations(amount) {
    const comboArray = new Array(amount + 1).fill(0);
    comboArray[0] = 1;
    const changeOptions = [1, 2, 5, 10, 20, 50, 100, 200];
    for(const coin of changeOptions) {
        for(let currAmount = 1; currAmount <= amount; currAmount ++) {
            if(currAmount - coin >= 0) {
                comboArray[currAmount] += comboArray[currAmount - coin]
            }
        }
    }
    return comboArray[amount];
}

console.log(changeCombinations(200))